import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { type PersonaConfig } from '../data/personas'

interface Props {
  personas: PersonaConfig[]
}

const LABELS: Record<string, string> = {
  students:    'TRACK 01',
  parents:     'TRACK 02',
  solopreneur: 'TRACK 03',
  creators:    'TRACK 04',
}


function HologramEmblem({ color, glowColor, codename, index, hovered }: {
  color: string
  glowColor: string
  codename: string
  index: number
  hovered: boolean
}) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 140 }}>
      {/* Outer dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full border border-dashed"
        style={{
          borderColor: color,
          opacity: hovered ? 0.45 : 0.18,
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
          borderColor: color,
          opacity: hovered ? 0.3 : 0.12,
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
            width: 88,
            height: 108,
            background: `linear-gradient(180deg, ${color}18 0%, ${color}06 60%, transparent 100%)`,
            border: `1px solid ${color}35`,
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          }}
        >
          {/* Scan lines */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${color}12 3px, ${color}12 4px)`,
            }}
          />

          {/* Codename / Brand mark */}
          {codename === 'N' ? (
            /* Brand mark — diamond frame + gradient N */
            <div className="relative z-10 flex items-center justify-center" style={{ width: 56, height: 56 }}>
              {/* Diamond frame */}
              <div
                className="absolute inset-0 rotate-45"
                style={{
                  border: '1.5px solid transparent',
                  background: 'linear-gradient(#0d0d0d, #0d0d0d) padding-box, linear-gradient(135deg, #D4A017, #9B59B6, #00B359) border-box',
                  opacity: hovered ? 1 : 0.7,
                  transition: 'opacity 0.3s',
                }}
              />
              {/* Inner diamond dot */}
              <div
                className="absolute rotate-45"
                style={{
                  width: 10, height: 10,
                  background: 'linear-gradient(135deg, #D4A017, #9B59B6, #00B359)',
                  opacity: hovered ? 0.9 : 0.5,
                  transition: 'opacity 0.3s',
                }}
              />
              {/* N letter */}
              <span
                className="relative select-none font-display font-800"
                style={{
                  fontSize: '1.9rem',
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(135deg, #D4A017 0%, #9B59B6 50%, #00B359 100%)',
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
                fontSize: '1.75rem',
                textShadow: `0 0 18px ${color}`,
              }}
            >
              {codename}
            </span>
          )}

          {/* Shimmer sweep */}
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.7 }}
            className="absolute left-0 right-0 h-8 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${color}20 50%, transparent 100%)`,
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l pointer-events-none" style={{ borderColor: `${color}60` }} />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r pointer-events-none" style={{ borderColor: `${color}60` }} />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l pointer-events-none" style={{ borderColor: `${color}60` }} />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r pointer-events-none" style={{ borderColor: `${color}60` }} />
        </div>
      </motion.div>
    </div>
  )
}

function PersonaCard({ persona, index }: { persona: PersonaConfig; index: number }) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rawX = useSpring(0, { stiffness: 160, damping: 20 })
  const rawY = useSpring(0, { stiffness: 160, damping: 20 })
  const rotateX = useTransform(rawY, [-1, 1], [12, -12])
  const rotateY = useTransform(rawX, [-1, 1], [-12, 12])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rawX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2)
    rawY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center"
    >
      {/* Ground glow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl pointer-events-none transition-opacity duration-300"
        style={{ background: persona.glowColor, opacity: hovered ? 0.7 : 0.35 }}
      />

      {/* 3D card */}
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        onClick={() => navigate(persona.route)}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', cursor: 'pointer', willChange: 'transform' }}
        className="relative w-full select-none"
      >
        {/* Depth edge right */}
        <div
          className="absolute top-1 -right-2 w-2 h-full opacity-50 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${persona.accentColor}28, transparent)` }}
        />
        {/* Depth edge bottom */}
        <div
          className="absolute left-1 -bottom-2 h-2 w-full opacity-50 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${persona.accentColor}28, transparent)` }}
        />

        {/* Card face */}
        <div
          className="relative flex flex-col items-center justify-between px-5 pt-5 pb-4 transition-all duration-300"
          style={{
            border: `1px solid ${hovered ? persona.accentColor + 'BB' : persona.accentColor + '28'}`,
            background: hovered
              ? `radial-gradient(ellipse at 50% 20%, ${persona.accentColor}0e 0%, rgba(13,13,13,0.95) 70%)`
              : 'rgba(13,13,13,0.85)',
            boxShadow: hovered
              ? `0 0 28px ${persona.accentColor}1a, inset 0 0 20px ${persona.accentColor}08`
              : `0 0 6px ${persona.accentColor}06`,
            minHeight: '320px',
            borderRadius: '2px',
          }}
        >
          {/* Track label */}
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase self-start mb-3"
            style={{ color: persona.accentColor + '70' }}
          >
            {LABELS[persona.id] ?? 'TRACK'}
          </p>

          {/* Spinning hologram emblem */}
          <div className="flex-1 flex items-center justify-center py-2">
            <HologramEmblem
              color={persona.accentColor}
              glowColor={persona.glowColor}
              codename={persona.codename}
              index={index}
              hovered={hovered}
            />
          </div>

          {/* Name */}
          <h3 className="font-display font-800 text-sm tracking-[0.18em] uppercase text-center text-light mt-3 mb-1">
            {persona.id}
          </h3>

          {/* Headline */}
          <p className="font-body text-xs text-center leading-relaxed px-2 mb-3" style={{ color: 'rgba(200,200,200,0.5)' }}>
            {persona.headline} {persona.subhead}
          </p>

          {/* CTA */}
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-200"
            style={{ color: hovered ? persona.accentColor : persona.accentColor + '45' }}
          >
            SELECT →
          </p>

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l pointer-events-none" style={{ borderColor: persona.accentColor + '55' }} />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: persona.accentColor + '55' }} />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l pointer-events-none" style={{ borderColor: persona.accentColor + '55' }} />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r pointer-events-none" style={{ borderColor: persona.accentColor + '55' }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DepthPersonaMenu({ personas }: Props) {
  return (
    <div style={{ perspective: '1200px' }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {personas.map((p, i) => (
          <PersonaCard key={p.id} persona={p} index={i} />
        ))}
      </div>
    </div>
  )
}
