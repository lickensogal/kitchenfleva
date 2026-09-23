# Kitchen Fleva — implementation notes

## Phase 2: content and data foundation

The repository now includes a first Supabase schema for:

- Published recipes and full recipe instructions
- Journal stories
- Digital products and download paths
- Newsletter subscribers
- Orders and order items

### Set up Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/policies.sql` after the schema.
4. Copy `env.example` to `.env.local` and set the two `VITE_` values.
5. Keep all service-role, payment, SMTP, and AI secrets on a server or Edge Function. Never put them in browser JavaScript.

The static homepage continues to work without Supabase credentials. Once configured, `supabaseClient.js` provides safe browser helpers for auth, public content reads, and newsletter/order inserts.

## Next build slice

The next step should be to replace the hard-coded homepage arrays with reads from `recipes`, `stories`, and `products`, while retaining a local fallback for an empty database. Checkout should be implemented only after the product records and payment provider are selected; payment secrets and download delivery must stay server-side.
