import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DigitalRain from '../components/DigitalRain'

const personas = [
  {
    id: 'students',
    label: 'Students',
    hook: 'Skip the debt.\nBuild real skills.\nGet paid.',
    subtext: 'AI tools that outperform a $60K degree.',
    icon: '⬡',
    color: '#D4A017',
    glowColor: 'rgba(212, 160, 23, 0.3)',
    route: '/students',
    stat: '52 ready-to-run templates',
  },
  {
    id: 'parents',
    label: 'Parents',
    hook: 'AI isn\'t leaving\nyou behind.\nWe won\'t either.',
    subtext: 'Generational wealth tools built for families.',
    icon: '◈',
    color: '#3A1A6E',
    glowColor: 'rgba(58, 26, 110, 0.6)',
    route: '/parents',
    stat: 'Family CFO system included',
  },
  {
    id: 'solopreneur',
    label: 'Solopreneur',
    hook: 'Your competitors\nare already\nautomating.',
    subtext: 'Are you?',
    icon: '◆',
    color: '#00B359',
    glowColor: 'rgba(0, 179, 89, 0.25)',
    route: '/solopreneur',
    stat: '70+ agent packages available',
  },
  {
    id: 'creators',
    label: 'Creators',
    hook: 'Stop posting\ninto the void.\nClone yourself.',
    subtext: 'At scale.',
    icon: '◉',
    color: '#D4A017',
    glowColor: 'rgba(212, 160, 23, 0.2)',
    route: '/creators',
    stat: 'Trinity content pipeline',
  },
]

function HologramFigure({ persona, index }: { persona: typeof personas[0]; index: number }) {
  const navigate = useNavigate()
  const delays = [0, 0.15, 0.3, 0.45]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8 + delays[index], ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(persona.route)}
      className="relative cursor-pointer group flex flex-col items-center"
      style={{ animationDelay: `${delays[index]}s` }}
    >
      {/* Hologram pedestal */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed opacity-20"
          style={{ borderColor: persona.color, margin: '-16px' }}
        />

        {/* Mid ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border opacity-15"
          style={{ borderColor: persona.color, margin: '-8px' }}
        />

        {/* Core hologram body */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-36 h-44 md:w-44 md:h-52 flex flex-col items-center justify-center"
          style={{ filter: `drop-shadow(0 0 16px ${persona.glowColor}) drop-shadow(0 0 40px ${persona.glowColor})` }}
        >
          {/* Holographic silhouette */}
          <div
            className="relative w-28 h-36 md:w-36 md:h-44 overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${persona.color}15 0%, ${persona.color}05 60%, transparent 100%)`,
              border: `1px solid ${persona.color}30`,
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
            }}
          >
            {/* Scan lines overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${persona.color}10 3px, ${persona.color}10 4px)`,
              }}
            />

            {/* Icon center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-5xl md:text-6xl select-none"
                style={{ color: persona.color, opacity: 0.7 }}
              >
                {persona.icon}
              </span>
            </div>

            {/* Hologram shimmer sweep */}
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.7 }}
              className="absolute left-0 right-0 h-8 opacity-20"
              style={{
                background: `linear-gradient(180deg, transparent, ${persona.color}60, transparent)`,
              }}
            />

            {/* Corner accents */}
            {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3`}>
                <div
                  className="absolute top-0 left-0 w-full h-px"
                  style={{ backgroundColor: persona.color, opacity: 0.8 }}
                />
                <div
                  className="absolute top-0 left-0 h-full w-px"
                  style={{ backgroundColor: persona.color, opacity: 0.8 }}
                />
              </div>
            ))}
          </div>

          {/* Stat badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + delays[index] }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 text-xs font-mono"
            style={{
              color: persona.color,
              border: `1px solid ${persona.color}30`,
              backgroundColor: `${persona.color}08`,
              fontSize: '9px',
              letterSpacing: '0.08em',
            }}
          >
            {persona.stat}
          </motion.div>
        </motion.div>

        {/* Base platform */}
        <div
          className="mt-8 w-full h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${persona.color}60, transparent)`,
          }}
        />
        <div
          className="mt-0.5 mx-auto w-3/4 h-px opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${persona.color}40, transparent)`,
          }}
        />
      </div>

      {/* Label + hook */}
      <div className="mt-10 text-center">
        <p
          className="font-display font-700 text-sm tracking-[0.25em] uppercase mb-3"
          style={{ color: persona.color }}
        >
          {persona.label}
        </p>
        <p className="font-body text-xs text-muted whitespace-pre-line leading-relaxed max-w-[140px]">
          {persona.hook}
        </p>
      </div>

      {/* Hover enter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: persona.color }}>
          ENTER
        </span>
        <span style={{ color: persona.color }}>→</span>
      </motion.div>
    </motion.div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Digital rain background */}
      <div className="fixed inset-0 pointer-events-none">
        <DigitalRain opacity={0.055} density={0.75} />
      </div>

      {/* Deep HQ atmosphere — radial gradient layers */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(30, 13, 61, 0.5) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 100%, rgba(212, 160, 23, 0.04) 0%, transparent 60%),
            linear-gradient(180deg, #0D0D0D 0%, #0A0514 40%, #0D0D0D 100%)
          `,
        }}
      />

      {/* Grid floor lines */}
      <div
        className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(212,160,23,0.15) 1px, transparent 1px),
            linear-gradient(0deg, rgba(212,160,23,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
          transform: 'perspective(400px) rotateX(30deg)',
          transformOrigin: 'bottom center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* ── HERO ── */}
        <section className="pt-28 pb-8 text-center">
          {/* System status line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span className="font-mono text-xs text-green/60 tracking-[0.2em] uppercase">
              NEO GENTS HQ — SYSTEM ONLINE
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
          >
            <span className="block text-light">You already know</span>
            <span className="block text-shimmer mt-1">something's wrong.</span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-muted max-w-xl mx-auto mb-4 leading-relaxed"
          >
            We built the way out.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="font-body text-sm text-muted/60 max-w-lg mx-auto"
          >
            Pain-point-first AI consultancy. We audit your bottlenecks, install AI teams, and stack solutions — for businesses, students, and families Silicon Valley ignores.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <button
              onClick={() => navigate('/supporter')}
              className="px-8 py-3 bg-gold text-black font-display font-700 text-sm tracking-[0.12em] uppercase hover:bg-gold/90 transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10">Try the OS Free →</span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-3 border border-gold/30 text-gold font-body text-sm tracking-[0.12em] uppercase hover:border-gold/60 hover:bg-gold/5 transition-all duration-200"
            >
              View Pricing
            </button>
          </motion.div>
        </section>

        {/* ── THE LAB ── */}
        <section className="py-16">
          {/* Lab header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/30" />
              <span className="font-mono text-xs text-gold/50 tracking-[0.3em] uppercase">
                // THE LAB
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/30" />
            </div>
            <p className="font-body text-sm text-muted/60 tracking-wider">
              Select your identity. We built this for you.
            </p>
          </motion.div>

          {/* Hologram grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 place-items-center">
            {personas.map((persona, i) => (
              <HologramFigure key={persona.id} persona={persona} index={i} />
            ))}
          </div>
        </section>

        {/* ── MISSION STRIP ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 border-t border-gold/10"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Audit', desc: 'We map every bottleneck costing you time and money.' },
              { label: 'Install', desc: 'We deploy AI agent teams that work 24/7, no days off.' },
              { label: 'Stack', desc: 'We layer solutions until the operation runs itself.' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6 border border-gold/10 hover:border-gold/25 transition-colors duration-300 group"
              >
                <div className="font-display font-700 text-3xl text-gold mb-2 group-hover:text-shimmer transition-all">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-display font-700 text-lg text-light tracking-wide mb-3">
                  {item.label}
                </div>
                <p className="font-body text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── FREE FUNNEL STRIP ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-12 mb-8 text-center border border-gold/15 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(30,13,61,0.3) 0%, rgba(13,13,13,0.8) 50%, rgba(212,160,23,0.04) 100%)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <h2 className="font-display font-800 text-3xl md:text-4xl text-light mb-3">
            See what's possible{' '}
            <span className="text-gold">before you spend a dollar.</span>
          </h2>
          <p className="font-body text-sm text-muted mb-8 max-w-md mx-auto">
            Get inside the SFS-OS — our AI operating system for families, students, and builders. Free access. Real results.
          </p>
          <button
            onClick={() => navigate('/supporter')}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-black font-display font-700 text-sm tracking-[0.15em] uppercase hover:bg-gold/90 transition-colors"
          >
            Access the OS Free
            <span className="text-green font-mono">→</span>
          </button>
        </motion.section>

      </div>
    </div>
  )
}
