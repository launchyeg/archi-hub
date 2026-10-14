import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { labPreview } from '../../content/home.js';
import { secondaryPill } from '../../lib/buttonStyles.js';
import { monoLabel, sectionShell, serifHeading } from '../../lib/homeType.js';
import PlaceholderImage from '../PlaceholderImage.jsx';
import PlaceholderTag from '../PlaceholderTag.jsx';
import Reveal from '../Reveal.jsx';
import PipelineMini from './PipelineMini.jsx';

const KEY_STEPS = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

export default function LabPreviewSection() {
  const { programs, programFields } = labPreview;
  const [activeId, setActiveId] = useState(programs[0].id);
  const tabRefs = useRef([]);
  const active = programs.find((program) => program.id === activeId);

  function handleKeyDown(event, index) {
    let next;
    if (event.key in KEY_STEPS) next = (index + KEY_STEPS[event.key] + programs.length) % programs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = programs.length - 1;
    else return;

    event.preventDefault();
    setActiveId(programs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section aria-labelledby="lab-title" className="border-t border-line">
      <div className={sectionShell}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <Reveal as="h2" id="lab-title" className={serifHeading}>
              {labPreview.heading}
            </Reveal>
            <p className="mt-6 max-w-[40ch] text-ink-dim">{labPreview.body}</p>

            <div
              role="tablist"
              aria-label="Programs"
              aria-orientation="vertical"
              className="mt-10 flex flex-col gap-2"
            >
              {programs.map((program, index) => {
                const selected = program.id === activeId;
                return (
                  <button
                    key={program.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${program.id}`}
                    aria-selected={selected}
                    aria-controls="lab-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(program.id)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={`flex items-center justify-between gap-4 rounded-full px-6 py-4 text-left transition-colors ${
                      selected ? 'bg-gold text-ground' : 'text-ink hover:bg-ground-raised'
                    }`}
                  >
                    <span className="font-semibold">{program.name}</span>
                    <span className={`${monoLabel} ${selected ? 'text-ground' : 'text-ink-dim'}`}>
                      Desktop program
                    </span>
                  </button>
                );
              })}
            </div>

            <Link to="/lab" className={`mt-10 ${secondaryPill}`}>
              {labPreview.linkLabel}
            </Link>
          </div>

          <div
            role="tabpanel"
            id="lab-panel"
            aria-labelledby={`tab-${active.id}`}
            className="rounded-card border border-line bg-ground-raised p-6 sm:p-8 lg:col-span-7 lg:col-start-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-ink">{active.name}</h3>
              {active.placeholder && <PlaceholderTag />}
            </div>
            <dl className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className={`${monoLabel} text-gold`}>{programFields.problem}</dt>
                <dd className="mt-2 text-ink-dim">{programFields.pending}</dd>
              </div>
              <div>
                <dt className={`${monoLabel} text-gold`}>{programFields.result}</dt>
                <dd className="mt-2 text-ink-dim">{programFields.pending}</dd>
              </div>
            </dl>
            <PlaceholderImage
              note={`Screen recording: ${active.name}`}
              surface="bg-ground"
              rounded="rounded-2xl"
              className="mt-8 aspect-video"
            />
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <PipelineMini title={labPreview.pipelineTitle} stages={labPreview.stages} />
        </div>
      </div>
    </section>
  );
}
