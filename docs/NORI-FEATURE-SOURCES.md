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

Source snapshot: 2026-08-05.
