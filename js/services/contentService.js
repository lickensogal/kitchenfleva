import { supabase, isSupabaseConfigured } from '../../supabaseClient.js'
import { fallbackContent } from '../data/fallbackContent.js'

export async function getHomeContent() {
  const content = {
    recipes: [...fallbackContent.recipes],
    stories: [...fallbackContent.stories],
    products: [...fallbackContent.products],
  }

  if (!isSupabaseConfigured || !supabase) return content

  const [recipes, stories, products] = await Promise.all([
    supabase.from('recipes').select('*').eq('is_published', true).order('created_at', { ascending: false }),
    supabase.from('stories').select('*').eq('is_published', true).order('published_at', { ascending: false, nullsFirst: false }),
    supabase.from('products').select('*').eq('is_published', true).order('created_at', { ascending: false }),
  ])

  if (!recipes.error && recipes.data?.length) content.recipes = recipes.data
  if (!stories.error && stories.data?.length) content.stories = stories.data
  if (!products.error && products.data?.length) content.products = products.data
  return content
}
