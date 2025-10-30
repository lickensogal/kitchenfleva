/**
 * /config/routes.js
 * ----------------------------------------------------------------------
 * Defines all application routes (Hash -> HTML path + required user role).
 * Roles: 'public', 'subscriber', 'moderator', 'admin'
 * ----------------------------------------------------------------------
 */

const routes = {
    // --- PUBLIC PAGES ---
    '#home': { path: 'pages/home.html', role: 'public', title: 'Home' },
    '#about': { path: 'pages/about.html', role: 'public', title: 'About Us' },
    '#recipes': { path: 'pages/recipe-library.html', role: 'public', title: 'Recipe Library' },
    '#recipe-single': { path: 'pages/recipe-single.html', role: 'public', title: 'Recipe Details' },
    '#blog': { path: 'pages/blog-main.html', role: 'public', title: 'Blog' },
    '#contact': { path: 'pages/contact.html', role: 'public', title: 'Contact' },
    '#faq': { path: 'pages/faq.html', role: 'public', title: 'FAQ' },
    '#login': { path: 'pages/login.html', role: 'public', title: 'Login' },
    '#register': { path: 'pages/register.html', role: 'public', title: 'Register' },
    
    // --- MEMBERSHIP / SHOP / LEGAL ---
    '#subscription': { path: 'pages/subscription.html', role: 'public', title: 'Membership' },
    '#shop': { path: 'pages/shop.html', role: 'public', title: 'Digital Shop' },
    '#ai-tools': { path: 'pages/ai-tools.html', role: 'subscriber', title: 'AI Tools' }, // Requires any authenticated user
    
    // --- LEGAL (Public access) ---
    '#privacy': { path: 'legal/privacy-policy.html', role: 'public', title: 'Privacy Policy' },
    '#terms': { path: 'legal/terms-of-service.html', role: 'public', title: 'Terms of Service' },
    '#cookies': { path: 'legal/cookie-policy.html', role: 'public', title: 'Cookie Policy' },
    '#disclaimer': { path: 'legal/disclaimer.html', role: 'public', title: 'Disclaimer' },

    // --- AUTHENTICATED USER PAGES ---
    '#profile': { path: 'pages/profile.html', role: 'subscriber', title: 'User Profile' },
    '#favorites': { path: 'pages/profile.html?tab=favorites', role: 'subscriber', title: 'Favorites' }, // Renders Profile page with specific tab
    '#generated-content': { path: 'pages/profile.html?tab=ai', role: 'subscriber', title: 'My AI Content' },

    // --- DASHBOARDS (RBAC Enforcement) ---
    '#admin-dashboard': { path: 'dashboards/admin/index.html', role: 'admin', title: 'Admin Dashboard' },
    '#admin-users': { path: 'dashboards/admin/users.html', role: 'admin', title: 'Manage Users' },
    '#admin-recipes': { path: 'dashboards/admin/recipes.html', role: 'admin', title: 'Manage Recipes' },
    
    '#moderator-dashboard': { path: 'dashboards/moderator/index.html', role: 'moderator', title: 'Moderator Dashboard' },
    '#moderator-flagged': { path: 'dashboards/moderator/flagged-content.html', role: 'moderator', title: 'Flagged Content' },

    // --- ERROR PAGES ---
    '#404': { path: 'pages/404.html', role: 'public', title: 'Page Not Found' },
    '#access-denied': { path: 'pages/access-denied.html', role: 'public', title: 'Access Denied' },
};

export default routes;
      
