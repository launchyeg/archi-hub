# Archi Hub Website

Marketing site for **Archi Hub**, an AI architectural and structural intelligence studio. Tagline: "Vision... Built". The company builds desktop software that helps engineers plan and design buildings, and uses it on its own projects.

The site has one job: prove the AI is real, then turn visitors into leads.

## Read first

- `DESIGN.md` for colors, type, spacing, components and motion. Do not invent UI values outside it.
- `PRODUCT.md` (created by `/impeccable init`) for audience, tone and constraints.
- `docs/SITEMAP.md` for the approved page structure and numbering.
- `docs/HERO.md` before touching the Home hero or any scroll video.
- `docs/OPEN-ITEMS.md` for what is still unconfirmed. Never invent an answer to an open item.

## Stack

- Vite + React (JavaScript), React Router
- Tailwind CSS v4 through `@tailwindcss/vite`. Design tokens live in `src/styles/tokens.css` as CSS variables copied from `DESIGN.md`
- `motion` for UI animation, `gsap` with ScrollTrigger for scroll storytelling, `lenis` for smooth scroll
- `react-hook-form` with `zod` for forms
- English only. No RTL support needed.
- Deploy target: Vercel

Commands: `npm run dev`, `npm run build`, `npm run lint`

## Structure

```
src/
  pages/        Home, Method, CaseStudies, CaseStudy, Lab, Studio, Journal, Careers, Legal
  components/   Navbar, Footer, SmoothScroll, and shared pieces. One file per component
  lib/          helpers (submitLead.js comes later with the forms)
  styles/       tokens.css, global.css
  content/      project, software and team data as plain JS or JSON, not hard-coded in JSX
  App.jsx       routes
```

## Routes and what each page is for

| Route | Page | Job |
|---|---|---|
| `/` | Home | Show the AI in the first second. A small interactive hint of the tools, then one hand-picked project |
| `/method` | The Method | Five stages: Data Input, AI Analysis, Generative Design, Structural Check, Human Review. Human review is the trust point |
| `/case-studies` and `/case-studies/:slug` | Case Studies | Each project is a process story: inputs, AI iterations, final decision. Not a photo gallery |
| `/lab` | Intelligence Lab | Flagship page. Shows the company's desktop programs. Each one is framed as the engineer's problem, then the result |
| `/studio` | Studio | Team and contact. Short |
| `/journal` | Journal | Articles on AI in architecture, for long-term SEO |
| `/careers`, `/legal` | Footer pages | Secondary |

## Intelligence Lab: important constraint

The programs are desktop software. They cannot run inside the browser. So the Lab shows:
1. Screen recordings of the real software
2. Real before and after results from past projects
3. A gated download (see below)

A web-based mini simulator for one tool is a possible later phase, not part of the first launch.

## Lead capture (deferred)

**No forms for now.** Do not build `LeadForm`, `submitLead.js` or any input field until the user says so. Where a section needs a form later (Home Contact, Lab download), show a clearly labeled placeholder block instead.

When the forms are built, the plan is: one shared `LeadForm`, first question "What do you need?" with `download` (name, email, optional company and program) or `inquiry` (adds message and project details). Every submission carries a `type`, and all submit logic lives in one function in `src/lib/submitLead.js`. A privacy notice link must sit next to the form.

## Working rules

- Read `DESIGN.md` before any UI work. Use tokens, not raw hex values.
- Build mobile first. Check 400px and 1280px.
- Respect `prefers-reduced-motion`.
- Keyboard focus must be visible. Contrast must meet WCAG AA.
- No lorem ipsum. If real content is missing, use clearly labeled placeholder data in `src/content/`.
- Keep components small. One file per component.
- Do not add dependencies without saying why.
- No invented numbers, claims or testimonials. Only "5 stages" is real. Anything else is a clearly labeled PLACEHOLDER in `src/content/`.
- Work only on the page and section the user names in the current message. Do not start other pages or sections.

## Animation rules

One library per element, never two.
- **GSAP + ScrollTrigger**: anything driven by scroll position (hero scroll video, pinned or scrubbed sections).
- **motion**: everything else (blur-in text reveals, hover, FAQ open and close, route transitions).
- **CSS**: the testimonials marquee.
- **Lenis** is the only smooth scroll. Connect it to ScrollTrigger once, in one file: `lenis.on('scroll', ScrollTrigger.update)` and drive `lenis.raf` from `gsap.ticker`, with `gsap.ticker.lagSmoothing(0)`.
- In React, create GSAP animations inside `useGSAP` or `gsap.context()` and clean up on unmount. Register plugins once.
- Animate `transform` and `opacity` only. Never animate layout properties.
- `prefers-reduced-motion`: no scrub, no reveal. The hero shows the end poster.

## Skills

Installed from the project root:
- Impeccable (`npx impeccable install`). Use `/impeccable shape` before building a page, `/impeccable craft` to build it, then `critique`, `audit` and `polish`.
- Emil Kowalski skills, kept: `emil-design-eng`, `animate`, `animation-performance`, `review-animations`. Run `review-animations` before finishing any page with motion.
- GSAP skills, kept: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-performance`.
- Removed on purpose: `apple-design` (conflicts with `DESIGN.md`), `animation-vocabulary`, `gsap-plugins`, `gsap-utils`, `gsap-frameworks`. Do not reinstall them.

## Page numbering

Home is 01, The Method 02, Case Studies 03, Intelligence Lab 04, Studio 05, Journal, Careers and Legal 06. See `docs/SITEMAP.md`.

## How we work

The user builds one page at a time, and inside a page one section at a time. Sections do not have to follow page order. Every page already exists as an empty route, so a new section only fills its page.

For each piece: `/impeccable shape` first, then build, then `critique` and `polish`. Run `review-animations` before finishing anything with motion. After each finished part, give the user a short commit message.

Current focus: **Home**.

## Open questions

- Production logo: SVG or transparent PNG needed
- Exact title for Ramy Moustafa (the name is in the logo lockup)
- Which programs go in the Lab first, and whether screen recordings exist
- Real case studies and their data
- Where leads should be sent: email only, Google Sheet, or a CRM
- Domain. Hosting is automatic: Vercel deploys from GitHub on every push, so only push working code
