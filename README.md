# Archi Hub Website

Marketing website for **Archi Hub**, an AI architectural and structural intelligence studio. Tagline: *Vision... Built*.

The site has one job: prove the AI is real, then turn visitors into leads. Built by Launchy (web, mobile, UI/UX and systems).

## Stack

- Vite + React (JavaScript), React Router
- Tailwind CSS v4 (`@tailwindcss/vite`), design tokens in `src/styles/tokens.css`
- `motion` for UI animation, `gsap` + ScrollTrigger for scroll storytelling, `lenis` for smooth scroll
- ESLint / oxlint
- Deployed on Vercel. Every push to GitHub deploys automatically.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build    # production build into dist/ (not committed)
```

## Structure

```
src/
  pages/        Home, Method, CaseStudies, CaseStudy, Lab, Studio, Journal, Careers, Legal
  components/   Navbar, Footer, SmoothScroll, shared pieces
  styles/       tokens.css, global.css
  content/      all site copy and data, kept out of the JSX
docs/
  SITEMAP.md      approved page structure and numbering
  HERO.md         plan for the scroll-video hero
  OPEN-ITEMS.md   what is still waiting on the client
```

Project guidance for Claude Code lives in `CLAUDE.md`, `PRODUCT.md` and `DESIGN.md`.

## Pages

| No. | Page | Route |
|---|---|---|
| 01 | Home | `/` |
| 02 | The Method | `/method` |
| 03 | Case Studies | `/case-studies`, `/case-studies/:slug` |
| 04 | Intelligence Lab | `/lab` |
| 05 | Studio | `/studio` |
| 06 | Journal, Careers, Legal | `/journal`, `/careers`, `/legal` |

## Where we are

- Done: project scaffold, design system (`DESIGN.md`), product brief (`PRODUCT.md`), sitemap, routes for every page, smooth scroll, logo files.
- In progress: **Home**, built section by section in a Vantara-style layout using our dark palette, with a scroll-driven video hero.
- Not started: Method, Case Studies, Lab, Studio, Journal, Careers, Legal. All exist as empty routes.
- Deferred: lead forms (download and inquiry), backend for leads, real case studies, privacy policy.

## How we build

One page at a time, one section at a time. Each piece goes through `/impeccable shape`, a build, then critique and polish. Anything with motion is checked with `review-animations`. No invented numbers or testimonials: missing content is a clearly labeled placeholder in `src/content/`.

## Animation rules

One animation library per element. GSAP + ScrollTrigger for anything driven by scroll, `motion` for everything else, CSS for the marquee. Lenis is the only smooth scroll. `prefers-reduced-motion` is always respected.

## Tooling (AI agents)

Skills are installed with the `skills` CLI and Impeccable. Kept: Impeccable, GSAP (core, timeline, scrolltrigger, react, performance) and Emil Kowalski (design-eng, animate, animation-performance, review-animations). The lock file is `skills-lock.json`.
