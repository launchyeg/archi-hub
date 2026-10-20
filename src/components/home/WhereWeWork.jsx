import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import MapSlider from "./where/MapSlider.jsx";
import PinMap from "./where/PinMap.jsx";
import { places, projects, studio } from "./where/mapRegions.js";

// Where we work: the drafting map with a pin per place and the studio in the middle. With nothing
// selected, the left column and the strip below show the overview. Clicking a pin shows that
// place's projects on the left and their photos below; clicking the studio shows the studio.
// Clicking the same pin again, "Back to overview", or anywhere outside goes back to the overview.
// SAMPLE DATA: places and project locations are illustrative (see where/mapRegions.js).
// Only "5 design stages" in the facts strip is real.

const EASE = [0.22, 1, 0.36, 1];

const ICONS = {
  pin: (
    <>
      <path d="M10 17.5s-5.5-4.9-5.5-9a5.5 5.5 0 0 1 11 0c0 4.1-5.5 9-5.5 9z" />
      <circle cx="10" cy="8.5" r="1.9" />
    </>
  ),
  building: <path d="M4 17.5V3.5h8v14M12 7.5h4v10M2.5 17.5h15M6.5 6.5h3M6.5 9.5h3M6.5 12.5h3" />,
  city: <path d="M3 17.5v-8l4-2v10M7 17.5V3.5l6 3v11M13 17.5v-6l4 2v4M2 17.5h16" />,
  globe: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c2 2.2 3 4.5 3 7s-1 4.8-3 7c-2-2.2-3-4.5-3-7s1-4.8 3-7z" />
    </>
  ),
  check: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M6.8 10.2l2.2 2.2 4.2-4.6" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
      <path d="M7 17h6M10 13.5V17" />
    </>
  ),
  layers: <path d="M10 2.8l7.2 4-7.2 4-7.2-4 7.2-4zM2.8 10.4l7.2 4 7.2-4M2.8 13.8l7.2 4 7.2-4" />,
};

function Icon({ name, className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const POINTS = [
  { icon: "building", title: "Studio", note: "Studio address and city" },
  { icon: "city", title: "Project locations", note: "Cities where Archi Hub projects stand" },
  { icon: "globe", title: "Countries served", note: "Answer pending from Archi Hub" },
];

const FACTS = [
  { icon: "building", value: null, label: "Studio city" },
  { icon: "city", value: null, label: "Project cities" },
  { icon: "globe", value: null, label: "Countries served" },
  { icon: "check", value: null, label: "Projects delivered" },
  { icon: "monitor", value: null, label: "Desktop programs" },
  { icon: "layers", value: "5", label: "Design stages" },
];

const PLACEHOLDER = "text-xs tracking-[0.12em] text-gold-bright uppercase";

const BADGE =
  "inline-flex items-center gap-2 rounded-full border border-[#ffdaa41f] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,color-mix(in_srgb,var(--color-ink)_5%,transparent),color-mix(in_srgb,var(--color-ink)_20%,transparent))] px-4 py-2 text-sm font-normal text-ink";

const swap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

function ProjectCard({ project }) {
  const cover = project.images[0];
  return (
    <figure className="flex flex-col gap-4">
      <img
        src={cover.src}
        alt={cover.alt}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-[var(--radius-card)] border border-line object-cover"
      />
      <figcaption className="flex flex-col gap-1">
        <span className="text-base text-ink">{project.name}</span>
        <span className="text-xs tracking-[0.12em] text-ink-dim uppercase">{project.type}</span>
      </figcaption>
    </figure>
  );
}

function ViewCard({ view }) {
  return (
    <figure className="flex flex-col gap-3">
      <img
        src={view.src}
        alt={view.alt}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-[var(--radius-card)] border border-line object-cover"
      />
      <figcaption className="text-sm text-ink-dim">{view.project}</figcaption>
    </figure>
  );
}

function Overview() {
  return (
    <>
      <p className="max-w-[44ch] font-hero text-lg leading-relaxed text-ink">
        Where the studio sits, and where the buildings we have designed stand.
      </p>
      <ul className="mt-8 w-full border-b border-line">
        {POINTS.map((p) => (
          <li key={p.title} className="flex gap-4 border-t border-line py-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-ground-raised text-gold">
              <Icon name={p.icon} />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base text-ink">{p.title}</h3>
              <p className="text-sm text-ink-dim">
                <span className={`${PLACEHOLDER} mr-2`}>Placeholder</span>
                {p.note}
              </p>
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

function PanelTop({ label, onClear }) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <p className={PLACEHOLDER}>{label}</p>
      <button
        type="button"
        onClick={onClear}
        className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-sm whitespace-nowrap text-ink-dim transition-colors hover:text-ink"
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
        Back to overview
      </button>
    </div>
  );
}

function StudioPanel({ onClear }) {
  return (
    <>
      <PanelTop label="Placeholder · studio details pending" onClear={onClear} />
      <h3 className="mt-4 font-hero text-xl tracking-tight text-ink">{studio.name}</h3>
      <ul className="mt-6 w-full border-b border-line">
        {[
          ["building", "Address"],
          ["pin", "City and country"],
          ["globe", "Countries served"],
        ].map(([icon, label]) => (
          <li key={label} className="flex items-center gap-4 border-t border-line py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-ground-raised text-gold">
              <Icon name={icon} />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-ink">{label}</span>
              <span className={PLACEHOLDER}>Pending</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function PlacePanel({ place, items, onClear }) {
  return (
    <>
      <PanelTop label="Sample location · city pending" onClear={onClear} />
      <h3 className="mt-4 font-hero text-xl tracking-tight text-ink">{place.name}</h3>
      <p className="mt-2 text-sm text-ink-dim">
        {items.length} {items.length === 1 ? "project" : "projects"} at this location.
      </p>
      <div className="mt-6 w-full">
        {items.length ? (
          <MapSlider
            key={`p-${place.id}`}
            items={items}
            getKey={(p) => p.slug}
            renderItem={(p) => <ProjectCard project={p} />}
            perView={1}
            label="project"
          />
        ) : (
          <p className="text-sm text-ink-dim">No projects listed here yet.</p>
        )}
      </div>
    </>
  );
}

function FactsStrip() {
  return (
    // 1px gaps over a line-coloured background draw the dividers, whatever the column count
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
      {FACTS.map((f) => (
        <li key={f.label} className="flex flex-col items-center gap-3 bg-ground-raised px-4 py-8 text-center">
          <span className="text-gold">
            <Icon name={f.icon} className="size-7" />
          </span>
          {f.value ? (
            <span className="font-hero text-xl text-ink tabular-nums">{f.value}</span>
          ) : (
            <span className={`${PLACEHOLDER} py-2`}>Placeholder</span>
          )}
          <span className="text-sm text-ink-dim">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WhereWeWork() {
  const [activeId, setActiveId] = useState(null); // a place id, "studio", or null for the overview
  const select = (id) => setActiveId((cur) => (cur === id ? null : id));
  const clear = () => setActiveId(null);

  const place = places.find((p) => p.id === activeId);
  const placeProjects = place ? projects.filter((p) => p.destination === place.id) : [];
  const placeViews = placeProjects.flatMap((p) => p.images.map((im) => ({ ...im, project: p.name })));
  const countFor = (id) => projects.filter((p) => p.destination === id).length;

  // Clicking anywhere outside a pin or a panel goes back to the overview.
  useEffect(() => {
    if (!activeId) return undefined;
    const onDown = (e) => {
      if (e.target.closest("[data-map-region], [data-map-panel]")) return;
      setActiveId(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [activeId]);

  return (
    <section className="my-24 bg-ground md:my-40" aria-labelledby="where-we-work-title">
      <MotionConfig reducedMotion="user">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="where-we-work-title" className={BADGE}>
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber" />
              Where we work
            </h2>
            <p className={PLACEHOLDER}>Sample data · locations pending</p>
          </div>

          <div className="mt-8 grid items-start gap-10 md:mt-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div className="flex flex-col items-start" data-map-panel>
              <div className="w-full" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={activeId ?? "overview"} {...swap}>
                    {place ? (
                      <PlacePanel place={place} items={placeProjects} onClear={clear} />
                    ) : activeId === studio.id ? (
                      <StudioPanel onClear={clear} />
                    ) : (
                      <Overview />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* On small screens the map comes first, so the panel that changes sits right under it. */}
            <figure className="relative -order-1 overflow-hidden rounded-[var(--radius-card)] border border-line bg-ground-raised md:order-none">
              <PinMap activeId={activeId} onSelect={select} projectCount={countFor} />
              <figcaption className="pointer-events-none absolute bottom-4 left-4 text-[10px] tracking-[0.12em] text-ink-dim uppercase">
                Illustrative map · not to scale
              </figcaption>
            </figure>
          </div>

          <div className="mt-10 md:mt-16" data-map-panel>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={place ? `views-${place.id}` : "facts"} {...swap}>
                {place ? (
                  <>
                    <p className="mb-6 text-xs tracking-[0.12em] text-ink-dim uppercase">
                      Views at {place.name}
                    </p>
                    {placeViews.length ? (
                      <MapSlider
                        key={`u-${place.id}`}
                        items={placeViews}
                        getKey={(v) => v.src}
                        renderItem={(v) => <ViewCard view={v} />}
                        perView={3}
                        label="view"
                      />
                    ) : (
                      <p className="text-sm text-ink-dim">No photos listed here yet.</p>
                    )}
                  </>
                ) : (
                  <FactsStrip />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
