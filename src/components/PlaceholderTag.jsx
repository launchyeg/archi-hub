export default function PlaceholderTag({ children = 'Placeholder', className = '' }) {
  return (
    <span
      className={`inline-flex rounded-full border border-gold-bright bg-ground px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-gold-bright ${className}`}
    >
      {children}
    </span>
  );
}
