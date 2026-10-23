---
name: demo-accessibility
description: "Implement or review accessibility in this demo's Angular forms, dialogs, table actions, status messages and responsive UI. Use when an interactive control or visible UI behaviour changes, or for a requested accessibility review."
---

# Demo accessibility

Read the affected template and native/library control implementation. Reuse their semantics and focus handling rather than inventing parallel ARIA controls. Project paths below are relative to the repository root.

## Apply the relevant contracts

- Preserve persistent labels in `ui-field`; consumers link hint/error ids through `aria-describedby` and expose invalid/required state. On failed form submission, focus the first invalid field. Keep recoverable values and errors visible.
- Keep native button, input, select and table semantics. Label icon-only actions, checkboxes and pagination. Sortable headers expose `aria-sort`; status badges retain text as well as color.
- `ui-dialog` uses `showModal`, explicit Tab/Shift+Tab containment and Escape handling. Return focus to a durable action trigger. If deletion removes or disables that trigger, use the provided `fallbackFocusId`. Check all exit paths when changing overlays.
- In a read-only view, keep readable text/date/amount fields readonly and disable the select; browsing remains possible. Guard mutations in state as well as visually disabling buttons.
- Keep meaningful async state announcements without repeating every render. The app owns loading/result and success live regions; failure states expose alerts.
- Preserve visible focus, sufficient contrast, non-color state cues and local font loading. The wide data table may scroll inside its named keyboard-focusable region; the document and form should reflow at 320px and 390px. Respect reduced motion.

## Verify the changed interaction

Use keyboard-only traversal for the changed controls, including reverse Tab, activation, dismissal and focus restoration. Trigger applicable validation, loading, empty, failure and read-only states. Inspect accessible names and state in the browser accessibility tree. Check narrow layout and zoom/reflow where relevant.

Use the focused Playwright journeys and axe scans described in `demo-browser-qa`. Automated scans do not establish full WCAG conformance or a live screen-reader result. Record any untested assistive-technology dimension explicitly.
