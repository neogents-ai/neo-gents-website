import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import './NoriSplashPage.css'

/**
 * Mix C `/nori` splash. Draft only — nothing live.
 * Book a consult scrolls to the form. Nora follows up. There is no booking URL.
 *
 * Lead capture is Formspree-ready for npcneogents@gmail.com (NEO Gents).
 * CISO still has to drop in action="https://formspree.io/f/XXXX" method="POST".
 * Until that id exists, submit only preventDefault + the success line. No POST.
 * _subject template once a real POST exists: [NORI Consult] {Name} — {Which AI}
 *
 * Still open: Formspree form id (CISO), Brain Dump setup links, draft banner.
 *
 * Character art is the repo file `public/nori-full.png`. Opaque is fine — do not
 * fake a cutout. Motion: `.motion` / `.rm` on this root are the only hide-then-reveal classes.
 */

const AI_OPTIONS = [
  { name: 'Claude Code', line: 'NORI setup for Claude Code' },
  { name: 'Codex', line: 'NORI setup for Codex' },
  { name: 'Grok Bot', line: 'NORI setup for Grok Bot' },
  { name: 'Muse', line: 'NORI setup for Muse' },
] as const

type AiName = (typeof AI_OPTIONS)[number]['name'] | ''

const SUCCESS_COPY = 'Got it. We’ll reach out to book your consult.'
const SUBJECT_LEAD = '[NORI Consult] lead'

/** [NORI Consult] {Name} — {Which AI}. Empty pieces fall back to the static lead subject. */
function consultSubject(person: string, which: string) {
  const name = person.trim()
  const aiName = which.trim()
  if (!name && !aiName) return SUBJECT_LEAD
  if (!aiName) return `[NORI Consult] ${name}`
  if (!name) return `[NORI Consult] lead — ${aiName}`
  return `[NORI Consult] ${name} — ${aiName}`
}

export default function NoriSplashPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [ai, setAi] = useState<AiName>('')
  const [submitted, setSubmitted] = useState(false)
  const [formIn, setFormIn] = useState(false)
  const [subject, setSubject] = useState(SUBJECT_LEAD)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyMode = () => {
      const reduce = motionQuery.matches
      root.classList.toggle('rm', reduce)
      root.classList.toggle('motion', !reduce)
    }
    applyMode()
    motionQuery.addEventListener('change', applyMode)

    const target = sentinelRef.current
    if (!target) {
      return () => motionQuery.removeEventListener('change', applyMode)
    }

    const reveal = () => setFormIn(true)
    if (window.location.hash === '#lead') reveal()

    let observer: IntersectionObserver | undefined
    if (typeof IntersectionObserver === 'undefined') {
      reveal()
    } else {
      // Watch an unclipped marker. clip-path on the form itself would shrink
      // its intersection box to nothing, so the wipe would never start.
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            reveal()
            observer?.disconnect()
          }
        },
        { threshold: 0, rootMargin: '0px 0px -8% 0px' },
      )
      observer.observe(target)
    }

    return () => {
      motionQuery.removeEventListener('change', applyMode)
      observer?.disconnect()
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || root.classList.contains('rm')) return

    let frame = 0
    let dirty = false
    let hy = 0
    let px = 0
    let py = 0

    const paint = () => {
      frame = 0
      if (!dirty) return
      dirty = false
      root.style.setProperty('--hy', hy.toFixed(2))
      root.style.setProperty('--px', px.toFixed(3))
      root.style.setProperty('--py', py.toFixed(3))
    }

    const schedule = () => {
      dirty = true
      if (!frame) frame = window.requestAnimationFrame(paint)
    }

    const onScroll = () => {
      hy = Math.min(window.scrollY, 320)
      schedule()
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 861px)')
    const onPointer = (event: PointerEvent) => {
      px = event.clientX / window.innerWidth - 0.5
      py = event.clientY / window.innerHeight - 0.5
      schedule()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    if (finePointer.matches) {
      window.addEventListener('pointermove', onPointer, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  function onAiChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    if (value === '' || AI_OPTIONS.some((option) => option.name === value)) {
      setAi(value as AiName)
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // No network post. When CISO adds the Formspree action and method, write
    // _subject here before that POST: [NORI Consult] {Name} — {Which AI}.
    const form = event.currentTarget
    const data = new FormData(form)
    const next = consultSubject(String(data.get('name') ?? ''), String(data.get('ai') ?? ''))
    const subjectInput = form.querySelector<HTMLInputElement>('input[name="_subject"]')
    if (subjectInput) subjectInput.value = next
    setSubject(next)
    setSubmitted(true)
  }

  return (
    <div className="nori-splash" ref={rootRef}>
      <div className="nori-splash__draft" role="note">
        DRAFT Mix C · Ink copy · Nora follow-up · nothing live
      </div>
      <div className="nori-splash__frame">
        <header className="nori-splash__header">
          <div className="nori-splash__mark">
            NEO GENTS · <span>N.O.R.I.</span>
          </div>
          <div className="nori-splash__chip">/nori · mix C</div>
        </header>

        <section className="nori-splash__hero">
          <div className="nori-splash__wash" data-layer="back" aria-hidden="true" />
          <div className="nori-splash__copy">
            <p className="nori-splash__kicker nori-splash__rise">Front door for local businesses</p>
            <h1>
              <span className="nori-splash__l1 nori-splash__rise">Pick the AI you already use.</span>
              <span className="nori-splash__l2 nori-splash__rise">We’ll set NORI up around it.</span>
            </h1>
            <div className="nori-splash__rule nori-splash__rise" />
            <p className="nori-splash__sub nori-splash__rise">
              Local businesses and builders who want a real path — not another tool dump. Book a consult and we get you moving.
            </p>

            <h2 className="nori-splash__rise">Pick your AI</h2>
            {/* Setup deep-links are TBD. Tiles select an AI; they do not navigate. */}
            <div className="nori-splash__tiles" role="group" aria-label="Pick your AI">
              {AI_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="nori-splash__tile"
                  aria-pressed={ai === option.name}
                  onClick={() => setAi(option.name)}
                >
                  <strong>{option.name}</strong>
                  <span>{option.line}</span>
                </button>
              ))}
            </div>

            <div className="nori-splash__cta-row nori-splash__rise">
              {/* Scrolls to the form. No booking URL. */}
              <a className="nori-splash__btn nori-splash__btn-primary" href="#lead">
                Book a consult
              </a>
            </div>
            <p className="nori-splash__micro nori-splash__note">Drafts only · setup links TBD</p>

            <div className="nori-splash__lead">
              <div className="nori-splash__sentinel" ref={sentinelRef} aria-hidden="true" />
              <form
              className={formIn ? 'nori-splash__form in' : 'nori-splash__form'}
              id="lead"
              data-reveal
              onSubmit={onSubmit}
              onFocus={() => setFormIn(true)}
            >
              <h3>Book a consult</h3>
              <p className="nori-splash__micro nori-splash__micro--form nori-splash__note">Nora lead capture · Formspree → npcneogents · endpoint TBD (CISO).</p>
              {/*
                CISO drop-in, still empty on purpose (do not POST):
                action="https://formspree.io/f/XXXX" method="POST"
                Inbox on that form: npcneogents@gmail.com
                Keep field names: name, email, fix, ai, _subject
              */}
              <input type="hidden" name="_subject" value={subject} />

              <label htmlFor="nori-name">Name</label>
              <input id="nori-name" name="name" autoComplete="name" placeholder="Your name" />

              <label htmlFor="nori-email">Email</label>
              <input id="nori-email" name="email" type="email" autoComplete="email" placeholder="you@business.com" />

              <label htmlFor="nori-fix">What you’re trying to fix (optional)</label>
              <textarea id="nori-fix" name="fix" placeholder="What’s eating your week?" />

              <label htmlFor="nori-ai">Which AI you’re on (optional)</label>
              <select id="nori-ai" name="ai" value={ai} onChange={onAiChange}>
                <option value="">Select…</option>
                {AI_OPTIONS.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div className="nori-splash__cta-row">
                <button className="nori-splash__btn nori-splash__btn-primary" type="submit">
                  Book a consult
                </button>
              </div>
              <p className="nori-splash__micro nori-splash__success" data-success hidden={!submitted} role="status">
                {SUCCESS_COPY}
              </p>
            </form>
            </div>
          </div>

          <div className="nori-splash__stage">
            <div className="nori-splash__glow" data-layer="mid" aria-hidden="true" />
            <img data-layer="subject" src="/nori-full.png" alt="NORI" />
          </div>
        </section>

        <footer className="nori-splash__footer">NEO Gents · neogents.io</footer>
      </div>
    </div>
  )
}
