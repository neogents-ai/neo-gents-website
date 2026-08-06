# Nori Feature Sources

This file records the source material behind the public Nori feature overview. It exists to keep website claims aligned with the SDK and to separate implemented files from runtime-dependent integrations.

## Local Source Truth

- `C:\Users\Admin\Desktop\neo-gents\nori-sdk\core\identity.md`
  - Root seed-agent identity, fleet creation protocol, monitoring, and four-stage approval gate.
- `C:\Users\Admin\Desktop\neo-gents\nori-sdk\config\approval-gates.json`
  - Draft, Build, Deploy, Live stages plus backup and rollback contracts.
- `C:\Users\Admin\Desktop\neo-gents\nori-sdk\config\mcp-tools.json`
  - Agent registry, prompt inspection, performance, bug, alert, and CISO tool definitions.
- `C:\Users\Admin\Desktop\neo-gents\nori-sdk\config\model-routing.json`
  - Heavy and light model-routing intent.
- `C:\Users\Admin\Desktop\neo-gents\nori-sdk\config\monitoring.json`
  - Trigger sources, fleet monitoring, anomaly detection, and morning-brief design.
- `C:\Users\Admin\Desktop\neo-gents\nori-sdk\agents`
  - Forty specialist templates across Sales, Operations, Content, Research, Support, Creator, and Finance.
- `C:\Users\Admin\Desktop\neo-gents-vault\00-command-center\phase-1-source-truth\AGENT-SKILL-MATRIX.md`
  - The 242-skill routing matrix and lane ownership.
- `C:\Users\Admin\Desktop\neo-gents-vault\00-command-center\phase-1-source-truth\NORI-HERMES-SCOPE.md`
  - Business scope, external-action boundaries, and CISO/operator approval requirements.
- `C:\Users\Admin\Desktop\neo-gents-vault\00-command-center\phase-1-source-truth\HERMES-SOURCE-SELECTION-INDEX.md`
  - Curated workspace rules and blocked private material.

## Recovered Google Drive Sources

- [NORI-HERMES-SCOPE.md](https://drive.google.com/file/d/1CPcZRbK6y7C46DsJH7g7_2ubZdJI5atg)
- [HERMES-SOURCE-SELECTION-INDEX.md](https://drive.google.com/file/d/1tPrg2VLJ3aIwVYTEHgfFJu-qI14tL7nN)
- [SFS-OS seed-agent playbook](https://drive.google.com/file/d/1SHTF9pIvOrQUoskEkh3MHrua6YoAOzF7)
- [Shared platform architecture](https://drive.google.com/file/d/1cP7lEqaNWM92wJJpZJopHmpq1kQgbGQr)

The Google Drive copies helped identify the missing planning history. Current website claims should still be checked against the local SDK and phase-1 source-truth files before publication.

## Public Reference

- [Hermes Agent Features Overview](https://hermes-agent.nousresearch.com/docs/user-guide/features/overview)

Hermes informed the grouped feature-overview structure only. Nori copy, taxonomy, agent roster, permissions, and operating model are original and source-grounded.

## Status Labels

- `SDK DEFINED`: A supporting Nori SDK file or template exists locally.
- `RUNTIME HOOK`: The SDK or runtime plan defines the behavior, but availability depends on an installed runtime.
- `INTEGRATION`: An approved external service, database, provider, or authenticated tool connection is required.
- `APPROVAL GATED`: Operator, CISO, legal, financial, or other assigned review is required before action.

## Public Claim Boundary

The page may explain what Nori is designed to do and what templates exist. It must not imply that every integration is live, that private files are mounted, or that Nori may publish, send, charge, deploy, access credentials, or perform legal and financial actions without approval.

## Cinematic Page Implementation

- Route: `/nori`
- Source: `src/pages/NoriCinematicPage.tsx` and `src/pages/NoriCinematicPage.css`
- Orchestration: GSAP `ScrollTrigger` pins a 100vh viewport and moves five scenes through Z-space: Clarity, Example, Use Cases, Delivery, and Proof.
- Accessibility: viewports below 900px and reduced-motion preferences receive the linear document flow instead of the pinned camera sequence.
- Character: `public/models/nori.glb` renders through `<model-viewer>` with a fixed camera orbit. Auto-rotation and scroll-linked character rotation are disabled.
- Background plate: `public/media/nori-command-chamber.png`
- Video loop: `public/media/nori-command-chamber-loop.mp4`, a 3840x2160, 24 fps, ten-second H.264 loop built from the approved plate with a restrained camera push and no audio.
- Visual effects: a film-grain overlay, subtle depth planes, split-letter GSAP introduction, and pointer-fine magnetic actions. UI text and controls stay outside the video layer.

The command-chamber plate was generated with Codex image generation using this direction:

> Full-screen cinematic website background plate, 16:9; premium luxury-minimalist cyberpunk command chamber for N.O.R.I.; no people, robots, characters, or weapons; photoreal ARRI Alexa 35, 35mm anamorphic, f/2.8, HDR; locked wide frame; left 42 percent dark and uncluttered; circular intelligence recess on the right; pitch black and charcoal, white highlights, muted titanium gold under 5 percent, trace green; no text, logos, UI panels, purple or cyan neon, red lasers, bokeh orbs, lens flare, or watermark.

Browser verification covered 1440x900 and 1024x768 immersive frames plus the 390x844 linear fallback. The checks included all five depth stops, nested dossier tabs, 4K video readiness and autoplay, static model attributes, horizontal overflow, production build, and targeted lint.

## Clarity-First Positioning

The public page leads with one confusing business process, a practical AI use case, and an approved solution. Nori designs the solution, NEO Gents installs it, and the customer approves the plan and external actions. Agent and skill details appear only after the use cases are clear.

See [the approved clarity-first design](superpowers/specs/2026-08-05-nori-clarity-positioning-design.md).

Source snapshot: 2026-08-05.
