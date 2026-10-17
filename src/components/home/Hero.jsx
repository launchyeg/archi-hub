import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// TEMPORARY video (see docs/HERO.md). Swap the paths when the Archi Hub video is ready.
const VIDEO_DESKTOP = "/hero.mp4";
const VIDEO_MOBILE = "/hero.mp4"; // TODO: /video/hero-scrub-mobile.mp4

const LERP = 0.12;
const READY_TIMEOUT_MS = 4000;

// Scroll video: GSAP owns the scrubbing, motion owns the text reveal.
export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [src] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches
      ? VIDEO_MOBILE
      : VIDEO_DESKTOP,
  );

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return undefined;

    let cleanup = () => {};
    let started = false;

    const start = () => {
      if (started || !video.duration) return;
      started = true;
      setVideoReady(true);

      // Reduced motion: no scrub, show the end frame.
      if (reduced) {
        video.currentTime = video.duration;
        return;
      }

      const state = { target: 0, current: 0 };
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            state.target = self.progress * video.duration;
          },
        });
        const lerp = () => {
          state.current += (state.target - state.current) * LERP;
          if (Math.abs(state.target - state.current) < 0.001)
            state.current = state.target;
          if (Math.abs(video.currentTime - state.current) > 0.01) {
            video.currentTime = state.current;
          }
        };
        gsap.ticker.add(lerp);
        return () => gsap.ticker.remove(lerp);
      }, section);
      cleanup = () => ctx.revert();
    };

    // Mobile browsers (iOS Safari, Low Power Mode, data saver) skip preload and
    // never decode a frame until the video has played once. Prime it with a muted
    // play/pause, and listen to several events instead of loadedmetadata alone.
    const prime = () => {
      const p = video.play();
      if (p && p.then) p.then(() => video.pause()).catch(() => {});
      else video.pause();
    };
    const events = ["loadedmetadata", "loadeddata", "canplay"];
    events.forEach((e) => video.addEventListener(e, start));
    window.addEventListener("touchstart", prime, { once: true, passive: true });
    video.load();
    prime();
    if (video.readyState >= 1) start();

    // If the video is not ready after 4s, the ground stays visible.
    const timeout = window.setTimeout(() => {
      if (!started) setVideoReady(false);
    }, READY_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeout);
      events.forEach((e) => video.removeEventListener(e, start));
      window.removeEventListener("touchstart", prime);
      cleanup();
    };
  }, [src, reduced]);

  const reveal = (i) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, filter: "blur(8px)", y: 8 },
          animate: { opacity: 1, filter: "blur(0px)", y: 0 },
          transition: {
            duration: 0.64,
            delay: i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          },
        };

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]"
      aria-label="Archi Hub"
    >
      <div className="sticky top-0 h-svh min-h-[560px] w-full overflow-hidden bg-ground">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ground via-ground/50 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1280px] flex-col gap-8 px-4 pb-12 sm:px-6 md:flex-row md:items-end md:justify-between md:pb-16">
          <div className="flex flex-col items-start gap-6">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm text-ink backdrop-blur-xs"
              {...reveal(0)}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-amber"
              />
              AI architectural &amp; structural intelligence
            </motion.p>
            <h1 className="font-hero text-[clamp(32px,6vw,68px)] leading-[1.05] font-normal tracking-tight text-ink">
              <motion.span className="block" {...reveal(1)}>
                Your perfect place, just a click away
              </motion.span>
            </h1>
            <motion.div className="flex flex-wrap gap-3" {...reveal(3)}>
              <Link
                to="/method"
                className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ground"
              >
                See the method
              </Link>
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-ground/60 px-5 py-2.5 text-sm font-medium text-ink supports-[backdrop-filter]:backdrop-blur-[16px]"
              >
                Contact us
              </Link>
            </motion.div>
          </div>
          <motion.p
            className="max-w-[32ch] text-base text-ink md:text-lg md:text-ink-dim"
            {...reveal(4)}
          >
            From first sketch to structural check, our software plans and
            designs buildings, and an engineer reviews every result.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
