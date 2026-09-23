import { initialiseHomePage } from './js/pages/homePage.js'

function initialiseTheme() {
  const savedTheme = localStorage.getItem('kitchenfleva-theme') || 'light'
  document.body.classList.toggle('dark', savedTheme === 'dark')
}

async function bootstrap() {
  initialiseTheme()

  if (document.querySelector('#home')) {
    await initialiseHomePage()
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true })
} else {
  bootstrap()
}
