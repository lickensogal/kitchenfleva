const $ = (selector) => document.querySelector(selector)
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]))
const money = (value) => `KES ${Number(value || 0).toLocaleString()}`

export function createHomeRenderer(content, cart) {
  function renderRecipes(filter = 'all') {
    const grid = $('#recipe-grid')
    if (!grid) return
    grid.innerHTML = content.recipes.filter((recipe) => filter === 'all' || recipe.category === filter).map((recipe) => `
      <article class="recipe-card"><div class="recipe-photo" style="background-image:url('${escapeHtml(recipe.image || recipe.image_url || '')}')"></div>
        <div class="recipe-card-body"><small>${escapeHtml(recipe.label || recipe.category || 'Recipe')}</small><h3>${escapeHtml(recipe.title)}</h3><p>${escapeHtml(recipe.time || `${recipe.prep_minutes || 0} min · ${recipe.difficulty || 'Easy'}`)}</p></div>
      </article>`).join('')
  }

  function renderStories() {
    const grid = $('#story-grid')
    if (!grid) return
    grid.innerHTML = content.stories.map((story) => `
      <article class="story-card"><div class="story-image" style="background-image:url('${escapeHtml(story.image || story.image_url || '')}')"></div>
        <div class="story-card-body"><small>${escapeHtml(story.tag || story.category || 'Journal')}</small><h3>${escapeHtml(story.title)}</h3><p>${escapeHtml(story.text || story.excerpt || '')}</p><a class="text-link" href="#stories">Read story →</a></div>
      </article>`).join('')
  }

  function renderProducts() {
    const grid = $('#product-grid')
    if (!grid) return
    grid.innerHTML = content.products.map((product, index) => `
      <article class="product-card"><div class="product-cover">${product.cover || product.cover_label || ['Everyday<br>Kenyan<br>Kitchen', 'Home<br>Baker’s<br>Notes', 'Cook More,<br>Stress Less'][index % 3]}</div>
        <div class="product-card-body"><h3>${escapeHtml(product.title)}</h3><p>${escapeHtml(product.description)}</p><strong>${money(product.price_kes ?? product.price)}</strong><button class="btn product-add" data-product="${index}">Add to bag</button></div>
      </article>`).join('')
  }

  return { renderRecipes, renderStories, renderProducts, renderAll: () => { renderRecipes(); renderStories(); renderProducts() } }
}
