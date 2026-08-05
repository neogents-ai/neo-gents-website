import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { personas } from '../data/personas'
import { agents } from '../data/agents'
import DepthPersonaMenu from '../components/DepthPersonaMenu'
import FlowingLines from '../components/FlowingLines'
import SectionReveal from '../components/scroll/SectionReveal'
import ParallaxLayer from '../components/scroll/ParallaxLayer'
import HeroMascot3D from '../components/three/HeroMascot3D'
import Mascot3D from '../components/three/Mascot3D'
import WaitlistForm from '../components/WaitlistForm'

const sfs = personas.find(p => p.id === 'soulfood-sushi')!
const nori = personas.find(p => p.id === 'nori')!

/** Duplicated agent list for a seamless marquee loop */
const tickerAgents = [...agents.slice(0, 18), ...agents.slice(0, 18)]

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  const heroTextY = useTransform(heroProgress, [0, 1], [0, -120])
  const heroTextOpacity = useTransform(heroProgress, [0, 0.7], [1, 0])

  return (
    <div ref={pageRef} className="relative">
      {/* Global flowing-lines backdrop, slowest parallax layer */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <FlowingLines lineCount={18} opacity={1.0} />
      </div>

      {/* ── 1. HERO — 3D Nori, scroll-linked orbit ── */}
      <section ref={heroRef} className="relative min-h-[110vh] px-6" style={{ zIndex: 2 }}>
        <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center text-center">
          <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#00B359' }} />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/50">
                System Online — NEO Gents HQ
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-800 text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
            >
              <span className="block text-light">You already know</span>
              <span className="block text-shimmer mt-1">something's wrong.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-body text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed"
            >
              We built the way out.
            </motion.p>
          </motion.div>

          {/* Real 3D mascot — orbits as you scroll */}
          <HeroMascot3D
            modelUrl="/models/nori.glb"
            fallbackSrc="/nori-full.png"
            className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] mt-6"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted/40">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-gold/50"
            >
              ↓
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ── 2. PROBLEM — text reveals over parallax ── */}
      <section className="relative py-32 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal index={0}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold/60 mb-8">// The setup</p>
          </SectionReveal>
          <SectionReveal index={1}>
            <p className="font-display font-800 text-3xl md:text-5xl text-light leading-tight mb-6">
              Kids are handed <span className="text-gold">$60,000 of debt</span> for a world that already moved on.
            </p>
          </SectionReveal>
          <SectionReveal index={2}>
            <p className="font-display font-800 text-3xl md:text-5xl text-light leading-tight mb-6">
              Businesses lose to competitors who <span className="text-green">automated last year</span>.
            </p>
          </SectionReveal>
          <SectionReveal index={3}>
            <p className="font-body text-lg text-muted max-w-xl mx-auto">
              Two problems. One system. Pick your door.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── 3. THE FORK — two doors ── */}
      <section className="relative py-16 px-6 max-w-6xl mx-auto w-full" style={{ zIndex: 2 }}>
        <SectionReveal amount={0.2}>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold/60 mb-10 text-center">// Choose your track</p>
        </SectionReveal>
        <DepthPersonaMenu personas={personas} />
      </section>

      {/* ── 4. SFS CHAPTER — heartwarming skip-college-debt ── */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ zIndex: 2 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${sfs.glowColor} 0%, transparent 70%)` }}
        />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <ParallaxLayer speed={0.85} className="order-2 lg:order-1">
            <div className="relative flex items-center justify-center">
              <Mascot3D
                modelUrl="/models/maki.glb"
                fallbackSrc="/maki-full.png"
                alt="M.A.K.I. — the Soulfood Sushi kid coach"
                glow="rgba(212,160,23,0.35)"
                autoRotate
                className="w-[300px] h-[340px] md:w-[400px] md:h-[440px]"
              />
            </div>
          </ParallaxLayer>

          <div className="order-1 lg:order-2">
            <SectionReveal index={0}>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: sfs.accentColor }}>
                // Track 01 — Soulfood Sushi
              </p>
            </SectionReveal>
            <SectionReveal index={1}>
              <h2 className="font-display font-800 text-4xl md:text-6xl leading-none tracking-tight mb-6">
                <span className="block text-light">Skip the college debt.</span>
                <span className="block mt-1" style={{ color: sfs.accentColor }}>Keep the dream.</span>
              </h2>
            </SectionReveal>
            <SectionReveal index={2}>
              <p className="font-body text-base text-muted leading-relaxed mb-4 max-w-lg">
                While other families sign loan papers, yours builds something that pays.
                Your kid levels up through daily quests — study, health, money, tech —
                and you watch every step from your own dashboard.
              </p>
              <p className="font-body text-base text-muted/80 leading-relaxed mb-8 max-w-lg">
                Dinner-table pride instead of loan statements. The first generation that doesn't owe.
              </p>
            </SectionReveal>
            <SectionReveal index={3}>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Ranks E → S', 'Daily quest loop', 'Weekly Life Audit for parents', '52 AI skill templates'].map(chip => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 font-mono text-[10px] border"
                    style={{ borderColor: `${sfs.accentColor}30`, color: `${sfs.accentColor}CC`, background: `${sfs.accentColor}08` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <Link
                to="/soulfood-sushi"
                className="inline-block px-8 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: sfs.accentColor }}
              >
                See the family track →
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── 5. NORI CHAPTER — agent ticker ── */}
      <section className="relative py-32 overflow-hidden" style={{ zIndex: 2 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${nori.glowColor} 0%, transparent 70%)` }}
        />
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <SectionReveal index={0}>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: nori.accentColor }}>
                // Track 02 — Nori
              </p>
            </SectionReveal>
            <SectionReveal index={1}>
              <h2 className="font-display font-800 text-4xl md:text-6xl leading-none tracking-tight mb-6">
                <span className="block text-light">{nori.headline}</span>
                <span className="block mt-1" style={{ color: nori.accentColor }}>{nori.subhead}</span>
              </h2>
            </SectionReveal>
            <SectionReveal index={2}>
              <p className="font-body text-base text-muted leading-relaxed mb-8 max-w-lg">
                {nori.hookSub}
              </p>
              <Link
                to="/nori"
                className="inline-block px-8 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: nori.accentColor }}
              >
                See the business track →
              </Link>
            </SectionReveal>
          </div>
          <ParallaxLayer speed={0.85}>
            <div className="flex items-center justify-center">
              <Mascot3D
                modelUrl="/models/nori.glb"
                fallbackSrc="/nori-full.png"
                alt="N.O.R.I. — the AI operations commander"
                glow="rgba(0,179,89,0.35)"
                autoRotate
                className="w-[300px] h-[340px] md:w-[400px] md:h-[440px]"
              />
            </div>
          </ParallaxLayer>
        </div>

        {/* Agent marquee — living proof of the library */}
        <div className="relative border-y border-green/10 py-4 overflow-hidden">
          <div className="flex gap-3 animate-ticker w-max">
            {tickerAgents.map((a, i) => (
              <span
                key={`${a.name}-${i}`}
                className="px-4 py-2 font-mono text-xs whitespace-nowrap border border-green/15 text-muted/70"
                style={{ background: 'rgba(0,179,89,0.04)' }}
              >
                {a.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FUNNEL STRIP — 3 steps ── */}
      <section className="relative py-32 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal index={0}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold/60 mb-4">// How it works</p>
            <h2 className="font-display font-800 text-3xl md:text-5xl text-light mb-16">
              No demos. No pressure. <span className="text-gold">One path in.</span>
            </h2>
          </SectionReveal>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              ['01', 'Join the waitlist', 'Tell us who you are and what\'s in the way. That\'s it.'],
              ['02', '30-min intro session', 'We find the one bottleneck worth fixing first.'],
              ['03', '14-day free trial', 'The system runs. You watch it work. No card.'],
            ].map(([num, title, desc], i) => (
              <SectionReveal key={num} index={i + 1}>
                <div className="p-8 border border-gold/15 h-full relative" style={{ background: 'rgba(17,17,17,0.6)' }}>
                  <span className="font-mono text-3xl text-gold/30">{num}</span>
                  <p className="font-display font-700 text-lg text-light mt-3 mb-2">{title}</p>
                  <p className="font-body text-sm text-muted/80 leading-relaxed">{desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WAITLIST CTA ── */}
      <section className="relative py-24 px-6" style={{ zIndex: 2 }}>
        <div className="max-w-2xl mx-auto">
          <SectionReveal index={0}>
            <h2 className="font-display font-800 text-3xl md:text-5xl text-light text-center mb-3">
              The next cohort is forming.
            </h2>
            <p className="font-body text-base text-muted text-center mb-12">
              Two tracks, limited seats, zero pitch decks.
            </p>
          </SectionReveal>
          <SectionReveal index={1} amount={0.2}>
            <div className="p-6 md:p-8 border border-gold/15" style={{ background: 'rgba(17,17,17,0.7)' }}>
              <WaitlistForm />
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
