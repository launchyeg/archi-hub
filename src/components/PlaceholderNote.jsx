export default function PlaceholderNote({ children }) {
  return (
    <div className="flex flex-col gap-1 rounded-[var(--radius)] border border-dashed border-line-strong bg-ground-raised px-4 py-3">
      <span className="text-xs tracking-[0.12em] text-gold-bright uppercase">
        Placeholder
      </span>
      <p className="text-sm text-ink-dim">{children}</p>
    </div>
  );
}
