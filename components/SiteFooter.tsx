import { InternalLink as Link } from '@/components/InternalLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">WPs</span>
        <div>
          <strong>WebProduction Studio</strong>
          <span>Building a calmer WordPress.</span>
        </div>
      </div>
      <div className="footer-links">
        <Link href="/docs">Working docs</Link>
        <Link href="/docs/roadmap">Roadmap</Link>
        <Link href="/studio">WPs Studio</Link>
      </div>
      <p>Working thesis · Built in public · 2026</p>
    </footer>
  );
}
