import { supabase, isSupabaseConfigured } from '../supabaseClient.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeToNewsletter(email, source = 'homepage') {
  const normalizedEmail = email?.trim().toLowerCase()
  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    throw new Error('Please enter a valid email address.')
  }

  if (!isSupabaseConfigured || !supabase) {
    return { email: normalizedEmail, localOnly: true }
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { email: normalizedEmail, source },
      { onConflict: 'email', ignoreDuplicates: true },
    )
    .select()
    .maybeSingle()

  if (error) throw new Error(`Newsletter signup failed: ${error.message}`)
  return data || { email: normalizedEmail }
}

// Kept for legacy pages that explicitly call the initializer.
export default function initNewsletterForm() {
  const form = document.getElementById('newsletter-form')
  if (!form || form.dataset.newsletterBound === 'true') return
  form.dataset.newsletterBound = 'true'
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
      await subscribeToNewsletter(form.querySelector('input[type="email"]')?.value)
      form.reset()
    } catch (error) {
      console.error('Newsletter signup error:', error)
    }
  })
}
