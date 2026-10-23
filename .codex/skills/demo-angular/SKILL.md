---
name: demo-angular
description: "Build or refactor this demo's Angular features, reusable @demo/ui controls, typed forms, signal Store/Facade architecture or Storybook stories. Use for application and component implementation, not standalone visual review."
---

# Demo Angular development

Resolve project paths from the repository root, three levels above this skill directory. Read `AGENTS.md`, `package.json`, the relevant source and nearby stories before changing APIs. The current workspace is Angular 20; do not infer an older framework version from outside examples.

## Implementation boundaries

- Application and form orchestration: `projects/demo/src/app/app.component.*`.
- Domain types and deterministic sample data: `projects/demo/src/app/transactions/transaction.model.ts` and `transaction.seed.ts`.
- Local async data boundary: `transaction-api.service.ts`. It is deliberately in-memory; preserve reset-on-refresh behaviour unless persistence is requested.
- State, effects and computed filtering/sorting/pagination: `transaction.store.ts`. Keep its latest-request guard, immutable updates and read-only mutation checks when changing data loading or writes.
- Page-facing contract: `transaction.facade.ts`. The page invokes the Facade; it should not reach into the Store or API.
- Presentational controls: `projects/demo-ui/src/lib/`, exported through `projects/demo-ui/src/public-api.ts`. They take typed inputs and emit intent; they do not inject application stores, facades or API services.

Use standalone Angular, signal inputs/outputs and typed reactive forms. Keep component templates separate when they are substantial. Derive view state instead of maintaining duplicate mutable values. Reuse existing native-control directives and library components before adding another abstraction. Keep the demo English-only unless localization is requested.

Keep a user's form values after a recoverable save failure. Do not confuse read-only with disabled text inputs; native selects have no readonly attribute, so the details view disables its status select. Treat date-only values as calendar dates: the table normalizes them to UTC midnight before formatting, preventing timezone-dependent shifts.

For a visual implementation, apply `demo-design-system` and `demo-accessibility` to the affected surface. Keep UI strings about the user's task; diagnostic state controls belong in the existing Demo scenarios section.

## Stories and verification

For a new public component or changed contract, update the appropriate `*.stories.ts`, exports and component reference at `.codex/skills/demo-design-system/references/components.md`. Demonstrate relevant default, loading, disabled, error or read-only states independently of application services. Do not duplicate every state for controls that do not support it.

For library changes run `npm run build:ui`; for application integration run `npm run build`. Build Storybook when changing stories or component rendering, then use `demo-browser-qa` for the affected browser scenarios. Report changed behaviour and actual verification results; do not re-run unrelated suites for prose-only edits.
