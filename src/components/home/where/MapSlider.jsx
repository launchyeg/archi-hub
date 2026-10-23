import { useState } from "react";
import { motion } from "motion/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const EASE = [0.22, 1, 0.36, 1];

function Chevron({ dir }) {
  const Component = dir < 0 ? LuChevronLeft : LuChevronRight;
  return <Component className="size-4" aria-hidden="true" />;
}

export default function MapSlider({ items, getKey, renderItem, label = "items" }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  if (!total) return null;

  const item = items[current];
  const go = (d) => setCurrent((c) => (c + d + total) % total);
  const button =
    "grid size-9 place-items-center rounded-full border border-line bg-ground-raised text-ink-dim transition-colors hover:text-ink";

  return (
    <div>
      <motion.div
        key={`${getKey(item)}-${current}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {renderItem(item)}
      </motion.div>

      {total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
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
