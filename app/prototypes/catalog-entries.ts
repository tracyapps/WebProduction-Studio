// Design-separation research round — catalog entries for the /prototypes grid.
//
// These match the object shape already used in app/prototypes/page.tsx.
// Either spread this array into that page's `prototypes` array:
//
//   import { designSeparationPrototypes } from './catalog-entries';
//   const prototypes = [ ...existingPrototypes, ...designSeparationPrototypes ];
//
// or copy the objects inline. Thumbnails are SVGs, which the existing card
// already handles via `unoptimized={prototype.image.endsWith('.svg')}`.

export const designSeparationPrototypes = [
  {
    id: 'clean-slate-v1',
    title: 'Clean Slate editor',
    version: 'Version 1',
    variation: 'Content only — design delegated',
    status: 'Active research prototype',
    updated: 'September 24, 2026',
    description:
      'The maximum-separation study. Clients edit a plain, document-like list of purpose-labelled blocks. There are no design controls at all; a persistent note makes clear that design, layout, and accessibility belong to the studio. The finished site opens only in a deliberate, read-only preview.',
    tags: ['Content-first', 'No design controls', 'Interactive'],
    href: '/prototypes/clean-slate',
    image: '/prototypes/design-separation/thumbs/clean-slate.svg',
  },
  {
    id: 'purpose-blocks-v1',
    title: 'Purpose Blocks editor',
    version: 'Version 1',
    variation: 'Design as purpose choices',
    status: 'Active research prototype',
    updated: 'September 24, 2026',
    description:
      'Design is offered, but only as intent. Each section exposes a small, curated set of “this section’s job” choices with abstract previews and plain-language weight labels. Content fields stay primary, and a per-section peek shows the look on demand — never a full WYSIWYG page.',
    tags: ['Content-first', 'Purpose-framed design', 'Interactive'],
    href: '/prototypes/purpose-blocks',
    image: '/prototypes/design-separation/thumbs/purpose-blocks.svg',
  },
  {
    id: 'layered-canvas-v1',
    title: 'Layered Canvas editor',
    version: 'Version 1',
    variation: 'Gated content & design modes',
    status: 'Active research prototype',
    updated: 'September 24, 2026',
    description:
      'A hard divide between two modes. Content mode locks the look entirely; design lives in a separate, explicitly entered workspace behind a confirmation that explains what changes and what cannot. An optional read-only canvas shows the real site as you work, off by default.',
    tags: ['Content-first', 'Mode divide', 'Interactive'],
    href: '/prototypes/layered-canvas',
    image: '/prototypes/design-separation/thumbs/layered-canvas.svg',
  },
];
