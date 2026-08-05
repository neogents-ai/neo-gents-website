import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import HeroMascot3D from '../components/three/HeroMascot3D'
import './NoriCinematicPage.css'

type SystemMode = 'growth' | 'creator'
type Scene = 'hero' | 'map' | 'matrix' | 'pipeline'

const systemContent: Record<SystemMode, {
  label: string
  eyebrow: string
  description: string
  pipeline: string[]
  recommendation: string
  outcome: string
}> = {
  growth: {
    label: 'Growth System',
    eyebrow: 'BUSINESS OPERATIONS',
    description: 'Turn an operating bottleneck into a human-approved workflow.',
    pipeline: ['Capture', 'Qualify', 'Follow up', 'Book', 'Human handoff'],
    recommendation: 'Lead response and qualification map',
    outcome: 'A clear handoff from first signal to a real person.',
  },
  creator: {
    label: 'Creator System',
    eyebrow: 'CREATOR OPERATIONS',
    description: 'Turn a content idea into a repeatable publishing rhythm.',
    pipeline: ['Concept', 'Script', 'Produce', 'Repurpose', 'Review', 'Publish'],
    recommendation: 'Content production and review map',
    outcome: 'A repeatable route from raw idea to approved distribution.',
  },
}

const agentLanes = [
  { code: '01', name: 'Strategy', detail: 'Clarify the goal, constraints, and next decision.' },
  { code: '02', name: 'Agent Design', detail: 'Scope the workflow before anything is built.' },
  { code: '03', name: 'Security', detail: 'Keep permissions, data, and approvals in their lane.' },
  { code: '04', name: 'Research', detail: 'Collect evidence before the system recommends action.' },
  { code: '05', name: 'Distribution', detail: 'Prepare content and outreach workflows for review.' },
  { code: '06', name: 'Production', detail: 'Turn approved plans into polished assets and handoffs.' },
]

const libraryPreviews = [
  { title: 'Lead Response', detail: 'Capture intent and route a qualified prospect to your team.' },
  { title: 'Content Engine', detail: 'Map ideas, production, review, and repurposing in one rhythm.' },
  { title: 'Operations Desk', detail: 'Outline repeatable handoffs before operational work is automated.' },
]

function useCompactLayout() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 899px)')
    const sync = () => setCompact(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return compact
}

interface BuildMapPanelProps {
  mode: SystemMode
  setMode: (mode: SystemMode) => void
  prompt: string
  setPrompt: (value: string) => void
  previewVisible: boolean
  onPreview: () => void
  compact?: boolean
}

function BuildMapPanel({
  mode,
  setMode,
  prompt,
  setPrompt,
  previewVisible,
  onPreview,
  compact = false,
}: BuildMapPanelProps) {
  const content = systemContent[mode]

  return (
    <section className={`nori-build-map ${compact ? 'nori-build-map--compact' : ''}`} aria-labelledby="build-map-heading">
      <div className="nori-build-map__topline">
        <span className="nori-kicker">BUILD MAP / LOCAL PREVIEW</span>
        <span className="nori-build-map__status">NO DATA SENT</span>
      </div>
      <h2 id="build-map-heading">Start with the work that keeps slipping.</h2>
      <div className="nori-system-toggle" role="group" aria-label="Choose a system type">
        {(['growth', 'creator'] as const).map((item) => (
          <button
            className={mode === item ? 'is-active' : ''}
            key={item}
            type="button"
            onClick={() => setMode(item)}
          >
            {systemContent[item].label}
          </button>
        ))}
      </div>
      <label className="nori-build-map__label" htmlFor={compact ? 'nori-goal-compact' : 'nori-goal'}>
        What outcome are you trying to create?
      </label>
      <textarea
        id={compact ? 'nori-goal-compact' : 'nori-goal'}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value.slice(0, 420))}
        placeholder={mode === 'growth' ? 'Example: stop losing leads after a missed call' : 'Example: turn one long video into a weekly content system'}
        maxLength={420}
        rows={compact ? 4 : 3}
      />
      <div className="nori-build-map__actions">
        <p>Use non-confidential details only. This preview stays in your browser.</p>
        <button className="nori-command-button" type="button" onClick={onPreview}>
          Generate preview <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
      {previewVisible && (
        <div className="nori-preview" role="status">
          <div>
            <span>DRAFT BUILD MAP</span>
            <strong>{content.recommendation}</strong>
          </div>
          <p>{content.outcome}</p>
          <ol>
            {content.pipeline.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
          </ol>
        </div>
      )}
    </section>
  )
}

function Pipeline({ mode }: { mode: SystemMode }) {
  const content = systemContent[mode]
  return (
    <div className="nori-pipeline" aria-label={`${content.label} steps`}>
      <div className="nori-pipeline__heading">
        <span className="nori-kicker">{content.eyebrow}</span>
        <h2>{content.label}</h2>
        <p>{content.description}</p>
      </div>
      <ol>
        {content.pipeline.map((step, index) => (
          <li key={step}>
            <span className="nori-pipeline__number">{String(index + 1).padStart(2, '0')}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function DesktopExperience({
  trackRef,
  scrollProgress,
  mode,
  setMode,
  prompt,
  setPrompt,
  previewVisible,
  onPreview,
}: {
  trackRef: React.RefObject<HTMLElement | null>
  scrollProgress: MotionValue<number>
  mode: SystemMode
  setMode: (mode: SystemMode) => void
  prompt: string
  setPrompt: (value: string) => void
  previewVisible: boolean
  onPreview: () => void
}) {
  const [scene, setScene] = useState<Scene>('hero')
  const heroOpacity = useTransform(scrollProgress, [0, 0.17, 0.25], [1, 1, 0])
  const heroY = useTransform(scrollProgress, [0, 0.25], ['0%', '-18%'])
  const heroScale = useTransform(scrollProgress, [0, 0.25], [1, 0.82])
  const mapOpacity = useTransform(scrollProgress, [0.16, 0.27, 0.45, 0.54], [0, 1, 1, 0])
  const mapY = useTransform(scrollProgress, [0.16, 0.27, 0.54], ['16%', '0%', '-16%'])
  const matrixOpacity = useTransform(scrollProgress, [0.45, 0.55, 0.72, 0.8], [0, 1, 1, 0])
  const matrixScale = useTransform(scrollProgress, [0.45, 0.55, 0.8], [0.86, 1, 1.08])
  const pipelineOpacity = useTransform(scrollProgress, [0.7, 0.81], [0, 1])
  const pipelineY = useTransform(scrollProgress, [0.7, 0.81], ['15%', '0%'])

  useMotionValueEvent(scrollProgress, 'change', (value) => {
    const next: Scene = value < 0.24 ? 'hero' : value < 0.52 ? 'map' : value < 0.77 ? 'matrix' : 'pipeline'
    setScene((current) => current === next ? current : next)
  })

  const sceneStyle = (name: Scene) => ({ pointerEvents: scene === name ? 'auto' as const : 'none' as const })

  return (
    <section className="nori-cinematic__track" ref={trackRef}>
      <div className="nori-cinematic__viewport">
        <div className="nori-cinematic__stars" aria-hidden="true" />
        <div className="nori-cinematic__horizon" aria-hidden="true" />
        <div className="nori-cinematic__progress" aria-hidden="true">
          <span className={scene === 'hero' ? 'is-current' : ''}>01 ROOT</span>
          <span className={scene === 'map' ? 'is-current' : ''}>02 MAP</span>
          <span className={scene === 'matrix' ? 'is-current' : ''}>03 ROUTE</span>
          <span className={scene === 'pipeline' ? 'is-current' : ''}>04 SYSTEM</span>
        </div>

        <motion.section className="nori-scene nori-scene--hero" style={{ opacity: heroOpacity, y: heroY, scale: heroScale, ...sceneStyle('hero') }} aria-hidden={scene !== 'hero'}>
          <div className="nori-hero__copy">
            <p className="nori-kicker">N.O.R.I. / AI OPERATING SYSTEM</p>
            <h1>Turn your bottleneck into an agent system.</h1>
            <p className="nori-hero__lede">For businesses and creators: Nori maps the work, recommends the right agent lane, and gives you a human-approved system plan to install.</p>
            <div className="nori-offer-path" aria-label="Nori Build Map delivery path">
              <span><b>01</b> Map the bottleneck</span>
              <span><b>02</b> Review the system</span>
              <span><b>03</b> Approve the install</span>
            </div>
            <button className="nori-command-button" type="button" onClick={() => window.scrollBy({ top: window.innerHeight * 1.1, behavior: 'smooth' })}>
              Build your system <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
          <div className="nori-hero__mascot-wrap">
            <div className="nori-hero__halo" aria-hidden="true" />
            <HeroMascot3D modelUrl="/models/nori.glb" fallbackSrc="/nori-full.png" scrollProgress={scrollProgress} className="nori-hero__mascot" />
            <span className="nori-hero__caption">N.O.R.I. / NEO OPTIMIZATION &amp; REVENUE INFRASTRUCTURE</span>
          </div>
        </motion.section>

        <motion.div className="nori-scene nori-scene--map" style={{ opacity: mapOpacity, y: mapY, ...sceneStyle('map') }} aria-hidden={scene !== 'map'}>
          <BuildMapPanel mode={mode} setMode={setMode} prompt={prompt} setPrompt={setPrompt} previewVisible={previewVisible} onPreview={onPreview} />
        </motion.div>

        <motion.section className="nori-scene nori-scene--matrix" style={{ opacity: matrixOpacity, scale: matrixScale, ...sceneStyle('matrix') }} aria-hidden={scene !== 'matrix'}>
          <div className="nori-matrix__intro">
            <p className="nori-kicker">THE NEO GENTS MATRIX</p>
            <h2>One root agent. Clear lanes.</h2>
            <p>Nori does not blur every task into one black box. It identifies the job, then holds the boundaries around it.</p>
          </div>
          <div className="nori-matrix__grid">
            {agentLanes.map((lane) => (
              <article key={lane.code}>
                <span>{lane.code}</span>
                <h3>{lane.name}</h3>
                <p>{lane.detail}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="nori-scene nori-scene--pipeline" style={{ opacity: pipelineOpacity, y: pipelineY, ...sceneStyle('pipeline') }} aria-hidden={scene !== 'pipeline'}>
          <Pipeline mode={mode} />
          <div className="nori-scene--pipeline__actions">
            <Link className="nori-command-button" to="/waitlist?profile=nori">Request your Build Map <span aria-hidden="true">-&gt;</span></Link>
            <a className="nori-link-button" href="https://neogents.tech">Open Command Center <span aria-hidden="true">-&gt;</span></a>
          </div>
        </motion.section>
      </div>
    </section>
  )
}

function FlowExperience({
  mode,
  setMode,
  prompt,
  setPrompt,
  previewVisible,
  onPreview,
}: Omit<BuildMapPanelProps, 'compact'>) {
  return (
    <main className="nori-flow">
      <section className="nori-flow__hero">
        <p className="nori-kicker">N.O.R.I. / AI OPERATING SYSTEM</p>
        <h1>Turn your bottleneck into an agent system.</h1>
        <p>For businesses and creators: Nori maps the work, recommends the right agent lane, and gives you a human-approved system plan to install.</p>
        <div className="nori-offer-path" aria-label="Nori Build Map delivery path">
          <span><b>01</b> Map the bottleneck</span>
          <span><b>02</b> Review the system</span>
          <span><b>03</b> Approve the install</span>
        </div>
        <img src="/nori-full.png" alt="Nori, the NEO Gents root agent" />
      </section>
      <BuildMapPanel compact mode={mode} setMode={setMode} prompt={prompt} setPrompt={setPrompt} previewVisible={previewVisible} onPreview={onPreview} />
      <section className="nori-flow__section">
        <p className="nori-kicker">THE NEO GENTS MATRIX</p>
        <h2>One root agent. Clear lanes.</h2>
        <div className="nori-matrix__grid">
          {agentLanes.map((lane) => <article key={lane.code}><span>{lane.code}</span><h3>{lane.name}</h3><p>{lane.detail}</p></article>)}
        </div>
      </section>
      <section className="nori-flow__section nori-flow__library">
        <p className="nori-kicker">AGENT LIBRARY / CURATED PREVIEW</p>
        <h2>Start with a defined job.</h2>
        <div className="nori-library__grid">
          {libraryPreviews.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>)}
        </div>
      </section>
      <section className="nori-flow__section">
        <Pipeline mode={mode} />
        <div className="nori-flow__actions">
          <Link className="nori-command-button" to="/waitlist?profile=nori">Request your Build Map <span aria-hidden="true">-&gt;</span></Link>
          <a className="nori-link-button" href="https://neogents.tech">Open Command Center <span aria-hidden="true">-&gt;</span></a>
        </div>
      </section>
    </main>
  )
}

export default function NoriCinematicPage() {
  const trackRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const compact = useCompactLayout()
  const reducedMotion = useReducedMotion()
  const [mode, setMode] = useState<SystemMode>('growth')
  const [prompt, setPrompt] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const immersive = !compact && !reducedMotion
  const selectMode = (nextMode: SystemMode) => {
    setMode(nextMode)
    setPreviewVisible(false)
  }
  const updatePrompt = (nextPrompt: string) => {
    setPrompt(nextPrompt)
    setPreviewVisible(false)
  }

  return (
    <div className="nori-cinematic">
      {immersive ? (
        <DesktopExperience
          trackRef={trackRef}
          scrollProgress={scrollYProgress}
          mode={mode}
          setMode={selectMode}
          prompt={prompt}
          setPrompt={updatePrompt}
          previewVisible={previewVisible}
          onPreview={() => setPreviewVisible(true)}
        />
      ) : (
        <FlowExperience
          mode={mode}
          setMode={selectMode}
          prompt={prompt}
          setPrompt={updatePrompt}
          previewVisible={previewVisible}
          onPreview={() => setPreviewVisible(true)}
        />
      )}
    </div>
  )
}
