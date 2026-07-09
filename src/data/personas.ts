export interface PersonaAssets {
  /** Static 2D mascot image path, e.g. '/maki-mascot.jpg' */
  mascot2d?: string
  /** 3D model file path, e.g. '/maki-mascot.glb' */
  mascot3d?: string
}

/** A sub-audience inside a buyer profile (e.g. kids + parents under Soulfood Sushi) */
export interface PersonaAudience {
  id: string
  label: string
  hook: string
  hookSub?: string
  features: { icon: string; title: string; desc: string }[]
  perks: string[]
}

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
  /** Sub-audience blocks rendered on the profile page */
  audiences?: PersonaAudience[]
  /** Asset references for 2D images and 3D models */
  assets?: PersonaAssets
}

export const personas: PersonaConfig[] = [
  {
    id: 'soulfood-sushi',
    codename: 'SOULFOOD SUSHI',
    route: '/soulfood-sushi',
    headline: 'Skip the college debt.',
    subhead: 'Keep the dream.',
    cardLine: 'For your kids, with you watching every step.',
    cardQuote: '"Be handsome and touch grass" — Coach Berry',
    hook: 'While other families sign loan papers, yours builds something that pays.',
    hookSub: 'Soulfood Sushi turns learning into a game your kid actually wants to play — real skills, real income paths, and a dashboard where you watch it all happen. The first generation that doesn\'t owe.',
    accentColor: '#D4A017',
    glowColor: 'rgba(212, 160, 23, 0.25)',
    features: [
      { icon: '◆', title: 'A World Worth Exploring', desc: 'A 3D headquarters where study, health, money, and tech are daily quests — not homework.' },
      { icon: '◈', title: 'Real Skills, Real Early', desc: 'Automation, content, finance, and AI fluency — skills that pay now, not four years and $60k from now.' },
      { icon: '◉', title: 'Parents See Everything', desc: 'Your own dashboard with a weekly Life Audit. No hovering, no guessing — just the full picture.' },
      { icon: '⬡', title: 'A Path Off the Debt Track', desc: 'COMP cohorts, income paths, and college alternatives mapped in plain English for the whole family.' },
    ],
    templates: [
      { title: 'Study Partner AI', desc: 'Socratic tutor for any subject — explains until you get it.' },
      { title: 'Side Hustle Finder', desc: 'Matches your kid\'s skills to real earning opportunities.' },
      { title: 'College Cost Comparison', desc: 'Real total-cost breakdowns for any school — and the alternatives.' },
      { title: 'Monthly Budget AI', desc: 'Tracks family spending, flags leaks, suggests rebalances.' },
    ],
    zeekPersona: 'sfs',
    zeekOpener: 'Tell me about your family — who\'s learning, and what future are we building?',
    freePerks: [
      'SoulFood Sushi OS — reads your goals, maps your family\'s path',
      'COMP Cohort seat — 14-day sprint, one interest → paid offer',
      '52 AI skill templates — copy, customize, deploy',
      'Weekly Life Audit — parents see progress in plain English',
      'Avg $295/mo recovered from subscriptions + inefficiency',
    ],
    showAllTemplates: true,
    showMakiAgents: true,
    audiences: [
      {
        id: 'kids',
        label: 'For the Kids',
        hook: 'You\'re being sold a $60,000 credential for a world that already moved on.',
        hookSub: 'Level up like a game: daily quests, ranks E→S, and 52 AI tools that teach you to out-earn that credential.',
        features: [
          { icon: '◆', title: 'AI Skill Stacks', desc: 'Automation, data, and content skills that pay immediately — not 4 years from now.' },
          { icon: '◈', title: '52 Ready Templates', desc: 'Copy, customize, deploy. Each one solves a problem someone will pay you for.' },
          { icon: '◉', title: 'COMP Cohorts', desc: '14-day sprints with accountability. You ship something real by the end.' },
          { icon: '⬡', title: 'Income Path', desc: 'Freelance, micro-SaaS, or local business automation. We map the route.' },
        ],
        perks: [
          'COMP Cohort seat — 14-day sprint, one interest → paid offer',
          '52 AI skill templates — copy, customize, deploy',
          'Client-getting system — first paid offer framework',
        ],
      },
      {
        id: 'parents',
        label: 'For the Parents',
        hook: 'The wealth gap is real. The AI gap is making it worse.',
        hookSub: 'Watch your kid build a future from your own dashboard — while Family CFO plugs the leaks in the household budget.',
        features: [
          { icon: '◆', title: 'Family CFO System', desc: 'Budget, invest, and plan generational wealth with an AI advisor that knows your household.' },
          { icon: '◈', title: 'Weekly Life Audit', desc: 'A plain-English report of what your kid learned, built, and earned this week.' },
          { icon: '◉', title: 'College Planning', desc: 'Financial aid, scholarships, and real alternatives to six-figure debt — mapped for your family.' },
          { icon: '⬡', title: 'Plain English Always', desc: 'No jargon. No gatekeeping. We translate every tool until you own it.' },
        ],
        perks: [
          'SoulFood Sushi OS — reads bank statements + goals, finds leaks',
          'Family CFO system — budget, invest, plan generational wealth',
          'Senior Support AI — benefits, healthcare, government programs',
        ],
      },
    ],
    assets: {
      mascot2d: '/maki-mascot.jpg',
    },
  },
  {
    id: 'nori',
    codename: 'N.O.R.I.',
    route: '/nori',
    headline: 'Your competitors are already automating.',
    subhead: 'Are you?',
    cardLine: 'For businesses and creators. The window is closing.',
    cardQuote: '"Skills + AI = Leverage" — Sabrina Romanov',
    hook: 'The businesses winning right now aren\'t bigger. They\'re faster.',
    hookSub: 'Nori installs AI agent teams that handle your repeat work — sales follow-up, admin, content — so you focus on the 10% only you can do.',
    accentColor: '#00B359',
    glowColor: 'rgba(0, 179, 89, 0.2)',
    features: [
      { icon: '◆', title: 'AI Voice Receptionist', desc: 'Answers calls 24/7, books appointments, sends reminders. No missed leads.' },
      { icon: '◈', title: 'Lead Gen Machine', desc: 'AI agent finds and qualifies your ideal clients — delivered to your inbox.' },
      { icon: '◉', title: 'Admin Automation', desc: 'Invoicing, follow-ups, scheduling, and CRM — automated end-to-end.' },
      { icon: '⬡', title: 'Trinity Content Engine', desc: '12 posts a month — scripted, designed, and scheduled in your voice.' },
    ],
    templates: [
      { title: 'Missed Call Recovery', desc: 'Automatically texts back missed callers with booking link.' },
      { title: 'Proposal Generator', desc: 'Converts your service info into polished client proposals in minutes.' },
      { title: 'Content Calendar AI', desc: '30 days of post ideas from your niche and voice. ARIA-powered.' },
      { title: 'Repurpose Machine', desc: 'One long video → 5 clips, 3 posts, and 2 email threads.' },
    ],
    zeekPersona: 'nori',
    zeekOpener: 'What\'s eating the most time in your business or content pipeline right now?',
    freePerks: [
      'Cohort waitlist seat — next intake, limited spots',
      '30-min intro session — we find your biggest bottleneck',
      '14-day free trial — matched to your business type',
      'Agent recommendation — exactly which system to install first',
    ],
    showAllTemplates: false,
    showMakiAgents: false,
    audiences: [
      {
        id: 'businesses',
        label: 'For Businesses',
        hook: 'The businesses winning right now aren\'t bigger. They\'re faster.',
        hookSub: 'AI agent teams for sales, admin, support, and finance — installed around your existing workflow.',
        features: [
          { icon: '◆', title: 'AI Voice Receptionist', desc: 'Answers calls 24/7, books appointments, sends reminders. No missed leads.' },
          { icon: '◈', title: 'Lead Gen Machine', desc: 'Finds and qualifies your ideal clients — delivered to your inbox.' },
          { icon: '◉', title: 'Admin Automation', desc: 'Invoicing, follow-ups, scheduling, and CRM — automated end-to-end.' },
          { icon: '⬡', title: 'Full Agent Library', desc: 'We audit your bottlenecks and match you to the exact agents that solve them.' },
        ],
        perks: [
          '30-min intro session — we find your biggest bottleneck',
          'Agent library access — matched to your business type',
          '14-day free trial — see the system work before you pay',
        ],
      },
      {
        id: 'creators',
        label: 'For Creators',
        hook: 'You\'re creating. The algorithm is burying it.',
        hookSub: 'Trinity posts, repurposes, and builds your audience 12x a month so you can focus on making.',
        features: [
          { icon: '◆', title: 'Trinity Content Engine', desc: '12 posts per month — scripted, designed, and scheduled by AI trained on your voice.' },
          { icon: '◈', title: 'Video Production AI', desc: 'Cinematic short-form content from your raw footage or ideas. Remotion-powered.' },
          { icon: '◉', title: 'Audience Intelligence', desc: 'ARIA monitors what\'s winning in your niche and feeds your content calendar.' },
          { icon: '⬡', title: 'Monetization Layer', desc: 'The path from audience to income — products, services, affiliates, sponsorships.' },
        ],
        perks: [
          '30-day content calendar — scripted for your niche + voice',
          'Trinity pipeline intro — post, repurpose, grow on autopilot',
          'Hook Generator — scroll-stopping openers for Reels + TikTok',
        ],
      },
    ],
    assets: {
      mascot2d: '/nori-mascot.jpg',
    },
  },
]
