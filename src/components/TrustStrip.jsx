import { Link } from 'react-router-dom';
import { trust } from '../content/home.js';
import { textLink } from '../lib/buttonStyles.js';
import ActorChip from './ActorChip.jsx';

// Styled as a drawing's title block: who proposed, who checked, who approved.
export default function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="border-t border-line">
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:py-40">
        <div className="lg:col-span-5">
          <h2
            id="trust-title"
            className="text-[clamp(1.75rem,1rem+2.5vw,2.5rem)] font-bold leading-tight text-ink"
          >
            {trust.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-ink-dim">{trust.body}</p>
          <Link to="/method" className={`mt-8 inline-block ${textLink}`}>
            {trust.linkLabel}
          </Link>
        </div>

        <dl className="border border-line-strong lg:col-span-6 lg:col-start-7">
          {trust.titleBlock.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[9rem_1fr] border-b border-line-strong last:border-b-0 sm:grid-cols-[10rem_1fr]"
            >
              <dt className="border-r border-line-strong p-4 font-mono text-xs uppercase leading-6 tracking-[0.12em] text-ink-dim">
                {row.label}
              </dt>
              <dd className="flex flex-wrap items-center gap-x-3 gap-y-2 p-4 text-ink">
                {row.value}
                <ActorChip actor={row.actor} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
