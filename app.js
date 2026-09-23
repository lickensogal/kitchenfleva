import { initialiseHomePage } from './js/pages/homePage.js'

/**
 * Application entry point.
 * Page-specific behaviour lives in js/pages rather than in this bootstrap file.
 */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'home'

  if (page === 'home') initialiseHomePage()
})
