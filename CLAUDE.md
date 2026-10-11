# Archi Hub Website

Marketing site for **Archi Hub**, an AI architectural and structural intelligence studio. Tagline: "Vision... Built". The company builds desktop software that helps engineers plan and design buildings, and uses it on its own projects.

The site has one job: prove the AI is real, then turn visitors into leads.

## Read first

- `DESIGN.md` for colors, type, spacing, components and motion. Do not invent UI values outside it.
- `PRODUCT.md` (created by `/impeccable init`) for audience, tone and constraints.

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
  components/   Navbar, Footer, LeadForm, and shared pieces
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

## Lead capture

One shared `LeadForm` component is used on every page that needs it. First question: "What do you need?"

- **Try the software** asks for name, email, and optionally company and which program. Success state: confirm that a download link is on its way by email.
- **I have a question** adds a message field and project details. This is a hot lead.

Each submission carries a `type` of `download` or `inquiry`. The backend is not chosen yet, so submit through a single function in `src/lib/submitLead.js` that currently logs and resolves. Do not scatter submit logic across components.

A privacy notice link must appear next to the form, and the Legal page needs a real privacy policy before launch.

## Working rules

- Read `DESIGN.md` before any UI work. Use tokens, not raw hex values.
- Build mobile first. Check 400px and 1280px.
- Respect `prefers-reduced-motion`.
- Keyboard focus must be visible. Contrast must meet WCAG AA.
- No lorem ipsum. If real content is missing, use clearly labeled placeholder data in `src/content/`.
- Keep components small. One file per component.
- Do not add dependencies without saying why.

## Skills

Installed from the project root:
- Impeccable (`npx impeccable install`). Use `/impeccable shape` before building a page, `/impeccable craft` to build it, then `critique`, `audit` and `polish`.
- Emil Kowalski skills (`npx skills@latest add emilkowalski/skills`) for animation. Run `review-animations` before finishing any page with motion.

## Order of work

1. Project scaffold, tokens, fonts, Navbar, Footer, routes with empty pages
2. LeadForm and `submitLead`
3. Home
4. Intelligence Lab
5. The Method
6. Case Studies
7. Studio, Journal, Careers, Legal
8. Motion pass, audit, polish

## Open questions

- Production logo: SVG or transparent PNG needed
- Exact title for Ramy Moustafa (the name is in the logo lockup)
- Which programs go in the Lab first, and whether screen recordings exist
- Real case studies and their data
- Where leads should be sent: email only, Google Sheet, or a CRM
- Domain and who manages hosting
