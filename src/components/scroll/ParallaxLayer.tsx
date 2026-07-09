import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-linked parallax wrapper. speed < 1 lags behind the scroll (background),
 * speed > 1 runs ahead of it (foreground). speed = 1 is static.
 */
export default function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const range = 120 * (1 - speed)
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
