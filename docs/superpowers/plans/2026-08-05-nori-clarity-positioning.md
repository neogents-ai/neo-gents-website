# Nori Clarity Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe `/nori` around one-problem-at-a-time business clarity, practical AI use cases, and NEO Gents-installed solutions while preserving the cinematic depth experience.

**Architecture:** Move approved public positioning into a typed data module, then have the existing cinematic and linear experiences render the same hero, lead-generation example, solution categories, delivery path, and technical proof. Keep GSAP, the command-chamber media, and the static Nori model unchanged; revise only content hierarchy, the Build Map interaction, scene labels, and the CSS required by those elements.

**Tech Stack:** React 19, TypeScript 5.9, Vite 8, GSAP ScrollTrigger, `<model-viewer>`, custom CSS, Playwright CLI.

## Global Constraints

- Audience: people building without a blueprint, including entrepreneurs and operators who are new to AI.
- Hero headline: `Make one part of your business work better with AI.`
- Nori listens, explains, diagnoses, maps, and designs the solution.
- NEO Gents installs the approved solution.
- The customer approves the plan and any external action.
- Present recognizable business problems, AI use cases, and solutions before agents, skills, integrations, or architecture.
- The word `bottleneck` may appear only after the plain-language idea has been explained.
- Do not imply that the local preview runs AI analysis or installs a live workflow.
- Do not claim that every integration is live or that Nori can publish, send, charge, deploy, access credentials, or perform legal or financial actions without approval.
- Preserve the obsidian command chamber, black/white/titanium-gold palette, static Nori model, GSAP depth scrolling, and linear mobile/reduced-motion fallback.
- Do not add a dependency, backend, LLM connection, form submission, new cinematic asset, or unrelated refactor.
- Do not fill or submit any external form during verification.
- The working tree contains a rejected, uncommitted lead-only draft in `src/pages/NoriCinematicPage.tsx`; replace its copy deliberately and do not commit it as written.
- Preserve untracked `.playwright-cli/` and `output/` artifacts outside commits.

---

## File Structure

- Create `src/data/noriPositioning.ts`: typed source of truth for approved hero copy, lead-generation example, practical use cases, Build Map examples, and delivery stages.
- Modify `src/pages/NoriCinematicPage.tsx`: render the new hierarchy in both desktop and linear flows; keep GSAP orchestration and dossier data in place.
- Modify `src/pages/NoriCinematicPage.css`: style the connected example path, use-case grid, role-aware delivery path, starter controls, and responsive layouts.
- Modify `docs/NORI-FEATURE-SOURCES.md`: record the clarity-first information hierarchy and link to the approved design specification.
- Reference `docs/superpowers/specs/2026-08-05-nori-clarity-positioning-design.md`: approved requirements; do not rewrite it during implementation.

---

### Task 1: Establish the Approved Positioning Source and Hero

**Files:**
- Create: `src/data/noriPositioning.ts`
- Modify: `src/pages/NoriCinematicPage.tsx:13-238`
- Modify: `src/pages/NoriCinematicPage.tsx:709-728`
- Modify: `src/pages/NoriCinematicPage.tsx:777-789`
- Modify: `src/pages/NoriCinematicPage.css:162-170`
- Modify: `src/pages/NoriCinematicPage.css:340-348`

**Interfaces:**
- Produces: `noriHero`, `leadGenerationExample`, `solutionUseCases`, `buildMapExamples`, and `deliveryPath` exports from `src/data/noriPositioning.ts`.
- Consumes: existing `SplitHeroHeadline`, `DesktopExperience`, and `FlowExperience` render paths.

- [ ] **Step 1: Run a failing hero-copy assertion against the current local page**

Run:

```powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity open http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 1440 900
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { const actual=document.querySelector('.nori-scene--hero h1')?.textContent?.trim(); const expected='Make one part of your business work better with AI.'; if(actual!==expected) throw new Error('hero headline mismatch: '+actual); return actual }"
```

Expected: FAIL with `hero headline mismatch` because the rejected local draft uses lead-only copy.

- [ ] **Step 2: Create the typed positioning source**

Create `src/data/noriPositioning.ts` with these exact exports:

```ts
export interface NoriUseCase {
  id: string
  label: string
  detail: string
}

export interface NoriDeliveryStage {
  label: string
  owner: 'Nori' | 'You' | 'NEO Gents'
  detail: string
}

export const noriHero = {
  kicker: 'NORI / PRACTICAL AI FOR PEOPLE BUILDING WITHOUT A BLUEPRINT',
  headline: 'Make one part of your business work better with AI.',
  lede: 'Start with one confusing process. Nori explains what is happening, identifies a useful AI application, and designs a practical solution. NEO Gents installs the approved workflow.',
  steps: ['Understand the problem', 'Find the AI use case', 'Install the solution'],
  cta: "Show Nori what isn't working",
} as const

export const leadGenerationExample = {
  request: 'I need more customers.',
  explanation: 'That question touches more than lead generation. Nori maps the whole path before recommending a tool.',
  stages: ['Audience', 'Offer', 'Marketing', 'Lead capture', 'Sales', 'Follow-up', 'Delivery'],
} as const

export const solutionUseCases: NoriUseCase[] = [
  { id: 'customers', label: 'Find and reach customers', detail: 'Clarify the audience, offer, outreach, and lead-capture path.' },
  { id: 'marketing-sales', label: 'Improve marketing and sales', detail: 'Connect campaigns, funnels, qualification, and sales follow-up.' },
  { id: 'response', label: 'Respond and follow up faster', detail: 'Reduce missed calls, unanswered inquiries, and inconsistent handoffs.' },
  { id: 'operations', label: 'Organize repetitive work', detail: 'Turn recurring administrative work into a clear, reviewable process.' },
  { id: 'content', label: 'Create and distribute content', detail: 'Build a repeatable path from idea to review and publishing.' },
  { id: 'performance', label: 'Understand business performance', detail: 'Bring important numbers, risks, and next decisions into one view.' },
]

export const buildMapExamples = [
  'I need more customers.',
  'People contact me, but I do not follow up consistently.',
  'Marketing takes too much time.',
  'I keep repeating the same administrative work.',
  'I create content but do not have a reliable publishing process.',
  'I cannot tell which part of the business is making money.',
] as const

export const deliveryPath: NoriDeliveryStage[] = [
  { label: 'Listen', owner: 'Nori', detail: 'Capture the real question, context, and constraint.' },
  { label: 'Explain', owner: 'Nori', detail: 'Make the process and the point of confusion understandable.' },
  { label: 'Map', owner: 'Nori', detail: 'Show the connected workflow and where progress breaks down.' },
  { label: 'Design', owner: 'Nori', detail: 'Recommend a practical AI use case and solution.' },
  { label: 'Approve', owner: 'You', detail: 'Review the plan, permissions, cost, and expected handoffs.' },
  { label: 'Install', owner: 'NEO Gents', detail: 'Build and install the approved workflow.' },
]
```

- [ ] **Step 3: Replace local hero constants and render the approved hero in both layouts**

Import `noriHero` and update `SplitHeroHeadline` to split `noriHero.headline`. Render this structure in the desktop hero and mirror the same values in `FlowExperience`:

Define the existing scroll behavior as a named local callback inside `DesktopExperience`:

```tsx
const scrollToMap = () => window.scrollBy({ top: window.innerHeight * 1.1, behavior: 'smooth' })
```

```tsx
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
```

Extract the compact hero into this reusable local function so Task 4 can place it without duplicating strings:

```tsx
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
```

Keep the existing scroll distance and GSAP intro targets. Do not animate or rotate `.nori-hero__mascot`.

- [ ] **Step 4: Tune hero text fit without changing the visual system**

Keep `letter-spacing: 0`. Adjust only `max-width`, `font-size`, lede spacing, and the existing 900-1100px breakpoint until the full CTA is visible at 1440x900 and 1024x768. Do not change the video, model dimensions on wide desktop, palette, or scene timing.

- [ ] **Step 5: Run hero verification**

Run:

```powershell
npx.cmd eslint src/data/noriPositioning.ts src/pages/NoriCinematicPage.tsx
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { const h=document.querySelector('.nori-scene--hero h1')?.textContent?.trim(); const c=document.querySelector('.nori-scene--hero .nori-command-button')?.getBoundingClientRect(); if(h!=='Make one part of your business work better with AI.') throw new Error('headline mismatch'); if(!c || c.bottom>innerHeight) throw new Error('CTA clipped'); return {h,ctaBottom:c.bottom,viewport:innerHeight} }"
```

Expected: ESLint exits 0; browser assertion returns the approved headline and `ctaBottom < viewport`.

- [ ] **Step 6: Commit the approved positioning source and hero**

```powershell
git add src/data/noriPositioning.ts src/pages/NoriCinematicPage.tsx src/pages/NoriCinematicPage.css
git commit -m "feat: position Nori around practical AI clarity"
```

---

### Task 2: Turn the Build Map Into an Honest Clarity Example

**Files:**
- Modify: `src/pages/NoriCinematicPage.tsx:240-311`
- Modify: `src/pages/NoriCinematicPage.css:218-239`

**Interfaces:**
- Consumes: `leadGenerationExample` and `buildMapExamples` from `src/data/noriPositioning.ts`.
- Produces: a Build Map that demonstrates the customer-acquisition chain and accepts one plain-language problem without claiming live AI analysis.

- [ ] **Step 1: Run a failing assertion for the approved example path**

```powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { window.scrollTo(0,1200); const text=document.querySelector('.nori-scene--map')?.textContent || ''; for(const value of ['I need more customers.','Audience','Offer','Marketing','Lead capture','Sales','Follow-up','Delivery']) if(!text.includes(value)) throw new Error('missing example: '+value); return text }"
```

Expected: FAIL with `missing example`.

- [ ] **Step 2: Replace the system toggle with the connected lead-generation example**

Remove `mode` and `setMode` from `BuildMapPanelProps`, remove `const content = systemContent[mode]`, and remove those props from both call sites. Leave the page-level mode state in place until Task 3 removes the old pipeline. Above the textarea, render:

```tsx
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
```

Use the form heading `What part of your business is unclear or not working the way you want?` and label `Describe one problem in plain language.`

- [ ] **Step 3: Add recognizable starter controls**

Render `buildMapExamples` as buttons above the textarea. A click calls the existing `setPrompt(example)` and hides the prior preview through the parent `updatePrompt` callback.

```tsx
<div className="nori-build-map__starters" aria-label="Example business problems">
  {buildMapExamples.map((example) => (
    <button type="button" key={example} onClick={() => setPrompt(example)}>{example}</button>
  ))}
</div>
```

Keep all values local to the browser. Do not add a request, API call, or form submission.

- [ ] **Step 4: Make the preview boundary explicit**

Change the action to `Generate example map`. The helper text and preview must say:

```tsx
<p>Use non-confidential details only. Nothing is sent or analyzed by AI in this preview.</p>
```

```tsx
<div className="nori-preview" role="status">
  <div><span>ILLUSTRATIVE CLARITY MAP</span><strong>Start by locating the unclear step.</strong></div>
  <p>This example shows how Nori will structure the question. A live analysis begins only after an approved Nori runtime is connected.</p>
</div>
```

- [ ] **Step 5: Style and verify the map at desktop and compact widths**

Add `.nori-example`, `.nori-example__path`, and `.nori-build-map__starters` styles. Use a connected unframed row for the seven stages, small option buttons for starters, and horizontal scrolling only inside the path/starters when necessary. The page body must not overflow horizontally.

Run:

```powershell
npx.cmd eslint src/pages/NoriCinematicPage.tsx
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 1024 768
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { window.scrollTo(0,1200); const text=document.querySelector('.nori-scene--map')?.textContent || ''; const overflow=document.documentElement.scrollWidth>innerWidth; if(!text.includes('I need more customers.')) throw new Error('example missing'); if(overflow) throw new Error('horizontal overflow'); return {overflow,text:text.slice(0,180)} }"
```

Expected: no lint errors, example visible, and `overflow: false`.

- [ ] **Step 6: Commit the clarity example**

```powershell
git add src/pages/NoriCinematicPage.tsx src/pages/NoriCinematicPage.css
git commit -m "feat: explain one business problem through Nori"
```

---

### Task 3: Replace Agent-First Scenes With Use Cases and Delivery Roles

**Files:**
- Modify: `src/pages/NoriCinematicPage.tsx:39-62`
- Modify: `src/pages/NoriCinematicPage.tsx:313-330`
- Modify: `src/pages/NoriCinematicPage.tsx:700-758`
- Modify: `src/pages/NoriCinematicPage.css:240-258`

**Interfaces:**
- Consumes: `solutionUseCases` and `deliveryPath` from `src/data/noriPositioning.ts`.
- Produces: `SolutionUseCases` and `DeliveryPath` presentational functions used by desktop and linear flows.

- [ ] **Step 1: Run a failing assertion for the six solution categories**

```powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { window.scrollTo(0,2300); const text=document.querySelector('.nori-scene--matrix')?.textContent || ''; const expected=['Find and reach customers','Improve marketing and sales','Respond and follow up faster','Organize repetitive work','Create and distribute content','Understand business performance']; for(const item of expected) if(!text.includes(item)) throw new Error('missing use case: '+item); return text }"
```

Expected: FAIL because the scene still shows Strategy, Agent Design, Security, Research, Distribution, and Production.

- [ ] **Step 2: Replace the matrix content with practical use cases**

Delete `agentLanes`. Add a reusable function:

```tsx
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
```

Render `<SolutionUseCases />` inside the matrix scene.

- [ ] **Step 3: Replace the growth/creator pipeline with the role-aware delivery path**

Remove `SystemMode`, `systemContent`, and the `mode` prop from `Pipeline`. Rename it `DeliveryPath` and render:

```tsx
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
            <span className="nori-pipeline__owner">{stage.owner}</span>
            <strong>{stage.label}</strong>
            <p>{stage.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
```

Change the primary scene-four CTA to `Request your clarity map`. Keep the existing waitlist route. Keep `Open Command Center` as the secondary technical action.

- [ ] **Step 4: Rename cinematic progress labels**

Use these exact labels:

```tsx
01 CLARITY
02 EXAMPLE
03 USE CASES
04 DELIVERY
05 PROOF
```

Do not change scene thresholds or GSAP timeline positions.

- [ ] **Step 5: Style role ownership without adding more cards**

Add `.nori-pipeline__owner` as a small utility label. Keep the existing six-column structure and borders. Use gold for Nori/decision accents, muted white for body text, and no new green/purple decorative colors.

- [ ] **Step 6: Verify categories, delivery roles, and static Nori behavior**

```powershell
npx.cmd eslint src/data/noriPositioning.ts src/pages/NoriCinematicPage.tsx
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 1440 900
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { const model=document.querySelector('model-viewer'); window.scrollTo(0,3400); const text=document.querySelector('.nori-scene--pipeline')?.textContent || ''; for(const item of ['Nori designs the solution','You approve it','NEO Gents installs the workflow']) if(!text.includes(item)) throw new Error('missing role: '+item); if(model?.hasAttribute('auto-rotate')) throw new Error('Nori rotation restored'); return {orbit:model?.getAttribute('camera-orbit'),text:text.slice(0,220)} }"
```

Expected: all three role statements are present; `auto-rotate` remains false.

- [ ] **Step 7: Commit the use-case and delivery scenes**

```powershell
git add src/data/noriPositioning.ts src/pages/NoriCinematicPage.tsx src/pages/NoriCinematicPage.css
git commit -m "feat: lead Nori with use cases and installed solutions"
```

---

### Task 4: Align Technical Proof and Linear Fallback With the New Hierarchy

**Files:**
- Modify: `src/pages/NoriCinematicPage.tsx:445-537`
- Modify: `src/pages/NoriCinematicPage.tsx:769-800`
- Modify: `src/pages/NoriCinematicPage.css:261-338`

**Interfaces:**
- Consumes: `noriHero`, `SolutionUseCases`, `DeliveryPath`, and the existing dossier components.
- Produces: identical narrative order across immersive and compact/reduced-motion experiences.

- [ ] **Step 1: Run a failing linear-order assertion**

```powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 390 844
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { const flow=document.querySelector('.nori-flow'); const text=flow?.textContent || ''; const labels=['Make one part of your business work better with AI.','I need more customers.','Start with the work, not the technology.','From confusion to an installed solution.','The system behind the solution.']; let last=-1; for(const label of labels){ const next=text.indexOf(label); if(next<0 || next<=last) throw new Error('linear order mismatch: '+label); last=next } return labels }"
```

Expected: FAIL because the current linear flow places the dossier before delivery and omits the use-case scene.

- [ ] **Step 2: Reframe the dossier as technical proof**

Change the dossier introduction to:

```tsx
<p className="nori-kicker">HOW NORI DELIVERS / TECHNICAL PROOF</p>
<h2>The system behind the solution.</h2>
<p>Use cases come first. This file shows the skills, specialists, memory, controls, and approval boundaries Nori can use to design the work responsibly.</p>
```

Change the Identity chapter headline and supporting copy to:

```tsx
<p className="nori-kicker">CLEAR ROLES</p>
<h3>Nori designs. NEO Gents installs. You approve.</h3>
<p>Nori listens to one confusing process, maps the connected work, and recommends a practical solution without pretending one agent should own every job.</p>
```

Keep capability status labels, the 242-skill statement, the 40-agent roster, and guardrails unchanged as supporting evidence.

- [ ] **Step 3: Put the linear experience in the approved order**

Render this order inside `FlowExperience`:

```tsx
<main className="nori-flow">
  <FlowHero />
  <BuildMapPanel
    compact
    prompt={prompt}
    setPrompt={setPrompt}
    previewVisible={previewVisible}
    onPreview={onPreview}
  />
  <section className="nori-flow__section nori-flow__use-cases"><SolutionUseCases /></section>
  <section className="nori-flow__section">
    <DeliveryPath />
    <div className="nori-flow__actions">
      <Link className="nori-command-button" to="/waitlist?profile=nori">Request your clarity map <span aria-hidden="true">-&gt;</span></Link>
      <a className="nori-link-button" href="https://neogents.tech">Open Command Center <span aria-hidden="true">-&gt;</span></a>
    </div>
  </section>
  <NoriSystemDossier />
</main>
```

Do not duplicate positioning strings; consume the shared data and reusable functions.

- [ ] **Step 4: Verify mobile order, width, and technical disclosure**

```powershell
npx.cmd eslint src/pages/NoriCinematicPage.tsx
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 390 844
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { const text=document.querySelector('.nori-flow')?.textContent || ''; const ordered=['Make one part of your business work better with AI.','I need more customers.','Start with the work, not the technology.','From confusion to an installed solution.','The system behind the solution.']; let cursor=-1; for(const value of ordered){ const index=text.indexOf(value); if(index<=cursor) throw new Error('bad order: '+value); cursor=index } if(document.documentElement.scrollWidth>innerWidth) throw new Error('horizontal overflow'); return {ordered,width:document.documentElement.scrollWidth,viewport:innerWidth} }"
```

Expected: approved order returned and document width does not exceed viewport width.

- [ ] **Step 5: Commit the proof and fallback hierarchy**

```powershell
git add src/pages/NoriCinematicPage.tsx src/pages/NoriCinematicPage.css
git commit -m "refine: align Nori proof with the clarity offer"
```

---

### Task 5: Perform Full Visual Verification and Update Documentation

**Files:**
- Modify: `docs/NORI-FEATURE-SOURCES.md`
- Verify: `src/data/noriPositioning.ts`
- Verify: `src/pages/NoriCinematicPage.tsx`
- Verify: `src/pages/NoriCinematicPage.css`

**Interfaces:**
- Consumes: completed page implementation and approved design specification.
- Produces: documented, build-green, browser-verified Nori clarity experience on branch `nori`.

- [ ] **Step 1: Update the implementation documentation**

Add a `Clarity-First Positioning` section to `docs/NORI-FEATURE-SOURCES.md` that links to `docs/superpowers/specs/2026-08-05-nori-clarity-positioning-design.md` and records:

```markdown
The public page leads with one confusing business process, a practical AI use case, and an approved solution. Nori designs the solution, NEO Gents installs it, and the customer approves the plan and external actions. Agent and skill details appear only after the use cases are clear.
```

- [ ] **Step 2: Run static verification**

```powershell
npx.cmd eslint src/data/noriPositioning.ts src/pages/NoriCinematicPage.tsx src/components/three/HeroMascot3D.tsx src/pages/HomePage.tsx
npm.cmd run build
git diff --check
```

Expected: ESLint exits 0; production build succeeds; `git diff --check` reports no whitespace errors. Existing Vite chunk-size warnings are informational, not failures.

- [ ] **Step 3: Capture all desktop depth stops**

```powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 1440 900
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity screenshot --filename output/playwright/nori-clarity-01-hero.png
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => window.scrollTo(0,1200)"
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity screenshot --filename output/playwright/nori-clarity-02-example.png
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => window.scrollTo(0,2300)"
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity screenshot --filename output/playwright/nori-clarity-03-use-cases.png
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => window.scrollTo(0,3400)"
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity screenshot --filename output/playwright/nori-clarity-04-delivery.png
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => window.scrollTo(0,4700)"
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity screenshot --filename output/playwright/nori-clarity-05-proof.png
```

Visually confirm no scene overlap, clipped text, accidental card nesting, cursor obstruction, or Nori rotation.

- [ ] **Step 4: Verify media, controls, and console state**

```powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity eval "() => { const video=document.querySelector('.nori-cinema-bg video'); const model=document.querySelector('model-viewer'); return {video:{width:video?.videoWidth,height:video?.videoHeight,paused:video?.paused,readyState:video?.readyState},model:{autoRotate:model?.hasAttribute('auto-rotate'),orbit:model?.getAttribute('camera-orbit')},bodyWidth:document.body.scrollWidth,viewport:innerWidth} }"
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity console error
```

Expected: video is 3840x2160, unpaused, and ready; `autoRotate` is false; body does not overflow; console has zero errors. Lit development warnings from `<model-viewer>` are acceptable.

- [ ] **Step 5: Verify 1024x768 and 390x844 layouts**

```powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 1024 768
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity screenshot --filename output/playwright/nori-clarity-tablet.png
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity resize 390 844
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity goto http://127.0.0.1:4173/nori
npx.cmd --yes --package @playwright/cli playwright-cli -s=nori-clarity screenshot --filename output/playwright/nori-clarity-mobile.png
```

Visually confirm headline wrapping, CTA visibility, Nori framing or fallback image, readable connected path, and no horizontal page overflow.

- [ ] **Step 6: Commit documentation and any verification-only corrections**

```powershell
git add docs/NORI-FEATURE-SOURCES.md src/data/noriPositioning.ts src/pages/NoriCinematicPage.tsx src/pages/NoriCinematicPage.css
git commit -m "docs: record Nori clarity-first experience"
```

- [ ] **Step 7: Push the isolated branch and verify the remote head**

```powershell
git push origin nori
git rev-parse HEAD
git ls-remote --heads origin nori
git status --short --branch
```

Expected: local and remote commit hashes match. Only `.playwright-cli/` and `output/` may remain untracked.
