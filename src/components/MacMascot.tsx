/**
 * MAC Mascot — 2D SVG Character
 * ============================================================
 * A geometric, guardian-coded mascot rendered as inline SVG.
 * Teal (#0D9488) + dark navy palette.
 *
 * Usage:
 *   <MacMascot size={200} />
 */

import { motion } from 'framer-motion'

interface Props {
  size?: number
  hovered?: boolean
  index?: number
}

export default function MacMascot({ size = 200, hovered = false, index = 0 }: Props) {
  const teal = '#0D9488'
  const tealDim = '#065f5a'
  const tealGlow = 'rgba(13, 148, 136, 0.35)'

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Ambient glow behind */}
      <div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tealGlow}, transparent 65%)`,
          opacity: hovered ? 0.9 : 0.4,
          transition: 'opacity 0.3s',
        }}
      />

      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ filter: hovered ? `drop-shadow(0 0 10px ${tealGlow})` : 'none', transition: 'filter 0.3s' }}
      >
        <defs>
          <linearGradient id="macTeal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={teal} />
            <stop offset="100%" stopColor={tealDim} />
          </linearGradient>
          <linearGradient id="macVisor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`${teal}88`} />
            <stop offset="100%" stopColor={`${teal}22`} />
          </linearGradient>
        </defs>

        {/* Outer halo ring */}
        <circle cx="100" cy="100" r="92" fill="none" stroke={teal} strokeWidth="0.5" opacity="0.12" />
        <circle cx="100" cy="100" r="82" fill="none" stroke={teal} strokeWidth="0.5" opacity="0.18" strokeDasharray="4 6" />

        {/* Mantle / hood — broad shoulders, protective */}
        <path
          d="M40,145 Q40,55 100,48 Q160,55 160,145 L160,170 Q160,185 100,185 Q40,185 40,170 Z"
          fill="#1e232c"
          stroke={teal}
          strokeWidth="1.5"
        />

        {/* Interior shadow */}
        <path
          d="M50,145 Q50,65 100,60 Q150,65 150,145"
          fill="#161b22"
          opacity="0.8"
        />

        {/* Face screen / visor — wider, more serene */}
        <rect x="68" y="92" width="64" height="24" rx="10"
          fill="url(#macVisor)"
          stroke={teal}
          strokeWidth="1"
        />

        {/* Eyes — calm horizontal bars */}
        <rect x="80" y="101" width="16" height="2.5" rx="1" fill={teal} />
        <rect x="104" y="101" width="16" height="2.5" rx="1" fill={teal} />

        {/* Crown / crest detail on hood */}
        <polygon
          points="100,55 106,68 94,68"
          fill={tealDim}
          stroke={teal}
          strokeWidth="0.8"
        />

        {/* Shoulder pauldrons */}
        <rect x="30" y="135" width="22" height="30" rx="6" fill="#1e232c" stroke={teal} strokeWidth="1.2" />
        <rect x="148" y="135" width="22" height="30" rx="6" fill="#1e232c" stroke={teal} strokeWidth="1.2" />

        {/* Pauldron accent lines */}
        <line x1="36" y1="142" x2="46" y2="142" stroke={teal} strokeWidth="1" opacity="0.7" />
        <line x1="36" y1="148" x2="46" y2="148" stroke={teal} strokeWidth="1" opacity="0.7" />
        <line x1="154" y1="142" x2="164" y2="142" stroke={teal} strokeWidth="1" opacity="0.7" />
        <line x1="154" y1="148" x2="164" y2="148" stroke={teal} strokeWidth="1" opacity="0.7" />

        {/* Shield orb (left hand) */}
        <g transform="translate(32, 155)">
          <circle cx="14" cy="14" r="14" fill="#161b22" stroke={teal} strokeWidth="1.2" />
          <circle cx="14" cy="14" r="8" fill={teal} opacity="0.25" />
          {/* Family tree abstraction inside orb */}
          <line x1="14" y1="6" x2="14" y2="22" stroke={teal} strokeWidth="0.8" opacity="0.7" />
          <line x1="8" y1="12" x2="20" y2="12" stroke={teal} strokeWidth="0.8" opacity="0.7" />
          <circle cx="14" cy="6" r="2" fill={teal} opacity="0.8" />
          <circle cx="8" cy="18" r="2" fill={teal} opacity="0.8" />
          <circle cx="20" cy="18" r="2" fill={teal} opacity="0.8" />
        </g>

        {/* Scroll / ledger (right hand) */}
        <g transform="translate(140, 158)">
          <rect x="0" y="0" width="26" height="18" rx="2" fill="#1e232c" stroke={teal} strokeWidth="1" />
          <line x1="4" y1="5" x2="22" y2="5" stroke={teal} strokeWidth="0.8" opacity="0.6" />
          <line x1="4" y1="9" x2="18" y2="9" stroke={teal} strokeWidth="0.8" opacity="0.6" />
          <line x1="4" y1="13" x2="14" y2="13" stroke={teal} strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* Chest emblem — shield */}
        <path
          d="M100,145 L108,150 L108,158 L100,164 L92,158 L92,150 Z"
          fill="#161b22"
          stroke={teal}
          strokeWidth="1"
        />
        <text
          x="100"
          y="158"
          textAnchor="middle"
          fontSize="7"
          fontFamily="Orbitron, sans-serif"
          fill={teal}
          fontWeight="700"
        >
          +
        </text>

        {/* Scan line overlay */}
        <rect x="40" y="55" width="120" height="2" fill={teal} opacity="0.08">
          <animate
            attributeName="y"
            values="55;180;55"
            dur="5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </motion.div>
  )
}
