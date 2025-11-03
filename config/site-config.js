/* ===========================================================================
   Kitchen Fleva - site-config.js
   Core Site Constants & Meta Information
   =========================================================================== */

export const SITE_CONFIG = {
  // -------------------------
  // Basic Site Info
  // -------------------------
  siteName: "Kitchen Fleva",
  siteTagline: "Fresh Recipes, Tips & Culinary AI Insights",
  siteDescription: "Kitchen Fleva is your ultimate destination for healthy recipes, cooking tips, AI-powered culinary tools, blogs, and more.",
  siteKeywords: [
    "Kitchen Fleva", "Recipes", "Cooking Tips", "Healthy Meals", "AI Recipes", "Food Blog", "Culinary Tools"
  ],
  siteLogo: "/assets/images/logo.png",
  favicon: "/assets/images/favicon.ico",

  // -------------------------
  // URLs & Base Paths
  // -------------------------
  baseUrl: window.location.origin,           // Auto-detect current domain
  apiBaseUrl: "/api",                        // Default API base (can point to Supabase or backend endpoints)
  assetsPath: "/assets",                     // Path to images, media, etc.

  // -------------------------
  // Social Links
  // -------------------------
  social: {
    facebook: "https://facebook.com/kitchenfleva",
    instagram: "https://instagram.com/kitchenfleva",
    twitter: "https://twitter.com/kitchenfleva",
    linkedin: "https://linkedin.com/company/kitchenfleva",
    youtube: "https://youtube.com/kitchenfleva"
  },

  // -------------------------
  // SEO & Meta Defaults
  // -------------------------
  meta: {
    defaultTitle: "Kitchen Fleva | Fresh Recipes & Culinary Tips",
    defaultDescription: "Explore recipes, cooking tips, AI culinary tools, blogs, and more on Kitchen Fleva.",
    defaultImage: "/assets/images/hero-banner.jpg",
    defaultAuthor: "Kitchen Fleva Team",
    defaultViewport: "width=device-width, initial-scale=1",
    defaultCharset: "UTF-8"
  },

  // -------------------------
  // Analytics & Tracking
  // -------------------------
  analytics: {
    googleAnalyticsId: "G-XXXXXXXXXX",
    facebookPixelId: "XXXXXXXXXXXXXX"
  },

  // -------------------------
  // Newsletter / Forms
  // -------------------------
  newsletter: {
    tableName: "newsletter_subscribers",
    successMessage: "Thank you for subscribing!",
    errorMessage: "Failed to subscribe, please try again."
  },

  // -------------------------
  // Payment & E-commerce
  // -------------------------
  payments: {
    defaultCurrency: "USD",
    supportedGateways: ["mpesa", "stripe", "paypal", "paystack", "flutterwave", "razorpay"],
    successMessage: "Payment successful!",
    errorMessage: "Payment failed. Please try again."
  },

  // -------------------------
  // Miscellaneous
  // -------------------------
  defaultUserAvatar: "/assets/images/placeholders/user-placeholder.png",
  defaultRecipeImage: "/assets/images/placeholders/recipe-placeholder.jpg",
  maxUploadFileSizeMB: 25
};

// Console confirmation
console.log("%c✅ SITE CONFIG Loaded", "color: green; font-weight: bold");
