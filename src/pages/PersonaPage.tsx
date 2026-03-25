import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { type PersonaConfig } from '../data/personas'
import DigitalRain from '../components/DigitalRain'
import ZeekChat from '../components/ZeekChat'
import FlipCard from '../components/FlipCard'

interface Props {
  persona: PersonaConfig
}

export default function PersonaPage({ persona }: Props) {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <DigitalRain opacity={0.04} density={0.6} />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 0%, ${persona.glowColor} 0%, transparent 70%), linear-gradient(180deg, #0D0D0D 0%, #0A0514 50%, #0D0D0D 100%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24">

        {/* ── HERO ── */}
        <section className="pt-20 pb-16">
          {/* Breadcrumb */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted hover:text-gold transition-colors mb-8 font-mono text-xs tracking-widest uppercase"
          >
            ← Back to HQ
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Label tag */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 px-3 py-1 border mb-6"
                style={{ borderColor: `${persona.accentColor}40`, color: persona.accentColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: persona.accentColor }} />
                <span className="font-mono text-xs tracking-[0.2em] uppercase">{persona.id}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-800 text-4xl md:text-6xl leading-none tracking-tight mb-3"
              >
                <span className="block text-light">{persona.headline}</span>
                <span className="block mt-1" style={{ color: persona.accentColor }}>
                  {persona.subhead}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="font-body text-base text-muted leading-relaxed mb-2 max-w-lg"
              >
                {persona.hook}
              </motion.p>

              {persona.hookSub && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="font-body text-sm text-muted/70 leading-relaxed max-w-lg"
                >
                  {persona.hookSub}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex gap-3 mt-8"
              >
                <button
                  onClick={() => navigate('/supporter')}
                  className="px-6 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: persona.accentColor }}
                >
                  Get Started Free →
                </button>
                <button
                  onClick={() => navigate('/pricing')}
                  className="px-6 py-3 border font-body text-sm tracking-[0.1em] uppercase text-muted hover:text-light transition-all duration-200"
                  style={{ borderColor: `${persona.accentColor}30` }}
                >
                  Pricing
                </button>
              </motion.div>
            </div>

            {/* Hologram accent — right side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-64 h-64">
                {/* Outer rings */}
                {[1, 0.6, 0.35].map((scale, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: `${persona.accentColor}${i === 0 ? '20' : i === 1 ? '15' : '30'}`,
                      transform: `scale(${scale})`,
                      top: `${(1 - scale) * 50}%`,
                      left: `${(1 - scale) * 50}%`,
                      width: `${scale * 100}%`,
                      height: `${scale * 100}%`,
                    }}
                  />
                ))}
                {/* Center */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ filter: `drop-shadow(0 0 24px ${persona.glowColor})` }}
                >
                  <div
                    className="w-32 h-32 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${persona.accentColor}15, ${persona.accentColor}05)`,
                      border: `1px solid ${persona.accentColor}30`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  >
                    <span className="font-display font-800 text-4xl" style={{ color: persona.accentColor, opacity: 0.7 }}>
                      {persona.id[0].toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-12 border-t border-gold/10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-700 text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: persona.accentColor }}
          >
            // What you get
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {persona.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 border border-gold/10 hover:border-gold/25 transition-all duration-300 group"
                style={{
                  background: 'rgba(17,17,17,0.6)',
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5" style={{ color: persona.accentColor }}>
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-display font-700 text-sm text-light mb-1 group-hover:text-shimmer transition-all">
                      {f.title}
                    </h3>
                    <p className="font-body text-xs text-muted leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TEMPLATE GALLERY ── */}
        <section className="py-12 border-t border-gold/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="font-display font-700 text-xs tracking-[0.3em] uppercase" style={{ color: persona.accentColor }}>
              // Start here — templates
            </h2>
            <span className="font-mono text-xs text-muted/40">52 available</span>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {persona.templates.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <FlipCard
                  title={t.title}
                  desc={t.desc}
                  agentName="NEO Gents AI"
                  agentDesc="Our agent team handles the heavy lifting — you just show up and use the result."
                  accentColor={persona.accentColor}
                />
              </motion.div>
            ))}

            {/* View all card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
              onClick={() => navigate('/supporter')}
              className="p-4 border border-dashed border-gold/20 hover:border-gold/40 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center gap-2"
              style={{ background: 'rgba(212,160,23,0.03)' }}
            >
              <span className="font-mono text-2xl text-gold/40">+48</span>
              <span className="font-body text-xs text-muted">more templates</span>
              <span className="font-mono text-xs text-gold/60">Get free access →</span>
            </motion.div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-10 text-center border border-gold/15 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${persona.glowColor} 0%, rgba(13,13,13,0.9) 100%)` }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <p className="font-display font-800 text-2xl text-light mb-2">Ready to start?</p>
          <p className="font-body text-sm text-muted mb-6">Access everything free. No credit card.</p>
          <button
            onClick={() => navigate('/supporter')}
            className="px-8 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black hover:opacity-90 transition-opacity"
            style={{ backgroundColor: persona.accentColor }}
          >
            Try NORI Free →
          </button>
        </motion.section>

      </div>

      {/* Zeek Chat */}
      <ZeekChat persona={persona.zeekPersona} opener={persona.zeekOpener} accentColor={persona.accentColor} />
    </div>
  )
}
