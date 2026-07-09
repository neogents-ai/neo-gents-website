import { motion } from 'framer-motion'
import { type PersonaConfig } from '../data/personas'
import PersonaSprite from './PersonaSprite'

interface Props {
  persona: PersonaConfig
}

/**
 * CharacterShowcase — Large responsive character display
 * ============================================================
 * Renders the persona's CSS 3D sprite at a large size inside a
 * holographic container with scan lines, corner accents, and a
 * subtle rotating ring — matching the site's cyber aesthetic.
 *
 * Designed to sit as a dedicated "Meet [Codename]" section on
 * persona detail pages.
 */
export default function CharacterShowcase({ persona }: Props) {
  const color = persona.accentColor
  const characterName = persona.characterName ?? persona.codename

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-sm overflow-hidden"
      style={{
        background: 'rgba(30,35,44,0.5)',
        border: `1px solid ${color}20`,
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l pointer-events-none z-20" style={{ borderColor: `${color}60` }} />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r pointer-events-none z-20" style={{ borderColor: `${color}60` }} />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l pointer-events-none z-20" style={{ borderColor: `${color}60` }} />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r pointer-events-none z-20" style={{ borderColor: `${color}60` }} />

      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${color}10 3px, ${color}10 4px)`,
        }}
      />

      {/* Sprite — centered and responsive via CSS scaling wrapper */}
      <div className="relative w-full h-[300px] sm:h-[380px] md:h-[440px] flex items-center justify-center overflow-hidden">
        <div className="scale-[0.72] sm:scale-90 md:scale-100 origin-center transition-transform duration-300">
          <PersonaSprite persona={persona} size={300} hovered index={0} />
        </div>
      </div>

      {/* Bottom-left label */}
      <div className="absolute bottom-4 left-4 z-20">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: `${color}90` }}>
          {characterName}
        </span>
      </div>

      {/* Rotating ring decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[140%] h-32 rounded-full border border-dashed pointer-events-none z-[5]"
        style={{ borderColor: `${color}15`, opacity: 0.6 }}
      />
    </motion.div>
  )
}
