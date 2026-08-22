import type { Metadata } from 'next';
import { InternalLink as Link } from '@/components/InternalLink';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'WebProduction Studio — Hosted by choice',
  description: 'The future hosted production system for agencies building WPS sites.',
};

const independent = [
  'Local WordPress runtime',
  'Public module specifications',
  'Developer documentation',
  'Your infrastructure and workflow',
];

const hosted = [
  'Managed project blueprints',
  'Team and client governance',
  'Versioned releases and migrations',
  'Reviewable, constrained agent tools',
];

export default function StudioPage() {
  return (
    <main className="inner-page studio-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="noise" />
      <SiteHeader />

      <header className="studio-hero">
        <div className="status-pill"><span className="status-dot" /> Future product surface</div>
        <h1>Open by foundation.<br /><span>Hosted by choice.</span></h1>
        <p>
          Build with the open WPS system independently, or use WebProduction Studio
          when your team wants the
          complete production environment coordinated for you.
        </p>
      </header>

      <section className="model-comparison">
        <article className="model-card open-model">
          <div className="model-topline"><span>{`{ }`}</span> Build independently</div>
          <h2>The system belongs in your hands.</h2>
          <p>
            Public specifications and a capable local runtime should let professionals
            create excellent WPS sites without renting permission from us.
          </p>
          <ul>{independent.map((item) => <li key={item}>✓ {item}</li>)}</ul>
          <Link href="/docs/public-platform">Read the platform model →</Link>
        </article>

        <article className="model-card hosted-model">
          <div className="model-topline"><span>✦</span> WebProduction Studio</div>
          <h2>Coordination becomes the product.</h2>
          <p>
            Studio adds the cross-project leverage, governance, release management,
            and agent workflows that become painful to reproduce across an agency.
          </p>
          <ul>{hosted.map((item) => <li key={item}>✓ {item}</li>)}</ul>
          <Link href="/docs/roadmap">See how we get there →</Link>
        </article>
      </section>

      <section className="availability-callout">
        <span>webproduction.studio</span>
        <h2>The public project home becomes the application—without hiding the project.</h2>
        <p>
          Documentation and open-system resources remain public. Accounts, private
          projects, billing, and organization workflows grow into a separate authenticated surface.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
