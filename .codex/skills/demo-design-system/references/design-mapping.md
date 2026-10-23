# Design source and token mapping

Figma Community source: [Flowbite Design System by Themesberg](https://www.figma.com/community/file/1179442320711977498), transaction-table design on the Tables page.

The implementation was based on `get_design_context` and its screenshot, not a screenshot used as a code asset. Angular templates replace the reference tool's React output. The returned icon assets are local SVG files in public/icons, with their native root dimensions retained. Inter is bundled locally via @fontsource/inter, so runtime does not depend on external font or Figma URLs.

| Figma token | Demo token | Value |
|---|---|---|
| colors/background/bg-neutral-secondary-soft | --ui-surface | #f9fafb |
| colors/background/bg-neutral-primary-soft | --ui-canvas | #fff |
| colors/background/bg-brand | --ui-brand | #1447e6 |
| colors/text/text-heading | --ui-text | #101828 |
| colors/text/text-body | --ui-body | #4a5565 |
| colors/text/text-body-subtle | --ui-muted | #6a7282 |
| colors/border/border-default | --ui-border | #e5e7eb |
| colors/background/bg-danger | --ui-danger | #c70036 |
| colors/background/bg-success-soft | --ui-success-bg | #ecfdf5 |
| colors/background/bg-success-strong | --ui-success-text | #006045 |
| colors/border/border-success-subtle | --ui-success-border | #a4f4cf |
| colors/background/bg-warning-soft | --ui-warning-bg | #fff8f1 |
| colors/text/text-fg-warning | --ui-warning-text | #771d1d |
| colors/border/border-warning-subtle | --ui-warning-border | #fcd9bd |
| colors/background/bg-danger-soft | --ui-danger-bg | #fef0f2 |
| colors/text/text-fg-danger-strong | --ui-danger-text | #8b0836 |
| colors/border/border-danger-subtle | --ui-danger-border | #ffccd3 |
| border/border-radius/rounded-base | --ui-radius-base | 12px |
| border/border-radius/rounded-sm | --ui-radius-sm | 6px |
| spacing/1 through spacing/8 | --ui-space-* | 4px steps |
| typography/font-family/font-base | --ui-font | Inter |

Tailwind theme aliases reference the same CSS token layer; the UI library owns reusable component rules. Focus rings and hover treatments supplement the frame's static state. They are documented demo choices, not additional tokens extracted from Figma.

## Visual acceptance

Keep table spacing, typography, colors, native icon dimensions, badges and action alignment close to the reference. Functional adaptations are listed in README. The add/edit dialog and state screens are original compositions using those foundations. Screenshots of the implemented app establish a reviewed regression baseline. They do not establish pixel identity with the Figma frame.

Snapshot comparisons allow at most 50 changed pixels after the default per-pixel color threshold; baseline changes require explicit review.
