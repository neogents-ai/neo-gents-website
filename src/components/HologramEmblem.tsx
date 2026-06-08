import { motion } from 'framer-motion'

const RING_COLORS: Record<string, [string, string]> = {
  students:    ['#1e293b', '#00B359'],
  parents:     ['#00B359', '#D4A017'],
  solopreneur: ['#D4A017', '#1e293b'],
  creators:    ['#D4A017', '#1e293b'],
}

interface HologramEmblemProps {
  color: string
  glowColor: string
  codename: string
  personaId: string
  index?: number
  hovered?: boolean
  /** Width/height of the outer container */
  size?: number
  /** If provided, renders mascot image inside octagon instead of codename text */
  mascotSrc?: string
}

export default function HologramEmblem({
  color,
  glowColor,
  codename,
  personaId,
  index = 0,
  hovered = false,
  size = 120,
  mascotSrc,
}: HologramEmblemProps) {
  const [outerRing, midRing] = RING_COLORS[personaId] ?? [color, color]
  const coreW = Math.round(size * 0.73)
  const coreH = Math.round(size * 0.9)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: Math.round(size * 1.17) }}>
      {/* Outer dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full border border-dashed"
        style={{
          borderColor: outerRing,
          opacity: hovered ? 0.45 : 0.07,
          inset: -16,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Mid ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full border"
        style={{
          borderColor: midRing,
          opacity: hovered ? 0.3 : 0.05,
          inset: -8,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Core hologram body — floating */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ filter: `drop-shadow(0 0 12px ${glowColor}) drop-shadow(0 0 30px ${glowColor})` }}
      >
        {/* Octagon silhouette */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{
            width: coreW,
            height: coreH,
            background: mascotSrc
              ? 'transparent'
              : `linear-gradient(180deg, ${color}18 0%, ${color}06 60%, transparent 100%)`,
            border: `1px solid ${color}35`,
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          }}
        >
          {mascotSrc ? (
            /* ── MASCOT IMAGE — blended ── */
            <>
              {/* Subtle background fill so octagon isn't fully transparent */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 80% 90% at 50% 60%, ${color}18 0%, transparent 75%)`,
                }}
              />
              <img
                src={mascotSrc}
                alt="NORI"
                className="absolute"
                style={{
                  width: '115%',
                  height: '115%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  mixBlendMode: 'screen',
                  opacity: hovered ? 0.92 : 0.75,
                  transition: 'opacity 0.3s',
                  filter: `saturate(0.6) brightness(1.1) drop-shadow(0 0 6px ${color}40)`,
                  top: '-5%',
                  left: '-7.5%',
                }}
              />
              {/* Edge fade — masks the hard img border */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(15,23,42,0.85) 100%)`,
                }}
              />
              {/* Accent tint overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, ${color}00 30%, ${color}22 100%)`,
                  mixBlendMode: 'screen',
                  opacity: hovered ? 0.9 : 0.5,
                  transition: 'opacity 0.3s',
                }}
              />
            </>
          ) : (
            <>
              {/* Scan lines */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${color}12 3px, ${color}12 4px)`,
                }}
              />

              {/* Codename / Brand mark */}
              {codename === 'N' ? (
                <div className="relative z-10 flex items-center justify-center" style={{ width: 56, height: 56 }}>
                  <div
                    className="absolute inset-0 rotate-45"
                    style={{
                      border: '1.5px solid transparent',
                      background: 'linear-gradient(#161b22, #161b22) padding-box, linear-gradient(135deg, #D4A017, #1e293b, #00B359) border-box',
                      opacity: hovered ? 1 : 0.7,
                      transition: 'opacity 0.3s',
                    }}
                  />
                  <span
                    className="relative select-none font-display font-800"
                    style={{
                      fontSize: '1.9rem',
                      letterSpacing: '0.05em',
                      background: 'linear-gradient(135deg, #D4A017 0%, #1e293b 50%, #00B359 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: hovered ? 'drop-shadow(0 0 10px rgba(212,160,23,0.6))' : 'none',
                      transition: 'filter 0.3s',
                    }}
                  >
                    N
                  </span>
                </div>
              ) : (
                <span
                  className="relative z-10 select-none font-display font-800 tracking-[0.12em]"
                  style={{
                    color,
                    opacity: hovered ? 1 : 0.75,
                    transition: 'opacity 0.3s',
                    fontSize: '1.1rem',
                    textShadow: `0 0 18px ${color}`,
                  }}
                >
                  {codename}
                </span>
              )}
            </>
          )}

          {/* Shimmer sweep — always on top */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.7 }}
            className="absolute left-0 right-0 h-8 pointer-events-none z-20"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${color}20 50%, transparent 100%)`,
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l pointer-events-none z-20" style={{ borderColor: `${color}60` }} />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r pointer-events-none z-20" style={{ borderColor: `${color}60` }} />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l pointer-events-none z-20" style={{ borderColor: `${color}60` }} />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r pointer-events-none z-20" style={{ borderColor: `${color}60` }} />
        </div>
      </motion.div>
    </div>
  )
}
