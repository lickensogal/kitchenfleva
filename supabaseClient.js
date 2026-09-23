// Kitchen Fleva - browser-safe Supabase client
// Only the publishable anon key belongs in browser code. Never expose a service-role key here.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.46.1'

const env = import.meta.env || {}
const SUPABASE_URL = env.VITE_SUPABASE_URL || env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('SAMPLE-') && !SUPABASE_ANON_KEY.includes('SAMPLE_'),
)

// Keep the static MVP usable before credentials are configured.
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      global: { headers: { 'x-client-info': 'kitchenfleva-web-v1' } },
    })
  : null

export async function getCurrentUser() {
  if (!supabase) return null
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data.user
}

export async function signIn(email, password) {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return data
}

export async function signUp(email, password) {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw new Error(error.message)
  return data
}

export async function signOut() {
  if (!supabase) return
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

export async function insertData(table, payload) {
  if (!supabase) throw new Error('Supabase is not configured yet.')
  const { data, error } = await supabase.from(table).insert(payload).select()
  if (error) throw new Error(`Insert failed: ${error.message}`)
  return data
}

export async function fetchData(table, columns = ['*']) {
  if (!supabase) return []
  const { data, error } = await supabase.from(table).select(columns.join(','))
  if (error) throw new Error(`Fetch failed: ${error.message}`)
  return data || []
}
