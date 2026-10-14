import { stats } from '../../content/home.js';
import PlaceholderTag from '../PlaceholderTag.jsx';

// Solid cards, not glass: glass is reserved for the Navbar and the one hero stat card.
export default function HeroStats() {
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col rounded-card border border-line bg-ground-raised p-5">
          <dt className="order-2 mt-4 text-sm font-medium text-ink">{stat.label}</dt>
          <dd className="order-1 flex min-h-10 items-center justify-between gap-3">
            {stat.placeholder ? (
              <>
                <span aria-hidden="true" className="font-serif text-[2.5rem] font-light leading-none text-ink-dim">
                  —
                </span>
                <span className="sr-only">To come</span>
                <PlaceholderTag />
              </>
            ) : (
              <span className="font-serif text-[2.5rem] font-light leading-none text-gold-bright">
                {stat.value}
              </span>
            )}
          </dd>
          <dd className="order-3 mt-3 text-sm text-ink-dim">
            <span aria-hidden="true" className="mb-3 block h-px w-6 bg-gold" />
            {stat.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}
