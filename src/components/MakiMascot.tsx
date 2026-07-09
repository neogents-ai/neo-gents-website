/**
 * MAKI Mascot — 2D SVG SoulFood Sushi Roll Character
 * ============================================================
 * A youthful student-coded maki roll rendered as inline SVG.
 * Same species as NORI — rounded-square cross-section body,
 * nori exterior, rice ring, soulfood center face.
 * Electric Violet (#6B3FA0) accents for student track.
 *
 * Usage:
 *   <MakiMascot size={200} />
 */

import { motion } from 'framer-motion'

interface Props {
  size?: number
  /** Trigger hover glow */
  hovered?: boolean
  index?: number
}

export default function MakiMascot({ size = 200, hovered = false, index = 0 }: Props) {
  const nori = '#2D5A27'
  const rice = '#F5F0E8'
  const riceShadow = '#E8E0D0'
  const faceGold = '#C8860A'
  const macaroni = '#F0C040'
  const glove = '#FFFFFF'
  const accent = '#6B3FA0' // Electric Violet — MAKI track
  const accentGlow = 'rgba(107, 63, 160, 0.35)'

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
          background: `radial-gradient(circle at 50% 50%, ${accentGlow}, transparent 65%)`,
          opacity: hovered ? 0.9 : 0.4,
          transition: 'opacity 0.3s',
        }}
      />

      <svg
        viewBox="0 0 200 240"
        width={size}
        height={Math.round(size * 1.2)}
        style={{ filter: hovered ? `drop-shadow(0 0 10px ${accentGlow})` : 'none', transition: 'filter 0.3s' }}
      >
        <defs>
          <radialGradient id="makiFace" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={faceGold} />
            <stop offset="70%" stopColor={faceGold} />
            <stop offset="100%" stopColor={macaroni} />
          </radialGradient>
          <linearGradient id="makiRice" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={rice} />
            <stop offset="100%" stopColor={riceShadow} />
          </linearGradient>
        </defs>

        {/* ── LEGS ── */}
        {/* Left leg */}
        <path d="M75,195 L75,220 Q75,228 85,228 L90,228 Q95,228 95,220 L95,200" fill={nori} />
        <ellipse cx="85" cy="228" rx="10" ry="6" fill={nori} />
        {/* Right leg */}
        <path d="M105,200 L105,220 Q105,228 110,228 L115,228 Q125,228 125,220 L125,195" fill={nori} />
        <ellipse cx="115" cy="228" rx="10" ry="6" fill={nori} />

        {/* ── ARMS ── */}
        {/* Left arm */}
        <path d="M35,110 Q15,130 20,155" fill="none" stroke={nori} strokeWidth="10" strokeLinecap="round" />
        {/* Right arm */}
        <path d="M165,110 Q185,130 180,155" fill="none" stroke={nori} strokeWidth="10" strokeLinecap="round" />

        {/* ── WHITE GLOVES ── */}
        {/* Left glove */}
        <ellipse cx="20" cy="158" rx="14" ry="12" fill={glove} />
        <ellipse cx="14" cy="154" rx="5" ry="7" fill={glove} transform="rotate(-20 14 154)" />
        <ellipse cx="26" cy="154" rx="5" ry="7" fill={glove} transform="rotate(20 26 154)" />
        {/* Right glove */}
        <ellipse cx="180" cy="158" rx="14" ry="12" fill={glove} />
        <ellipse cx="174" cy="154" rx="5" ry="7" fill={glove} transform="rotate(-20 174 154)" />
        <ellipse cx="186" cy="154" rx="5" ry="7" fill={glove} transform="rotate(20 186 154)" />

        {/* ── BODY (Rounded Square Maki Roll) ── */}
        {/* Main body rounded square */}
        <rect x="40" y="50" width="120" height="140" rx="35" fill={nori} />

        {/* Rice ring */}
        <rect x="48" y="58" width="104" height="124" rx="28" fill="url(#makiRice)" />

        {/* Rice texture dots */}
        <g opacity="0.3" fill={riceShadow}>
          <circle cx="55" cy="70" r="2" /><circle cx="65" cy="68" r="1.5" /><circle cx="75" cy="72" r="2" />
          <circle cx="125" cy="70" r="2" /><circle cx="135" cy="68" r="1.5" /><circle cx="145" cy="72" r="2" />
          <circle cx="55" cy="165" r="2" /><circle cx="65" cy="168" r="1.5" /><circle cx="75" cy="164" r="2" />
          <circle cx="125" cy="165" r="2" /><circle cx="135" cy="168" r="1.5" /><circle cx="145" cy="164" r="2" />
          <circle cx="52" cy="120" r="1.5" /><circle cx="148" cy="120" r="1.5" />
        </g>

        {/* ── CENTER FACE (SoulFood Filling) ── */}
        <circle cx="100" cy="125" r="42" fill="url(#makiFace)" />

        {/* Macaroni crown / halo */}
        <g fill={macaroni}>
          <ellipse cx="72" cy="95" rx="6" ry="8" transform="rotate(-30 72 95)" />
          <ellipse cx="85" cy="85" rx="6" ry="8" transform="rotate(-15 85 85)" />
          <ellipse cx="100" cy="82" rx="6" ry="8" />
          <ellipse cx="115" cy="85" rx="6" ry="8" transform="rotate(15 115 85)" />
          <ellipse cx="128" cy="95" rx="6" ry="8" transform="rotate(30 128 95)" />
        </g>

        {/* Fried chicken texture on lower face */}
        <g opacity="0.25" fill="#A06000">
          <circle cx="85" cy="140" r="3" /><circle cx="95" cy="145" r="2.5" /><circle cx="105" cy="148" r="3" />
          <circle cx="115" cy="142" r="2.5" /><circle cx="90" cy="150" r="2" /><circle cx="110" cy="152" r="2" />
          <circle cx="100" cy="155" r="2.5" />
        </g>

        {/* ── EYES ── */}
        {/* Left eye */}
        <ellipse cx="85" cy="115" rx="10" ry="12" fill="#FFFFFF" />
        <circle cx="87" cy="115" r="6" fill="#8B4513" />
        <circle cx="88" cy="114" r="3" fill="#000000" />
        <circle cx="90" cy="112" r="2" fill="#FFFFFF" opacity="0.9" />
        {/* Right eye */}
        <ellipse cx="115" cy="115" rx="10" ry="12" fill="#FFFFFF" />
        <circle cx="113" cy="115" r="6" fill="#8B4513" />
        <circle cx="112" cy="114" r="3" fill="#000000" />
        <circle cx="114" cy="112" r="2" fill="#FFFFFF" opacity="0.9" />

        {/* Eyebrows — expressive, slightly raised (youthful energy) */}
        <path d="M75,100 Q85,95 95,100" fill="none" stroke={nori} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M105,100 Q115,95 125,100" fill="none" stroke={nori} strokeWidth="2.5" strokeLinecap="round" />

        {/* Mouth — confident smirk */}
        <path d="M92,138 Q100,144 108,138" fill="none" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" />
        <path d="M95,140 Q100,143 105,140" fill="#FF6B6B" opacity="0.6" />

        {/* ── HEADPHONES (Student accessory) ── */}
        {/* Headband */}
        <path d="M55,90 Q55,30 100,25 Q145,30 145,90" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        {/* Ear cups */}
        <rect x="42" y="82" width="16" height="28" rx="6" fill={accent} opacity="0.9" />
        <rect x="142" y="82" width="16" height="28" rx="6" fill={accent} opacity="0.9" />
        {/* Ear cup detail */}
        <rect x="46" y="90" width="8" height="12" rx="2" fill={`${accent}66`} />
        <rect x="146" y="90" width="8" height="12" rx="2" fill={`${accent}66`} />

        {/* ── CHEST EMBLEM ── */}
        <polygon
          points="100,165 106,169 106,175 100,179 94,175 94,169"
          fill={faceGold}
          stroke={accent}
          strokeWidth="1"
        />
        <text
          x="100"
          y="175"
          textAnchor="middle"
          fontSize="7"
          fontFamily="Orbitron, sans-serif"
          fill={accent}
          fontWeight="700"
        >
          M
        </text>

        {/* Scan line overlay */}
        <rect x="45" y="55" width="110" height="2" fill={accent} opacity="0.08">
          <animate
            attributeName="y"
            values="55;190;55"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </motion.div>
  )
}
