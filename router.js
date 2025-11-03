/* ===========================================================================
   Kitchen Fleva - router.js
   Handles all page routing, dynamic content injection, and SPA-like behavior
   =========================================================================== */

import * as UI from "./js/ui.js";

// =========================
// DOM SELECTORS
// =========================
const appContainer = document.getElementById("app");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

// =========================
// PAGE MAPPING
// =========================
const pages = {
  home: "pages/home.html",
  about: "pages/about.html",
  "recipe-library": "pages/recipe-library.html",
  "recipe-single": "pages/recipe-single.html",
  "blog-main": "pages/blog-main.html",
  "blog-post": "/pages/blog-post.html",
  profile: "/pages/profile.html",
  contact: "/pages/contact.html",
  faq: "/pages/faq.html",
  login: "pages/login.html",
  register: "/pages/register.html",
  // dashboards
  "admin-dashboard": "/dashboards/admin/index.html",
  "moderator-dashboard": "/dashboards/moderator/index.html",
};

// =========================
// LOAD PAGE FUNCTION
// =========================
export async function loadPage(page, container = appContainer) {
  if (!pages[page]) {
    container.innerHTML = `<h2 class="text-center" style="padding:50px;">Page not found</h2>`;
    return;
  }

  try {
    // Load main HTML
    const response = await fetch(pages[page]);
    if (!response.ok) throw new Error("Failed to load page");
    const html = await response.text();
    container.innerHTML = html;

    // Load global components dynamically if placeholders exist
    await injectComponents();

    // Initialize page-specific scripts and UI
    UI.initAccordions();
    UI.initModals();
    UI.initCarousels();
    UI.initToasts();
    UI.initScrollTop();
    UI.bindDynamicButtons(container);

    // SEO & analytics updates
    updatePageMeta(page);

  } catch (err) {
    console.error("Router loadPage error:", err);
    container.innerHTML = `<h2 class="text-center" style="padding:50px;">Error loading page</h2>`;
  }
}

// =========================
// COMPONENT INJECTION
// =========================
async function injectComponents() {
  // HEADER
  const headerPlaceholder = document.querySelector("header[data-component='header']");
  if (headerPlaceholder) {
    const headerHTML = await fetch("/components/navbar.html").then(r => r.text());
    headerPlaceholder.innerHTML = headerHTML;
  }

  // FOOTER
  const footerPlaceholder = document.querySelector("footer[data-component='footer']");
  if (footerPlaceholder) {
    const footerHTML = await fetch("/components/footer.html").then(r => r.text());
    footerPlaceholder.innerHTML = footerHTML;
  }

  // MODALS
  const modalPlaceholder = document.querySelector("div[data-component='modals']");
  if (modalPlaceholder) {
    const modalHTML = await fetch("/components/modal.html").then(r => r.text());
    modalPlaceholder.innerHTML = modalHTML;
  }

  // CARDS & PAGINATION can be dynamically injected similarly if placeholders exist
}

// =========================
// PAGE META / SEO
// =========================
function updatePageMeta(page) {
  const titleMap = {
    home: "Kitchen Fleva - Home",
    about: "About Us - Kitchen Fleva",
    "recipe-library": "Recipe Library - Kitchen Fleva",
    "recipe-single": "Recipe - Kitchen Fleva",
    "blog-main": "Blog - Kitchen Fleva",
    "blog-post": "Blog Post - Kitchen Fleva",
    profile: "My Profile - Kitchen Fleva",
    contact: "Contact Us - Kitchen Fleva",
    faq: "FAQ - Kitchen Fleva",
    login: "Login - Kitchen Fleva",
    register: "Register - Kitchen Fleva",
    "admin-dashboard": "Admin Dashboard - Kitchen Fleva",
    "moderator-dashboard": "Moderator Dashboard - Kitchen Fleva",
  };

  document.title = titleMap[page] || "Kitchen Fleva";
  const description = `Welcome to Kitchen Fleva - your hub for recipes, blogs, AI culinary tools, and more.`;
  const metaDesc = document.querySelector("meta[name='description']");
  if (metaDesc) metaDesc.setAttribute("content", description);
}

// =========================
// EXPORTED FUNCTION TO PROGRAMMATICALLY NAVIGATE
// =========================
export async function navigateTo(page) {
  await loadPage(page);
  window.history.pushState({ page }, "", `${page}.html`);
}

// =========================
// INITIAL ROUTING ON LOAD
// =========================
export function initRouter() {
  const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "home";
  loadPage(currentPage);

  // Handle back/forward browser navigation
  window.addEventListener("popstate", (event) => {
    const page = event.state?.page || "home";
    loadPage(page);
  });
      }
