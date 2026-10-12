import { pipeline } from '../content/home.js';
import ActorChip from './ActorChip.jsx';
import BlueprintGrid from './BlueprintGrid.jsx';
import CornerTicks from './CornerTicks.jsx';
import MarkDrawIn from './MarkDrawIn.jsx';

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

// Timeline (ms): the mark draws in first, then the spine and stages follow top to bottom.
const STAGES_START = 760;
const STAGE_STEP = 180;

function Node({ actor }) {
  return (
    <span className="relative z-10 flex h-6 items-center justify-center">
      <span aria-hidden="true" className={`size-2.5 ${NODE[actor]}`} />
    </span>
  );
}

function Connector({ actor, delay }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-2 left-[11px] top-[18px] w-px origin-top motion-safe:animate-draw-y ${LINE[actor]}`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export default function PipelineDiagram() {
  const { stages } = pipeline;
  const endDelay = STAGES_START + stages.length * STAGE_STEP;

  return (
    <figure className="relative overflow-hidden border border-line p-6 sm:p-8">
      <BlueprintGrid />
      <CornerTicks className="border-gold" />

      <div className="relative">
        <div className="flex items-center gap-4">
          <MarkDrawIn className="w-14" />
          <span
            className="font-mono text-xs uppercase tracking-[0.12em] text-gold motion-safe:animate-rise"
            style={{ animationDelay: '600ms' }}
          >
            {pipeline.start}
          </span>
        </div>

        <ol className="mt-8">
          {stages.map((stage, index) => {
            const delay = STAGES_START + index * STAGE_STEP;
            const next = stages[index + 1];

            return (
              <li
                key={stage.name}
                className="relative grid grid-cols-[24px_1fr] gap-x-4 pb-6 motion-safe:animate-rise"
                style={{ animationDelay: `${delay}ms` }}
              >
                <Connector actor={next ? next.actor : 'human'} delay={delay + 120} />
                <Node actor={stage.actor} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs tabular-nums text-ink-dim">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-ink">{stage.name}</span>
                    <ActorChip actor={stage.actor} />
                  </div>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-ink-dim">
                    {stage.detail}
                  </p>
                </div>
              </li>
            );
          })}

          <li
            className="grid grid-cols-[24px_1fr] gap-x-4 motion-safe:animate-rise"
            style={{ animationDelay: `${endDelay}ms` }}
          >
            <span className="flex h-6 items-center justify-center">
              <span aria-hidden="true" className="size-2.5 border border-gold bg-ground" />
            </span>
            <span className="flex h-6 items-center font-mono text-xs uppercase tracking-[0.12em] text-gold">
              {pipeline.end}
            </span>
          </li>
        </ol>
      </div>

      <figcaption className="sr-only">
        The Archi Hub process, from vision to built: {stages.map((stage) => stage.name).join(', ')}.
        The AI handles analysis, generative design and the structural check. An engineer makes the
        final decision.
      </figcaption>
    </figure>
  );
}
