# Launch checklist

Everything on the site that is a placeholder, an unconfirmed claim, or a section that must be hidden or replaced before launch. All Home content lives in `src/content/home.js`.

## 1. Placeholders to replace with real content

### Home: images
- [ ] Hero image: a completed Archi Hub project (`hero.image`). Recheck WCAG AA contrast for the hero text and the glass stat card against the real image's brightest area.
- [ ] About: "Studio at work", "Project model or drawing set", "Engineer reviewing a design" (`about.images`)
- [ ] What we deliver: six card images (`deliver.items[].imageNote`)
- [ ] Intelligence Lab preview: screen recording for each program (`labPreview.programs`)
- [ ] Where we work: map of the studio and project locations (`whereWeWork.mapNote`)

### Home: figures (no invented numbers)
- [ ] Hero glass stat card: "Floor area" and "Options reviewed" for a real project (`hero.statCard`)
- [ ] Hero stat cards: "Projects delivered" and "Desktop programs" (`stats`). Only "5 stages" is real.

### Home: content
- [ ] Program names, the engineer's problem and the result for Program A, B and C (`labPreview.programs`, `labPreview.programFields`)
- [ ] Client quotes: six placeholder cards (`clientVoices.quotes`). See section 3.
- [ ] Studio location and project locations (`whereWeWork.locations`)
- [ ] Contact email, phone and studio address (`contact.details`)

### Other pages
- [ ] The Method, Case Studies, Case Study, Intelligence Lab, Studio, Journal, Careers and Legal are still empty placeholder pages.
- [ ] The Legal page needs a real privacy policy. The form's "privacy notice" link and the FAQ already point to `/legal`.

## 2. Claims to confirm with the company

Each one is marked `claimsStatus` or 'to confirm with the company' in `src/content/home.js`.

- [ ] Hero headline "AI proposes. An engineer decides." and the supporting line (`hero`)
- [ ] About copy: "designs buildings with its own AI tools, and builds the desktop software engineers use", "every project moves through the same five stages", "an engineer reviews, decides and signs off" (`about`)
- [ ] Why Archi Hub, the four commitments, especially "an engineer ... is accountable for the result" and "engineers can download and use the same tools" (`why`)
- [ ] What we deliver: the whole list of six services (`deliver`)
- [ ] Intelligence Lab preview: the five stages and which stages the AI runs (`labPreview.stages`)
- [ ] FAQ answers: "An engineer reviews every design and makes the final decision", and "We will email you a download link" (`faq.items`)
- [ ] Contact: "We reply by email" (`contact.body`)

### FAQ questions waiting for answers (not shown on the page)
- [ ] Which operating systems does the software run on?
- [ ] How much does the software cost?
- [ ] Which countries do you work in?

Set `status: 'confirmed'` and write the answer in `faq.items` to publish each one.

## 3. Sections to hide or replace

- [ ] **Client voices.** Currently shown with PLACEHOLDER quotes. Replace with real, approved quotes, or set `clientVoices.visible` to `false` to hide the whole section.
- [ ] **Where we work.** Hide or replace if locations are not confirmed by launch.
- [ ] **Hero stat cards and glass stat card.** If real figures are not available, replace the placeholder cards rather than shipping dashes.

## 4. Other open items before launch

- [ ] Lead backend: `src/lib/submitLead.js` only logs. Choose email, Google Sheet or a CRM and wire it up. The download path promises an email with a download link, so that email must actually be sent.
- [ ] Production logo as SVG or transparent PNG (the logo stripe animation would also benefit from an SVG).
- [ ] Ramy Moustafa's title, and how the company wants his name shown.
- [ ] Domain and who manages hosting (Vercel).
- [ ] The `/dev/lead-form` preview route only exists in development builds. Confirm it is absent from the production build.
