// All Home page content lives here.
//
// STATUS FLAGS
// - claimsStatus: copy describing how Archi Hub works. Not yet confirmed by the company.
// - placeholder: true marks content that is a stand-in and is labelled PLACEHOLDER on the page.
// - 'to confirm': facts we do not have yet. Never shown as if they were real.
export const claimsStatus = 'to confirm with the company';

export const hero = {
  status: claimsStatus,
  eyebrow: 'AI Architectural & Structural Intelligence',
  headlineLines: ['AI proposes.', 'An engineer decides.'],
  supportingLine:
    'Every design shows its working. See the inputs, the iterations and the structural checks, then the engineer who signs off.',
  primaryCta: 'Start a project',
  secondaryCta: 'See the Method',
  image: { placeholder: true, note: 'Hero image: a completed Archi Hub project' },
  statCard: {
    placeholder: true,
    title: 'Featured project',
    note: 'Figures will come from a real Archi Hub project.',
    facts: [
      { label: 'Floor area', unit: 'm²' },
      { label: 'Options reviewed', unit: 'options' },
    ],
  },
};

// Three stat cards in the hero. Only "5 stages" is real (the Method has five stages).
// The other two are labelled placeholders until the company supplies real figures.
export const stats = [
  { value: '5', label: 'Stages', detail: 'From data input to human review', placeholder: false },
  { value: null, label: 'Projects delivered', detail: 'Figure to come', placeholder: true },
  { value: null, label: 'Desktop programs', detail: 'Figure to come', placeholder: true },
];

export const about = {
  status: claimsStatus,
  heading: 'A studio shaped by process',
  body: [
    'Archi Hub designs buildings with its own AI tools, and builds the desktop software engineers use to do the same.',
    'Every project moves through the same five stages, from data input to human review. The AI proposes. An engineer reviews, decides and signs off.',
  ],
  cta: 'See the Method',
  images: [
    { shape: 'wide', note: 'Studio at work' },
    { shape: 'wide', note: 'Project model or drawing set' },
    { shape: 'tall', note: 'Engineer reviewing a design' },
  ],
};

export const why = {
  heading: 'Why Archi Hub',
  intro: 'Four commitments that shape every project and every program we ship.',
  items: [
    {
      title: 'Proof over promise',
      body: 'Every claim about our AI comes with the process behind it: inputs, iterations, checks and decisions. Where proof is not ready yet, we say so.',
    },
    {
      title: 'A human signs off',
      body: 'The AI proposes options. An engineer reviews them, decides, and is accountable for the result.',
    },
    {
      title: 'Software we build and use',
      body: 'We design with our own desktop programs, and engineers can download and use the same tools.',
    },
    {
      title: 'Each audience gets its own page',
      body: 'Clients see how commissioned work is done. Engineers see the problem each tool solves and its result.',
    },
  ],
};

// STATUS: to confirm with the company. This list of services has not been confirmed.
export const deliver = {
  status: 'to confirm with the company',
  heading: 'What we deliver',
  intro: 'The work we take on, from first layout to the software behind it.',
  items: [
    {
      title: 'Architectural design',
      body: 'Building layouts and design, developed from your brief and your site.',
      imageNote: 'Architectural design project',
    },
    {
      title: 'Structural design',
      body: 'Structural systems designed alongside the architecture, not after it.',
      imageNote: 'Structural model',
    },
    {
      title: 'Generative design options',
      body: 'Several AI-generated options to compare, instead of a single proposal.',
      imageNote: 'Set of generated options',
    },
    {
      title: 'Structural checks',
      body: 'Each option checked before an engineer reviews it.',
      imageNote: 'Structural check results',
    },
    {
      title: 'Desktop engineering software',
      body: 'The programs we design with, available for engineers to use.',
      imageNote: 'Software interface',
    },
    {
      title: 'Planning support',
      body: 'Help preparing the information a project needs to move forward.',
      imageNote: 'Planning documents',
    },
  ],
};

export const labPreview = {
  heading: 'Intelligence Lab',
  body: 'Our desktop programs, each framed by the engineering problem it solves. They run on your computer, not in the browser.',
  linkLabel: 'Visit the Intelligence Lab',
  // PLACEHOLDER: program names and details are not decided yet.
  programs: [
    { id: 'program-a', name: 'Program A', placeholder: true },
    { id: 'program-b', name: 'Program B', placeholder: true },
    { id: 'program-c', name: 'Program C', placeholder: true },
  ],
  programFields: {
    problem: "The engineer's problem",
    result: 'The result',
    pending: 'To come',
  },
  pipelineTitle: 'Where the software sits in the process',
  // actor: 'input' (what the client brings), 'ai' (produced by the AI), 'human' (an engineer)
  stages: [
    { name: 'Data Input', actor: 'input' },
    { name: 'AI Analysis', actor: 'ai' },
    { name: 'Generative Design', actor: 'ai' },
    { name: 'Structural Check', actor: 'ai' },
    { name: 'Human Review', actor: 'human' },
  ],
};

// PLACEHOLDER quotes. Shown for now with a PLACEHOLDER badge on every card.
// Before launch: replace with real, approved quotes, or set visible to false to hide the section.
export const clientVoices = {
  visible: true,
  heading: 'Client voices',
  intro: 'What clients say about working with Archi Hub. Real, approved quotes will replace these.',
  quotes: Array.from({ length: 6 }, (_, index) => ({
    id: `quote-${index + 1}`,
    placeholder: true,
    text: 'A real client quote will go here once the client has approved it for publication.',
    name: `Client name ${index + 1}`,
    role: 'Role, company',
  })),
};

// STATUS: to confirm. Studio location and project locations are not known yet.
export const whereWeWork = {
  status: 'to confirm',
  heading: 'Where we work',
  body: 'Our studio location and the places we have delivered projects will appear here.',
  mapNote: 'Map: studio and project locations',
  locations: [
    { label: 'Studio', value: 'To confirm' },
    { label: 'Project locations', value: 'To confirm' },
  ],
};

// Only questions with status 'confirmed' appear on the page.
export const faq = {
  heading: 'Questions',
  items: [
    {
      question: "Can I run Archi Hub's software in my browser?",
      answer: 'No. Our programs are desktop software and run on your computer. The Intelligence Lab shows what each one does.',
      status: 'confirmed',
    },
    {
      question: 'How do I get the software?',
      answer: 'Choose "Try the software" in the contact form and enter your name and email. We will email you a download link.',
      status: 'confirmed',
    },
    {
      question: "Does a person review the AI's designs?",
      answer: 'Yes. The AI proposes options. An engineer reviews every design and makes the final decision.',
      status: 'confirmed',
    },
    {
      question: 'What do you need from me to start a project?',
      answer: 'Your name, your email and your question. Your company, building type, location and floor area are optional, but they help us reply.',
      status: 'confirmed',
    },
    {
      question: 'How do you handle my details?',
      answer: 'As set out in our privacy notice.',
      link: { to: '/legal', label: 'Read the privacy notice' },
      status: 'confirmed',
    },
    { question: 'Which operating systems does the software run on?', answer: 'to confirm', status: 'to confirm' },
    { question: 'How much does the software cost?', answer: 'to confirm', status: 'to confirm' },
    { question: 'Which countries do you work in?', answer: 'to confirm', status: 'to confirm' },
  ],
};

export const contact = {
  heading: 'Start a project',
  body: 'Ask a question about a project, or request the software. We reply by email.',
  // PLACEHOLDER: contact details are not confirmed yet.
  details: [
    { label: 'Email', value: 'To confirm' },
    { label: 'Phone', value: 'To confirm' },
    { label: 'Studio', value: 'To confirm' },
  ],
};
