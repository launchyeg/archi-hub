import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

export const EASE = CustomEase.create("archi-out", "0.22,1,0.36,1");

export default function useReveal(ref, { selector } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = selector ? el.querySelectorAll(selector) : el.children;
      for (const target of targets) {
        gsap.from(target, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger:
              getComputedStyle(target).position === "fixed" ? el : target,
            start: "top 80%",
            once: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, [ref, selector]);
}
