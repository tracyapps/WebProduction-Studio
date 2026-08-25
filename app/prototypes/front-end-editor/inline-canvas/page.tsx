import type { Metadata } from 'next';
import { InlineCanvasEditor } from '@/prototypes/front-end-editor/inline-canvas/InlineCanvasEditor';

export const metadata: Metadata = {
  title: 'Front-end page editor — inline canvas — WPS',
  description:
    'A minimal-chrome WPS prototype where editing happens directly on the rendered page, with no separate settings sidebar or preview pane.',
  robots: { index: false, follow: false },
};

export default function InlineCanvasPrototypePage() {
  return <InlineCanvasEditor />;
}
