import { Link } from 'react-router-dom';
import { hero } from '../../content/home.js';
import { primaryPill, secondaryPill } from '../../lib/buttonStyles.js';
import { monoLabel } from '../../lib/homeType.js';
import MarkDrawIn from '../MarkDrawIn.jsx';
import PlaceholderTag from '../PlaceholderTag.jsx';
import HeroStatCard from './HeroStatCard.jsx';
import HeroStats from './HeroStats.jsx';

const BLUR_IN = 'motion-safe:animate-blur-in';
const delay = (ms) => ({ animationDelay: `${ms}ms` });

export default function HeroSection({ onStartProject }) {
  const [first, second] = hero.headlineLines;

  return (
    <section aria-labelledby="home-title" className="relative isolate overflow-hidden">
      <div
        role="img"
        aria-label={`Placeholder image: ${hero.image.note}`}
        className="absolute inset-0 -z-20 bg-ground-raised"
      >
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-line">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ground via-ground/75 to-ground/40"
      />

      <div className="mx-auto grid min-h-[85svh] w-full max-w-[1280px] content-end gap-10 px-4 pb-16 pt-40 sm:px-6 lg:grid-cols-12 lg:content-center lg:gap-6 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-7">
          <div className={`flex items-center gap-4 ${BLUR_IN}`}>
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <MarkDrawIn className="w-8 shrink-0" />
            <p className={`${monoLabel} text-gold-bright`}>{hero.eyebrow}</p>
          </div>
          <h1
            id="home-title"
            className="mt-6 font-serif text-[clamp(2.75rem,1rem+6vw,6rem)] font-light leading-[1.02] tracking-[-0.01em] text-ink"
          >
            <span className={`block ${BLUR_IN}`} style={delay(250)}>
              {first}
            </span>
            <span className={`block italic text-gold-bright ${BLUR_IN}`} style={delay(400)}>
              {second}
            </span>
          </h1>
          <p
            className={`mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-dim ${BLUR_IN}`}
            style={delay(600)}
          >
            {hero.supportingLine}
          </p>
          <div className={`mt-10 flex flex-col gap-4 sm:flex-row ${BLUR_IN}`} style={delay(750)}>
            <a href="#contact" onClick={onStartProject} className={primaryPill}>
              {hero.primaryCta}
            </a>
            <Link to="/method" className={secondaryPill}>
              {hero.secondaryCta}
            </Link>
          </div>
          <div className={`mt-12 ${BLUR_IN}`} style={delay(900)}>
            <HeroStats />
          </div>
        </div>

        <div
          className={`flex flex-col gap-4 lg:col-span-4 lg:col-start-9 lg:items-end lg:self-start ${BLUR_IN}`}
          style={delay(1000)}
        >
          <HeroStatCard />
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <PlaceholderTag />
            <span className={`${monoLabel} rounded-full bg-ground px-3 py-1 text-ink-dim`}>
              {hero.image.note}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
