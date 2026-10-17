import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Word-by-word scroll reveal: each word goes from dim to full ink as the paragraph scrolls in.
export default function WhyUs() {
  const textRef = useRef(null);

  const text =
    "At Archi Hub, a building starts long before the first drawing. We build our own desktop software to help engineers plan and design buildings, and we use it on our own projects.";
  const words = text.split(" ");

  useEffect(() => {
    const el = textRef.current;
    if (!el) return undefined;
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ground py-24 md:py-40" aria-labelledby="why-us">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
        <div>
          <h2
            id="why-us"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--color-ground)_80%,transparent)]"
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
          {words.map((word, i) => (
            <span key={i} data-word>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
