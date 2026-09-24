import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purpose Blocks editor — WPS',
  description:
    'A WPS client-editor prototype that offers design only as purpose choices — “this section’s job” — with per-section peeks instead of a full WYSIWYG page.',
  robots: { index: false, follow: false },
};

export default function PurposeBlocksPrototypePage() {
  return (
    <main style={{ position: 'fixed', inset: 0, padding: 0, minHeight: 0 }}>
      <iframe
        src="/prototypes/design-separation/purpose-blocks-editor.html"
        title="Purpose Blocks editor prototype — design as purpose choices"
        style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
      />
    </main>
  );
}
