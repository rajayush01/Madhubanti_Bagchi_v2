# Madhubanti Bagchi — official artist website

React + Vite + TypeScript + Tailwind + Framer Motion + GSAP/ScrollTrigger + Lenis.

    npm install
    npm run dev      # local
    npm run build    # type-check + production build

## Content
All artist facts live in `src/data/*.ts`. Anything marked PLACEHOLDER must be
replaced with verified, artist-approved content and licensed media before launch.
Images/video: set the `src` fields (files in `public/` or `src/assets/`).

## Contact form
Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` (e.g. Formspree).
Without it the form reports honestly that it can't send.

## Before launch
Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`, add a
canonical link and an og:image in `index.html`, and serve with SPA fallback
(all routes -> index.html).
