import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DigitalRain from '../components/DigitalRain'

// Swap in the live Cal.com / Calendly URL when the account is wired up
const BOOKING_URL = ''

export default function IntroSessionPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <DigitalRain opacity={0.04} density={0.5} />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #161b22 0%, #111820 50%, #161b22 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 pb-24">
        <section className="pt-20 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span className="font-mono text-xs text-green/60 tracking-[0.2em] uppercase">
              Step 2 of 3 — intro session
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-4xl md:text-6xl text-light leading-none tracking-tight mb-4"
          >
            30 minutes. One bottleneck.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-body text-base text-muted max-w-xl mx-auto"
          >
            We look at where you are, find the one thing worth fixing first,
            and start your 14-day free trial on the spot. No pitch deck, no pressure.
          </motion.p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="border border-gold/15 overflow-hidden"
          style={{ background: 'rgba(17,17,17,0.6)' }}
        >
          {BOOKING_URL ? (
            <iframe
              src={BOOKING_URL}
              title="Book your 30-minute intro session"
              className="w-full"
              style={{ height: 680, border: 'none' }}
            />
          ) : (
            <div className="p-10 text-center">
              <p className="font-display font-700 text-xl text-light mb-3">Booking calendar coming online.</p>
              <p className="font-body text-sm text-muted mb-8 max-w-md mx-auto">
                Until then, join the waitlist and we'll reach out with times for your intro session —
                usually within a day.
              </p>
              <Link
                to="/waitlist"
                className="inline-block px-8 py-3 bg-gold text-black font-display font-700 text-sm tracking-[0.12em] uppercase hover:bg-gold/90 transition-colors"
              >
                Join the waitlist →
              </Link>
            </div>
          )}
        </motion.section>

        {/* Funnel strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-3 mt-8"
        >
          {[
            ['01', 'Waitlist', 'Tell us who you are'],
            ['02', 'Intro session', '30 min, one bottleneck'],
            ['03', 'Free trial', '14 days, no card'],
          ].map(([num, title, desc]) => (
            <div key={num} className="p-4 border border-gold/10 text-center" style={{ background: 'rgba(17,17,17,0.5)' }}>
              <span className="font-mono text-xs text-gold/50">{num}</span>
              <p className="font-display font-700 text-sm text-light mt-1">{title}</p>
              <p className="font-body text-xs text-muted/70 mt-1">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
