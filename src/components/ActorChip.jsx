const ACTORS = {
  input: { label: 'Input', className: 'border-line-strong text-ink-dim' },
  ai: { label: 'AI', className: 'border-signal text-signal' },
  human: { label: 'Engineer', className: 'border-gold text-gold' },
};

export default function ActorChip({ actor }) {
  const { label, className } = ACTORS[actor];
  return (
    <span
      className={`inline-flex rounded-[2px] border px-2 py-0.5 font-mono text-xs uppercase tracking-[0.12em] ${className}`}
    >
      {label}
    </span>
  );
}
