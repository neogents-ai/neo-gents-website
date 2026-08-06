import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroMascot3D from '../components/three/HeroMascot3D'
import { buildMapExamples, deliveryPath, leadGenerationExample, noriHero, solutionUseCases } from '../data/noriPositioning'
import './NoriCinematicPage.css'

type Scene = 'hero' | 'map' | 'matrix' | 'pipeline' | 'dossier'
type AgentDepartmentId = 'sales' | 'ops' | 'content' | 'research' | 'support' | 'creators' | 'finance'
type DossierChapterId = 'identity' | 'features' | 'network' | 'agents' | 'guardrails'

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

const dossierChapters: Array<{ id: DossierChapterId; label: string }> = [
  { id: 'identity', label: 'Identity' },
  { id: 'features', label: 'Capabilities' },
  { id: 'network', label: 'Skill network' },
  { id: 'agents', label: 'Agent roster' },
  { id: 'guardrails', label: 'Guardrails' },
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

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return reducedMotion
}

function SplitHeroHeadline() {
  return (
    <h1 aria-label={noriHero.headline}>
      {noriHero.headline.split(' ').map((word, wordIndex, words) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="nori-hero__word" aria-hidden="true">
            {Array.from(word).map((letter, letterIndex) => (
              <span className="nori-hero__letter" key={`${letter}-${letterIndex}`}>{letter}</span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}

interface BuildMapPanelProps {
  prompt: string
  setPrompt: (value: string) => void
  previewVisible: boolean
  onPreview: () => void
  compact?: boolean
}

function BuildMapPanel({
  prompt,
  setPrompt,
  previewVisible,
  onPreview,
  compact = false,
}: BuildMapPanelProps) {
  return (
    <section className={`nori-build-map ${compact ? 'nori-build-map--compact' : ''}`} aria-labelledby="build-map-heading">
      <div className="nori-build-map__topline">
        <span className="nori-kicker">BUILD MAP / LOCAL PREVIEW</span>
        <span className="nori-build-map__status">NO DATA SENT</span>
      </div>
      <h2 id="build-map-heading">What part of your business is unclear or not working the way you want?</h2>
      <div className="nori-example">
        <p className="nori-kicker">ONE QUESTION / THE CONNECTED WORK</p>
        <h2>{leadGenerationExample.request}</h2>
        <p>{leadGenerationExample.explanation}</p>
        <ol className="nori-example__path" aria-label="Customer acquisition workflow">
          {leadGenerationExample.stages.map((stage, index) => (
            <li key={stage}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{stage}</strong>
            </li>
          ))}
        </ol>
      </div>
      <label className="nori-build-map__label" htmlFor={compact ? 'nori-goal-compact' : 'nori-goal'}>
        Describe one problem in plain language.
      </label>
      <div className="nori-build-map__starters" aria-label="Example business problems">
        {buildMapExamples.map((example) => (
          <button type="button" key={example} onClick={() => setPrompt(example)}>{example}</button>
        ))}
      </div>
      <textarea
        id={compact ? 'nori-goal-compact' : 'nori-goal'}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value.slice(0, 420))}
        placeholder="Example: I need more customers."
        maxLength={420}
        rows={compact ? 4 : 3}
      />
      <div className="nori-build-map__actions">
        <p>Use non-confidential details only. Nothing is sent or analyzed by AI in this preview.</p>
        <button className="nori-command-button" type="button" onClick={onPreview}>
          Generate example map <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
      {previewVisible && (
        <div className="nori-preview" role="status">
          <div>
            <span>ILLUSTRATIVE CLARITY MAP</span>
            <strong>Start by locating the unclear step.</strong>
          </div>
          <p>This example shows how Nori will structure the question. A live analysis begins only after an approved Nori runtime is connected.</p>
        </div>
      )}
    </section>
  )
}

function SolutionUseCases() {
  return (
    <>
      <div className="nori-matrix__intro">
        <p className="nori-kicker">PRACTICAL AI USE CASES</p>
        <h2>Start with the work, not the technology.</h2>
        <p>Nori connects the confusing part of the business to a solution you can understand and approve.</p>
      </div>
      <div className="nori-matrix__grid">
        {solutionUseCases.map((useCase, index) => (
          <article key={useCase.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{useCase.label}</h3>
            <p>{useCase.detail}</p>
          </article>
        ))}
      </div>
    </>
  )
}

function DeliveryPath() {
  return (
    <div className="nori-pipeline" aria-label="From a confusing problem to an installed solution">
      <div className="nori-pipeline__heading">
        <span className="nori-kicker">HOW NORI + NEO GENTS WORK</span>
        <h2>From confusion to an installed solution.</h2>
        <p>Nori designs the solution. You approve it. NEO Gents installs the workflow.</p>
      </div>
      <ol>
        {deliveryPath.map((stage, index) => (
          <li key={stage.label}>
            <span className="nori-pipeline__number">{String(index + 1).padStart(2, '0')}</span>
            <span className={`nori-pipeline__owner nori-pipeline__owner--${stage.owner.toLowerCase().replaceAll(' ', '-')}`}>{stage.owner}</span>
            <strong>{stage.label}</strong>
            <p>{stage.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function NoriFeatureOverview() {
  const [activeGroupLabel, setActiveGroupLabel] = useState(featureGroups[0].label)
  const activeGroup = featureGroups.find((group) => group.label === activeGroupLabel) ?? featureGroups[0]

  return (
    <section className="nori-feature-overview" aria-labelledby="nori-features-heading">
      <header className="nori-feature-overview__intro">
        <div>
          <p className="nori-kicker">CAPABILITY INDEX</p>
          <h3 id="nori-features-heading">A visible system underneath.</h3>
        </div>
        <p>These capabilities are defined in the Nori SDK and runtime plan. Live availability depends on the installed runtime, approved integrations, and the permissions you choose to enable.</p>
      </header>
      <div className="nori-feature-switcher" role="tablist" aria-label="Capability groups">
        {featureGroups.map((group, index) => (
          <button
            aria-controls="nori-feature-panel"
            aria-selected={activeGroup.label === group.label}
            className={activeGroup.label === group.label ? 'is-active' : ''}
            id={`nori-feature-tab-${index}`}
            key={group.label}
            onClick={() => setActiveGroupLabel(group.label)}
            role="tab"
            type="button"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {group.label}
          </button>
        ))}
      </div>
      <section
        aria-labelledby={`nori-feature-tab-${featureGroups.indexOf(activeGroup)}`}
        className="nori-feature-group"
        id="nori-feature-panel"
        role="tabpanel"
      >
        <div className="nori-feature-group__intro">
          <h4>{activeGroup.label}</h4>
          <p>{activeGroup.description}</p>
        </div>
        <div className="nori-feature-grid">
          {activeGroup.features.map((feature) => (
            <article key={feature.title}>
              <span>{feature.status}</span>
              <h5>{feature.title}</h5>
              <p>{feature.detail}</p>
            </article>
          ))}
        </div>
      </section>
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
  const [activeChapter, setActiveChapter] = useState<DossierChapterId>('identity')
  const activeChapterIndex = dossierChapters.findIndex((chapter) => chapter.id === activeChapter)

  return (
    <section className="nori-dossier" aria-labelledby="nori-dossier-heading">
      <header className="nori-dossier__intro">
        <div>
          <p className="nori-kicker">NORI OPERATING FILE / 05</p>
          <h2 id="nori-dossier-heading">What she is. What she can build.</h2>
        </div>
        <p>Nori's complete operating model, condensed into one inspectable file. Select a chapter to see the underlying capability, ownership, roster, or approval boundary.</p>
      </header>
      <div className="nori-dossier__chapters" role="tablist" aria-label="Nori operating file chapters">
        {dossierChapters.map((chapter, index) => (
          <button
            aria-controls={`nori-dossier-panel-${chapter.id}`}
            aria-selected={activeChapter === chapter.id}
            className={activeChapter === chapter.id ? 'is-active' : ''}
            id={`nori-dossier-tab-${chapter.id}`}
            key={chapter.id}
            onClick={() => setActiveChapter(chapter.id)}
            role="tab"
            type="button"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {chapter.label}
          </button>
        ))}
      </div>

      <div
        aria-labelledby={`nori-dossier-tab-${activeChapter}`}
        className="nori-dossier__panel"
        id={`nori-dossier-panel-${activeChapter}`}
        role="tabpanel"
      >
        <span className="nori-dossier__folio" aria-hidden="true">{String(activeChapterIndex + 1).padStart(2, '0')} / 05</span>

        {activeChapter === 'identity' && (
          <div className="nori-dossier__identity">
            <div>
              <p className="nori-kicker">ROOT INTELLIGENCE</p>
              <h3>N.O.R.I. means NEO Optimization &amp; Revenue Infrastructure.</h3>
              <p>She listens to the bottleneck, audits the moving parts, and routes the next strategic move without pretending one agent should own every job.</p>
            </div>
            <ol className="nori-dossier__sequence" aria-label="Nori's internal operating sequence">
              <li><span>01</span><strong>Listener</strong><p>Captures the real goal, context, and constraint.</p></li>
              <li><span>02</span><strong>Auditor</strong><p>Finds the handoffs, risks, and repeat work.</p></li>
              <li><span>03</span><strong>Strategist</strong><p>Recommends the next system and the right owner.</p></li>
            </ol>
          </div>
        )}

        {activeChapter === 'features' && <NoriFeatureOverview />}

        {activeChapter === 'network' && (
          <section className="nori-skill-network" aria-labelledby="nori-skill-network-heading">
            <header>
              <p className="nori-kicker">ROUTED SKILL NETWORK</p>
              <h3 id="nori-skill-network-heading">242 mapped skills. Clear ownership.</h3>
              <p>Nori routes work through a defined network and keeps each specialist in its lane.</p>
            </header>
            <ul>
              {systemCapabilities.map((capability) => (
                <li key={capability.label}>
                  <span>{capability.owner}</span>
                  <strong>{capability.label}</strong>
                  <p>{capability.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeChapter === 'agents' && <NoriAgentRoster />}

        {activeChapter === 'guardrails' && (
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
        )}
      </div>
    </section>
  )
}

function DesktopExperience({
  prompt,
  setPrompt,
  previewVisible,
  onPreview,
}: {
  prompt: string
  setPrompt: (value: string) => void
  previewVisible: boolean
  onPreview: () => void
}) {
  const [scene, setScene] = useState<Scene>('hero')
  const trackRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const matrixRef = useRef<HTMLElement>(null)
  const pipelineRef = useRef<HTMLElement>(null)
  const dossierRef = useRef<HTMLElement>(null)
  const scrollToMap = () => window.scrollBy({ top: window.innerHeight * 1.1, behavior: 'smooth' })

  useLayoutEffect(() => {
    const track = trackRef.current
    const video = videoRef.current
    const cursor = cursorRef.current
    const scenes = [heroRef.current, mapRef.current, matrixRef.current, pipelineRef.current, dossierRef.current]
    if (!track || !video || scenes.some((item) => !item)) return

    gsap.registerPlugin(ScrollTrigger)
    const cleanups: Array<() => void> = []
    const context = gsap.context(() => {
      const [hero, map, matrix, pipeline, dossier] = scenes as HTMLElement[]
      const incoming = { autoAlpha: 0, z: -1450, scale: 0.62 }

      gsap.set(hero, { autoAlpha: 1, z: 0, scale: 1 })
      gsap.set([map, matrix, pipeline, dossier], incoming)
      gsap.set('.nori-cinema__depth--far', { z: -900, scale: 1.55 })
      gsap.set('.nori-cinema__depth--mid', { z: -420, scale: 1.25 })
      gsap.set('.nori-cinema__depth--near', { z: 120, scale: 1.04 })

      gsap.fromTo('.nori-hero__letter',
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'power4.out', stagger: 0.018, delay: 0.12 },
      )
      gsap.fromTo('.nori-hero__copy > .nori-kicker, .nori-hero__lede, .nori-offer-path, .nori-hero__copy > .nori-command-button',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.5 },
      )

      const timeline = gsap.timeline({
        defaults: { duration: 0.86, ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: '+=5200',
          pin: track,
          pinSpacing: true,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const next: Scene = progress < 0.17
              ? 'hero'
              : progress < 0.38
                ? 'map'
                : progress < 0.59
                  ? 'matrix'
                  : progress < 0.79
                    ? 'pipeline'
                    : 'dossier'
            setScene((current) => current === next ? current : next)
          },
        },
      })

      timeline
        .addLabel('root', 0)
        .to(video, { scale: 1.14, xPercent: -1.2, duration: 6.2, ease: 'none' }, 'root')
        .to('.nori-cinema__depth--far', { z: -380, yPercent: -3, duration: 6.2, ease: 'none' }, 'root')
        .to('.nori-cinema__depth--mid', { z: 40, yPercent: -6, duration: 6.2, ease: 'none' }, 'root')
        .to('.nori-cinema__depth--near', { z: 520, yPercent: -10, duration: 6.2, ease: 'none' }, 'root')
        .to(hero, { autoAlpha: 0, z: 720, scale: 1.18, yPercent: -6, duration: 0.5 }, 0.6)
        .fromTo(map, incoming, { autoAlpha: 1, z: 0, scale: 1, duration: 0.68, immediateRender: false }, 0.82)
        .addLabel('map', 1.5)
        .to(map, { autoAlpha: 0, z: 720, scale: 1.16, yPercent: -5, duration: 0.5 }, 1.8)
        .fromTo(matrix, incoming, { autoAlpha: 1, z: 0, scale: 1, duration: 0.68, immediateRender: false }, 2.02)
        .addLabel('matrix', 2.7)
        .to(matrix, { autoAlpha: 0, z: 720, scale: 1.15, yPercent: -5, duration: 0.5 }, 3)
        .fromTo(pipeline, incoming, { autoAlpha: 1, z: 0, scale: 1, duration: 0.68, immediateRender: false }, 3.22)
        .addLabel('pipeline', 3.9)
        .to(pipeline, { autoAlpha: 0, z: 720, scale: 1.14, yPercent: -5, duration: 0.5 }, 4.2)
        .fromTo(dossier, incoming, { autoAlpha: 1, z: 0, scale: 1, duration: 0.68, immediateRender: false }, 4.42)
        .addLabel('dossier', 5.1)
        .to(dossier, { z: 70, scale: 1.01, duration: 0.7, ease: 'power1.out' }, 5.1)

      if (cursor && window.matchMedia('(pointer: fine)').matches) {
        gsap.set(cursor, { autoAlpha: 0 })
        const moveX = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' })
        const moveY = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' })
        const handlePointerMove = (event: PointerEvent) => {
          gsap.to(cursor, { autoAlpha: 1, duration: 0.2, overwrite: 'auto' })
          moveX(event.clientX)
          moveY(event.clientY)
        }
        window.addEventListener('pointermove', handlePointerMove)
        cleanups.push(() => window.removeEventListener('pointermove', handlePointerMove))

        track.querySelectorAll<HTMLElement>('.nori-command-button, .nori-link-button').forEach((button) => {
          const enter = () => gsap.to(cursor, { scale: 1.8, duration: 0.35, ease: 'power3.out' })
          const move = (event: PointerEvent) => {
            const bounds = button.getBoundingClientRect()
            gsap.to(button, {
              x: (event.clientX - bounds.left - bounds.width / 2) * 0.14,
              y: (event.clientY - bounds.top - bounds.height / 2) * 0.2,
              duration: 0.4,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          }
          const leave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.35, ease: 'power3.out' })
            gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: 'power4.out', overwrite: 'auto' })
          }
          button.addEventListener('pointerenter', enter)
          button.addEventListener('pointermove', move)
          button.addEventListener('pointerleave', leave)
          cleanups.push(() => {
            button.removeEventListener('pointerenter', enter)
            button.removeEventListener('pointermove', move)
            button.removeEventListener('pointerleave', leave)
          })
        })
      }
    }, track)

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      window.cancelAnimationFrame(refreshFrame)
      cleanups.forEach((cleanup) => cleanup())
      context.revert()
    }
  }, [])

  const sceneStyle = (name: Scene) => ({ pointerEvents: scene === name ? 'auto' as const : 'none' as const })

  return (
    <section className="nori-cinematic__track" ref={trackRef}>
      <div className="nori-cinematic__viewport" ref={viewportRef}>
        <div className="nori-cinema-bg" aria-hidden="true">
          <video ref={videoRef} autoPlay loop muted playsInline preload="metadata" poster="/media/nori-command-chamber.png">
            <source src="/media/nori-command-chamber-loop.mp4" type="video/mp4" />
          </video>
          <div className="nori-cinema-bg__shade" />
        </div>
        <div className="nori-cinema__grain" aria-hidden="true" />
        <div className="nori-cinema__depth nori-cinema__depth--far" aria-hidden="true" />
        <div className="nori-cinema__depth nori-cinema__depth--mid" aria-hidden="true" />
        <div className="nori-cinema__depth nori-cinema__depth--near" aria-hidden="true" />
        <div className="nori-cinematic__stars" aria-hidden="true" />
        <div className="nori-cinematic__horizon" aria-hidden="true" />
        <div className="nori-cinematic__progress" aria-hidden="true">
          <span className={scene === 'hero' ? 'is-current' : ''}>01 CLARITY</span>
          <span className={scene === 'map' ? 'is-current' : ''}>02 EXAMPLE</span>
          <span className={scene === 'matrix' ? 'is-current' : ''}>03 USE CASES</span>
          <span className={scene === 'pipeline' ? 'is-current' : ''}>04 DELIVERY</span>
          <span className={scene === 'dossier' ? 'is-current' : ''}>05 PROOF</span>
        </div>

        <section ref={heroRef} className="nori-scene nori-scene--hero" style={sceneStyle('hero')} aria-hidden={scene !== 'hero'}>
          <div className="nori-hero__copy">
            <p className="nori-kicker">{noriHero.kicker}</p>
            <SplitHeroHeadline />
            <p className="nori-hero__lede">{noriHero.lede}</p>
            <div className="nori-offer-path" aria-label="How Nori turns confusion into a solution">
              {noriHero.steps.map((step, index) => (
                <span key={step}><b>{String(index + 1).padStart(2, '0')}</b>{step}</span>
              ))}
            </div>
            <button className="nori-command-button" type="button" onClick={scrollToMap}>
              {noriHero.cta} <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
          <div className="nori-hero__mascot-wrap">
            <div className="nori-hero__halo" aria-hidden="true" />
            <HeroMascot3D modelUrl="/models/nori.glb" fallbackSrc="/nori-full.png" className="nori-hero__mascot" />
            <span className="nori-hero__caption">N.O.R.I. / NEO OPTIMIZATION &amp; REVENUE INFRASTRUCTURE</span>
          </div>
        </section>

        <div ref={mapRef} className="nori-scene nori-scene--map" style={sceneStyle('map')} aria-hidden={scene !== 'map'}>
          <BuildMapPanel prompt={prompt} setPrompt={setPrompt} previewVisible={previewVisible} onPreview={onPreview} />
        </div>

        <section ref={matrixRef} className="nori-scene nori-scene--matrix" style={sceneStyle('matrix')} aria-hidden={scene !== 'matrix'}>
          <SolutionUseCases />
        </section>

        <section ref={pipelineRef} className="nori-scene nori-scene--pipeline" style={sceneStyle('pipeline')} aria-hidden={scene !== 'pipeline'}>
          <DeliveryPath />
          <div className="nori-scene--pipeline__actions">
            <Link className="nori-command-button" to="/waitlist?profile=nori">Request your clarity map <span aria-hidden="true">-&gt;</span></Link>
            <a className="nori-link-button" href="https://neogents.tech">Open Command Center <span aria-hidden="true">-&gt;</span></a>
          </div>
        </section>

        <section ref={dossierRef} className="nori-scene nori-scene--dossier" style={sceneStyle('dossier')} aria-hidden={scene !== 'dossier'}>
          <NoriSystemDossier />
        </section>
        <div className="nori-cursor" ref={cursorRef} aria-hidden="true" />
      </div>
    </section>
  )
}

function FlowHero() {
  return (
    <section className="nori-flow__hero">
      <p className="nori-kicker">{noriHero.kicker}</p>
      <h1>{noriHero.headline}</h1>
      <p>{noriHero.lede}</p>
      <div className="nori-offer-path" aria-label="How Nori turns confusion into a solution">
        {noriHero.steps.map((step, index) => (
          <span key={step}><b>{String(index + 1).padStart(2, '0')}</b>{step}</span>
        ))}
      </div>
      <img src="/nori-full.png" alt="Nori, the NEO Gents guide to practical AI" />
    </section>
  )
}

function FlowExperience({
  prompt,
  setPrompt,
  previewVisible,
  onPreview,
}: Omit<BuildMapPanelProps, 'compact'>) {
  return (
    <main className="nori-flow">
      <FlowHero />
      <BuildMapPanel compact prompt={prompt} setPrompt={setPrompt} previewVisible={previewVisible} onPreview={onPreview} />
      <section className="nori-flow__section">
        <SolutionUseCases />
      </section>
      <NoriSystemDossier />
      <section className="nori-flow__section">
        <DeliveryPath />
        <div className="nori-flow__actions">
          <Link className="nori-command-button" to="/waitlist?profile=nori">Request your clarity map <span aria-hidden="true">-&gt;</span></Link>
          <a className="nori-link-button" href="https://neogents.tech">Open Command Center <span aria-hidden="true">-&gt;</span></a>
        </div>
      </section>
    </main>
  )
}

export default function NoriCinematicPage() {
  const compact = useCompactLayout()
  const reducedMotion = useReducedMotionPreference()
  const [prompt, setPrompt] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const immersive = !compact && !reducedMotion
  const updatePrompt = (nextPrompt: string) => {
    setPrompt(nextPrompt)
    setPreviewVisible(false)
  }

  return (
    <div className="nori-cinematic">
      {immersive ? (
        <DesktopExperience
          prompt={prompt}
          setPrompt={updatePrompt}
          previewVisible={previewVisible}
          onPreview={() => setPreviewVisible(true)}
        />
      ) : (
        <FlowExperience
          prompt={prompt}
          setPrompt={updatePrompt}
          previewVisible={previewVisible}
          onPreview={() => setPreviewVisible(true)}
        />
      )}
    </div>
  )
}
