import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { type PersonaConfig } from '../data/personas'
import { youthTemplates, youthCategories } from '../data/youthTemplates'
import { makiAgents, makiPillars, type MakiPillar } from '../data/makiAgents'
import DigitalRain from '../components/DigitalRain'
import FlowingLines from '../components/FlowingLines'
import ZeekChat from '../components/ZeekChat'
import FlipCard from '../components/FlipCard'
import PersonaSprite from '../components/PersonaSprite'
import CharacterShowcase from '../components/CharacterShowcase'

interface Props {
  persona: PersonaConfig
}

function ctaLabel(): string {
  return 'Join the Cohort Waitlist →'
}

export default function PersonaPage({ persona }: Props) {
  const navigate = useNavigate()
  const [activePillar, setActivePillar] = useState<MakiPillar>('Esports')
  const [activeYouthCat, setActiveYouthCat] = useState<string>(youthCategories[0])

  const supporterUrl = `/waitlist?profile=${persona.id === 'nori' ? 'nori' : 'soulfood-sushi'}`

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <DigitalRain opacity={0.04} density={0.6} />
        <FlowingLines dominantColor={persona.accentColor} opacity={0.55} lineCount={12} />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 0%, ${persona.glowColor} 0%, transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #050505 50%, #0a0a0a 100%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24">

        {/* ── HERO ── */}
        <section className="pt-20 pb-16">
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
                  onClick={() => navigate(supporterUrl)}
                  className="px-6 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: persona.accentColor }}
                >
                  Join the Cohort →
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

            {/* Hologram emblem — right side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <PersonaSprite persona={persona} size={180} hovered={false} index={0} />
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
                style={{ background: 'rgba(30,35,44,0.8)' }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5" style={{ color: persona.accentColor }}>{f.icon}</span>
                  <div>
                    <h3 className="font-display font-700 text-sm text-light mb-1 group-hover:text-shimmer transition-all">{f.title}</h3>
                    <p className="font-body text-xs text-muted leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── AUDIENCE SUB-SECTIONS (kids→parents / businesses→creators) ── */}
        {persona.audiences?.map((aud, ai) => (
          <section key={aud.id} className="py-12 border-t border-gold/10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="font-display font-700 text-xs tracking-[0.3em] uppercase" style={{ color: persona.accentColor }}>
                // {aud.label}
              </h2>
              <span className="font-mono text-xs text-muted/40">{String(ai + 1).padStart(2, '0')}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-700 text-xl md:text-2xl text-light mb-2 max-w-2xl"
            >
              {aud.hook}
            </motion.p>
            {aud.hookSub && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-body text-sm text-muted/80 mb-8 max-w-2xl"
              >
                {aud.hookSub}
              </motion.p>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {aud.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 border border-gold/10 hover:border-gold/25 transition-all duration-300 group"
                  style={{ background: 'rgba(30,35,44,0.8)' }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5" style={{ color: persona.accentColor }}>{f.icon}</span>
                    <div>
                      <h3 className="font-display font-700 text-sm text-light mb-1 group-hover:text-shimmer transition-all">{f.title}</h3>
                      <p className="font-body text-xs text-muted leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {aud.perks.map(perk => (
                <span
                  key={perk}
                  className="px-3 py-1.5 font-mono text-[10px] border text-muted/70"
                  style={{ borderColor: `${persona.accentColor}20`, background: `${persona.accentColor}06` }}
                >
                  {perk}
                </span>
              ))}
            </div>
          </section>
        ))}

        {/* ── CHARACTER SHOWCASE ── */}
        <section className="py-12 border-t border-gold/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="font-display font-700 text-xs tracking-[0.3em] uppercase" style={{ color: persona.accentColor }}>
              // Meet {persona.characterName ?? persona.codename}
            </h2>
            <span className="font-mono text-xs text-muted/40">
              Your AI companion
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-body text-base text-muted leading-relaxed mb-4"
              >
                {persona.hook}
              </motion.p>
              {persona.hookSub && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-body text-sm text-muted/70 leading-relaxed"
                >
                  {persona.hookSub}
                </motion.p>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <CharacterShowcase persona={persona} />
            </div>
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
            <span className="font-mono text-xs text-muted/40">
              {persona.showAllTemplates ? '52 available' : '52+ available'}
            </span>
          </motion.div>

          {persona.showAllTemplates ? (
            /* ── FULL 52 (students + parents) ── */
            <>
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {youthCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveYouthCat(cat)}
                    className="px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200 border"
                    style={{
                      borderColor: activeYouthCat === cat ? persona.accentColor : `${persona.accentColor}25`,
                      color: activeYouthCat === cat ? persona.accentColor : 'rgba(200,200,200,0.4)',
                      background: activeYouthCat === cat ? `${persona.accentColor}10` : 'transparent',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {youthTemplates
                  .filter(t => t.category === activeYouthCat)
                  .map((t, i) => (
                    <motion.div
                      key={t.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <FlipCard
                        title={t.title}
                        desc={t.desc}
                        agentName={t.cta === 'learn' ? 'NEO Gents Team' : 'NEO Gents AI'}
                        agentDesc={t.cta === 'learn' ? 'Apply or learn more about this opportunity.' : 'Our agent team handles the heavy lifting — you just show up and use the result.'}
                        accentColor={persona.accentColor}
                        ctaLabel={t.cta === 'learn' ? 'Learn More →' : 'Book a Demo →'}
                        ctaHref={supporterUrl}
                      />
                    </motion.div>
                  ))}
              </div>
            </>
          ) : (
            /* ── 4 + MORE CARD (solopreneur / creators) ── */
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

              {/* +48 more card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28 }}
                className="p-4 border border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center gap-3"
                style={{
                  borderColor: `${persona.accentColor}25`,
                  background: `${persona.accentColor}05`,
                }}
              >
                <span className="font-mono text-2xl" style={{ color: `${persona.accentColor}60` }}>+48</span>
                <span className="font-body text-xs text-muted">more templates</span>

                {persona.id === 'creators' ? (
                  /* Creators — two buttons */
                  <div className="flex flex-col gap-2 w-full mt-1">
                    <button
                      onClick={() => navigate(supporterUrl)}
                      className="w-full px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-black hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: persona.accentColor }}
                    >
                      Get Free Access →
                    </button>
                    <button
                      onClick={() => navigate('/intro-session')}
                      className="w-full px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase border hover:opacity-80 transition-opacity"
                      style={{ borderColor: `${persona.accentColor}50`, color: persona.accentColor }}
                    >
                      Book a 30-min Intro →
                    </button>
                  </div>
                ) : (
                  /* N.O.R.I. — consultation only */
                  <button
                    onClick={() => navigate('/intro-session')}
                    className="w-full px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase border hover:opacity-80 transition-opacity"
                    style={{ borderColor: `${persona.accentColor}50`, color: persona.accentColor }}
                  >
                    Book a 30-min Intro →
                  </button>
                )}
              </motion.div>
            </div>
          )}
        </section>

        {/* ── MAKI AGENT LIBRARY (students only) ── */}
        {persona.showMakiAgents && (
          <section className="py-12 border-t border-gold/10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="font-display font-700 text-xs tracking-[0.3em] uppercase" style={{ color: persona.accentColor }}>
                // M.A.K.I. Agent Library
              </h2>
              <span className="font-mono text-xs text-muted/40">Esports · Health · Finance · Tech</span>
            </motion.div>

            {/* Pillar tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {makiPillars.map(pillar => (
                <button
                  key={pillar}
                  onClick={() => setActivePillar(pillar)}
                  className="px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200 border"
                  style={{
                    borderColor: activePillar === pillar ? persona.accentColor : `${persona.accentColor}25`,
                    color: activePillar === pillar ? persona.accentColor : 'rgba(200,200,200,0.4)',
                    background: activePillar === pillar ? `${persona.accentColor}10` : 'transparent',
                  }}
                >
                  {pillar}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {makiAgents[activePillar].map((agent, i) => (
                <motion.div
                  key={agent.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 border border-gold/10 hover:border-gold/25 transition-all duration-300 group"
                  style={{ background: 'rgba(30,35,44,0.8)' }}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs mt-0.5" style={{ color: `${persona.accentColor}70` }}>◆</span>
                    <div>
                      <h3 className="font-display font-700 text-sm text-light mb-1 group-hover:text-shimmer transition-all">
                        {agent.title}
                      </h3>
                      <p className="font-body text-xs text-muted leading-relaxed">{agent.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA STRIP ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-10 text-center border border-gold/15 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${persona.glowColor} 0%, rgba(22,27,34,0.92) 100%)` }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <p className="font-display font-800 text-2xl text-light mb-2">Ready to start?</p>
          <p className="font-body text-sm text-muted mb-6">Waitlist → 30-min intro session → 14-day free trial. No credit card.</p>
          <button
            onClick={() => navigate(supporterUrl)}
            className="px-8 py-3 font-display font-700 text-sm tracking-[0.12em] uppercase text-black hover:opacity-90 transition-opacity"
            style={{ backgroundColor: persona.accentColor }}
          >
            {ctaLabel()}
          </button>
        </motion.section>

      </div>

      <ZeekChat persona={persona.zeekPersona} opener={persona.zeekOpener} accentColor={persona.accentColor} />
    </div>
  )
}
