# System concept and architecture

## Recommended direction

Build WPs as a hybrid system:

- A WordPress plugin provides the local runtime and client editor.
- WordPress remains the authoritative content and public rendering engine.
- A SaaS control plane coordinates agency projects, reusable systems, teams, releases, documentation, and agents.
- Themes or design adapters implement approved presentation variants.

This is intentionally not a conventional headless architecture.

## System boundaries

### WPs Studio

The agency-facing SaaS may eventually provide:

- Organizations, teams, clients, and projects
- Site connection and environment management
- Project blueprints
- Module catalog management
- Design tokens and variant configuration
- Versioned releases and migrations
- Permission policy templates
- Documentation publishing
- Staging, review, and approval workflows
- Agent connections, scoped credentials, and activity logs
- Cross-site reporting

### WPs Runtime

The WordPress plugin is responsible for:

- Registering modules and their schemas
- Rendering or coordinating module rendering
- Providing the front-end edit-mode shell
- Mapping rendered elements to the underlying content model
- Fetching and saving WordPress entities
- Capabilities, nonces, autosaves, revisions, and locking
- Validating content and composition
- Enforcing locally cached project policy
- Synchronizing eligible configuration with WPs Studio
- Falling back safely if WPs Studio is unreachable

### Design adapter

A theme or companion integration package is responsible for:

- Global design tokens
- Approved module variants
- Module stylesheets
- Responsive implementation
- Presentation previews and labels
- Any site-specific module extensions

The plugin should define the contract. The design adapter should fulfill it.

### Client editor

The client editor runs only for authorized logged-in users. It should provide:

- An edit-mode toggle
- Persistent editable boundaries
- Inline text, link, and media editing
- Insert, move, duplicate, remove, and configure actions
- Keyboard equivalents for spatial actions
- A page outline
- A controlled module library
- Provisional variant previews
- Save status, undo, validation, and publish controls

## Content model

Do not treat every concept as the same kind of block.

### Content entities

Reusable domain information such as testimonials, people, services, locations, events, or products.

Likely WordPress representation: custom post types, taxonomies, and registered metadata.

### Page modules

Purposeful ways to place content on a page: testimonial collection, team grid, service introduction, call to action, FAQ, hero, or rich narrative.

Likely WordPress representation: custom blocks, preferably dynamically rendered when that improves consistency and migration safety.

### Design variants

Approved presentations of a page module: editorial, split, compact, centered, dark, image-led, and similar intentional choices.

Likely representation: registered block styles or variations, `theme.json`, per-block stylesheets, plus WPs-specific metadata for controls and previews.

### Composition rules

Rules describing where a module may appear, allowed nesting, quantity limits, required content, and relationships to the page or template.

Likely representation: a WPs schema interpreted by both the WordPress runtime and WPs Studio.

## Editing model

The rendered DOM is a view, not the source of truth.

1. WordPress loads and renders the page normally.
2. For authorized editors, WPs annotates supported rendered modules with identifiers and metadata.
3. The edit-mode application loads the underlying block/entity model.
4. Inline actions update that model and immediately update the visible page.
5. Dynamic or complex module previews are requested from WordPress’s authoritative renderer.
6. WPs serializes and validates the complete content model before saving.

Do not scrape arbitrary edited DOM back into `post_content`. That would be fragile and would risk invalid block serialization.

## Saving and publishing

“Saved” and “public” must be different states.

1. Edits update local state.
2. WPs periodically creates an authenticated autosave.
3. The working version is reflected in the editor immediately.
4. Validation runs continuously and before publication.
5. “Publish changes” updates the public entity atomically.
6. WordPress creates a revision.

Concurrency protection should include WordPress post locks plus a base revision or content hash checked by the save endpoint.

## Compatibility policy

Every rendered item belongs to one of three categories:

1. **Fully supported** — complete WPs editing.
2. **Recognized but limited** — safe basic actions or guided conversion.
3. **Unsupported** — visible but locked, with an explicit route to the original editor where appropriate.

The initial product should not claim compatibility with arbitrary page builders or third-party block behavior.

## Developer experience

The developer platform should eventually make the following workflow straightforward:

1. Define a module’s purpose and schema.
2. Define semantic server-rendered markup.
3. Register editable content fields.
4. Register design variants and their constraints.
5. Add responsive styles using shared tokens.
6. Provide previews or fixtures.
7. Run accessibility, schema, rendering, and migration tests.
8. Publish a versioned module to an organization or project.

A module package may eventually contain:

```text
testimonial-collection/
├── module.json
├── block.json
├── render.php
├── variants/
├── styles/
├── fixtures/
├── migrations/
├── tests/
└── README.md
```

## Agent interface

“Connect your LLM agent” is promising if the agent uses WPs as a constrained production API—not as a free-form page builder.

An agent should be able to:

- Discover available modules and variants
- Inspect content schemas and composition rules
- Create structured content entities
- Assemble a page from allowed modules
- Propose copy, metadata, alt text, and internal links
- Request previews
- Run validation
- Create a reviewable revision or changeset

An agent should not silently:

- Invent arbitrary CSS or markup
- Broaden its own permissions
- Publish without explicit policy authorization
- Bypass accessibility or schema validation
- Modify unsupported plugin data
- Destroy the last recoverable revision

Every agent action should be attributable, scoped, reviewable, and reversible. Human and agent clients should ultimately use the same underlying abilities and validation rules.

## Technical scenarios

### Scenario A — Front-end overlay on WordPress rendering

**Recommended.** Best match for true front-end editing and preservation of the WordPress ecosystem.

Primary challenge: accurately mapping nested rendered modules to editable models while isolating the editor UI from theme CSS.

### Scenario B — Custom WPs editor inside wp-admin

Useful for content browsing, new-page composition, settings, and as an alternative accessibility mode. It can reuse public `@wordpress/*` data and editor packages without copying Gutenberg’s application interface.

Primary challenge: keeping the editing preview fully faithful to the public theme.

### Scenario C — Headless WordPress

Not recommended for the first product. It increases deployment, authentication, preview, plugin-compatibility, and rendering-parity work while weakening the “edit the actual site” advantage.

It can remain a future adapter if an agency deliberately chooses a headless project.

## Non-negotiable quality areas

- Capability and CSRF enforcement
- Autosaves, revisions, undo, and conflict handling
- Keyboard and screen-reader access to every editing action
- Semantic output and page-level heading validation
- No editor payload for ordinary visitors
- Safe behavior when disconnected from the SaaS
- Versioned module schemas and migrations
- Explicit editing scope for shared content: “this instance” versus “everywhere”

