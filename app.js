/* ===========================================================================
   Kitchen Fleva - app.js
   Main site loader, dynamic components injection, Supabase integration
   =========================================================================== */

import { supabase } from "./supabaseClient.js";
import { loadPage } from "./router.js";
import * as UI from "./js/ui.js";
import * as Auth from "./js/auth.js";
import * as Language from "./js/language.js";
import * as AI from "./js/ai_tools.js";
import * as Payments from "./js/payments.js";

// =========================
// 1) DOM SELECTORS
// =========================
const html = document.documentElement;
const body = document.body;

const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");

// Global dynamic container (for pages/components)
const appContainer = document.getElementById("app");

// =========================
// 2) INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", async () => {
  // Load default page
  const defaultPage = window.location.pathname.endsWith("/") ? "home" : window.location.pathname.split("/").pop().replace(".html","");
  await loadPage(defaultPage, appContainer);

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", savedTheme);

  // Initialize UI components
  UI.initAccordions();
  UI.initModals();
  UI.initCarousels();
  UI.initToasts();
  UI.initScrollTop();

  // Initialize language
  Language.init();

  // Initialize authentication state
  Auth.initAuthState();

  // Play intro media if exists
  UI.playIntroMedia();

  // Listen to route changes
  setupRouting();
});

// =========================
// 3) HEADER SCROLL EFFECT
// =========================
window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// =========================
// 4) MOBILE MENU TOGGLE
// =========================
if(menuToggle && navLinks){
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// =========================
// 5) THEME TOGGLE
// =========================
if(themeToggle){
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    UI.showToast(`Switched to ${newTheme} mode`, "success");
  });
}

// =========================
// 6) ROUTER
// =========================
function setupRouting() {
  document.querySelectorAll('a[data-link]').forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const page = link.getAttribute("href").replace(".html", "");
      await loadPage(page, appContainer);
      window.history.pushState({ page }, "", `${page}.html`);
    });
  });

  window.addEventListener("popstate", async (e) => {
    const page = e.state?.page || "home";
    await loadPage(page, appContainer);
  });
}

// =========================
// 7) REAL-TIME DATA SYNC (Supabase)
// =========================
supabase.channel('realtime-updates')
  .on('postgres_changes', { event: '*', schema: 'public' }, payload => {
    console.log('Realtime update:', payload);
    UI.updateDynamicComponents(payload);
  })
  .subscribe();

// =========================
// 8) FORMS
// =========================
document.addEventListener("submit", async (e) => {
  if(e.target.matches("form[data-form='newsletter']")){
    e.preventDefault();
    const email = e.target.querySelector("input[type='email']").value.trim();
    if(email){
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);
      if(error){
        UI.showToast("Failed to subscribe. Try again!", "danger");
      } else {
        UI.showToast("Subscribed successfully!", "success");
        e.target.reset();
      }
    } else {
      UI.showToast("Please enter a valid email.", "warning");
    }
  }

  if(e.target.matches("form[data-form='contact']")){
    e.preventDefault();
    const name = e.target.querySelector("input[name='name']").value.trim();
    const email = e.target.querySelector("input[name='email']").value.trim();
    const message = e.target.querySelector("textarea[name='message']").value.trim();
    if(name && email && message){
      const { error } = await supabase.from("contact_messages").insert([{ name, email, message }]);
      if(error){
        UI.showToast("Failed to send message!", "danger");
      } else {
        UI.showToast("Message sent successfully!", "success");
        e.target.reset();
      }
    } else {
      UI.showToast("All fields are required.", "warning");
    }
  }
});

// =========================
// 9) INIT AI TOOLS
// =========================
AI.initRecipeGenerator();
AI.initBlogWriter();
AI.initChatbot();

// =========================
// 10) PAYMENTS INTEGRATION
// =========================
Payments.initAllGateways();

// =========================
// 11) UTILITY EVENTS
// =========================
// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target) target.scrollIntoView({ behavior: "smooth" });
  });
});
