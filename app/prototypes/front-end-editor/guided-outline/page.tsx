import type { Metadata } from 'next';
import { GuidedOutlineEditor } from '@/prototypes/front-end-editor/guided-outline/GuidedOutlineEditor';

export const metadata: Metadata = {
  title: 'Front-end page editor — guided outline — WPS',
  description:
    'A WPS prototype with an always-visible page outline and a contextual panel anchored to the selected section of the real page.',
  robots: { index: false, follow: false },
};

export default function GuidedOutlinePrototypePage() {
  return <GuidedOutlineEditor />;
}
