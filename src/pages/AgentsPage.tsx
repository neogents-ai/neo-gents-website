import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { agents, stacks, CATEGORY_COLORS, type AgentCategory } from '../data/agents'
import DigitalRain from '../components/DigitalRain'

const CATEGORIES: AgentCategory[] = ['Ops', 'Sales', 'Content', 'Support', 'Finance', 'Research', 'Creators']

export default function AgentsPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<AgentCategory | 'All'>('All')

  const filtered = activeCategory === 'All' ? agents : agents.filter((a) => a.category === activeCategory)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <DigitalRain opacity={0.04} density={0.5} />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0A0514 50%, #0D0D0D 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24">

        {/* ── HEADER ── */}
        <section className="pt-20 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span className="font-mono text-xs text-green/60 tracking-[0.2em] uppercase">
              70+ AGENTS — ALL BUILDABLE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-4xl md:text-6xl text-light leading-none tracking-tight mb-4"
          >
            The Agent Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-body text-base text-muted max-w-xl mx-auto mb-8"
          >
            Every agent below is a real, buildable system. We audit your bottlenecks and match you to the ones that matter.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            onClick={() => navigate('/supporter')}
            className="px-8 py-3 bg-gold text-black font-display font-700 text-sm tracking-[0.12em] uppercase hover:bg-gold/90 transition-colors"
          >
            Book a free audit — we'll build your stack →
          </motion.button>
        </section>

        {/* ── INDIVIDUAL AGENTS ── */}
        <section className="py-8 border-t border-gold/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-700 text-xs tracking-[0.3em] uppercase text-gold">
              // Individual Agents
            </h2>
            <span className="font-mono text-xs text-muted/40">{filtered.length} agents</span>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-1 font-mono text-xs tracking-widest uppercase border transition-all duration-200 ${
                activeCategory === 'All'
                  ? 'border-gold text-gold bg-gold/10'
                  : 'border-gold/20 text-muted hover:border-gold/40'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 font-mono text-xs tracking-widest uppercase border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'text-black'
                    : 'border-gold/20 text-muted hover:border-gold/40'
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: CATEGORY_COLORS[cat], borderColor: CATEGORY_COLORS[cat] }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="p-4 border border-gold/10 hover:border-gold/30 transition-all duration-200 group"
                style={{ background: 'rgba(17,17,17,0.5)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[agent.category] }}
                  />
                  <div>
                    <h3 className="font-display font-700 text-xs text-light mb-1 group-hover:text-shimmer transition-all">
                      {agent.name}
                    </h3>
                    <p className="font-body text-xs text-muted/70 leading-relaxed">{agent.desc}</p>
                    <span
                      className="inline-block mt-2 font-mono text-xs opacity-50"
                      style={{ color: CATEGORY_COLORS[agent.category] }}
                    >
                      {agent.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/supporter')}
                  className="mt-3 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: CATEGORY_COLORS[agent.category] }}
                >
                  Get this agent →
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── MULTI-AGENT STACKS ── */}
        <section className="py-12 border-t border-gold/10 mt-8">
          <h2 className="font-display font-700 text-xs tracking-[0.3em] uppercase text-gold mb-8">
            // Multi-Agent Stacks
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {stacks.map((stack, i) => (
              <motion.div
                key={stack.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 border border-gold/15 hover:border-gold/35 transition-all duration-300 group relative overflow-hidden"
                style={{ background: 'rgba(17,17,17,0.6)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-700 text-base text-light group-hover:text-shimmer transition-all">
                    {stack.name}
                  </h3>
                  <span className="font-mono text-xs text-gold/60 whitespace-nowrap ml-4">{stack.price}</span>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed mb-4">{stack.desc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {stack.agents.map((a) => (
                    <span
                      key={a}
                      className="px-2 py-0.5 font-mono text-xs border border-gold/15 text-muted/60"
                      style={{ background: 'rgba(212,160,23,0.04)' }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/supporter')}
                  className="font-mono text-xs text-gold/60 hover:text-gold transition-colors"
                >
                  Get this stack →
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CUSTOM FOOTER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-10 text-center border border-gold/10 mt-4"
          style={{ background: 'linear-gradient(135deg, rgba(30,13,61,0.3), rgba(13,13,13,0.8))' }}
        >
          <p className="font-body text-sm text-muted mb-2">Don't see what you need?</p>
          <p className="font-display font-700 text-xl text-light mb-6">
            Every business has unique gaps.{' '}
            <span className="text-gold">We scope custom agents.</span>
          </p>
          <button
            onClick={() => navigate('/supporter')}
            className="px-8 py-3 bg-gold text-black font-display font-700 text-sm tracking-[0.12em] uppercase hover:bg-gold/90 transition-colors"
          >
            Ask us →
          </button>
        </motion.div>

      </div>
    </div>
  )
}
