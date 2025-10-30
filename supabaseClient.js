/**
 * /supabaseClient.js
 * ----------------------------------------------------------------------
 * Central module for initializing and exporting the Supabase client.
 * Imports environment variables for secure connection.
 * ----------------------------------------------------------------------
 */

// NOTE: In a real-world, non-SPA project using a bundler (like Vite or Webpack), 
// the Supabase SDK would be installed via npm and imported via 'import { createClient } from "@supabase/supabase-js"'.
// For this single HTML file architecture, we rely on the global 'supabase' object loaded in index.html.

// The global constants object (which should contain API keys loaded from .env)
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config/constants.js';
import { logger } from './utils/logger.js';

// Check if the necessary keys are available
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    logger.error('FATAL ERROR: Supabase URL or Anon Key is missing. Check /config/constants.js and .env.example.');
    // Fallback to anonymous client if keys are truly unavailable (not recommended)
    const supabaseClient = {
        auth: { getSession: () => ({ data: { session: null } }) },
        from: () => ({ select: () => ({ data: [], error: { message: "Supabase connection failed due to missing keys." } }) }),
        // Mock the client to prevent immediate crash
    };
    export default supabaseClient;
}


/**
 * Initializes the Supabase client using the global keys.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        // Automatically refresh tokens and manage session state
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
    // Optional configuration for performance/region optimization
    realtime: {
        // Example: Only enable for specific tables if needed to save resources
        suppressLocalBroadcasts: true,
    }
});

logger.debug('Supabase Client Initialized Successfully.');

// Export the initialized client for use in auth.js, api.js, etc.
export default supabaseClient;
