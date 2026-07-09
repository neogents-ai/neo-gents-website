/**
 * NEO GENTS — Visual Asset Manifest
 * ============================================================
 * Central registry for all character / mascot / sprite assets.
 * Use this file to import asset metadata, generation configs,
 * and component references across the app.
 *
 * NOTE: This project uses lightweight CSS/SVG/Canvas sprites.
 * For true GLB/OBJ 3D models, see the `modelPrompts` section
 * below and run them through Blender, Spline, or Midjourney
 * -> Meshy -> GLB.
 */

export type AssetType = 'svg_mascot' | 'css3d_sprite' | 'canvas_effect' | 'image_ref' | 'model_prompt'
export type AssetStatus = 'ready' | 'placeholder' | 'needs_render'

export interface AssetEntry {
  id: string
  name: string
  personaId: string
  type: AssetType
  status: AssetStatus
  /** React component path (relative to src/components) */
  componentName: string
  /** Public file path if a static asset exists */
  publicPath?: string
  /** Primary brand color for this asset */
  accentColor: string
  /** Glow / ambient color */
  glowColor: string
  /** Dimensions in px (for image exports) */
  dimensions: { width: number; height: number }
  /** Tags for filtering */
  tags: string[]
}

export interface ImagePrompt {
  tool: 'midjourney' | 'dalle3' | 'stable-diffusion' | 'ideogram'
  prompt: string
  negativePrompt?: string
  aspectRatio: string
  styleRef?: string
  /** Recommended model or version */
  model?: string
}

export interface ModelPrompt {
  tool: 'meshy' | 'tripo' | 'spline' | 'blender'
  prompt: string
  format: 'glb' | 'obj' | 'fbx'
  polyCount: 'low' | 'medium' | 'high'
  rigged: boolean
}

export const assets: AssetEntry[] = [
  // -- NORI (Solopreneur) --------------------------------------
  {
    id: 'nori-mascot-2d',
    name: 'NORI Mascot (2D)',
    personaId: 'solopreneur',
    type: 'image_ref',
    status: 'ready',
    componentName: 'Nori3DSprite',
    publicPath: '/nori-mascot.jpg',
    accentColor: '#00B359',
    glowColor: 'rgba(0, 179, 89, 0.25)',
    dimensions: { width: 1024, height: 1024 },
    tags: ['mascot', 'solopreneur', 'green', 'existing'],
  },
  {
    id: 'nori-sprite-3d',
    name: 'NORI 3D Hologram Sprite',
    personaId: 'solopreneur',
    type: 'css3d_sprite',
    status: 'ready',
    componentName: 'Nori3DSprite',
    accentColor: '#00B359',
    glowColor: 'rgba(0, 179, 89, 0.25)',
    dimensions: { width: 512, height: 512 },
    tags: ['sprite', '3d', 'solopreneur', 'green', 'hologram'],
  },

  // -- MAKI (Students) -----------------------------------------
  {
    id: 'maki-mascot-2d',
    name: 'MAKI Mascot (2D)',
    personaId: 'students',
    type: 'svg_mascot',
    status: 'ready',
    componentName: 'MakiMascot',
    accentColor: '#D4A017',
    glowColor: 'rgba(212, 160, 23, 0.25)',
    dimensions: { width: 512, height: 512 },
    tags: ['mascot', 'students', 'gold', 'svg'],
  },
  {
    id: 'maki-sprite-3d',
    name: 'MAKI 3D Hologram Sprite',
    personaId: 'students',
    type: 'css3d_sprite',
    status: 'ready',
    componentName: 'Maki3DSprite',
    accentColor: '#D4A017',
    glowColor: 'rgba(212, 160, 23, 0.25)',
    dimensions: { width: 512, height: 512 },
    tags: ['sprite', '3d', 'students', 'gold', 'hologram'],
  },

  // -- MAC (Parents) -------------------------------------------
  {
    id: 'mac-mascot-2d',
    name: 'MAC Mascot (2D)',
    personaId: 'parents',
    type: 'svg_mascot',
    status: 'ready',
    componentName: 'MacMascot',
    accentColor: '#0D9488',
    glowColor: 'rgba(13, 148, 136, 0.25)',
    dimensions: { width: 512, height: 512 },
    tags: ['mascot', 'parents', 'teal', 'svg'],
  },
  {
    id: 'mac-sprite-3d',
    name: 'MAC 3D Hologram Sprite',
    personaId: 'parents',
    type: 'css3d_sprite',
    status: 'ready',
    componentName: 'Mac3DSprite',
    accentColor: '#0D9488',
    glowColor: 'rgba(13, 148, 136, 0.25)',
    dimensions: { width: 512, height: 512 },
    tags: ['sprite', '3d', 'parents', 'teal', 'hologram'],
  },
]

/** -----------------------------------------------------------
 *  IMAGE GENERATION PROMPTS
 *  Paste these into Midjourney / DALL-E / SD to create
 *  production-ready static assets.
 * ----------------------------------------------------------- */
export const imagePrompts: Record<string, ImagePrompt> = {
  'nori-mascot-v2': {
    tool: 'midjourney',
    prompt:
      'A sleek cyberpunk business-samurai mascot named NORI, wearing a dark emerald-green tech suit with holographic gold circuit patterns. ' +
      'Holding a glowing tablet displaying AI agent icons. Standing in a neon-lit futuristic city street at night. ' +
      'Clean vector-like illustration style, flat colors with subtle gradients, black background, suitable for a tech startup logo. ' +
      'High contrast, sharp edges, no text.',
    negativePrompt: 'text, words, letters, watermark, blurry, low quality, photorealistic, human face',
    aspectRatio: '1:1',
    model: 'midjourney v6',
  },

  'maki-mascot-v1': {
    tool: 'midjourney',
    prompt:
      'A youthful energetic student mascot named MAKI, gender-neutral, wearing a gold and black hoodie with futuristic headphones. ' +
      'Holding a glowing holographic book and a game controller. Confident smirk. ' +
      'Geometric vector illustration style, gold (#D4A017) and dark charcoal palette, crisp linework, black background. ' +
      'Esports-meets-education aesthetic. No text.',
    negativePrompt: 'text, words, letters, watermark, blurry, low quality, photorealistic',
    aspectRatio: '1:1',
    model: 'midjourney v6',
  },

  'mac-mascot-v1': {
    tool: 'midjourney',
    prompt:
      'A wise, calm guardian mascot named MAC, gender-neutral, wearing a teal and slate armored robe with soft glowing lines. ' +
      'Holding a glowing shield orb that displays a family tree hologram. Protective stance. ' +
      'Geometric vector illustration style, teal (#0D9488) and dark navy palette, crisp linework, black background. ' +
      'Family-CFO-meets-futuristic-knight aesthetic. No text.',
    negativePrompt: 'text, words, letters, watermark, blurry, low quality, photorealistic',
    aspectRatio: '1:1',
    model: 'midjourney v6',
  },

  'nori-3d-render': {
    tool: 'midjourney',
    prompt:
      '3D isometric render of a cyberpunk business-samurai character NORI, green chrome armor, holographic UI floating around him. ' +
      'Low-poly game asset style, soft studio lighting, pure black background, octane render aesthetic. ' +
      'Clean geometry, subsurface scattering on emerald visor. No text.',
    negativePrompt: 'text, words, letters, watermark, blurry, low quality',
    aspectRatio: '1:1',
    model: 'midjourney v6',
  },

  'maki-3d-render': {
    tool: 'midjourney',
    prompt:
      '3D isometric render of a youthful student character MAKI, gold chrome hoodie and headphones, holographic book and controller floating nearby. ' +
      'Low-poly game asset style, soft studio lighting, pure black background, octane render aesthetic. ' +
      'Clean geometry, metallic gold accents. No text.',
    negativePrompt: 'text, words, letters, watermark, blurry, low quality',
    aspectRatio: '1:1',
    model: 'midjourney v6',
  },

  'mac-3d-render': {
    tool: 'midjourney',
    prompt:
      '3D isometric render of a guardian knight character MAC, teal chrome armor and robe, glowing shield orb with family hologram. ' +
      'Low-poly game asset style, soft studio lighting, pure black background, octane render aesthetic. ' +
      'Clean geometry, subsurface scattering on teal visor. No text.',
    negativePrompt: 'text, words, letters, watermark, blurry, low quality',
    aspectRatio: '1:1',
    model: 'midjourney v6',
  },
}

/** -----------------------------------------------------------
 *  3D MODEL GENERATION PROMPTS
 *  Use these with Meshy, Tripo, Spline, or Blender to create
 *  true 3D assets (GLB/OBJ) for advanced WebGL pipelines.
 * ----------------------------------------------------------- */
export const modelPrompts: Record<string, ModelPrompt> = {
  'nori-model': {
    tool: 'meshy',
    prompt:
      'Cyberpunk business-samurai, emerald green chrome tech suit, holographic gold circuit patterns, ' +
      'holding a glowing tablet, low-poly game character, clean topology, T-pose',
    format: 'glb',
    polyCount: 'medium',
    rigged: true,
  },
  'maki-model': {
    tool: 'meshy',
    prompt:
      'Youthful student character, gold chrome hoodie, futuristic headphones, holding holographic book and controller, ' +
      'low-poly game character, clean topology, T-pose',
    format: 'glb',
    polyCount: 'medium',
    rigged: true,
  },
  'mac-model': {
    tool: 'meshy',
    prompt:
      'Guardian knight character, teal chrome armor and slate robe, glowing shield orb, protective stance, ' +
      'low-poly game character, clean topology, T-pose',
    format: 'glb',
    polyCount: 'medium',
    rigged: true,
  },
}

/** Helper: get all assets for a persona */
export function getAssetsByPersona(personaId: string): AssetEntry[] {
  return assets.filter(a => a.personaId === personaId)
}

/** Helper: get first ready asset of a given type for a persona */
export function getPrimaryAsset(personaId: string, type: AssetType): AssetEntry | undefined {
  return assets.find(a => a.personaId === personaId && a.type === type && a.status === 'ready')
}
