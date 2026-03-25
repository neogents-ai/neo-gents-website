import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import DigitalRain from '../components/DigitalRain'
import { personas } from '../data/personas'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojkdakj'

const PERK_ICONS = ['◆', '◈', '◉', '⬡', '◆', '◈']

const FALLBACK_PERKS = [
  'Full NORI access — AI system for families, students, and builders',
  '52+ ready-to-run templates across all 4 persona tracks',
  'Early access to every new tool NEO Gents ships',
  'Supporter-tier pricing on all paid services — permanently locked',
  'Direct line to Zeek — our AI agent trained on the full NEO Gents system',
  'Monthly intel drops — what\'s working in AI for real people right now',
]

export default function SupporterPage() {
  const location = useLocation()
  const trackParam = new URLSearchParams(location.search).get('track') ?? ''
  const activePersona = personas.find(p => p.id === trackParam) ?? null

  const headline = activePersona ? activePersona.codename : 'NORI'
  const perkTexts = activePersona ? activePersona.freePerks : FALLBACK_PERKS
  const perks = perkTexts.map((text, i) => ({ icon: PERK_ICONS[i % PERK_ICONS.length], text }))

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [track, setTrack] = useState(trackParam)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, track }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Email us directly at hello@neogents.io')
      }
    } catch {
      setError('Could not connect. Email us directly at hello@neogents.io')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <DigitalRain opacity={0.05} density={0.65} />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(212,160,23,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 50% 90%, rgba(30,13,61,0.4) 0%, transparent 60%), #0D0D0D',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pb-24">

        <section className="pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span className="font-mono text-xs text-green/70 tracking-[0.2em] uppercase">Free Access</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display font-800 text-5xl md:text-6xl text-light mb-4 leading-none"
          >
            Meet {headline}.
            <br />
            <span className="text-shimmer">No credit card.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-body text-sm text-muted max-w-md mx-auto"
          >
            NORI is the AI system we built for people Silicon Valley ignores. Supporters get free access — and stay inside as we build.
          </motion.p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <h2 className="font-display font-700 text-xs tracking-[0.25em] uppercase text-gold/60 mb-6">
              // What you get
            </h2>
            <ul className="space-y-4">
              {perks.map((perk, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-gold mt-0.5 text-sm">{perk.icon}</span>
                  <p className="font-body text-sm text-muted leading-relaxed">{perk.text}</p>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 p-4 border border-gold/15"
              style={{ background: 'rgba(212,160,23,0.04)' }}
            >
              <p className="font-mono text-xs text-gold/50 tracking-wider mb-1">// Why free?</p>
              <p className="font-body text-xs text-muted/70 leading-relaxed">
                We built this for the people most AI companies skip. Free access isn't a funnel trick — it's the mission. When you're ready to go deeper, we're here. Until then, use the tools.
              </p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-gold/30 text-center"
                style={{ background: 'rgba(212,160,23,0.04)' }}
              >
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-xl">◆</span>
                </div>
                <h3 className="font-display font-700 text-xl text-light mb-2">You're in.</h3>
                <p className="font-body text-sm text-muted">
                  Check your email. We'll send your access link within 24 hours. Welcome to NEO Gents.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 border border-gold/20"
                style={{ background: 'rgba(17,17,17,0.7)' }}
              >
                <h2 className="font-display font-700 text-lg text-light mb-6">Claim your free access</h2>

                <div className="space-y-4">
                  <div>
                    <label className="font-mono text-xs text-muted/60 tracking-widest uppercase block mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      placeholder="Your first name"
                      className="w-full bg-transparent border border-gold/20 px-3 py-2.5 font-body text-sm text-light placeholder-muted/40 outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted/60 tracking-widest uppercase block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-transparent border border-gold/20 px-3 py-2.5 font-body text-sm text-light placeholder-muted/40 outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted/60 tracking-widest uppercase block mb-1.5">
                      I'm a — (optional)
                    </label>
                    <select
                      value={track}
                      onChange={e => setTrack(e.target.value)}
                      className="w-full bg-surface border border-gold/20 px-3 py-2.5 font-body text-sm text-light outline-none focus:border-gold/50 transition-colors appearance-none"
                    >
                      <option value="">Select your track</option>
                      <option value="student">Student / early career</option>
                      <option value="parent">Parent / senior</option>
                      <option value="solopreneur">Solopreneur / small business</option>
                      <option value="creator">Creator / freelancer</option>
                    </select>
                  </div>

                  {error && (
                    <p className="font-body text-xs text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email || !name}
                    className="w-full py-3.5 bg-gold text-black font-display font-700 text-sm tracking-[0.12em] uppercase hover:bg-gold/90 transition-all disabled:opacity-40 relative overflow-hidden"
                  >
                    {loading ? (
                      <span className="font-mono text-xs">Sending...</span>
                    ) : (
                      'Get Free Access →'
                    )}
                  </button>

                  <p className="font-body text-xs text-muted/40 text-center">
                    No spam. No credit card. Unsubscribe anytime.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  )
}
