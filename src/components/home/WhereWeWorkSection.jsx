import { whereWeWork } from '../../content/home.js';
import { monoLabel, sectionShell, serifHeading } from '../../lib/homeType.js';
import PlaceholderImage from '../PlaceholderImage.jsx';
import PlaceholderTag from '../PlaceholderTag.jsx';
import Reveal from '../Reveal.jsx';

export default function WhereWeWorkSection() {
  return (
    <section aria-labelledby="where-title" className="border-t border-line">
      <div className={`grid gap-12 lg:grid-cols-12 lg:gap-6 ${sectionShell}`}>
        <div className="lg:col-span-5">
          <Reveal as="h2" id="where-title" className={serifHeading}>
            {whereWeWork.heading}
          </Reveal>
          <p className="mt-6 max-w-[40ch] text-ink-dim">{whereWeWork.body}</p>

          <dl className="mt-10 border-t border-line">
            {whereWeWork.locations.map((location) => (
              <div key={location.label} className="flex items-center justify-between gap-4 border-b border-line py-5">
                <dt className={`${monoLabel} text-gold`}>{location.label}</dt>
                <dd className="flex items-center gap-3 text-ink-dim">
                  {location.value}
                  <PlaceholderTag>To confirm</PlaceholderTag>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <PlaceholderImage
          note={whereWeWork.mapNote}
          className="aspect-[4/3] lg:col-span-7 lg:col-start-6 lg:aspect-auto lg:min-h-[480px]"
        />
      </div>
    </section>
  );
}
