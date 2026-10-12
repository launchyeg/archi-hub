import { startProject } from '../content/home.js';
import LeadForm from './LeadForm.jsx';

export default function StartProjectBand() {
  return (
    <section
      id="start-project"
      aria-labelledby="start-title"
      className="scroll-mt-20 border-t border-line"
    >
      <div className="mx-auto grid max-w-[1280px] items-start gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:py-40">
        <div className="lg:col-span-4">
          <h2
            id="start-title"
            className="text-[clamp(1.75rem,1rem+2.5vw,2.5rem)] font-bold leading-tight text-ink"
          >
            {startProject.heading}
          </h2>
          <p className="mt-4 max-w-[40ch] text-ink-dim">{startProject.body}</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <LeadForm defaultType="inquiry" idPrefix="home-lead" />
        </div>
      </div>
    </section>
  );
}
