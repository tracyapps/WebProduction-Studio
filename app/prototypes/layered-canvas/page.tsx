import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layered Canvas editor — WPS',
  description:
    'A WPS client-editor prototype with a hard divide between content and design modes, and an optional read-only canvas that shows the real site as you work.',
  robots: { index: false, follow: false },
};

export default function LayeredCanvasPrototypePage() {
  return (
    <main style={{ position: 'fixed', inset: 0, padding: 0, minHeight: 0 }}>
      <iframe
        src="/prototypes/design-separation/layered-canvas-editor.html"
        title="Layered Canvas editor prototype — gated content and design modes"
        style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
      />
    </main>
  );
}
