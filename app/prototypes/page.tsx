import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, ClockCounterClockwise, Flask } from '@phosphor-icons/react/dist/ssr';
import { InternalLink as Link } from '@/components/InternalLink';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import styles from './prototypes.module.css';

export const metadata: Metadata = {
  title: 'Prototypes — WebProduction Studio',
  description: 'Working WPS interface prototypes, versions, and research variations.',
  robots: { index: false, follow: false },
};

const prototypes = [
  {
    id: 'client-admin-v1',
    title: 'Client page editor',
    version: 'Version 1',
    variation: 'Baseline interaction model',
    status: 'Active research prototype',
    updated: 'August 23, 2026',
    description:
      'A quieter, task-focused editing experience with a page map, guarded content and design controls, and an optional live site preview.',
    tags: ['Client experience', 'Page editing', 'Interactive'],
    href: '/prototypes/client-admin',
    image: '/prototypes/client-admin/client-editor-v1.webp',
  },
  {
    id: 'front-end-editor-inline-canvas-v1',
    title: 'Front-end page editor',
    version: 'Version 1',
    variation: 'Inline canvas — on-page editing',
    status: 'Active research prototype',
    updated: 'August 25, 2026',
    description:
      'Editing happens directly on the rendered page. A floating toolbar attaches to whichever section is selected, text edits happen in place, and design changes apply immediately — no separate sidebar or preview pane.',
    tags: ['Front-end editing', 'Minimal chrome', 'Interactive'],
    href: '/prototypes/front-end-editor/inline-canvas',
    image: '/prototypes/front-end-editor/inline-canvas-v1.svg',
  },
  {
    id: 'front-end-editor-guided-outline-v1',
    title: 'Front-end page editor',
    version: 'Version 1',
    variation: 'Guided outline — anchored panel',
    status: 'Active research prototype',
    updated: 'August 25, 2026',
    description:
      'An always-visible page outline sits beside the real page. Selecting a section opens a panel anchored to it, and design changes preview as a draft until you deliberately apply them.',
    tags: ['Front-end editing', 'Always-visible outline', 'Interactive'],
    href: '/prototypes/front-end-editor/guided-outline',
    image: '/prototypes/front-end-editor/guided-outline-v1.svg',
  },
];

export default function PrototypesPage() {
  return (
    <main className={styles.page}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="noise" />
      <SiteHeader />

      <header className={styles.hero}>
        <div className={styles.eyebrow}><Flask aria-hidden="true" size={15} /> Research workspace</div>
        <h1>Working ideas,<br /><span>made visible.</span></h1>
        <p>
          These prototypes are intentionally unfinished. Each version gives us something concrete
          to test, discuss, and improve with the people who build and manage WordPress sites.
        </p>
        <div className={styles.legend}>
          <span><i className={styles.activeDot} /> Active research</span>
          <span><ClockCounterClockwise aria-hidden="true" size={15} /> Versions stay available</span>
        </div>
      </header>

      <section className={styles.catalog} aria-labelledby="prototype-catalog-title">
        <div className={styles.catalogHeading}>
          <div>
            <span>Prototype catalog</span>
            <h2 id="prototype-catalog-title">Current explorations</h2>
          </div>
          <p>Versions are numbered; alternate directions will be logged as variations.</p>
        </div>

        <div className={styles.grid}>
          {prototypes.map((prototype) => (
            <article className={styles.card} key={prototype.id}>
              <Link
                className={styles.thumbnail}
                href={prototype.href}
                aria-label={`Open ${prototype.title}, ${prototype.version} — ${prototype.variation}`}
              >
                <Image
                  src={prototype.image}
                  alt={`${prototype.title} interface preview — ${prototype.variation}`}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 40px), 720px"
                  unoptimized={prototype.image.endsWith('.svg')}
                  priority
                />
                <span className={styles.versionBadge}>{prototype.version}</span>
              </Link>
              <div className={styles.cardBody}>
                <div className={styles.cardStatus}><i /> {prototype.status}</div>
                <h3>{prototype.title}</h3>
                <p className={styles.variation}>{prototype.variation}</p>
                <p className={styles.description}>{prototype.description}</p>
                <div className={styles.tags} aria-label="Prototype topics">
                  {prototype.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className={styles.cardFooter}>
                  <span>Updated {prototype.updated}</span>
                  <Link href={prototype.href}>Open prototype <ArrowRight aria-hidden="true" size={16} /></Link>
                </div>
              </div>
            </article>
          ))}

          <aside className={styles.futureCard}>
            <span>Next research branch</span>
            <h3>Variations will live here.</h3>
            <p>
              Alternate navigation, editing, preview, and workflow models can be compared without
              erasing the decisions that came before them.
            </p>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
