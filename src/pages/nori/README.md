# Nori Cinematic Sections

The Nori page is a five-chapter depth-scroll experience. Keep the order in
`sceneRegistry.ts` aligned with the GSAP labels in `NoriCinematicPage.tsx`.

1. **Clarity**: Hero framing, Nori's promise, and the entry CTA.
2. **Map**: The free clarity-map preview and its conversion path.
3. **Nori**: The Nori system dossier: capabilities, skills matrix, agents, model routing, and guardrails.
4. **Clients of Nori**: Example workflow cards and the selected client proof album rail.
5. **Delivery**: The approved path from diagnosis through managed automation.

Most copy and all client case records live in `src/data/noriPositioning.ts`.
The page layout, cinematic motion, and section markup live in
`src/pages/NoriCinematicPage.tsx`. Use the registry to change the public order
and labels; update the matching GSAP label chronology at the same time.
