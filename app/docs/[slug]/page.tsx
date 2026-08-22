import type { Metadata } from 'next';
import { InternalLink as Link } from '@/components/InternalLink';
import { notFound } from 'next/navigation';
import { MarkdownDocument } from '@/components/MarkdownDocument';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getDoc, publicDocs } from '@/lib/docs';

export function generateStaticParams() {
  return publicDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.label} — WPs`,
    description: doc.description,
    openGraph: { images: [] },
    twitter: { images: [] },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const currentIndex = publicDocs.findIndex((item) => item.slug === slug);
  const previous = currentIndex > 0 ? publicDocs[currentIndex - 1] : undefined;
  const next = currentIndex < publicDocs.length - 1 ? publicDocs[currentIndex + 1] : undefined;

  return (
    <main className="inner-page">
      <div className="noise" />
      <SiteHeader />

      <div className="doc-layout">
        <aside className="doc-sidebar">
          <Link className="back-link" href="/docs">← All working docs</Link>
          <p>On this project</p>
          <nav aria-label="Documentation pages">
            {publicDocs.map((item) => (
              <Link
                className={item.slug === slug ? 'current' : ''}
                href={`/docs/${item.slug}`}
                key={item.slug}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="doc-article">
          <header>
            <div className="kicker">{doc.eyebrow}</div>
            <h1>{doc.label}</h1>
            <p>{doc.description}</p>
          </header>
          <MarkdownDocument markdown={doc.content} />

          <nav className="doc-pagination" aria-label="Adjacent documentation">
            {previous ? (
              <Link href={`/docs/${previous.slug}`}>
                <span>Previous</span>
                <strong>← {previous.label}</strong>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/docs/${next.slug}`}>
                <span>Next</span>
                <strong>{next.label} →</strong>
              </Link>
            ) : <span />}
          </nav>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
