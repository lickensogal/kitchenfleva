import { supabase, isSupabaseConfigured } from '../supabaseClient.js'

export async function subscribeToNewsletter(email, source = 'homepage') {
  const normalizedEmail = email?.trim().toLowerCase()
  if (!normalizedEmail) throw new Error('Email is required.')
  if (!isSupabaseConfigured || !supabase) return { email: normalizedEmail, localOnly: true }

  const { data, error } = await supabase.from('newsletter_subscribers').upsert(
    { email: normalizedEmail, source },
    { onConflict: 'email', ignoreDuplicates: true },
  ).select().maybeSingle()
  if (error) throw new Error(`Newsletter signup failed: ${error.message}`)
  return data
}
