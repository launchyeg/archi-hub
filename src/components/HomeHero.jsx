import { Link } from 'react-router-dom';
import { hero } from '../content/home.js';
import { primaryButton, secondaryButton } from '../lib/buttonStyles.js';
import PipelineDiagram from './PipelineDiagram.jsx';

export default function HomeHero() {
  const [first, second] = hero.headlineLines;

  return (
    <section aria-labelledby="home-title">
      <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-6 lg:pb-40 lg:pt-24">
        <div className="lg:col-span-7">
          <h1
            id="home-title"
            className="text-[clamp(2.5rem,1.5rem+4vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink"
          >
            <span className="block">{first}</span>
            <span className="block text-gold-bright">{second}</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-dim">
            {hero.supportingLine}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#start-project" className={primaryButton}>
              {hero.primaryCta}
            </a>
            <Link to="/method" className={secondaryButton}>
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <PipelineDiagram />
        </div>
      </div>
    </section>
  );
}
