import { hero } from '../../content/home.js';
import { glassSurface, monoLabel } from '../../lib/homeType.js';
import PlaceholderTag from '../PlaceholderTag.jsx';

// The one glass card on the site (see DESIGN.md, Glass). No real figures yet, so every value
// is a dash with a PLACEHOLDER label, never a number.
export default function HeroStatCard() {
  const { title, note, facts } = hero.statCard;

  return (
    <aside aria-label={`${title}, placeholder figures`} className={`w-full rounded-card p-6 sm:w-80 ${glassSurface}`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`${monoLabel} text-ink-dim`}>{title}</p>
        <PlaceholderTag />
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-6">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-sm text-ink-dim">{fact.label}</dt>
            <dd className="mt-2 flex items-baseline gap-2">
              <span aria-hidden="true" className="font-serif text-[2.5rem] font-light leading-none text-ink">
                —
              </span>
              <span className="sr-only">To come</span>
              <span className="text-sm text-ink-dim">{fact.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-ink-dim">{note}</p>
    </aside>
  );
}
