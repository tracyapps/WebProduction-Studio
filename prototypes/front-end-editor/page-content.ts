// Shared example content for the "front-end page editor" prototype family.
//
// Both interaction variants (inline-canvas and guided-outline) render the same
// fictional "Acme Co." home page with the same starting content used in the
// client-admin prototype. Keeping the content identical across prototypes
// means a research participant's reaction is about the *interaction model*,
// not about unfamiliar or differently-worded example content.

export type SectionKind = 'hero' | 'services' | 'testimonials' | 'contact' | 'faq' | 'text-image';

export type LayoutChoice = 'simple' | 'editorial' | 'image-led';
export type ColorChoice = 'light' | 'brand' | 'dark';
export type EditorSide = 'content' | 'design';
export type SaveState = 'saved' | 'unsaved' | 'saving';

export interface SectionDesign {
  colorTreatment: ColorChoice;
  /** Only meaningful for the "services" section kind. */
  layout?: LayoutChoice;
}

export interface PageSection {
  id: string;
  kind: SectionKind;
  label: string;
  heading: string;
  body: string;
  cta?: string;
  design: SectionDesign;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export const INITIAL_SECTIONS: PageSection[] = [
  {
    id: 'hero',
    kind: 'hero',
    label: 'Hero',
    heading: 'Build with confidence.',
    body: 'Thoughtful websites for ambitious small businesses.',
    cta: 'Get in touch',
    design: { colorTreatment: 'light' },
  },
  {
    id: 'services',
    kind: 'services',
    label: 'Services',
    heading: 'Services that move your business forward.',
    body: 'Everything we do is designed to help you attract more customers and keep them coming back.',
    design: { colorTreatment: 'light', layout: 'simple' },
  },
  {
    id: 'testimonials',
    kind: 'testimonials',
    label: 'Testimonials',
    heading: 'Trusted by business owners like you.',
    body: 'Our new site finally feels easy to keep current — and it still looks like us.',
    design: { colorTreatment: 'light' },
  },
  {
    id: 'contact',
    kind: 'contact',
    label: 'Contact',
    heading: 'Let’s start a conversation.',
    body: 'Have a question or a project in mind? We would love to hear about it.',
    cta: 'Get in touch',
    design: { colorTreatment: 'brand' },
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'website-design',
    title: 'Website Design',
    description: 'Custom, modern websites that look great and convert visitors into customers.',
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Faster sites, better SEO, and a smooth experience across every device.',
  },
  {
    id: 'support',
    title: 'Ongoing Support',
    description: 'Updates, backups, and reliable support whenever you need it.',
  },
];

export const ADDABLE_SECTIONS: Array<{ kind: SectionKind; label: string; description: string }> = [
  { kind: 'faq', label: 'Frequently asked questions', description: 'Answer common questions clearly.' },
  { kind: 'text-image', label: 'Text and image', description: 'Tell a focused story with supporting media.' },
  { kind: 'testimonials', label: 'Testimonials', description: 'Share customer proof and outcomes.' },
  { kind: 'contact', label: 'Call to action', description: 'Help visitors take the next step.' },
];

export const LAYOUT_LABELS: Record<LayoutChoice, string> = {
  simple: 'Simple',
  editorial: 'Editorial',
  'image-led': 'Image-led',
};

export const COLOR_LABELS: Record<ColorChoice, string> = {
  light: 'Light',
  brand: 'Brand',
  dark: 'Dark',
};

export function moveItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

let sequence = 0;

export function nextId(prefix: string): string {
  sequence += 1;
  return `${prefix}-${sequence}`;
}
