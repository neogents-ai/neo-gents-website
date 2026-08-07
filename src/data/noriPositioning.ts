export interface NoriUseCase {
  id: string
  label: string
  detail: string
  benefit: string
}

export interface NoriClientCase {
  id: string
  label: string
  phase: string
  detail: string
  benefit: string
  image?: string
  imageAlt?: string
  detailImage?: string
  detailImageAlt?: string
  detailPlaceholder?: string
  quote?: string
  links?: Array<{
    href: string
    label: string
  }>
}

export interface NoriDeliveryStage {
  label: string
  owner: string
  detail: string
  whyItMatters: string
}

export const noriHero = {
  kicker: 'PRACTICAL AI FOR BUSINESSES WITHOUT A TEAM.\nNORI BUILDS YOUR TEAM.',
  headline: 'Make one part of your business work better with AI.',
  lede: 'Start with one confusing process you already do. If you know where it is breaking, Nori starts there. If you do not, that is okay: Nori maps it, finds a useful agentic solution, and designs the plan.',
  steps: ['Understand the problem', 'Find the AI use case', 'Install the solution'],
  cta: "Preview Nori's planning process",
} as const

export const leadGenerationExample = {
  request: 'I need more customers.',
  explanation: 'That question touches more than lead generation. Nori maps the whole path before recommending a tool.',
  stages: ['Audience', 'Offer', 'Marketing', 'Lead capture', 'Sales', 'Follow-up', 'Delivery'],
} as const

export const solutionUseCases: NoriUseCase[] = [
  { id: 'customers', label: 'Get more customers', detail: 'See how people find you, what gets their attention, and what happens after they reach out.', benefit: 'Stop rebuilding the same lead information and make sure each person has a clear next step.' },
  { id: 'marketing-sales', label: 'Turn interest into sales', detail: 'Keep your marketing, customer questions, and follow-ups connected instead of scattered.', benefit: 'See where interest goes quiet so you can spend time and money where it is actually helping.' },
  { id: 'response', label: 'Reply before people forget', detail: 'Make sure messages, calls, and questions get a clear response and handoff.', benefit: 'Spend less time checking every inbox and catch requests that would otherwise sit unanswered.' },
  { id: 'operations', label: 'Stop repeating yourself', detail: 'Turn the things you do over and over into a simple, reviewable routine.', benefit: 'Reduce duplicate entry and give every repeated task a clear owner and next action.' },
  { id: 'content', label: 'Finish your content', detail: 'Turn one idea into a draft, review, and scheduled post without restarting every time.', benefit: 'Keep ideas moving through a repeatable process instead of losing time deciding where to begin.' },
  { id: 'performance', label: 'See what is working', detail: 'Bring the important numbers, risks, and decisions into one view.', benefit: 'Spot the work affecting revenue before important information gets buried or missed.' },
]

export const clientCaseStudies: NoriClientCase[] = [
  {
    id: 'bay-area-dasher',
    label: 'Bay Area Dasher',
    phase: 'LIVE DASHBOARD',
    detail: 'A renter-operations command center for a Bay Area service business, designed to keep the pipeline, payment health, notes, communication, and daily work in one place.',
    image: '/media/nori-case-bay-area-dasher-logo.png',
    imageAlt: 'Bay Area Dasher logo',
    detailImage: '/media/nori-case-bay-area-dasher.png',
    detailImageAlt: 'Bay Area Dasher dashboard screenshot',
    benefit: 'Nori built the dashboard and handed it off to Hermes to automate the approved work.',
    links: [{ href: 'https://admin.bayareadasher.com/dashboard', label: 'Open dashboard' }],
  },
  {
    id: 'am-speed',
    label: 'AM Speed',
    phase: 'ATHLETE OPERATIONS',
    detail: 'An athlete-management dashboard that brings third-party systems under one roof so the Chief of Staff agent can coordinate the work around a track program.',
    benefit: 'The coach gets one operating view while Nori and the Chief of Staff agent organize follow-ups, priorities, and the connected systems behind the program.',
    image: '/media/nori-case-am-speed.png',
    imageAlt: 'AM Speed logo',
  },
  {
    id: 'belize-remote-workers',
    label: 'Belize Remote Workers',
    phase: 'AI TRAINING + RESEARCH',
    detail: 'Nori turned a manual author-research process into a source-linked research workflow, gathering videos, articles, and public audience comments into one reviewable sheet.',
    benefit: 'Research stays traceable and reusable instead of requiring the team to repeat the same browsing and note-taking from scratch.',
    image: '/media/nori-case-belize-remote-workers-logo.png',
    imageAlt: 'Belize Remote Workers logo',
    detailImage: '/media/nori-case-belize-research.png',
    detailImageAlt: 'Source-linked audience research spreadsheet',
    quote: 'Felt like an elevator to the top instead of taking the stairs.',
    links: [{ href: 'https://belizeremoteworkers.com/', label: 'Visit Belize Remote Workers' }],
  },
  {
    id: 'realtor-shelina',
    label: 'Realtor Shelina',
    phase: 'DASHBOARD IN BUILD',
    detail: 'A client-specific lead-to-showing workspace in development, designed to give one business owner a clear view of incoming interest, follow-up, bookings, and next steps.',
    benefit: 'The dashboard will make the sales path visible before Nori is asked to automate any part of it.',
    image: '/media/nori-case-realtor-shelina.jpg',
    imageAlt: 'Shelina realtor portrait',
    detailPlaceholder: 'REALTOR SHELINA DASHBOARD / COMING SOON',
    links: [{ href: 'https://realtorshelina.com/', label: 'Visit site' }],
  },
  {
    id: 'linesight',
    label: 'LineSight',
    phase: 'DASHBOARD IN BUILD',
    detail: 'An operational dashboard now being designed around the work LineSight needs to see, decide, and hand off without losing the context between people and tools.',
    benefit: 'Nori will use the agreed operating map to keep routine work observable and ready for approval.',
    image: '/media/nori-case-linesight.png',
    imageAlt: 'LineSight logo',
  },
  {
    id: 'jays-training-grounds',
    label: "Jay's Training Grounds",
    phase: 'CLIENT DEMO PLANNED',
    detail: 'A custom fitness-business dashboard concept for memberships, classes, schedules, customer follow-up, and the work that keeps a community program running.',
    benefit: 'The demo will show a client what Nori could monitor and coordinate before a full build is commissioned.',
    image: '/media/nori-case-jays-training-grounds.png',
    imageAlt: "Jay's Training Grounds logo",
    links: [{ href: 'https://jaystraininggrounds.com/', label: 'Visit site' }],
  },
    {
      id: 'weda-art',
      label: 'WeDa Art',
      phase: 'ATTENDEE RESEARCH IN BUILD',
      detail: 'An event-attendee research workflow in development, designed to find and organize prospective attendees so outreach begins with a clearer audience picture.',
      benefit: 'Nori can keep research and outreach preparation connected instead of leaving event growth as a manual search project.',
      image: '/media/nori-case-weda-art.png',
      imageAlt: 'WeDa Art logo',
      links: [{ href: 'https://weda-art.com/', label: 'Visit WeDa Art' }],
    },
  {
    id: 'oakland-workers-united',
    label: 'Oakland Workers United',
    phase: 'SITE NORI BUILDS + MAINTAINS',
    detail: 'A public web presence NEO Gents built, deployed, and continues to maintain with the domain and hosting responsibilities around it.',
    benefit: 'The same team can keep the site, its infrastructure, and its ongoing improvements connected.',
    image: '/media/nori-case-oakland-workers-united.png',
    imageAlt: 'Oakland Workers United logo',
    links: [{ href: 'https://oaklandworkersunited.com/', label: 'Visit site' }],
  },
  {
    id: 'matoma-african-hair-braiding',
    label: 'Matoma African Hair Braiding',
    phase: 'SITE NORI BUILDS + MAINTAINS',
    detail: 'A public web presence NEO Gents built, deployed, and maintains, including the cloud and domain work that keeps it available.',
    benefit: 'The site remains an operating asset because NEO Gents owns the delivery and ongoing infrastructure care.',
    image: '/media/nori-case-matoma.png',
    imageAlt: 'Matoma African Hair Braiding logo',
    links: [{ href: 'https://matomahairbraiding.com/', label: 'Visit site' }],
  },
  {
    id: 'cadence-wonderroots',
    label: 'Rain Has a Beat',
    phase: 'AI DIRECTION / THE CADENCE SERIES',
    detail: 'Cadence Sounds came to NEO Gents with an early idea. Nori helped turn it into a concrete direction; the same support helped WonderRoots Books create and continue The Cadence Series, beginning with Rain Has a Beat by Mahini Adams.',
    benefit: 'Nori gives an early-stage idea a workable path, then keeps the research, content, and delivery work moving as the project grows.',
    image: '/media/nori-case-rain-has-a-beat.png',
    imageAlt: 'Rain Has a Beat book cover by Mahini Adams',
    links: [
      { href: 'https://cdncesounds.vip/', label: 'Cadence Sounds' },
      { href: 'https://a.co/d/04BXkz1o', label: 'Read book one' },
    ],
  },
]

export const buildMapExamples = [
  'I need more customers.',
  'People contact me, but I do not follow up consistently.',
  'Marketing takes too much time.',
  'I keep repeating the same administrative work.',
  'I create content but do not have a reliable publishing process.',
  'I cannot tell which part of the business is making money.',
] as const

export const deliveryPath: NoriDeliveryStage[] = [
  { label: 'Listen', owner: 'Nori', detail: 'Capture the real question, context, and constraint.', whyItMatters: 'You do not need the perfect AI vocabulary. Nori starts with the work you already do and the part that feels hard, slow, or unclear.' },
  { label: 'Explain', owner: 'Nori', detail: 'Make the process and the point of confusion understandable.', whyItMatters: 'Before changing anything, Nori puts the process in plain language so you can see what is happening and decide whether the plan makes sense.' },
  { label: 'Map', owner: 'Nori', detail: 'Show the connected workflow and where progress breaks down.', whyItMatters: 'Most problems have a cause earlier in the process. The map keeps you from paying to automate the wrong step.' },
  { label: 'Design', owner: 'Nori', detail: 'Recommend a practical agentic solution for the job.', whyItMatters: 'Nori proposes the smallest useful solution first, including what it will do, what it will not do, and which work still needs you.' },
  { label: 'Approve', owner: 'You', detail: 'Review the plan, permissions, cost, and expected handoffs.', whyItMatters: 'You choose what Nori may access, which actions require your approval, and what level of model usage you are comfortable with.' },
  { label: 'Install', owner: 'NEO Gents', detail: 'Install the client-specific system and connect the approved tools.', whyItMatters: 'NEO Gents handles the technical setup, so you are not left trying to connect models, tools, dashboards, and permissions alone.' },
  { label: 'Automate', owner: 'Nori + NEO Gents', detail: 'Run approved work with automated CISO monitoring and NEO Gents escalation.', whyItMatters: 'For managed deployments, Nori runs the approved workflow while automated CISO coverage watches safety signals around the clock and NEO Gents owns escalation and upkeep.' },
]
