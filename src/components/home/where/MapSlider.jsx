import { useState } from "react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points={dir < 0 ? "12.5,4 6.5,10 12.5,16" : "7.5,4 13.5,10 7.5,16"} />
    </svg>
  );
}

// Generic slider: `perView` items at a time (1, or 3 from md up), wrapping around. With fewer items
// than perView nothing repeats. Each step fades the cards in; reduced motion makes it instant.
export default function MapSlider({ items, getKey, renderItem, perView = 1, label = "items" }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  if (!total) return null;

  const visible = Array.from({ length: Math.min(perView, total) }, (_, i) => items[(current + i) % total]);
  const go = (d) => setCurrent((c) => (c + d + total) % total);
  const button =
    "grid size-9 place-items-center rounded-full border border-line bg-ground-raised text-ink-dim transition-colors hover:text-ink";

  return (
    <div>
      <div className={`grid grid-cols-1 gap-6 ${perView === 3 ? "md:grid-cols-3" : ""}`}>
        {visible.map((item, i) => (
          <motion.div
            key={`${getKey(item)}-${current}`}
            className={i > 0 ? "hidden md:block" : ""}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
          >
            {renderItem(item)}
          </motion.div>
        ))}
      </div>

      {total > 1 && (
        <div className={`mt-6 flex items-center justify-center gap-3 ${perView > 1 && total <= perView ? "md:hidden" : ""}`}>
          <button type="button" className={button} onClick={() => go(-1)} aria-label={`Previous ${label}`}>
            <Chevron dir={-1} />
          </button>
          <span className="min-w-14 text-center text-xs text-ink-dim tabular-nums">
            {current + 1} / {total}
          </span>
          <button type="button" className={button} onClick={() => go(1)} aria-label={`Next ${label}`}>
            <Chevron dir={1} />
          </button>
        </div>
      )}
    </div>
  );
}
