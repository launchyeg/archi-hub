import { useState } from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { to: '/careers', label: 'Careers' },
  { to: '/legal', label: 'Legal' },
];

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="border-t border-line bg-ground">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <Link to="/" aria-label="Archi Hub home">
          <img src="/archihub-logo-horizontal.png" alt="Archi Hub" className="h-14 w-auto" />
        </Link>

        <nav aria-label="Footer" className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-mono text-xs uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-dim">
          © {year} Archi Hub
        </p>
      </div>
    </footer>
  );
}
