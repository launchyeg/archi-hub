import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const HASH_OFFSET = -112;

export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const { hash, key } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    let timer = null;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!hash) return undefined;
    const scrollToHash = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { offset: HASH_OFFSET });
      } else {
        window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY + HASH_OFFSET);
      }
    };
    const raf = requestAnimationFrame(scrollToHash);
    const settle = setTimeout(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target && Math.abs(target.getBoundingClientRect().top - -HASH_OFFSET) > 8) scrollToHash();
    }, 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [hash, key]);

  return null;
}
