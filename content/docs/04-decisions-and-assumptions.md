# Decisions and assumptions

Use this as an architectural and product decision log. A decision is something we are currently committing to; an assumption still needs evidence.

## Decisions

### D-001 — The primary buyer is a professional website producer

**Status:** Accepted, subject to validation  
**Date:** 2026-08-22

WPs is initially for agencies, freelancers, and developers deliberately building client sites with the system. The client is the primary end user of the editing experience but is not necessarily the software buyer.

### D-002 — Universal WordPress compatibility is not the goal

**Status:** Accepted  
**Date:** 2026-08-22

WPs will define and document a compatibility contract. Unsupported themes, blocks, and page builders will not be made editable through unsafe heuristics.

### D-003 — Separate content, composition, presentation, and system design

**Status:** Accepted  
**Date:** 2026-08-22

This separation is the central product model and should guide terminology, schemas, permissions, UI, and technical architecture.

### D-004 — Prefer WordPress-rendered front-end editing over headless architecture

**Status:** Working decision  
**Date:** 2026-08-22

WordPress should remain the normal public renderer. Headless support may become an adapter later, but it is not the foundational architecture.

### D-005 — WPs may grow into a SaaS plus local runtime

**Status:** Direction accepted; scope unvalidated  
**Date:** 2026-08-22

The WordPress plugin provides site-local editing and enforcement. WPs Studio provides agency coordination and reusable production leverage across projects.

### D-006 — The public site must not require continuous SaaS availability

**Status:** Proposed principle  
**Date:** 2026-08-22

The local site should cache the configuration required to render and enforce its current released system. A SaaS outage must not take client websites offline.

### D-007 — Agent actions obey the same production contract as human actions

**Status:** Proposed principle  
**Date:** 2026-08-22

An LLM agent may assemble and modify structured sites through documented abilities. It must not bypass module schemas, capabilities, validation, revisions, or approval policy.

### D-008 — Open foundation, hosted Studio

**Status:** Direction accepted; licensing and business model unvalidated  
**Date:** 2026-08-22

WPs should provide public developer documentation and the tools required for professionals to build with the system independently. WPs Studio will be the paid, coordinated experience for teams that want managed blueprints, releases, workflows, governance, and agent tooling. The intended relationship is analogous to an open ecosystem paired with a convenient hosted service, not a crippled local product used only to force SaaS adoption.

### D-009 — Public home is webproduction.studio

**Status:** Accepted  
**Date:** 2026-08-22

The `webproduction.studio` domain was acquired for the project. The site will initially serve as the public project home and developer invitation, then grow into the WPs Studio web application. Public documentation and open-system information must remain clearly separable from future account, billing, and private project surfaces.

## Assumptions to validate

### A-001 — Agencies will accept an opinionated ecosystem

They will trade arbitrary theme/page-builder compatibility for faster production, stronger design governance, and a better client experience.

### A-002 — Front-end editing materially improves client confidence

Visible editing boundaries on the real site will reduce confusion and fear compared with a backend editor or approximate canvas.

### A-003 — Design variants provide sufficient flexibility

A small set of purposeful variants will meet most client needs without exposing low-level design controls.

### A-004 — The local plugin is a viable adoption wedge

Agencies can receive significant value from the editor and module system before the SaaS control plane is complete.

### A-005 — Structured agent workflows are commercially meaningful

Agencies will value an agent that can build within a known system more than unconstrained AI-generated pages that require extensive cleanup.

### A-006 — Ordinary WordPress storage is sufficiently portable

Using standard entities, block content, metadata, media, permissions, autosaves, and revisions will provide an acceptable balance between portability and product control.

## Naming notes

- **WPs** — current working shorthand.
- **WebProduction Studio** — current working expansion; capitalization and spacing are unsettled.
- The name conveniently references WordPress without necessarily making “WordPress” part of the formal product name.
- Trademark, searchability, domain availability, pronunciation, and confusion with the plural of WP have not been investigated.
- `webproduction.studio` is owned for the project.
