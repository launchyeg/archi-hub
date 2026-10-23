# Open items

## Needed from the client (Archi Hub)
- [ ] Headline and supporting line claims
- [ ] Vision and Mission wording
- [ ] List of services
- [ ] FAQ answers
- [ ] Confirm the claims about AI and engineers
- [ ] Ramy Moustafa's exact title
- [ ] Which Lab programs go first, and whether screen recordings exist
- [ ] Real case studies and data (four project bays)
- [ ] Permission to use the blue-roofed project's images
- [ ] Where leads go: email, Google Sheet or CRM
- [ ] Domain and who manages hosting
- [ ] Privacy policy text before launch

## Needed from Launchy
- [ ] Launchy logo larger than 100x100 (SVG or large PNG)
- [ ] Confirm the tagline "Web, mobile, UI/UX & systems"
- [ ] Production Archi Hub logo (SVG or transparent PNG)

## Hero video
- [ ] Keyframes A and B (AI image model)
- [ ] Clean high-resolution D render, no people, no cars
- [ ] C: real software output or illustrative edge detection
- [ ] A -> B clip from the AI video tool

## Home page
- [ ] Extra modifications and additions from the user (not given yet)
- [ ] Confirm the final Home section list
- [ ] Review screenshots at 1280px and 400px

## Home content placeholders (from the old launch checklist)
All Home content lives in `src/content/home.js`.
- [ ] Hero image: a completed Archi Hub project (`hero.image`). Recheck WCAG AA contrast for the hero text and glass stat card against the real image
- [ ] About images: studio at work, project model or drawing set, engineer reviewing a design (`about.images`)
- [ ] What we deliver: six card images (`deliver.items[].imageNote`)
- [ ] Lab preview: screen recording for each program (`labPreview.programs`)
- [ ] Where we work: map and studio/project locations (`whereWeWork`). Destinations and studio address confirmed (`src/content/company.js`). Still open: which project stands in which destination
- [ ] Hero glass stat card figures for a real project: floor area, options reviewed (`hero.statCard`)
- [ ] Hero stat cards: projects delivered, desktop programs (`stats`). Only "5 stages" is real
- [ ] Program names, engineer's problem and result for Programs A, B, C (`labPreview`)
- [ ] Real, approved client quotes (`clientVoices.quotes`), or set `clientVoices.visible` to `false`
- [ ] Contact email, phone and studio address (`contact.details`). Confirmed and used in the Where we work studio panel (`studio` in `src/content/company.js`). Social media links still missing (`socials` in `src/content/company.js`)

## Claims to confirm with the company
Marked `claimsStatus` or "to confirm with the company" in `src/content/home.js`.
- [ ] Hero headline "AI proposes. An engineer decides." and supporting line
- [ ] About copy (own AI tools, five stages, engineer signs off)
- [ ] Why Archi Hub: four commitments, esp. engineer accountability and "engineers can download and use the same tools"
- [ ] What we deliver: list of six services
- [ ] Lab preview: the five stages and which ones the AI runs
- [ ] FAQ answers: engineer reviews every design; "We will email you a download link"
- [ ] Contact: "We reply by email"
- [ ] FAQ questions awaiting answers: supported operating systems, software price, countries served

## Legal and Careers pages (drafted, need the company)
Text lives in `src/content/legal.json` and `src/content/careers.json`. Open items show on the page as PLACEHOLDER blocks.
- [ ] A lawyer or the company reviews the whole Legal draft (privacy notice, terms, disclaimer) before launch
- [ ] Privacy: where submissions are stored, who sees them, how long they are kept (depends on the lead destination above)
- [ ] Privacy: whether the site uses cookies or analytics
- [ ] Privacy: confirm the data subject promise ("ask us to show, correct or delete your details by email")
- [ ] Terms: license terms for the desktop programs, and governing law
- [ ] Disclaimer: confirm the wording that a qualified engineer must review software results, and the liability limit
- [ ] Careers: open roles (title, location, summary), or confirm the "no open roles" wording and the email-your-CV route

## Before launch
- [ ] Hide or replace Client voices, Where we work and the placeholder stat cards if real data is missing (no dashes shipped)
- [ ] Lead backend, once forms are built: the download path promises an email with a link, so it must actually be sent
- [ ] Logo as SVG (the logo stripe animation would benefit)
- [ ] Empty pages to fill: Method, Case Studies, Case Study, Lab, Studio, Journal, Careers, Legal
