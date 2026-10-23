# Component contracts

The library is built independently with `npm run build:ui` and exposed through `projects/demo-ui/src/public-api.ts`.

| Component / directive | Contract | States / semantics |
|---|---|---|
| button[uiButton] | variant: primary/secondary/danger; size; disabled; loading | Native button, disabled while busy, aria-busy; consumer owns type and label |
| input/select/textarea[uiControl] | Native forms contract and shared style | Keeps native keyboard operation, readonly/disabled, labels and errors |
| ui-field | controlId, label, required, hint, error | Visible label associated by id; consumers connect aria-describedby to hint/error |
| ui-badge | status: Completed/In progress/Failed | Text plus semantic color; no color-only meaning |
| ui-icon | name of a local SVG | Decorative, hidden from assistive technology; native root dimensions |
| ui-dialog | heading, dialogId, optional fallbackFocusId; open()/close(); dismissed output | Native showModal, focus containment, Escape, explicit return focus |
| ui-transaction-table | typed rows, selection, sorting, readOnly; view/edit/remove/selection/sort outputs | Semantic table, caption, labelled scroll region, sortable headers and accessible action controls |
| ui-table-state | kind, heading, description, optional action label/output | Loading/empty/error; failures announced as alerts |

A plain select demonstrates status choices; there is no custom listbox to maintain. Status is disabled in the read-only details form because native select has no readonly attribute. Text/date/amount remain readable, focusable native readonly controls.

A small table-specific interface avoids premature generic-grid abstractions. No component in the UI library injects an API service, domain Store or Facade.
