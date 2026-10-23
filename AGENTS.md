# Transactions demo project guidance

Keep this demonstration small: a Transactions page, reusable Angular UI library, Storybook, deterministic local data and focused test evidence. No production services, private code, credentials or external actions are needed.

## Use the matching skills

Read only the skills relevant to the requested change. Canonical instructions live in `.codex/skills/`; `.agents/skills/` contains relative discovery links to the same folders.

| Work | Skill |
|---|---|
| Figma translation, layout, tokens, component reuse or visual review | [.codex/skills/demo-design-system/SKILL.md](.codex/skills/demo-design-system/SKILL.md) |
| Angular features, library controls, typed forms, Store/Facade or stories | [.codex/skills/demo-angular/SKILL.md](.codex/skills/demo-angular/SKILL.md) |
| Interactive UI, forms, dialogs, status announcements or accessibility review | [.codex/skills/demo-accessibility/SKILL.md](.codex/skills/demo-accessibility/SKILL.md) |
| Browser verification, screenshot comparisons or demonstration evidence | [.codex/skills/demo-browser-qa/SKILL.md](.codex/skills/demo-browser-qa/SKILL.md) |

The live source and package scripts own exact APIs and commands. Preserve Page → Facade → Store → local API separation and presentational `@demo/ui` components. A screenshot baseline change is a reviewed design decision, not a shortcut around a regression.
