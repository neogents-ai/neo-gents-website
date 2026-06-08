/**
 * HQBackground — Wakandan HQ inside the Matrix
 * Layer 1: breathing wall panels
 * Layer 2: vibranium circuit traces (SVG)
 * Layer 3: depth vignette
 */
export default function HQBackground() {
  const panels = Array.from({ length: 24 })

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* Layer 1 — Wall panels */}
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}
      >
        {panels.map((_, i) => (
          <div
            key={i}
            className="hq-panel"
            style={{ animationDelay: `${(i * 0.25) % 3}s` }}
          />
        ))}
      </div>

      {/* Layer 2 — Circuit traces (SVG overlay) */}
      <svg
        className="absolute inset-0 w-full h-full hq-circuits"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal main traces */}
        <line x1="0" y1="225" x2="1440" y2="225" stroke="#D4A017" strokeWidth="1.2" />
        <line x1="0" y1="450" x2="1440" y2="450" stroke="#D4A017" strokeWidth="1.2" />
        <line x1="0" y1="675" x2="1440" y2="675" stroke="#D4A017" strokeWidth="1.2" />

        {/* Vertical traces */}
        <line x1="240" y1="0" x2="240" y2="900" stroke="#D4A017" strokeWidth="1.2" />
        <line x1="720" y1="0" x2="720" y2="900" stroke="#D4A017" strokeWidth="1.2" />
        <line x1="1200" y1="0" x2="1200" y2="900" stroke="#D4A017" strokeWidth="1.2" />

        {/* Secondary horizontal traces */}
        <line x1="0" y1="112" x2="1440" y2="112" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />
        <line x1="0" y1="337" x2="1440" y2="337" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />
        <line x1="0" y1="562" x2="1440" y2="562" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />
        <line x1="0" y1="787" x2="1440" y2="787" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />

        {/* Secondary vertical traces */}
        <line x1="120" y1="0" x2="120" y2="900" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />
        <line x1="480" y1="0" x2="480" y2="900" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />
        <line x1="960" y1="0" x2="960" y2="900" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />
        <line x1="1320" y1="0" x2="1320" y2="900" stroke="#D4A017" strokeWidth="0.4" opacity="0.4" />

        {/* Hexagonal nodes at intersections */}
        {[
          [240, 225], [720, 225], [1200, 225],
          [240, 450], [720, 450], [1200, 450],
          [240, 675], [720, 675], [1200, 675],
        ].map(([cx, cy], i) => (
          <polygon
            key={i}
            points={`${cx},${cy - 10} ${cx + 9},${cy - 5} ${cx + 9},${cy + 5} ${cx},${cy + 10} ${cx - 9},${cy + 5} ${cx - 9},${cy - 5}`}
            stroke="#D4A017"
            strokeWidth="1.2"
            fill="rgba(212,160,23,0.08)"
          />
        ))}

        {/* Diagonal accent traces */}
        <line x1="0" y1="0" x2="240" y2="225" stroke="#1e293b" strokeWidth="1" />
        <line x1="1440" y1="0" x2="1200" y2="225" stroke="#1e293b" strokeWidth="1" />
        <line x1="0" y1="900" x2="240" y2="675" stroke="#1e293b" strokeWidth="1" />
        <line x1="1440" y1="900" x2="1200" y2="675" stroke="#1e293b" strokeWidth="1" />
        {/* Additional slate diagonals for depth */}
        <line x1="480" y1="0" x2="720" y2="225" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
        <line x1="960" y1="0" x2="720" y2="225" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
        <line x1="480" y1="900" x2="720" y2="675" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
        <line x1="960" y1="900" x2="720" y2="675" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
      </svg>

      {/* Layer 3 — Depth vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(22,27,34,0.6) 100%)',
        }}
      />
    </div>
  )
}
