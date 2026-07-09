/**
 * NORI 3D Sprite — Solopreneur Hologram
 * ============================================================
 * A CSS 3D-transform holographic card that displays the NORI
 * mascot on floating planes.  No WebGL required — pure React,
 * CSS transforms, and Framer Motion.
 *
 * Usage:
 *   <Nori3DSprite size={280} hovered={true} />
 */

import { motion } from 'framer-motion'

interface Props {
  /** Container size in px (default 260) */
  size?: number
  /** Trigger glow intensity */
  hovered?: boolean
  /** Stagger index for animation offsets */
  index?: number
  /** Optional mascot image source — falls back to /nori-mascot.jpg */
  src?: string
}

export default function Nori3DSprite({ size = 260, hovered = false, index = 0, src }: Props) {
  const imgSrc = src || '/nori-mascot.jpg'
  const accent = '#00B359'
  const glow = 'rgba(0, 179, 89, 0.35)'
  const s = size
  const planeW = Math.round(s * 0.55)
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
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
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
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
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
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `translateZ(${planeW * 0.22}px)`,
            backfaceVisibility: 'hidden',
            border: `1px solid ${accent}40`,
            background: `linear-gradient(180deg, ${accent}10 0%, transparent 60%)`,
          }}
        >
          <img
            src={imgSrc}
            alt="NORI"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 15%',
              mixBlendMode: 'screen',
              opacity: hovered ? 0.9 : 0.7,
              filter: 'saturate(0.65) brightness(1.15)',
            }}
          />
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

        {/* -- Back face (mirrored silhouette) -- */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `rotateY(180deg) translateZ(${planeW * 0.22}px)`,
            backfaceVisibility: 'hidden',
            border: `1px solid ${accent}25`,
            background: `linear-gradient(180deg, ${accent}06 0%, transparent 60%)`,
          }}
        >
          <img
            src={imgSrc}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 15%',
              mixBlendMode: 'screen',
              opacity: 0.25,
              filter: 'saturate(0.3) brightness(0.8)',
              transform: 'scaleX(-1)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(15,23,42,0.95) 100%)`,
            }}
          />
        </div>

        {/* -- Side faces (wireframe strips) -- */}
        <div
          className="absolute"
          style={{
            width: planeW * 0.44,
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
            width: planeW * 0.44,
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
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
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
