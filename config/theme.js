/* ===========================================================================
   Kitchen Fleva - theme.js
   Defines color palettes, dark/light mode, and theme management utilities
   =========================================================================== */

// =========================
// COLOR PALETTES
// =========================
export const COLORS = {
  light: {
    PRIMARY: "#FF6B35",
    SECONDARY: "#FFB74D",
    BACKGROUND: "#FFFFFF",
    SURFACE: "#F5F5F5",
    TEXT: "#333333",
    TEXT_MUTED: "#666666",
    BORDER: "#E0E0E0",
    SUCCESS: "#4CAF50",
    WARNING: "#FFC107",
    DANGER: "#F44336",
    INFO: "#2196F3",
  },
  dark: {
    PRIMARY: "#FF6B35",
    SECONDARY: "#FFB74D",
    BACKGROUND: "#121212",
    SURFACE: "#1E1E1E",
    TEXT: "#FFFFFF",
    TEXT_MUTED: "#CCCCCC",
    BORDER: "#333333",
    SUCCESS: "#4CAF50",
    WARNING: "#FFC107",
    DANGER: "#F44336",
    INFO: "#2196F3",
  },
};

// =========================
// DEFAULT THEME
// =========================
export const DEFAULT_THEME = "light";

// =========================
// APPLY THEME
// =========================
export function applyTheme(theme = DEFAULT_THEME) {
  const root = document.documentElement;
  const palette = COLORS[theme] || COLORS[DEFAULT_THEME];

  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key.toLowerCase()}`, value);
  });

  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// =========================
// TOGGLE THEME
// =========================
export function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || DEFAULT_THEME;
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  return newTheme;
}

// =========================
// GET CURRENT THEME
// =========================
export function getCurrentTheme() {
  return localStorage.getItem("theme") || DEFAULT_THEME;
}

// =========================
// INIT THEME ON LOAD
// =========================
export function initTheme() {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
}
