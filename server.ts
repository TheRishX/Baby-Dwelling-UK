import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const CONFIG_FILE = path.join(process.cwd(), "site-config.json");

// Helper to parse CSV securely (including line breaks and quotes)
function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let insideQuote = false;
  let entry = "";
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        entry += '"';
        i++; // skip next quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      row.push(entry);
      entry = "";
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(entry);
      result.push(row);
      row = [];
      entry = "";
    } else {
      entry += char;
    }
  }
  if (entry || row.length > 0) {
    row.push(entry);
    result.push(row);
  }
  return result.map(r => r.map(cell => cell.trim())).filter(r => r.length > 0 && r.some(cell => cell !== ""));
}

// Main Google Sheets Loader
async function loadConfigFromGoogleSheets(googleSheetId: string): Promise<any> {
  console.log(`[Google Sheets] Fetching configuration from sheet ID: ${googleSheetId}...`);
  const fetchSheet = async (sheetName: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${googleSheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet "${sheetName}": HTTP status ${response.status}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  };

  try {
    // Fetch all 4 sheets in parallel to keep loading extremely fast
    const [globalRows, productRows, reviewRows, categoryRows] = await Promise.all([
      fetchSheet("GlobalConfig").catch(err => {
        console.warn("[Google Sheets] GlobalConfig sheet failed, using fallback empty rows:", err.message);
        return [];
      }),
      fetchSheet("Products").catch(err => {
        console.warn("[Google Sheets] Products sheet failed, using fallback empty rows:", err.message);
        return [];
      }),
      fetchSheet("Reviews").catch(err => {
        console.warn("[Google Sheets] Reviews sheet failed, using fallback empty rows:", err.message);
        return [];
      }),
      fetchSheet("Categories").catch(err => {
        console.warn("[Google Sheets] Categories sheet failed, using fallback empty rows:", err.message);
        return [];
      }),
    ]);

    // If all rows are empty, the sheet ID might be invalid or not public
    if (globalRows.length === 0 && productRows.length === 0 && reviewRows.length === 0 && categoryRows.length === 0) {
      throw new Error("All sheets returned empty data. Is your Google Sheet shared with 'Anyone with the link can view'?");
    }

    // Load base site-config.json so we can merge updates into it
    let baseConfig: any = {};
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        baseConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      } catch (err) {
        console.error("[Google Sheets] Failed to parse base site-config.json:", err);
      }
    }

    // Parse GlobalConfig
    if (globalRows.length > 1) {
      const headers = globalRows[0].map(h => h.toLowerCase());
      const keyIdx = headers.indexOf("key");
      const valIdx = headers.indexOf("value");
      if (keyIdx !== -1 && valIdx !== -1) {
        for (let i = 1; i < globalRows.length; i++) {
          const key = globalRows[i][keyIdx];
          const val = globalRows[i][valIdx];
          if (key) {
            // Handle booleans, numbers, or standard text
            if (val.toLowerCase() === "true" || val.toLowerCase() === "yes") {
              baseConfig[key] = true;
            } else if (val.toLowerCase() === "false" || val.toLowerCase() === "no") {
              baseConfig[key] = false;
            } else if (!isNaN(Number(val)) && val !== "") {
              baseConfig[key] = Number(val);
            } else {
              baseConfig[key] = val;
            }
          }
        }
      }
    }

    // Keep the googleSheetId property intact so it reflects in the state
    baseConfig.googleSheetId = googleSheetId;

    // Parse Products
    if (productRows.length > 1) {
      const headers = productRows[0].map(h => h.toLowerCase());
      const products: any[] = [];
      
      for (let i = 1; i < productRows.length; i++) {
        const row = productRows[i];
        const prod: any = {};
        
        headers.forEach((header, colIdx) => {
          const val = row[colIdx] || "";
          if (!header) return;
          
          if (header === "price" || header === "originalprice" || header === "rating" || header === "reviewscount") {
            prod[header === "originalprice" ? "originalPrice" : header === "reviewscount" ? "reviewsCount" : header] = Number(val) || 0;
          } else if (header === "instock") {
            prod.inStock = (val.toLowerCase() === "true" || val.toLowerCase() === "yes" || val === "1" || val === "");
          } else if (header === "colors") {
            prod.colors = val ? val.split(",").map(c => c.trim()).filter(Boolean) : [];
          } else if (header === "images") {
            prod.images = val ? val.split(",").map(img => img.trim()).filter(Boolean) : [];
          } else if (header === "specs") {
            const specs: Record<string, string> = {};
            if (val) {
              val.split(";").forEach(pair => {
                const parts = pair.split(":");
                if (parts.length >= 2) {
                  const sKey = parts[0].trim();
                  const sVal = parts.slice(1).join(":").trim();
                  if (sKey && sVal) specs[sKey] = sVal;
                }
              });
            }
            prod.specs = specs;
          } else {
            prod[header] = val;
          }
        });
        
        if (prod.id) {
          products.push(prod);
        }
      }
      
      if (products.length > 0) {
        baseConfig.products = products;
      }
    }

    // Parse Reviews
    if (reviewRows.length > 1) {
      const headers = reviewRows[0].map(h => h.toLowerCase());
      const reviews: any[] = [];
      
      for (let i = 1; i < reviewRows.length; i++) {
        const row = reviewRows[i];
        const rev: any = {};
        
        headers.forEach((header, colIdx) => {
          const val = row[colIdx] || "";
          if (!header) return;
          
          if (header === "rating") {
            rev.rating = Number(val) || 5;
          } else if (header === "verified") {
            rev.verified = (val.toLowerCase() === "true" || val.toLowerCase() === "yes" || val === "1");
          } else if (header === "babyage") {
            rev.babyAge = val;
          } else {
            rev[header] = val;
          }
        });
        
        if (rev.id || rev.name) {
          reviews.push(rev);
        }
      }
      
      if (reviews.length > 0) {
        baseConfig.reviews = reviews;
      }
    }

    // Parse Categories
    if (categoryRows.length > 1) {
      const headers = categoryRows[0].map(h => h.toLowerCase());
      const categories: any[] = [];
      
      for (let i = 1; i < categoryRows.length; i++) {
        const row = categoryRows[i];
        const cat: any = {};
        
        headers.forEach((header, colIdx) => {
          const val = row[colIdx] || "";
          if (!header) return;
          cat[header] = val;
        });
        
        if (cat.id) {
          categories.push(cat);
        }
      }
      
      if (categories.length > 0) {
        baseConfig.categories = categories;
      }
    }

    console.log("[Google Sheets] Successfully parsed all sheets!");
    return baseConfig;
  } catch (err: any) {
    console.error("[Google Sheets] Error reading from Google Sheet:", err.message);
    throw err;
  }
}


// Ensure uploads directory exists globally
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper to migrate any in-place base64 images in config to local files
function migrateBase64ConfigToLocal(config: any): boolean {
  if (!config) return false;
  let changed = false;

  const migrateBase64ToLocalFile = (imageUrl: string, prefix: string): string => {
    if (imageUrl && imageUrl.startsWith("data:image")) {
      try {
        const matches = imageUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          const mimeType = matches[1];
          const base64String = matches[2];
          const buffer = Buffer.from(base64String, "base64");
          const ext = mimeType.split("/")[1] || "jpg";
          const uniqueName = `migrated_${prefix}_${Date.now()}_${Math.round(Math.random() * 1000)}.${ext}`;
          const filePath = path.join(uploadsDir, uniqueName);
          fs.writeFileSync(filePath, buffer);
          console.log(`Migrated in-place base64 image to local file: /uploads/${uniqueName}`);
          return `/uploads/${uniqueName}`;
        }
      } catch (err) {
        console.error("Failed to migrate base64 in-place:", err);
      }
    }
    return imageUrl;
  };

  if (config.heroImage && config.heroImage.startsWith("data:image")) {
    config.heroImage = migrateBase64ToLocalFile(config.heroImage, "hero");
    changed = true;
  }
  if (config.logoImage && config.logoImage.startsWith("data:image")) {
    config.logoImage = migrateBase64ToLocalFile(config.logoImage, "logo");
    changed = true;
  }
  if (config.signatureProduct && config.signatureProduct.image && config.signatureProduct.image.startsWith("data:image")) {
    config.signatureProduct.image = migrateBase64ToLocalFile(config.signatureProduct.image, "sig_prod");
    changed = true;
  }
  if (config.products && Array.isArray(config.products)) {
    config.products.forEach((prod: any) => {
      if (prod.image && prod.image.startsWith("data:image")) {
        prod.image = migrateBase64ToLocalFile(prod.image, `prod_${prod.id}`);
        changed = true;
      }
      if (prod.images && Array.isArray(prod.images)) {
        prod.images = prod.images.map((img: string, idx: number) => {
          if (img && img.startsWith("data:image")) {
            changed = true;
            return migrateBase64ToLocalFile(img, `prod_${prod.id}_sub_${idx}`);
          }
          return img;
        });
      }
    });
  }

  return changed;
}

// Helper to load site configuration (Google Sheets dynamic loader with local filesystem cache)
async function loadConfig() {
  let config: any = null;

  // 1. Load the local configuration first to retrieve googleSheetId or provide fallback
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      config = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading site-config.json file:", error);
  }

  // If no config file exists yet, let's load from the default template or empty state
  if (!config) {
    config = {};
  }

  // 2. If googleSheetId is set, attempt to load fresh data from Google Sheets!
  if (config.googleSheetId) {
    try {
      const freshConfig = await loadConfigFromGoogleSheets(config.googleSheetId);
      if (freshConfig) {
        config = freshConfig;
        
        // Update the local site-config.json file as a persistent cache/backup
        try {
          fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
          console.log("[Google Sheets] Successfully cached fresh sheet data locally.");
        } catch (err) {
          console.error("Failed to write local backup of Google Sheet config:", err);
        }
      }
    } catch (err: any) {
      console.warn("[Google Sheets] Sheet sync failed; using last cached configuration:", err.message);
    }
  }

  // Migrate old banner image and placeholders to stunning high-resolution Unsplash alternatives
  if (config) {
    let changed = migrateBase64ConfigToLocal(config);
    if (!config.heroImage || config.heroImage.includes("aida-public") || config.heroImage.includes("logoImage")) {
      config.heroImage = "https://images.unsplash.com/photo-1544126592-807adc21510d?auto=format&fit=crop&w=2000&q=80";
      changed = true;
    }
    
    // Check if product images are using local placeholder urls and upgrade them
    if (config.products && Array.isArray(config.products)) {
      const unsplashProducts = [
        "https://images.unsplash.com/photo-1544126592-807adc21510d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&w=1000&q=80",
      ];
      config.products.forEach((prod: any, index: number) => {
        if (!prod.image || prod.image.includes("aida-public")) {
          prod.image = unsplashProducts[index % unsplashProducts.length];
          changed = true;
        }
        if (prod.images && Array.isArray(prod.images)) {
          prod.images = prod.images.map((img: string, imgIdx: number) => {
            if (!img || img.includes("aida-public")) {
              changed = true;
              return unsplashProducts[(index + imgIdx) % unsplashProducts.length];
            }
            return img;
          });
        }
      });
    }

    if (changed) {
      console.log("Config upgraded with beautiful high-res Unsplash or migrated local images.");
      await saveConfig(config);
    }
  }

  return config;
}

// Helper to update versions only when image URLs actually changed
function updateConfigImageVersions(oldConfig: any, newConfig: any) {
  const timestamp = Date.now();
  
  // 1. Hero Image
  if (newConfig.heroImage) {
    const oldHero = oldConfig?.heroImage || "";
    // Check if the base URL actually changed (ignoring existing ?v= query parameter)
    const cleanOld = oldHero.split("?")[0];
    const cleanNew = newConfig.heroImage.split("?")[0];
    if (cleanOld !== cleanNew) {
      newConfig.heroImage = cleanNew.startsWith("data:") ? cleanNew : `${cleanNew}?v=${timestamp}`;
    }
  }

  // 2. Logo Image
  if (newConfig.logoImage) {
    const oldLogo = oldConfig?.logoImage || "";
    const cleanOld = oldLogo.split("?")[0];
    const cleanNew = newConfig.logoImage.split("?")[0];
    if (cleanOld !== cleanNew) {
      newConfig.logoImage = cleanNew.startsWith("data:") ? cleanNew : `${cleanNew}?v=${timestamp}`;
    }
  }

  // 3. Product Images
  if (newConfig.products && Array.isArray(newConfig.products)) {
    newConfig.products.forEach((prod: any, idx: number) => {
      const oldProd = oldConfig?.products?.[idx];
      const oldImg = oldProd?.image || "";
      if (prod.image) {
        const cleanOld = oldImg.split("?")[0];
        const cleanNew = prod.image.split("?")[0];
        if (cleanOld !== cleanNew) {
          prod.image = cleanNew.startsWith("data:") ? cleanNew : `${cleanNew}?v=${timestamp}`;
        }
      }
    });
  }
}

// Helper to save site configuration (Local disk caching ONLY - no Firebase)
async function saveConfig(config: any) {
  // Migrate any base64 images to local files before saving to keep config small
  migrateBase64ConfigToLocal(config);

  // Load existing config to apply differential versioning to changed images
  let oldConfig: any = null;
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      oldConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    }
  } catch (err) {
    // ignore
  }

  // Inject a unique version/lastUpdated timestamp
  config.lastUpdated = Date.now();

  // Apply differential image versioning to auto-invalidate browser and CDN caches
  updateConfigImageVersions(oldConfig, config);

  // Write directly to local disk
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    console.log("Configuration saved to disk cache successfully!");
  } catch (error) {
    console.error("Error saving config to disk cache:", error);
    throw error;
  }
}

// Helper to upload images online to catbox.moe anonymously
async function uploadToCatbox(base64Data: string, fileName = "image.jpg"): Promise<string> {
  // Extract pure base64 data and mime type
  const matches = base64Data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid base64 string format");
  }
  const mimeType = matches[1];
  const base64String = matches[2];
  const buffer = Buffer.from(base64String, "base64");

  const blob = new Blob([buffer], { type: mimeType });
  const formData = new FormData();
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, fileName);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload to Catbox failed with status ${response.status}`);
  }

  const url = await response.text();
  return url.trim();
}

// Robust fallback to tmpfiles.org temporary file hosting (expires in 24 hours, perfect for live previews)
async function uploadToTmpFiles(base64Data: string, fileName = "image.jpg"): Promise<string> {
  const matches = base64Data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid base64 string format");
  }
  const mimeType = matches[1];
  const base64String = matches[2];
  const buffer = Buffer.from(base64String, "base64");

  const blob = new Blob([buffer], { type: mimeType });
  const formData = new FormData();
  formData.append("file", blob, fileName);

  const response = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload to TmpFiles failed with status ${response.status}`);
  }

  const data = await response.json();
  if (data && data.status === "success" && data.data && data.data.url) {
    // Standard URL: https://tmpfiles.org/12345/image.jpg
    // Direct displayable URL: https://tmpfiles.org/dl/12345/image.jpg
    const originalUrl = data.data.url;
    return originalUrl.replace("https://tmpfiles.org/", "https://tmpfiles.org/dl/");
  }
  throw new Error("Invalid response format from TmpFiles API");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON parsing with larger size limit for custom base64 logos or images
  app.use(express.json({ limit: "20mb" }));

  // Serve uploaded images statically
  app.use("/uploads", express.static(uploadsDir));

  // API endpoints must go FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  app.get("/api/site-config", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    const config = await loadConfig();
    res.json({ config });
  });

  app.post("/api/site-config", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    const { config } = req.body;
    if (config) {
      try {
        await saveConfig(config);
        res.json({ success: true, config });
      } catch (err: any) {
        console.error("API Error in /api/site-config POST:", err);
        res.status(500).json({ error: err.message || "Failed to save configuration to database" });
      }
    } else {
      res.status(400).json({ error: "Missing config object" });
    }
  });

  app.post("/api/site-config/sync", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    try {
      const config = await loadConfig();
      if (config && config.googleSheetId) {
        console.log(`[Google Sheets] Manual Sync Requested for Sheet ID: ${config.googleSheetId}`);
        const freshConfig = await loadConfigFromGoogleSheets(config.googleSheetId);
        await saveConfig(freshConfig);
        res.json({ success: true, config: freshConfig });
      } else {
        res.status(400).json({ error: "No Google Sheet ID is currently connected in the configuration." });
      }
    } catch (err: any) {
      console.error("[Google Sheets] Sync error:", err);
      res.status(500).json({ error: `Failed to sync Google Sheet: ${err.message}` });
    }
  });

  // Dedicated Enterprise-Level Banner APIs
  app.get("/api/banner", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    try {
      const config = await loadConfig();
      res.json({
        heroImage: config.heroImage,
        lastUpdated: config.lastUpdated || Date.now()
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to fetch banner" });
    }
  });

  app.put("/api/banner", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    try {
      const { heroImage } = req.body;
      if (!heroImage) {
        return res.status(400).json({ error: "Missing heroImage URL" });
      }

      const config = await loadConfig();
      config.heroImage = heroImage;
      await saveConfig(config);

      res.json({ success: true, heroImage: config.heroImage, lastUpdated: config.lastUpdated });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to update banner" });
    }
  });

  app.delete("/api/banner", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    try {
      const config = await loadConfig();
      // Reset to default premium banner
      config.heroImage = "https://images.unsplash.com/photo-1544126592-807adc21510d?auto=format&fit=crop&w=2000&q=80";
      await saveConfig(config);

      res.json({ success: true, heroImage: config.heroImage, lastUpdated: config.lastUpdated });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to reset banner" });
    }
  });

  app.post("/api/upload", async (req, res) => {
    try {
      const { image, name } = req.body;
      if (!image) {
        return res.status(400).json({ error: "Missing image data" });
      }

      console.log(`Processing upload for image '${name || "unnamed"}'...`);

      // 1. Try to save locally first (highly reliable, lightning fast, and keeps Firestore extremely small)
      try {
        const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          const mimeType = matches[1];
          const base64String = matches[2];
          const buffer = Buffer.from(base64String, "base64");
          const ext = mimeType.split("/")[1] || "jpg";
          
          let cleanName = (name || "image")
            .replace(/[^a-zA-Z0-9.-]/g, "_")
            .substring(0, 50);
          
          const hasExt = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(cleanName);
          if (!hasExt) {
            cleanName = `${cleanName}.${ext === "jpeg" ? "jpg" : ext}`;
          }
          const uniqueName = `upload_${Date.now()}_${Math.round(Math.random() * 10000)}_${cleanName}`;
          
          const filePath = path.join(uploadsDir, uniqueName);
          await fs.promises.writeFile(filePath, buffer);
          
          const localUrl = `/uploads/${uniqueName}`;
          console.log(`Image saved successfully to local server disk: ${localUrl}`);
          return res.json({ success: true, url: localUrl });
        }
      } catch (localErr) {
        console.warn("Failed to save image locally, trying online upload fallback:", localErr);
      }

      // 2. Fallback to online hosting (Catbox/TmpFiles) if local saving failed or was skipped
      console.log(`Uploading received image '${name || "unnamed"}' to online storage...`);
      let onlineUrl: string | null = null;
      let catboxError: any = null;

      try {
        onlineUrl = await uploadToCatbox(image, name || "image.jpg");
        console.log(`Image uploaded successfully to Catbox: ${onlineUrl}`);
      } catch (err: any) {
        catboxError = err;
        console.log(`Note: Upload to Catbox failed (${err.message || err}), trying TmpFiles as a reliable fallback...`);
        try {
          onlineUrl = await uploadToTmpFiles(image, name || "image.jpg");
          console.log(`Image uploaded successfully to TmpFiles: ${onlineUrl}`);
        } catch (fallbackErr: any) {
          console.log("All online image upload targets failed!");
          throw new Error(`Catbox error: ${catboxError.message || catboxError}. TmpFiles error: ${fallbackErr.message || fallbackErr}`);
        }
      }

      res.json({ success: true, url: onlineUrl });
    } catch (err: any) {
      console.error("Error processing image upload:", err);
      res.status(500).json({ error: err.message || "Failed to process image upload" });
    }
  });

  // Serve static assets or use Vite middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

