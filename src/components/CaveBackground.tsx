import { motion } from 'framer-motion'

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: (i * 39 + 11) % 96 + 2,
  y: (i * 57 + 9) % 72 + 4,
  size: (i % 3) + 2,
  duration: 10 + (i % 9),
  delay: (i * 0.55) % 9,
  color:
    i % 3 === 0 ? 'rgba(0,179,89,0.65)'
    : i % 3 === 1 ? 'rgba(212,160,23,0.48)'
    : 'rgba(212,160,23,0.25)',
}))

const ORBS = [
  { x: '10%', y: '72%', color: 'rgba(0,179,89,0.12)',   size: 420 },
  { x: '34%', y: '58%', color: 'rgba(212,160,23,0.10)', size: 360 },
  { x: '86%', y: '38%', color: 'rgba(0,179,89,0.08)',   size: 300 },
]

export default function CaveBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* Clean near-black base — no grey fog */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 140% 90% at 50% 110%, #111111 0%, #0a0a0a 55%, #000000 100%)',
        }}
      />

      {/* Subtle ambient glow orbs — reduced haze */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x, top: orb.y,
            width: orb.size, height: orb.size,
            background: orb.color,
            filter: 'blur(110px)',
            transform: 'translate(-50%,-50%)',
            opacity: 0.55,
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.6, 0.45] }}
          transition={{ duration: 9 + i * 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Perspective floor grid */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '52%', perspective: '550px', perspectiveOrigin: '50% 0%' }}
      >
        <div
          className="cave-floor-grid absolute inset-0"
          style={{
            transform: 'rotateX(70deg)',
            transformOrigin: 'top center',
            height: '220%',
            marginTop: '-60%',
          }}
        />
        {/* horizon fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 75%, #0a0a0a 100%)',
          }}
        />
      </div>

      {/* Circuit walls */}
      {[false, true].map((flip) => (
        <svg
          key={String(flip)}
          className="absolute top-0 h-full"
          style={{
            [flip ? 'right' : 'left']: 0,
            width: '16%',
            opacity: 0.055,
            transform: flip ? 'scaleX(-1)' : undefined,
          }}
          viewBox="0 0 180 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="#00B359" strokeWidth="1" fill="none">
            <path d="M20 0 L20 90 L70 90 L70 170 L130 170 L130 240" />
            <path d="M0 310 L45 310 L45 390 L105 390 L105 460 L160 460 L160 530" />
            <path d="M90 0 L90 55 L150 55 L150 130 L180 130 L180 210" />
            <path d="M0 610 L55 610 L55 690 L115 690 L115 760 L170 760 L170 800" />
            <circle cx="70"  cy="90"  r="3" fill="#00B359" />
            <circle cx="130" cy="170" r="3" fill="#00B359" />
            <circle cx="45"  cy="310" r="3" fill="#D4A017" />
            <circle cx="105" cy="390" r="3" fill="#00B359" />
            <circle cx="150" cy="55"  r="3" fill="#D4A017" />
          </g>
        </svg>
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{ y: [0, -28, -10, 0], x: [0, 10, -6, 0], opacity: [0.5, 1, 0.65, 0.5] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Top fog */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: '14%', background: 'linear-gradient(to bottom, #0a0a0a, transparent)' }}
      />

      {/* Bottom fog */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '12%', background: 'linear-gradient(to top, #0a0a0a, transparent)' }}
      />

      <div className="scanline-green" />
    </div>
  )
}
