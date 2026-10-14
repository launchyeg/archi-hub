# Archi Hub: Design System

Read this file before writing or changing any UI. Do not invent colors, fonts or spacing that are not listed here.

## Thesis

Archi Hub is an AI architectural and structural intelligence studio. The logo is gold on deep navy, which is the classic look of luxury architecture. Every competitor can do that. What they cannot do is show the engineering behind the work. So the site keeps the logo's navy and gold as its voice, and layers a technical drafting language on top: grid lines, monospace data labels, process diagrams, and one cool signal color reserved for anything the AI is doing.

Tagline from the logo lockup: **Vision... Built**

**Home is the exception.** Home follows the layout rhythm of a luxury landing page: a full-bleed project image, a light serif display face, generous space, soft rounded shapes and a small amount of glass. It keeps the same navy ground, gold, amber and signal colors, and the same mono labels, so it still reads as the same studio. Every Home-only rule below is marked **(Home only)**. Everywhere else, the drafting language applies unchanged.

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
- `--signal` covers at most about 5 percent of any screen. If something is not produced or measured by the AI, it is not cyan. This holds on Home too: a cyan value in the stat card must be AI output.
- No gradients except two: the soft gold glow behind the logo mark, as in the logo file, and **(Home only)** the navy scrim over the hero image, which may be flat `--ground` or a vertical fade from transparent to `--ground`.
- No pure black, no pure white.

### Glass (Home only)

Glass is allowed on exactly two elements: the Home Navbar pill and one floating stat card over the Home hero. Nowhere else.

- Fill: `--ground` at 72 percent opacity, `backdrop-filter: blur(16px)`. When `backdrop-filter` is not supported, use `--ground` at 92 percent.
- Border: 1px `--ink` at 12 percent opacity.
- Text on glass uses `--ink` or `--ink-dim` only, and must pass WCAG AA (4.5:1 body, 3:1 large text) against the **brightest** part of the image that can sit behind it, not the average. If it fails, raise the fill opacity before changing the text color.
- No colored glass, no glass on glass, no glow behind glass.

## Typography

Fonts load from Google Fonts. Always declare fallbacks.

| Role | Font | Notes |
|---|---|---|
| Display and headings | Archivo | weights 700 and 800. The wider widths work for the hero. `text-wrap: balance` |
| Display and headings **(Home only)** | Cormorant Garamond | weights 300 and 400, italic 300 for one emphasized phrase at most. Fallback: `'Cormorant', Garamond, 'Times New Roman', serif`. Use at 40px and above only; below that the light weight is too thin on navy. `text-wrap: balance`, tracking no tighter than -0.01em |
| Body | Archivo | weights 400 and 500, 16 to 18px, line height 1.6, max 65ch |
| Data, labels, coordinates | IBM Plex Mono | uppercase labels use letter spacing 0.12em. `font-variant-numeric: tabular-nums` |

Scale (px): 12, 14, 16, 20, 28, 40, 64, 96. Hero and section titles use `clamp()` between steps. Use no more than three sizes inside one section.

## Layout and spacing

- Spacing scale: 4, 8, 16, 24, 32, 48, 64, 96, 160.
- 12 column grid, max width 1280px, 24px gutters, at least 16px side padding on mobile.
- Sections are separated by 96 to 160px of vertical space.
- Blueprint grid: 1px lines every 64px at about 6 percent opacity of `--line`. Use it in the Intelligence Lab, and in the hero of any page except Home. Never behind body text.
- Every page works at 400px width. Wide diagrams scroll inside their own container.

### Home layout rhythm (Home only)

- The hero is a full-bleed image with a navy scrim, at least 85svh tall, with the serif headline set low and left over the scrim.
- Below the hero, sections alternate between wide imagery and narrow, centered text blocks (max 40ch for display, 65ch for body), with 160px between sections on desktop and 96px on mobile.
- Use fewer, larger elements per section than the rest of the site. One idea per section.

## Components

- **Buttons.** Primary: `--amber` fill, `--ground` text, 2px radius, no shadow. Secondary: 1px `--gold` outline, `--gold` text. One primary button per view. **(Home only)** Buttons are pills (fully rounded), same colors and rules.
- **Cards.** `--ground-raised` fill, 1px `--line` border, 2px radius, no shadow. On hover the border becomes `--gold` and small drafting tick marks appear at the corners. **(Home only)** Cards and image blocks use a 24px radius and no drafting tick marks.
- **Section label.** Mono, uppercase, `--gold`, followed by a hairline. Use numbering ("01 / 05") only where the order is real, such as the five stages of The Method.
- **Navbar.** Logo mark left, links right, solid `--ground` once scrolled. No blur or glass. **(Home only)** A floating glass pill, inset from the page edges, following the Glass rules above. It stays a glass pill when scrolled.
- **Hero image (Home only).** One full-bleed photograph or render of a real Archi Hub project, under the navy scrim. All hero text must pass WCAG AA over the scrim at every point it can sit. Never a stock photo.
- **Stat card (Home only).** One floating glass card over the hero, holding one or two facts. Every figure must be real and sourced from a real project or from the company. Until it is, the card shows a visible PLACEHOLDER label instead of a number. No invented metrics.
- **Placeholder image block (Home only, until real images exist).** A `--ground-raised` block at the image's final size and radius, with a mono uppercase "PLACEHOLDER" label and a one-line note of what goes there (for example "Hero image: completed project exterior"). It must never look like a finished image.
- **Forms.** Fields use `--ground-raised` with a 1px `--line` border and a `--gold` focus ring. Labels sit above the field in mono. Errors use `--error` plus a text message, never color alone.
- **Data chips.** Mono text with a 1px `--signal` border for AI output values. Use `--gold` for studio facts such as the year or project type.

## Motion

- Entrances use ease-out `cubic-bezier(0.22, 1, 0.36, 1)` at 200 to 400ms. No bounce or elastic easing.
- Scroll reveals play once. Content must be readable at rest, never stuck at opacity 0.
- One signature moment per page. **(Home only)** The signature is a gentle blur-in text reveal: blur from 8px to 0, opacity, and at most 8px of upward movement, 500 to 700ms, staggered by line, played once. It replaces the earlier stripe draw-in on Home.
- Sliders and drag interactions use springs and respond on pointer down (see the Emil Kowalski skills).
- Respect `prefers-reduced-motion`: turn off Lenis smooth scroll and replace animation with an instant state change. The Home blur-in shows the final, sharp text immediately.

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
- Mark placeholder content clearly until real content arrives, including placeholder images and stat values on Home.
- On Home, let one real project image carry the hero, and give it room.
- On Home, check every text-on-image and text-on-glass pairing against WCAG AA at its worst point.
- Keep signal cyan for AI output on every page, Home included.

## Do not

- Stock photos of buildings as the hero, or anywhere on Home.
- Gold gradients on text or buttons.
- Purple or blue gradients, emoji, decorative icons.
- Glassmorphism anywhere except the Home Navbar pill and the one Home stat card.
- Invented numbers in the stat card, or anywhere else.
- The serif display face, pill buttons or 24px radii outside Home.
- Inter or Space Grotesk.
- Cards inside cards.
- Copying any competitor or inspiration site section for section. Borrow one idea, then change it.
