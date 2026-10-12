// The mark is a raster, so each blade is a copy of the image clipped to its own region.
// Together the three regions cover the whole image, so at rest it reads as one mark.
const BLADES = [
  {
    clip: 'polygon(0% 0%, 55.6% 0%, 51.7% 63.7%, 0% 82%)',
    angle: '27deg',
    from: '100% 0%',
    to: '0% 100%',
    delay: 0,
  },
  {
    clip: 'polygon(55.6% 0%, 100% 0%, 100% 100%, 86.4% 100%, 51.7% 63.7%)',
    angle: '145deg',
    from: '100% 100%',
    to: '0% 0%',
    delay: 140,
  },
  {
    clip: 'polygon(0% 82%, 51.7% 63.7%, 86.4% 100%, 0% 100%)',
    angle: '264deg',
    from: '0% 50%',
    to: '100% 50%',
    delay: 280,
  },
];

export default function MarkDrawIn({ className = '' }) {
  return (
    <div aria-hidden="true" className={`relative aspect-[648/565] ${className}`}>
      {BLADES.map((blade) => (
        <img
          key={blade.angle}
          src="/archihub-mark.png"
          alt=""
          className="mark-blade absolute inset-0 h-full w-full"
          style={{
            clipPath: blade.clip,
            '--wipe-angle': blade.angle,
            '--wipe-from': blade.from,
            '--wipe-to': blade.to,
            animationDelay: `${blade.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
