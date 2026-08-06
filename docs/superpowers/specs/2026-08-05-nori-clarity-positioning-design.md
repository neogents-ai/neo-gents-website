# Nori Clarity Positioning Design

Date: 2026-08-05
Status: Approved direction, pending written-spec review
Route: `/nori`
Branch: `nori`

## Purpose

Reposition the Nori page around practical AI adoption and business clarity. The page must help people understand what Nori does before it explains agents, orchestration, skills, or technical architecture.

Nori's public offer is not "buy an agent." Her offer is to help someone take one confusing business process at a time, understand what is happening, identify a useful AI application, and receive a practical solution that improves the workflow.

## Audience

The primary audience is people building without a blueprint, especially entrepreneurs and operators who are new to AI or have been overlooked by mainstream Silicon Valley products and language.

The `/nori` page uses this broad, inclusive framing. The more explicit Foundational Black American community and supporter message remains on `supporter.neogents.io`.

The audience should not need to know what an AI agent, orchestration layer, model router, MCP server, or agent skill is before the page becomes useful.

## Core Promise

Nori provides clarity one confusing business process at a time.

The communication model is:

1. Start with one part of the business that is confusing, slow, inconsistent, or not working.
2. Explain the process and its dependencies in plain language.
3. Identify where AI can provide practical value.
4. Design a clear, human-approved solution.
5. Have NEO Gents install the approved workflow.

This replaces "bottleneck" as the primary public term. The page can use phrases such as "what feels stuck," "what is not working," "where progress breaks down," and "the part that needs clarity." The word "bottleneck" may appear later as an educational term after the concept has already been explained.

## Role Boundaries

The roles must remain explicit throughout the page:

- Nori listens, explains, diagnoses, maps, and designs the solution.
- NEO Gents installs the approved solution.
- The customer approves the plan and any external action.
- Agents, skills, integrations, and models are supporting implementation mechanisms, not the product headline.

The page must not imply that every integration is live or that Nori can publish, send, charge, deploy, access credentials, or perform legal or financial actions without the appropriate approval.

## First Viewport

### Kicker

`NORI / PRACTICAL AI FOR PEOPLE BUILDING WITHOUT A BLUEPRINT`

### Headline

`Make one part of your business work better with AI.`

### Supporting Copy

`Start with one confusing process. Nori explains what is happening, identifies a useful AI application, and designs a practical solution. NEO Gents installs the approved workflow.`

### Three-Step Path

1. Understand the problem
2. Find the AI use case
3. Install the solution

### Primary Action

`Show Nori what isn't working`

The action advances to the diagnostic Build Map. It does not imply that an automation will be deployed immediately.

## Cinematic Narrative

The existing command-chamber environment and depth-scroll interaction remain. Motion should support the explanation rather than compete with it.

### Scene 1: Clarity

Introduce Nori and the one-problem-at-a-time promise. Avoid leading with agent terminology.

### Scene 2: Example Request

Use the first plain-language example:

`I need more customers.`

Nori expands that request into the connected business path:

`Audience -> Offer -> Marketing -> Lead capture -> Sales -> Follow-up -> Delivery`

This demonstrates that "finding customers" is not one isolated task. Nori identifies which part needs attention before recommending technology.

### Scene 3: The Clear Map

Show how Nori turns the request into an understandable workflow. The visitor should see the relationship between each stage, where progress can break down, and what question should be answered next.

### Scene 4: Practical Solutions

Present solution and use-case categories rather than departments or agents:

- Find and reach customers
- Improve marketing and sales
- Respond and follow up faster
- Organize repetitive work
- Create and distribute content
- Understand business performance

Each category should describe recognizable work and outcomes. Technical mechanisms remain secondary.

### Scene 5: How Nori Delivers

The operating dossier explains the deeper system only after the offer is clear. It may cover skills, specialist agents, memory, orchestration, security, and approvals as evidence that Nori can design and govern a solution responsibly.

## Build Map Language

The Build Map should begin with a plain-language prompt such as:

`What part of your business is unclear or not working the way you want?`

Example starter prompts should be recognizable business situations:

- `I need more customers.`
- `People contact me, but I do not follow up consistently.`
- `Marketing takes too much time.`
- `I keep repeating the same administrative work.`
- `I create content but do not have a reliable publishing process.`
- `I cannot tell which part of the business is making money.`

The result is a draft clarity map, not a claim that the complete solution has been installed.

## Information Hierarchy

The page must disclose information in this order:

1. The visitor's recognizable business problem
2. Nori's plain-language explanation
3. The relevant AI use case
4. The proposed business solution
5. NEO Gents installation and human approval
6. Supporting agents, skills, integrations, and technical architecture

Any section that reverses this order should be revised. In particular, agent counts and skill counts must not appear before the visitor understands the use cases they support.

## Voice

- Plain, direct, and respectful
- Educational without sounding remedial
- Practical rather than futuristic
- Confident without promising guaranteed outcomes
- Free of unexplained AI jargon

Nori should sound like a strategic guide who can make complicated systems understandable. She should not sound like a generic chatbot, a software dashboard, or an all-powerful autonomous operator.

## Visual Direction

Keep the existing luxury-minimalist cinematic system:

- Obsidian command chamber
- Stark white typography
- Muted titanium-gold accents
- Static Nori character
- Scroll-driven camera depth
- Compact, inspectable operating dossier

The visual signature remains the feeling of moving deeper into Nori's reasoning. Each depth stop should answer one question and leave one clear next step.

Do not add decorative cards, neon effects, rotating Nori motion, or dense technical diagrams to the hero. The lead-generation example may use a restrained connected path, but it should read as a business explanation rather than a software architecture chart.

## Responsive and Accessibility Requirements

- Desktop retains the pinned cinematic depth sequence.
- Small screens and reduced-motion preferences use the linear document flow.
- The same message hierarchy and copy must appear in both experiences.
- The headline, explanation, path, and primary action must fit inside the first desktop viewport.
- All interactive controls must retain keyboard focus styles and meaningful labels.
- Motion must never be required to understand the business explanation.

## Success Criteria

The revised page succeeds when a first-time visitor can answer these questions after the first two scenes:

1. Who is Nori for?
2. What problem should I bring her?
3. What does she do with that problem?
4. Where does AI fit?
5. Who installs the final solution?

The expected answers are:

- Nori is for people building without a blueprint.
- Bring one confusing or ineffective business process.
- She explains it and maps the connected workflow.
- She identifies a practical AI use case and designs the solution.
- NEO Gents installs the approved workflow.

## Out of Scope

- Rebuilding the visual system or command-chamber media
- Adding a live LLM or production automation runtime
- Changing the supporter fundraising page
- Promoting agent counts as the primary offer
- Promising fully autonomous business operation
- Reworking mobile beyond preserving the approved linear fallback

## Verification

Implementation should be checked with:

- Targeted TypeScript and ESLint validation
- Production build
- Playwright screenshots at 1440x900 and 1024x768
- Linear fallback check at 390x844
- First-viewport text-fit and CTA visibility checks
- Scroll-stop checks for all five scenes
- Build Map prompt and preview interaction checks
- Confirmation that Nori remains static and the cinematic video continues playing
- Console-error review

