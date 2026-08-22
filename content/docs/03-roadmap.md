# Working roadmap

This roadmap is organized around reducing product risk, not estimating dates.

## Phase 0 — Definition and validation

Goal: prove that the product has a sharp audience, promise, and workflow.

- Interview several agency developers and client-facing implementers.
- Collect examples of client confusion, training materials, and support requests.
- Identify the five most common client editing jobs.
- Define the first six to ten purpose-driven modules.
- Prototype the editing interaction without building the SaaS.
- Test whether clients understand visible boundaries, variant selection, autosave, and publishing.
- Establish what “client confidence” and “agency leverage” mean measurably.

Exit evidence:

- Agencies say they would build a real client site with the constrained system.
- Clients complete common changes without Gutenberg training.
- The supported/unsupported content boundary feels acceptable.

## Phase 1 — Single-site technical proof

Goal: validate the hardest local-runtime mechanics on one deliberately built WordPress site.

- WPs edit-mode toggle on the real front end
- Stable mapping between supported modules and stored content
- Inline text, link, and image editing
- Move, duplicate, remove, and insert
- Keyboard-accessible page outline and movement
- Developer-registered design variants
- Authoritative server-rendered previews
- Autosaves and deliberate publication
- Revisions and conflict detection
- Initial validation rules
- Original-editor fallback

Explicitly out of scope:

- SaaS control plane
- Arbitrary themes and page builders
- Full-site template editing
- Navigation editing
- Ecommerce
- Multilingual support
- AI page generation

## Phase 2 — Agency kit

Goal: let an agency use WPs repeatedly without a central SaaS.

- Documented module schema
- Starter design adapter
- CLI or scaffolding tools
- Fixtures and visual previews
- Module validation and tests
- Permission presets
- Exportable project configuration
- Upgrade and migration format
- Developer documentation site

## Phase 3 — WPs Studio alpha

Goal: add cross-project leverage for a small design-partner group.

- Organizations, teams, clients, and projects
- Secure site connection
- Project blueprint registry
- Versioned module and design-adapter releases
- Project policy synchronization
- Site compatibility and update status
- Activity history
- Generated client and developer documentation
- Staging-to-production approval workflow

The site must continue rendering if WPs Studio is unavailable.

## Phase 4 — Client operations

Goal: make WPs valuable throughout the client relationship.

- Reusable content entity management
- Shared-content scope controls
- Navigation workflow
- Asset governance
- Client invitations and role templates
- Approval and scheduled publication
- Cross-site health reporting
- Structured onboarding and handoff

## Phase 5 — Agent-assisted production

Goal: allow authorized agents to accelerate production through the same constrained system used by people.

- Machine-readable module catalog
- Scoped agent credentials
- Read and write abilities with explicit annotations
- Page-plan generation
- Structured content creation
- Variant recommendations
- Validation and preview tools
- Reviewable changesets
- Human approval policies
- Complete agent activity log

## Candidate MVP modules

- Hero
- Rich text
- Media with text
- Call to action
- Testimonial collection
- FAQ
- Services or features
- Logo collection
- Contact details
- Simple card collection

The final list should follow evidence from actual client sites, not generic block-library completeness.

## Candidate validation metrics

- Time for a client to make and publish a routine content change
- Number of clarification requests during a task
- Number of accidental design or layout changes
- Client-reported confidence before and after using WPs
- Training time per client
- Agency support time after launch
- Module reuse across projects
- Frequency of original-editor escape-hatch use

