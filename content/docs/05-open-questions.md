# Open questions

These questions are preserved so enthusiasm does not silently turn hypotheses into architecture.

## Product and market

- Is the first product sold per agency, per site, per client, or through a combined model?
- What is the smallest outcome an agency would pay for before the WPS hosted service exists?
- Is the initial wedge client editing, repeatable site production, or the combination?
- Which agency segment feels the pain most acutely?
- Which existing tools would an agency replace, and which would WPS integrate with?
- How much opinionation will agencies welcome before they feel constrained themselves?
- Is “WordPress” central to the long-term brand or merely the first runtime?

## User experience

- What should the user-facing name be for a purpose-driven page module?
- How are global/shared changes distinguished from page-local changes without WordPress jargon?
- Does the settings experience literally “flip” a module, open a panel, zoom into it, or use another spatial model?
- How does a user create a new page without confronting templates and patterns?
- What does the client see when part of a page is unsupported?
- How should draft, autosaved, approved, scheduled, and published states be explained?
- Is the page outline always visible or available on demand?
- What is the best mobile editing experience?

## Content architecture

- Which concepts should be reusable content entities versus page modules?
- Should custom modules primarily use dynamic PHP rendering?
- How are stable identifiers added without polluting portable content?
- What is the migration strategy when a module schema changes?
- How should module dependencies be declared and versioned?
- How much of the WPS schema should build directly on `block.json` and `theme.json`?
- How should WordPress patterns and pattern overrides be used without exposing their terminology?

## WordPress integration

- What minimum WordPress and PHP versions should the first release support?
- Which public `@wordpress/*` packages are stable enough to depend on?
- How will edit-mode UI remain isolated from arbitrary theme CSS and JavaScript?
- Can normal Core blocks participate safely, or should the first proof use only WPS modules?
- How should classic content be displayed and converted?
- How will post locking and save conflicts be handled across the front end and native editor?
- Which SEO, forms, multilingual, membership, and ecommerce integrations matter first?
- How will full-site editing entities—templates, template parts, navigation—enter the system later?

## SaaS architecture

- Which data is authoritative in the WPS hosted service and which is authoritative on the WordPress site?
- What works during a WPS hosted-service outage?
- How are projects, environments, and releases modeled?
- How are credentials stored, rotated, and revoked?
- Is site-to-SaaS communication pull-based, push-based, or both?
- What is the safe rollback unit: configuration release, module release, site revision, or all three?
- How are locally customized modules reconciled with Studio-managed versions?
- Does WPS provide hosting or integrate with existing hosts?

## Developer platform

- Is module creation code-first, visual, agent-assisted, or all three?
- What is the module package format?
- Which tooling belongs in a CLI, local app, Studio, or WordPress?
- How are accessibility and semantic rules tested?
- How are visual regression tests and fixtures created?
- Can agencies publish private module libraries?
- Is there eventually a public marketplace, and would that weaken quality control?

## Agents

- Which initial agent jobs save enough time to matter?
- What authorization model separates planning, drafting, changing, and publishing?
- How are proposed changes previewed and approved?
- How does the agent discover the project’s voice, design rules, and module catalog?
- What must always require a human decision?
- How are model/provider independence and data privacy handled?
- Can WordPress’s Abilities API become part of the common human/agent action layer?

## Business and governance

- Open-source plugin, commercial plugin, hosted-only service, or open-core?
- Who owns custom modules created in WPS?
- What does export or cancellation look like?
- What guarantees prevent client-site lock-in from becoming harmful?
- How are telemetry and client content handled?
- What support commitment is required when WordPress Core APIs change?
