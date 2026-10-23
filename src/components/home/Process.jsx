import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import useReveal from "../../lib/useReveal.js";

const EASE = [0.22, 1, 0.36, 1];
const STEP = 0.15;

const STAGES = [
  {
    name: "Data Input",
    by: "ai",
    text: "Collects data, requirements and project parameters.",
    program: { name: null, image: "/images/programs/stage-1.webp" },
  },
  {
    name: "AI Analysis",
    by: "ai",
    text: "Analyzes constraints and environmental site conditions.",
    program: { name: null, image: "/images/programs/stage-2.webp" },
  },
  {
    name: "Generative Design",
    by: "ai",
    text: "The AI produces several design options to compare.",
    program: { name: null, image: "/images/programs/stage-3.webp" },
  },
  {
    name: "Structural Check",
    by: "ai",
    text: "Runs structural integrity and load analysis checks.",
    program: { name: null, image: "/images/programs/stage-4.webp" },
  },
  {
    name: "Human Review",
    by: "engineer",
    text: "A senior engineer reviews, and approves the final design.",
    program: { name: null, image: "/images/programs/stage-5.webp" },
  },
];

const BADGE =
  "inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink";

function ProgramCard({ program, stageName }) {
  const [missing, setMissing] = useState(false);
  const name = program.name ?? "Archi Hub program";

  return (
    <Link
      to="/lab"
      className="group mt-6 block w-full max-w-xs rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:max-w-none"
    >
      <span className="relative block aspect-16/10 w-full overflow-hidden rounded-xl border border-line bg-ground-raised transition-colors group-hover:border-line-strong">
        {missing ? (
          <span className="absolute inset-0 grid place-items-center px-3 text-center text-xs tracking-[0.12em] text-gold-bright uppercase">
            Screenshot pending
          </span>
        ) : (
          <img
            src={program.image}
            alt={`${name}, the program used in ${stageName}`}
            loading="lazy"
            decoding="async"
            onError={() => setMissing(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        )}
      </span>
      <span className="mt-3 flex items-center justify-between gap-3">
        {program.name ? (
          <span className="text-sm text-ink">{program.name}</span>
        ) : (
          <span className="text-xs tracking-[0.12em] text-gold-bright uppercase">
            Name pending<span className="sr-only">: {name}</span>
          </span>
        )}
        <span className="text-ink-dim transition-colors group-hover:text-ink">
          <span className="sr-only">Open in the Intelligence Lab</span>
          <svg
            viewBox="0 0 20 20"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 14L14 6M7 6h7v7" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

function Stage({ stage, i, last }) {
  const ai = stage.by === "ai";
  return (
    <li className="relative pb-12 pl-9 last:pb-0 lg:pt-10 lg:pr-8 lg:pb-0 lg:pl-0">
      {!last && (
        <motion.span
          aria-hidden="true"
          className={`absolute top-1.75 left-1.25 h-full w-px origin-top-left lg:top-1.25 lg:left-0 lg:h-px lg:w-full ${
            i === STAGES.length - 2
              ? "bg-linear-to-b from-signal/70 to-gold lg:bg-linear-to-r"
              : "bg-signal/50"
          }`}
          variants={{
            hidden: { transform: "scale(0, 0)" },
            show: {
              transform: "scale(1, 1)",
              transition: { duration: 0.5, delay: i * STEP + 0.1, ease: EASE },
            },
          }}
        />
      )}

      <motion.span
        aria-hidden="true"
        className={`absolute top-0.5 left-0 size-2.75 rounded-full lg:top-0 ${
          ai
            ? "border border-signal bg-ground"
            : "bg-gold-bright outline-1 outline-offset-4 outline-gold"
        }`}
        variants={{
          hidden: { opacity: 0, transform: "scale(0.9)" },
          show: {
            opacity: 1,
            transform: "scale(1)",
            transition: { duration: 0.35, delay: i * STEP, ease: EASE },
          },
        }}
      />

      <motion.div
        className="lg:flex lg:h-full lg:flex-col"
        variants={{
          hidden: { opacity: 0, transform: "translateY(8px)" },
          show: {
            opacity: 1,
            transform: "translateY(0px)",
            transition: { duration: 0.5, delay: i * STEP + 0.05, ease: EASE },
          },
        }}
      >
        <p className="flex items-center gap-3 text-xs tracking-[0.12em] uppercase tabular-nums">
          <span className={ai ? "text-signal" : "text-gold-bright"}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 ${
              ai
                ? "border-signal/40 text-signal"
                : "border-gold/60 text-gold-bright"
            }`}
          >
            {ai ? "AI" : "Engineer"}
          </span>
        </p>
        <h3 className="mt-4 font-hero text-lg tracking-tight text-ink">
          {stage.name}
        </h3>
        <p className="mt-2 max-w-[30ch] md:max-w-[40ch] leading-relaxed text-ink-dim lg:flex-1">
          {stage.text}
        </p>
        <ProgramCard program={stage.program} stageName={stage.name} />
      </motion.div>
    </li>
  );
}

export default function Process() {
  const reduced = useReducedMotion();
  const contentRef = useRef(null);
  useReveal(contentRef);

  return (
    <section
      className="bg-ground mb-16 md:mb-28"
      aria-labelledby="process-title"
    >
      <div ref={contentRef} className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2 id="process-title" className={BADGE}>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber" />
          How we work
        </h2>

        <p className="mt-8 font-hero text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-tight text-balance text-ink">
          The AI proposes. <br /> An engineer decides.
        </p>

        <motion.ol
          className="mt-14 grid grid-cols-1 lg:mt-20 lg:grid-cols-5"
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STAGES.map((stage, i) => (
            <Stage
              key={stage.name}
              stage={stage}
              i={i}
              last={i === STAGES.length - 1}
            />
          ))}
        </motion.ol>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-20">
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-base font-medium text-ground transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Start your project
            <svg
              viewBox="0 0 20 20"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 14L14 6M7 6h7v7" />
            </svg>
          </Link>
          <p className="text-base text-ink-dim">
            Share your site parameters and let's structure your vision.
          </p>
        </div>
      </div>
    </section>
  );
}
