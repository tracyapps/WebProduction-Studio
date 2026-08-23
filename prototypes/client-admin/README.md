# Client admin prototype — version 1

This prototype explores the client-facing editing model for WebProduction Studio (WPS).

## Research focus

- Can clients understand the page map without WordPress terminology?
- Does separating **Content** from **Design** reduce cognitive load?
- Does a bounded section editor with Content and Design in its header feel predictable?
- Is the live preview useful when visible and easy to ignore when hidden?
- Does the neutral whole-page preview make the focused section treatment easier to understand?
- Are duplicate, delete, and manual positioning discoverable without crowding the primary editor?
- Are saving a draft and publishing clearly different actions?

## Version log

### Version 1 — baseline interaction model

- A connected page map selects and reorders purpose-driven sections.
- Selecting the active section again—or choosing **View whole page**—clears the selection and removes the preview highlight treatment.
- The selected section's Content and Design controls share one persistent card with a named header.
- Secondary section actions live in the header's more menu.
- The live preview and application theme can be toggled independently.

Future iterations and alternate research directions should be added to `/prototypes` as separate versions or variations instead of replacing this record.

## Prototype boundaries

All data is temporary browser state. The prototype does not connect to WordPress, authenticate users, or persist changes after a refresh.

## Route

`/prototypes/client-admin`
