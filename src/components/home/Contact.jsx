import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuClock, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import SocialLinks from "../layout/SocialLinks.jsx";
import { studio } from "../../content/company.js";
import useReveal from "../../lib/useReveal.js";

const DETAILS = [
  {
    title: "Open hours",
    lines: [{ icon: LuClock, text: "Saturday-Thursday: 10.00AM-6.00PM" }],
  },
  {
    title: "Let’s talk",
    lines: [
      {
        icon: LuMapPin,
        text: studio.city,
        href: studio.mapUrl,
        external: true,
      },
      { icon: LuPhone, text: studio.phone.label, href: studio.phone.href },
      {
        icon: LuMail,
        text: studio.email,
        href: `mailto:${studio.email}`,
      },
    ],
  },
];

const BADGE =
  "inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink";

const FIELD =
  "w-full rounded-xl border bg-ground px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-dim focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const FIELD_OK = "border-line hover:border-line-strong focus:border-gold";
const FIELD_ERROR = "border-error";

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  surname: z.string().trim(),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .pipe(z.email("Enter a valid email address, like name@company.com.")),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(
      /^\+?[\d\s()-]{7,}$/,
      "Enter a valid phone number, like +20 100 123 4567.",
    ),
  message: z.string().trim().min(1, "Tell us about your project or question."),
});

function resolver(values) {
  const result = schema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    errors[key] ??= { type: issue.code, message: issue.message };
  }
  return { values: {}, errors };
}

function Field({
  id,
  label,
  optional = false,
  error,
  as: Control = "input",
  className = "",
  ...control
}) {
  const errorId = `${id}-error`;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm text-ink">
        {label}
        {optional && <span className="text-ink-dim"> (optional)</span>}
      </label>
      <Control
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${FIELD} ${error ? FIELD_ERROR : FIELD_OK} ${
          Control === "textarea" ? "min-h-32 resize-y" : ""
        }`}
        {...control}
      />
      {error && (
        <p id={errorId} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const contentRef = useRef(null);
  useReveal(contentRef);
  const [notice, setNotice] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: { name: "", surname: "", email: "", phone: "", message: "" },
  });

  return (
    <section
      id="contact"
      className="bg-ground my-16 md:mb-28"
      aria-labelledby="contact-title"
    >
      <div
        ref={contentRef}
        className="mx-auto grid max-w-[1280px] items-start gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-x-16 md:gap-y-0"
      >
        <div className="flex flex-col items-start md:col-start-1 md:row-start-1">
          <h2 id="contact-title" className={BADGE}>
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-amber"
            />
            Contact
          </h2>

          <p className="mt-8 max-w-[22ch] font-hero text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-tight text-balance text-ink">
            Structure your next project with us.
          </p>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-dim">
            Tell us about your architectural requirements or software inquiries.
            Fill out the form below to receive a proposal.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(
            () => setNotice(true),
            () => setNotice(false),
          )}
          className="grid grid-cols-1 gap-6 rounded-[var(--radius-card)] border border-line bg-ground-raised p-6 sm:grid-cols-2 md:col-start-2 md:row-span-2 md:row-start-1 md:p-10"
          aria-label="Contact form"
        >
          <Field
            id="contact-name"
            label="Name"
            placeholder="Your name"
            autoComplete="given-name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Field
            id="contact-surname"
            label="Surname"
            optional
            placeholder="Your surname"
            autoComplete="family-name"
            {...register("surname")}
          />
          <Field
            id="contact-email"
            label="Email"
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Field
            id="contact-phone"
            label="Phone"
            type="tel"
            placeholder="Your phone number"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Field
            as="textarea"
            id="contact-message"
            label="Message"
            rows={5}
            placeholder="How can we help you?"
            className="sm:col-span-2"
            error={errors.message?.message}
            {...register("message")}
          />

          <div className="flex flex-col sm:col-span-2">
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
                  className="text-ink transition-colors hover:text-gold-bright"
                >
                  privacy notice
                </Link>
                .
              </p>
            </div>
            <p
              role="status"
              className="text-sm text-gold-bright not-empty:mt-4"
            >
              {notice &&
                "Placeholder: sending isn't connected yet, so this message wasn't sent."}
            </p>
          </div>
        </form>

        <div className="flex flex-col items-start md:col-start-1 md:row-start-2">
          <SocialLinks
            className="-ml-2 flex items-center"
            iconClassName="size-5"
            itemClassName="size-10 text-gold"
          />

          <dl className="mt-6 flex flex-col gap-6">
            {DETAILS.map((d) => (
              <div key={d.title} className="flex flex-col gap-2">
                <dt className="text-base font-medium text-ink">{d.title}</dt>
                {d.lines.map(({ icon: Icon, ...line }) => (
                  <dd
                    key={line.text}
                    className="flex items-center gap-3 text-base text-ink-dim"
                  >
                    <Icon
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    {line.href ? (
                      <a
                        href={line.href}
                        {...(line.external && {
                          target: "_blank",
                          rel: "noreferrer",
                        })}
                        className="transition-colors hover:text-gold-bright"
                      >
                        {line.text}
                      </a>
                    ) : (
                      line.text
                    )}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
