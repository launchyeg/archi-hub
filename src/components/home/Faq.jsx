import { useId, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";
import useReveal from "../../lib/useReveal.js";
import ContourBackdrop from "../layout/ContourBackdrop.jsx";

const EASE = [0.22, 1, 0.36, 1];

const FAQS = [
  {
    q: "How does Archi Hub integrate AI into building design?",
    a: "Through an integrated 5-step process: Data Input, AI Analysis, Generative Design, Structural Check, and final Human Engineering Review.",
  },
  {
    q: "Is there human oversight on AI-generated designs?",
    a: "Yes, absolutely. AI produces and checks options, but a qualified structural engineer reviews and approves every single design before delivery.",
  },
  {
    q: "Can external engineering firms use Archi Hub software?",
    a: "Yes. We develop in-house desktop tools for our own projects and offer specialized programs through our Intelligence Lab for engineering teams.",
  },
  {
    q: "What platform requirements are needed for your software?",
    a: "Our proprietary tools are desktop-native software designed primarily for Windows, with macOS support depending on the module.",
  },
  {
    q: "How is pricing structured for projects and software?",
    a: "Pricing depends on the software module and project requirements. Contact our team or submit a request to get a customized proposal.",
  },
  {
    q: "What is your geographic coverage for project development?",
    a: "We deliver projects globally, with active developments across Egypt, Europe, and the MENA region.",
  },
];

function FaqItem({ item, open, onToggle }) {
  const id = useId();
  return (
    <motion.li
      layout
      transition={{ duration: 0.35, ease: EASE }}
      style={{ borderRadius: 24 }}
      className={`border bg-ground-raised transition-colors ${open ? "border-line-strong" : "border-line"}`}
    >
      <motion.h3 layout="position" className="text-lg">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 rounded-[24px] px-6 py-5 text-left font-hero tracking-tight text-ink md:px-8 md:py-6"
        >
          {item.q}
          <motion.svg
            viewBox="0 0 20 20"
            className="size-5 shrink-0 text-gold-bright"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <path d="M10 3.5v13M3.5 10h13" />
          </motion.svg>
        </button>
      </motion.h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ opacity: 0, y: -4 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, delay: 0.08, ease: EASE },
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="px-6 pb-6 md:px-8 md:pb-8"
          >
            <p className="max-w-[65ch] text-base leading-relaxed text-ink-dim">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Faq() {
  const contentRef = useRef(null);
  useReveal(contentRef);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative isolate overflow-x-clip bg-ground mb-16 md:mb-28"
      aria-labelledby="faq-title"
    >
      <ContourBackdrop
        orientation="-scale-y-100"
        imageClassName="-bottom-16 h-[1400px] object-center"
        scrimClassName="bg-[color-mix(in_srgb,var(--color-ground)_35%,transparent)] md:bg-[radial-gradient(ellipse_45%_60%_at_50%_45%,color-mix(in_srgb,var(--color-ground)_70%,transparent),color-mix(in_srgb,var(--color-ground)_20%,transparent))]"
      />
      <div
        ref={contentRef}
        className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 px-4 sm:px-6 md:gap-16"
      >
        <div className="flex flex-col items-center text-center gap-8">
          <h2
            id="faq-title"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-amber"
            />
            FAQ
          </h2>
          <p className="font-hero leading-[1.1] tracking-tight text-balance text-ink text-[clamp(32px,3.6vw,48px)] max-w-2xl">
            Clear answers to common questions
          </p>
        </div>

        <MotionConfig reducedMotion="user">
          <LayoutGroup>
            <ul className="flex w-full max-w-3xl flex-col gap-4">
              {FAQS.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
                />
              ))}
            </ul>
          </LayoutGroup>
        </MotionConfig>
      </div>
    </section>
  );
}
