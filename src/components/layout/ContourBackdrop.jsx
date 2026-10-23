import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EDGE_RAMP =
  "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)";
const EDGE_FADE = { maskImage: EDGE_RAMP, WebkitMaskImage: EDGE_RAMP };

const COPY_FADE =
  "[mask-image:linear-gradient(to_bottom,#000_55%,transparent)]";

export default function ContourBackdrop({
  orientation = "",
  imageClassName = "top-[-5%] h-[110%] object-center",
  mobileMirror = false,
  scrimClassName,
}) {
  const bgRef = useRef(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return undefined;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          el,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -inset-y-24 -z-10"
      style={EDGE_FADE}
    >
      <div className={`absolute inset-0 hidden md:block ${orientation}`}>
        <img
          ref={bgRef}
          src="/images/why-us-bg_1.webp"
          alt=""
          width={3840}
          height={1461}
          loading="lazy"
          decoding="async"
          className={`absolute inset-x-0 w-full object-cover ${imageClassName}`}
        />
      </div>

      <div
        className={`absolute inset-0 md:hidden ${mobileMirror ? "-scale-x-100" : ""}`}
      >
        <img
          src="/images/why-us-bg-mobile_1.webp"
          alt=""
          width={1280}
          height={1248}
          loading="lazy"
          decoding="async"
          className={`absolute inset-x-0 top-0 h-auto w-full ${COPY_FADE}`}
        />
        <img
          src="/images/why-us-bg-mobile_1.webp"
          alt=""
          width={1280}
          height={1248}
          loading="lazy"
          decoding="async"
          className={`absolute inset-x-0 bottom-0 h-auto w-full rotate-180 ${COPY_FADE}`}
        />
      </div>

      <div className={`absolute inset-0 ${scrimClassName}`} />
    </div>
  );
}
