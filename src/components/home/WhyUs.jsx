import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReveal from "../../lib/useReveal.js";

gsap.registerPlugin(ScrollTrigger);

const EDGE_RAMP =
  "linear-gradient(to bottom, transparent, rgb(0 0 0 / .18) calc(var(--fade-top) * .35), rgb(0 0 0 / .62) calc(var(--fade-top) * .7), #000 var(--fade-top), #000 calc(100% - var(--fade-bottom)), rgb(0 0 0 / .62) calc(100% - var(--fade-bottom) * .7), rgb(0 0 0 / .18) calc(100% - var(--fade-bottom) * .35), transparent)";
const EDGE_FADE = {
  "--fade-top": "clamp(72px, 11vw, 144px)",
  "--fade-bottom": "clamp(56px, 8vw, 112px)",
  maskImage: EDGE_RAMP,
  WebkitMaskImage: EDGE_RAMP,
};

const TEXT =
  "At Archi Hub, we build our own AI-powered desktop software to plan and design structures. We test and validate these tools on our own real-world projects, ensuring every output is backed by human engineering expertise.";
const WORDS = TEXT.split(" ");

export default function WhyUs() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);
  useReveal(contentRef);

  useEffect(() => {
    const section = sectionRef.current;
    const el = textRef.current;
    if (!section || !el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-us"
      className="relative isolate overflow-hidden bg-ground mb-16 md:mb-28 py-20 md:py-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={EDGE_FADE}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/images/why-us-bg-mobile_1.webp"
          />
          <img
            ref={bgRef}
            src="/images/why-us-bg_1.webp"
            alt=""
            width={3840}
            height={1461}
            loading="lazy"
            decoding="async"
            className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-center"
          />
        </picture>

        <div className="absolute inset-0 bg-[radial-gradient(90%_55%_at_50%_62%,color-mix(in_srgb,var(--color-ground)_55%,transparent),transparent)] md:bg-[radial-gradient(55%_70%_at_74%_50%,color-mix(in_srgb,var(--color-ground)_50%,transparent),transparent)]" />
      </div>

      <div
        ref={contentRef}
        className="relative mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-16"
      >
        <div>
          <h2
            id="why-us"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--color-ground)_80%,transparent)] backdrop-blur-sm"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-amber"
            />
            Why us?
          </h2>
        </div>

        <p
          ref={textRef}
          className="max-w-[60ch] font-hero text-lg leading-relaxed text-ink"
        >
          {WORDS.map((word, i) => (
            <span key={i} data-word>
              {word}
              {i < WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
