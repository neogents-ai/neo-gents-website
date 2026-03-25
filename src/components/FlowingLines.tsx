import { useEffect, useRef } from 'react'

const BRAND_COLORS = ['#D4A017', '#9B59B6', '#00B359']

interface Line {
  baseY: number
  amplitude: number
  frequency: number
  speed: number
  phase: number
  color: string
  particleColor: string
  opacity: number
  particles: { t: number; speed: number; radius: number }[]
}

interface Props {
  dominantColor?: string
  opacity?: number
  lineCount?: number
}

function buildColorPool(dominantColor?: string): string[] {
  if (!dominantColor) return BRAND_COLORS
  const others = BRAND_COLORS.filter(c => c.toLowerCase() !== dominantColor.toLowerCase())
  // 50% dominant, 25% each other
  return [dominantColor, dominantColor, others[0], others[1]]
}

// Sheet = a cluster of tightly-packed lines that read as one flowing ribbon
function buildLines(count: number, height: number, colorPool: string[]): Line[] {
  const sheetCount = 3
  const linesPerSheet = Math.ceil(count / sheetCount)
  const lines: Line[] = []

  // Place sheet centers at roughly 25%, 55%, 80% of canvas height
  const sheetCenters = [0.25, 0.55, 0.82].map(f => f * height)

  for (let s = 0; s < sheetCount; s++) {
    const sheetY = sheetCenters[s]
    const sheetColor = colorPool[s % colorPool.length]
    const dotColor = colorPool[(s + 1) % colorPool.length]
    // All lines in a sheet share a base frequency and phase — they undulate together
    const sheetFreq = 0.003 + Math.random() * 0.003
    const sheetPhase = Math.random() * Math.PI * 2
    const sheetSpeed = 0.003 + Math.random() * 0.003

    for (let i = 0; i < linesPerSheet; i++) {
      // Each line is offset slightly in Y from the sheet center — tight cluster
      const yOffset = (i - linesPerSheet / 2) * 12
      // Small phase nudge per line so they're not perfectly stacked
      const phaseNudge = (i / linesPerSheet) * 0.4

      lines.push({
        baseY: sheetY + yOffset,
        amplitude: 40 + Math.random() * 30,
        frequency: sheetFreq + Math.random() * 0.001,
        speed: sheetSpeed,
        phase: sheetPhase + phaseNudge,
        color: sheetColor,
        particleColor: dotColor,
        // Lines at center of sheet are brightest, edges fade out
        opacity: 0.12 + 0.35 * (1 - Math.abs(i - linesPerSheet / 2) / (linesPerSheet / 2)),
        particles: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => ({
          t: Math.random(),
          speed: 0.0008 + Math.random() * 0.0015,
          radius: 1 + Math.random() * 1.2,
        })),
      })
    }
  }

  return lines
}

export default function FlowingLines({ dominantColor, opacity = 0.85, lineCount = 9 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const linesRef = useRef<Line[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colorPool = buildColorPool(dominantColor)

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      linesRef.current = buildLines(lineCount, canvas.height, colorPool)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const line of linesRef.current) {
        // Draw sine wave
        ctx.beginPath()
        ctx.globalAlpha = line.opacity * opacity
        ctx.strokeStyle = line.color
        ctx.lineWidth = 0.8
        ctx.shadowBlur = 10
        ctx.shadowColor = line.color

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = line.baseY + line.amplitude * Math.sin(line.frequency * x + line.phase)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Draw particles along the wave
        for (const p of line.particles) {
          const px = p.t * canvas.width
          const py = line.baseY + line.amplitude * Math.sin(line.frequency * px + line.phase)

          ctx.beginPath()
          ctx.globalAlpha = (line.opacity + 0.2) * opacity
          ctx.fillStyle = line.particleColor
          ctx.shadowBlur = 14
          ctx.shadowColor = line.particleColor
          ctx.arc(px, py, p.radius, 0, Math.PI * 2)
          ctx.fill()

          p.t = (p.t + p.speed) % 1
        }

        line.phase += line.speed
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [dominantColor, opacity, lineCount])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
