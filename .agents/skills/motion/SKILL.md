---
name: motion
description: Build UI animation, welcome sequences, page transitions, and Three.js scenes in this project using the local Emil and Three.js resources. Use when adding or refining motion; choose only the resources relevant to the requested effect.
---

# Motion

Motion is the main project skill, routing to 17 local skill resources: four UI animation skills and thirteen Three.js skills. Resource paths below are relative to the project root (three directories above this file).

## UI animation / Emil

- Build an animation: `.codex/motion-resources/emil/animate/SKILL.md`. Read its sibling `RECIPES.md` for matching components or staggered entrances.
- Diagnose animation performance: `.codex/motion-resources/emil/animation-performance/SKILL.md`.
- Find useful animation opportunities: `.codex/motion-resources/emil/find-animation-opportunities/SKILL.md`.
- Prototype motion: `.codex/motion-resources/emil/prototype/SKILL.md`, with sibling `PICKER.md` for selecting the prototype approach.

## Three.js

Each name below resolves to `.codex/motion-resources/threejs/<name>/SKILL.md`.

| Collection | Resources |
| --- | --- |
| Basics | `threejs-fundamentals`, `threejs-react-three-fiber`, `threejs-animation` |
| Appearance | `threejs-geometry`, `threejs-materials`, `threejs-lighting`, `threejs-textures`, `threejs-shaders` |
| Assets and interaction | `threejs-loaders`, `threejs-asset-pipeline`, `threejs-interaction` |
| Effects and performance | `threejs-postprocessing`, `threejs-performance` |

## Working choices

Read the relevant resource before implementing. Use CSS for predetermined welcome sequences and simple transforms; use the existing Framer Motion dependency for interactions that need it. Use Three.js only when the result needs a rendered 3D scene, not merely for a CSS perspective effect.

Match the active page's design tokens. Animate transform and opacity where possible, gate hover motion to fine pointers, and provide reduced-motion behavior. Opening animations must offer immediate entry or a skip action, preserve keyboard access, restore scrolling and focus, and clean up timers on unmount. Do not invent guest names, wedding dates, or audio assets.

Follow the user's testing preference: no routine build, lint, browser runs, or test suites; use focused checks when diagnosing an actual error or when explicitly required by higher-priority instructions.

## Sources

UI resources: https://github.com/emilkowalski/skills

Three.js resources: https://github.com/CloudAI-X/threejs-skills

Pinned source commits and fetch date are recorded in `.codex/motion-resources/sources.json`; upstream licenses are preserved in each collection. These are newly fetched resources, not a verified reconstruction of any earlier local installation.
