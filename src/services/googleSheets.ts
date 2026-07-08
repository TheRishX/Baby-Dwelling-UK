import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request Google Sheets and Drive permissions
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Auth Initialization & State Listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Fallback to checking if we can get a token or wait for manual sign-in
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve OAuth access token from Google sign-in.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign-in Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Get active access token
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

// Sign out
export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// --- Google Sheets API v4 Serialization Helpers ---

export function serializeGlobalConfig(config: any): string[][] {
  const rows = [["Key", "Value"]];
  const keys = [
    'logoText', 'logoImage', 'bannerText', 'showPromoBanner',
    'heroTitle', 'heroSubtitle', 'heroImage', 'aboutTitle',
    'aboutText', 'aboutImage', 'showInstaFeed', 'instagramUrl',
    'footerAbout', 'footerEmail', 'footerPhone', 'footerAddress',
    'enableAmazonCheckout', 'amazonCheckoutText', 'enableWalmartCheckout',
    'walmartCheckoutText', 'imgCdnMode', 'imgQuality', 'imgAutoWebp',
    'imgLazyLoad', 'googleSheetId'
  ];
  for (const k of keys) {
    if (config[k] !== undefined) {
      rows.push([k, String(config[k])]);
    }
  }
  return rows;
}

export function serializeProducts(products: any[]): string[][] {
  const headers = [
    "id", "title", "price", "originalPrice", "rating", "reviewsCount",
    "image", "images", "category", "badge", "tagline", "description",
    "retailer", "buyUrl", "colors", "specs", "inStock"
  ];
  const rows = [headers];
  for (const p of products) {
    const imagesVal = Array.isArray(p.images) ? p.images.join(",") : "";
    const colorsVal = Array.isArray(p.colors) ? p.colors.join(",") : "";
    const specsVal = p.specs ? Object.entries(p.specs).map(([k, v]) => `${k}:${v}`).join(";") : "";
    const row = [
      p.id || "",
      p.title || "",
      String(p.price || 0),
      String(p.originalPrice || ""),
      String(p.rating || 5),
      String(p.reviewsCount || 0),
      p.image || "",
      imagesVal,
      p.category || "",
      p.badge || "",
      p.tagline || "",
      p.description || "",
      p.retailer || "",
      p.buyUrl || "",
      colorsVal,
      specsVal,
      p.inStock !== false ? "true" : "false"
    ];
    rows.push(row);
  }
  return rows;
}

export function serializeReviews(reviews: any[]): string[][] {
  const headers = ["id", "name", "rating", "comment", "babyAge", "verified", "date"];
  const rows = [headers];
  for (const r of reviews) {
    rows.push([
      r.id || "",
      r.name || "",
      String(r.rating || 5),
      r.comment || "",
      r.babyAge || "",
      r.verified !== false ? "true" : "false",
      r.date || ""
    ]);
  }
  return rows;
}

export function serializeCategories(categories: any[]): string[][] {
  const headers = ["id", "name", "image"];
  const rows = [headers];
  for (const c of categories) {
    rows.push([
      c.id || "",
      c.name || "",
      c.image || ""
    ]);
  }
  return rows;
}

// --- Google Sheets Creation, Seeding & Save Services ---

/**
 * Automatically creates a Google Sheet with 4 pre-structured sheets (tabs)
 * and seeds them with all of the current storefront configuration and data.
 */
export const createAndSeedGoogleSheet = async (
  siteConfig: any,
  token: string
): Promise<string> => {
  if (!token) throw new Error("No active Google OAuth credentials found.");

  console.log("Creating new Google Sheet database via Sheets API v4...");

  // 1. Create Spreadsheet
  const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title: "Baby Dwelling Storefront Database"
      },
      sheets: [
        { properties: { title: "GlobalConfig" } },
        { properties: { title: "Products" } },
        { properties: { title: "Reviews" } },
        { properties: { title: "Categories" } }
      ]
    })
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Sheets API creation failed: ${errText}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;

  if (!spreadsheetId) throw new Error("No Spreadsheet ID returned by Google Sheets API.");
  console.log(`Successfully created spreadsheet: ${spreadsheetId}`);

  // 2. Prepare Seeds
  const defaultCategories = [
    { id: "carriers", name: "Baby Carriers", image: "https://images.unsplash.com/photo-1544126592-807adc21510d?auto=format&fit=crop&w=600&q=80" },
    { id: "pouches", name: "Sleep Pouches", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80" },
    { id: "combos", name: "Premium Sets", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80" }
  ];

  // Update sheetConfig to have the sheet ID before writing it so it preserves the reference
  const configToWrite = { ...siteConfig, googleSheetId: spreadsheetId };

  const batchPayload = {
    valueInputOption: "USER_ENTERED",
    data: [
      {
        range: "GlobalConfig!A1:B100",
        values: serializeGlobalConfig(configToWrite)
      },
      {
        range: "Products!A1:Z100",
        values: serializeProducts(siteConfig.products || [])
      },
      {
        range: "Reviews!A1:G100",
        values: serializeReviews(siteConfig.reviews || [])
      },
      {
        range: "Categories!A1:C100",
        values: serializeCategories(siteConfig.categories || defaultCategories)
      }
    ]
  };

  // 3. Batch Update Seeds
  console.log("Seeding spreadsheet tabs with initial template rows and columns...");
  const updateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(batchPayload)
    }
  );

  if (!updateRes.ok) {
    const errText = await updateRes.text();
    throw new Error(`Sheets API seeding failed: ${errText}`);
  }

  console.log("Google Sheet populated with complete storefront schema and sample rows!");
  return spreadsheetId;
};

/**
 * Saves the entire application state back into the Google Sheet using batchUpdate
 */
export const saveConfigToGoogleSheets = async (
  spreadsheetId: string,
  config: any,
  token: string
): Promise<void> => {
  if (!spreadsheetId) return;
  if (!token) throw new Error("Authentication token is required to save to Google Sheets.");

  console.log(`Writing full configuration back to Google Sheet: ${spreadsheetId}...`);

  const batchPayload = {
    valueInputOption: "USER_ENTERED",
    data: [
      {
        range: "GlobalConfig!A1:B100",
        values: serializeGlobalConfig(config)
      },
      {
        range: "Products!A1:Z100",
        values: serializeProducts(config.products || [])
      },
      {
        range: "Reviews!A1:G100",
        values: serializeReviews(config.reviews || [])
      },
      {
        range: "Categories!A1:C100",
        values: serializeCategories(config.categories || [])
      }
    ]
  };

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(batchPayload)
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to update Google Sheet: ${errText}`);
  }

  console.log("Google Sheet successfully updated!");
};
