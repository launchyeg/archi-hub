import { contact } from '../../content/home.js';
import { monoLabel, sectionShell, serifHeading } from '../../lib/homeType.js';
import LeadForm from '../LeadForm.jsx';
import PlaceholderTag from '../PlaceholderTag.jsx';
import Reveal from '../Reveal.jsx';

export default function ContactSection({ need }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 border-t border-line">
      <div className={`grid items-start gap-12 lg:grid-cols-12 lg:gap-6 ${sectionShell}`}>
        <div className="lg:col-span-4">
          <Reveal as="h2" id="contact-title" className={serifHeading}>
            {contact.heading}
          </Reveal>
          <p className="mt-6 max-w-[40ch] text-ink-dim">{contact.body}</p>

          <dl className="mt-10 border-t border-line">
            {contact.details.map((detail) => (
              <div key={detail.label} className="flex items-center justify-between gap-4 border-b border-line py-4">
                <dt className={`${monoLabel} text-gold`}>{detail.label}</dt>
                <dd className="flex items-center gap-3 text-ink-dim">
                  {detail.value}
                  <PlaceholderTag />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Form card: solid, not glass (glass is reserved for the Navbar and hero stat card). */}
        <div className="rounded-card border border-line-strong bg-ground p-6 sm:p-10 lg:col-span-7 lg:col-start-6">
          <LeadForm key={need ?? 'any'} defaultType={need} idPrefix="contact" pill />
        </div>
      </div>
    </section>
  );
}
