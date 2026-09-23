const $ = (selector) => document.querySelector(selector)

function readItems() {
  try {
    const stored = JSON.parse(localStorage.getItem('kitchenfleva-bag') || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function itemPrice(item) {
  return Number(item.price_kes ?? item.price ?? 0)
}

export function createCart() {
  let items = readItems()

  function render() {
    const count = $('#cart-count')
    const list = $('#cart-items')
    const total = $('#cart-total')

    if (count) count.textContent = items.length
    if (total) total.textContent = `KES ${items.reduce((sum, item) => sum + itemPrice(item), 0).toLocaleString()}`
    if (list) {
      list.innerHTML = items.length
        ? items.map((item, index) => `<div class="cart-item"><span>${item.title}<br><small>KES ${itemPrice(item).toLocaleString()}</small></span><button class="remove-item" data-item="${index}" aria-label="Remove item">×</button></div>`).join('')
        : '<p class="empty-cart">Your bag is waiting for something lovely.</p>'
    }

    localStorage.setItem('kitchenfleva-bag', JSON.stringify(items))
  }

  function open() {
    $('#cart-drawer')?.classList.add('open')
    $('#cart-drawer')?.setAttribute('aria-hidden', 'false')
    $('#overlay')?.classList.add('show')
  }

  function close() {
    $('#cart-drawer')?.classList.remove('open')
    $('#cart-drawer')?.setAttribute('aria-hidden', 'true')
    $('#overlay')?.classList.remove('show')
  }

  function add(product) {
    items.push({ title: product.title, price: itemPrice(product) })
    render()
    open()
  }

  document.addEventListener('click', (event) => {
    const remove = event.target.closest('.remove-item')
    if (!remove) return
    items.splice(Number(remove.dataset.item), 1)
    render()
  })

  $('#cart-open')?.addEventListener('click', open)
  $('#cart-close')?.addEventListener('click', close)
  $('#overlay')?.addEventListener('click', close)
  render()

  return { add, open, close, render }
}
