import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const INTERVAL_MS = 3000;

// Full-screen image band. The image stays fixed while the page scrolls past it,
// and cross-fades to the next one every 3 seconds.
export default function Showcase() {
  // Images live in public/images/. Alt text is generic until the projects are named.
  const images = [1, 2, 3, 4].map((n) => ({
    src: `/images/showcase/showcase${n}.jpeg`,
    alt: `Archi Hub project, view ${n}`,
  }));

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (paused || images.length < 2) return undefined;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, images.length]);

  const image = images[index];

  return (
    <section
      className="relative h-[60svh] min-h-[360px] [clip-path:inset(0)]"
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
      </div>

      {images.length > 1 && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play images" : "Pause images"}
          className="absolute right-4 bottom-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-ink/12 bg-ground/72 text-ink sm:right-6 sm:bottom-6"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="currentColor"
            aria-hidden="true"
          >
            {paused ? (
              <path d="M3 1.5v11l9-5.5z" />
            ) : (
              <path d="M3 1h3v12H3zM8 1h3v12H8z" />
            )}
          </svg>
        </button>
      )}
    </section>
  );
}
