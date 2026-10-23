import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import SocialLinks from "./SocialLinks.jsx";
import { studio } from "../../content/company.js";
import { EASE } from "../../lib/useReveal.js";

gsap.registerPlugin(ScrollTrigger);

const TOP_RAMP =
  "linear-gradient(to bottom, transparent, rgb(0 0 0 / .35) calc(var(--fade-top) * .45), #000 var(--fade-top))";
const TOP_FADE = {
  "--fade-top": "clamp(64px, 9vw, 128px)",
  maskImage: TOP_RAMP,
  WebkitMaskImage: TOP_RAMP,
};

const footer = {
  columns: [
    {
      title: "Studio",
      links: [
        { label: "Method", to: "/method" },
        { label: "Case Studies", to: "/case-studies" },
        { label: "Lab", to: "/lab" },
        { label: "Studio", to: "/studio" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Projects", to: "/#projects" },
        { label: "Expertise", to: "/#services" },
        { label: "FAQ", to: "/#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy notice", to: "/legal#privacy" },
        { label: "Terms of service", to: "/legal#terms" },
        { label: "Disclaimer", to: "/legal#disclaimer" },
      ],
    },
  ],
};

const CONTACT = [
  {
    icon: LuMapPin,
    text: studio.city,
    href: studio.mapUrl,
    external: true,
  },
  { icon: LuPhone, text: studio.phone.label, href: studio.phone.href },
  { icon: LuMail, text: studio.email, href: `mailto:${studio.email}` },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  const footerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = footer.querySelectorAll("[data-footer-reveal]");
      gsap.set(items, { opacity: 0, y: 24 });
      ScrollTrigger.batch(items, {
        start: "top bottom-=16px",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: EASE,
            overwrite: true,
            clearProps: "opacity,transform",
          }),
      });

      gsap.fromTo(
        bgRef.current,
        { yPercent: -6 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden bg-ground font-hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={TOP_FADE}
      >
        <div className="absolute inset-0 -scale-x-100">
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
              className="absolute inset-x-0 top-0 h-auto w-full [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] md:h-[112%] md:object-cover md:object-center md:[mask-image:none]"
            />
          </picture>
          <img
            src="/images/why-us-bg-mobile_1.webp"
            alt=""
            width={1280}
            height={1248}
            loading="lazy"
            decoding="async"
            className="absolute inset-x-0 bottom-0 h-auto w-full rotate-180 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] md:hidden"
          />
        </div>

        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-ground)_68%,transparent)] lg:bg-[linear-gradient(to_right,transparent,color-mix(in_srgb,var(--color-ground)_10%,transparent)_30%,color-mix(in_srgb,var(--color-ground)_72%,transparent)_44%)]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 pt-16 pb-11 sm:px-6 lg:pt-22">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div data-footer-reveal className="flex flex-col items-start gap-5">
            <p className="text-[clamp(32px,3vw,40px)] leading-[1.1] tracking-tight text-ink">
              Vision...
              <br />
              Built.
            </p>
            <SocialLinks
              className="-ml-[9px] flex items-center"
              iconClassName="size-[22px]"
              itemClassName="size-10 text-gold"
            />
          </div>

          <div className="flex flex-col gap-12 sm:flex-row sm:gap-16 lg:gap-24">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:flex sm:gap-12 lg:gap-14">
              {footer.columns.map((col) => (
                <nav
                  key={col.title}
                  data-footer-reveal
                  aria-label={col.title}
                  className="flex flex-col"
                >
                  <h2 className="text-lg leading-[1.2] font-medium text-ink">
                    {col.title}
                  </h2>
                  <ul className="mt-6 flex flex-col gap-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          className="text-sm text-ink-dim transition-colors hover:text-gold-bright"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div data-footer-reveal className="flex flex-col">
              <h2 className="text-lg leading-[1.2] font-medium text-ink">
                Let’s talk
              </h2>
              <ul className="mt-6 flex flex-col gap-2">
                {CONTACT.map(({ icon: Icon, ...line }) => (
                  <li key={line.text} className="flex items-center gap-3">
                    <Icon
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <a
                      href={line.href}
                      {...(line.external && {
                        target: "_blank",
                        rel: "noreferrer",
                      })}
                      className="text-base text-ink-dim transition-colors hover:text-gold-bright sm:whitespace-nowrap"
                    >
                      {line.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          data-footer-reveal
          className="mt-14 flex flex-wrap items-center justify-between gap-4 text-sm tracking-[0.04em] text-ink-dim"
        >
          <p>
            © {YEAR} Archi Hub{" "}
            <span aria-hidden="true" className="mx-1">
              ·
            </span>{" "}
            All rights reserved{" "}
            <span aria-hidden="true" className="mx-1 hidden sm:inline">
              ·
            </span>{" "}
            <span className="block sm:inline">
              Crafted by{" "}
              <a
                href="https://aaaportfolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-ink transition-colors hover:text-gold-bright"
              >
                Launchy
              </a>
            </span>
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/careers" className="transition-colors hover:text-ink">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/legal" className="transition-colors hover:text-ink">
                Legal &amp; Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
