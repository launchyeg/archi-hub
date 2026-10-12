// PLACEHOLDER. Not a real project. Replace with one real Archi Hub case study.
// The structure (facts + four process steps) is final; every value here is a stand-in.
export const featuredProject = {
  isPlaceholder: true,
  slug: 'placeholder-project',
  title: 'Featured project',
  summary:
    'This slot will hold one real Archi Hub project, told as a process story from first input to final decision. The structure is final. The content is not.',
  facts: [
    { label: 'Building type', value: 'To come' },
    { label: 'Location', value: 'To come' },
    { label: 'Floor area', value: 'To come' },
    { label: 'Year', value: 'To come' },
  ],
  steps: [
    {
      title: 'Inputs',
      description: 'What the client gave us: the site, the brief, the budget and the codes that apply.',
      media: 'Site plan to come',
      actor: 'input',
    },
    {
      title: 'AI iterations',
      description: 'The options the AI generated, and how they changed from one round to the next.',
      media: 'Iteration sheets to come',
      actor: 'ai',
    },
    {
      title: 'Structural check',
      description: 'What the structural check flagged on each option, and what changed because of it.',
      media: 'Check results to come',
      actor: 'ai',
    },
    {
      title: "Engineer's decision",
      description: 'Which option the engineer chose, and the reasons written down at sign-off.',
      media: 'Final drawing to come',
      actor: 'human',
    },
  ],
};
