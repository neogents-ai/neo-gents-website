import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ZeekChat from '../components/ZeekChat'

const tiers = [
  {
    name: 'Starter',
    tagline: 'For individuals and early-stage builders',
    range: 'Starting at $75/mo',
    setup: 'Setup from $150',
    color: '#6B7280',
    glowColor: 'rgba(85,85,85,0.15)',
    features: [
      'AI chatbot for your website',
      'Monthly content posts (Marketing Specialist)',
      'COMP Cohort access',
      'After-hours intake automation',
      'Email support',
    ],
    cta: 'Book a free audit',
  },
  {
    name: 'Growth',
    tagline: 'For businesses doing $2K–$10K/mo',
    range: 'Starting at $175/mo',
    setup: 'Setup from $300',
    color: '#D4A017',
    glowColor: 'rgba(212, 160, 23, 0.2)',
    featured: true,
    features: [
      'Everything in Starter',
      'Voice receptionist AI (24/7)',
      'Lead gen + follow-up automation',
      'Ops retainer (invoicing, scheduling)',
      '14-Day AI Coaching Sprint',
      'Priority support',
    ],
    cta: 'Get started',
  },
  {
    name: 'Established',
    tagline: 'For businesses doing $10K+/mo',
    range: 'Starting at $200/mo',
    setup: 'Setup from $500',
    color: '#00B359',
    glowColor: 'rgba(0,179,89,0.15)',
    features: [
      'Everything in Growth',
      'Custom AI agent build',
      'Full marketing funnel (strategy + build)',
      'AI filmmaking content pack',
      'Dedicated account management',
      'White-glove onboarding',
    ],
    cta: 'Book a strategy call',
  },
]

const faqs = [
  {
    q: 'How does income-based pricing work?',
    a: "We ask one question during intake: what's your monthly revenue or household income? Your answer determines your tier. We never verify — we trust you. The goal isn't to discount, it's to price fairly so you can actually say yes and get a result.",
  },
  {
    q: 'Can I start with just one service?',
    a: 'Yes. Every product is à la carte. Most clients start with one tool that solves their biggest pain, see the result, then expand. We don\'t upsell until you\'re ready.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most tools are live within 3–7 business days. Custom agent builds are scoped individually — typically 2–3 weeks from kick-off to deployment.',
  },
  {
    q: 'Is there a contract?',
    a: 'Monthly retainers are month-to-month. No lock-in. Setup fees are one-time. If it\'s not working, you can leave. We\'d rather earn the renewal.',
  },
]

export default function PricingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen pb-24">
      {/* BG */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(22,27,34,0.35) 0%, transparent 70%), #161b22',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <section className="pt-20 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-xs text-gold/70 tracking-[0.2em] uppercase">Pricing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display font-800 text-5xl md:text-6xl text-light mb-4"
          >
            We price based on{' '}
            <span className="text-shimmer">where you are,</span>
            <br />
            not where you're going.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-body text-sm text-muted max-w-md mx-auto"
          >
            Our income-based model adjusts pricing to match your reality. Every tier delivers the same quality — the work is never discounted, just fairly priced.
          </motion.p>
        </section>

        {/* Tiers */}
        <section className="pb-16">
          <div className="grid md:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="relative p-6 border flex flex-col"
                style={{
                  borderColor: tier.featured ? `${tier.color}50` : `${tier.color}20`,
                  background: tier.featured
                    ? `linear-gradient(135deg, ${tier.glowColor} 0%, rgba(17,17,17,0.9) 100%)`
                    : 'rgba(17,17,17,0.6)',
                  boxShadow: tier.featured ? `0 0 40px ${tier.glowColor}` : 'none',
                }}
              >
                {tier.featured && (
                  <div
                    className="absolute -top-px left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }}
                  />
                )}
                {tier.featured && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 font-mono text-xs" style={{ backgroundColor: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}40`, fontSize: '9px', letterSpacing: '0.1em' }}>
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="font-display font-700 text-lg text-light mb-1">{tier.name}</h2>
                  <p className="font-body text-xs text-muted mb-4">{tier.tagline}</p>
                  <div className="font-display font-800 text-2xl" style={{ color: tier.color }}>{tier.range}</div>
                  <div className="font-body text-xs text-muted mt-1">{tier.setup}</div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 font-body text-xs text-muted">
                      <span className="mt-0.5" style={{ color: tier.color }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/supporter')}
                  className="w-full py-3 font-display font-700 text-sm tracking-[0.1em] uppercase transition-all duration-200"
                  style={
                    tier.featured
                      ? { backgroundColor: tier.color, color: '#000' }
                      : { border: `1px solid ${tier.color}40`, color: tier.color, background: 'transparent' }
                  }
                >
                  {tier.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-body text-xs text-muted/50 mt-6"
          >
            Custom agent builds are scoped individually. Book a free audit to get an accurate estimate.
          </motion.p>
        </section>

        {/* FAQ */}
        <section className="py-12 border-t border-gold/10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display font-700 text-xs tracking-[0.3em] uppercase text-gold/60 mb-8"
          >
            // Common questions
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-gold/10 p-5"
                style={{ background: 'rgba(17,17,17,0.4)' }}
              >
                <h3 className="font-display font-700 text-sm text-light mb-2">{faq.q}</h3>
                <p className="font-body text-xs text-muted leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      <ZeekChat persona="general" opener="Questions about pricing? I'll help you figure out the right starting point." accentColor="#D4A017" />
    </div>
  )
}
