/**
 * /app.js
 * ----------------------------------------------------------------------
 * Main entry point for the Kitchen Fleva Single Page Application (SPA).
 * Orchestrates initialization of Auth, Routing, UI, and Global State.
 * ----------------------------------------------------------------------
 */

// --- 1. CORE IMPORTS ---
// Supabase Client (Initialized separately for clarity)
import supabaseClient from './supabaseClient.js';
// Core App Logic
import { initializeRouter } from './router.js'; 
import { initializeAuth } from './js/auth.js';
import { loadNavbar, loadFooter } from './js/ui.js';
import * as Theme from './config/theme.js';
import * as Language from './js/language.js';
import { logger } from './utils/logger.js';

// --- 2. GLOBAL STATE ---
// Global state object accessible across the application via window.App
window.App = {
    supabase: supabaseClient,
    user: null,           // Current Supabase user (auth.user)
    profile: null,        // User's profile from the 'users' table (contains role/membership)
    isAuthReady: false,   // True once the initial auth check is complete
    language: 'en',       // Current active language code
    translations: {},     // Loaded translation map
    currentPage: '#home',
};

// --- 3. INITIALIZATION FUNCTION ---

/**
 * Initializes core services, loads UI components, and starts the application.
 */
async function initializeApp() {
    logger.debug('Starting Kitchen Fleva Initialization...');

    try {
        // A. Load Initial Configuration (Theme, Language)
        const initialLang = localStorage.getItem('user_lang') || 'en';
        window.App.language = initialLang;
        await Language.loadTranslations(initialLang); 
        
        const initialTheme = localStorage.getItem('user_theme');
        Theme.applyTheme(initialTheme);
        
        // B. Load Static UI Components (Navbar, Footer)
        await loadNavbar();
        await loadFooter();
        
        // C. Initialize Authentication and load user profile/role
        // This sets window.App.user, window.App.profile, and window.App.isAuthReady
        initializeAuth(); 

        // D. Wait for Auth check before starting router (ensures correct dashboard/premium access)
        await new Promise(resolve => {
            const check = setInterval(() => {
                if (window.App.isAuthReady) {
                    clearInterval(check);
                    resolve();
                }
            }, 50);
        });

        // E. Start Router
        initializeRouter();
        
    } catch (error) {
        logger.error('Failed during application initialization:', error);
        // Display a general error message to the user if core loading fails
        document.getElementById('app-content').innerHTML = `
            <div class="full-screen-loader">
                <h2>Error Loading Kitchen Fleva</h2>
                <p>A critical error occurred. Please refresh or try again later.</p>
            </div>
        `;
    } finally {
        // Remove the initial loading spinner regardless of success/failure
        document.getElementById('initial-loading-spinner')?.remove();
        logger.debug('Kitchen Fleva is Ready.');
    }
}

// --- 4. GLOBAL EVENT LISTENERS ---

/**
 * Handles the Dark Mode toggle button click in the Navbar.
 */
document.getElementById('header-container')?.addEventListener('click', (e) => {
    if (e.target.closest('#theme-toggle')) {
        const newTheme = Theme.toggleTheme(); 
        logger.log(`[Theme] Switched to ${newTheme} mode.`);
    }
});

/**
 * Handles the Language Selector dropdown change in the Navbar.
 */
document.getElementById('header-container')?.addEventListener('change', (e) => {
    if (e.target.id === 'language-selector') {
        const newLang = e.target.value;
        Language.switchLanguage(newLang); 
        logger.log(`[i18n] Switched language to ${newLang}.`);
    }
});


// --- 5. START APPLICATION ---
window.addEventListener('load', initializeApp);
  
