import { useRevealOnce } from '../../lib/useRevealOnce.js';
import { monoLabel } from '../../lib/homeType.js';
import ActorChip from '../ActorChip.jsx';

const NODE = {
  input: 'rounded-full border border-line-strong bg-ground',
  ai: 'rotate-45 border border-signal bg-ground',
  human: 'bg-gold',
};

const LINE = {
  input: 'bg-line-strong',
  ai: 'bg-signal',
  human: 'bg-gold',
};

// Connectors draw in once when the diagram scrolls into view. Nodes and labels are always visible.
export default function PipelineMini({ title, stages }) {
  const ref = useRevealOnce('draw-pending');

  return (
    <figure ref={ref}>
      <figcaption className={`${monoLabel} text-gold`}>{title}</figcaption>
      <ol className="mt-8 grid gap-6 md:grid-cols-5 md:gap-0">
        {stages.map((stage, index) => {
          const next = stages[index + 1];

          return (
            <li
              key={stage.name}
              className="relative grid grid-cols-[24px_1fr] items-center gap-4 md:flex md:flex-col md:items-center md:gap-3 md:text-center"
            >
              {next && (
                <span
                  aria-hidden="true"
                  className={`pipe-connector absolute left-[11px] top-3 h-[calc(100%+24px)] w-px origin-top md:left-1/2 md:top-[11px] md:h-px md:w-full md:origin-left ${LINE[next.actor]}`}
                  style={{ transitionDelay: `${index * 160}ms` }}
                />
              )}
              <span className="relative z-10 flex size-6 items-center justify-center">
                <span aria-hidden="true" className={`size-3 ${NODE[stage.actor]}`} />
              </span>
              <span className="flex flex-wrap items-center gap-2 md:flex-col">
                <span className={`${monoLabel} text-ink`}>{stage.name}</span>
                <ActorChip actor={stage.actor} />
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
