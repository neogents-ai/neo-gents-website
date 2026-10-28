import { useState, type ChangeEvent, type FormEvent } from 'react'
import './NoriSplashPage.css'

/**
 * Mix C `/nori` splash. Draft only — nothing live.
 * Open TBDs: book URL, Brain Dump setup links, form endpoint (CISO/Nora).
 *
 * Character art is the repo file `public/nori-full.png` (same filename the
 * Mix pack references). The pack PNG was not in the handoff uploads — do not
 * swap in a different character.
 */

const AI_OPTIONS = [
  { name: 'Claude Code', line: 'NORI setup for Claude Code' },
  { name: 'Codex', line: 'NORI setup for Codex' },
  { name: 'Grok Bot', line: 'NORI setup for Grok Bot' },
  { name: 'Muse', line: 'NORI setup for Muse' },
] as const

type AiName = (typeof AI_OPTIONS)[number]['name'] | ''

const SUCCESS_COPY = 'Got it. We’ll reach out to book your consult.'

export default function NoriSplashPage() {
  const [ai, setAi] = useState<AiName>('')
  const [submitted, setSubmitted] = useState(false)

  function onAiChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    if (value === '' || AI_OPTIONS.some((option) => option.name === value)) {
      setAi(value as AiName)
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="nori-splash">
      <div className="nori-splash__draft" role="note">
        DRAFT Mix C · Ink copy · Book a consult · URL TBD · nothing live
      </div>
      <div className="nori-splash__frame">
        <div className="nori-splash__glow" aria-hidden="true" />
        <header className="nori-splash__header">
          <div className="nori-splash__mark">
            NEO GENTS · <span>N.O.R.I.</span>
          </div>
          <div className="nori-splash__chip">/nori · mix C</div>
        </header>

        <section className="nori-splash__hero">
          <div>
            <p className="nori-splash__kicker">Front door for local businesses</p>
            <h1>
              Pick the AI you already use.
              <span className="nori-splash__l2">We’ll set NORI up around it.</span>
            </h1>
            <div className="nori-splash__rule" />
            <p className="nori-splash__sub">
              Local businesses and builders who want a real path — not another tool dump. Book a consult and we get you moving.
            </p>

            <h2>Pick your AI</h2>
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

            <div className="nori-splash__cta-row">
              {/* Booking URL is TBD. Keep #book until Darion’s link exists. */}
              <a className="nori-splash__btn nori-splash__btn-primary" id="book" href="#book">
                Book a consult
              </a>
            </div>
            <p className="nori-splash__micro">Booking URL TBD · Brain Dump setup links TBD · drafts only</p>

            <form className="nori-splash__form" id="lead" onSubmit={onSubmit}>
              <h3>Book a consult</h3>
              <p className="nori-splash__micro nori-splash__micro--form">Lead capture · endpoint TBD</p>

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

          <div className="nori-splash__stage">
            <img src="/nori-full.png" alt="NORI" />
          </div>
        </section>

        <footer className="nori-splash__footer">NEO Gents · neogents.io</footer>
      </div>
    </div>
  )
}
