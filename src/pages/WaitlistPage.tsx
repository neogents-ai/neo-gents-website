import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import DigitalRain from '../components/DigitalRain'
import WaitlistForm, { type WaitlistProfile } from '../components/WaitlistForm'

export default function WaitlistPage() {
  const [params] = useSearchParams()
  const profileParam = params.get('profile')
  const defaultProfile: WaitlistProfile = profileParam === 'nori' ? 'nori' : 'soulfood-sushi'
  const isClarityMap = params.get('source') === 'nori-clarity-map'
  const defaultBottleneck = isClarityMap ? (params.get('bottleneck') ?? '') : ''
  const [selectedProfile, setSelectedProfile] = useState<WaitlistProfile>(defaultProfile)
  const isNoriTrack = selectedProfile === 'nori'

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <DigitalRain opacity={0.04} density={0.5} />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #161b22 0%, #111820 50%, #161b22 100%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 pb-24">
        <section className="pt-20 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-xs text-gold/60 tracking-[0.2em] uppercase">
              {isNoriTrack ? 'Free Nori clarity session' : (<>
              Next cohort — limited seats
              </>)}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-4xl md:text-6xl text-light leading-none tracking-tight mb-4"
          >
            {isNoriTrack ? 'Get your free clarity map.' : (<>
            Join the Cohort
            </>)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-body text-base text-muted max-w-xl mx-auto"
          >
            {isNoriTrack ? 'Start with one unclear process. We will validate the first path with you and explain the practical next step before any setup or model usage begins.' : (<>
            One waitlist, two paths. Tell us who you are and what's in the way —
            we'll bring you in with a 30-minute intro session and a 14-day free trial.
            </>)}
          </motion.p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-6 md:p-8 border border-gold/15"
          style={{ background: 'rgba(17,17,17,0.6)' }}
        >
          <WaitlistForm defaultProfile={defaultProfile} defaultBottleneck={defaultBottleneck} onProfileChange={setSelectedProfile} />
        </motion.section>
      </div>
    </div>
  )
}
