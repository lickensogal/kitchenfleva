/* ===========================================================================
   Kitchen Fleva - routes.js
   Centralized route mapping for pages, dashboards, and API endpoints
   =========================================================================== */

// =========================
// FRONTEND PAGE ROUTES
// =========================
export const frontendRoutes = {
  home: "/pages/home.html",
  about: "/pages/about.html",
  "recipe-library": "/pages/recipe-library.html",
  "recipe-single": "/pages/recipe-single.html",
  "blog-main": "/pages/blog-main.html",
  "blog-post": "/pages/blog-post.html",
  profile: "/pages/profile.html",
  contact: "/pages/contact.html",
  faq: "/pages/faq.html",
  login: "/pages/login.html",
  register: "/pages/register.html",
};

// =========================
// DASHBOARD ROUTES
// =========================
export const dashboardRoutes = {
  admin: {
    index: "/dashboards/admin/index.html",
    users: "/dashboards/admin/users.html",
    posts: "/dashboards/admin/posts.html",
    recipes: "/dashboards/admin/recipes.html",
    products: "/dashboards/admin/products.html",
    comments: "/dashboards/admin/comments.html",
    analytics: "/dashboards/admin/analytics.html",
    settings: "/dashboards/admin/settings.html",
  },
  moderator: {
    index: "/dashboards/moderator/index.html",
    flaggedContent: "/dashboards/moderator/flagged-content.html",
    reports: "/dashboards/moderator/reports.html",
  },
};

// =========================
// API / SUPABASE ENDPOINTS
// =========================
export const apiRoutes = {
  auth: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    signOut: "/auth/signout",
    currentUser: "/auth/current-user",
  },
  recipes: {
    list: "/recipes/list",
    single: "/recipes/get",
    create: "/recipes/create",
    update: "/recipes/update",
    delete: "/recipes/delete",
  },
  blogs: {
    list: "/blogs/list",
    post: "/blogs/get",
    create: "/blogs/create",
    update: "/blogs/update",
    delete: "/blogs/delete",
  },
  users: {
    list: "/users/list",
    profile: "/users/profile",
    update: "/users/update",
    delete: "/users/delete",
  },
  comments: {
    list: "/comments/list",
    create: "/comments/create",
    delete: "/comments/delete",
  },
  products: {
    list: "/products/list",
    single: "/products/get",
    create: "/products/create",
    update: "/products/update",
    delete: "/products/delete",
  },
  payments: {
    initiate: "/payments/initiate",
    verify: "/payments/verify",
    refund: "/payments/refund",
    subscriptions: "/payments/subscriptions",
  },
  newsletter: {
    subscribe: "/newsletter/subscribe",
    unsubscribe: "/newsletter/unsubscribe",
  },
  contact: {
    submit: "/contact/submit",
  },
};

// =========================
// FUNCTION TO RESOLVE ROUTES
// =========================
/**
 * Get route URL dynamically
 * @param {string} type - 'frontend' | 'dashboard' | 'api'
 * @param {string} key - route key
 * @param {string} subKey - optional subkey for nested routes
 * @returns {string} full route path
 */
export function getRoute(type, key, subKey = null) {
  let route = "";
  switch (type) {
    case "frontend":
      route = frontendRoutes[key] || "/";
      break;
    case "dashboard":
      if (dashboardRoutes[key] && subKey) {
        route = dashboardRoutes[key][subKey] || dashboardRoutes[key].index;
      } else {
        route = dashboardRoutes[key]?.index || "/";
      }
      break;
    case "api":
      if (apiRoutes[key] && subKey) {
        route = apiRoutes[key][subKey] || "";
      } else {
        route = apiRoutes[key] || "";
      }
      break;
    default:
      route = "/";
  }
  return route;
}

// =========================
// EXPORT DEFAULT
// =========================
export default {
  frontendRoutes,
  dashboardRoutes,
  apiRoutes,
  getRoute,
};
