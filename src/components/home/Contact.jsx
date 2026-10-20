import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLinks from "../layout/SocialLinks.jsx";

// Contact: details on the left, a message form on the right.
// The form is LOOKS ONLY for now: nothing is sent and nothing is validated. When lead capture is
// built (CLAUDE.md: one shared LeadForm + src/lib/submitLead.js), this form gets replaced by it.
// PLACEHOLDER: hours, address, phone and email are not confirmed yet (docs/OPEN-ITEMS.md).
const DETAILS = [
  { title: "Open hours", lines: ["Placeholder: studio hours"] },
  {
    title: "Address",
    lines: [
      "Placeholder: studio address",
      "Placeholder: phone number",
      "Placeholder: email address",
    ],
  },
];

const BADGE =
  "inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink";

const FIELD =
  "w-full rounded-xl border border-line bg-ground px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-dim hover:border-line-strong focus:border-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function Field({ id, label, className = "", ...input }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <input id={id} name={id} className={FIELD} {...input} />
    </div>
  );
}

export default function Contact() {
  const [notice, setNotice] = useState(false);

  return (
    <section
      className="my-24 bg-ground md:my-40"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col items-start">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <h2 id="contact-title" className={BADGE}>
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-amber"
              />
              Contact
            </h2>
            <p className="text-xs tracking-[0.12em] text-gold-bright uppercase">
              Placeholder · details pending
            </p>
          </div>

          <p className="mt-8 max-w-[22ch] font-hero text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-tight text-balance text-ink">
            Start your next building with us.
          </p>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-dim">
            Tell us about your project, or ask about our software. Fill out the
            form and the studio will get back to you.
          </p>

          <SocialLinks className="mt-5 -ml-2 flex items-center gap-1" iconClassName="size-5" />

          <dl className="mt-5 flex flex-col gap-8">
            {DETAILS.map((d) => (
              <div key={d.title} className="flex flex-col gap-2">
                <dt className="text-base font-medium text-ink">{d.title}</dt>
                {d.lines.map((line) => (
                  <dd key={line} className="text-base text-ink-dim">
                    {line}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault(); // not connected yet
            setNotice(true);
          }}
          className="grid grid-cols-1 gap-6 rounded-[var(--radius-card)] border border-line bg-ground-raised p-6 sm:grid-cols-2 md:p-10"
          aria-label="Contact form"
        >
          <Field
            id="contact-name"
            label="Name"
            placeholder="Your name"
            autoComplete="given-name"
          />
          <Field
            id="contact-surname"
            label="Surname"
            placeholder="Your surname"
            autoComplete="family-name"
          />
          <Field
            id="contact-email"
            label="Email"
            type="email"
            placeholder="Your email address"
            autoComplete="email"
          />
          <Field
            id="contact-phone"
            label="Phone"
            type="tel"
            placeholder="Your phone number"
            autoComplete="tel"
          />
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="contact-message" className="text-sm text-ink">
              Message
            </label>
            <textarea
              id="contact-message"
              name="contact-message"
              rows={5}
              placeholder="How can we help you?"
              className={`${FIELD} min-h-32 resize-y`}
            />
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-base font-medium text-ground transition-transform active:scale-[0.98]"
              >
                Send the message
                <svg
                  viewBox="0 0 20 20"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 14L14 6M7 6h7v7" />
                </svg>
              </button>
              <p className="text-sm text-ink-dim">
                See our{" "}
                <Link
                  to="/legal"
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-gold"
                >
                  privacy notice
                </Link>
                .
              </p>
            </div>
            <p role="status" className="min-h-6 text-sm text-gold-bright">
              {notice
                ? "Placeholder: sending isn't connected yet, so this message wasn't sent."
                : ""}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
