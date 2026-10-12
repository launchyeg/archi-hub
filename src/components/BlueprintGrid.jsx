export default function BlueprintGrid() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <pattern id="blueprint-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke="var(--ink)" strokeOpacity="0.06" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
    </svg>
  );
}
