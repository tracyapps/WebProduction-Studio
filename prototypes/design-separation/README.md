# Design separation — version 1

A third research round for the WPS client editor, sitting on one deliberate
axis: **how much of the site's design leaks into the content editing surface.**

The two earlier families compared *where* editing happens (`client-admin`'s
split workspace and the `front-end-editor` on-page overlays). This round holds
the editing location steady and moves design exposure instead, so we can find
the point where a non-technical client feels safe and capable without mistaking
the editor for the finished page.

All three prototypes render the same fictional "Acme Co." home page with the
same starting content as the earlier prototypes, so a participant's reaction is
about the interaction model, never the copy.

## Research focus

- Does removing design entirely (Clean Slate) feel empowering, or does it feel
  like the client has lost control?
- Do purpose-framed choices ("what job does this section do?") communicate
  design outcomes better than technical names like "Light / Brand / Dark"?
- Can a client tell "I am editing content" from "I am editing the design" when
  the divide is explicit and gated (Layered Canvas)?
- Where is the sweet spot: no design, design as intent, or design behind a
  deliberate mode?
- Do the "user setting, not assumption" defaults (outline on/off, canvas on/off,
  preview on demand) change how comfortable a first-time client feels?

## The three prototypes

### Clean Slate (`/prototypes/clean-slate`)

Maximum separation. Content is a plain, document-like list of purpose-labelled
blocks; there are no design controls at all. A persistent note states that
design, layout, and accessibility belong to the studio. The finished site opens
only in a deliberate, read-only preview.

### Purpose Blocks (`/prototypes/purpose-blocks`)

Design offered only as intent. Each section exposes a small, curated set of
"this section's job" choices with abstract previews and plain-language weight
labels. Content stays primary, and a per-section peek shows the look on demand —
never a full WYSIWYG page. Blocks that need no choices say so.

### Layered Canvas (`/prototypes/layered-canvas`)

A hard divide between two modes. Content mode locks the look entirely; design
lives in a separate, explicitly entered workspace behind a confirmation that
explains what changes and what cannot. Design edits preview as a draft and are
applied deliberately. An optional read-only canvas shows the real site as you
work, off by default.

## Prototype boundaries

- All data is temporary browser state. Nothing connects to WordPress,
  authenticates a user, or persists beyond `localStorage`-held preferences.
- Each prototype is a self-contained static document under
  `public/prototypes/design-separation/`. The Next routes wrap it in a
  full-viewport frame so the prototype (React 18 UMD) stays isolated from the
  site (React 19), and can be replaced or re-exported without touching site code.
- Content is shared in `wps-content.js`; editing it updates all three variants.

## Routes

- `/prototypes/clean-slate`
- `/prototypes/purpose-blocks`
- `/prototypes/layered-canvas`

Static originals and a standalone catalog live at
`/prototypes/design-separation/` (for example
`/prototypes/design-separation/layered-canvas-editor.html`).

## Checks

`npm run validate:prototypes` verifies HTML structure and exercises the shared
renderer for every section kind and every purpose × treatment combination.
