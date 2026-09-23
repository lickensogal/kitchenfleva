import { subscribeToNewsletter } from './forms/newsletterForm.js'
import { createCart } from './js/ui/cart.js'
import { getHomeContent } from './js/services/contentService.js'
import { createHomeRenderer } from './js/components/homeRenderer.js'

const $ = (selector) => document.querySelector(selector)

export async function initialiseHomePage() {
  const cart = createCart()
  const content = await getHomeContent().catch((error) => {
    console.warn('Using local Kitchen Fleva content:', error.message)
    return import('../data/fallbackContent.js').then(({ fallbackContent }) => fallbackContent)
  })
  const renderer = createHomeRenderer(content)
  renderer.renderAll()
  bindHomeEvents(content, renderer, cart)
}

function bindHomeEvents(content, renderer, cart) {
  document.addEventListener('click', (event) => {
    const filter = event.target.closest('[data-filter]')
    if (filter) {
      document.querySelectorAll('[data-filter]').forEach((button) => button.classList.remove('active'))
      filter.classList.add('active')
      renderer.renderRecipes(filter.dataset.filter)
    }

    const add = event.target.closest('.product-add')
    if (add) {
      const product = content.products[Number(add.dataset.product)]
      if (product) cart.add(product)
    }
  })

  $('.menu-toggle')?.addEventListener('click', () => {
    const nav = $('.site-nav')
    if (!nav) return
    const open = nav.classList.toggle('open')
    $('.menu-toggle').setAttribute('aria-expanded', String(open))
  })

  $('#theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    localStorage.setItem('kitchenfleva-theme', document.body.classList.contains('dark') ? 'dark' : 'light')
  })

  const form = $('#newsletter-form')
  form?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = form.querySelector('input[type="email"]')?.value.trim()
    const message = $('#form-message')
    const submit = form.querySelector('button[type="submit"]')
    if (!email) return

    if (submit) submit.disabled = true
    if (message) message.textContent = 'Joining…'
    try {
      const result = await subscribeToNewsletter(email)
      if (message) message.textContent = result.localOnly
        ? 'You’re on the list locally. Connect Supabase to save subscriptions.'
        : 'You’re on the list — welcome to the table!'
      form.reset()
    } catch (error) {
      console.error('Newsletter signup error:', error)
      if (message) message.textContent = 'We could not subscribe you yet. Please try again.'
    } finally {
      if (submit) submit.disabled = false
    }
  })
}
