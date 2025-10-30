/**
 * /router.js
 * ----------------------------------------------------------------------
 * Core Routing Module for Kitchen Fleva.
 * Handles URL hash changes, dynamic content loading, and role-based access control.
 * ----------------------------------------------------------------------
 */

// --- 1. Imports and Dependencies ---
// In a real setup, we would import the map from './config/routes.js'
// and error/access denied messages from './js/ui.js'.

import { logger } from './utils/logger.js';
import { renderAccessDenied, renderNotFound } from './js/ui.js'; 

// Placeholder Route Map (The final map will reside in /config/routes.js)
// Structure: { hash: { path: '/path/to/html', role: 'required_role' } }
const ROUTE_MAP = {
    '#home': { path: 'pages/home.html', role: 'public' },
    '#recipes': { path: 'pages/recipe-library.html', role: 'public' },
    '#blog': { path: 'pages/blog-main.html', role: 'public' },
    '#login': { path: 'pages/login.html', role: 'public' },
    '#profile': { path: 'pages/profile.html', role: 'subscriber' }, // Requires any authenticated user
    '#admin-dashboard': { path: 'dashboards/admin/index.html', role: 'admin' },
    '#moderator-dashboard': { path: 'dashboards/moderator/index.html', role: 'moderator' },
    // Add other routes here: #shop, #contact, #ai-tools, etc.
};


// --- 2. CORE ROUTING FUNCTIONS ---

/**
 * Fetches and injects the HTML content into the main application container.
 * @param {string} htmlPath - The path to the HTML partial to load.
 */
async function loadHtmlPartial(htmlPath) {
    const container = document.getElementById('app-content');
    
    // Show spinner while fetching
    container.innerHTML = `<div class="full-screen-loader">
        <div class="spinner-dot"></div><div class="spinner-dot"></div><div class="spinner-dot"></div>
        <p>Loading Fleva...</p>
    </div>`;

    try {
        const response = await fetch(htmlPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${htmlPath}: ${response.status}`);
        }
        const html = await response.text();
        container.innerHTML = html;
        logger.log(`[Router] Successfully loaded: ${htmlPath}`);

        // Post-load hook: Execute any page-specific initialization functions
        // Example: If loading 'pages/home.html', look for a window.initHomePage() function.
        const pageName = htmlPath.split('/').pop().replace('.html', '');
        const initFunction = window[`init${pageName.replace(/-/g, '')}`];
        if (typeof initFunction === 'function') {
             initFunction();
        }

    } catch (error) {
        logger.error(`[Router] Load Error:`, error.message);
        renderNotFound(); // Fallback to a 404 page
    }
}

/**
 * Handles the current URL hash, enforcing RBAC before content load.
 */
function handleRouting() {
    // Ensure window.App state is available (set in app.js)
    if (!window.App.isAuthReady) {
        logger.warn('Router waiting for Auth initialization...');
        return;
    }
    
    const hash = window.location.hash || '#home';
    window.App.currentPage = hash;
    const route = ROUTE_MAP[hash];
    
    // --- Access Control Check ---
    if (!route) {
        logger.warn(`Route not found for hash: ${hash}`);
        return renderNotFound();
    }
    
    const userRole = window.App.profile ? window.App.profile.role : 'public';
    const requiredRole = route.role;
    let allowed = true;

    if (requiredRole !== 'public') {
        if (!window.App.user) {
            // Case 1: Route requires authentication but user is logged out
            allowed = false;
        } else if (requiredRole === 'admin' && userRole !== 'admin') {
            // Case 2: Route requires 'admin' but user is not admin
            allowed = false;
        } else if (requiredRole === 'moderator' && userRole !== 'admin' && userRole !== 'moderator') {
            // Case 3: Route requires 'moderator' but user is not admin/moderator
            allowed = false;
        } else if (requiredRole === 'subscriber' && userRole === 'public') {
             // Case 4: Route requires basic membership/profile but user is logged out/public
             allowed = false;
        }
    }
    
    if (allowed) {
        loadHtmlPartial(route.path);
    } else {
        logger.warn(`Access denied for ${hash}. Role: ${userRole}, Required: ${requiredRole}`);
        renderAccessDenied();
        // Optionally redirect to the login page for non-auth users
        if (!window.App.user) {
            window.location.hash = '#login';
        }
    }
}


// --- 3. EXPORT AND INITIALIZATION ---

/**
 * Starts the routing process by attaching listeners.
 */
export function initializeRouter() {
    // Initial load check
    handleRouting(); 
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouting);
    
    // Add click listener for internal navigation (to handle links not changing the hash)
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link && link.hash && link.hash !== window.location.hash) {
            e.preventDefault();
            window.location.hash = link.hash;
        }
    });
    
    logger.debug('[Router] Initialized.');
  }
      
