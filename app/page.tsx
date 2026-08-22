import { InternalLink as Link } from '@/components/InternalLink';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

const modules = [
  { label: 'Hero', detail: 'Editorial / Split', tone: 'lime' },
  { label: 'Services', detail: '3 linked entries', tone: 'violet' },
  { label: 'Testimonial collection', detail: 'Compact cards', tone: 'cyan' },
];

export default function Home() {
  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="noise" />

      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" />
            Building in public · August 2026
          </div>

          <h1>
            WordPress sites your clients
            <span>aren&apos;t afraid to touch.</span>
          </h1>

          <p className="hero-intro">
            WebProduction Studio (WPS) is an open, purpose-driven production system for the people who
            build WordPress sites—and a radically clearer editing experience for
            the clients who live with them.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#system">
              Explore the vision <span aria-hidden="true">→</span>
            </a>
            <Link className="button button-secondary" href="/docs">
              Read the working docs
            </Link>
          </div>

          <div className="open-note">
            <span className="open-note-mark">{`{ }`}</span>
            <p>
              Built for agencies and developers. Open foundations, transparent
              decisions, and a hosted Studio when you want the whole system.
            </p>
          </div>
        </div>

        <div className="product-stage" aria-label="Conceptual WPS editor preview">
          <div className="stage-orbit orbit-one" />
          <div className="stage-orbit orbit-two" />

          <div className="editor-window">
            <div className="window-bar">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="window-title">acme.test / services</div>
              <div className="edit-status">
                <span /> Edit mode
              </div>
            </div>

            <div className="editor-body">
              <aside className="page-outline" aria-label="Page outline preview">
                <p>Page outline</p>
                <ol>
                  <li className="active"><span>01</span> Hero</li>
                  <li><span>02</span> Services</li>
                  <li><span>03</span> Proof</li>
                  <li><span>04</span> Contact</li>
                </ol>
                <div className="outline-add">＋ Add module</div>
              </aside>

              <div className="page-canvas">
                <div className="canvas-label">
                  <span>Page content</span>
                  <span>Saved just now</span>
                </div>

                <div className="module-stack">
                  {modules.map((module, index) => (
                    <article
                      className={`module-card module-${module.tone}`}
                      key={module.label}
                    >
                      <div className="module-number">0{index + 1}</div>
                      <div className="module-copy">
                        <strong>{module.label}</strong>
                        <span>{module.detail}</span>
                      </div>
                      <div className="module-controls" aria-hidden="true">
                        <span>↕</span><span>•••</span>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="publish-row">
                  <div>
                    <span className="check">✓</span>
                    <span>No accessibility issues</span>
                  </div>
                  <button type="button">Publish changes</button>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-card floating-purpose">
            <span>Purpose first</span>
            <strong>Meaning before appearance.</strong>
          </div>

          <div className="floating-card floating-guardrail">
            <span className="tiny-spark">✦</span>
            <div>
              <strong>Guardrails on</strong>
              <small>Design system protected</small>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto-strip" id="principles" aria-label="Core principles">
        <p>Content has meaning.</p>
        <span>✦</span>
        <p>Design has intent.</p>
        <span>✦</span>
        <p>Constraints create confidence.</p>
      </section>

      <section className="section-shell problem-section">
        <div className="section-heading">
          <div className="kicker">The mismatch</div>
          <h2>Editing content should not require becoming a web designer.</h2>
        </div>
        <div className="problem-copy">
          <p>
            WordPress currently collapses writing, page composition, visual design,
            reusable content, configuration, and development into one idea:
            <em> editing.</em>
          </p>
          <p>
            WPS separates those responsibilities so clients can confidently manage
            information while professionals protect the system around it.
          </p>
        </div>
      </section>

      <section className="contract-section" id="system">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <div className="kicker">The WPS contract</div>
            <h2>Four layers. Four clear owners.</h2>
            <p>Freedom where it helps. Guardrails where expertise matters.</p>
          </div>

          <div className="contract-grid">
            <article>
              <span>01</span>
              <small>Client-owned</small>
              <h3>Content</h3>
              <p>What the information means: people, services, proof, answers, and calls to action.</p>
            </article>
            <article>
              <span>02</span>
              <small>Shared control</small>
              <h3>Composition</h3>
              <p>Which purpose-driven modules appear and how the story flows down the page.</p>
            </article>
            <article>
              <span>03</span>
              <small>Curated choice</small>
              <h3>Presentation</h3>
              <p>A small set of intentional, approved ways each module can look and behave.</p>
            </article>
            <article>
              <span>04</span>
              <small>Professional-owned</small>
              <h3>System design</h3>
              <p>Semantics, accessibility, responsive behavior, performance, and brand integrity.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell platform-section">
        <div className="platform-visual" aria-hidden="true">
          <div className="platform-core">WPS</div>
          <div className="platform-node node-runtime"><span>01</span> Runtime</div>
          <div className="platform-node node-modules"><span>02</span> Modules</div>
          <div className="platform-node node-studio"><span>03</span> Studio</div>
          <div className="platform-node node-agent"><span>04</span> Agents</div>
        </div>
        <div className="platform-copy">
          <div className="kicker">More than a plugin</div>
          <h2>The production system above WordPress.</h2>
          <p>
            The plugin becomes the trusted runtime inside every client site. WPS
            becomes the agency workspace above it—coordinating blueprints,
            modules, releases, permissions, documentation, and eventually agents.
          </p>
          <div className="platform-list">
            <span><b>Runtime</b> Local editing and enforcement</span>
            <span><b>Module system</b> Semantic, reusable building material</span>
            <span><b>Studio</b> Cross-project leverage and governance</span>
            <span><b>Agent interface</b> Structured assistance with boundaries</span>
          </div>
        </div>
      </section>

      <section className="open-hosted-section">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <div className="kicker">The ecosystem model</div>
            <h2>Build it yourself—or let Studio carry the operational weight.</h2>
          </div>
          <div className="open-hosted-grid">
            <article>
              <div className="model-topline"><span>{`{ }`}</span> Open foundation</div>
              <h3>Your stack. Your modules. Your clients.</h3>
              <p>Public documentation and tooling for developers who want to build and operate WPS independently.</p>
              <Link href="/docs/public-platform">Explore the open model →</Link>
            </article>
            <article className="studio-teaser">
              <div className="model-topline"><span>✦</span> Hosted Studio</div>
              <h3>The complete agency production environment.</h3>
              <p>Managed blueprints, teams, releases, approvals, governance, and reviewable agent workflows.</p>
              <Link href="/studio">Meet the future Studio →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell roadmap-section" id="roadmap">
        <div className="roadmap-intro">
          <div className="kicker">Working roadmap</div>
          <h2>We are at day one.<br />That is the invitation.</h2>
          <p>
            The thesis is documented. The architecture is being pressure-tested.
            The next milestone is a single-site technical proof of the front-end editing model.
          </p>
          <Link className="button button-secondary" href="/docs/roadmap">Read the full roadmap</Link>
        </div>
        <ol className="roadmap-track">
          <li className="active"><span>00</span><div><small>Now</small><strong>Definition & validation</strong></div></li>
          <li><span>01</span><div><small>Next</small><strong>Single-site proof</strong></div></li>
          <li><span>02</span><div><small>Then</small><strong>Agency kit</strong></div></li>
          <li><span>03</span><div><small>Later</small><strong>WPS alpha</strong></div></li>
        </ol>
      </section>

      <section className="collaborator-cta">
        <div className="cta-glow" />
        <div className="kicker">WordPress people: you know this pain.</div>
        <h2>Help us build the system we wish we could hand our clients.</h2>
        <p>
          Challenge the assumptions. Improve the architecture. Bring a client workflow.
          The open questions are public because the right collaborators will make WPS better.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/docs/open-questions">See where help is needed →</Link>
          <Link className="button button-secondary" href="/docs/product-vision">Start with the vision</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
