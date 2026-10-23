import { useEffect, useRef } from "react";
import { mountSketchbook } from "./sketchbook/sketchbook.js";
import "./sketchbook/sketchbook.css";
import useReveal from "../../lib/useReveal.js";

const PAGES = [
  {
    src: "/images/sketchbook/archihub-project-00-large.png",
    title: "Case Study 1",
  },
  {
    src: "/images/sketchbook/archihub-project-01-large.png",
    title: "Case Study 2",
  },
  {
    src: "/images/sketchbook/archihub-project-02-large.png",
    title: "Case Study 3",
  },
  {
    src: "/images/sketchbook/archihub-project-03-large.png",
    title: "Case Study 4",
  },
  {
    src: "/images/sketchbook/archihub-project-04-large.png",
    title: "Case Study 5",
  },
];
const LAND = 6;

const iconButton =
  "grid size-9 place-items-center rounded-full text-ink-dim transition-colors enabled:hover:bg-line enabled:hover:text-ink disabled:opacity-30";

export default function CaseStudies() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  useReveal(contentRef);

  useEffect(() => {
    const root = rootRef.current;
    let unmount = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || unmount) return;
        io.disconnect();
        unmount = mountSketchbook(root, { pages: PAGES, land: LAND });
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      unmount?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="sketchbook relative overflow-x-clip bg-ground my-16 md:my-28"
      aria-labelledby="case-studies-title"
    >
      <div ref={contentRef} className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2
          id="case-studies-title"
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber" />
          Case Studies
        </h2>

        <div className="relative select-none [overflow-anchor:none]">
          <div
            className="sb-wrap relative z-[2] grid w-full justify-items-center max-sm:mx-[calc(50%-50vw)] max-sm:w-screen"
            data-sb="wrap"
          >
            <svg
              width="0"
              height="0"
              style={{ position: "absolute" }}
              aria-hidden="true"
            >
              <filter id="sb-mblur-1">
                <feGaussianBlur stdDeviation="5 0" />
              </filter>
              <filter id="sb-mblur-2">
                <feGaussianBlur stdDeviation="14 0" />
              </filter>
            </svg>

            <div
              className="relative flex w-full touch-pan-y items-center justify-center"
              data-sb="stage"
            >
              <div className="sb-3d" data-sb="view">
                <div className="sb-tilt">
                  <div className="sb-cast ambient" aria-hidden="true" />
                  <div className="sb-cast contact" aria-hidden="true" />
                  <div className="sb-book" data-sb="book" />
                </div>
              </div>
            </div>

            <div className="sb-captions" data-sb="captions" />

            <div
              className="relative mt-5 z-10 flex items-center gap-1 rounded-full border border-line bg-ground-raised p-1"
              role="group"
              aria-label="page and zoom controls"
            >
              <button
                type="button"
                className={iconButton}
                data-sb="prev"
                aria-label="previous page"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="12.5,4 6.5,10 12.5,16" />
                </svg>
              </button>
              <span className="mx-1 h-4 w-px bg-line" aria-hidden="true" />
              <button
                type="button"
                className={iconButton}
                data-sb="zoom-out"
                aria-label="zoom out"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="8.6" cy="8.6" r="5.6" />
                  <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8" />
                </svg>
              </button>
              <span
                className="min-w-12 text-center text-xs text-ink-dim tabular-nums"
                data-sb="zoom-read"
              >
                100%
              </span>
              <button
                type="button"
                className={iconButton}
                data-sb="zoom-in"
                aria-label="zoom in"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="8.6" cy="8.6" r="5.6" />
                  <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8" />
                </svg>
              </button>
              <span className="mx-1 h-4 w-px bg-line" aria-hidden="true" />
              <button
                type="button"
                className={iconButton}
                data-sb="next"
                aria-label="next page"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="7.5,4 13.5,10 7.5,16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
