/* ===========================================================================
   Kitchen Fleva - constants.js
   Global reusable constants, statuses, limits, and default values
   =========================================================================== */

// =========================
// STATUS CONSTANTS
// =========================
export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  DRAFT: "draft",
  PUBLISHED: "published",
  FLAGGED: "flagged",
  COMPLETED: "completed",
  FAILED: "failed",
};

// =========================
// USER ROLES
// =========================
export const USER_ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  MEMBER: "member",
  GUEST: "guest",
};

// =========================
// FORM & INPUT LIMITS
// =========================
export const LIMITS = {
  MAX_TITLE_LENGTH: 120,
  MAX_DESC_LENGTH: 1000,
  MAX_COMMENT_LENGTH: 500,
  MAX_USERNAME_LENGTH: 50,
  MAX_PASSWORD_LENGTH: 64,
  MAX_EMAIL_LENGTH: 100,
  MAX_FILE_SIZE_MB: 10,
  MAX_RECIPES_FETCH: 50,
  MAX_BLOGS_FETCH: 50,
  MAX_PRODUCTS_FETCH: 50,
};

// =========================
// DEFAULT VALUES
// =========================
export const DEFAULTS = {
  THEME: "light",
  LANGUAGE: "en",
  AVATAR: "/assets/placeholders/user-placeholder.png",
  RECIPE_IMAGE: "/assets/placeholders/recipe-placeholder.jpg",
  BLOG_IMAGE: "/assets/placeholders/recipe-placeholder.jpg",
  PRODUCT_IMAGE: "/assets/placeholders/recipe-placeholder.jpg",
  NOTIFICATION_SOUND: "/assets/media/ui-sounds/notification.mp3",
  SUCCESS_SOUND: "/assets/media/ui-sounds/success.mp3",
  CLICK_SOUND: "/assets/media/ui-sounds/click.mp3",
};

// =========================
// PAYMENT CONSTANTS
// =========================
export const PAYMENT_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
  REFUNDED: "refunded",
};

// =========================
// ROUTING CONSTANTS
// =========================
export const ROUTE_TYPES = {
  FRONTEND: "frontend",
  DASHBOARD: "dashboard",
  API: "api",
};

// =========================
// DATE & TIME FORMATS
// =========================
export const DATE_FORMATS = {
  DISPLAY: "DD/MM/YYYY",
  FULL: "DD/MM/YYYY HH:mm:ss",
  ISO: "YYYY-MM-DDTHH:mm:ssZ",
};

// =========================
// NOTIFICATION TYPES
// =========================
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "danger",
  INFO: "info",
  WARNING: "warning",
};

// =========================
// EXPORT DEFAULT
// =========================
export default {
  STATUS,
  USER_ROLES,
  LIMITS,
  DEFAULTS,
  PAYMENT_STATUS,
  ROUTE_TYPES,
  DATE_FORMATS,
  NOTIFICATION_TYPES,
};
