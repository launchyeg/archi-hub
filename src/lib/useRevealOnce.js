import { useEffect, useRef } from 'react';

// Adds `pendingClass` to an element that starts below the fold, then removes it once the
// element scrolls into view, so CSS can play a one-time reveal. Elements already on screen,
// reduced motion and missing IntersectionObserver all leave the element in its final state.
export function useRevealOnce(pendingClass) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (element.getBoundingClientRect().top < window.innerHeight) return undefined;

    element.classList.add(pendingClass);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.remove(pendingClass);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.classList.remove(pendingClass);
    };
  }, [pendingClass]);

  return ref;
}
