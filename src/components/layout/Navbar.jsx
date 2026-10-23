import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "../../lib/useReveal.js";

gsap.registerPlugin(ScrollTrigger);

const MOTION_EASE = [0.22, 1, 0.36, 1];
// Scrolled past this, scrolling down tucks the bar away; any upward scroll brings it back.
const HIDE_AFTER = 160;

const pill =
  "rounded-full border border-ink/12 " +
  "bg-ground/92 supports-[backdrop-filter]:bg-ground/72 supports-[backdrop-filter]:backdrop-blur-[16px]";

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-ink ${
    isActive ? "bg-ink/8 text-ink" : "text-ink-dim"
  }`;

const menu = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: MOTION_EASE,
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: MOTION_EASE },
  },
};
const menuItem = {
  hidden: { opacity: 0, y: -4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: MOTION_EASE } },
};

function MenuIcon({ open }) {
  const bar = "absolute left-0 h-[1.5px] w-5 rounded-full bg-current";
  const transition = { duration: 0.24, ease: MOTION_EASE };
  return (
    <span aria-hidden="true" className="relative block h-3 w-5">
      <motion.span
        className={`${bar} top-0`}
        animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={transition}
      />
      <motion.span
        className={`${bar} bottom-0`}
        animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={transition}
      />
    </span>
  );
}

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
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const reduced = useReducedMotion();
  const headerRef = useRef(null);
  const showRef = useRef(() => {});
  const openRef = useRef(open);

  const surface = isHome ? pill : "rounded-full border border-line bg-ground";
  const close = () => setOpen(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let hidden = false;
      const setHidden = (next) => {
        if (next === hidden) return;
        hidden = next;
        gsap.to(header, {
          yPercent: next ? -130 : 0,
          duration: next ? 0.32 : 0.4,
          ease: next ? "power2.in" : EASE,
          overwrite: true,
        });
      };
      showRef.current = () => setHidden(false);

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const down = self.direction === 1;
          // Never tuck it away while the menu is open or keyboard focus is inside it.
          const busy =
            openRef.current || header.contains(document.activeElement);
          setHidden(down && self.scroll() > HIDE_AFTER && !busy);
        },
      });

      return () => {
        showRef.current = () => {};
      };
    });

    return () => mm.revert();
  }, []);

  // A new page or an open menu always shows the bar.
  useEffect(() => {
    openRef.current = open;
    showRef.current();
  }, [pathname, open]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
      onFocusCapture={() => showRef.current()}
    >
      <MotionConfig reducedMotion="user">
        <motion.div
          className="mx-auto max-w-[1280px]"
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: MOTION_EASE }}
        >
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
                <MenuIcon open={open} />
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
                variants={menu}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {nav.links.map((link) => (
                  <motion.div key={link.to} variants={menuItem}>
                    <NavLink
                      to={link.to}
                      onClick={close}
                      className={(s) => `block ${linkClass(s)}`}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                {/* From sm up the Studio button already sits in the bar, so the menu skips it */}
                <motion.div variants={menuItem} className="sm:hidden">
                  <Link
                    to={nav.cta.to}
                    onClick={close}
                    className={`block ${linkClass({ isActive: false })}`}
                  >
                    {nav.cta.label}
                  </Link>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </MotionConfig>
    </header>
  );
}
