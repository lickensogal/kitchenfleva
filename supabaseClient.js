// -----------------------------------------------------------------------------
// Kitchen Fleva - Supabase Client Initialization
// -----------------------------------------------------------------------------
// This module establishes a secure connection between your website and Supabase.
// It reads credentials from environment variables defined in .env
// and exports a ready-to-use Supabase client instance throughout the project.
// -----------------------------------------------------------------------------

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.46.1'

// --- Environment Variables ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://SAMPLE-supabase-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'SAMPLE_SUPABASE_ANON_KEY'

// --- Initialize Supabase Client ---
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-client-info': 'kitchenfleva-web-v1' },
  },
})

// --- Helper Functions ---

/**
 * Checks if the user is authenticated
 * @returns {Promise<object|null>}
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching current user:', error.message)
    return null
  }
  return data.user
}

/**
 * Sign in a user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return data
}

/**
 * Sign up new user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw new Error(error.message)
  return data
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Error signing out:', error.message)
}

/**
 * Insert data into a Supabase table
 * @param {string} table
 * @param {object} payload
 */
export async function insertData(table, payload) {
  const { data, error } = await supabase.from(table).insert(payload)
  if (error) throw new Error(`Insert failed: ${error.message}`)
  return data
}

/**
 * Fetch data from a Supabase table
 * @param {string} table
 * @param {string[]} columns
 * @param {string} [filter]
 */
export async function fetchData(table, columns = ['*'], filter = '') {
  let query = supabase.from(table).select(columns.join(','))
  if (filter) query = query.filter(filter)
  const { data, error } = await query
  if (error) throw new Error(`Fetch failed: ${error.message}`)
  return data
}

console.log('%c✅ Supabase Client Ready', 'color: green; font-weight: bold')
