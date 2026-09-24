import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clean Slate editor — WPS',
  description:
    'A content-only WPS client-editor prototype: no design controls at all, with design delegated to the studio and a read-only site preview.',
  robots: { index: false, follow: false },
};

// This prototype is shipped as a self-contained static document under
// /public/prototypes/design-separation/. Wrapping it in a full-viewport frame
// keeps it fully isolated from the site's own styles and scripts, so the
// prototype can be replaced or re-exported without touching site code.
export default function CleanSlatePrototypePage() {
  return (
    <main style={{ position: 'fixed', inset: 0, padding: 0, minHeight: 0 }}>
      <iframe
        src="/prototypes/design-separation/content-only-editor.html"
        title="Clean Slate editor prototype — content only"
        style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
      />
    </main>
  );
}
