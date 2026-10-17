import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";

const pill =
  "rounded-full border border-ink/12 " +
  "bg-ground/92 supports-[backdrop-filter]:bg-ground/72 supports-[backdrop-filter]:backdrop-blur-[16px]";

// const pill =
// "rounded-full border border-[#ffdaa41f] backdrop-blur-xs " +
// "bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))]";

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-ink ${
    isActive ? "text-ink" : "text-ink-dim"
  }`;

// Fixed on every page. Home gets the glass pill; other pages get the solid version (DESIGN.md).
export default function Navbar() {
  const nav = {
    links: [
      { label: "Home", to: "/" },
      { label: "Method", to: "/method" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Lab", to: "/lab" },
    ],
    cta: { label: "Studio", to: "/studio" },
  };
  const [open, setOpen] = useState(false);
  const isHome = useLocation().pathname === "/";

  const surface = isHome ? pill : "rounded-full border border-line bg-ground";
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div
          className={`flex h-14 items-center justify-between gap-4 pr-3 pl-5 sm:h-16 ${surface}`}
        >
          <Link
            to="/"
            onClick={close}
            aria-label="Archi Hub home"
            className="shrink-0"
          >
            <img
              src="/archihub-logo-horizontal.png"
              alt="Archi Hub"
              width="1828"
              height="565"
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {nav.links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to={nav.cta.to}
              className="hidden rounded-full border border-gold px-5 py-2.5 text-sm font-bold text-gold sm:inline-block"
            >
              {nav.cta.label}
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" />
                ) : (
                  <path d="M3 6h14M3 14h14" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              className={`mt-2 flex flex-col gap-1 rounded-[var(--radius-card)] p-3 md:hidden ${
                isHome
                  ? pill.replace("rounded-full", "")
                  : "border border-line bg-ground"
              }`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {[...nav.links, nav.cta].map((link) => (
                <NavLink
                  key={link.to + link.label}
                  to={link.to}
                  onClick={close}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
