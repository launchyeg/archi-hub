import { Link } from 'react-router-dom';
import { about } from '../../content/home.js';
import { secondaryPill } from '../../lib/buttonStyles.js';
import { sectionShell, serifHeading } from '../../lib/homeType.js';
import PlaceholderImage from '../PlaceholderImage.jsx';
import Reveal from '../Reveal.jsx';

export default function AboutSection() {
  const wide = about.images.filter((image) => image.shape === 'wide');
  const tall = about.images.find((image) => image.shape === 'tall');

  return (
    <section aria-labelledby="about-title">
      <div className={`grid gap-12 lg:grid-cols-12 lg:gap-6 ${sectionShell}`}>
        <div className="flex flex-col lg:col-span-6">
          <Reveal as="h2" id="about-title" className={`max-w-[14ch] ${serifHeading}`}>
            {about.heading}
          </Reveal>
          {about.body.map((paragraph) => (
            <p key={paragraph} className="mt-6 max-w-[52ch] text-ink-dim">
              {paragraph}
            </p>
          ))}
          <Link to="/method" className={`mt-10 self-start ${secondaryPill}`}>
            {about.cta}
          </Link>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-auto lg:pt-12">
            {wide.map((image) => (
              <PlaceholderImage key={image.note} note={image.note} className="aspect-[4/3]" />
            ))}
          </div>
        </div>

        <PlaceholderImage
          note={tall.note}
          className="aspect-[4/5] lg:col-span-6 lg:aspect-auto lg:min-h-[640px]"
        />
      </div>
    </section>
  );
}
