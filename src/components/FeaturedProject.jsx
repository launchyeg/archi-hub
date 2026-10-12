import { Link } from 'react-router-dom';
import { featuredProject } from '../content/featuredProject.js';
import { secondaryButton } from '../lib/buttonStyles.js';
import ActorChip from './ActorChip.jsx';
import PlaceholderFrame from './PlaceholderFrame.jsx';

export default function FeaturedProject() {
  const { title, summary, facts, steps, slug, isPlaceholder } = featuredProject;

  return (
    <section aria-labelledby="featured-title" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:py-40">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <h2
            id="featured-title"
            className="text-[clamp(1.75rem,1rem+2.5vw,2.5rem)] font-bold leading-tight text-ink"
          >
            {title}
          </h2>
          {isPlaceholder && (
            <span className="rounded-[2px] border border-gold-bright px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-gold-bright">
              Placeholder · Not a real project
            </span>
          )}
        </div>
        <p className="mt-4 max-w-[65ch] text-ink-dim">{summary}</p>

        <dl className="mt-8 flex flex-wrap gap-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex gap-2 rounded-[2px] border border-gold px-3 py-1 font-mono text-xs uppercase tracking-[0.12em]"
            >
              <dt className="text-ink-dim">{fact.label}</dt>
              <dd className="text-gold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <ol className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col">
              <PlaceholderFrame note={step.media} />
              <div className="mt-6 flex items-center gap-3">
                <span className="font-mono text-xs tabular-nums text-ink-dim">
                  {String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </span>
                <ActorChip actor={step.actor} />
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-ink-dim">{step.description}</p>
            </li>
          ))}
        </ol>

        <Link to={`/case-studies/${slug}`} className={`mt-16 ${secondaryButton}`}>
          Read the full process story
        </Link>
      </div>
    </section>
  );
}
