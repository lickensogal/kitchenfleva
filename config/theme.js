/**
 * /config/theme.js
 * ----------------------------------------------------------------------
 * Handles the logic for Dark Mode / Light Mode switching and persistence.
 * ----------------------------------------------------------------------
 */

import { logger } from '../utils/logger.js';

const THEME_KEY = 'user_theme';

/**
 * Applies the specified theme to the document.
 * @param {string} theme - 'light' or 'dark'.
 */
export function applyTheme(theme) {
    const html = document.documentElement;
    const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
    html.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem(THEME_KEY, resolvedTheme);
    logger.log(`[Theme] Applied: ${resolvedTheme}`);
}

/**
 * Toggles the theme between light and dark.
 * @returns {string} The new theme ('light' or 'dark').
 */
export function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);

    // Update the Supabase user profile if logged in (async and non-blocking)
    if (window.App.user) {
        window.App.supabase
            .from('users')
            .update({ preferred_theme: newTheme })
            .eq('id', window.App.user.id)
            .then(({ error }) => {
                if (error) logger.error('Failed to save theme preference to DB:', error);
            });
    }
    
    return newTheme;
}

/**
 * Retrieves the preferred theme, checking local storage first, then the system preference.
 * @returns {string} 'light' or 'dark'.
 */
export function getPreferredTheme() {
    const localTheme = localStorage.getItem(THEME_KEY);
    if (localTheme) {
        return localTheme;
    }
    
    // Check system preference for initial load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    // Fallback to site default (which should align with site-config)
    return 'light';
}

// Initial application of theme based on stored preference
applyTheme(getPreferredTheme());
                                        
