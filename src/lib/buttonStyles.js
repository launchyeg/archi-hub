const base =
  'inline-flex items-center justify-center px-6 py-3 text-base font-semibold transition-colors';

const primaryColors = 'bg-amber text-ground hover:bg-gold-bright';
const secondaryColors = 'border border-gold text-gold hover:border-gold-bright hover:text-gold-bright';

export const primaryButton = `${base} rounded-[2px] ${primaryColors}`;
export const secondaryButton = `${base} rounded-[2px] ${secondaryColors}`;

// Home only: pill buttons.
export const primaryPill = `${base} rounded-full ${primaryColors}`;
export const secondaryPill = `${base} rounded-full ${secondaryColors}`;

export const textLink =
  'text-gold underline underline-offset-4 transition-colors hover:text-gold-bright';
