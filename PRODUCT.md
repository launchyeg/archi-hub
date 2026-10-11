# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: prospective clients.** Property developers, building owners, and architecture and engineering firms deciding whether to commission Archi Hub for design work. They are judging whether the AI is real and whether the studio can be trusted with a building. Home, The Method and Case Studies lead with this audience.

**Secondary: engineers and engineering firms** who may try Archi Hub's desktop software. They want to see the tools solve a real engineering problem before giving an email for a download. The Intelligence Lab leads with this audience.

## Product Purpose

The site is the marketing presence for Archi Hub, an AI architectural and structural intelligence studio (tagline "Vision... Built"). It has one job: prove the AI is real, then turn visitors into leads.

Success means two kinds of lead, both captured through one shared form:
- **Inquiry** (`type: inquiry`): a qualified client question with project details. This is the hot lead.
- **Download** (`type: download`): a software download request from an engineer or firm.

## Positioning

Archi Hub delivers its own architectural and structural design work using AI, and builds the desktop programs engineers use to do the same. The site shows the process, not just finished renders: inputs, AI iterations, structural checks and human review, plus the software actually running. A studio with only a photo portfolio cannot truthfully copy that.

## Operating Context

- Clients evaluate by following a project's process story: what went in, what the AI generated across iterations, how it was structurally checked, and what a human decided.
- The Method presents five stages: Data Input, AI Analysis, Generative Design, Structural Check, Human Review. Human Review is the trust point.
- The software is desktop only and cannot run in the browser. The Lab shows screen recordings of the real software, real before and after results from past projects, and a gated download.
- A web-based mini simulator for one tool is a possible later phase, not part of the first launch.
- The Journal carries articles on AI in architecture for long-term SEO.

## Capabilities and Constraints

- Routes: Home, The Method, Case Studies (index and detail), Intelligence Lab, Studio, Journal, Careers, Legal.
- One shared lead form opens with "What do you need?": **Try the software** (name, email, optional company and program; success says a download link is on its way by email) or **I have a question** (adds a message and project details).
- All submissions go through one function, `src/lib/submitLead.js`, which logs and resolves until a backend is chosen.
- A privacy notice link appears next to the form. The Legal page needs a real privacy policy **before launch**.
- English only. Deploys to Vercel.

**Open decisions (do not assume):**
- Which programs appear first in the Lab, and their names.
- Where leads go: email, a Google Sheet or a CRM.
- Ramy Moustafa's title, and how the company wants his name shown in page copy.
- Production logo file (SVG or transparent PNG).
- Domain and who manages hosting.

## Brand Commitments

- Name: Archi Hub. Tagline: "Vision... Built".
- The logo lockup (mark, ARCHI HUB, Vision... Built) includes the name Ramy Moustafa. His title is not confirmed, so don't repeat the name with a title until it is.
- Visual identity is set in `DESIGN.md`, which is the authority for it.

## Evidence on Hand

**Available:**
- Logo: navy JPG only (2048 x 1908). A production SVG or PNG is still needed.
- Site map and route purposes (`CLAUDE.md`), and the design system (`DESIGN.md`).

**Not available yet. Do not invent any of these:**
- Case study data
- Software screen recordings
- Testimonials
- Client names
- Metrics or performance figures
- Team bios

Until real content arrives, use clearly labeled placeholder data in `src/content/`, and make it visibly marked as placeholder on the page. Never present it as real.

## Product Principles

1. **Proof over promise.** Every claim about the AI is backed by visible process: inputs, iterations, checks, decisions. When proof doesn't exist yet, show a labeled placeholder, never a fabricated result.
2. **A human signs off.** The AI proposes and an engineer decides. Human review is the trust point and is never hidden.
3. **Speak to each audience on its own page.** Clients get the outcomes and process of commissioned work. Engineers get the problem a tool solves and its result. Don't blend the two pitches on one page.
4. **Every path leads to one form.** All lead capture goes through the shared form and `submitLead`, with the privacy notice beside it.

## Accessibility & Inclusion

WCAG AA contrast, visible keyboard focus, `prefers-reduced-motion` respected (no smooth scroll and no animation, only instant state changes), and usable at 400px width.
