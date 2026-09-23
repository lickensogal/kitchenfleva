import { initialiseHomePage } from './js/pages/homePage.js'

const savedTheme = localStorage.getItem('kitchenfleva-theme') || 'light'

function initialiseTheme() {
  document.body.classList.toggle('dark', savedTheme === 'dark')

  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark')
    localStorage.setItem('kitchenfleva-theme', isDark ? 'dark' : 'light')
  })
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
