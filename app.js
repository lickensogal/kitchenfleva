const recipes = [
  { title: 'One-pot coconut chicken', category: 'quick', label: 'Weeknight favourite', time: '45 min · Easy', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80' },
  { title: 'Smoky sukuma wiki', category: 'kenyan', label: 'Kenyan favourite', time: '25 min · Easy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80' },
  { title: 'Cardamom tea cake', category: 'baking', label: 'Slow weekend', time: '1 hr · Medium', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80' },
  { title: 'Tomato and herb eggs', category: 'quick', label: 'Breakfast', time: '20 min · Easy', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=700&q=80' },
  { title: 'Pilau for a crowd', category: 'kenyan', label: 'Gather round', time: '1 hr · Medium', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80' },
  { title: 'The perfect mandazi', category: 'baking', label: 'From our archive', time: '50 min · Easy', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80' }
];
const stories = [
  { title: 'How to build a kitchen you actually enjoy cooking in', tag: 'Kitchen notes', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80', text: 'A few small changes can make everyday cooking feel lighter.' },
  { title: 'The story of tea, warmth and Kenyan afternoons', tag: 'Food culture', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80', text: 'Some recipes are really memories in disguise.' },
  { title: 'Five ways to make vegetables the main event', tag: 'Cooking well', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80', text: 'Big flavour does not need a long ingredient list.' }
];
const products = [
  { title: 'The Everyday Kenyan Kitchen', description: '24 recipes for generous, delicious meals.', price: 850 },
  { title: 'The Home Baker’s Notes', description: 'A practical guide to confident baking.', price: 650 },
  { title: 'Cook More, Stress Less', description: 'A seven-day meal planning guide.', price: 500 }
];
let bag = [];
const $ = (selector) => document.querySelector(selector);
function renderRecipes(filter = 'all') { $('#recipe-grid').innerHTML = recipes.filter(r => filter === 'all' || r.category === filter).map(r => `<article class="recipe-card"><div class="recipe-photo" style="background-image:url('${r.image}')"></div><div class="recipe-body"><small class="eyebrow">${r.label}</small><h3>${r.title}</h3><p>A comforting recipe with plenty of flavour and no fuss.</p><span class="card-meta">${r.time}</span></div></article>`).join(''); }
function renderStories() { $('#story-grid').innerHTML = stories.map(s => `<article class="story-card"><div class="story-image" style="background-image:url('${s.image}')"></div><small>${s.tag}</small><h3>${s.title}</h3><p>${s.text}</p><a class="text-link" href="#stories">Read story →</a></article>`).join(''); }
function renderProducts() { $('#product-grid').innerHTML = products.map((p, i) => `<article class="product-card"><div class="product-cover">${i === 0 ? 'Everyday<br>Kenyan<br>Kitchen' : i === 1 ? 'Home<br>Baker’s<br>Notes' : 'Cook more,<br>stress less'}</div><div class="product-info"><h3>${p.title}</h3><p>${p.description}</p><div class="product-bottom"><strong>KES ${p.price.toLocaleString()}</strong><button class="buy-btn" data-product="${p.title}">Add to bag</button></div></div></article>`).join(''); }
function renderBag() { $('#cart-count').textContent = bag.length; $('#cart-items').innerHTML = bag.length ? bag.map((p, i) => `<div class="cart-item"><span>${p.title}<br><small>KES ${p.price.toLocaleString()}</small></span><button data-remove="${i}">Remove</button></div>`).join('') : '<p class="empty-cart">Your bag is waiting for something lovely.</p>'; $('#cart-total').textContent = `KES ${bag.reduce((sum, p) => sum + p.price, 0).toLocaleString()}`; }
function openBag() { $('#cart-drawer').classList.add('open'); $('#cart-drawer').setAttribute('aria-hidden', 'false'); $('#overlay').classList.add('show'); }
function closeBag() { $('#cart-drawer').classList.remove('open'); $('#cart-drawer').setAttribute('aria-hidden', 'true'); $('#overlay').classList.remove('show'); }
renderRecipes(); renderStories(); renderProducts(); renderBag();
document.addEventListener('click', (event) => { const filter = event.target.closest('[data-filter]'); if (filter) { document.querySelectorAll('.filter').forEach(b => b.classList.remove('active')); filter.classList.add('active'); renderRecipes(filter.dataset.filter); } const buy = event.target.closest('[data-product]'); if (buy) { const product = products.find(p => p.title === buy.dataset.product); bag.push(product); renderBag(); openBag(); } const remove = event.target.closest('[data-remove]'); if (remove) { bag.splice(Number(remove.dataset.remove), 1); renderBag(); } });
$('#cart-open').addEventListener('click', openBag); $('#cart-close').addEventListener('click', closeBag); $('#overlay').addEventListener('click', closeBag); $('#checkout').addEventListener('click', () => alert(bag.length ? 'Checkout is the next step. Your bag is ready!' : 'Add a guide to your bag first.'));
$('.menu-toggle').addEventListener('click', () => { const nav = $('.site-nav'); const isOpen = nav.classList.toggle('open'); $('.menu-toggle').setAttribute('aria-expanded', isOpen); });
$('#theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
$('#newsletter-form').addEventListener('submit', (event) => { event.preventDefault(); $('#form-message').textContent = 'You’re on the list — welcome to the table!'; event.target.reset(); });
