import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Same Formspree endpoint the Supporter form already uses — one inbox for all leads
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojkdakj'

export type WaitlistProfile = 'soulfood-sushi' | 'nori'

interface Props {
  /** Preselect a buyer profile when embedded on a profile page */
  defaultProfile?: WaitlistProfile
  accentColor?: string
}

// Intake questions double as lead-scoring signals (GTM: gauge upsell from questions)
const ROLES = [
  { value: 'parent', label: 'Parent / guardian' },
  { value: 'student', label: 'Student (13–18)' },
  { value: 'business', label: 'Business owner / operator' },
  { value: 'creator', label: 'Creator' },
  { value: 'school', label: 'School / organization' },
]

const TIMELINES = [
  { value: 'now', label: 'Ready now' },
  { value: '30d', label: 'Within 30 days' },
  { value: 'exploring', label: 'Just exploring' },
]

export default function WaitlistForm({ defaultProfile, accentColor = '#D4A017' }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState<WaitlistProfile>(defaultProfile ?? 'soulfood-sushi')
  const [role, setRole] = useState('')
  const [bottleneck, setBottleneck] = useState('')
  const [timeline, setTimeline] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    setStatus('sending')
    const payload = {
      name,
      email,
      profile,
      role,
      bottleneck,
      timeline,
      source: window.location.pathname,
      _subject: `Cohort waitlist — ${profile} — ${name}`,
    }
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) throw new Error('formspree error')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 border text-center"
        style={{ borderColor: `${accentColor}40`, background: `${accentColor}08` }}
      >
        <p className="font-display font-800 text-2xl text-light mb-2">You're on the list.</p>
        <p className="font-body text-sm text-muted mb-6">
          Next step: grab your 30-minute intro session — that's where the 14-day trial starts.
        </p>
        <Link
          to="/intro-session"
          className="inline-block px-8 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black hover:opacity-90 transition-opacity"
          style={{ backgroundColor: accentColor }}
        >
          Book my intro session →
        </Link>
      </motion.div>
    )
  }

  const inputCls =
    'w-full px-4 py-2.5 bg-transparent border border-gold/20 focus:border-gold/50 outline-none font-body text-sm text-light placeholder:text-muted/40 transition-colors'

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input className={inputCls} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
        <input className={inputCls} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>

      {/* Profile toggle */}
      <div className="flex gap-2">
        {([
          ['soulfood-sushi', 'Soulfood Sushi — family'],
          ['nori', 'Nori — business / creator'],
        ] as [WaitlistProfile, string][]).map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => setProfile(val)}
            className={`flex-1 px-3 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase border transition-all duration-200 ${
              profile === val ? 'text-black' : 'border-gold/20 text-muted hover:border-gold/40'
            }`}
            style={profile === val ? { backgroundColor: val === 'nori' ? '#00B359' : '#D4A017', borderColor: 'transparent' } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      <select className={inputCls} value={role} onChange={e => setRole(e.target.value)} required>
        <option value="" disabled>Which best describes you?</option>
        {ROLES.map(r => <option key={r.value} value={r.value} className="bg-black">{r.label}</option>)}
      </select>

      <input
        className={inputCls}
        placeholder={profile === 'nori' ? 'Biggest bottleneck in your business right now?' : "What's the biggest thing standing between your family and the plan?"}
        value={bottleneck}
        onChange={e => setBottleneck(e.target.value)}
      />

      <select className={inputCls} value={timeline} onChange={e => setTimeline(e.target.value)} required>
        <option value="" disabled>When do you want to start?</option>
        {TIMELINES.map(t => <option key={t.value} value={t.value} className="bg-black">{t.label}</option>)}
      </select>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-8 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {status === 'sending' ? 'Joining…' : 'Join the cohort waitlist →'}
      </button>
      {status === 'error' && (
        <p className="font-body text-xs text-red-400">Something broke — email us at npcneogents@gmail.com and we'll add you by hand.</p>
      )}
      <p className="font-mono text-[10px] text-muted/40 tracking-wide">
        Waitlist → 30-min intro session → 14-day free trial. No card required.
      </p>
    </form>
  )
}
