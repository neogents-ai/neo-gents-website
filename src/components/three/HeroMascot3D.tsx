import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, useMotionValueEvent, type MotionValue } from 'framer-motion'

// <model-viewer> is a custom element; declare it for TS/JSX.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        'auto-rotate'?: boolean
        'rotation-per-second'?: string
        'disable-zoom'?: boolean
        'interaction-prompt'?: string
        exposure?: string
        'shadow-intensity'?: string
        'camera-orbit'?: string
        loading?: string
      }
    }
  }
}

interface Props {
  /** GLB path, e.g. '/models/nori.glb' */
  modelUrl: string
  /** 2D fallback image, shown until the 3D lib loads and for reduced-motion */
  fallbackSrc: string
  /** Scroll progress (0-1) driving the camera orbit */
  scrollProgress: MotionValue<number>
  className?: string
}

/**
 * 3D mascot via Google's <model-viewer> — it has built-in WebGL context-loss
 * recovery that raw react-three-fiber lacks, so it stays reliable on integrated
 * GPUs. The library is lazy-imported (heavy: bundles its own three) so the 2D
 * claymation still renders instantly, then the 3D swaps in. Scroll position
 * drives the camera orbit. Reduced-motion keeps the still.
 */
export default function HeroMascot3D({ modelUrl, fallbackSrc, scrollProgress, className }: Props) {
  const reducedMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const mvRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    let cancelled = false
    // Deferred import — registers the <model-viewer> custom element as its own chunk
    import('@google/model-viewer')
      .then(() => { if (!cancelled) setReady(true) })
      .catch(() => { /* stay on the 2D still */ })
    return () => { cancelled = true }
  }, [reducedMotion])

  // Feed scroll position into the camera azimuth for a scroll-linked orbit.
  useMotionValueEvent(scrollProgress, 'change', (v) => {
    const mv = mvRef.current
    if (!mv) return
    const theta = 20 + v * 320
    mv.setAttribute('camera-orbit', `${theta}deg 90deg 105%`)
  })

  const still = (
    <img
      src={fallbackSrc}
      alt="NEO Gents mascot"
      className="w-full h-full object-contain mix-blend-lighten drop-shadow-[0_0_40px_rgba(212,160,23,0.25)]"
    />
  )

  if (reducedMotion || !ready) return <div className={className}>{still}</div>

  return (
    <div className={className}>
      {/* @ts-expect-error — custom element props */}
      <model-viewer
        ref={mvRef}
        src={modelUrl}
        alt="NEO Gents 3D mascot"
        auto-rotate
        rotation-per-second="16deg"
        disable-zoom
        interaction-prompt="none"
        exposure="1.15"
        shadow-intensity="0"
        bounds="tight"
        camera-orbit="20deg 90deg 105%"
        camera-target="0m 0m 0m"
        loading="eager"
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      />
    </div>
  )
}
