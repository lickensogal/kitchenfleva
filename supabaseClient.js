import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.46.1'

const viteEnv = import.meta.env || {}
const runtimeEnv = globalThis.KITCHENFLEVA_CONFIG || {}

export const SUPABASE_URL = runtimeEnv.supabaseUrl || viteEnv.VITE_SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = runtimeEnv.supabaseAnonKey || viteEnv.VITE_SUPABASE_ANON_KEY || ''
export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  SUPABASE_URL.startsWith('https://') &&
  !SUPABASE_URL.includes('your-project') &&
  !SUPABASE_URL.includes('SAMPLE-') &&
  !SUPABASE_ANON_KEY.includes('your-publishable') &&
  !SUPABASE_ANON_KEY.includes('SAMPLE_'),
)

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      global: {
        headers: { 'x-client-info': 'kitchenfleva-web-v1' },
      },
    })
  : null

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }
  return supabase
}

export async function getCurrentUser() {
  const client = requireSupabase()
  const { data, error } = await client.auth.getUser()
  if (error) throw new Error(`Unable to fetch current user: ${error.message}`)
  return data.user
}

export async function signIn(email, password) {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return data
}

export async function signUp(email, password) {
  const { data, error } = await requireSupabase().auth.signUp({ email, password })
  if (error) throw new Error(error.message)
  return data
}

export async function signOut() {
  const { error } = await requireSupabase().auth.signOut()
  if (error) throw new Error(`Unable to sign out: ${error.message}`)
}

export async function insertData(table, payload) {
  const { data, error } = await requireSupabase().from(table).insert(payload).select()
  if (error) throw new Error(`Insert failed: ${error.message}`)
  return data
}

export async function fetchData(table, columns = ['*'], filter = '') {
  let query = requireSupabase().from(table).select(columns.join(','))
  if (filter) query = query.filter(filter)
  const { data, error } = await query
  if (error) throw new Error(`Fetch failed: ${error.message}`)
  return data
}
