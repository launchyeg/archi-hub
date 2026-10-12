// STATUS: to confirm with the company.
// Every claim in this file describes how Archi Hub works (AI proposes, an engineer reviews
// and signs off). None of it has been confirmed by Archi Hub yet. Do not ship to production
// until the company confirms each claim is accurate.
export const claimsStatus = 'to confirm with the company';

export const hero = {
  status: claimsStatus,
  headline: 'AI proposes. An engineer decides.',
  headlineLines: ['AI proposes.', 'An engineer decides.'],
  supportingLine:
    'Every design shows its working. See the inputs, the iterations and the structural checks, then the engineer who signs off.',
  primaryCta: 'Start a project',
  secondaryCta: 'See the Method',
};

// actor: 'input' (what the client brings), 'ai' (produced or measured by the AI), 'human' (an engineer)
export const pipeline = {
  status: claimsStatus,
  start: 'Vision',
  end: 'Built',
  stages: [
    { name: 'Data Input', detail: 'Site, brief, codes and constraints', actor: 'input' },
    { name: 'AI Analysis', detail: 'Reads the constraints and maps what is possible', actor: 'ai' },
    { name: 'Generative Design', detail: 'Generates layout and massing options', actor: 'ai' },
    { name: 'Structural Check', detail: 'Checks loads and members on each option', actor: 'ai' },
    { name: 'Human Review', detail: 'An engineer reviews, chooses and signs off', actor: 'human' },
  ],
};

export const trust = {
  status: claimsStatus,
  heading: 'A person approves every design.',
  body: 'The AI produces and tests options. It does not decide. An engineer reviews the options and the check results, chooses one, and is accountable for it.',
  linkLabel: 'How the Method works',
  titleBlock: [
    { label: 'Proposed by', value: "Archi Hub's AI tools", actor: 'ai' },
    { label: 'Checked by', value: 'Structural check on every option', actor: 'ai' },
    { label: 'Approved by', value: 'The engineer responsible for the project', actor: 'human' },
  ],
};

export const startProject = {
  heading: 'Start a project',
  body: "Tell us about the building and what you need. We'll reply by email.",
};
