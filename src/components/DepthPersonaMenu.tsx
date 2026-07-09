import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { type PersonaConfig } from '../data/personas'
import PersonaSprite from './PersonaSprite'

interface Props {
  personas: PersonaConfig[]
}

const LABELS: Record<string, string> = {
  'soulfood-sushi': 'TRACK 01',
  nori:        'TRACK 02',
  students:    'TRACK 01',
  parents:     'TRACK 02',
  solopreneur: 'TRACK 03',
  creators:    'TRACK 04',
}



function PersonaCard({
  persona,
  index,
  selectedId,
  onSelect,
}: {
  persona: PersonaConfig
  index: number
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const isSelected = selectedId === persona.id
  const isDeselected = selectedId !== null && !isSelected

  const rawX = useSpring(0, { stiffness: 160, damping: 20 })
  const rawY = useSpring(0, { stiffness: 160, damping: 20 })
  const rotateX = useTransform(rawY, [-1, 1], [12, -12])
  const rotateY = useTransform(rawX, [-1, 1], [-12, 12])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (selectedId) return
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
      animate={
        isSelected
          ? { opacity: 1, y: 0, scale: 1 }
          : isDeselected
          ? { opacity: 0, scale: 0.75, y: 30, filter: 'blur(4px)' }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={
        isDeselected
          ? { duration: 0.35, ease: 'easeIn' }
          : { delay: selectedId ? 0 : index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      }
      onMouseLeave={onMouseLeave}
      className="relative flex flex-col items-center"
    >
      {/* Ground glow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl pointer-events-none transition-opacity duration-300"
        style={{ background: persona.glowColor, opacity: isSelected ? 1 : hovered ? 0.7 : 0.35 }}
      />

      {/* 3D card */}
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => !selectedId && setHovered(true)}
        onMouseLeave={onMouseLeave}
        onClick={() => !selectedId && onSelect(persona.id)}
        animate={
          isSelected
            ? { rotate: [0, -8, 8, -4, 720], scale: [1, 1.08, 1.08, 1.08, 0] }
            : {}
        }
        transition={
          isSelected
            ? { duration: 0.65, ease: [0.4, 0, 0.2, 1], times: [0, 0.15, 0.3, 0.45, 1] }
            : {}
        }
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', cursor: selectedId ? 'default' : 'pointer', willChange: 'transform' }}
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
          style={
            persona.codename === 'N'
              ? {
                  border: '1px solid transparent',
                  background: hovered
                    ? `radial-gradient(ellipse at 50% 20%, ${persona.accentColor}14 0%, rgba(30,35,44,0.98) 70%) padding-box, linear-gradient(135deg, #D4A017, #1e293b, #00B359) border-box`
                    : `linear-gradient(rgba(30,35,44,0.95), rgba(30,35,44,0.95)) padding-box, linear-gradient(135deg, #D4A01735, #1e293b35, #00B35935) border-box`,
                  boxShadow: hovered
                    ? `0 0 28px ${persona.accentColor}1a, inset 0 0 20px ${persona.accentColor}08`
                    : `0 0 6px ${persona.accentColor}06`,
                  minHeight: '320px',
                  borderRadius: '2px',
                }
              : {
                  border: `1px solid ${hovered ? persona.accentColor + 'BB' : persona.accentColor + '40'}`,
                  background: hovered
                    ? `radial-gradient(ellipse at 50% 20%, ${persona.accentColor}14 0%, rgba(30,35,44,0.98) 70%)`
                    : 'rgba(30,35,44,0.95)',
                  boxShadow: hovered
                    ? `0 0 28px ${persona.accentColor}1a, inset 0 0 20px ${persona.accentColor}08`
                    : `0 0 6px ${persona.accentColor}06`,
                  minHeight: '320px',
                  borderRadius: '2px',
                }
          }
        >
          {/* Track label */}
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase self-start mb-3"
            style={{ color: persona.accentColor + '70' }}
          >
            {LABELS[persona.id] ?? 'TRACK'}
          </p>

          {/* Persona 3D sprite / mascot */}
          <div className="flex-1 flex items-center justify-center py-2 overflow-hidden">
            <div className="scale-[0.72] sm:scale-[0.85] md:scale-100 origin-center transition-transform duration-300">
              <PersonaSprite
                persona={persona}
                index={index}
                hovered={hovered}
              />
            </div>
          </div>

          {/* Name */}
          <h3 className="font-display font-800 text-sm tracking-[0.18em] uppercase text-center text-light mt-3 mb-1">
            {persona.codename}
          </h3>

          {/* Card copy — fixed height so cards stay level regardless of how many lines the copy wraps to */}
          <p className="font-body text-xs text-center leading-relaxed px-2 mb-1 min-h-[58px] flex items-center justify-center" style={{ color: 'rgba(200,200,200,0.5)' }}>
            {persona.cardLine}
          </p>
          {persona.cardQuote && (
            <p className="font-mono text-[9px] text-center px-2 mb-3" style={{ color: 'rgba(200,200,200,0.3)' }}>
              {persona.cardQuote}
            </p>
          )}

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
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function handleSelect(id: string) {
    setSelectedId(id)
    const persona = personas.find(p => p.id === id)
    if (!persona) return
    // Wait for hyper-spin animation to finish, then navigate
    setTimeout(() => navigate(persona.route), 650)
  }

  return (
    <div style={{ perspective: '1200px' }}>
      <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto">
        {personas.map((p, i) => (
          <PersonaCard
            key={p.id}
            persona={p}
            index={i}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}
