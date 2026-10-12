// Drafting convention for "to be supplied": a framed void with crossed diagonals.
export default function PlaceholderFrame({ note }) {
  return (
    <div className="relative aspect-[4/3] border border-dashed border-line-strong">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-line">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      <span className="absolute bottom-3 left-3 bg-ground px-2 py-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-dim">
        {note}
      </span>
    </div>
  );
}
