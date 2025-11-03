/* ===========================================================================
   Kitchen Fleva - paymentGateways.js
   Central configuration for all supported payment gateways
   =========================================================================== */

// =========================
// SUPPORTED PAYMENT GATEWAYS
// =========================
export const GATEWAYS = {
  MPESA: "mpesa",
  STRIPE: "stripe",
  PAYPAL: "paypal",
  PAYSTACK: "paystack",
  FLUTTERWAVE: "flutterwave",
  RAZORPAY: "razorpay",
  CARDS: "cards", // VISA, MasterCard, AMEX, etc.
};

// =========================
// PAYMENT KEYS (ENV Variables Recommended)
// =========================
export const KEYS = {
  MPESA: {
    CONSUMER_KEY: import.meta.env.VITE_MPESA_CONSUMER_KEY || "YOUR_MPESA_CONSUMER_KEY",
    CONSUMER_SECRET: import.meta.env.VITE_MPESA_CONSUMER_SECRET || "YOUR_MPESA_CONSUMER_SECRET",
    SHORTCODE: import.meta.env.VITE_MPESA_SHORTCODE || "600000",
    PASSKEY: import.meta.env.VITE_MPESA_PASSKEY || "YOUR_MPESA_PASSKEY",
    ENV: import.meta.env.VITE_MPESA_ENV || "sandbox", // sandbox or production
  },
  STRIPE: {
    PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || "YOUR_STRIPE_PUBLIC_KEY",
    SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY || "YOUR_STRIPE_SECRET_KEY",
    WEBHOOK_SECRET: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || "YOUR_STRIPE_WEBHOOK_SECRET",
  },
  PAYPAL: {
    CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID",
    SECRET: import.meta.env.VITE_PAYPAL_SECRET || "YOUR_PAYPAL_SECRET",
    ENV: import.meta.env.VITE_PAYPAL_ENV || "sandbox", // sandbox or live
  },
  PAYSTACK: {
    PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "YOUR_PAYSTACK_PUBLIC_KEY",
    SECRET_KEY: import.meta.env.VITE_PAYSTACK_SECRET_KEY || "YOUR_PAYSTACK_SECRET_KEY",
    ENV: import.meta.env.VITE_PAYSTACK_ENV || "sandbox",
  },
  FLUTTERWAVE: {
    PUBLIC_KEY: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || "YOUR_FLUTTERWAVE_PUBLIC_KEY",
    SECRET_KEY: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY || "YOUR_FLUTTERWAVE_SECRET_KEY",
    ENCRYPTION_KEY: import.meta.env.VITE_FLUTTERWAVE_ENCRYPTION_KEY || "YOUR_FLUTTERWAVE_ENCRYPTION_KEY",
    ENV: import.meta.env.VITE_FLUTTERWAVE_ENV || "sandbox",
  },
  RAZORPAY: {
    KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID",
    KEY_SECRET: import.meta.env.VITE_RAZORPAY_KEY_SECRET || "YOUR_RAZORPAY_KEY_SECRET",
    ENV: import.meta.env.VITE_RAZORPAY_ENV || "sandbox",
  },
  CARDS: {
    VISA: "visa",
    MASTERCARD: "mastercard",
    AMEX: "amex",
  },
};

// =========================
// DEFAULT SETTINGS
// =========================
export const DEFAULTS = {
  CURRENCY: "USD",
  CURRENCY_SYMBOL: "$",
  PAYMENT_TIMEOUT: 30000, // in milliseconds
  RETRY_ATTEMPTS: 2,
  SUCCESS_REDIRECT: "/thank-you.html",
  FAILURE_REDIRECT: "/payment-failed.html",
};

// =========================
// HELPER FUNCTION: Check if Gateway is Enabled
// =========================
export function isGatewayEnabled(gateway) {
  return Object.keys(GATEWAYS).includes(gateway.toUpperCase());
}

// =========================
// EXPORT DEFAULT
// =========================
export default {
  GATEWAYS,
  KEYS,
  DEFAULTS,
  isGatewayEnabled,
};
