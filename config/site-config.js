/**
 * /config/site-config.js
 * ----------------------------------------------------------------------
 * Global configuration settings for Kitchen Fleva (branding, contact, defaults).
 * ----------------------------------------------------------------------
 */

const siteConfig = {
    // --- BRANDING ---
    siteName: "Kitchen Fleva",
    taglines: [
        "Made with Passion. Served with Fleva.",
        "Add Some Fleva to Your Kitchen!",
    ],
    logo: {
        desktop: '/assets/images/logo.png',
        favicon: '/assets/images/favicon.ico',
    },

    // --- CONTACT INFO ---
    contact: {
        email: 'info@kitchenfleva.com',
        phone: '+254712345678', // Example Kenyan number (WhatsApp compatible)
        address: 'Nairobi, Kenya',
        social: {
            facebook: 'https://facebook.com/KitchenFleva',
            instagram: 'https://instagram.com/KitchenFleva',
            pinterest: 'https://pinterest.com/KitchenFleva',
            whatsapp: 'https://wa.me/254712345678',
            youtube: 'https://youtube.com/KitchenFleva',
        },
    },

    // --- DEFAULTS ---
    defaultSettings: {
        language: 'en', // Default language
        theme: 'light', // Default theme mode
        maxRecipeCards: 12, // Default recipes per page/load
    },

    // --- SUBSCRIPTIONS ---
    subscriptionPlans: {
        free: { name: "Free", price: 0, benefits: ["Limited content", "Basic search"] },
        basic: { name: "Basic", price: 500, currency: "KES", benefits: ["50+ exclusive recipes", "Weekly AI meal plan"] },
        premium: { name: "Premium", price: 1500, currency: "KES", benefits: ["Unlimited access", "AI Recipe Generator", "Priority support"] },
        vip: { name: "VIP", price: 3000, currency: "KES", benefits: ["All Premium features", "Personalized AI tools", "Exclusive video access"] },
    },

    // --- LEGAL LINKS (Paths to the HTML files) ---
    legal: [
        { title: 'Terms of Use', hash: '#terms', path: 'legal/terms-of-service.html' },
        { title: 'Privacy Policy', hash: '#privacy', path: 'legal/privacy-policy.html' },
        { title: 'Cookie Policy', hash: '#cookies', path: 'legal/cookie-policy.html' },
        { title: 'Disclaimer', hash: '#disclaimer', path: 'legal/disclaimer.html' },
    ]
};

export default siteConfig;
