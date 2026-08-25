# Front-end page editor — version 1

This prototype explores the client-facing editing model for WebProduction Studio (WPS), grounded directly in [`02-system-concept.md`](../../content/docs/02-system-concept.md)'s recommended architecture (Scenario A — a front-end overlay on WordPress rendering) rather than in the existing `client-admin` prototype. It intentionally does not reuse that prototype's split "page map / editor card / site preview" layout. Instead, both versions here treat the rendered page itself as the editing surface, per product principle 3: *"The visible site is the editing context. Preview should not be a loose approximation of the front end."*

Both variations render the same fictional "Acme Co." home page, with the same starting content used in `client-admin`, so a research participant's reaction is about the interaction model, not unfamiliar content.

## Research focus

These two variations exist to test two open questions from [`05-open-questions.md`](../../content/docs/05-open-questions.md) directly against each other:

- **"Is the page outline always visible or available on demand?"** — Inline canvas keeps it off by default and summons it on demand; Guided outline keeps it visible at all times.
- **"Does the settings experience literally 'flip' a module, open a panel, zoom into it, or use another spatial model?"** — Inline canvas edits text directly in place and applies design choices immediately, with no separate confirm step; Guided outline edits through a panel anchored to the selected section, with design changes previewed as a draft and requiring an explicit "Apply."

Also of interest:

- Do participants notice and understand the "Navigation is managed separately" lock affordance on the site header — does an explicit, discoverable boundary around unsupported content feel honest, or does it feel like a limitation?
- Which variation feels faster for a single content edit? Which feels safer for a design change?
- Does an always-visible outline help orientation, or does it just add visual noise once a participant is focused on one section?
- Does an anchored, pointer-connected panel read as "part of the page," or does it still feel like a separate settings surface?

## Version 1 — two competing interaction models

### Inline canvas (`/prototypes/front-end-editor/inline-canvas`)

- No outline is shown until requested; a toolbar button opens it as an on-demand overlay.
- Selecting a section shows a small floating toolbar pinned to that section's corner: edit text, change design, move up/down, duplicate, delete.
- "Edit text" turns the section's own heading, body, and (for Services) card copy into live editable fields, in place — there is no separate content form.
- "Change design" opens a compact popover anchored to the section. Layout and background choices apply to the page immediately; there is no separate confirm step.
- Removing a section can be undone from the confirmation toast.
- New sections are inserted through a "+" affordance that appears between sections on hover.

### Guided outline (`/prototypes/front-end-editor/guided-outline`)

- A page outline rail is always visible on the left, with reordering controls next to each row.
- Selecting a section opens a panel anchored beside it (positioned to track the section as the page reflows), with a small pointer connecting it to the section.
- Content and Design live in the same panel under a tab switch, mirroring `client-admin`'s Content/Design split — but anchored in context rather than living in a fixed, separate column.
- Design choices preview live on the page as a draft; the panel's Apply/Cancel controls make committing (or discarding) that preview a deliberate step.
- New sections are added from a button at the bottom of the outline rail.

### Shared behavior

- Both variations use the same Editing/Previewing toggle in the top bar — switching to Previewing removes all editing chrome and shows exactly what a visitor would see, satisfying the "WPS edit-mode toggle on the real front end" requirement from the roadmap.
- Both distinguish autosaved drafts from publishing: the save-status indicator updates continuously, and "Publish" is a separate, deliberate action.
- Both keep the page's own navigation visibly present but locked, rather than hiding it — matching the Phase 1 scope decision that navigation editing is explicitly out of scope for the first technical proof.

## Prototype boundaries

- All data is temporary in-memory browser state. Nothing connects to WordPress, authenticates a user, or persists after a refresh.
- Editing is scoped to whole-section heading and body copy, plus the three Services cards' titles and descriptions. Adding, removing, or reordering individual Services cards is out of scope for this round, to keep the comparison focused on the page-level interaction model.
- Design variants are only meaningfully different for the Services section (layout) and as a background treatment (all sections) — reflecting that different module types are expected to expose different variant sets, not a uniform set of controls.
- Newly inserted sections (FAQ, Text and image) render as a simple placeholder rather than a fully designed module.

## Route

- `/prototypes/front-end-editor/inline-canvas`
- `/prototypes/front-end-editor/guided-outline`
