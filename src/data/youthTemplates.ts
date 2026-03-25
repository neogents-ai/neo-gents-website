export type TemplateCTA = 'demo' | 'learn'

export interface YouthTemplate {
  category: string
  title: string
  desc: string
  cta: TemplateCTA
}

export const youthTemplates: YouthTemplate[] = [
  // ── Entrepreneur (10) ─────────────────────────────────────────────────────
  {
    category: 'Entrepreneur',
    title: 'Resale Tracker',
    desc: 'Track inventory, sales, and profit across eBay, Mercari, and Poshmark in one dashboard.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Simple Store Uploader',
    desc: 'List products on Shopify or WooCommerce faster with AI-generated descriptions and tags.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Lead DMs Draft Assistant',
    desc: 'Generate personalized outreach messages for potential clients — sounds like you, not a bot.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Micro-Offer Page Builder',
    desc: 'Create a clean landing page for your service or product. No code. No Squarespace. Just you.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Pricing Calculator',
    desc: 'Figure out what to charge based on your costs, time invested, and what the market pays.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Dropship Product Finder',
    desc: 'Discover trending products and vetted suppliers for your online store before the market catches on.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Print-on-Demand Designer',
    desc: 'Create custom designs for t-shirts, mugs, and more — ready to upload to Printify or Redbubble.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Freelance Service Packager',
    desc: 'Turn your skills into clear service tiers with pricing, deliverables, and a one-page pitch.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Digital Product Creator',
    desc: 'Build and sell templates, presets, or digital downloads. Passive income starts here.',
    cta: 'demo',
  },
  {
    category: 'Entrepreneur',
    title: 'Influencer Outreach Assistant',
    desc: 'Find micro-influencers in your niche and generate collab pitches that actually get responses.',
    cta: 'demo',
  },

  // ── Social / Creative (10) ────────────────────────────────────────────────
  {
    category: 'Social / Creative',
    title: 'Short-Video Idea Generator',
    desc: 'Get 30 trending content ideas for TikTok, Reels, and Shorts — tailored to your niche.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Caption Coach',
    desc: 'Write scroll-stopping captions for Instagram and TikTok that drive comments and saves.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Thumbnail Helper',
    desc: 'Design eye-catching YouTube thumbnails with layouts and color combos proven to get clicks.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'School Club Announcer',
    desc: 'Create professional announcements and flyers for school events in under 2 minutes.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Event Flyer Creator',
    desc: 'Design polished flyers for parties, fundraisers, and pop-ups — brand it, print it, post it.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Meme Generator Pro',
    desc: 'Create viral memes using trending formats. Stays current so your content never looks late.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Trend Spotter',
    desc: 'Track trending sounds, hashtags, and topics across platforms before they peak.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Collab Finder',
    desc: 'Find creators in your exact niche and generate a collab pitch they\'ll actually read.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Music Mixing Assistant',
    desc: 'Get guided help mixing tracks and creating beats — from levels to layering.',
    cta: 'demo',
  },
  {
    category: 'Social / Creative',
    title: 'Animation Storyboard Tool',
    desc: 'Plan out animations scene by scene with prompts, timing notes, and visual direction.',
    cta: 'demo',
  },

  // ── Academics / Tutoring (10) ─────────────────────────────────────────────
  {
    category: 'Academics / Tutoring',
    title: 'Homework Explainer',
    desc: 'Get step-by-step explanations for any problem — math, science, history, English, whatever.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Study Plan Buddy',
    desc: 'Build a custom study schedule around your exams, deadlines, and energy levels.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Flashcard Maker',
    desc: 'Auto-generate flashcard sets from your notes, textbook, or any uploaded PDF.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Tutor Scheduler',
    desc: 'Organize your tutoring sessions, track student progress, and send automated reminders.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Essay Outline Generator',
    desc: 'Go from prompt to fully structured outline in 60 seconds — then write it yourself.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Math Problem Solver',
    desc: 'Solve equations, show every step, and explain the why — not just the answer.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Science Lab Report Helper',
    desc: 'Format your lab data, write the analysis section, and cite your sources correctly.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Language Practice Partner',
    desc: 'Practice speaking and writing in Spanish, French, Mandarin, or 20+ other languages.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Test Prep Tracker',
    desc: 'Track your SAT/ACT progress, pinpoint weak areas, and get a targeted drill plan.',
    cta: 'demo',
  },
  {
    category: 'Academics / Tutoring',
    title: 'Citation Generator',
    desc: 'Auto-generate MLA, APA, and Chicago citations from any URL, book, or article.',
    cta: 'demo',
  },

  // ── Gaming / Content (10) ─────────────────────────────────────────────────
  {
    category: 'Gaming / Content',
    title: 'Clip Curator',
    desc: 'Auto-extract your best gaming moments from streams and recordings — ready to post.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Stream Schedule Buddy',
    desc: 'Build a consistent streaming schedule and auto-notify followers across platforms.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Mod/Plugin Idea Assistant',
    desc: 'Generate ideas and technical outlines for game mods or browser plugins.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Tournament Tracker',
    desc: 'Track brackets, match schedules, and results for your team or solo competitive run.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Team Finder',
    desc: 'Connect with teammates who match your skill level, schedule, and playstyle.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Strategy Guide Creator',
    desc: 'Write and format pro-level guides for games you\'ve mastered — build your reputation.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Leaderboard Monitor',
    desc: 'Track your rank, KDA, and stats across multiple games in one view.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Sponsor Outreach Helper',
    desc: 'Draft professional sponsorship emails that land — even with a small audience.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Highlight Reel Editor',
    desc: 'Compile highlight reels optimized for social media or esports portfolio submissions.',
    cta: 'demo',
  },
  {
    category: 'Gaming / Content',
    title: 'Gaming News Aggregator',
    desc: 'Get daily updates on games, patches, meta shifts, and esports news — filtered to what you play.',
    cta: 'demo',
  },

  // ── Content Creator Tools (10) ────────────────────────────────────────────
  {
    category: 'Content Creator Tools',
    title: 'AI Filmmaker Suite',
    desc: 'Generate video from text prompts using Sora, VEO, Kling, and Runway — no camera required.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'AI Twin Creator',
    desc: 'Build a digital avatar that responds to DMs and comments in your voice while you sleep.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Image Generator Pro',
    desc: 'Create product mockups, thumbnails, and graphics with Midjourney, DALL-E, and Flux.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Script Writer Assistant',
    desc: 'Turn any idea into a full video script with hook, body, CTA — tailored to your voice.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Voice Clone Studio',
    desc: 'Clone your voice for voiceovers, dubbed content, and multilingual versions of your videos.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Music & Sound Generator',
    desc: 'Create royalty-free background music and sound effects — no copyright strikes, ever.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Translation & Localization Bot',
    desc: 'Translate content for a global audience with cultural context built in — not just word-for-word.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Trend Prediction Tool',
    desc: 'Analyze trending topics before they peak and build content while the algorithm is still hungry.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Collaboration Matcher',
    desc: 'Find creators in your niche and auto-draft a collab pitch that highlights mutual value.',
    cta: 'demo',
  },
  {
    category: 'Content Creator Tools',
    title: 'Monetization Optimizer',
    desc: 'Track all your income streams and surface untapped opportunities — ads, affiliates, merch, and more.',
    cta: 'demo',
  },

  // ── Bonus (2) ──────────────────────────────────────────────────────────────
  {
    category: 'Bonus',
    title: 'Junior AI Consultant with NEO Gents',
    desc: 'Join our team as a student consultant. Learn AI consulting, work with real clients, earn 10% commission on projects you help close. Ages 16–21. 5–10 hrs/week.',
    cta: 'learn',
  },
  {
    category: 'Bonus',
    title: 'Esports Mentorship Program',
    desc: '12-week track combining competitive gaming with mindset training, business skills, and tech job readiness. Portfolio building + career pathways included.',
    cta: 'learn',
  },
]

export const youthCategories = [
  'Entrepreneur',
  'Social / Creative',
  'Academics / Tutoring',
  'Gaming / Content',
  'Content Creator Tools',
  'Bonus',
] as const
