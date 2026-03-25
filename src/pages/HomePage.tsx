import { motion } from 'framer-motion'
import { personas } from '../data/personas'
import DepthPersonaMenu from '../components/DepthPersonaMenu'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="pt-32 pb-10 px-6 text-center">
        {/* HUD status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#00B359' }}
          />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/50">
            System Online — NEO Gents HQ
          </span>
        </motion.div>

        {/* Headline */}
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
          className="font-body text-lg md:text-xl text-muted max-w-xl mx-auto mb-2 leading-relaxed"
        >
          We built the way out.
        </motion.p>
      </section>

      {/* Character select grid */}
      <section className="flex-1 px-6 pb-16 max-w-6xl mx-auto w-full">
        <DepthPersonaMenu personas={personas} />
      </section>

      {/* Bottom HUD strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="border-t px-6 py-3 flex items-center justify-between"
        style={{ borderColor: 'rgba(0,179,89,0.12)' }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted/30">
          NEO Gents AI — Build Track v2.0
        </span>
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted/30">
          52 agents active
        </span>
      </motion.div>
    </div>
  )
}
