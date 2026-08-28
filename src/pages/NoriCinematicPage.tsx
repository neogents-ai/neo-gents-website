import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroMascot3D from '../components/three/HeroMascot3D'
import { buildMapExamples, clientCaseStudies, deliveryPath, leadGenerationExample, noriHero, solutionUseCases } from '../data/noriPositioning'
import { noriSceneLabels, noriSceneOrder, type NoriScene } from './nori/sceneRegistry'
import './NoriCinematicPage.css'

type Scene = NoriScene
type AgentDepartmentId = 'sales' | 'ops' | 'content' | 'research' | 'support' | 'creators' | 'finance'
type DossierChapterId = 'comparison' | 'identity' | 'features' | 'network' | 'agents' | 'guardrails'

const systemCapabilities = [
  { label: 'Business Strategy', owner: 'NORI', detail: 'Revenue operations, priorities, decisions, and cross-functional routing.' },
  { label: 'Research & Intelligence', owner: 'ARIA', detail: 'Evidence gathering, market signals, and source-grounded briefs.' },
  { label: 'Content & Distribution', owner: 'REMI', detail: 'Content systems, creative direction, publishing, and workflow triggers.' },
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
      { title: 'Research proposals', detail: 'When a specialist needs current information or a repeated gap needs study, Nori can propose a research agent, explain its job and access, and wait for approval before creating it.', status: 'APPROVAL GATED' },
      { title: 'Improvement proposals', detail: 'When Nori sees a repeat problem, it explains why a new skill, agent, or change could help and asks before it creates or activates anything.', status: 'APPROVAL GATED' },
    ],
  },
  {
    label: 'Orchestration',
    description: 'How Nori turns one request into a coordinated, reviewable operating flow.',
    features: [
      { title: 'Multi-specialist delegation', detail: 'Nori acts as the seed agent: it maps the job, proposes the right specialists and skills, then coordinates the approved work across sales, operations, research, content, and security lanes.', status: 'SDK DEFINED' },
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
    label: 'Models & routing',
    description: 'Choose an approved model provider, then let Nori route each job to the right capability and cost tier.',
    features: [
      { title: 'Task-aware model routing', detail: 'Nori is designed to select the least expensive capable approved model for the job instead of sending every request to the largest model.', status: 'RUNTIME REQUIRED' },
      { title: 'Provider choice', detail: 'An installed runtime can be configured around approved OpenAI, Claude, Google, or Kimi model options and provider policy.', status: 'RUNTIME REQUIRED' },
      { title: 'Client key or managed usage', detail: 'The planned product supports a client-owned provider key or NEO Gents-managed usage, each with an explicit spend policy.', status: 'RUNTIME REQUIRED' },
      { title: 'Rate and spend protection', detail: 'Per-client budgets, rate limits, approved fallback chains, and usage audit records are required before a provider key is enabled.', status: 'RUNTIME REQUIRED' },
    ],
  },
  {
    label: 'Control',
    description: 'Nori can prepare and stage work. External action stays under explicit operator control.',
    features: [
      { title: 'Four-stage approval gate', detail: 'Every new or modified agent moves through Draft, Build, Deploy, and Live checkpoints.', status: 'APPROVAL GATED' },
      { title: 'Lane enforcement', detail: 'Sales sells, fulfillment delivers, operations coordinates, security governs, and content stays in its assigned scope.', status: 'APPROVAL GATED' },
      { title: 'Backups & rollback', detail: 'Prompt changes are designed to create backups and support rollback before a replacement becomes final.', status: 'SDK DEFINED' },
      { title: 'Consequential-action review', detail: 'Sending, publishing, charging, deploying, deleting, credential changes, and sensitive-data work remain approval-gated.', status: 'APPROVAL GATED' },
    ],
  },
  {
    label: 'Security & privacy',
    description: 'NEO Gents operates the security work around the client-specific system, so the client is not expected to become the IT, cloud, IAM, or AI-security team.',
    features: [
      { title: 'Signed tool gateway', detail: 'The existing control plane uses HMAC request signing, timestamp freshness, replay protection, and typed tool allow-lists.', status: 'CURRENT SAFEGUARD' },
      { title: 'Secret and audit hygiene', detail: 'Secret-like values are redacted from audit records; client runtime credentials require server-side storage and scoped access before release.', status: 'CURRENT + RUNTIME GATE' },
      { title: 'CISO runtime coverage', detail: 'Nori is backed by a CISO-led security team spanning cloud, DevOps, IAM, network, application, AI-runtime monitoring, tool auditing, credential review, and incident reconstruction.', status: 'OPERATIONS MODEL' },
      { title: 'Standards and data scope', detail: 'NIST CSF, CIS Controls, OWASP, least privilege, PII minimization, and approval-led data handling shape the control plan. Formal certification is not claimed.', status: 'SECURITY PROGRAM' },
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

const guardrailGroups = [
  { label: 'Human approval', detail: 'Nori can explain and draft a plan, but a person approves the scope, access, budget, agent changes, and consequential actions.' },
  { label: 'Security boundaries', detail: 'Approved tools, scoped permissions, credential handling, audit records, and operational escalation limit what a client system can do.' },
  { label: 'Prompt boundaries', detail: 'Instructions found in files, websites, or messages are treated as untrusted content. Nori does not let them override the client-approved plan.' },
  { label: 'Intelligence boundaries', detail: 'Nori separates evidence from recommendations, explains uncertainty, and asks before creating, changing, or activating a skill or agent.' },
]

const dossierChapters: Array<{ id: DossierChapterId; label: string }> = [
  { id: 'comparison', label: 'Nori vs Hermes' },
  { id: 'identity', label: 'Identity' },
  { id: 'features', label: 'Capabilities' },
  { id: 'network', label: 'Skills matrix' },
  { id: 'agents', label: 'Agent roster' },
  { id: 'guardrails', label: 'Guardrails' },
]

function getClarityDirection(prompt: string) {
  const normalized = prompt.toLowerCase()

  if (/(content|post|publish|video|social|caption)/.test(normalized)) {
    return {
      focus: 'Content path',
      detail: 'Start with the point where an idea turns into a draft, review, and published work. We will identify what keeps content from moving forward and what should stay in your hands.',
      checkpoint: 'Bring the platforms, approval steps, and the part of publishing that feels hardest to repeat.',
    }
  }

  if (/(customer|lead|sale|sales|marketing|follow.?up|booking|book)/.test(normalized)) {
    return {
      focus: 'Customer path',
      detail: 'Start with how someone finds you, gets a response, and becomes a booking or sale. We will identify the handoff where interest is getting lost.',
      checkpoint: 'Bring the way people contact you today and what happens after the first message or inquiry.',
    }
  }

  if (/(repeat|admin|schedule|invoic|manual|spreadsheet|organize)/.test(normalized)) {
    return {
      focus: 'Repeat-work path',
      detail: 'Start with the work you repeat and the handoffs around it. We will separate the steps that need your judgment from the steps that can become a clear routine.',
      checkpoint: 'Bring one real example of the work and the places where you copy, re-enter, or chase information.',
    }
  }

  return {
    focus: 'Work path',
    detail: 'Start with how this work begins, moves between people or tools, and gets checked. We will locate the unclear step before recommending any system.',
    checkpoint: 'Bring one recent example and the outcome you want instead.',
  }
}

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
  const [promptError, setPromptError] = useState(false)
  const clarityDirection = getClarityDirection(prompt)
  const claritySessionUrl = `/waitlist?profile=nori&source=nori-clarity-map&bottleneck=${encodeURIComponent(prompt)}`

  const handlePreview = () => {
    if (!prompt.trim()) {
      setPromptError(true)
      return
    }
    setPromptError(false)
    onPreview()
  }

  return (
    <section className={`nori-build-map ${compact ? 'nori-build-map--compact' : ''}`} aria-labelledby="build-map-heading">
      <div className="nori-build-map__topline">
        <span className="nori-kicker">FREE NORI CLARITY MAP</span>
        <span className="nori-build-map__status">NOTHING SENT YET</span>
      </div>
      <h2 id="build-map-heading">What part of your business is unclear or not working the way you want?</h2>
      {previewVisible ? (
        <section className="nori-preview" aria-live="polite">
          <div>
            <span>YOUR INITIAL CLARITY MAP</span>
            <strong>{clarityDirection.focus}</strong>
          </div>
          <p><b>What Nori heard:</b> {prompt}</p>
          <p>{clarityDirection.detail}</p>
          <p className="nori-preview__checkpoint"><b>For your free clarity session:</b> {clarityDirection.checkpoint}</p>
          <Link className="nori-preview__session-link" to={claritySessionUrl}>Request your free clarity session <span aria-hidden="true">-&gt;</span></Link>
        </section>
      ) : (
        <div className="nori-example">
          <p className="nori-kicker">ONE QUESTION / THE CONNECTED WORK</p>
          <h2>{leadGenerationExample.request}</h2>
          <p>{leadGenerationExample.explanation}</p>
          <ol className="nori-example__path" aria-label="Customer acquisition workflow">
            {leadGenerationExample.stages.map((stage) => (
              <li key={stage}>
                <strong>{stage}</strong>
              </li>
            ))}
          </ol>
        </div>
      )}
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
        onChange={(event) => {
          setPromptError(false)
          setPrompt(event.target.value.slice(0, 420))
        }}
        placeholder="Example: I need more customers."
        maxLength={420}
        rows={compact ? 4 : 3}
      />
      <div className="nori-build-map__actions">
        <p>Use non-confidential details only. You will review the initial map before requesting a free clarity session.</p>
        <button className="nori-command-button" type="button" onClick={handlePreview}>
          {previewVisible ? 'Update my clarity map' : 'Build my free clarity map'} <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
      {promptError && <p className="nori-build-map__error" role="alert">Describe one part of the work first so Nori can build your initial clarity map.</p>}
    </section>
  )
}

function SolutionUseCases() {
  const [activeUseCaseId, setActiveUseCaseId] = useState<string | null>(null)
  const activeUseCase = solutionUseCases.find((useCase) => useCase.id === activeUseCaseId)

  return (
    <>
      <div className="nori-matrix__intro">
        <p className="nori-kicker">PRACTICAL AI USE CASES</p>
        <h2>Start with the work, not the technology.</h2>
        <p>Nori connects the confusing part of the business to a solution you can understand and approve.</p>
        <p className="nori-matrix__example"><em>Example: you keep putting off content because every post feels like starting over. Nori maps a simple path from one idea to draft, review, and publishing before recommending what to automate.</em></p>
      </div>
      <div className="nori-matrix__cases" onMouseLeave={() => setActiveUseCaseId(null)}>
        <div className="nori-matrix__grid">
          {solutionUseCases.map((useCase) => (
            <button
              aria-controls="nori-use-case-detail"
              aria-expanded={activeUseCaseId === useCase.id}
              className={activeUseCaseId === useCase.id ? 'is-active' : ''}
              key={useCase.id}
              onClick={() => setActiveUseCaseId((current) => current === useCase.id ? null : useCase.id)}
              onFocus={() => setActiveUseCaseId(useCase.id)}
              onMouseEnter={() => setActiveUseCaseId(useCase.id)}
              type="button"
            >
              <h3>{useCase.label}</h3>
            </button>
          ))}
        </div>
        {activeUseCase && (
          <section className="nori-use-case-detail" id="nori-use-case-detail" aria-live="polite">
            <p className="nori-kicker">HOW NORI WOULD START</p>
            <h3>{activeUseCase.label}</h3>
            <p>{activeUseCase.detail}</p>
            <p className="nori-use-case-detail__benefit"><span>What this helps:</span>{activeUseCase.benefit}</p>
          </section>
        )}
      </div>
      <ClientProofRail />
    </>
  )
}

function NoriCinematicIntro({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const completeRef = useRef(false)

  const finish = useCallback(() => {
    if (completeRef.current) return
    completeRef.current = true
    onComplete()
  }, [onComplete])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const context = gsap.context(() => {
      const rice = gsap.utils.toArray<HTMLElement>('.nori-intro__rice-particle')
      const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: finish })
      timelineRef.current = timeline

      timeline
        .set('.nori-intro__plate--impact, .nori-intro__plate--arrival, .nori-intro__counter, .nori-intro__rice-particle', { autoAlpha: 0 })
        .fromTo('.nori-intro__plate--overwhelm', { scale: 1.04, xPercent: -1.5 }, { scale: 1.13, xPercent: 1.3, duration: 1.35, ease: 'none' })
        .fromTo('.nori-intro__eyebrow, .nori-intro__warning', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.1 }, 0.18)
        .to('.nori-intro__plate--overwhelm', { filter: 'brightness(0.52) contrast(1.22)', duration: 0.18 }, 1.14)
        .to('.nori-intro__flash', { autoAlpha: 1, duration: 0.045 }, 1.19)
        .to('.nori-intro__flash', { autoAlpha: 0, duration: 0.22 }, 1.24)
        .to('.nori-intro__plate--impact', { autoAlpha: 1, duration: 0.08 }, 1.2)
        .fromTo('.nori-intro__plate--impact', { scale: 1.16, xPercent: -1 }, { scale: 1.03, xPercent: 1, duration: 0.85 }, 1.2)
        .to('.nori-intro__counter', { autoAlpha: 1, duration: 0.18 }, 1.3)
        .to(rice, { autoAlpha: 1, duration: 0.08, stagger: 0.012, x: (index) => ((index % 5) - 2) * 70, y: (index) => -28 - Math.floor(index / 5) * 30 - (index % 3) * 12, rotation: (index) => (index % 2 ? 1 : -1) * (70 + index * 12) }, 1.28)
        .to(rice, { autoAlpha: 0, y: '+=95', duration: 0.48, stagger: 0.02, ease: 'power2.in' }, 1.54)
        .to('.nori-intro__plate--impact', { autoAlpha: 0, duration: 0.34 }, 2.15)
        .to('.nori-intro__eyebrow, .nori-intro__warning, .nori-intro__counter', { autoAlpha: 0, duration: 0.22 }, 2.2)
        .to('.nori-intro__plate--arrival', { autoAlpha: 1, duration: 0.42 }, 2.26)
        .fromTo('.nori-intro__plate--arrival', { scale: 1.13 }, { scale: 1, duration: 1.55, ease: 'power2.out' }, 2.26)
        .to('.nori-intro__arrival-copy', { autoAlpha: 1, y: 0, duration: 0.34 }, 2.76)
        .to(root, { autoAlpha: 0, duration: 0.48 }, 4.4)
    }, root)

    return () => {
      timelineRef.current = null
      context.revert()
    }
  }, [finish])

  const skip = () => {
    if (completeRef.current) return
    timelineRef.current?.kill()
    gsap.to(rootRef.current, { autoAlpha: 0, duration: 0.2, onComplete: finish })
  }

  return (
    <section className="nori-intro" ref={rootRef} aria-label="Nori cinematic introduction">
      <div className="nori-intro__plate nori-intro__plate--overwhelm" aria-hidden="true"><img src="/media/nori-intro/source-frames/shot-01-overwhelm-start.png" alt="" /></div>
      <div className="nori-intro__plate nori-intro__plate--impact" aria-hidden="true"><img src="/media/nori-intro/source-frames/shot-02-clarity-counter-impact.png" alt="" /></div>
      <div className="nori-intro__plate nori-intro__plate--arrival" aria-hidden="true"><img src="/media/nori-intro/source-frames/shot-03-command-chamber-arrival.png" alt="" /></div>
      <div className="nori-intro__shade" aria-hidden="true" />
      <div className="nori-intro__flash" aria-hidden="true" />
      <div className="nori-intro__rice" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i className="nori-intro__rice-particle" key={index} />)}</div>
      <div className="nori-intro__copy">
        <p className="nori-intro__eyebrow">NORI SIGNAL / CLARITY COUNTER</p>
        <p className="nori-intro__warning">When every tactic screams at once, Nori reads the pattern.</p>
        <p className="nori-intro__counter">CLARITY COUNTER / SIGNAL RESOLVED</p>
        <p className="nori-intro__arrival-copy">ONE CLEAR PATH. <strong>ENTER HQ.</strong></p>
      </div>
      <button className="nori-intro__skip" onClick={skip} type="button">Skip intro</button>
    </section>
  )
}

function ClientProofRail() {
  const [activeClientCaseId, setActiveClientCaseId] = useState(clientCaseStudies[0].id)
  const activeClientCase = clientCaseStudies.find((caseStudy) => caseStudy.id === activeClientCaseId) ?? clientCaseStudies[0]
  const activeClientMedia = activeClientCase.detailImage ?? activeClientCase.image
  const activeClientMediaAlt = activeClientCase.detailImageAlt ?? activeClientCase.imageAlt
  const clientRailRef = useRef<HTMLDivElement>(null)

  const selectClientCase = (id: string, centerInRail = false) => {
    setActiveClientCaseId(id)
    if (centerInRail && clientRailRef.current) {
      const rail = clientRailRef.current
      const caseButton = rail.querySelector<HTMLElement>(`[data-case-id="${id}"]`)
      if (caseButton) {
        rail.scrollTo({
          behavior: 'smooth',
          left: Math.max(0, caseButton.offsetLeft - (rail.clientWidth - caseButton.offsetWidth) / 2),
        })
      }
    }
  }

  const moveClientCase = (direction: -1 | 1) => {
    const currentIndex = clientCaseStudies.findIndex((caseStudy) => caseStudy.id === activeClientCaseId)
    const nextIndex = (currentIndex + direction + clientCaseStudies.length) % clientCaseStudies.length
    selectClientCase(clientCaseStudies[nextIndex].id, true)
  }

  return (
    <section className="nori-client-rail" aria-label="Selected NEO Gents client systems">
      <header>
        <div>
          <p className="nori-kicker">CLIENT PROOF / SELECTED SYSTEMS</p>
          <p>Built, being built, or actively maintained by NEO Gents. Select a case sleeve for the story behind it.</p>
        </div>
      </header>
      <div className="nori-client-rail__shelf">
        <div className="nori-client-rail__track" ref={clientRailRef}>
          {clientCaseStudies.map((caseStudy) => (
            <button
              aria-pressed={activeClientCaseId === caseStudy.id}
              className={activeClientCaseId === caseStudy.id ? 'is-active' : ''}
              data-case-id={caseStudy.id}
              key={caseStudy.id}
              onClick={() => selectClientCase(caseStudy.id, true)}
              onFocus={() => selectClientCase(caseStudy.id)}
              onMouseEnter={() => selectClientCase(caseStudy.id)}
              type="button"
            >
              {caseStudy.image ? <img alt="" src={caseStudy.image} /> : <span aria-hidden="true" className="nori-client-rail__wordmark">{caseStudy.label}</span>}
              <span className="nori-client-rail__label">{caseStudy.label}</span>
            </button>
          ))}
        </div>
        <div className="nori-client-rail__controls" aria-label="Client case navigation">
          <button aria-label="Previous client case" onClick={() => moveClientCase(-1)} title="Previous client case" type="button">&lt;-</button>
          <button aria-label="Next client case" onClick={() => moveClientCase(1)} title="Next client case" type="button">-&gt;</button>
        </div>
      </div>
      <section className={`nori-use-case-detail nori-use-case-detail--client ${activeClientMedia || activeClientCase.detailPlaceholder ? 'has-media' : ''}`} aria-live="polite">
        <div>
          <p className="nori-kicker">{activeClientCase.phase}</p>
          <h3>{activeClientCase.label}</h3>
          <p>{activeClientCase.detail}</p>
          <p className="nori-use-case-detail__benefit"><span>What this proves:</span>{activeClientCase.benefit}</p>
          {activeClientCase.quote && <blockquote>{activeClientCase.quote}</blockquote>}
          {activeClientCase.links && (
            <div className="nori-use-case-detail__links">
              {activeClientCase.links.map((link) => <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label} <span aria-hidden="true">-&gt;</span></a>)}
            </div>
          )}
        </div>
        {activeClientCase.detailPlaceholder ? (
          <div className="nori-use-case-detail__placeholder" aria-label={activeClientCase.detailPlaceholder}>
            <span>{activeClientCase.detailPlaceholder}</span>
          </div>
        ) : activeClientMedia && (
          <figure className="nori-use-case-detail__media">
            <img alt={activeClientMediaAlt} src={activeClientMedia} />
          </figure>
        )}
      </section>
    </section>
  )
}

function DeliveryPath() {
  const [activeStageLabel, setActiveStageLabel] = useState(deliveryPath[0].label)
  const activeStage = deliveryPath.find((stage) => stage.label === activeStageLabel) ?? deliveryPath[0]

  return (
    <div className="nori-pipeline" aria-label="From a confusing problem to a managed Nori solution">
      <div className="nori-pipeline__heading">
        <span className="nori-kicker">HOW NORI + NEO GENTS WORK</span>
        <h2>From confusion to a solution.</h2>
        <p>You stay in control. Nori designs a client-specific solution, you approve the plan, and NEO Gents installs it. Then Nori automates the approved workflow while NEO Gents monitors and maintains it on our managed infrastructure.</p>
        <p className="nori-pipeline__security">You do not have to become the IT, cloud, IAM, AI-security, or monitoring team. If the system is breached, prompt-injected, or otherwise compromised, we treat it as our incident to contain, investigate, and fix. We do not hand the blame back to you.</p>
      </div>
      <ol>
        {deliveryPath.map((stage) => (
          <li key={stage.label}>
            <button
              aria-controls="nori-stage-detail"
              aria-pressed={activeStage.label === stage.label}
              className={activeStage.label === stage.label ? 'is-active' : ''}
              onClick={() => setActiveStageLabel(stage.label)}
              onFocus={() => setActiveStageLabel(stage.label)}
              onMouseEnter={() => setActiveStageLabel(stage.label)}
              type="button"
            >
              <span className={`nori-pipeline__owner nori-pipeline__owner--${stage.owner.toLowerCase().replaceAll(' ', '-')}`}>{stage.owner}</span>
              <strong>{stage.label}</strong>
              <p>{stage.detail}</p>
            </button>
          </li>
        ))}
      </ol>
      <div className="nori-pipeline__stage-detail" id="nori-stage-detail" role="status">
        <span>WHY THIS STAGE MATTERS</span>
        <strong>{activeStage.label}</strong>
        <p>{activeStage.whyItMatters}</p>
      </div>
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
          {activeGroup.label === 'Security & privacy' && (
            <a className="nori-security-link" href="https://henrialfonso.com/" target="_blank" rel="noreferrer">
              Security advisory direction backed by Henri Alfonso <span aria-hidden="true">-&gt;</span>
            </a>
          )}
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
      <section className="nori-runtime-brief" aria-label="How Nori works with your business">
        <p className="nori-kicker">NORI OPERATING BRIEF</p>
        <dl>
          <div>
            <dt>What Nori does</dt>
            <dd>Turns the work you describe into a plain-language map, recommends the smallest useful system, and explains the agents, skills, and access it would need.</dd>
          </div>
          <div>
            <dt>What you see first</dt>
            <dd>A draft plan with the work to automate, the human checkpoints, and an estimate of implementation time and expected model usage before anything is activated.</dd>
          </div>
          <div>
            <dt>How Nori improves</dt>
            <dd>Nori retains approved lessons and proven paths to solutions. It proposes new skills and agents when they would help, then assigns them to a research agent that keeps the approved library current. Every change is explained and approved first.</dd>
          </div>
        </dl>
        <p className="nori-runtime-brief__note">Model usage can be billed through a client-selected provider or managed by NEO Gents. Provider choice, routing rules, rate limits, and spending boundaries are confirmed in the approved plan.</p>
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
      <p className="nori-agent-roster__boundary">Legal, financial, payment, credential, publishing, and production actions or agents always require the appropriate review before execution.</p>
    </section>
  )
}

function NoriSystemDossier() {
  const [activeChapter, setActiveChapter] = useState<DossierChapterId>('comparison')
  return (
    <section className="nori-dossier" aria-labelledby="nori-dossier-heading">
      <header className="nori-dossier__intro">
        <div>
          <p className="nori-kicker">HOW NORI DELIVERS / TECHNICAL PROOF</p>
          <h2 id="nori-dossier-heading">The system behind the solution.</h2>
        </div>
        <p>Use cases come first. This file shows the skills, specialists, memory, controls, and approval boundaries Nori can use to design the work responsibly.</p>
      </header>
      <div className="nori-dossier__chapters" role="tablist" aria-label="Nori operating file chapters">
        {dossierChapters.map((chapter) => (
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
        {activeChapter === 'comparison' && (
          <section className="nori-comparison" aria-labelledby="nori-comparison-heading">
            <div>
              <p className="nori-kicker">NORI VS HERMES</p>
              <h3 id="nori-comparison-heading">A self-improving business operating partner.</h3>
              <p>Hermes is a powerful general autonomous-agent platform. Nori is built for business owners who need a system designed around their workflow, installed after approval, and maintained by NEO Gents.</p>
              <p className="nori-comparison__note">Nori Runtime is being built to cover the same core capability families: skills, memory, models, tools, automation, browser and media, and integrations. Availability is verified per approved client deployment.</p>
            </div>
            <dl>
              <div><dt>Starting point</dt><dd>Hermes starts with a general agent platform. Nori starts with one business problem and an approved operating plan.</dd></div>
              <div><dt>Who stays with the work</dt><dd>NEO Gents installs, monitors, updates, and maintains the client-specific Nori runtime.</dd></div>
              <div><dt>Control</dt><dd>The client approves the plan, provider access, budget, agent changes, and consequential external actions.</dd></div>
              <div><dt>How you begin</dt><dd>Start with a managed Nori runtime or one approved agent automated by Nori, then grow into the operating system when ready.</dd></div>
            </dl>
          </section>
        )}

        {activeChapter === 'identity' && (
          <div className="nori-dossier__identity">
            <div>
              <p className="nori-kicker">CLEAR ROLES</p>
              <h3>Nori designs. NEO Gents installs. You approve.</h3>
              <p>Nori listens to one confusing process, maps the connected work, and recommends a practical solution without pretending one agent should own every job.</p>
            </div>
            <ol className="nori-dossier__sequence" aria-label="Nori's internal operating sequence">
              <li><strong>Listener</strong><p>Captures the real goal, context, and constraint.</p></li>
              <li><strong>Auditor</strong><p>Finds the handoffs, risks, and repeat work.</p></li>
              <li><strong>Strategist</strong><p>Recommends the next system and the right owner.</p></li>
            </ol>
          </div>
        )}

        {activeChapter === 'features' && <NoriFeatureOverview />}

        {activeChapter === 'network' && (
          <section className="nori-skill-network" aria-labelledby="nori-skill-network-heading">
            <header>
              <p className="nori-kicker">AGENT-SKILL MATRIX</p>
              <h3 id="nori-skill-network-heading">A skills matrix with clear ownership.</h3>
              <p>The current matrix maps 242 skills to seed agents, runtime classes, and lane rules so Nori can route approved work without assigning every task to one generalist.</p>
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
              <p className="nori-kicker">GUARDRAILS BEFORE ACTION</p>
              <h3>More than a human approval list.</h3>
              <p>Nori can recommend and draft the system, but every client runtime operates inside human, security, prompt, and intelligence boundaries.</p>
            </div>
            <ul className="nori-guardrail-grid">
              {guardrailGroups.map((group) => <li key={group.label}><strong>{group.label}</strong><p>{group.detail}</p></li>)}
            </ul>
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
  const sceneTriggerRef = useRef<ScrollTrigger | null>(null)

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
          scrub: 1.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const next: Scene = progress < 0.17
              ? 'hero'
              : progress < 0.38
                ? 'map'
                : progress < 0.59
                  ? 'dossier'
                  : progress < 0.79
                      ? 'matrix'
                      : 'pipeline'
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
        .fromTo(dossier, incoming, { autoAlpha: 1, z: 0, scale: 1, duration: 0.68, immediateRender: false }, 2.02)
        .addLabel('dossier', 2.7)
        .to(dossier, { autoAlpha: 0, z: 720, scale: 1.15, yPercent: -5, duration: 0.5 }, 3)
        .fromTo(matrix, incoming, { autoAlpha: 1, z: 0, scale: 1, duration: 0.68, immediateRender: false }, 3.22)
        .addLabel('matrix', 3.9)
        .to(matrix, { autoAlpha: 0, z: 720, scale: 1.14, yPercent: -5, duration: 0.5 }, 4.2)
        .fromTo(pipeline, incoming, { autoAlpha: 1, z: 0, scale: 1, duration: 0.68, immediateRender: false }, 4.42)
        .addLabel('pipeline', 5.1)
        .to(pipeline, { z: 70, scale: 1.01, duration: 0.7, ease: 'power1.out' }, 5.1)

      sceneTriggerRef.current = timeline.scrollTrigger ?? null

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

        track.querySelectorAll<HTMLElement>('.nori-command-button, .nori-link-button, .nori-scene-jump, .nori-scene-back').forEach((button) => {
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
      sceneTriggerRef.current = null
      context.revert()
    }
  }, [])

  const sceneStyle = (name: Scene) => ({ pointerEvents: scene === name ? 'auto' as const : 'none' as const })
  const moveToScene = (target: Scene) => {
    const trigger = sceneTriggerRef.current
    if (!trigger) return
    trigger.scroll(trigger.labelToScroll(target === 'hero' ? 'root' : target))
  }
  const previousScene = noriSceneOrder[Math.max(noriSceneOrder.indexOf(scene) - 1, 0)]
  const nextScene = noriSceneOrder[Math.min(noriSceneOrder.indexOf(scene) + 1, noriSceneOrder.length - 1)]

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
        <nav className="nori-cinematic__progress" aria-label="Nori experience sections">
          {noriSceneOrder.map((target) => (
            <button
              aria-current={scene === target ? 'step' : undefined}
              className={scene === target ? 'is-current' : ''}
              key={target}
              onClick={() => moveToScene(target)}
              type="button"
            >
              {noriSceneLabels[target]}
            </button>
          ))}
          </nav>
          {scene !== 'hero' && (
            <button className="nori-scene-back" onClick={() => moveToScene(previousScene)} type="button" aria-label={`Back to ${noriSceneLabels[previousScene]}`} title={`Back to ${noriSceneLabels[previousScene]}`}>
              <span aria-hidden="true">&lt;-</span>
            </button>
          )}
          {scene !== 'pipeline' && (
          <button className="nori-scene-jump" onClick={() => moveToScene(nextScene)} type="button" aria-label={`Go to ${noriSceneLabels[nextScene]}`} title={`Go to ${noriSceneLabels[nextScene]}`}>
            <span aria-hidden="true">-&gt;</span>
          </button>
        )}

        <section ref={heroRef} className="nori-scene nori-scene--hero" style={sceneStyle('hero')} aria-hidden={scene !== 'hero'}>
          <div className="nori-hero__copy">
            <p className="nori-kicker">{noriHero.kicker}</p>
            <SplitHeroHeadline />
            <p className="nori-hero__lede">{noriHero.lede}</p>
            <div className="nori-offer-path" aria-label="How Nori turns confusion into a solution">
              {noriHero.steps.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
            <button className="nori-command-button" type="button" onClick={() => moveToScene('map')}>
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
        {noriHero.steps.map((step) => (
          <span key={step}>{step}</span>
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
      <section className="nori-flow__section nori-flow__use-cases">
        <SolutionUseCases />
      </section>
      <section className="nori-flow__section">
        <DeliveryPath />
        <div className="nori-flow__actions">
          <Link className="nori-command-button" to="/waitlist?profile=nori">Request your clarity map <span aria-hidden="true">-&gt;</span></Link>
          <a className="nori-link-button" href="https://neogents.tech">Open Command Center <span aria-hidden="true">-&gt;</span></a>
        </div>
      </section>
      <NoriSystemDossier />
    </main>
  )
}

export default function NoriCinematicPage() {
  const compact = useCompactLayout()
  const reducedMotion = useReducedMotionPreference()
  const [prompt, setPrompt] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const immersive = !compact && !reducedMotion
  const finishIntro = useCallback(() => setShowIntro(false), [])
  const updatePrompt = (nextPrompt: string) => {
    setPrompt(nextPrompt)
    setPreviewVisible(false)
  }

  return (
    <div className="nori-cinematic">
      {!reducedMotion && showIntro ? <NoriCinematicIntro onComplete={finishIntro} /> : null}
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
