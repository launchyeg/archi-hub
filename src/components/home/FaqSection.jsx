import { Link } from 'react-router-dom';
import { faq } from '../../content/home.js';
import { textLink } from '../../lib/buttonStyles.js';
import { sectionShell, serifHeading } from '../../lib/homeType.js';
import Reveal from '../Reveal.jsx';

// Questions whose answer is still 'to confirm' stay in src/content/home.js and off the page.
const confirmed = faq.items.filter((item) => item.status === 'confirmed');

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-line">
      <div className={sectionShell}>
        <Reveal as="h2" id="faq-title" className={`text-center ${serifHeading}`}>
          {faq.heading}
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-[800px] flex-col gap-3">
          {confirmed.map((item) => (
            <details
              key={item.question}
              className="group rounded-[28px] border border-line bg-ground-raised transition-colors open:border-line-strong"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[28px] py-3 pl-6 pr-3 font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-gold transition-colors group-hover:bg-gold-bright"
                >
                  <span className="absolute h-px w-3.5 bg-ground" />
                  <span className="absolute h-3.5 w-px bg-ground transition-transform group-open:rotate-90" />
                </span>
              </summary>
              <div className="px-6 pb-6 pr-16 text-ink-dim">
                <p>{item.answer}</p>
                {item.link && (
                  <Link to={item.link.to} className={`mt-3 inline-block ${textLink}`}>
                    {item.link.label}
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
