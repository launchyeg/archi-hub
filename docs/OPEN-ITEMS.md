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
- [ ] Where we work: map and studio/project locations (`whereWeWork`)
- [ ] Hero glass stat card figures for a real project: floor area, options reviewed (`hero.statCard`)
- [ ] Hero stat cards: projects delivered, desktop programs (`stats`). Only "5 stages" is real
- [ ] Program names, engineer's problem and result for Programs A, B, C (`labPreview`)
- [ ] Real, approved client quotes (`clientVoices.quotes`), or set `clientVoices.visible` to `false`
- [ ] Contact email, phone and studio address (`contact.details`)

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

## Before launch
- [ ] Hide or replace Client voices, Where we work and the placeholder stat cards if real data is missing (no dashes shipped)
- [ ] Lead backend, once forms are built: the download path promises an email with a link, so it must actually be sent
- [ ] Logo as SVG (the logo stripe animation would benefit)
- [ ] Empty pages to fill: Method, Case Studies, Case Study, Lab, Studio, Journal, Careers, Legal
