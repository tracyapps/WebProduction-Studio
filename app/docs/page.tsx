import type { Metadata } from 'next';
import { InternalLink as Link } from '@/components/InternalLink';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { publicDocs } from '@/lib/docs';

export const metadata: Metadata = {
  title: 'Working docs — WPs',
  description: 'The public product notebook for WebProduction Studio.',
};

export default function DocsIndex() {
  return (
    <main className="inner-page">
      <div className="ambient ambient-one" />
      <div className="noise" />
      <SiteHeader />

      <header className="docs-hero">
        <div className="kicker">Public product notebook</div>
        <h1>The thinking stays visible.</h1>
        <p>
          WPs is being designed in public. These pages are generated from the same
          working documents used to make product and architecture decisions.
        </p>
        <div className="doc-sync-note">
          <span className="status-dot" />
          Documentation source connected · Updated as decisions land
        </div>
      </header>

      <section className="docs-grid" aria-label="WPs documentation">
        {publicDocs.map((doc, index) => (
          <Link className="doc-card" href={`/docs/${doc.slug}`} key={doc.slug}>
            <span className="doc-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <small>{doc.eyebrow}</small>
              <h2>{doc.label}</h2>
              <p>{doc.description}</p>
            </div>
            <span className="doc-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>

      <aside className="transparency-note">
        <div className="tiny-spark">✦</div>
        <div>
          <strong>Early-collaborator transparency</strong>
          <p>
            These are working documents, not polished certainty. Assumptions are
            labeled, open questions are preserved, and the roadmap is organized
            around reducing risk instead of manufacturing release dates.
          </p>
        </div>
      </aside>

      <SiteFooter />
    </main>
  );
}
