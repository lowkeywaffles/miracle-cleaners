# Miracle Cleaners: website demo

Demo website for Miracle Cleaners, 1329 W Campbell Rd, Richardson, TX 75080 (Pavilion East) · (972) 690-9266.

- Single static page (`index.html`), English/Spanish (`?lang=es`).
- Care-label language switch, soap-bubble light/dark switch, live open/closed status.

## Needed before going live
- [ ] Owner's name (reviews praise the owner; OK to feature by name?)
- [ ] Reweaving: examples/photos and typical pricing
- [ ] Other services (alterations? wash & fold? shirts?) and prices
- [ ] Confirm hours (Mon–Fri 7–7, Sat 8:30–5:30)
- [ ] Storefront photo and logo

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
