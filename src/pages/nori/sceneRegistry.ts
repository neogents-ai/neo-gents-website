export type NoriScene = 'hero' | 'map' | 'dossier' | 'matrix' | 'pipeline'

export const noriSceneOrder: NoriScene[] = [
  'hero',
  'map',
  'dossier',
  'matrix',
  'pipeline',
]

export const noriSceneLabels: Record<NoriScene, string> = {
  hero: 'Clarity',
  map: 'Map',
  dossier: 'Nori',
  matrix: 'Clients of Nori',
  pipeline: 'Delivery',
}

export const noriSceneEditors: Record<NoriScene, string> = {
  hero: 'Hero copy and mascot: NoriCinematicPage.tsx with noriPositioning.ts',
  map: 'Free clarity-map prompts and results: NoriCinematicPage.tsx with noriPositioning.ts',
  dossier: 'Nori capabilities, skills, agents, models, and guardrails: NoriCinematicPage.tsx',
  matrix: 'Example workflows and client proof rail: noriPositioning.ts',
  pipeline: 'Nori to NEO Gents delivery stages: noriPositioning.ts',
}
