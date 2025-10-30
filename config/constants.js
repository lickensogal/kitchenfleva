/**
 * /config/constants.js
 * ----------------------------------------------------------------------
 * Centralized constant definitions and environment variable loading.
 * NOTE: Keys are loaded via the global process.env (runtime injection).
 * ----------------------------------------------------------------------
 */

// --- ENVIRONMENT VARIABLES (Loaded from .env.example/Runtime) ---
export const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'; // Should be loaded from process.env.VITE_SUPABASE_URL
export const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Should be loaded from process.env.VITE_SUPABASE_ANON_KEY
export const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // For AI features
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/';
export const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025'; // Default model for text/structured data

// --- SUPABASE STORAGE BUCKETS ---
export const BUCKET_RECIPES = 'recipe_images';
export const BUCKET_PRODUCTS = 'product_downloads';
export const BUCKET_VIDEOS = 'ai_videos';

// --- API ENDPOINTS (Internal Supabase Edge Functions) ---
// These are client-facing URLs that trigger the secure backend logic.
export const API_PAYMENTS_PROCESS = '/functions/v1/handlePayments'; 
export const API_AI_GENERATE = '/functions/v1/ai-generate';

// --- UI AND UX CONSTANTS ---
export const COOKIE_CONSENT_KEY = 'kf_cookie_consent';
export const MAX_RECIPE_TITLE_LENGTH = 70;
export const MAX_BLOG_SNIPPET_LENGTH = 150;
export const ANIMATION_DURATION = 300; // ms for transitions

// --- PAYMENT GATEWAY CODES (Used for database tracking) ---
export const PAYMENT_MPESA = 'M-Pesa';
export const PAYMENT_STRIPE = 'Stripe';
export const PAYMENT_PAYPAL = 'PayPal';

// --- USER ROLE CODES ---
export const ROLE_ADMIN = 'admin';
export const ROLE_MODERATOR = 'moderator';
export const ROLE_SUBSCRIBER = 'subscriber';
export const ROLE_PUBLIC = 'public';
