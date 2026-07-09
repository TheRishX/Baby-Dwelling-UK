import { Product, Review } from '../types';

/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH (SOT) FOR BABY DWELLING USA
 * ============================================================================
 * Edit this single file to manage ALL content, texts, images, links,
 * products, and settings across the entire storefront.
 * No databases, Firebase, Google Sheets, or Admin panels required.
 * ============================================================================
 */

export const siteContent = {
  // --------------------------------------------------------------------------
  // 1. Website Branding & Identity
  // --------------------------------------------------------------------------
  logoText: 'Baby Dwelling',
  logoImage: '', // Leave empty to display logoText in premium serif typography, or provide a URL/path
  logoFilter: 'none', // 'none' | 'white' | 'invert' | 'terracotta' | 'sage' | 'dark'
  logoBg: 'transparent', // 'transparent' | 'beige'
  headerLogoHeight: 40, // in pixels
  footerLogoHeight: 32, // in pixels
  favicon: '/favicon.ico',

  // --------------------------------------------------------------------------
  // 2. Navigation Links
  // --------------------------------------------------------------------------
  navigation: [
    { label: 'Our Story', target: 'home' },
    { label: 'Shop All', target: 'shop' },
    { label: 'Signature Heritage', target: 'detail' },
    { label: 'Sizing Help', target: 'page:sizing-guide' }
  ],

  // --------------------------------------------------------------------------
  // 3. Social Media Links
  // --------------------------------------------------------------------------
  socials: {
    instagram: 'https://instagram.com/babydwelling',
    facebook: 'https://facebook.com/babydwelling',
    pinterest: 'https://pinterest.com/babydwelling',
    youtube: 'https://youtube.com/babydwelling',
    twitter: 'https://x.com/babydwelling',
    linkedin: 'https://linkedin.com/company/babydwelling',
  },

  // --------------------------------------------------------------------------
  // 4. Contact & Customer Support Info
  // --------------------------------------------------------------------------
  contact: {
    email: 'support@babydwelling.co.uk',
    phone: '+44 (0) 20 7946 0192',
    address: 'Baby Dwelling USA, 10 Greenery Lane, Cotswolds, UK',
    googleMapsLink: 'https://maps.google.com',
  },

  // --------------------------------------------------------------------------
  // 5. SEO & Open Graph Metadata
  // --------------------------------------------------------------------------
  seo: {
    metaTitle: 'Baby Dwelling USA • Premium Certified Organic Babywearing',
    metaDescription: 'Experience premium ergonomic comfort with our pediatric-approved, certified hip-healthy baby carriers, ring slings, and wraps. Artfully woven from 100% natural organic fabrics.',
    keywords: ['baby carrier', 'organic baby wrap', 'ergonomic baby sling', 'certified hip healthy', 'babywearing cotswolds', 'pure organic linen'],
    ogTitle: 'Baby Dwelling USA | Premium Organic Baby Carriers',
    ogDescription: 'Certified hip-healthy and custom-woven from premium organic fabrics for gentle luxury.',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjUGZLXpNyFq8eljDX0MSFwUqLu0nP9QxWQhGuXEjeKOCi36I__npWPkI5my2jneyHJpmFJ0TP6-eg7Qt0Gq7VMb-Cet5YDlJSGVe0Ysx42YRQjOVvrJqqq4niUBZsgAEOM7pDESTwufwBXAM_ukbWo78H5o4lJrMeS2fJSYN9xNCcU5L47rf2w7uydTUMyhi-RiaXM-UbM2bbECDLCP18_2r3D5rbhxJFEnDtKqOYoCJoUq1LohewJ-1TbT91-zK9s1VpWDxtzmo',
  },

  // --------------------------------------------------------------------------
  // 6. Hero / Header Section Content
  // --------------------------------------------------------------------------
  heroTagline: 'Baby Dwelling USA • Premium Certified Organic Babywearing',
  heroTitle: 'Breathe Easy.<br />Bond Deeply.',
  heroSubtitle: 'Welcome to Baby Dwelling USA. Experience premium ergonomic comfort with our pediatric-approved, certified hip-healthy baby carriers, ring slings, and wraps. Artfully woven from 100% natural organic fabrics.',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjUGZLXpNyFq8eljDX0MSFwUqLu0nP9QxWQhGuXEjeKOCi36I__npWPkI5my2jneyHJpmFJ0TP6-eg7Qt0Gq7VMb-Cet5YDlJSGVe0Ysx42YRQjOVvrJqqq4niUBZsgAEOM7pDESTwufwBXAM_ukbWo78H5o4lJrMeS2fJSYN9xNCcU5L47rf2w7uydTUMyhi-RiaXM-UbM2bbECDLCP18_2r3D5rbhxJFEnDtKqOYoCJoUq1LohewJ-1TbT91-zK9s1VpWDxtzmo',
  
  heroCta1Text: 'Shop Collection',
  heroCta1Link: 'shop',
  heroCta2Text: 'Signature Heritage',
  heroCta2Link: 'detail',

  // --------------------------------------------------------------------------
  // 7. Core Selling Points (Homepage Badges)
  // --------------------------------------------------------------------------
  badge1Title: 'Ergonomically Certified',
  badge1Text: 'Healthy hip & spine developmental support.',
  badge2Title: 'Pure Premium Materials',
  badge2Text: 'Breathable organic linen & combed hemp weaves.',
  badge3Title: 'Carbon Neutral Delivery',
  badge3Text: 'Free UK shipping on orders over £50.',

  // --------------------------------------------------------------------------
  // 8. Collections / Categories
  // --------------------------------------------------------------------------
  categories: [
    { id: 'all', name: 'All Products', subtitle: 'All Collections' },
    { 
      id: 'carriers', 
      name: 'Carriers', 
      subtitle: '0 - 48 Months', 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWWBd9xbi8sJ5zXUsdnBU50R5cZsKdjtPfYS8XGrhpvAlmIfe_54yIAXb7Z1Lg2sLgJvhv4P38lIKKowcVNm6PB_mbbD8PW4V5mPO8GC9dZLW4QkTy3byFsWKrcDB1nRtSM88KtVaN7kY1bllFvNB-QpE7b4WhlH-iB_hVwPQZTMkr2pMcrNUaUZ2b8_Vvfw5tEtq4PYrh6gx65y1gkj_nZEafninbKvKgG2cimlRhCLhfj5Aos55aT37UpVCJ-cCuGVuCYzBZRSM' 
    },
    { 
      id: 'pouches', 
      name: 'Pouches', 
      subtitle: '0 - 12 Months', 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7QnYkRNpbxSypcRESvTyvVK4rFPqh9BT3mC3WChvyHSPlYNY0lqGM9hw-G9WktZRmzqyViVoDKW_NDs7rripCZrfhMsUzaEbXYTgyiThPnW3oL-M5hCS3Inj5VCJNOYRjmDFOw2HAhQXmLUzql1TfhQVuL8qjKc467NBrfEqwrJ6SAXPWvvP6DT3pNSO6f5JInnzJTnjH6CW3e7hBzEhP08J8-wPRoIR4kkQZa_WhFFYs52ReUzoSPoFcuYWn3sneqwG-dRo8BE' 
    },
    { 
      id: 'combos', 
      name: 'Combos', 
      subtitle: 'Complete Sets', 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Piw4J1xyoTlo5PGRSLjIISiFjyiPgMDlCYZn_jWcfZfK4mjePiBtpaOlkUdVfFc2CL3Jk66_BDlQQARD9aBAorecrOG_Q_kRZ1LFZFmrLdIw1YkOnGkS05K6PEJakq1rPQExw_6GbIH_ckRcEU0OyoDRTRHU6HYq7jiK4aR-b79qEgiWph_gECwsAsaLNc9ljjOGevOxt78Ds34LFBNSnDT6wop79rqU0QB28I72tqUOO_9dJuIWJbL1s9TkdX8M4pWH7l0eOGI' 
    },
    { 
      id: 'accessories', 
      name: 'Accessories', 
      subtitle: 'Support Essentials', 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb9GAfeBfYQCafvF1ipKNEos1j4wOzD6nGsb95-2k4m2DRFV7rLxjPQZnJolZpwLzAxb1oVv0IHLXSDzywfaHex4UnZJkmkTxqbKd0x-90lpEWq-RUeWjkNWm7D6BSYgwRPZIMeb6ulVplOSxYVavPnfcQG40jXPKHE6-UOj5ZiCOxmZA8LS4f-hrrg-MrjLeYPNF9lfoQqjARJbL85qspRS9kzsWNzwp7XRXYi0cQ_-Nl2NyOFXZcKzpjiLOXN2x8-0AcsNMDE90' 
    }
  ],

  // --------------------------------------------------------------------------
  // 9. Informational Pages (Custom CMS-style Sizing / About Guides)
  // --------------------------------------------------------------------------
  pages: [
    {
      id: 'about-us',
      title: 'Our Clean Sourcing Mission',
      slug: 'about-us',
      body: `<div class="space-y-6">
  <p>At <strong>Baby Dwelling USA</strong>, we believe that the closest bond in life is formed during those early, cozy hours of skin-to-skin touch. That is why our products are designed with 100% natural, certified organic, earth-grown fibers to protect your baby's gentle skin.</p>
  <h3>100% Organic &amp; Clean Raw Materials</h3>
  <p>Every ergonomic baby carrier, ring sling, and newborn pouch in our collection is exclusively sourced from certified organic fair-trade farms. By eliminating plastic materials, toxic chemicals, and synthetic dye-stuffs, we guarantee a pure, safe space for your little ones to rest, cuddle, and sleep.</p>
  <blockquote>"Baby Dwelling USA is dedicated to crafting premium, certified ergonomic baby carriers that provide a lifetime of intimacy, healthy skeletal growth, and ecological preservation."</blockquote>
</div>`,
      isPublished: true,
      createdAt: '2026-07-01'
    },
    {
      id: 'sizing-guide',
      title: 'Ergonomic Sizing & Carrying Guide',
      slug: 'sizing-guide',
      body: `<div class="space-y-4">
  <h3>Finding the Perfect Fit with Baby Dwelling USA</h3>
  <p>All <strong>Baby Dwelling USA</strong> ergonomic wraps, slings, and carriers are structurally engineered to adjust effortlessly to all parent body types and growing infants. With our fully expandable shoulder straps, snug waistbands, and certified sliders, mastering babywearing takes less than 30 seconds.</p>
  <h3>The Pediatric M-Position Rule</h3>
  <p>Our carriers keep your baby's hips correctly aligned in the pediatric-approved <strong>M-Position</strong>: with knees slightly higher than their bottom. This healthy ergonomic placement supports natural spinal curves and actively prevents infant hip dysplasia.</p>
</div>`,
      isPublished: true,
      createdAt: '2026-07-01'
    }
  ],

  // --------------------------------------------------------------------------
  // 10. Featured Signature Product Detail SOT
  // --------------------------------------------------------------------------
  signatureProduct: {
    id: 'signature-heritage',
    title: 'Signature Heritage Carrier',
    price: 145.0,
    originalPrice: 175.0,
    rating: 5,
    reviewsCount: 154,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqYzAFR4MhKdT0PNP-Ul6JDYVnVusAez4-41qU_JwZ9PoMzkSExErNBx_Gfx81Gv7JB99H8ZsndMvQ_7a7Xr0XHEZOTEInp95Xnb5m1N1GCcwYRIVIHS4h2I-3qa7hSytaP_KiYy3HK5ksI0ay5-9t65DpI7wBkrnYuakwjZvgI2UCxXdqYlsAl2_1piFE2s-rQ-_jx7rV0KGS2PmYAK0O2dKRey2MbPAIHFx_7pZUAHwSV5t5ZJwoh4RMGNFc2JdJ6u_zhGqcto',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqYzAFR4MhKdT0PNP-Ul6JDYVnVusAez4-41qU_JwZ9PoMzkSExErNBx_Gfx81Gv7JB99H8ZsndMvQ_7a7Xr0XHEZOTEInp95Xnb5m1N1GCcwYRIVIHS4h2I-3qa7hSytaP_KiYy3HK5ksI0ay5-9t65DpI7wBkrnYuakwjZvgI2UCxXdqYlsAl2_1piFE2s-rQ-_jx7rV0KGS2PmYAK0O2dKRey2MbPAIHFx_7pZUAHwSV5t5ZJwoh4RMGNFc2JdJ6u_zhGqcto',
    ],
    category: 'carriers' as const,
    badge: 'NEW ARRIVAL',
    tagline: 'Elevate your babywearing journey with unparalleled comfort and timeless, earthy design.',
    retailer: 'amazon' as const,
    buyUrl: 'https://www.amazon.co.uk',
    colors: ['#E5DCC5', '#9CA389', '#8B8682'],
    colorNames: ['Oatmeal Linen', 'Muted Sage', 'Slate Grey'],
    specs: {
      'Panel Height': '15" (Adjustable)',
      'Seat Width': '13" - 15"',
      'Waistbelt Range': '25" - 58"',
      'Carrier Weight': '1.8 lbs',
      'Carry Positions': 'Front (Inward/Outward), Back, Hip',
      'Materials': '55% Organic Hemp, 45% Organic Cotton',
      'Care': 'Machine washable cold on delicate. Air dry flat.',
    },
    availability: 'In Stock',
  },

  // --------------------------------------------------------------------------
  // 11. Full Storefront Products Catalog SOT
  // --------------------------------------------------------------------------
  products: [
    {
      id: 'linen-wrap',
      title: 'Linen Wrap Carrier',
      price: 120.0,
      originalPrice: 150.0,
      rating: 5,
      reviewsCount: 42,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWWBd9xbi8sJ5zXUsdnBU50R5cZsKdjtPfYS8XGrhpvAlmIfe_54yIAXb7Z1Lg2sLgJvhv4P38lIKKowcVNm6PB_mbbD8PW4V5mPO8GC9dZLW4QkTy3byFsWKrcDB1nRtSM88KtVaN7kY1bllFvNB-QpE7b4WhlH-iB_hVwPQZTMkr2pMcrNUaUZ2b8_Vvfw5tEtq4PYrh6gx65y1gkj_nZEafninbKvKgG2cimlRhCLhfj5Aos55aT37UpVCJ-cCuGVuCYzBZRSM',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBWWBd9xbi8sJ5zXUsdnBU50R5cZsKdjtPfYS8XGrhpvAlmIfe_54yIAXb7Z1Lg2sLgJvhv4P38lIKKowcVNm6PB_mbbD8PW4V5mPO8GC9dZLW4QkTy3byFsWKrcDB1nRtSM88KtVaN7kY1bllFvNB-QpE7b4WhlH-iB_hVwPQZTMkr2pMcrNUaUZ2b8_Vvfw5tEtq4PYrh6gx65y1gkj_nZEafninbKvKgG2cimlRhCLhfj5Aos55aT37UpVCJ-cCuGVuCYzBZRSM',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYgJvLuf0Zt1qB223y7Fe29M7UVopEQBrX5A61jrHnarvmG5pE7sIdh8WGCSDyZk7cwW_btP6uvLH2FOzTNaJKGOX6VcWm1FUI--gVXSylk0VtIt3pk40ap2fLbhdwA25hXgQVyp_3cqM2UGG1KurtF8rWTRGwLBt9Tvml6Yr6aJorH_Yi8iGu4jNA8RkiL_irDOsIwNyHrlpOhH93LObOdB24gLGzVZdsop8of4E9l2YBNMq1_Ocdaj7uww4ywAn7FSBEV-ZqXMI',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7QnYkRNpbxSypcRESvTyvVK4rFPqh9BT3mC3WChvyHSPlYNY0lqGM9hw-G9WktZRmzqyViVoDKW_NDs7rripCZrfhMsUzaEbXYTgyiThPnW3oL-M5hCS3Inj5VCJNOYRjmDFOw2HAhQXmLUzql1TfhQVuL8qjKc467NBrfEqwrJ6SAXPWvvP6DT3pNSO6f5JInnzJTnjH6CW3e7hBzEhP08J8-wPRoIR4kkQZa_WhFFYs52ReUzoSPoFcuYWn3sneqwG-dRo8BE'
      ],
      category: 'carriers',
      badge: 'ECO-FRIENDLY',
      tagline: 'Pure, organic cotton weave designed for seamless bonding and natural temperature control.',
      description: '<p>The Linen Wrap Carrier offers a classical, aesthetic way to carry your newborn. Woven from 100% Belgian flax linen, it is highly breathable, absorbent, and thermoregulatory, keeping both you and your baby cool in warm weather and warm in cool weather.</p><p>Its custom sling mechanism allows you to perfectly spread the load across your shoulders and back, relieving pressure on your spine.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#E5DCC5', '#9CA389', '#8B8682'],
      specs: {
        'Panel Height': '14.5" (Adjustable)',
        'Seat Width': '12" - 14"',
        'Waistbelt Range': '24" - 56"',
        'Carrier Weight': '1.5 lbs',
        'Carry Positions': 'Front (Inward), Hip',
        'Materials': '100% Organic Belgian Flax Linen',
        'Age Limit': 'Newborn to Toddler (7 lbs - 35 lbs)',
        'Care': 'Machine washable cold, line dry.'
      },
      availability: 'In Stock',
    },
    {
      id: 'ergo-comfort',
      title: 'Ergo Comfort Carrier',
      price: 145.0,
      originalPrice: 180.0,
      rating: 5,
      reviewsCount: 128,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7QnYkRNpbxSypcRESvTyvVK4rFPqh9BT3mC3WChvyHSPlYNY0lqGM9hw-G9WktZRmzqyViVoDKW_NDs7rripCZrfhMsUzaEbXYTgyiThPnW3oL-M5hCS3Inj5VCJNOYRjmDFOw2HAhQXmLUzql1TfhQVuL8qjKc467NBrfEqwrJ6SAXPWvvP6DT3pNSO6f5JInnzJTnjH6CW3e7hBzEhP08J8-wPRoIR4kkQZa_WhFFYs52ReUzoSPoFcuYWn3sneqwG-dRo8BE',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7QnYkRNpbxSypcRESvTyvVK4rFPqh9BT3mC3WChvyHSPlYNY0lqGM9hw-G9WktZRmzqyViVoDKW_NDs7rripCZrfhMsUzaEbXYTgyiThPnW3oL-M5hCS3Inj5VCJNOYRjmDFOw2HAhQXmLUzql1TfhQVuL8qjKc467NBrfEqwrJ6SAXPWvvP6DT3pNSO6f5JInnzJTnjH6CW3e7hBzEhP08J8-wPRoIR4kkQZa_WhFFYs52ReUzoSPoFcuYWn3sneqwG-dRo8BE',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYgJvLuf0Zt1qB223y7Fe29M7UVopEQBrX5A61jrHnarvmG5pE7sIdh8WGCSDyZk7cwW_btP6uvLH2FOzTNaJKGOX6VcWm1FUI--gVXSylk0VtIt3pk40ap2fLbhdwA25hXgQVyp_3cqM2UGG1KurtF8rWTRGwLBt9Tvml6Yr6aJorH_Yi8iGu4jNA8RkiL_irDOsIwNyHrlpOhH93LObOdB24gLGzVZdsop8of4E9l2YBNMq1_Ocdaj7uww4ywAn7FSBEV-ZqXMI',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBWWBd9xbi8sJ5zXUsdnBU50R5cZsKdjtPfYS8XGrhpvAlmIfe_54yIAXb7Z1Lg2sLgJvhv4P38lIKKowcVNm6PB_mbbD8PW4V5mPO8GC9dZLW4QkTy3byFsWKrcDB1nRtSM88KtVaN7kY1bllFvNB-QpE7b4WhlH-iB_hVwPQZTMkr2pMcrNUaUZ2b8_Vvfw5tEtq4PYrh6gx65y1gkj_nZEafninbKvKgG2cimlRhCLhfj5Aos55aT37UpVCJ-cCuGVuCYzBZRSM'
      ],
      category: 'carriers',
      badge: 'BESTSELLER',
      tagline: 'Advanced spine-cradling lumbar support designed for active parents and fast adjustments.',
      description: '<p>The Ergo Comfort Carrier is the ultimate blend of high-performance ergonomics and minimalist styling. Certified by the International Hip Dysplasia Institute, it guarantees the safe M-Position for your baby’s hips across all carrying settings.</p><p>Featuring padded memory-foam shoulder straps, a heavy-duty waist belt with integrated lumbar support, and smart sliders for micro-adjustments.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#9CA389', '#E5DCC5', '#8B8682'],
      specs: {
        'Panel Height': '15" (Adjustable)',
        'Seat Width': '13" - 15"',
        'Waistbelt Range': '25" - 58"',
        'Carrier Weight': '1.8 lbs',
        'Carry Positions': 'Front (Inward/Outward), Back, Hip',
        'Materials': '70% Recycled Cotton, 30% Tech Mesh Panels',
        'Age Limit': 'Newborn to 3 Years (7 lbs - 45 lbs)',
        'Care': 'Machine washable cold, tumble dry low.'
      },
      availability: 'In Stock',
    },
    {
      id: 'cozy-sleep',
      title: 'Cozy Sleep Pouch',
      price: 65.0,
      originalPrice: 85.0,
      rating: 5,
      reviewsCount: 18,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb9GAfeBfYQCafvF1ipKNEos1j4wOzD6nGsb95-2k4m2DRFV7rLxjPQZnJolZpwLzAxb1oVv0IHLXSDzywfaHex4UnZJkmkTxqbKd0x-90lpEWq-RUeWjkNWm7D6BSYgwRPZIMeb6ulVplOSxYVavPnfcQG40jXPKHE6-UOj5ZiCOxmZA8LS4f-hrrg-MrjLeYPNF9lfoQqjARJbL85qspRS9kzsWNzwp7XRXYi0cQ_-Nl2NyOFXZcKzpjiLOXN2x8-0AcsNMDE90',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCb9GAfeBfYQCafvF1ipKNEos1j4wOzD6nGsb95-2k4m2DRFV7rLxjPQZnJolZpwLzAxb1oVv0IHLXSDzywfaHex4UnZJkmkTxqbKd0x-90lpEWq-RUeWjkNWm7D6BSYgwRPZIMeb6ulVplOSxYVavPnfcQG40jXPKHE6-UOj5ZiCOxmZA8LS4f-hrrg-MrjLeYPNF9lfoQqjARJbL85qspRS9kzsWNzwp7XRXYi0cQ_-Nl2NyOFXZcKzpjiLOXN2x8-0AcsNMDE90'
      ],
      category: 'pouches',
      badge: 'GENTLE SNUG',
      tagline: 'Beautiful ribbed wrap that envelops your baby in a secure, comforting womb-like hold.',
      description: '<p>The Cozy Sleep Pouch is a beautifully simple, cloud-soft ribbed cotton sling. Engineered for those precious fourth-trimester weeks, it mimics the safe, tactile pressure of the womb to soothe fussy infants instantly.</p><p>Its elastic-free, tailored sizing delivers maximum safety with zero buckles, zippers, or excess fabric bulk.</p>',
      retailer: 'walmart',
      buyUrl: 'https://www.walmart.com',
      colors: ['#C97C5D', '#E5DCC5'],
      specs: {
        'Height': '11.5"',
        'Width': 'Flexible Cotton Stretch',
        'Age Limit': '0 - 12 Months (Up to 22 lbs)',
        'Weight Limit': 'Up to 22 lbs',
        'Materials': '95% Fine Organic Combed Cotton, 5% Lycra',
        'Care': 'Machine wash cold with mild detergent, air dry.'
      },
      availability: 'In Stock',
    },
    {
      id: 'travel-combo',
      title: 'Essential Travel Combo',
      price: 160.0,
      originalPrice: 195.0,
      rating: 5,
      reviewsCount: 56,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Piw4J1xyoTlo5PGRSLjIISiFjyiPgMDlCYZn_jWcfZfK4mjePiBtpaOlkUdVfFc2CL3Jk66_BDlQQARD9aBAorecrOG_Q_kRZ1LFZFmrLdIw1YkOnGkS05K6PEJakq1rPQExw_6GbIH_ckRcEU0OyoDRTRHU6HYq7jiK4aR-b79qEgiWph_gECwsAsaLNc9ljjOGevOxt78Ds34LFBNSnDT6wop79rqU0QB28I72tqUOO_9dJuIWJbL1s9TkdX8M4pWH7l0eOGI',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Piw4J1xyoTlo5PGRSLjIISiFjyiPgMDlCYZn_jWcfZfK4mjePiBtpaOlkUdVfFc2CL3Jk66_BDlQQARD9aBAorecrOG_Q_kRZ1LFZFmrLdIw1YkOnGkS05K6PEJakq1rPQExw_6GbIH_ckRcEU0OyoDRTRHU6HYq7jiK4aR-b79qEgiWph_gECwsAsaLNc9ljjOGevOxt78Ds34LFBNSnDT6wop79rqU0QB28I72tqUOO_9dJuIWJbL1s9TkdX8M4pWH7l0eOGI'
      ],
      category: 'combos',
      badge: 'BUNDLE',
      tagline: 'The ultimate set: signature carrier + premium matching teething pads and small travel clutch.',
      description: '<p>Our Essential Travel Combo features everything you need for mobile parenthood in a highly discounted matching package. Includes our top-rated Linen Wrap Carrier, custom organic teething shoulder pads, and a matching hand-woven linen diaper clutch bag.</p><p>Perfect for long family hikes, shopping runs, or transit terminal boarding.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#E5DCC5', '#8B8682'],
      specs: {
        'Bundle Inclusions': 'Carrier, 2x Drool Pads, Travel Canvas Bag',
        'Panel Height': '15" (Adjustable)',
        'Waistbelt Range': '25" - 58"',
        'Total Package Weight': '2.3 lbs',
        'Materials': 'Organic Hemp Blend',
        'Care': 'Machine wash delicate, air dry.'
      },
      availability: 'In Stock',
    },
  ],

  // --------------------------------------------------------------------------
  // 12. Verified Customer Reviews
  // --------------------------------------------------------------------------
  reviews: [
    {
      id: 'rev-1',
      name: 'Sarah & Leo',
      babyAge: '8 mos',
      rating: 5,
      comment: 'The linen blend is so breathable, even in the middle of summer. My back feels incredibly supported compared to my old carrier. A complete lifesaver.',
      date: '2026-05-12',
      verified: true,
    },
    {
      id: 'rev-2',
      name: 'James & Maya',
      babyAge: '3 mos',
      rating: 5,
      comment: 'Beautiful, earthy aesthetic that matches everything in my wardrobe. More importantly, it puts her to sleep instantly. The ergonomic posture is amazing.',
      date: '2026-06-20',
      verified: true,
    },
    {
      id: 'rev-3',
      name: 'Clara & Finley',
      babyAge: '5 mos',
      rating: 5,
      comment: 'Adjusting it between myself and my husband takes literally ten seconds. The fabric gets softer with every wash. Best baby investment we have made.',
      date: '2026-06-29',
      verified: true,
    },
  ],

  // --------------------------------------------------------------------------
  // 13. Checkout Text & Switchers
  // --------------------------------------------------------------------------
  enableAmazonCheckout: true,
  amazonCheckoutText: 'Checkout using Amazon',
  enableWalmartCheckout: true,
  walmartCheckoutText: 'Checkout using Wal-Mart',

  // --------------------------------------------------------------------------
  // 14. Image Performance, CDN, & Lazy Load
  // --------------------------------------------------------------------------
  imgCdnMode: 'wsrv' as 'wsrv' | 'cloudinary' | 'imgix' | 'none',
  cloudinaryCloudName: '',
  imgixDomain: '',
  imgQuality: 82,
  imgAutoWebp: true,
  imgLazyLoad: true,
};

export type SiteContent = typeof siteContent;
