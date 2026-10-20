import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const INTERVAL_MS = 3000;

// Navy fade for the section edges, eased (many small steps) so it reads as a soft shadow, not a band.
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

// Full-screen image band. The image stays fixed while the page scrolls past it,
// and cross-fades to the next one every 3 seconds.
export default function Showcase() {
  // Images live in public/images/. Alt text is generic until the projects are named.
  const images = [1, 2, 3, 4].map((n) => ({
    src: `/images/showcase/showcase${n}.jpeg`,
    alt: `Archi Hub project, view ${n}`,
  }));

  const [index, setIndex] = useState(0);
  // With reduced motion the first image simply stays; nothing rotates.
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduced || images.length < 2) return undefined;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, images.length]);

  const image = images[index];

  return (
    <section
      className="relative h-[60svh] md:h-[70svh] [clip-path:inset(0)]"
      aria-roledescription="carousel"
      aria-label="Project images"
    >
      {/* Fixed layer, clipped to the section: the image holds still while the section scrolls. */}
      <div className="fixed inset-0 bg-ground">
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
        {/* Navy scrim like the hero's, but from the sides and kept light so the images stay clear. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/5 max-w-80 bg-linear-to-r from-ground/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/5 max-w-80 bg-linear-to-l from-ground/70 to-transparent"
        />
      </div>

      {/* Seams: the image rises out of the navy at the top and sinks back into it at the bottom,
          the same fade on both edges. Pinned to the section (not the fixed image); each reaches
          2px past the edge so no sub-pixel row of the photo shows. */}
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
    </section>
  );
}
