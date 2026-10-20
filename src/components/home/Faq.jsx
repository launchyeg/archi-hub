import { useId, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// Questions come from docs/OPEN-ITEMS.md. Answers built from known facts are still marked
// "to confirm" there; the rest are visible placeholders until Archi Hub sends the answers.
const FAQS = [
  {
    q: "How does Archi Hub design a building?",
    a: "Every project moves through five stages: Data Input, AI Analysis, Generative Design, Structural Check and Human Review.",
  },
  {
    q: "Does an engineer review every design?",
    a: "Yes. Human Review is the last of the five stages: an engineer checks every result before it leaves the studio.",
  },
  {
    q: "Can engineers use your software?",
    a: "Yes. Request a download and we will email you a link.",
  },
  { q: "Which operating systems does the software support?", placeholder: true },
  { q: "How much does the software cost?", placeholder: true },
  { q: "Which countries do you work in?", placeholder: true },
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
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.08, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="px-6 pb-6 md:px-8 md:pb-8"
          >
            {item.placeholder ? (
              <p className="max-w-[65ch] text-base leading-relaxed text-ink-dim">
                <span className="mr-2 text-xs tracking-[0.12em] text-gold-bright uppercase">Placeholder</span>
                Answer pending from Archi Hub.
              </p>
            ) : (
              <p className="max-w-[65ch] text-base leading-relaxed text-ink-dim">{item.a}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// FAQ: one answer open at a time. The card grows with motion's layout animation (transform-based),
// the answer fades in, and the cards below glide down. Reduced motion: instant changes.
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="my-24 bg-ground md:my-40" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <div className="flex flex-col items-start gap-4">
          <h2
            id="faq-title"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber" />
            FAQ
          </h2>
          {/* PLACEHOLDER: remove once Archi Hub confirms the answers (docs/OPEN-ITEMS.md). */}
          <p className="text-xs tracking-[0.12em] text-gold-bright uppercase">Answers to confirm</p>
        </div>

        <MotionConfig reducedMotion="user">
          <LayoutGroup>
            <ul className="flex flex-col gap-3">
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
