import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks.jsx";

// Site footer, on every page. Layout and spacing follow the approved reference: a two-line
// statement with the social icons on the left, three content-width columns pushed to the right,
// and a quiet bottom row. No divider lines.
// Project names are read from the signage in Archi Hub's renders and still need confirming.
// PLACEHOLDER: email, phone and city are not confirmed yet (docs/OPEN-ITEMS.md).
const COLUMNS = [
  {
    title: "Links",
    links: [
      { label: "Home", to: "/" },
      { label: "The Method", to: "/method" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Intelligence Lab", to: "/lab" },
      { label: "Studio", to: "/studio" },
      { label: "Journal", to: "/journal" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "La Vida Karma Residence", to: "/case-studies" },
      { label: "Nefertiti Motel", to: "/case-studies" },
      { label: "Mall Anton", to: "/case-studies" },
      { label: "Amarina Soul", to: "/case-studies" },
    ],
  },
];

const CONTACT = [
  "Placeholder: email address",
  "Placeholder: phone number",
  "Placeholder: city, country",
];

const YEAR = new Date().getFullYear();

const ITEM = "text-base leading-[1.5] text-ink/90";

export default function Footer() {
  return (
    <footer className="bg-ground-raised font-hero">
      <div className="mx-auto max-w-[1280px] px-4 pt-16 pb-11 sm:px-6 lg:pt-22">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="flex flex-col items-start gap-5">
            <p className="text-[clamp(32px,3vw,40px)] leading-[1.1] font-medium tracking-tight text-ink">
              Vision...
              <br />
              Built.
            </p>
            <SocialLinks
              className="-ml-[9px] flex items-center"
              iconClassName="size-[22px]"
              itemClassName="size-10 text-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:flex sm:gap-8">
            {COLUMNS.map((col) => (
              <nav
                key={col.title}
                aria-label={col.title}
                className="flex flex-col"
              >
                <h2 className="text-xl leading-[1.2] text-ink">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className={`${ITEM} transition-colors hover:text-gold-bright sm:whitespace-nowrap`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="col-span-2 flex flex-col sm:col-span-1">
              <h2 className="text-xl leading-[1.2] text-ink">Contact</h2>
              <ul className="mt-5 flex flex-col gap-2.5">
                {CONTACT.map((line) => (
                  <li key={line} className={`${ITEM} sm:whitespace-nowrap`}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-sm tracking-[0.04em] text-ink-dim">
          <p>© {YEAR} Archi Hub. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/careers" className="transition-colors hover:text-ink">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/legal" className="transition-colors hover:text-ink">
                Legal &amp; Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
