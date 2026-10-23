import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useReveal from "../../lib/useReveal.js";

const INTERVAL_MS = 3000;

const IMAGES = [
  {
    src: "/images/showcase/showcase1.jpeg",
    alt: "Archi Hub project, view 1",
    project: "Project name",
    tool: "AI tool 4",
  },
  {
    src: "/images/showcase/showcase2.jpeg",
    alt: "Archi Hub project, view 2",
    project: "Project name",
    tool: "AI tool 4",
  },
  {
    src: "/images/showcase/showcase3.jpeg",
    alt: "Archi Hub project, view 3",
    project: "Project name",
    tool: "AI tool 4",
  },
  {
    src: "/images/showcase/showcase4.jpeg",
    alt: "Archi Hub project, view 4",
    project: "Project name",
    tool: "AI tool 4",
  },
];

const seam = (direction) =>
  `linear-gradient(${direction}, ${[
    [100, 0],
    [86, 12],
    [68, 25],
    [50, 38],
    [33, 52],
    [19, 66],
    [9, 80],
    [3, 92],
    [0, 100],
  ]
    .map(
      ([alpha, at]) =>
        `color-mix(in srgb, var(--color-ground) ${alpha}%, transparent) ${at}%`,
    )
    .join(", ")})`;

export default function Showcase() {
  const sectionRef = useRef(null);
  useReveal(sectionRef, { selector: "[data-reveal]" });
  const [index, setIndex] = useState(0);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduced || IMAGES.length < 2) return undefined;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const image = IMAGES[index];

  return (
    <section
      ref={sectionRef}
      className="relative h-[60svh] md:h-[70svh] [clip-path:inset(0)]"
      aria-roledescription="carousel"
      aria-label="Project images"
    >
      <div className="fixed inset-0 bg-ground" data-reveal>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/5 max-w-80 bg-linear-to-r from-ground/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/5 max-w-80 bg-linear-to-l from-ground/70 to-transparent"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-0.5 h-28 md:h-44"
        style={{ backgroundImage: seam("to bottom") }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-28 md:h-44"
        style={{ backgroundImage: seam("to top") }}
      />

      <div
        className="pointer-events-none absolute bottom-10 left-4 sm:left-6 md:bottom-14"
        data-reveal
      >
        <motion.div
          key={index}
          className="flex flex-wrap items-center gap-2"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="rounded-full border border-gold/50 bg-ground/70 px-3 py-1.5 text-xs tracking-[0.12em] text-gold-bright">
            {image.project}
          </span>
          <span className="rounded-full border border-signal/40 bg-ground/70 px-3 py-1.5 text-xs tracking-[0.12em] text-signal">
            {image.tool}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
