# Angular Transactions

A small Angular application with a reusable `@demo/ui` component library, semantic design tokens, Storybook, and Playwright tests. The transaction page supports search, filtering, sorting, pagination, add/edit/view forms, and deletion.

## Requirements and setup

Node.js 22.12+ (Node 22 LTS recommended), npm, and Google Chrome.

```sh
npm ci
npm start
# http://127.0.0.1:4200
```

Start Storybook in a second terminal:

```sh
npm run storybook
# http://127.0.0.1:6006
```

## Architecture

- `projects/demo/src/app/transactions/`: domain types, deterministic fixtures, async in-memory API, signal Store, and page-facing Facade.
- `projects/demo/src/app/app.component.*`: page and typed form orchestration.
- `projects/demo-ui/src/lib/`: presentational components, native-control directives, and stories.
- `projects/demo-ui/src/styles/`: semantic tokens and shared component styles.
- `.codex/skills/`: project-specific Angular, design-system, accessibility, and browser QA guidance. `.agents/skills/` contains discovery links.

The page calls the Facade; the Store owns state and derived data. UI library components receive typed inputs and emit events without depending on application state or API services.

Read the [design mapping](docs/design-mapping.md) and [component contracts](docs/components.md).

## Build and test

```sh
npm run build:ui
npm run build
npm run build:storybook
npm run test:e2e
npm run test:stories
npm run report
```

`test:stories` uses the static Storybook build. Playwright starts local servers as needed and uses installed Chrome by default. To use Playwright-managed Chromium, run `npx playwright install chromium` and set `PW_CHANNEL=chromium` when running tests.

The tests cover transaction journeys, validation, failure recovery, keyboard focus, axe accessibility scans, component states, and desktop/mobile screenshots. Automated accessibility checks do not establish full WCAG conformance.

```sh
npm run test:visual
npm run demo:visual-diff
```

`demo:visual-diff` injects a brand-token change inside the test browser and succeeds only when Playwright detects a screenshot mismatch and creates a diff. It leaves source files and baselines unchanged. Generated reports remain local and are excluded from Git.

Screenshot baselines are under `tests/baselines/`. Browser, font, and platform changes can affect screenshots. Review differences before intentionally updating them with `npm run test:visual:update`. These baselines compare the application against its approved screenshots, rather than comparing directly with Figma.

## Component states and scope

Storybook includes Button, Form field, Select, Status badge, Dialog, and Transaction table. The page's **Demo scenarios** controls expose empty, loading, failed-load, failed-save, and read-only states. Forms preserve input after a recoverable save failure. Dialogs support keyboard focus containment and restoration.

This sample has one light theme and 24 deterministic records. The API is in-memory; all changes reset on refresh. There is no backend, authentication, payment processing, or persistent database. Figma Code Connect is not configured.

## Design attribution

Design and local SVG icons adapted from **Flowbite Design System by Themesberg**, from the free [Figma Community kit](https://www.figma.com/community/file/1179442320711977498), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Adaptations include working filters and pagination, 24 sample records, bulk deletion, accessible labels and focus handling, responsive scrolling, a page title, and an original transaction form. Inter is bundled locally through `@fontsource/inter`. See [third-party notices](THIRD_PARTY_NOTICES.md).
