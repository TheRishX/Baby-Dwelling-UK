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
  heroImage: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783597329/copy_of_img_3198_qpnsv4.avif',

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
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783531386/cat1_k3davh.avif'
    },
    {
      id: 'pouches',
      name: 'Pouches',
      subtitle: '0 - 12 Months',
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783592883/cat_nhuxre.avif'
    },
    {
      id: 'combos',
      name: 'Combos',
      subtitle: 'Complete Sets',
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783593915/Gemini_Generated_Image_8qjr108qjr108qjr_buoysk.avif'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      subtitle: 'Support Essentials',
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783600896/cap_w8moh1.avif'
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
    inStock: true,
    keyBenefits: [
      "Premium craftsmanship",
      "Lightweight and breathable",
      "Made from natural fibres",
      "Designed for everyday comfort",
      "Ergonomic support",
      "Suitable for all seasons",
      "Modern premium styling",
      "Easy to maintain"
    ],
    features: [
      "Premium breathable construction",
      "Natural fibre materials",
      "Lightweight design",
      "Comfortable for extended use",
      "Durable everyday performance",
      "Minimalist premium aesthetics",
      "Designed in India",
      "Machine washable"
    ],
    whyParentsLoveIt: [
      "Comfortable for daily use",
      "Premium quality materials",
      "Lightweight feel",
      "Easy to use",
      "Modern elegant design",
      "Excellent durability",
      "Perfect for everyday parenting"
    ],
    trustSafety: {
      "Safety Certifications": "",
      "Organic Certification": "",
      "Baby-safe Materials": "Yes",
      "Hip Healthy Certification": "",
      "Non-toxic Materials": "Yes",
      "Natural Fibres": "Yes"
    },
    whatsIncluded: [
      "",
      "",
      "",
      ""
    ],
    productHighlights: [
      "Premium Quality",
      "Breathable Construction",
      "Natural Fibres",
      "Lightweight Design",
      "Modern Styling",
      "Durable Materials",
      "Machine Washable",
      "Designed in India"
    ],
    usageInstructions: [
      "Read the instruction manual before use.",
      "Adjust the product according to the intended use.",
      "Ensure all straps or fittings are properly secured.",
      "Check the product before every use.",
      "Discontinue use if any damage is observed."
    ],
    washingInstructions: [
      "Machine wash cold.",
      "Use gentle cycle.",
      "Do not bleach.",
      "Air dry.",
      "Store in a cool, dry place."
    ],
    faqs: [
      {
        question: "What material is this product made from?",
        answer: "Made using premium natural fibres for comfort and durability."
      },
      {
        question: "Is this product machine washable?",
        answer: "Yes. Machine wash using a gentle cycle with cold water."
      },
      {
        question: "Is it safe for babies?",
        answer: "Yes. It is designed using baby-safe materials and premium craftsmanship."
      },
      {
        question: "Can this be used every day?",
        answer: "Yes. It is designed specifically for everyday use."
      },
      {
        question: "Where is it designed?",
        answer: "Designed with care in India."
      }
    ],
  },

  // --------------------------------------------------------------------------
  // 11. Full Storefront Products Catalog SOT
  // --------------------------------------------------------------------------
  products: [
    {
      id: 'boundless-baby-carrier-black-white-houndstooth',
      title: 'BOUNDLESS Baby Carrier – Black & White Houndstooth',
      price: 129.99,
      originalPrice: 159.99,
      rating: 5,
      reviewsCount: 84,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602530/1main_qvbcb9.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602530/1main_qvbcb9.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602531/2_bm3awb.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602530/3_heaq33.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602532/4_pktymq.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602532/5_iiuxeu.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602510/6_jozhlb.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602533/7_igcaqd.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602532/8_fe2izj.jpg',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602531/9_dmh8s2.webp'
      ],

      category: 'carriers',
      badge: 'HANDCRAFTED',
      tagline: 'A timeless wrap designed for everyday carrying with premium organic comfort.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#E5DCC5', '#A48E6D', '#7B7F75'],
      specs: {
        'Panel Height': '14.5" (Adjustable)',
        'Seat Width': '12" - 15"',
        'Waistbelt Range': '24" - 56"',
        'Carrier Weight': '1.6 lbs',
        'Carry Positions': 'Front, Hip, Back',
        'Materials': '55% Organic Linen, 45% Organic Hemp',
        'Age Limit': 'Newborn to Toddler (7 lbs - 40 lbs)',
        'Care': 'Machine wash cold, line dry flat.'
      },
      inStock: true,
    },
    {
      id: 'boundless-baby-carrier-mocha-cream-houndstooth',
      title: 'BOUNDLESS Baby Carrier – Mocha Cream Houndstooth',
      price: 149.99,
      originalPrice: 189.99,
      rating: 5,
      reviewsCount: 112,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605230/2_fo8ygk.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605230/2_fo8ygk.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605234/3_fpzcp7.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605232/4_p6w0p8.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605231/5_czxwgx.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605237/6_szj5mf.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605234/7_wrbzh8.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605235/9_pvbjbt.webp'
      ],


      category: 'carriers',
      badge: 'BREATHABLE',
      tagline: 'Feather-soft support with premium airflow for longer, cooler carry sessions.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#D8D6CB', '#7C8A6B', '#6A7472'],
      specs: {
        'Panel Height': '15" (Adjustable)',
        'Seat Width': '13" - 16"',
        'Waistbelt Range': '26" - 58"',
        'Carrier Weight': '1.7 lbs',
        'Carry Positions': 'Front, Back, Hip',
        'Materials': '72% Organic Cotton, 28% Recycled Polyester',
        'Age Limit': 'Newborn to 3 Years (7 lbs - 45 lbs)',
        'Care': 'Machine wash gentle, air dry.'
      },
      inStock: true,
    },
    {
      id: 'boundless-baby-carrier-mocha-mousse-diamond',
      title: 'BOUNDLESS Baby Carrier – Mocha Mousse Diamond',
      price: 139.99,
      originalPrice: 169.99,
      rating: 5,
      reviewsCount: 97,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/mocha_moose_main_ctmrjp.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/mocha_moose_main_ctmrjp.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/1brown_bj0aaq.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/2brown_rohfzl.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/3brown_mmq9i0.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/4brown_ykuoes.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/5brown_jooqnt.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/6brown_e1uaxo.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/7brown_iqnvve.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/8brown_ex23sh.webp'
      ],
      category: 'carriers',
      badge: 'ORGANIC',
      tagline: 'Soft organic cotton with ergonomic design for gentle, all-day wear.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#F2E8D5', '#A8B4A4', '#5A5B57'],
      specs: {
        'Panel Height': '14" - 16"',
        'Seat Width': '12" - 15"',
        'Waistbelt Range': '24" - 56"',
        'Carrier Weight': '1.5 lbs',
        'Carry Positions': 'Front, Hip',
        'Materials': '100% Organic Cotton',
        'Age Limit': 'Newborn to 24 Months',
        'Care': 'Machine wash cold, lay flat to dry.'
      },
      inStock: true,
    },
    {
      id: 'boundless-baby-carrier-dark-grey-diamond',
      title: 'BOUNDLESS Baby Carrier – Dark Grey Diamond',
      price: 159.99,
      originalPrice: 199.99,
      rating: 5,
      reviewsCount: 76,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606154/2_tbu5om.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606154/2_tbu5om.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606154/01_zmmylp.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606157/3_yvzgwp.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606156/5_jk3hdm.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606162/7_bwp734.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606161/4_noaqlg.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606158/6_k3xc7d.webp'
      ],

      category: 'carriers',
      badge: 'ADVENTURE READY',
      tagline: 'Built for the outdoors with reinforced straps and rugged comfort.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#3C4A3D', '#AFA58D', '#D9D1C2'],
      specs: {
        'Panel Height': '15" (Adjustable)',
        'Seat Width': '12.5" - 16"',
        'Waistbelt Range': '26" - 60"',
        'Carrier Weight': '1.9 lbs',
        'Carry Positions': 'Front, Back, Hip',
        'Materials': 'Organic Canvas, Breathable Mesh',
        'Age Limit': 'Newborn to 3 Years (7 lbs - 45 lbs)',
        'Care': 'Hand wash cold, line dry.'
      },
      inStock: true,
    },
    {
      id: 'combo-1-baby-carrier-1-pouch-black-white-houndstooth',
      title: 'Combo (1 Baby Carrier + 1 Pouch) – Black & White Houndstooth',
      price: 179.99,
      originalPrice: 219.99,
      rating: 5,
      reviewsCount: 64,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783603811/Combo_front_black_and_white_pqqv9n.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602530/1main_qvbcb9.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602531/2_bm3awb.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602530/3_heaq33.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602532/4_pktymq.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602532/5_iiuxeu.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602510/6_jozhlb.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602533/7_igcaqd.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602532/8_fe2izj.jpg',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783602531/9_dmh8s2.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783603811/last-comboblackandwhite_ckdsdj.webp'
      ],


      category: 'combos',
      badge: 'BUNDLE',
      tagline: 'A matching carrier and accessories set for travel-ready families.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#2E2E2C', '#F1E4D0', '#C5B7A1'],
      specs: {
        'Includes': 'Carrier, Travel Pouch, Comfort Pad',
        'Carrier Weight': '1.7 lbs',
        'Materials': 'Organic Cotton & Linen',
        'Age Limit': 'Newborn to Toddler',
        'Care': 'Machine wash cold on gentle.'
      },
      inStock: true,
    },
    {
      id: 'combo-1-baby-carrier-1-pouch-mocha-cream-houndstooth',
      title: 'Combo (1 Baby Carrier + 1 Pouch) – Mocha Cream Houndstooth',
      price: 169.99,
      originalPrice: 209.99,
      rating: 5,
      reviewsCount: 72,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605230/1_h6zwkj.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605230/1_h6zwkj.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605230/2_fo8ygk.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605234/3_fpzcp7.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605232/4_p6w0p8.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605231/5_czxwgx.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605237/6_szj5mf.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605234/7_wrbzh8.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605238/8_qkkkjl.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783605235/9_pvbjbt.webp'
      ],

      category: 'combos',
      badge: 'KIT',
      tagline: 'A curated starter set for new parents, complete with essentials and style.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#8F7E6D', '#D3C8B0', '#6B6D67'],
      specs: {
        'Includes': 'Carrier, Comfort Padding, Organizer Pouch',
        'Materials': 'Organic Cotton Blend',
        'Age Limit': 'Newborn to 24 Months',
        'Care': 'Machine wash cold, tumble dry low.'
      },
      inStock: true,
    },
    {
      id: 'combo-1-baby-carrier-1-pouch-dark-grey-diamond',
      title: 'Combo (1 Baby Carrier + 1 Pouch) – Dark Grey Diamond',
      price: 139.99,
      originalPrice: 169.99,
      rating: 5,
      reviewsCount: 53,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606153/1_xk9fuc.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606153/1_xk9fuc.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606154/2_tbu5om.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606154/01_zmmylp.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606157/3_yvzgwp.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606156/5_jk3hdm.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606162/7_bwp734.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606161/4_noaqlg.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606158/6_k3xc7d.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783606160/combolast_mbmdf3.webp'
      ],

      category: 'combos',
      badge: 'NIGHTLY',
      tagline: 'A dreamy bundle for soft sleep and quiet comfort on the go.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#DCE3D4', '#B1ADA0', '#C9B8A6'],
      specs: {
        'Includes': 'Carrier, Lumbar Cushion, Swaddle Wrap',
        'Materials': 'Organic Cotton & Bamboo',
        'Age Limit': 'Newborn to 18 Months',
        'Care': 'Machine wash cold, gentle cycle.'
      },
      inStock: true,
    },
    {
      id: 'combo-1-baby-carrier-1-pouch-mocha-mousse-diamond',
      title: 'Combo (1 Baby Carrier + 1 Pouch) – Mocha Mousse Diamond',
      price: 189.99,
      originalPrice: 229.99,
      rating: 5,
      reviewsCount: 61,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601922/last_image_combo_Mocha_moose_izid8y.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601922/last_image_combo_Mocha_moose_izid8y.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/1brown_bj0aaq.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/2brown_rohfzl.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/3brown_mmq9i0.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/4brown_ykuoes.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601603/5brown_jooqnt.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/6brown_e1uaxo.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/7brown_iqnvve.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601604/8brown_ex23sh.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783601922/last_image_combo_Mocha_moose_izid8y.webp'
      ],
      category: 'combos',
      badge: 'EXPLORER',
      tagline: 'A full bundle built for families who love to wander and travel light.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#4A4D49', '#C6B79A', '#F0E7DA'],
      specs: {
        'Includes': 'Carrier, Shoulder Pads, Carry Pouch',
        'Materials': 'Organic Canvas & Plush Cotton',
        'Age Limit': 'Newborn to 30 lbs',
        'Care': 'Machine wash cold, air dry.'
      },
      inStock: true,
    },
    {
      id: 'hands-free-haven-pouch-black-white-houndstooth',
      title: 'Hands-Free Haven Pouch – Black & White Houndstooth',
      price: 54.99,
      originalPrice: 69.99,
      rating: 5,
      reviewsCount: 28,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660275/1_ccvoqe.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660275/1_ccvoqe.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660275/2_y3v4kg.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660276/3_zf0h3w.webp'
      ],
      category: 'pouches',
      badge: 'CUDDLE',
      tagline: 'A soothing pouch built for cozy naps and gentle settling.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#F2EDE5', '#B9C8B3'],
      specs: {
        'Height': '12"',
        'Width': 'Flexible Fit',
        'Materials': 'Organic Cotton Blend',
        'Age Limit': '0 - 12 Months',
        'Care': 'Machine wash cold, air dry.'
      },
      inStock: true,
    },
    {
      id: 'hands-free-haven-pouch-mocha-cream-houndstooth',
      title: 'Hands-Free Haven Pouch – Mocha Cream Houndstooth',
      price: 59.99,
      originalPrice: 74.99,
      rating: 5,
      reviewsCount: 34,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660276/1_m5tmzx.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660276/1_m5tmzx.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660277/2_tgowrn.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660276/3_mdypj2.webp'
      ],
      category: 'pouches',
      badge: 'SNUG',
      tagline: 'A plush swaddle crafted for gentle warmth and calm sleep.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#EEF3EA', '#A7B1A0'],
      specs: {
        'Height': '13"',
        'Width': 'Stretch-Fit',
        'Materials': 'Organic Cotton & Bamboo',
        'Age Limit': '0 - 12 Months',
        'Care': 'Tumble dry low.'
      },
      inStock: true,
    },
    {
      id: 'hands-free-haven-pouch-dark-grey-diamond',
      title: 'Hands-Free Haven Pouch – Dark Grey Diamond',
      price: 49.99,
      originalPrice: 64.99,
      rating: 5,
      reviewsCount: 29,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660275/1_ecimwh.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660275/1_ecimwh.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660275/2_auvymm.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660276/3_au831g.webp'
      ],
      category: 'pouches',
      badge: 'NEWBORN',
      tagline: 'A gentle nest for your baby’s first naps, crafted from breathable soft knit.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#F5F2EE', '#BAC7B4'],
      specs: {
        'Height': '12.5"',
        'Width': 'Stretch Tailored',
        'Materials': 'Organic Bamboo & Cotton',
        'Age Limit': '0 - 9 Months',
        'Care': 'Machine wash cold, line dry.'
      },
      inStock: true,
    },
    {
      id: 'hands-free-haven-pouch-mocha-mousse-diamond',
      title: 'Hands-Free Haven Pouch – Mocha Mousse Diamond',
      price: 62.99,
      originalPrice: 79.99,
      rating: 5,
      reviewsCount: 39,
      image: 'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660277/1_xsvpme.webp',
      images: [
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660277/1_xsvpme.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660276/2_kxkhml.webp',
        'https://res.cloudinary.com/f6trn8aq/image/upload/v1783660276/3_m39y4w.webp'
      ],
      category: 'pouches',
      badge: 'SOFT',
      tagline: 'An elegant sleep wrap for overnight calm and easy wear.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#E1DEE7', '#9A9DA5'],
      specs: {
        'Height': '13"',
        'Width': 'Flexible and Soft',
        'Materials': 'Organic Cotton & Modal',
        'Age Limit': '0 - 12 Months',
        'Care': 'Machine wash cold, tumble dry low.'
      },
      inStock: true,
    },
    {
      id: 'in-my-mom-era-cap',
      title: 'In My Mom Era™️ Cap',
      price: 24.99,
      originalPrice: 34.99,
      rating: 5,
      reviewsCount: 46,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Piw4J1xyoTlo5PGRSLjIISiFjyiPgMDlCYZn_jWcfZfK4mjePiBtpaOlkUdVfFc2CL3Jk66_BDlQQARD9aBAorecrOG_Q_kRZ1LFZFmrLdIw1YkOnGkS05K6PEJakq1rPQExw_6GbIH_ckRcEU0OyoDRTRHU6HYq7jiK4aR-b79qEgiWph_gECwsAsaLNc9ljjOGevOxt78Ds34LFBNSnDT6wop79rqU0QB28I72tqUOO_9dJuIWJbL1s9TkdX8M4pWH7l0eOGI',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Piw4J1xyoTlo5PGRSLjIISiFjyiPgMDlCYZn_jWcfZfK4mjePiBtpaOlkUdVfFc2CL3Jk66_BDlQQARD9aBAorecrOG_Q_kRZ1LFZFmrLdIw1YkOnGkS05K6PEJakq1rPQExw_6GbIH_ckRcEU0OyoDRTRHU6HYq7jiK4aR-b79qEgiWph_gECwsAsaLNc9ljjOGevOxt78Ds34LFBNSnDT6wop79rqU0QB28I72tqUOO_9dJuIWJbL1s9TkdX8M4pWH7l0eOGI'
      ],
      category: 'accessories',
      badge: 'ESSENTIAL',
      tagline: 'A cuddle-safe teether pad to protect straps and calm babies on the move.',
      description: '<p>Baby Dwelling presents a modern fusion of style and functionality. Crafted from premium breathable natural fabrics, this product is designed to provide exceptional comfort, durability, and everyday practicality. Thoughtfully engineered for modern families, it combines timeless aesthetics with ergonomic performance for daily use.</p>',
      retailer: 'amazon',
      buyUrl: 'https://www.amazon.co.uk',
      colors: ['#B9C4B0', '#ECE1D6'],
      specs: {
        'Size': '8" x 3"',
        'Materials': 'Organic Cotton, Silicone Chew Ring',
        'Care': 'Machine wash cold, air dry.',
        'Compatibility': 'Fits most carriers and slings'
      },
      inStock: true,
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
