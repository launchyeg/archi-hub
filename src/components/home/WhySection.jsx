import { why } from '../../content/home.js';
import { sectionShell, serifHeading } from '../../lib/homeType.js';
import Reveal from '../Reveal.jsx';

export default function WhySection() {
  return (
    <section aria-labelledby="why-title" className="border-t border-line">
      <div className={`grid gap-12 lg:grid-cols-12 lg:gap-6 ${sectionShell}`}>
        <div className="lg:col-span-5">
          <Reveal as="h2" id="why-title" className={serifHeading}>
            {why.heading}
          </Reveal>
          <p className="mt-6 max-w-[40ch] text-ink-dim">{why.intro}</p>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {why.items.map((item, index) => (
            <li
              key={item.title}
              className="grid grid-cols-[4.5rem_1fr] gap-6 border-b border-line py-8 first:pt-0 last:border-b-0 sm:grid-cols-[5.5rem_1fr]"
            >
              <span className="border-r border-gold pr-6 font-serif text-[2.5rem] font-light leading-none tabular-nums text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-ink-dim">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
