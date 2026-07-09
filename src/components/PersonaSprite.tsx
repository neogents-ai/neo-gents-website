/**
 * PersonaSprite — Dynamic mascot / 3D sprite resolver
 * ============================================================
 * Maps a persona ID to its matching 3D sprite or 2D mascot
 * component. Falls back to HologramEmblem for legacy personas.
 *
 * Usage:
 *   <PersonaSprite persona={persona} size={180} hovered={true} index={0} />
 */

import { type PersonaConfig } from '../data/personas'
import HologramEmblem from './HologramEmblem'
import Maki3DSprite from './Maki3DSprite'
import Mac3DSprite from './Mac3DSprite'
import Nori3DSprite from './Nori3DSprite'
import Mascot3D from './three/Mascot3D'

interface Props {
  persona: PersonaConfig
  size?: number
  hovered?: boolean
  index?: number
}

// Real 3D GLB per active profile, with its claymation still as fallback.
const MODEL_BY_ID: Record<string, { model: string; still: string; glow: string }> = {
  'soulfood-sushi': { model: '/models/maki.glb', still: '/maki-full.png', glow: 'rgba(212,160,23,0.35)' },
  nori: { model: '/models/nori.glb', still: '/nori-full.png', glow: 'rgba(0,179,89,0.35)' },
}

export default function PersonaSprite({ persona, size = 180, hovered = false, index = 0 }: Props) {
  // Live 3D render for the two active buyer profiles, centered in the card.
  const model = MODEL_BY_ID[persona.id]
  if (model) {
    return (
      <div style={{ width: size, height: size }} className="flex items-center justify-center">
        <Mascot3D
          modelUrl={model.model}
          fallbackSrc={model.still}
          alt={persona.codename}
          glow={model.glow}
          orbit="0deg 90deg 108%"
          className="w-full h-full"
        />
      </div>
    )
  }

  // Legacy persona ids — keep the old sprites as a safety net
  if (persona.id === 'students') {
    return <Maki3DSprite size={size} hovered={hovered} index={index} />
  }
  if (persona.id === 'parents') {
    return <Mac3DSprite size={size} hovered={hovered} index={index} />
  }
  if (persona.id === 'solopreneur') {
    return (
      <Nori3DSprite
        size={size}
        hovered={hovered}
        index={index}
        src={persona.assets?.mascot2d}
      />
    )
  }

  // Fallback — creators (codename 'N') still use the classic octagon emblem
  return (
    <HologramEmblem
      color={persona.accentColor}
      glowColor={persona.glowColor}
      codename={persona.codename}
      personaId={persona.id}
      index={index}
      hovered={hovered}
      size={size}
    />
  )
}
