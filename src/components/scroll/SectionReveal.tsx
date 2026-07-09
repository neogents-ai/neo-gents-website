import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
}

/** Viewport-triggered reveal — children stagger in as the section scrolls into view */
export default function SectionReveal({
  children,
  index = 0,
  className,
  amount = 0.4,
}: {
  children: ReactNode
  index?: number
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
