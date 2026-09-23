# Kitchen Fleva

Kitchen Fleva is a focused kitchen content and digital-products platform — recipes, food stories, practical cooking guides, and downloadable products created by cooks and chefs.

## Current MVP

The first focused version includes:

- Editorial homepage with a clear recipe-first identity
- Recipe cards with category filters
- Kitchen journal/article preview cards
- Digital kitchen shop with a working client-side bag
- Newsletter signup interaction
- Responsive mobile layout
- Light/dark theme toggle
- No AI, memberships, payment gateways, or unrelated business modules in the primary experience

## Run locally

This is a lightweight browser application. Serve the repository with any static server, for example:

```bash
npx serve .
```

Then open the local URL shown by the server. The current shop bag is a frontend MVP; production checkout, Supabase content management, authentication, and secure digital delivery should be added after the content and sales flow are approved.

## Product direction

Free recipes and articles bring people to Kitchen Fleva, build trust, and introduce readers to paid recipe books and kitchen tutorials. The next implementation phase should add a Supabase schema for recipes, articles, products, orders, and downloadable files, followed by a small admin dashboard.
