---
name: demo-design-system
description: "Translate or review the Flowbite demo UI using its Figma reference, semantic tokens and @demo/ui contracts. Use for layouts, visual changes, component variants or Figma-to-Angular work in this project."
---

# Demo design system

Use this project's Flowbite design language while keeping the sample small. Resolve project paths from the repository root, three levels above this skill directory.

## Sources to read

- [Design mapping](references/design-mapping.md): Figma file/frame, token mappings, asset provenance and intentional adaptations. Read for design translation, tokens or visual review.
- [Component contracts](references/components.md): library inputs, outputs and states. Read before composing or changing a shared control.
- Inspect the matching implementation under `projects/demo-ui/src/lib/` and its stories; the current source owns exact APIs. Token values live in `projects/demo-ui/src/styles/tokens.css`, component rules in `components.css`, and Tailwind aliases in `projects/demo/src/styles.css`.

## Design translation

For a supplied Figma design, load the Figma integration's design-to-code guidance before requesting design context. Inspect the actual target frame and its screenshot; the project's cover page is not an application screen. Adapt the returned reference into Angular rather than pasting React output. If live Figma access is unavailable, state that limitation and use the checked-in mapping without claiming fresh design verification.

Map the design onto existing library components and semantic tokens before adding primitives. Keep the presentational library independent of application services and state. Preserve local SVG assets and their proportions; do not replace matching icons or use temporary Figma URLs at runtime. Document genuine changes to the baseline or token mapping in the reference files. Keep Flowbite attribution when adapting its assets.

For new compositions, identify the primary task, information hierarchy, responsive behaviour and relevant states first. Use existing spacing, typography, status and focus treatments. Design loading, empty, error, disabled and read-only states only where applicable. Avoid adding unrelated pages or turning this small library into a generic grid framework.

## Visual review

Inspect the rendered change at desktop and narrow widths. Review alignment, hierarchy, typography, token use, icons and state completeness. Coordinate with `demo-accessibility` for interaction semantics and `demo-browser-qa` for focused browser evidence. Existing screenshot baselines represent the implemented demo, not proof of pixel identity with Figma.
