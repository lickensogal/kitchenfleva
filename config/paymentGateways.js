/**
 * /config/paymentGateways.js
 * ----------------------------------------------------------------------
 * Defines all supported payment gateways, their configurations, and paths
 * to their respective client-side integration files.
 * ----------------------------------------------------------------------
 */

import { PAYMENT_MPESA, PAYMENT_STRIPE, PAYMENT_PAYPAL } from './constants.js';

const paymentGateways = [
    {
        id: 'mpesa',
        name: PAYMENT_MPESA,
        logo: '/assets/images/icons/mpesa-logo.svg',
        description: 'Pay via Safaricom M-Pesa STK Push (Kenya).',
        clientFile: '../payments/mpesa.js',
        supportedCurrencies: ['KES'],
        isActive: true,
    },
    {
        id: 'stripe',
        name: PAYMENT_STRIPE,
        logo: '/assets/images/icons/stripe-logo.svg',
        description: 'Pay securely using Credit/Debit Cards (Visa, MasterCard).',
        clientFile: '../payments/stripe.js',
        supportedCurrencies: ['USD', 'KES', 'EUR'],
        isActive: true,
        keys: {
            publishableKey: 'pk_test_YOUR_STRIPE_PUBLIC_KEY', // Only public key here
        }
    },
    {
        id: 'paypal',
        name: PAYMENT_PAYPAL,
        logo: '/assets/images/icons/paypal-logo.svg',
        description: 'Pay using your PayPal account.',
        clientFile: '../payments/paypal.js',
        supportedCurrencies: ['USD', 'EUR'],
        isActive: true,
    },
    {
        id: 'flutterwave',
        name: 'Flutterwave',
        logo: '/assets/images/icons/flutterwave-logo.svg',
        description: 'Supports various African payment methods (Rave).',
        clientFile: '../payments/flutterwave.js',
        supportedCurrencies: ['NGN', 'GHS', 'ZAR', 'KES'],
        isActive: true,
    },
    {
        id: 'paystack',
        name: 'Paystack',
        logo: '/assets/images/icons/paystack-logo.svg',
        description: 'Trusted payment solution for Nigeria and Ghana.',
        clientFile: '../payments/paystack.js',
        supportedCurrencies: ['NGN', 'GHS'],
        isActive: true,
    },
    // Add Razorpay, etc., if needed, following the same structure
];

/**
 * Fetches the configuration for a specific gateway.
 * @param {string} id - The gateway ID (e.g., 'mpesa').
 */
export function getGatewayConfig(id) {
    return paymentGateways.find(g => g.id === id);
}

export default paymentGateways;
