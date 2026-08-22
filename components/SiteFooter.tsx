import { InternalLink as Link } from '@/components/InternalLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">WPS</span>
        <div>
          <strong>WebProduction Studio</strong>
          <span>Building a calmer WordPress.</span>
        </div>
      </div>
      <div className="footer-links">
        <Link href="/docs">Working docs</Link>
        <Link href="/docs/roadmap">Roadmap</Link>
        <Link href="/studio">WPS</Link>
      </div>
      <div className="footer-legal">
        <p>Working thesis · Built in public · 2026</p>
        <p>
          WordPress is a registered trademark of the{' '}
          <a href="https://wordpressfoundation.org/trademark-policy/">
            WordPress Foundation
          </a>.{' '}
          WebProduction Studio (WPS) is an independent project and is not
          affiliated with or endorsed by the WordPress Foundation or the
          WordPress open source project.
        </p>
      </div>
    </footer>
  );
}
