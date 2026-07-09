/**
 * MAC 3D Sprite — Parents Hologram
 * ============================================================
 * CSS 3D-transform holographic card wrapping the MAC mascot.
 *
 * Usage:
 *   <Mac3DSprite size={260} hovered={true} />
 */

import { motion } from 'framer-motion'
import MacMascot from './MacMascot'

interface Props {
  size?: number
  hovered?: boolean
  index?: number
}

export default function Mac3DSprite({ size = 260, hovered = false, index = 0 }: Props) {
  const accent = '#0D9488'
  const glow = 'rgba(13, 148, 136, 0.35)'
  const s = size
  const planeW = Math.round(s * 0.6)
  const planeH = Math.round(s * 0.72)

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: s,
        height: Math.round(s * 1.1),
        perspective: '900px',
      }}
    >
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full border border-dashed"
        style={{
          borderColor: accent,
          opacity: hovered ? 0.35 : 0.08,
          width: s * 0.9,
          height: s * 0.9,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Inner counter-rotating ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full border"
        style={{
          borderColor: accent,
          opacity: hovered ? 0.25 : 0.06,
          width: s * 0.72,
          height: s * 0.72,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Floating 3D card assembly */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5 + index * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
        style={{
          width: planeW,
          height: planeH,
          transformStyle: 'preserve-3d',
          filter: `drop-shadow(0 0 14px ${glow}) drop-shadow(0 0 40px ${glow})`,
        }}
      >
        {/* -- Front face -- */}
        <div
          className="absolute inset-0 overflow-hidden flex items-center justify-center"
          style={{
            transform: `translateZ(${planeW * 0.24}px)`,
            backfaceVisibility: 'hidden',
            border: `1px solid ${accent}40`,
            background: `linear-gradient(180deg, ${accent}10 0%, transparent 60%)`,
          }}
        >
          <div className="relative" style={{ width: '100%', height: '100%' }}>
            <MacMascot size={planeW} hovered={hovered} index={index} />

            {/* Edge fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(15,23,42,0.9) 100%)`,
              }}
            />
            {/* Scan lines */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${accent}14 3px, ${accent}14 4px)`,
              }}
            />
            {/* Accent overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, ${accent}00 40%, ${accent}18 100%)`,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </div>

        {/* -- Back face (silhouette) -- */}
        <div
          className="absolute inset-0 overflow-hidden flex items-center justify-center"
          style={{
            transform: `rotateY(180deg) translateZ(${planeW * 0.24}px)`,
            backfaceVisibility: 'hidden',
            border: `1px solid ${accent}25`,
            background: `linear-gradient(180deg, ${accent}06 0%, transparent 60%)`,
          }}
        >
          <div className="relative" style={{ width: '100%', height: '100%', opacity: 0.3 }}>
            <MacMascot size={planeW} hovered={false} index={index} />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(15,23,42,0.95) 100%)`,
              }}
            />
          </div>
        </div>

        {/* -- Side faces (wireframe strips) -- */}
        <div
          className="absolute"
          style={{
            width: planeW * 0.48,
            height: planeH,
            transform: `rotateY(90deg) translateZ(${planeW * 0.5}px)`,
            background: `linear-gradient(180deg, ${accent}08, transparent)`,
            borderLeft: `1px solid ${accent}15`,
            borderRight: `1px solid ${accent}15`,
          }}
        />
        <div
          className="absolute"
          style={{
            width: planeW * 0.48,
            height: planeH,
            transform: `rotateY(-90deg) translateZ(${planeW * 0.5}px)`,
            background: `linear-gradient(180deg, ${accent}08, transparent)`,
            borderLeft: `1px solid ${accent}15`,
            borderRight: `1px solid ${accent}15`,
          }}
        />

        {/* -- Slow Y rotation of the whole assembly -- */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* Shimmer sweep */}
        <motion.div
          animate={{ y: ['-100%', '220%'] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.8,
          }}
          className="absolute left-0 right-0 h-10 pointer-events-none z-20"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${accent}18 50%, transparent 100%)`,
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l pointer-events-none z-20" style={{ borderColor: `${accent}55` }} />
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r pointer-events-none z-20" style={{ borderColor: `${accent}55` }} />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l pointer-events-none z-20" style={{ borderColor: `${accent}55` }} />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r pointer-events-none z-20" style={{ borderColor: `${accent}55` }} />
      </motion.div>

      {/* Ground glow reflection */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 blur-xl pointer-events-none"
        style={{
          width: s * 0.6,
          height: s * 0.15,
          background: `radial-gradient(ellipse at 50% 50%, ${glow}, transparent 70%)`,
          opacity: hovered ? 0.6 : 0.25,
          transition: 'opacity 0.3s',
        }}
      />
    </div>
  )
}
