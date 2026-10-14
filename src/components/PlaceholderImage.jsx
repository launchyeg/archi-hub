import PlaceholderTag from './PlaceholderTag.jsx';

// Stand-in for an image that does not exist yet. The crossed diagonals and the label make
// sure it can never be mistaken for a finished image.
export default function PlaceholderImage({
  note,
  className = '',
  rounded = 'rounded-card',
  surface = 'bg-ground-raised',
  labelPosition = 'bottom',
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${note}`}
      className={`relative overflow-hidden ${surface} ${rounded} ${className}`}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-line">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      <div
        className={`absolute left-4 right-4 flex flex-wrap items-center gap-2 ${
          labelPosition === 'top' ? 'top-4' : 'bottom-4'
        }`}
      >
        <PlaceholderTag />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-dim">{note}</span>
      </div>
    </div>
  );
}
