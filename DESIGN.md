# Archi Hub: Design System

Read this file before writing or changing any UI. Do not invent colors, fonts or spacing that are not listed here.

## Thesis

Archi Hub is an AI architectural and structural intelligence studio. The logo is gold on deep navy, which is the classic look of luxury architecture. Every competitor can do that. What they cannot do is show the engineering behind the work. So the site keeps the logo's navy and gold as its voice, and layers a technical drafting language on top: grid lines, monospace data labels, process diagrams, and one cool signal color reserved for anything the AI is doing.

Tagline from the logo lockup: **Vision... Built**

## Color

Navy and gold values were sampled from the supplied logo file. Everything marked "derived" or "added" is a design decision, not part of the logo.

| Token | Hex | Source | Use |
|---|---|---|---|
| `--ground` | `#081832` | logo background (exact) | page background. Must match exactly so the logo blends in |
| `--ground-raised` | `#0E2244` | derived | cards, panels, form fields |
| `--line` | `#1C3358` | derived | grid lines, card borders, dividers |
| `--line-strong` | `#2B4670` | derived | focused borders, table rules |
| `--ink` | `#EAF0F8` | derived | primary text |
| `--ink-dim` | `#9FB0C8` | derived | secondary text, captions |
| `--gold` | `#B89848` | logo wordmark | brand: logo, small labels, rules, icons |
| `--gold-bright` | `#F0C878` | logo stripes (highlight) | hover, emphasis, key numbers |
| `--amber` | `#F0B060` | logo stripes (body) | primary buttons and the single main action per view |
| `--signal` | `#4FD1E8` | added | AI and data layer only: pipeline lines, live values, generated output |
| `--ok` | `#5BD38B` | added | form success |
| `--error` | `#FF7B72` | added | form error |

Rules:
- Dark navy only. There is no light theme.
- Text on `--amber` is `--ground`.
- `--signal` covers at most about 5 percent of any screen. If something is not produced or measured by the AI, it is not cyan.
- No gradients except one: the soft gold glow behind the logo mark, as in the logo file.
- No pure black, no pure white.

## Typography

Fonts load from Google Fonts. Always declare fallbacks.

| Role | Font | Notes |
|---|---|---|
| Display and headings | Archivo | weights 700 and 800. The wider widths work for the hero. `text-wrap: balance` |
| Body | Archivo | weights 400 and 500, 16 to 18px, line height 1.6, max 65ch |
| Data, labels, coordinates | IBM Plex Mono | uppercase labels use letter spacing 0.12em. `font-variant-numeric: tabular-nums` |

Scale (px): 12, 14, 16, 20, 28, 40, 64, 96. Hero and section titles use `clamp()` between steps. Use no more than three sizes inside one section.

## Layout and spacing

- Spacing scale: 4, 8, 16, 24, 32, 48, 64, 96, 160.
- 12 column grid, max width 1280px, 24px gutters, at least 16px side padding on mobile.
- Sections are separated by 96 to 160px of vertical space.
- Blueprint grid: 1px lines every 64px at about 6 percent opacity of `--line`. Use it in the hero and the Intelligence Lab only. Never behind body text.
- Every page works at 400px width. Wide diagrams scroll inside their own container.

## Components

- **Buttons.** Primary: `--amber` fill, `--ground` text, 2px radius, no shadow. Secondary: 1px `--gold` outline, `--gold` text. One primary button per view.
- **Cards.** `--ground-raised` fill, 1px `--line` border, 2px radius, no shadow. On hover the border becomes `--gold` and small drafting tick marks appear at the corners.
- **Section label.** Mono, uppercase, `--gold`, followed by a hairline. Use numbering ("01 / 05") only where the order is real, such as the five stages of The Method.
- **Navbar.** Logo mark left, links right, solid `--ground` once scrolled. No blur or glass.
- **Forms.** Fields use `--ground-raised` with a 1px `--line` border and a `--gold` focus ring. Labels sit above the field in mono. Errors use `--error` plus a text message, never color alone.
- **Data chips.** Mono text with a 1px `--signal` border for AI output values. Use `--gold` for studio facts such as the year or project type.

## Motion

- Entrances use ease-out `cubic-bezier(0.22, 1, 0.36, 1)` at 200 to 400ms. No bounce or elastic easing.
- Scroll reveals play once. Content must be readable at rest, never stuck at opacity 0.
- One signature moment per page. On the home page, the logo's gold stripes draw in as the hero loads.
- Sliders and drag interactions use springs and respond on pointer down (see the Emil Kowalski skills).
- Respect `prefers-reduced-motion`: turn off Lenis smooth scroll and replace animation with an instant state change.

## Logo

- Source file: the supplied navy JPG (2048 x 1908). Ask for an SVG or a transparent PNG for production.
- Use the full lockup (mark, ARCHI HUB, Vision... Built) only on `--ground`.
- Navbar and favicon use the triangular mark alone, minimum 32px wide.
- Clear space around the logo equals one quarter of the mark's height.
- Do not recolor it, outline it, or place it on a photo without a navy scrim.
- The lockup also contains the name Ramy Moustafa. Confirm his title and how the company wants it displayed before repeating it in page copy.

## Do

- Show process: inputs, iterations, checks, decisions.
- Use real project data, real units (m², kN, floors) and real software footage.
- Mark placeholder content clearly until real content arrives.

## Do not

- Stock photos of buildings as the hero.
- Gold gradients on text or buttons.
- Purple or blue gradients, glassmorphism, emoji, decorative icons.
- Inter or Space Grotesk.
- Cards inside cards.
- Copying any competitor or inspiration site section for section. Borrow one idea, then change it.
