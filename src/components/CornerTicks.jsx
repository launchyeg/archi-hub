const CORNERS = [
  'left-0 top-0 border-l border-t',
  'right-0 top-0 border-r border-t',
  'bottom-0 left-0 border-b border-l',
  'bottom-0 right-0 border-b border-r',
];

export default function CornerTicks({ className = 'border-gold' }) {
  return CORNERS.map((position) => (
    <span
      key={position}
      aria-hidden="true"
      className={`pointer-events-none absolute size-2 ${position} ${className}`}
    />
  ));
}
