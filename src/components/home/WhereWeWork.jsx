import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  LuBuilding2,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuGlobe,
  LuLayers,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import MapSlider from "./where/MapSlider.jsx";
import PinMap from "./where/PinMap.jsx";
import SocialLinks from "../layout/SocialLinks.jsx";
import { places, projects, studio } from "../../content/company.js";
import useReveal from "../../lib/useReveal.js";

const EASE = [0.22, 1, 0.36, 1];

function LogoMark({ className }) {
  return (
    <img
      src="/archihub-mark.png"
      alt="archihub logo"
      className={`${className} object-contain`}
    />
  );
}

const ICONS = {
  pin: LuMapPin,
  logo: LogoMark,
  city: LuBuilding2,
  globe: LuGlobe,
  check: LuCircleCheck,
  layers: LuLayers,
  phone: LuPhone,
  mail: LuMail,
};

const STUDIO_CONTACT = [
  {
    icon: "pin",
    label: "Address",
    value: studio.address,
    href: studio.mapUrl,
    external: true,
  },
  {
    icon: "phone",
    label: "Phone",
    value: studio.phone.label,
    href: studio.phone.href,
  },
  {
    icon: "mail",
    label: "Email",
    value: studio.email,
    href: `mailto:${studio.email}`,
  },
];

function Icon({ name, className = "size-5" }) {
  const Component = ICONS[name];
  return <Component className={className} aria-hidden="true" />;
}

const POINTS = [
  { icon: "logo", title: "Studio", note: "Studio Location" },
  {
    icon: "city",
    title: "Project locations",
    note: "Project Footprint",
  },
  {
    icon: "globe",
    title: "Countries served",
    note: "Global Presence",
  },
];

const FACTS = [
  { icon: "logo", value: "Hurghada", label: "Studio city" },
  { icon: "city", value: String(places.length), label: "Project cities" },
  { icon: "globe", value: "2", label: "Countries served" },
  {
    icon: "check",
    value: `${projects.length}+`,
    label: "Projects delivered",
  },
  { icon: "layers", value: "5", label: "Design stages" },
];

const BADGE =
  "inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink";

const swap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

function ImageArrow({ dir, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-ground/70 text-ink backdrop-blur-sm transition-colors hover:bg-ground ${
        dir < 0 ? "left-3" : "right-3"
      }`}
    >
      {dir < 0 ? (
        <LuChevronLeft className="size-4" aria-hidden="true" />
      ) : (
        <LuChevronRight className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

function ProjectCard({ project }) {
  const [current, setCurrent] = useState(0);
  const total = project.images.length;
  const image = project.images[current];
  const go = (d) => setCurrent((c) => (c + d + total) % total);

  return (
    <figure className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-ground-raised">
        <motion.img
          key={image.src}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        {total > 1 && (
          <>
            <ImageArrow
              dir={-1}
              onClick={() => go(-1)}
              label="Previous image"
            />
            <ImageArrow dir={1} onClick={() => go(1)} label="Next image" />
            <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-ground/70 px-2.5 py-1 text-xs text-ink tabular-nums backdrop-blur-sm">
              {current + 1} / {total}
            </span>
          </>
        )}
      </div>
      <figcaption className="flex flex-col gap-1">
        <span className="text-base text-ink">{project.name}</span>
        <span className="text-xs tracking-[0.12em] text-ink-dim">
          {project.type}
        </span>
      </figcaption>
    </figure>
  );
}

function Overview() {
  return (
    <>
      <p className="max-w-[44ch] font-hero text-lg leading-relaxed text-ink">
        Where our studio designs, and where our real-world projects take shape.
      </p>
      <ul className="mt-8 w-full border-b border-line">
        {POINTS.map((p) => (
          <li key={p.title} className="flex gap-4 border-t border-line py-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-ground-raised text-gold">
              <Icon
                name={p.icon}
                className={p.icon === "logo" ? "size-6" : "size-5"}
              />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base text-ink">{p.title}</h3>
              <p className="text-sm text-ink-dim">{p.note}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-center gap-2 text-sm text-ink-dim">
        <Icon name="pin" className="size-4 text-gold" />
        Choose a pin on the map to see its projects.
      </p>
    </>
  );
}

function StudioPanel() {
  return (
    <>
      <h3 className="font-hero text-xl tracking-tight text-ink">
        {studio.name}
      </h3>
      <ul className="mt-6 w-full border-b border-line">
        {STUDIO_CONTACT.map((c) => (
          <li
            key={c.label}
            className="flex items-center gap-4 border-t border-line py-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-ground-raised text-gold">
              <Icon name={c.icon} />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs tracking-[0.12em] text-ink-dim">
                {c.label}
              </span>
              <a
                href={c.href}
                {...(c.external && { target: "_blank", rel: "noreferrer" })}
                className="text-sm leading-relaxed text-ink transition-colors hover:text-gold-bright"
              >
                {c.value}
              </a>
            </div>
          </li>
        ))}
      </ul>
      <SocialLinks
        className="mt-6 flex items-center"
        iconClassName="size-5"
        itemClassName="size-10 text-gold"
      />
    </>
  );
}

function PlacePanel({ place, items }) {
  return (
    <div className="mt-6 w-full">
      {items.length ? (
        <MapSlider
          key={`p-${place.id}`}
          items={items}
          getKey={(p) => p.slug}
          renderItem={(p) => <ProjectCard project={p} />}
          label="project"
        />
      ) : (
        <p className="text-sm text-ink-dim">No projects listed here yet.</p>
      )}
    </div>
  );
}

function FactsStrip() {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
      {FACTS.map((f, i) => (
        <li
          key={f.label}
          className={`${i === FACTS.length - 1 ? "col-span-2 lg:col-span-1" : ""} flex flex-col items-center gap-3 bg-ground-raised px-4 py-8 text-center`}
        >
          <span className="text-gold">
            <Icon
              name={f.icon}
              className={f.icon === "logo" ? "size-8" : "size-7"}
            />
          </span>
          <span className="font-hero text-xl text-ink tabular-nums">
            {f.value}
          </span>
          <span className="text-sm text-ink-dim">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WhereWeWork() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  useReveal(contentRef);
  const [activeId, setActiveId] = useState(null);
  const select = (id) => setActiveId((cur) => (cur === id ? null : id));

  const place = places.find((p) => p.id === activeId);
  const placeProjects = place
    ? projects.filter((p) => p.destination === place.id)
    : [];
  const countFor = (id) => projects.filter((p) => p.destination === id).length;

  useEffect(() => {
    if (!activeId) return undefined;
    const onOutsideClick = (e) => {
      if (!sectionRef.current?.contains(e.target)) return;
      if (e.target.closest("[data-map-region], [data-map-panel]")) return;
      setActiveId(null);
    };
    document.addEventListener("click", onOutsideClick);
    return () => document.removeEventListener("click", onOutsideClick);
  }, [activeId]);

  return (
    <section
      ref={sectionRef}
      id="where-we-work"
      className="bg-ground my-16 md:mb-28"
      aria-labelledby="where-we-work-title"
    >
      <MotionConfig reducedMotion="user">
        <div ref={contentRef} className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <h2 id="where-we-work-title" className={BADGE}>
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-amber"
            />
            Where we work
          </h2>

          <div className="mt-8 grid items-start gap-10 md:mt-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div className="flex flex-col items-start" data-map-panel>
              <div className="w-full" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={activeId ?? "overview"} {...swap}>
                    {place ? (
                      <PlacePanel place={place} items={placeProjects} />
                    ) : activeId === studio.id ? (
                      <StudioPanel />
                    ) : (
                      <Overview />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <figure className="relative -order-1 overflow-hidden rounded-[var(--radius-card)] border border-line bg-ground-raised md:order-none">
              <PinMap
                activeId={activeId}
                onSelect={select}
                projectCount={countFor}
              />
              <figcaption className="pointer-events-none absolute bottom-4 left-4 text-[10px] tracking-[0.12em] text-ink-dim uppercase">
                Illustrative map · not to scale
              </figcaption>
            </figure>
          </div>

          <div className="mt-10 md:mt-16">
            <FactsStrip />
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
