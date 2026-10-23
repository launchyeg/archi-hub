import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReveal from "../../lib/useReveal.js";
import clampFan from "../../lib/clampFan.js";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    quote:
      "Placeholder: an approved quote from a residential client goes here, in their own words, about their project and working with Archi Hub.",
    name: "Client name",
    role: "Residential client",
    initials: "C1",
    images: [
      {
        src: "/images/services/residential-1.jpg",
        alt: "Brick townhouses with arched balconies",
      },
      {
        src: "/images/services/residential-3.jpg",
        alt: "Residential courtyard with a pool at dusk",
      },
    ],
  },
  {
    quote:
      "Placeholder: an approved quote from a hospitality client goes here, in their own words, about their project and working with Archi Hub.",
    name: "Client name",
    role: "Hospitality client",
    initials: "C2",
    images: [
      {
        src: "/images/services/hospitality-1.jpg",
        alt: "Resort pool courtyard in daylight",
      },
      {
        src: "/images/services/hospitality-2.jpg",
        alt: "Resort pool courtyard at night",
      },
    ],
  },
  {
    quote:
      "Placeholder: an approved quote from a commercial client goes here, in their own words, about their project and working with Archi Hub.",
    name: "Client name",
    role: "Commercial client",
    initials: "C3",
    images: [
      {
        src: "/images/services/commercial-1.jpg",
        alt: "Shopping mall facade with sculpted fins",
      },
    ],
  },
  {
    quote:
      "Placeholder: an approved quote from an interiors client goes here, in their own words, about their project and working with Archi Hub.",
    name: "Client name",
    role: "Interiors client",
    initials: "C4",
    images: [
      {
        src: "/images/services/interiors-1.jpg",
        alt: "Office interior with marble walls",
      },
      {
        src: "/images/services/interiors-2.jpg",
        alt: "Living room with green and wood panels",
      },
      {
        src: "/images/services/interiors-3.jpg",
        alt: "Bedroom with blue panelled walls",
      },
    ],
  },
  {
    quote:
      "Placeholder: an approved quote from a residential client goes here, in their own words, about their project and working with Archi Hub.",
    name: "Client name",
    role: "Residential client",
    initials: "C5",
    images: [
      {
        src: "/images/services/residential-2.jpg",
        alt: "Classical apartment facade",
      },
    ],
  },
  {
    quote:
      "Placeholder: an approved quote from a commercial client goes here, in their own words, about their project and working with Archi Hub.",
    name: "Client name",
    role: "Commercial client",
    initials: "C6",
    images: [],
  },
];

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { stiffness: 260, damping: 28, mass: 0.6 };

function QuoteCard({ q }) {
  return (
    <figure className="flex h-full w-[300px] flex-col rounded-[var(--radius-card)] border border-line bg-ground-raised p-6 sm:w-[340px] md:p-8">
      <svg
        viewBox="0 0 32 24"
        className="h-6 w-8 text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path
          d="M13 3C7.5 4.5 4 8.5 4 14v7h8v-8H7.5c.3-3.6 2.4-6 5.9-7.2zM28 3c-5.5 1.5-9 5.5-9 11v7h8v-8h-4.5c.3-3.6 2.4-6 5.9-7.2z"
          strokeLinejoin="round"
        />
      </svg>
      <blockquote className="mt-6 flex-1 text-base leading-relaxed text-ink">
        {q.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-6">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-ground text-xs text-gold"
        >
          {q.initials}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-sm text-ink">{q.name}</span>
          <span className="text-xs text-ink-dim">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ quotes, reverse, hoverHandlers }) {
  return (
    <div className="marquee-mask overflow-hidden">
      <ul
        className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}
      >
        {[0, 1].map((copy) =>
          quotes.map((q, i) => (
            <li
              key={`${copy}-${i}`}
              className="shrink-0 pr-4"
              aria-hidden={copy === 1 ? "true" : undefined}
              {...hoverHandlers?.(q)}
            >
              <QuoteCard q={q} />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef = useRef(null);
  useReveal(headingRef);
  const [active, setActive] = useState(null);
  const [near, setNear] = useState(false);
  const [hoverMode] = useState(
    () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
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

  useEffect(() => {
    const rows = rowsRef.current?.querySelectorAll(".marquee-mask");
    if (!rows?.length) return undefined;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ paused: true });
      rows.forEach((row, i) => {
        tl.from(row, { xPercent: i % 2 === 0 ? 100 : -100, ease: "none" }, 0);
      });

      let reached = 0;
      const advance = (self) => {
        if (self.progress <= reached) return;
        reached = self.progress;
        gsap.to(tl, { progress: reached, duration: 0.6, overwrite: true });
        if (reached === 1) self.kill();
      };
      const trigger = ScrollTrigger.create({
        trigger: rowsRef.current,
        start: "top bottom",
        end: "top 45%",
        onUpdate: advance,
      });
      advance(trigger);
    });

    return () => mm.revert();
  }, []);

  const place = (cx, cy, jump) => {
    const [px, py] = clampFan(cx, cy);
    if (jump) {
      x.jump(px);
      y.jump(py);
    } else {
      x.set(px);
      y.set(py);
    }
  };

  const hoverHandlers = hoverMode
    ? (q) => ({
        onPointerEnter: (e) => {
          if (!q.images?.length) return;
          place(e.clientX, e.clientY, active === null);
          setActive(QUOTES.indexOf(q));
        },
        onPointerMove: (e) => place(e.clientX, e.clientY),
        onPointerLeave: () => setActive(null),
      })
    : undefined;

  return (
    <section
      ref={sectionRef}
      className="bg-ground my-16 overflow-x-clip md:mb-28"
      aria-labelledby="client-voices-title"
    >
      <div ref={headingRef} className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2
          id="client-voices-title"
          className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber" />
          Client voices
        </h2>
      </div>

      <div
        ref={rowsRef}
        tabIndex={0}
        role="group"
        aria-label="Client quotes. Focus or tap to pause."
        className="marquee-group mt-10 flex flex-col gap-4 rounded-[var(--radius-card)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:mt-16"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") return;
          const el = e.currentTarget;
          e.preventDefault();
          if (document.activeElement === el) el.blur();
          else el.focus({ preventScroll: true });
        }}
      >
        <MarqueeRow quotes={QUOTES} hoverHandlers={hoverHandlers} />
        <MarqueeRow
          quotes={[...QUOTES].reverse()}
          reverse
          hoverHandlers={hoverHandlers}
        />
      </div>

      {hoverMode && near && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-40"
          style={{ x, y }}
        >
          {QUOTES.map((q, qi) =>
            q.images?.length ? (
              <motion.div
                key={qi}
                className="absolute top-[-90px] left-[-160px] h-[180px] w-[320px]"
                initial={false}
                animate={active === qi ? "show" : "hide"}
                variants={{
                  show: { transition: { staggerChildren: 0.05 } },
                  hide: {},
                }}
              >
                {q.images.map((im, i) => {
                  const offset = i - (q.images.length - 1) / 2;
                  return (
                    <motion.img
                      key={im.src}
                      src={im.src}
                      alt=""
                      decoding="async"
                      className="absolute inset-0 h-full w-full rounded-[var(--radius-card)] border border-ink/12 object-cover"
                      style={{
                        zIndex: Math.round(
                          q.images.length - Math.abs(offset) * 2,
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
            ) : null,
          )}
        </motion.div>
      )}
    </section>
  );
}
