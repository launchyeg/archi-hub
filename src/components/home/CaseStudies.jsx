import { useEffect, useRef } from "react";
import { mountSketchbook } from "./sketchbook/sketchbook.js";
import "./sketchbook/sketchbook.css";

// Case Studies: a sketchbook you page through, ported from ThreeUI's "Meng To Sketchbook"
// (MIT, see sketchbook/LICENSE-threeui.txt). Layout and controls are here; the page-turn
// logic is sketchbook/sketchbook.js and the book's own styles are sketchbook/sketchbook.css.
// Each page is ONE 1760x1240 transparent PNG of the whole open sketchbook (both pages), in
// public/sketchbook/. The page turn is calibrated to that exact book position, so new
// images must keep it.
const PAGES = [
  {
    src: "/images/sketchbook/archihub-project-00-large.png",
    title: "Case Study 1",
    place: "Bayfront",
  },
  {
    src: "/images/sketchbook/archihub-project-01-large.png",
    title: "Case Study 2",
    place: "Bayfront",
  },
  {
    src: "/images/sketchbook/archihub-project-02-large.png",
    title: "Case Study 3",
    place: "Bayfront",
  },
  {
    src: "/images/sketchbook/archihub-project-03-large.png",
    title: "Case Study 4",
    place: "Bayfront",
  },
  {
    src: "/images/sketchbook/archihub-project-04-large.png",
    title: "Case Study 5",
    place: "Bayfront",
  },
];
// The page the opening riffle lands on, and where phones open. From 0 to PAGES.length - 1.
const LAND = 6;

const iconButton =
  "grid size-9 place-items-center rounded-full text-ink-dim transition-colors enabled:hover:bg-line enabled:hover:text-ink disabled:opacity-30 aria-pressed:bg-line aria-pressed:text-gold-bright";

export default function CaseStudies() {
  const rootRef = useRef(null);

  // Start the sketchbook only when the section gets close, so its images don't load with the rest of Home.
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
      className="sketchbook relative overflow-x-clip bg-ground"
      aria-labelledby="case-studies-title"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            id="case-studies-title"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-amber"
            />
            Case Studies
          </h2>
          <p className="font-mono text-xs tracking-[0.12em] text-gold-bright uppercase">
            Placeholder · sample pages
          </p>
        </div>

        <div
          className="relative select-none [overflow-anchor:none]"
          data-sb="hero"
        >
          <div
            className="sb-wrap relative z-[2] grid w-full justify-items-center gap-6 max-sm:mx-[calc(50%-50vw)] max-sm:w-screen"
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
              className="relative z-10 flex items-center gap-1 rounded-full border border-line bg-ground-raised p-1"
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
                className="min-w-12 text-center font-mono text-xs text-ink-dim tabular-nums"
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

        {/* <ol
          className="mt-16 border-b border-line md:mt-24"
          aria-label="Case study index"
        >
          {PAGES.map((p, i) => (
            <li key={p.src} className="border-t border-line">
              <button
                type="button"
                className="group grid w-full grid-cols-[40px_1fr] items-baseline gap-x-4 gap-y-1 py-5 text-left md:grid-cols-[64px_1fr_auto] md:gap-x-8 md:py-6"
                data-sb-plate={i}
              >
                <span className="font-mono text-xs text-gold tabular-nums group-aria-[current=true]:text-gold-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-hero text-lg tracking-tight text-ink transition-[color,translate] duration-300 ease-[var(--ease-out-standard)] group-hover:translate-x-2 group-aria-[current=true]:text-gold-bright">
                  {p.title}
                </span>
                <span className="col-start-2 font-mono text-xs tracking-[0.12em] text-ink-dim uppercase group-aria-[current=true]:text-gold md:col-start-auto md:text-right">
                  {p.place}
                </span>
              </button>
            </li>
          ))}
        </ol> */}
      </div>
    </section>
  );
}
