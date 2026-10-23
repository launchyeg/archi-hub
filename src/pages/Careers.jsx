import { useRef } from "react";
import PlaceholderNote from "../components/PlaceholderNote.jsx";
import careers from "../content/careers.json";
import { studio } from "../content/company.js";
import useReveal from "../lib/useReveal.js";

export default function Careers() {
  const contentRef = useRef(null);
  useReveal(contentRef);
  const hasRoles = careers.roles.length > 0;

  return (
    <main className="mx-auto max-w-[1280px] px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-28">
      <div ref={contentRef} className="flex max-w-3xl flex-col gap-12">
        <header className="flex flex-col items-start gap-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-amber"
            />
            Careers
          </p>
          <h1 className="font-hero text-[clamp(32px,3.6vw,48px)] leading-[1.1] font-normal tracking-tight text-ink">
            Work with Archi Hub
          </h1>
          <p className="max-w-[65ch] text-lg text-ink-dim">{careers.intro}</p>
        </header>

        <section
          aria-labelledby="roles-title"
          className="flex flex-col gap-4 border-t border-line pt-8"
        >
          <h2
            id="roles-title"
            className="font-hero text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-normal tracking-tight text-ink"
          >
            Open roles
          </h2>
          {hasRoles ? (
            <ul className="flex flex-col">
              {careers.roles.map((r) => (
                <li
                  key={r.title}
                  className="flex flex-col gap-1 border-b border-line py-5 first:pt-0"
                >
                  <h3 className="font-hero text-lg font-medium tracking-tight text-ink">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gold-bright">{r.location}</p>
                  <p className="max-w-[65ch] text-ink-dim">{r.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="max-w-[65ch] text-ink-dim">{careers.openNote}</p>
              <PlaceholderNote>{careers.rolesNote}</PlaceholderNote>
            </>
          )}
          <a
            href={`mailto:${studio.email}`}
            className="mt-2 inline-flex w-fit items-center rounded-[var(--radius)] bg-amber px-6 py-3 text-base font-bold text-ground transition-colors hover:bg-gold-bright"
          >
            Email {studio.email}
          </a>
        </section>
      </div>
    </main>
  );
}
