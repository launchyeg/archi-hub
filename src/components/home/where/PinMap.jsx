import { places, studio } from "./mapRegions.js";

// A quiet drafting map: a few main roads, thin streets, a river and two parks, all in the
// palette's line colours, so it reads as a plan, not a real place.
function MapArt() {
  return (
    <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <g fill="var(--color-line)" opacity=".55">
        <path d="M60 300c40-30 110-34 150-6s30 86-24 98-150-10-152-46 6-30 26-46z" />
        <path d="M430 60c50-14 120 6 128 50s-40 70-96 64-82-44-74-74 18-34 42-40z" />
      </g>
      <path
        d="M-20 420c90-40 150-20 230-70s120-150 220-170 160 10 230-30"
        fill="none"
        stroke="color-mix(in srgb, var(--color-ink) 9%, transparent)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <g fill="none" stroke="var(--color-line)" strokeWidth="1">
        <path d="M0 120h640M0 200h640M0 360h640M120 0v480M260 0v480M400 0v480M540 0v480" />
        <path d="M0 40l640 160M0 300l640-220M80 480l280-480M340 480l300-260" />
      </g>
      <g fill="none" stroke="var(--color-line-strong)" strokeWidth="3" strokeLinecap="round">
        <path d="M-10 250c120-10 200-60 330-30s200 40 330-10" />
        <path d="M300 -10c-20 110 10 180 20 260s-30 160-10 240" />
        <path d="M40 -10c60 120 160 170 280 230" />
      </g>
    </svg>
  );
}

function CityIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17.5v-8l4-2v10M7 17.5V3.5l6 3v11M13 17.5v-6l4 2v4M2 17.5h16" />
    </svg>
  );
}

// Every pin is a real button: click, tap, Enter or Space selects it, again un-selects it.
// While one is selected, the others step back.
export default function PinMap({ activeId, onSelect, projectCount }) {
  const state = (id) => (activeId === id ? "on" : activeId ? "off" : "idle");

  return (
    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px]">
      <MapArt />

      {places.map((p) => {
        const s = state(p.id);
        return (
          <button
            key={p.id}
            type="button"
            data-map-region
            aria-pressed={s === "on"}
            aria-label={`${p.name}: ${projectCount(p.id)} projects`}
            onClick={() => onSelect(p.id)}
            className={`group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-xl px-2 py-1 text-center transition-opacity duration-300 ${s === "off" ? "opacity-45 hover:opacity-100" : ""}`}
            style={{ left: `${p.pin.left}%`, top: `${p.pin.top}%` }}
          >
            <span
              className={`grid size-9 place-items-center rounded-full border transition-[background-color,border-color,color,scale] duration-300 group-hover:scale-110 ${
                s === "on" ? "scale-110 border-gold-bright bg-gold-bright text-ground" : "border-gold/60 bg-ground text-gold group-hover:border-gold-bright"
              }`}
            >
              <CityIcon />
            </span>
            <span className={`hidden text-xs whitespace-nowrap sm:block ${s === "on" ? "text-gold-bright" : "text-ink"}`}>
              {p.name}
            </span>
            <span className="hidden text-[10px] tracking-[0.12em] whitespace-nowrap text-ink-dim uppercase sm:block">City pending</span>
          </button>
        );
      })}

      {/* the studio, at the centre */}
      {(() => {
        const s = state(studio.id);
        return (
          <button
            type="button"
            data-map-region
            aria-pressed={s === "on"}
            aria-label={studio.name}
            onClick={() => onSelect(studio.id)}
            className={`group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl px-3 py-2 text-center transition-opacity duration-300 ${s === "off" ? "opacity-45 hover:opacity-100" : ""}`}
            style={{ left: `${studio.pin.left}%`, top: `${studio.pin.top}%` }}
          >
            <span
              className={`grid size-16 place-items-center rounded-full border bg-ground transition-[border-color,box-shadow,scale] duration-300 group-hover:scale-105 ${
                s === "on" ? "scale-105 border-gold-bright shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-gold-bright)_25%,transparent)]" : "border-gold"
              }`}
            >
              <img src="/archihub-mark.png" alt="" className="h-8 w-auto" />
            </span>
            <span className={`text-sm ${s === "on" ? "text-gold-bright" : "text-ink"}`}>{studio.name}</span>
            <span className="text-xs tracking-[0.12em] text-gold-bright uppercase">Address pending</span>
          </button>
        );
      })()}
    </div>
  );
}
