import { InternalLink as Link } from '@/components/InternalLink';

const NAV_GLASS_MAP =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22 preserveAspectRatio=%22none%22%3E%3Cdefs%3E%3ClinearGradient id=%22x%22 x1=%220%22 y1=%220%22 x2=%22100%22 y2=%220%22%3E%3Cstop offset=%220%22 stop-color=%22%23000000%22/%3E%3Cstop offset=%221%22 stop-color=%22%23ff0000%22/%3E%3C/linearGradient%3E%3ClinearGradient id=%22y%22 x1=%220%22 y1=%220%22 x2=%220%22 y2=%22100%22%3E%3Cstop offset=%220%22 stop-color=%22%23000000%22/%3E%3Cstop offset=%221%22 stop-color=%22%230000ff%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22100%22 height=%22100%22 fill=%22url(%23x)%22/%3E%3Crect width=%22100%22 height=%22100%22 fill=%22url(%23y)%22 style=%22mix-blend-mode:screen%22/%3E%3C/svg%3E';

export function SiteHeader() {
  return (
    <>
      <svg className="nav-glass-defs" aria-hidden="true" focusable="false" width="0" height="0">
        <defs>
          <filter id="nav-liquid-glass" colorInterpolationFilters="sRGB">
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
              href={NAV_GLASS_MAP}
              data-nav-glass-map="true"
            />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" scale="-50" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" scale="-47" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" scale="-44" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

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
    </>
  );
}
