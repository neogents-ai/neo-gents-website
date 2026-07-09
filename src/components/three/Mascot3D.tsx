import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  /** GLB path, e.g. '/models/maki.glb' */
  modelUrl: string
  /** 2D fallback still, shown until near-viewport + lib loads, and for reduced-motion */
  fallbackSrc: string
  alt: string
  className?: string
  /** drop-shadow glow color */
  glow?: string
  /**
   * Camera framing. Radius as a % of the auto-fit distance — >100% zooms out
   * so the whole character sits centered with margin instead of edge-to-edge.
   */
  orbit?: string
  /**
   * Continuous auto-rotate. Off by default for small selector/thumbnail uses
   * (a full spin means it can land face-away, e.g. Nori's blank rice back —
   * bad for a card meant for quick recognition). Turn on for larger showcase
   * placements where users have time to appreciate the turn.
   */
  autoRotate?: boolean
}

/**
 * Scroll-triggered 3D mascot for content sections. Uses <model-viewer> (reliable
 * WebGL context recovery) and only mounts the heavy element once scrolled near,
 * so off-screen chapters don't hold a GPU context. Falls back to the claymation
 * still for reduced-motion or before it's revealed.
 */
export default function Mascot3D({ modelUrl, fallbackSrc, alt, className, glow = 'rgba(212,160,23,0.3)', orbit = '0deg 90deg 105%', autoRotate = false }: Props) {
  const reducedMotion = useReducedMotion()
  const [near, setNear] = useState(false)
  const [ready, setReady] = useState(false)
  const hostRef = useRef<HTMLDivElement>(null)
  const mvRef = useRef<HTMLElement>(null)

  // Reveal when the section scrolls near the viewport
  useEffect(() => {
    if (reducedMotion) return
    const host = hostRef.current
    if (!host) return
    const io = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) setNear(true) },
      { rootMargin: '200px' },
    )
    io.observe(host)
    return () => io.disconnect()
  }, [reducedMotion])

  // Load the library once revealed
  useEffect(() => {
    if (!near || reducedMotion) return
    let cancelled = false
    import('@google/model-viewer')
      .then(() => { if (!cancelled) setReady(true) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [near, reducedMotion])

  const still = (
    <img
      src={fallbackSrc}
      alt={alt}
      className="w-full h-full object-contain mix-blend-lighten"
      style={{ filter: `drop-shadow(0 0 50px ${glow})` }}
    />
  )

  return (
    <div ref={hostRef} className={className}>
      {reducedMotion || !ready ? (
        still
      ) : (
        /* @ts-expect-error — custom element props */
        <model-viewer
          ref={mvRef}
          src={modelUrl}
          alt={alt}
          {...(autoRotate ? { 'auto-rotate': true } : {})}
          rotation-per-second="18deg"
          disable-zoom
          interaction-prompt="none"
          exposure="1.15"
          shadow-intensity="0"
          bounds="tight"
          camera-orbit={orbit}
          camera-target="0m 0m 0m"
          loading="eager"
          style={{ width: '100%', height: '100%', background: 'transparent', filter: `drop-shadow(0 0 40px ${glow})` }}
        />
      )}
    </div>
  )
}
