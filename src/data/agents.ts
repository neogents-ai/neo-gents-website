// Categories follow the order of business operations (GTM advisor): Sales first,
// then Admin (formerly Ops), Content, Support, Finance, Research, Build (creator tools).
export type AgentCategory =
  | 'Sales'
  | 'Admin'
  | 'Content'
  | 'Support'
  | 'Finance'
  | 'Research'
  | 'Build'

export const CATEGORY_ORDER: AgentCategory[] = [
  'Sales',
  'Admin',
  'Content',
  'Support',
  'Finance',
  'Research',
  'Build',
]

export interface Agent {
  name: string
  desc: string
  category: AgentCategory
}

export interface AgentStack {
  name: string
  desc: string
  agents: string[]
  price: string
}

export const agents: Agent[] = [
  // Sales — first in business-operation order
  { name: 'Outbound Prospecting Agent', desc: 'Builds targeted lead lists from defined criteria and initiates first contact.', category: 'Sales' },
  { name: 'Follow-up Sequences Agent', desc: 'Sends timed, personalized follow-ups until a reply or a booking.', category: 'Sales' },
  { name: 'Lead Scoring Agent', desc: 'Ranks incoming leads by fit and intent so you know who to call first.', category: 'Sales' },
  { name: 'Appointment Booker', desc: 'Books, reschedules, and confirms appointments through SMS or chat.', category: 'Sales' },
  { name: 'Proposal Writer', desc: 'Generates custom proposals based on a discovery call summary.', category: 'Sales' },
  { name: 'Quote Generator', desc: 'Builds accurate price quotes from a project intake form in seconds.', category: 'Sales' },
  { name: 'Churn Predictor', desc: 'Monitors client behavior signals and alerts you before someone disengages.', category: 'Sales' },
  { name: 'Upsell Trigger Agent', desc: 'Identifies the right moment to offer an upgrade and queues the outreach.', category: 'Sales' },
  { name: 'Win/Loss Analyst', desc: 'Reviews closed deals to identify what\'s working and what\'s not.', category: 'Sales' },
  // Admin (formerly Ops)
  { name: 'Scheduling Agent', desc: 'Books meetings, manages calendar conflicts, sends reminders automatically.', category: 'Admin' },
  { name: 'Meeting Prep Agent', desc: 'Pulls background on attendees, summarizes agenda, delivers a brief before every call.', category: 'Admin' },
  { name: 'CRM Data Agent', desc: 'Keeps contact records clean, logs interactions, flags stale relationships.', category: 'Admin' },
  { name: 'Invoice Agent', desc: 'Generates invoices on trigger, tracks payment status, sends escalating reminders until paid.', category: 'Admin' },
  { name: 'Contract Drafting Agent', desc: 'Creates first-draft contracts from a template based on project details.', category: 'Admin' },
  { name: 'Document Summarizer', desc: 'Reads long reports, contracts, or PDFs and returns the key points in under a minute.', category: 'Admin' },
  { name: 'Onboarding Agent', desc: 'Walks new clients or employees through your process step by step, automatically.', category: 'Admin' },
  { name: 'Task Delegation Agent', desc: 'Receives a project brief, breaks it into tasks, assigns them, and tracks progress.', category: 'Admin' },
  // Content
  { name: 'Content Repurposing Agent', desc: 'Takes one piece of content and produces versions for every platform.', category: 'Content' },
  { name: 'Hook Generator', desc: 'Writes 10 scroll-stopping hooks for any topic on demand.', category: 'Content' },
  { name: 'Caption Writer', desc: 'Produces platform-specific captions with CTAs, optimized per channel.', category: 'Content' },
  { name: 'Trend Spotter', desc: 'Monitors your industry daily and surfaces content angles worth posting.', category: 'Content' },
  { name: 'Newsletter Drafter', desc: 'Turns a bullet list of updates into a formatted, ready-to-send email.', category: 'Content' },
  { name: 'Ad Copy Agent', desc: 'Writes multiple ad variations from a brief, ready for A/B testing.', category: 'Content' },
  { name: 'Launch Copywriter', desc: 'Writes full launch sequences — emails, posts, and landing page copy.', category: 'Content' },
  // Support
  { name: 'FAQ Responder', desc: 'Answers common questions instantly using your approved content.', category: 'Support' },
  { name: 'Ticket Triage Agent', desc: 'Reads support messages, categorizes by priority, routes to the right person.', category: 'Support' },
  { name: 'Review Response Agent', desc: 'Drafts responses to Google, Yelp, or platform reviews within minutes of posting.', category: 'Support' },
  { name: 'After-hours SMS Agent', desc: 'Handles incoming messages after hours, captures details, queues for morning.', category: 'Support' },
  // Finance
  { name: 'Weekly Revenue Briefer', desc: 'Delivers a plain-English revenue summary every Monday morning.', category: 'Finance' },
  { name: 'Cash Flow Monitor', desc: 'Tracks inflows and outflows, flags upcoming shortfalls before they hit.', category: 'Finance' },
  // Research
  { name: 'Market Research Agent', desc: 'Gathers data on market size, trends, and customer behavior for any topic.', category: 'Research' },
  { name: 'Competitive Intel Agent', desc: 'Tracks competitor pricing, positioning, and product updates continuously.', category: 'Research' },
  { name: 'Industry News Monitor', desc: 'Delivers a daily brief on the most relevant news in your industry.', category: 'Research' },
  { name: 'Prospect Researcher', desc: 'Produces a detailed brief on any company or person before a meeting.', category: 'Research' },
  { name: 'Grant Finder', desc: 'Searches for relevant grants, fellowships, or funding programs for your profile.', category: 'Research' },
  // Build — creator agent library
  { name: 'Brand Deal Inbox Agent', desc: 'Triages brand emails and DMs, drafts replies, and tracks deal status.', category: 'Build' },
  { name: 'DM Manager', desc: 'Sorts and responds to high-volume DMs using your voice and defined filters.', category: 'Build' },
  { name: 'Fan Q&A Agent', desc: 'Answers common fan questions at scale using your approved responses.', category: 'Build' },
  { name: 'Course Outline Agent', desc: 'Turns a topic or expertise area into a structured course outline instantly.', category: 'Build' },
]

export const stacks: AgentStack[] = [
  {
    name: 'Content Engine',
    desc: '12 posts per month — scripted, designed, and scheduled. One direction from you. Everything else handled.',
    agents: ['Content Repurposing Agent', 'Hook Generator', 'Caption Writer', 'Trend Spotter'],
    price: '$400 setup + $250/mo',
  },
  {
    name: 'Lead Machine',
    desc: 'Finds cold leads by monitoring buying signals in real time, then initiates outreach and qualifies interest.',
    agents: ['Outbound Prospecting Agent', 'Lead Scoring Agent', 'Follow-up Sequences Agent', 'Proposal Writer'],
    price: '$500 setup + $350/mo',
  },
  {
    name: 'Voice + CRM',
    desc: 'Answers calls, books appointments, logs the interaction, and follows up — without you touching it.',
    agents: ['Appointment Booker', 'After-hours SMS Agent', 'CRM Data Agent', 'Follow-up Sequences Agent'],
    price: 'Custom quote',
  },
  {
    name: 'Full Admin',
    desc: 'Invoicing, scheduling, proposals, reporting — your back office runs itself so you can focus on clients.',
    agents: ['Invoice Agent', 'Scheduling Agent', 'Task Delegation Agent', 'Weekly Revenue Briefer'],
    price: 'Custom quote',
  },
]

export const CATEGORY_COLORS: Record<AgentCategory, string> = {
  Sales: '#00B359',
  Admin: '#D4A017',
  Content: '#0D9488',
  Support: '#3A9BD5',
  Finance: '#E67E22',
  Research: '#818CF8',
  Build: '#E74C3C',
}
