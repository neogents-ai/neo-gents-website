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
type AgentDepartmentId = 'sales' | 'ops' | 'content' | 'research' | 'support' | 'creators' | 'finance'

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

const systemCapabilities = [
  { label: 'Business Strategy', owner: 'NORI', detail: 'Revenue operations, priorities, decisions, and cross-functional routing.' },
  { label: 'Research & Intelligence', owner: 'ARIA', detail: 'Evidence gathering, market signals, and source-grounded briefs.' },
  { label: 'Content & Distribution', owner: 'TRINITY / REMI', detail: 'Content systems, creative direction, publishing, and workflow triggers.' },
  { label: 'Agent & System Design', owner: 'SOLITH', detail: 'Agent architecture, product builds, integrations, and technical execution.' },
  { label: 'Security & Governance', owner: 'CISO', detail: 'Permissions, safe defaults, review, and security escalation.' },
  { label: 'Production & Delivery', owner: 'NEO PRODUCTION', detail: 'Approved media production, delivery assets, and production handoffs.' },
]

const featureGroups = [
  {
    label: 'Core intelligence',
    description: 'The files and decisions that make Nori a root seed agent instead of a general chatbot.',
    features: [
      { title: 'Root-agent routing', detail: 'Nori receives the business request, identifies the owner, and keeps one lane accountable for the result.', status: 'SDK DEFINED' },
      { title: 'Progressive skill loading', detail: 'A mapped network of 242 skills can be loaded by job instead of crowding every request with every instruction.', status: 'SDK DEFINED' },
      { title: 'Agent registry', detail: 'Specialists carry an ID, role, prompt, workflow, parameters, and assigned skills so the workforce stays inspectable.', status: 'SDK DEFINED' },
      { title: 'Model routing', detail: 'Complex agent design and lighter operational work can be assigned to different approved model tiers.', status: 'RUNTIME HOOK' },
    ],
  },
  {
    label: 'Orchestration',
    description: 'How Nori turns one request into a coordinated, reviewable operating flow.',
    features: [
      { title: 'Specialist delegation', detail: 'Nori breaks the job into bounded assignments and briefs the right sales, operations, research, content, or security specialist.', status: 'SDK DEFINED' },
      { title: 'Triggered work sessions', detail: 'The runtime plan supports deliberate wake events from the dashboard, a message, or a system check-in.', status: 'RUNTIME HOOK' },
      { title: 'Morning business brief', detail: 'A daily brief can combine agent errors, handoff failures, activity, service health, and recommended next moves.', status: 'RUNTIME HOOK' },
      { title: 'Fleet monitoring', detail: 'Nori watches for repeated tool errors, lane violations, failed handoffs, drift, and service-health anomalies.', status: 'SDK DEFINED' },
    ],
  },
  {
    label: 'Memory & context',
    description: 'The context layer is curated on purpose. Nori is not given unrestricted access to the whole computer or vault.',
    features: [
      { title: 'Curated workspace context', detail: 'Only approved business, agent, dashboard, product, and security files are selected for the working package.', status: 'APPROVAL GATED' },
      { title: 'File-aware intake', detail: 'The seed-agent design can classify approved input files and route them to the correct business analysis path.', status: 'RUNTIME HOOK' },
      { title: 'Persistent operating state', detail: 'Memory, logs, draft records, and findings are designed to survive across sessions in an approved external store.', status: 'INTEGRATION' },
      { title: 'Run history', detail: 'Structured agent runs, handoffs, summaries, confidence, and approval records create an auditable operating trail.', status: 'INTEGRATION' },
    ],
  },
  {
    label: 'Connections',
    description: 'Nori connects to business systems through narrow interfaces rather than uncontrolled access.',
    features: [
      { title: 'MCP tool layer', detail: 'Defined tools can list agents, read prompts, inspect performance, log bugs, and raise alerts through authenticated interfaces.', status: 'INTEGRATION' },
      { title: 'Command Center', detail: 'The dashboard is the operator surface for briefs, approvals, health, agent status, and the next recommended move.', status: 'RUNTIME HOOK' },
      { title: 'Database-backed records', detail: 'Agent proposals, runs, messages, handoffs, reports, and approval queues have defined storage contracts.', status: 'INTEGRATION' },
      { title: 'Provider flexibility', detail: 'The runtime design separates the Nori identity from the approved model provider used for a particular job.', status: 'RUNTIME HOOK' },
    ],
  },
  {
    label: 'Control & safety',
    description: 'Nori can prepare and stage work. External action stays under explicit operator control.',
    features: [
      { title: 'Four-stage approval gate', detail: 'Every new or modified agent moves through Draft, Build, Deploy, and Live checkpoints.', status: 'APPROVAL GATED' },
      { title: 'Lane enforcement', detail: 'Sales sells, fulfillment delivers, operations coordinates, security governs, and content stays in its assigned scope.', status: 'APPROVAL GATED' },
      { title: 'Backups & rollback', detail: 'Prompt changes are designed to create backups and support rollback before a replacement becomes final.', status: 'SDK DEFINED' },
      { title: 'CISO escalation', detail: 'Secrets, permissions, public actions, payments, legal work, and deployment risks route through the required review lane.', status: 'APPROVAL GATED' },
    ],
  },
]

const agentDepartments: Array<{
  id: AgentDepartmentId
  label: string
  boundary: string
  agents: Array<{ name: string; detail: string }>
}> = [
  {
    id: 'sales', label: 'Sales', boundary: 'Pipeline and prospect relationships', agents: [
      { name: 'Lead Scoring', detail: 'Ranks incoming leads by fit, intent, and readiness.' },
      { name: 'Follow-up Sequences', detail: 'Drafts a reviewable cadence for each lead stage.' },
      { name: 'Outbound Prospecting', detail: 'Organizes prospect research and outreach preparation.' },
      { name: 'Proposal Writer', detail: 'Turns approved scope into a proposal draft.' },
      { name: 'Quote Generator', detail: 'Structures approved pricing inputs into a quote draft.' },
      { name: 'Upsell Trigger', detail: 'Flags expansion signals for a human sales decision.' },
      { name: 'Churn Predictor', detail: 'Surfaces retention risks and recommended interventions.' },
      { name: 'Win-Loss Analyst', detail: 'Finds patterns across closed and lost opportunities.' },
    ],
  },
  {
    id: 'ops', label: 'Operations', boundary: 'Internal coordination and business workflows', agents: [
      { name: 'CRM Data', detail: 'Structures records and flags missing operational fields.' },
      { name: 'Document Summarizer', detail: 'Turns approved documents into concise action briefs.' },
      { name: 'Invoice', detail: 'Prepares invoice records from approved business inputs.' },
      { name: 'Meeting Prep', detail: 'Builds agendas, context packets, and decision lists.' },
      { name: 'Onboarding', detail: 'Maps client or team onboarding into owned steps.' },
      { name: 'Scheduling', detail: 'Drafts booking, reminder, and rescheduling workflows.' },
      { name: 'Task Delegation', detail: 'Splits work into bounded assignments with owners.' },
      { name: 'Contract Drafting', detail: 'Prepares first-pass language for mandatory legal review.' },
    ],
  },
  {
    id: 'content', label: 'Content', boundary: 'Creative drafts, systems, and distribution', agents: [
      { name: 'Ad Copy', detail: 'Drafts campaign variations from an approved offer.' },
      { name: 'Caption Writer', detail: 'Creates platform-aware captions in the brand voice.' },
      { name: 'Content Repurposing', detail: 'Maps one source asset into multiple formats.' },
      { name: 'Hook Generator', detail: 'Develops opening angles for short-form content.' },
      { name: 'Launch Copywriter', detail: 'Builds the copy set around an approved launch.' },
      { name: 'Newsletter Drafter', detail: 'Turns source material into a reviewable edition.' },
      { name: 'Trend Spotter', detail: 'Surfaces relevant topics for the research lane to validate.' },
    ],
  },
  {
    id: 'research', label: 'Research', boundary: 'Evidence, intelligence, and source-grounded briefs', agents: [
      { name: 'Competitive Intelligence', detail: 'Tracks competitors, offers, positioning, and market shifts.' },
      { name: 'Market Research', detail: 'Builds evidence around buyers, pain, demand, and opportunity.' },
      { name: 'News Monitor', detail: 'Watches approved sources for decision-relevant changes.' },
      { name: 'Prospect Researcher', detail: 'Prepares account context before human outreach.' },
    ],
  },
  {
    id: 'support', label: 'Support', boundary: 'Customer response and human escalation', agents: [
      { name: 'After-hours SMS', detail: 'Drafts a fast response and routes urgent needs.' },
      { name: 'Appointment Booker', detail: 'Guides booking and confirms the human handoff.' },
      { name: 'FAQ Responder', detail: 'Answers from an approved knowledge source.' },
      { name: 'Review Response', detail: 'Drafts brand-safe responses for human review.' },
      { name: 'Ticket Triage', detail: 'Classifies support requests by owner and urgency.' },
    ],
  },
  {
    id: 'creators', label: 'Creator', boundary: 'Audience operations and creator-business workflows', agents: [
      { name: 'Brand Deal Inbox', detail: 'Sorts opportunities and prepares response context.' },
      { name: 'Course Outline', detail: 'Structures expertise into a teachable sequence.' },
      { name: 'DM Manager', detail: 'Classifies inbound messages and drafts next actions.' },
      { name: 'Fan Q&A', detail: 'Organizes repeat questions into reusable answers.' },
    ],
  },
  {
    id: 'finance', label: 'Finance', boundary: 'Business signals, drafts, and review queues', agents: [
      { name: 'Cash-flow Monitor', detail: 'Summarizes cash movement and flags operating concerns.' },
      { name: 'Grant Finder', detail: 'Surfaces candidate grants for mandatory human review.' },
      { name: 'Invoice Chaser', detail: 'Drafts payment reminders without sending them.' },
      { name: 'Weekly Revenue Briefer', detail: 'Summarizes revenue movement and open questions.' },
    ],
  },
]

const approvalStages = ['Clarify the job', 'Draft the agent', 'Review the build', 'Approve deployment']

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

function NoriFeatureOverview() {
  return (
    <section className="nori-feature-overview" aria-labelledby="nori-features-heading">
      <header className="nori-feature-overview__intro">
        <p className="nori-kicker">FEATURES OVERVIEW</p>
        <h3 id="nori-features-heading">A business operator with a visible system underneath.</h3>
        <p>These capabilities are defined in the Nori SDK and runtime plan. Live availability depends on the installed runtime, approved integrations, and the permissions you choose to enable.</p>
      </header>
      <div className="nori-feature-overview__groups">
        {featureGroups.map((group) => (
          <section className="nori-feature-group" key={group.label}>
            <div className="nori-feature-group__intro">
              <h4>{group.label}</h4>
              <p>{group.description}</p>
            </div>
            <div className="nori-feature-grid">
              {group.features.map((feature) => (
                <article key={feature.title}>
                  <span>{feature.status}</span>
                  <h5>{feature.title}</h5>
                  <p>{feature.detail}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

function NoriAgentRoster() {
  const [activeDepartmentId, setActiveDepartmentId] = useState<AgentDepartmentId>('sales')
  const activeDepartment = agentDepartments.find((department) => department.id === activeDepartmentId) ?? agentDepartments[0]

  return (
    <section className="nori-agent-roster" aria-labelledby="nori-agent-roster-heading">
      <header className="nori-agent-roster__intro">
        <div>
          <p className="nori-kicker">CURRENT SDK ROSTER</p>
          <h3 id="nori-agent-roster-heading">40 specialist agent templates.</h3>
        </div>
        <p>Nori can use an existing template or draft a new specialist around a clearly defined job. Templates remain proposals until the approval gates are complete.</p>
      </header>
      <div className="nori-agent-tabs" role="tablist" aria-label="Agent departments">
        {agentDepartments.map((department) => (
          <button
            aria-controls={`nori-agent-panel-${department.id}`}
            aria-selected={activeDepartment.id === department.id}
            className={activeDepartment.id === department.id ? 'is-active' : ''}
            id={`nori-agent-tab-${department.id}`}
            key={department.id}
            onClick={() => setActiveDepartmentId(department.id)}
            role="tab"
            type="button"
          >
            <span>{department.label}</span>
            <b>{String(department.agents.length).padStart(2, '0')}</b>
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`nori-agent-tab-${activeDepartment.id}`}
        className="nori-agent-panel"
        id={`nori-agent-panel-${activeDepartment.id}`}
        role="tabpanel"
      >
        <div className="nori-agent-panel__heading">
          <span>{activeDepartment.label.toUpperCase()} LANE</span>
          <h4>{activeDepartment.boundary}</h4>
          <p>Each specialist receives only the context, skills, tools, and actions required for its assigned job.</p>
        </div>
        <ul>
          {activeDepartment.agents.map((agent) => (
            <li key={agent.name}>
              <strong>{agent.name}</strong>
              <p>{agent.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="nori-agent-roster__boundary">Legal, financial, payment, credential, publishing, and production actions always require the appropriate review before execution.</p>
    </section>
  )
}

function NoriSystemDossier() {
  return (
    <section className="nori-dossier" aria-labelledby="nori-dossier-heading">
      <header className="nori-dossier__intro">
        <p className="nori-kicker">NORI SYSTEM DOSSIER</p>
        <h2 id="nori-dossier-heading">What Nori is. What she can build with you.</h2>
        <p>N.O.R.I. means NEO Optimization &amp; Revenue Infrastructure. She is NEO Gents' root intelligence system: she listens to the bottleneck, audits the moving parts, and routes the next strategic move.</p>
      </header>
      <ol className="nori-dossier__sequence" aria-label="Nori's internal operating sequence">
        <li><span>01</span><strong>Listener</strong><p>Captures the real goal, context, and constraint.</p></li>
        <li><span>02</span><strong>Auditor</strong><p>Finds the handoffs, risks, and repeat work.</p></li>
        <li><span>03</span><strong>Strategist</strong><p>Recommends the next system and the right owner.</p></li>
      </ol>

      <NoriFeatureOverview />

      <div className="nori-dossier__section">
        <div className="nori-dossier__heading">
          <p className="nori-kicker">ROUTED SKILL NETWORK</p>
          <h3>242 mapped skills. Clear ownership.</h3>
          <p>Nori does not pretend one agent can do every job. She routes work through a defined network, keeping each specialist in its lane.</p>
        </div>
        <div className="nori-capability-grid">
          {systemCapabilities.map((capability) => (
            <article key={capability.label}>
              <span>{capability.owner}</span>
              <h4>{capability.label}</h4>
              <p>{capability.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <NoriAgentRoster />

      <aside className="nori-approval-path">
        <div>
          <p className="nori-kicker">HUMAN APPROVAL REQUIRED</p>
          <h3>No agent goes live by accident.</h3>
          <p>Nori can recommend and draft the system. A person approves the plan, build, and deployment before it becomes active.</p>
        </div>
        <ol>
          {approvalStages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, '0')}</span>{stage}</li>)}
        </ol>
      </aside>
    </section>
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
      <NoriSystemDossier />
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
      {immersive && <NoriSystemDossier />}
    </div>
  )
}
