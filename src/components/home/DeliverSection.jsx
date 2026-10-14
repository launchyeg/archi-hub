import { deliver } from '../../content/home.js';
import { sectionShell, serifHeading } from '../../lib/homeType.js';
import PlaceholderImage from '../PlaceholderImage.jsx';
import Reveal from '../Reveal.jsx';

export default function DeliverSection() {
  return (
    <section aria-labelledby="deliver-title" className="border-t border-line">
      <div className={sectionShell}>
        <Reveal as="h2" id="deliver-title" className={`max-w-[16ch] ${serifHeading}`}>
          {deliver.heading}
        </Reveal>
        <p className="mt-6 max-w-[52ch] text-ink-dim">{deliver.intro}</p>

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {deliver.items.map((item) => (
            <li key={item.title} className="relative">
              <PlaceholderImage note={item.imageNote} labelPosition="top" className="aspect-[4/3]" />
              {/* Caption bar: solid, not glass (glass is reserved for the Navbar and hero stat card). */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-line-strong bg-ground px-5 py-4">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-dim">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
