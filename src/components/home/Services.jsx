import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { stiffness: 260, damping: 28, mass: 0.6 };

// Hover a service and a fanned stack of its images follows the cursor.
// Touch screens and reduced motion get the images inline under each row instead.
export default function Services() {
  // Service names and lines are to confirm with Archi Hub (docs/OPEN-ITEMS.md: "List of services").
  const services = [
    {
      id: "residential",
      name: "Residential",
      line: "Villas, townhouses and apartment buildings.",
      images: [
        {
          src: "/images/services/residential-1.jpg",
          alt: "Brick townhouses with arched balconies, street view",
        },
        {
          src: "/images/services/residential-2.jpg",
          alt: "Classical apartment facade with ornate balconies",
        },
        {
          src: "/images/services/residential-3.jpg",
          alt: "Residential courtyard with a pool at dusk",
        },
      ],
    },
    {
      id: "hospitality",
      name: "Hospitality",
      line: "Hotels, motels and resort residences.",
      images: [
        {
          src: "/images/services/hospitality-1.jpg",
          alt: "Resort pool courtyard in daylight",
        },
        {
          src: "/images/services/hospitality-2.jpg",
          alt: "Resort pool courtyard at night",
        },
        {
          src: "/images/services/hospitality-3.jpg",
          alt: "Four-storey motel facade at dusk",
        },
      ],
    },
    {
      id: "commercial",
      name: "Commercial",
      line: "Malls, retail streets and restaurant fronts.",
      images: [
        {
          src: "/images/services/commercial-1.jpg",
          alt: "Shopping mall facade with sculpted fins",
        },
        {
          src: "/images/services/commercial-2.jpg",
          alt: "Retail street with arched shopfronts at dusk",
        },
        {
          src: "/images/services/commercial-3.jpg",
          alt: "Restaurant entrance with a shell-shaped canopy at night",
        },
      ],
    },
    {
      id: "interiors",
      name: "Interiors",
      line: "Offices and interior spaces.",
      images: [
        {
          src: "/images/services/interiors-1.jpg",
          alt: "Office interior with marble walls and a lit ceiling",
        },
        {
          src: "/images/services/interiors-2.jpg",
          alt: "Living room with green and wood wall panels",
        },
        {
          src: "/images/services/interiors-3.jpg",
          alt: "Bedroom with two beds and blue panelled walls",
        },
      ],
    },
  ];

  const sectionRef = useRef(null);
  const [active, setActive] = useState(null);
  const [near, setNear] = useState(false);
  const [hoverMode] = useState(
    () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  // Load the preview images only once the section gets close.
  useEffect(() => {
    if (!hoverMode) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [hoverMode]);

  // Jump when the stack first appears so it doesn't fly in from the last spot.
  const moveTo = (px, py) => {
    if (active === null) {
      x.jump(px);
      y.jump(py);
    } else {
      x.set(px);
      y.set(py);
    }
  };

  const rowHandlers = (id) =>
    hoverMode
      ? {
          onPointerEnter: (e) => {
            moveTo(e.clientX, e.clientY);
            setActive(id);
          },
          onFocus: (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            moveTo(r.right - 240, r.top + r.height / 2);
            setActive(id);
          },
          onBlur: () => setActive(null),
        }
      : {};

  return (
    <section
      ref={sectionRef}
      className="bg-ground my-24 md:my-40"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2
          id="services-title"
          className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber" />
          Featured &amp; Creative
        </h2>

        <ol
          className="mt-10 border-b border-line md:mt-16"
          onPointerMove={
            hoverMode ? (e) => moveTo(e.clientX, e.clientY) : undefined
          }
          onPointerLeave={hoverMode ? () => setActive(null) : undefined}
        >
          {services.map((s, i) => (
            <li key={s.id} className="border-t border-line">
              <Link
                to="/case-studies"
                className="grid grid-cols-[40px_1fr] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[64px_1fr_auto] md:gap-x-8 md:py-8"
                {...rowHandlers(s.id)}
              >
                <span className="font-mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <motion.span
                  className="font-hero text-[clamp(36px,6vw,72px)] leading-none font-normal tracking-tight text-ink"
                  animate={{
                    opacity: active !== null && active !== s.id ? 0.55 : 1,
                    x: active === s.id ? 12 : 0,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {s.name}
                </motion.span>
                <span className="col-start-2 text-sm text-ink-dim md:col-start-auto md:max-w-[28ch] md:text-right">
                  {s.line}
                </span>
              </Link>

              {!hoverMode && (
                <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6">
                  {s.images.map((img) => (
                    <li
                      key={img.src}
                      className="aspect-video w-60 shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] bg-ground-raised sm:w-72"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>

      {hoverMode && near && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-40"
          style={{ x, y }}
        >
          {services.map((s) => (
            <motion.div
              key={s.id}
              className="absolute top-[-90px] left-[-160px] h-[180px] w-[320px]"
              initial={false}
              animate={active === s.id ? "show" : "hide"}
              variants={{
                show: { transition: { staggerChildren: 0.05 } },
                hide: {},
              }}
            >
              {s.images.map((img, i) => {
                const offset = i - (s.images.length - 1) / 2;
                return (
                  <motion.img
                    key={img.src}
                    src={img.src}
                    alt=""
                    decoding="async"
                    className="absolute inset-0 h-full w-full rounded-[var(--radius-card)] border border-ink/12 object-cover"
                    style={{
                      zIndex: Math.round(
                        s.images.length - Math.abs(offset) * 2,
                      ),
                    }}
                    variants={{
                      hide: {
                        opacity: 0,
                        scale: 0.85,
                        x: 0,
                        rotate: 0,
                        transition: { duration: 0.2, ease: EASE },
                      },
                      show: {
                        opacity: 1,
                        scale: 1,
                        x: offset * 64,
                        rotate: offset * 7,
                        transition: { duration: 0.45, ease: EASE },
                      },
                    }}
                  />
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
