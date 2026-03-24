import { useEffect, useRef } from 'react'

interface DigitalRainProps {
  opacity?: number
  density?: number
  className?: string
}

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

export default function DigitalRain({ opacity = 0.06, density = 0.8, className = '' }: DigitalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fontSize = 14
    let columns: number[] = []
    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const cols = Math.floor(canvas.width / fontSize)
      columns = Array.from({ length: cols }, () => Math.random() * -100)
    }

    const getColor = (index: number) => {
      const mod = index % 12
      if (mod < 6) return `rgba(212, 160, 23, ${opacity})`      // Gold
      if (mod < 10) return `rgba(58, 26, 110, ${opacity * 1.5})` // Violet
      return `rgba(0, 179, 89, ${opacity * 0.7})`               // Green hint
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      columns.forEach((y, i) => {
        if (Math.random() > density) return
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillStyle = getColor(i)
        ctx.fillText(char, i * fontSize, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          columns[i] = 0
        } else {
          columns[i] = y + 1
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [opacity, density])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
