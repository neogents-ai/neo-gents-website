export interface NoriUseCase {
  id: string
  label: string
  detail: string
}

export interface NoriDeliveryStage {
  label: string
  owner: 'Nori' | 'You' | 'NEO Gents'
  detail: string
}

export const noriHero = {
  kicker: 'NORI / PRACTICAL AI FOR PEOPLE BUILDING WITHOUT A BLUEPRINT',
  headline: 'Make one part of your business work better with AI.',
  lede: 'Start with one confusing process. Nori explains what is happening, identifies a useful AI application, and designs a practical solution. NEO Gents installs the approved workflow.',
  steps: ['Understand the problem', 'Find the AI use case', 'Install the solution'],
  cta: "Show Nori what isn't working",
} as const

export const leadGenerationExample = {
  request: 'I need more customers.',
  explanation: 'That question touches more than lead generation. Nori maps the whole path before recommending a tool.',
  stages: ['Audience', 'Offer', 'Marketing', 'Lead capture', 'Sales', 'Follow-up', 'Delivery'],
} as const

export const solutionUseCases: NoriUseCase[] = [
  { id: 'customers', label: 'Find and reach customers', detail: 'Clarify the audience, offer, outreach, and lead-capture path.' },
  { id: 'marketing-sales', label: 'Improve marketing and sales', detail: 'Connect campaigns, funnels, qualification, and sales follow-up.' },
  { id: 'response', label: 'Respond and follow up faster', detail: 'Reduce missed calls, unanswered inquiries, and inconsistent handoffs.' },
  { id: 'operations', label: 'Organize repetitive work', detail: 'Turn recurring administrative work into a clear, reviewable process.' },
  { id: 'content', label: 'Create and distribute content', detail: 'Build a repeatable path from idea to review and publishing.' },
  { id: 'performance', label: 'Understand business performance', detail: 'Bring important numbers, risks, and next decisions into one view.' },
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
  { label: 'Listen', owner: 'Nori', detail: 'Capture the real question, context, and constraint.' },
  { label: 'Explain', owner: 'Nori', detail: 'Make the process and the point of confusion understandable.' },
  { label: 'Map', owner: 'Nori', detail: 'Show the connected workflow and where progress breaks down.' },
  { label: 'Design', owner: 'Nori', detail: 'Recommend a practical AI use case and solution.' },
  { label: 'Approve', owner: 'You', detail: 'Review the plan, permissions, cost, and expected handoffs.' },
  { label: 'Install', owner: 'NEO Gents', detail: 'Build and install the approved workflow.' },
]
