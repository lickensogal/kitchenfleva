🇰🇪 Kitchen Fleva: Made with Passion. Served with Fleva.

Add Some Fleva to Your Kitchen!

Welcome to the repository for Kitchen Fleva, a full-featured, modern digital product and recipe platform focusing on Kenyan-inspired home cooking. This project is built as a highly modular Single Page Application (SPA) using HTML, CSS, and Vanilla JavaScript, powered by Supabase for a robust backend experience.

🚀 Project Overview

Kitchen Fleva provides a comprehensive feature set, including:

Role-Based Access Control (RBAC): Admin, Moderator, and Subscriber roles.

Monetization: Tiered memberships (Free, Basic, Premium, VIP) and dynamic Ad Management.

AI Integration: Tools for generating recipes, meal plans, and blog drafts (via Gemini API).

Multi-Payment Gateway: Secure integration for M-Pesa, Stripe, PayPal, Flutterwave, and Paystack.

Multilingual Support: English, Kiswahili, French, and Spanish translations.

Modern UX: Sticky Navigation, Dark Mode, and a responsive design guided by a strict style specification.

⚙️ Setup and Installation

Follow these steps to get the Kitchen Fleva application running locally.

1. Prerequisites

You must have the following installed:

Node.js (LTS recommended)

npm (Node Package Manager)

A running Supabase Project

2. Clone the Repository

git clone [https://github.com/YourUsername/Jikoni-Digital.git](https://github.com/YourUsername/Jikoni-Digital.git)
cd Jikoni-Digital


3. Configure Environment Variables

Rename the file .env.example to .env.

Fill in the required keys in the new .env file from your service accounts (Supabase, Gemini, M-Pesa, etc.).

Crucial: Ensure the SUPABASE_SERVICE_ROLE_KEY and all payment secret keys are NOT exposed to the client-side and are only used within the Supabase Edge Functions (/supabase/functions/).

4. Supabase Backend Setup

A. Deploy Schema and RLS Policies

Use the Supabase CLI or the SQL Editor in your Supabase dashboard to run the scripts located in the /supabase/ directory:

Schema: Execute the contents of /supabase/schema.sql to create all necessary tables (users, recipes, ads, subscriptions, etc.).

Policies: Execute the contents of /supabase/policies.sql to enable Row-Level Security (RLS) and define access rules for all roles.

B. Deploy Edge Functions

The secure backend logic (payments, AI, emails) runs on Supabase Edge Functions (Deno).

Install the Supabase CLI: npm install -g supabase

Link your local project: supabase login and supabase link --project-ref "your-project-id"

Deploy the functions: supabase functions deploy

5. Running the Application Locally

Since this project is a Vanilla JS SPA, you only need a simple local server.

Install a simple server tool (if you don't have one): npm install -g live-server

Run the application: live-server

The application will open in your browser, typically at http://127.0.0.1:8080.

📂 Project Structure

The codebase follows a highly modular structure. Refer to the directory tree for a complete breakdown:

/js/: Core logic and modular services (recipeService.js, auth.js).

/config/: Global constants and settings (site-config.js, routes.js).

/pages/: Main application HTML partials (home.html, profile.html).

/components/: Reusable UI elements (navbar.html, card-recipe.html).

/dashboards/: Restricted access Admin and Moderator panels.

/legal/: Compliance documents.

/payments/: Client-side payment integration scripts.

/supabase/: Backend code (SQL and Edge Functions).

/hooks/: Reusable JavaScript state management logic.

📘 Documentation

Refer to the /docs/ folder for detailed guides:

setup.md: Detailed setup instructions.

payments-integration.md: Guide to setting up M-Pesa and other webhooks.

api-reference.md: Description of custom Supabase endpoints.

Made with Passion. Served with Fleva.
