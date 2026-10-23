---
name: demo-browser-qa
description: "Verify this demo in a real browser using its Playwright journeys, axe scans, Storybook checks and screenshot baselines. Use after meaningful UI/behaviour changes or when reviewing test results."
---

# Demo browser QA

Run commands from the project root, three levels above this skill directory. Check `package.json` and both Playwright configs before choosing commands or ports. This workflow targets local sample data; it does not authorize external application actions.

## Choose focused checks

| Change / purpose | Command |
|---|---|
| Application user journeys, axe scans and screenshots | `npm run test:e2e` (or pass a spec / `-g` filter) |
| Screenshot comparisons only | `npm run test:visual` |
| Storybook rendering or state changes | `npm run build:storybook`, then `npm run test:stories` |
| Demonstrate a detected visual regression | `npm run demo:visual-diff` |
| View app results | `npm run report` |

The app server is `127.0.0.1:4200`; Storybook is `127.0.0.1:6006`. Check an existing server's identity before reuse, especially after moving this workspace. Do not test an outdated copy. Tests use installed Chrome by default; `PW_CHANNEL=chromium` requires a Playwright-managed Chromium install. Browser launch permission failures are infrastructure failures, not application regressions.

## Evidence and screenshot discipline

- App tests: `tests/`, artifacts in `test-results/`, reports in `reports/playwright`, `reports/results.json` and `reports/junit.xml`.
- Story tests: `story-tests/`, artifacts in `story-test-results/`, report in `reports/storybook`. Keep output directories separate so one run cannot delete another run's traces.
- Baselines: `tests/baselines/`. Wait for data and fonts; preserve deterministic sample records, viewport, locale and timezone. Inspect missing or mismatched screenshots before deciding whether implementation or baseline is wrong.
- Normal screenshots allow 50 changed pixels. Do not loosen the threshold or regenerate snapshots merely to make a failure pass. For an intentional design change, visually review it before using `npm run test:visual:update`, then verify with comparisons enabled.
- `demo:visual-diff` changes the brand token only inside a test browser, succeeds only on an actual mismatch with a diff attachment, and writes `reports/visual-diff/` and `reports/visual-diff-report.json`. Its deliberately failed comparison is demonstration evidence, not the regular suite result.

Inspect the rendered desktop and narrow layouts, interaction results, console errors and non-empty local images; do not infer success from compilation alone. Use `demo-accessibility` for keyboard/focus checks. Preserve existing reports as historical evidence unless deliberately running new checks. Report the actual run date and results when delivering fresh evidence.

Keep environment workarounds scoped: Angular disk caching is disabled after a local native-cache crash, and Webpack is pinned for Storybook. Diagnose before changing versions or weakening tests. No app test rerun is needed for a skill/document-only edit.
