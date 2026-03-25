export interface PersonaConfig {
  id: string
  codename: string
  route: string
  headline: string
  subhead: string
  cardLine: string
  cardQuote?: string
  hook: string
  hookSub?: string
  accentColor: string
  glowColor: string
  features: { icon: string; title: string; desc: string }[]
  templates: { title: string; desc: string }[]
  zeekPersona: string
  zeekOpener: string
  freePerks: string[]
  showAllTemplates: boolean
  showMakiAgents: boolean
}

export const personas: PersonaConfig[] = [
  {
    id: 'students',
    codename: 'M.A.K.I.',
    route: '/students',
    headline: 'Skip the debt.',
    subhead: 'Build real skills. Get paid.',
    cardLine: 'Esports, Health, Finances & Tech.',
    cardQuote: '"Be handsome and touch grass" — Coach Berry',
    hook: 'You\'re being sold a $60,000 credential for a world that already moved on.',
    hookSub: 'We built 52 AI tools that teach you to outperform that credential — and make money doing it.',
    accentColor: '#D4A017',
    glowColor: 'rgba(212, 160, 23, 0.25)',
    features: [
      { icon: '◆', title: 'AI Skill Stacks', desc: 'Learn automation, data analysis, and content creation — skills that pay immediately, not 4 years from now.' },
      { icon: '◈', title: '52 Ready Templates', desc: 'Copy, customize, and deploy real AI tools. Each one solves a real problem someone will pay you to solve.' },
      { icon: '◉', title: 'COMP Cohorts', desc: 'Structured 14-day sprints with accountability. You ship something real by the end.' },
      { icon: '⬡', title: 'Income Path', desc: 'Freelance. Build a micro-SaaS. Automate for local businesses. We map the route.' },
    ],
    templates: [
      { title: 'Resume Optimizer', desc: 'AI that rewrites your resume for ATS and human readers.' },
      { title: 'Side Hustle Finder', desc: 'Matches your skills to gig opportunities in your city.' },
      { title: 'Study Partner AI', desc: 'Socratic tutor for any subject — explains until you get it.' },
      { title: 'Freelance Proposal Writer', desc: 'Win Upwork and Fiverr jobs with proposals that convert.' },
    ],
    zeekPersona: 'students',
    zeekOpener: 'What are you trying to learn or build right now?',
    freePerks: [
      'COMP Cohort seat — 14-day sprint, one interest → paid offer',
      'SoulFood Sushi OS — reads your goals, maps your path',
      '52 AI skill templates — copy, customize, deploy',
      'Client-getting system — first paid offer framework',
      'NEO Life Rate — Seedling tier when you\'re ready ($29/mo)',
    ],
    showAllTemplates: true,
    showMakiAgents: true,
  },
  {
    id: 'parents',
    codename: 'M.A.C.',
    route: '/parents',
    headline: 'AI isn\'t leaving you behind.',
    subhead: 'We won\'t either.',
    cardLine: 'Holidays, Cheat Meals & Distractions. Let\'s recalibrate.',
    hook: 'The wealth gap is real. The AI gap is making it worse.',
    hookSub: 'Family CFO gives your household the same financial and AI tools corporations use — in plain English, no tech background required.',
    accentColor: '#9B59B6',
    glowColor: 'rgba(155, 89, 182, 0.25)',
    features: [
      { icon: '◆', title: 'Family CFO System', desc: 'Budget, invest, and plan generational wealth with an AI advisor that knows your household.' },
      { icon: '◈', title: 'Senior Support AI', desc: 'Helps navigate benefits, healthcare, and government programs — without the runaround.' },
      { icon: '◉', title: 'College Planning', desc: 'AI that maps financial aid, scholarships, and alternatives to six-figure debt for your kids.' },
      { icon: '⬡', title: 'Plain English Always', desc: 'No jargon. No gatekeeping. We translate every tool until you own it.' },
    ],
    templates: [
      { title: 'Monthly Budget AI', desc: 'Tracks spending, flags leaks, and suggests rebalances automatically.' },
      { title: 'Benefits Navigator', desc: 'Finds every benefit your household qualifies for — federal, state, and local.' },
      { title: 'College Cost Comparison', desc: 'Real total-cost breakdowns for any school, including hidden fees.' },
      { title: 'Estate Planning Starter', desc: 'Plain-English guide to wills, beneficiaries, and protecting what you built.' },
    ],
    zeekPersona: 'parents',
    zeekOpener: 'What\'s the biggest financial challenge your household is facing right now?',
    freePerks: [
      'SoulFood Sushi OS — reads bank statements + goals, finds leaks',
      'Avg $295/mo recovered from subscriptions + inefficiency',
      'Family CFO system — budget, invest, plan generational wealth',
      'Plain English coaching — we translate until you own it',
      'Senior Support AI — benefits, healthcare, government programs',
    ],
    showAllTemplates: true,
    showMakiAgents: false,
  },
  {
    id: 'solopreneur',
    codename: 'N.O.R.I.',
    route: '/solopreneur',
    headline: 'Your competitors are already automating.',
    subhead: 'Are you?',
    cardLine: 'Beat the big wigs. The window is closing.',
    hook: 'The businesses winning right now aren\'t bigger. They\'re faster.',
    hookSub: 'We install AI agent teams that handle your repeat work — so you can focus on the 10% only you can do.',
    accentColor: '#00B359',
    glowColor: 'rgba(0, 179, 89, 0.2)',
    features: [
      { icon: '◆', title: 'AI Voice Receptionist', desc: 'Answers calls 24/7, books appointments, sends reminders. No missed leads.' },
      { icon: '◈', title: 'Lead Gen Machine', desc: 'AI agent finds and qualifies your ideal clients — delivered to your inbox.' },
      { icon: '◉', title: 'Ops Automation', desc: 'Invoicing, follow-ups, scheduling, and CRM — automated end-to-end.' },
      { icon: '⬡', title: '70-Agent Library', desc: 'Audit your business. We match you to the exact agents that solve your bottlenecks.' },
    ],
    templates: [
      { title: 'Missed Call Recovery', desc: 'Automatically texts back missed callers with booking link.' },
      { title: 'Proposal Generator', desc: 'Converts your service info into polished client proposals in minutes.' },
      { title: 'Review Requester', desc: 'Sends follow-up messages that triple Google review rates.' },
      { title: 'No-Show Reducer', desc: 'Reminder sequence that cuts appointment no-shows by 60%.' },
    ],
    zeekPersona: 'solopreneur',
    zeekOpener: 'What task is eating the most time in your business right now?',
    freePerks: [
      'Free Pain Point Audit — we find your biggest bottleneck',
      '70-agent library access — matched to your business type',
      'AI agent recommendation — exactly which system to install first',
      'First consultation free — 30-min strategy call',
    ],
    showAllTemplates: false,
    showMakiAgents: false,
  },
  {
    id: 'creators',
    codename: 'N',
    route: '/creators',
    headline: 'Stop posting into the void.',
    subhead: 'Clone yourself at scale.',
    cardLine: 'Visionaries will ride this wave.',
    cardQuote: '"Skills + AI = Leverage" — Sabrina Romanov',
    hook: 'You\'re creating. The algorithm is burying it.',
    hookSub: 'Trinity is our AI content pipeline — it posts, repurposes, and builds your audience 12x a month so you can focus on making.',
    accentColor: '#818CF8',
    glowColor: 'rgba(129, 140, 248, 0.22)',
    features: [
      { icon: '◆', title: 'Trinity Content Engine', desc: '12 posts per month — scripted, designed, and scheduled by AI trained on your voice.' },
      { icon: '◈', title: 'Video Production AI', desc: 'Cinematic short-form content from your raw footage or ideas. Remotion-powered.' },
      { icon: '◉', title: 'Audience Intelligence', desc: 'ARIA monitors what\'s winning in your niche and feeds it to your content calendar.' },
      { icon: '⬡', title: 'Monetization Layer', desc: 'We map the path from audience to income — products, services, affiliates, or sponsorships.' },
    ],
    templates: [
      { title: 'Content Calendar AI', desc: '30 days of post ideas from your niche and voice. ARIA-powered.' },
      { title: 'Hook Generator', desc: 'Scroll-stopping first lines for Reels, TikToks, and YouTube Shorts.' },
      { title: 'Video Script Builder', desc: 'Full short-form script from a single idea. VIDEO pipeline.' },
      { title: 'Brand Voice Builder', desc: 'AI learns how you write and generates in your exact style.' },
      { title: 'Sprint Planner', desc: 'Break a creative project into 2-week sprints. SOLITH-powered.' },
      { title: 'Repurpose Machine', desc: 'One long video → 5 clips, 3 posts, and 2 email threads.' },
      { title: 'Book Proposal Writer', desc: 'For writers: structures your idea into a publisher-ready proposal.' },
      { title: 'Illustration Style Guide', desc: 'For illustrators: documents your visual style for consistent AI-assisted production.' },
    ],
    zeekPersona: 'creators',
    zeekOpener: 'What platform are you trying to grow on, and what\'s holding you back?',
    freePerks: [
      '30-day content calendar — scripted for your niche + voice',
      'Trinity pipeline intro — post, repurpose, grow on autopilot',
      'ARIA audience intelligence — what\'s winning in your niche right now',
      'Hook Generator — scroll-stopping openers for Reels + TikTok',
    ],
    showAllTemplates: false,
    showMakiAgents: false,
  },
]
