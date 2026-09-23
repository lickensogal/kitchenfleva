const $ = (selector) => document.querySelector(selector)

export function createCart() {
  let items = JSON.parse(localStorage.getItem('kitchenfleva-bag') || '[]')

  function render() {
    const count = $('#cart-count')
    const list = $('#cart-items')
    if (count) count.textContent = items.length
    if (list) list.innerHTML = items.length
      ? items.map((item, index) => `<div class="cart-item"><span>${item.title}<br><small>KES ${Number(item.price || 0).toLocaleString()}</small></span><button class="remove-item" data-item="${index}" aria-label="Remove item">×</button></div>`).join('')
      : '<p>Your bag is empty.</p>'
    localStorage.setItem('kitchenfleva-bag', JSON.stringify(items))
  }

  function open() { $('#cart-drawer')?.classList.add('open'); $('#cart-drawer')?.setAttribute('aria-hidden', 'false'); $('#overlay')?.classList.add('show') }
  function close() { $('#cart-drawer')?.classList.remove('open'); $('#cart-drawer')?.setAttribute('aria-hidden', 'true'); $('#overlay')?.classList.remove('show') }
  function add(product) { items.push({ title: product.title, price: product.price_kes ?? product.price }); render(); open() }

  document.addEventListener('click', (event) => {
    const remove = event.target.closest('.remove-item')
    if (remove) { items.splice(Number(remove.dataset.item), 1); render() }
  })
  $('#cart-open')?.addEventListener('click', open)
  $('#cart-close')?.addEventListener('click', close)
  $('#overlay')?.addEventListener('click', close)
  render()
  return { add, open, close, render }
}
