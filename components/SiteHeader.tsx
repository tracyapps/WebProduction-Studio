import { InternalLink as Link } from '@/components/InternalLink';

export function SiteHeader() {
  return (
    <nav className="nav-shell" aria-label="Primary navigation">
      <Link className="brand" href="/" aria-label="WebProduction Studio home">
        <span className="brand-mark">WPS</span>
        <span className="brand-name">WebProduction Studio</span>
      </Link>

      <div className="nav-links">
        <Link href="/#principles">Principles</Link>
        <Link href="/#system">The system</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/prototypes">Prototypes</Link>
        <Link href="/studio">Studio</Link>
      </div>

      <Link className="nav-cta" href="/docs/open-questions">
        Help shape WPS <span aria-hidden="true">↗</span>
      </Link>
    </nav>
  );
}
