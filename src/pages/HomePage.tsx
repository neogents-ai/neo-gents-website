import { motion } from 'framer-motion'
import { personas } from '../data/personas'
import DepthPersonaMenu from '../components/DepthPersonaMenu'
import FlowingLines from '../components/FlowingLines'

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Flowing lines — behind all content */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <FlowingLines lineCount={18} opacity={0.85} />
      </div>
      {/* Hero */}
      <section className="relative pt-32 pb-10 px-6 text-center" style={{ zIndex: 2 }}>
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
      <section className="relative flex-1 px-6 pb-16 max-w-6xl mx-auto w-full" style={{ zIndex: 2 }}>
        <DepthPersonaMenu personas={personas} />
      </section>

    </div>
  )
}
