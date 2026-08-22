# Product vision

## Origin

WebProduction Studio (WPS) grows from long experience building WordPress sites, contributing to WordPress, and training clients to manage the sites delivered to them.

The recurring observation is that most clients do not want unlimited design power. They want to change information, publish updates, create pages that remain on-brand, and understand what will happen when they click a control. Existing WordPress editing experiences frequently give them too much responsibility while making basic actions difficult to discover.

This is not primarily a problem of visual polish. It is a mismatch of roles.

## The problem

The ordinary client is asked to reason about matters that belong to a designer or developer:

- Layout systems
- Responsive behavior
- Spacing scales
- Heading hierarchy
- Color and typography
- Accessibility
- Performance
- Reuse and synchronization semantics
- The distinctions between blocks, patterns, synced patterns, templates, and template parts

The result is predictable:

- Clients are afraid of breaking the site.
- Agencies over-document simple update tasks.
- Clients request avoidable maintenance work.
- Page builders weaken the separation between content and design.
- Design systems decay one local override at a time.
- Semantic and accessible HTML can be damaged by visual choices.

## The opportunity

Build a professional website-production system that makes the agency’s intent executable.

The agency defines:

- What kinds of content exist
- Which page modules are available
- Which modules may appear in which contexts
- Which content fields are editable
- Which design variants are approved
- Which responsive and accessibility rules are invariant
- What a client role may change

The client experiences:

- The actual website
- Obvious editable boundaries
- Plain-language actions
- Predictable content controls
- A small number of meaningful visual choices
- Safe previews
- Autosaved work
- A clear publish action
- Undo and revision recovery
- Confidence

## Target customer

### Primary buyer

An experienced freelancer, agency, or development studio that:

- Builds multiple client websites
- Values structured content and design systems
- Wants faster, more reliable production
- Provides client training or ongoing support
- Is frustrated by the Gutenberg and page-builder editing experience
- Accepts an opinionated build system in exchange for consistency and leverage

### Primary end user

A client content manager or small-business owner who needs to keep a site current but is not a web designer or developer.

### Important secondary user

The agency team member who assembles pages and populates content without needing to modify the underlying module implementation.

## Value propositions

### For agencies and developers

- Create client sites from a reusable, documented production system.
- Encode design and implementation standards once.
- Reduce training, support, regressions, and accidental redesign.
- Reuse modules without forcing every site to look identical.
- Give clients a visibly better handoff experience.
- Use structured agent assistance without letting an LLM invent arbitrary markup or styles.

### For clients

- Edit the real site instead of interpreting an abstract backend canvas.
- See exactly what can be changed.
- Change content without understanding WordPress internals.
- Add pages and sections that remain on-brand.
- Preview safely and publish deliberately.
- Recover from mistakes.

## Product principles

1. **Meaning before appearance.** Modules are defined by purpose and content, not by generic visual containers.
2. **Constraints create confidence.** Removing irrelevant choices is a primary feature.
3. **The visible site is the editing context.** Preview should not be a loose approximation of the front end.
4. **Clients manage content; professionals govern the system.** Permissions extend to types of change, not only access to screens.
5. **Use WordPress as infrastructure.** Preserve its content, media, user, permission, revision, and rendering capabilities.
6. **No invisible interaction model.** Editable boundaries and available actions remain discoverable while editing.
7. **Accessibility is structural.** It cannot be an optional audit after arbitrary composition.
8. **Escape hatches are explicit.** Unsupported content may open in its original editor rather than pretending to be safely editable.
9. **Human and agent actions use the same rules.** An LLM must operate through defined schemas, capabilities, validation, and revisions.
10. **Portability matters.** Deactivating the SaaS connection must not erase public content or make the site unavailable.

## Positioning

Avoid leading with “better WordPress,” which invites a universal comparison and an impossible compatibility promise.

Working positioning:

> WPS is the professional production system for building WordPress sites clients can actually manage.

Working client-facing promise:

> Edit your actual website without accidentally redesigning it.

## Why this can become SaaS

The editing plugin solves the local site problem. Agencies gain compounding value when the system also coordinates work across sites:

- Project creation and provisioning
- Reusable blueprints
- Module and design-system versioning
- Site health and compatibility status
- Team roles
- Client access policies
- Shared asset and content libraries
- Documentation generated from each site’s configuration
- Updates and migrations
- Staging and approval workflows
- Agent credentials and action logs
- Portfolio-wide governance

The SaaS should add coordination and leverage. The WordPress site must remain capable of rendering and serving its content without a continuous SaaS dependency.
