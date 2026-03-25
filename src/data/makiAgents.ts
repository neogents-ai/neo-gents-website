export interface MakiAgent {
  title: string
  desc: string
}

export type MakiPillar = 'Esports' | 'Health' | 'Finance' | 'Tech'

export const makiAgents: Record<MakiPillar, MakiAgent[]> = {
  Esports: [
    { title: 'Tournament Tracker', desc: 'Monitor brackets, schedules, and match results for any tournament you\'re competing in.' },
    { title: 'Team Finder Agent', desc: 'Matches you with teammates based on game, rank, playstyle, and availability.' },
    { title: 'Sponsor Outreach Agent', desc: 'Researches and drafts cold outreach to gaming sponsors — even with a small audience.' },
    { title: 'Stream Growth Agent', desc: 'Analyzes your stream data and gives a weekly action plan to grow faster.' },
    { title: 'Highlight Reel Editor', desc: 'Pulls your best moments from recordings and compiles them for clips or portfolios.' },
    { title: 'Gaming Intel Bot', desc: 'Delivers daily updates on patches, meta shifts, and esports news for your games.' },
  ],
  Health: [
    { title: 'Meal Prep Planner', desc: 'Builds weekly meal plans around your budget, goals, and what\'s actually in your fridge.' },
    { title: 'Workout Builder', desc: 'Creates a training plan based on your goals, equipment, and schedule — no gym required.' },
    { title: 'Mental Health Check-In', desc: 'Daily mood tracking with gentle prompts and resources when you need them.' },
    { title: 'Sleep Optimizer', desc: 'Analyzes your sleep patterns and gives actionable tips to recover harder.' },
    { title: 'Injury Prevention Guide', desc: 'Sport-specific mobility routines and warning signs to keep you in the game.' },
    { title: 'Hydration & Habit Tracker', desc: 'Tracks water intake, supplement timing, and daily habits that compound over time.' },
  ],
  Finance: [
    { title: 'Budget Tracker', desc: 'Categorizes your spending and shows exactly where your money goes each month.' },
    { title: 'Subscription Audit', desc: 'Finds every recurring charge you forgot about and flags ones to cancel.' },
    { title: 'Side Hustle Calculator', desc: 'Estimates real income potential for any hustle idea based on your time and skills.' },
    { title: 'Savings Goal Planner', desc: 'Reverse-engineers how long it takes to hit any savings goal at your current rate.' },
    { title: 'Tax Basics for Students', desc: 'Explains what taxes you owe on freelance or gig income — in plain English.' },
    { title: 'Investment Intro Agent', desc: 'Teaches compound interest, index funds, and Roth IRAs at your level — no jargon.' },
  ],
  Tech: [
    { title: 'Resume + GitHub Builder', desc: 'Writes a tech resume and GitHub README that gets you noticed for internships and jobs.' },
    { title: 'Code Explainer', desc: 'Paste any code snippet — it explains what it does, line by line, in plain English.' },
    { title: 'Freelance Dev Packager', desc: 'Turns your coding skills into a service offering with scope, pricing, and a proposal template.' },
    { title: 'API Project Starter', desc: 'Generates starter code and documentation for your next API project in any language.' },
    { title: 'Tech Job Tracker', desc: 'Monitors internship and entry-level postings in your stack and alerts you when they drop.' },
    { title: 'AI Tool Recommender', desc: 'Matches you to the best AI tools for your specific project — no more rabbit holes.' },
  ],
}

export const makiPillars: MakiPillar[] = ['Esports', 'Health', 'Finance', 'Tech']
