import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/method', label: 'The Method' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/lab', label: 'Intelligence Lab' },
  { to: '/studio', label: 'Studio' },
  { to: '/journal', label: 'Journal' },
];

function linkClasses({ isActive }) {
  return `font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:text-gold ${
    isActive ? 'text-gold' : 'text-ink-dim'
  }`;
}

const ctaClasses =
  'items-center justify-center border border-gold px-4 py-2 text-sm font-semibold text-gold transition-colors hover:border-gold-bright hover:text-gold-bright';

// Home only: floating glass pill (see DESIGN.md, Glass). Other pages keep the solid bar.
const HOME_HEADER = 'fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6';
const HOME_BAR =
  'mx-auto flex max-w-[1280px] items-center justify-between rounded-full border border-ink/12 bg-ground/72 px-4 py-2 backdrop-blur-[16px] supports-[not(backdrop-filter:blur(1px))]:bg-ground/92 sm:px-6';
const PAGE_BAR =
  'mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 sm:py-2';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const ctaShape = isHome ? 'rounded-full' : 'rounded-[2px]';
  const [lastPathname, setLastPathname] = useState(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setOpen(false);
  }

  return (
    <header
      className={
        isHome
          ? HOME_HEADER
          : `sticky top-0 z-50 border-b transition-colors duration-300 ${
              scrolled ? 'border-line bg-ground' : 'border-transparent bg-transparent'
            }`
      }
    >
      <div className={isHome ? HOME_BAR : PAGE_BAR}>
        <NavLink to="/" className="flex shrink-0 items-center">
          <img
            src="/archihub-logo-horizontal.png"
            alt="Archi Hub"
            className="hidden h-12 w-auto sm:block"
          />
          <img src="/archihub-mark.png" alt="Archi Hub" className="h-10 w-auto sm:hidden" />
        </NavLink>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavLink to="/lab" className={`hidden sm:inline-flex ${ctaShape} ${ctaClasses}`}>
            Try the software
          </NavLink>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center border border-line text-ink sm:hidden ${
              isHome ? 'rounded-full' : ''
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-200 ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-200 ${
                  open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className={
            isHome
              ? 'mx-auto mt-2 max-w-[1280px] rounded-card border border-line bg-ground p-6 sm:hidden'
              : 'border-t border-line bg-ground px-4 py-4 sm:hidden'
          }
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/lab" className={`flex ${ctaShape} ${ctaClasses}`}>
                Try the software
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
