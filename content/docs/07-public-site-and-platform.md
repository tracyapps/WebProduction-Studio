# Public site and platform model

## Domain

The project owns `webproduction.studio`.

The public site begins as the canonical project home, explanation, roadmap, and developer invitation. It can later grow into the authenticated WPs Studio application without forcing public documentation behind an account.

## Information architecture

### Public project surface

- Product vision
- Principles
- Open-system and WordPress-plugin information
- Architecture
- Developer documentation
- Module authoring documentation
- Public roadmap
- Decisions, assumptions, and open questions
- Contribution and design-partner information
- Release notes

### Future WPs Studio surface

- Accounts and organizations
- Projects and environments
- Private blueprints and module libraries
- Team and client access
- Releases and migrations
- Review and approval workflows
- Agent connections and activity
- Billing and plan management

Public URLs should not depend on an authenticated application shell. The two surfaces may share branding, navigation, content components, and deployment infrastructure while retaining clear access and reliability boundaries.

## Open and hosted relationship

### Build independently

Professionals should be able to use the public documentation, local WordPress runtime, schemas, and developer tooling to build WPs-compatible sites without purchasing WPs Studio.

### Use WPs Studio

The hosted product should charge for coordination and operational leverage:

- Managed project blueprints
- Organization-wide module and design-system libraries
- Team workflows
- Site connections
- Version and migration orchestration
- Client governance
- Documentation automation
- Staging and approvals
- Agent tooling and audit trails

The hosted offering should be valuable because it is easier and more powerful, not because the independent path is intentionally unusable.

## Documentation as website content

The living Markdown documents in this project are the initial source for the public documentation website. The website should render selected public documents at build time so that product decisions and public explanations do not drift into separate copies.

Not every internal note must be public forever. A later content manifest should explicitly mark documents and sections as:

- Public
- Public draft
- Internal
- Archived

Until that publication system exists, assume the current product notebook is suitable for early collaborators but review it before broad promotion.

## Initial landing-page audience

The first site is written primarily for experienced WordPress developers, freelancers, and agencies who may:

- Recognize the client-editing problem
- Challenge or improve the architecture
- Help develop the WordPress runtime
- Help build the hosted Studio
- Become design partners or early adopters

The site should be ambitious without implying that unbuilt features already exist. Prefer phrases such as “working thesis,” “building in public,” and “help shape the system.”

