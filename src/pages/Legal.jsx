import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import PlaceholderNote from "../components/PlaceholderNote.jsx";
import { studio } from "../content/company.js";
import legal from "../content/legal.json";
import useReveal from "../lib/useReveal.js";

const LINK =
  "text-gold-bright underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold-bright";

function renderText(text) {
  return text
    .replaceAll("{address}", studio.address)
    .split("{email}")
    .map((part, i, all) => (
      <Fragment key={i}>
        {part}
        {i < all.length - 1 && (
          <a href={`mailto:${studio.email}`} className={LINK}>
            {studio.email}
          </a>
        )}
      </Fragment>
    ));
}

function Block({ block }) {
  if (block.h)
    return (
      <h3 className="mt-8 font-hero text-lg font-medium tracking-tight text-ink">
        {block.h}
      </h3>
    );
  if (block.ul)
    return (
      <ul className="flex list-disc flex-col gap-1 pl-5 text-ink-dim marker:text-gold">
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if (block.placeholder)
    return <PlaceholderNote>{block.placeholder}</PlaceholderNote>;
  return <p className="text-ink-dim">{renderText(block.p)}</p>;
}

export default function Legal() {
  const contentRef = useRef(null);
  useReveal(contentRef, { selector: "[data-reveal]" });

  return (
    <main className="mx-auto max-w-[1280px] px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-28">
      <div ref={contentRef}>
        <header
          data-reveal
          className="flex max-w-3xl flex-col items-start gap-6"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-amber"
            />
            Legal
          </p>
          <h1 className="font-hero text-[clamp(32px,3.6vw,48px)] leading-[1.1] font-normal tracking-tight text-ink">
            Privacy, terms and disclaimer
          </h1>
          <PlaceholderNote>{legal.draftNote}</PlaceholderNote>
        </header>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[220px_1fr] md:gap-16">
          <nav
            data-reveal
            aria-label="On this page"
            className="md:sticky md:top-28 md:self-start"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-3">
              {legal.sections.map((s) => (
                <li key={s.id}>
                  <Link
                    to={{ hash: `#${s.id}` }}
                    className="text-sm text-ink-dim transition-colors hover:text-gold-bright"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex max-w-[65ch] flex-col gap-16 md:gap-20">
            {legal.sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                data-reveal
                aria-labelledby={`${s.id}-title`}
                className="flex flex-col gap-4"
              >
                <h2
                  id={`${s.id}-title`}
                  className="font-hero text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-normal tracking-tight text-ink"
                >
                  {s.title}
                </h2>
                <p className="text-ink">{s.summary}</p>
                {s.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
