import vision from '../content/docs/01-product-vision.md?raw';
import architecture from '../content/docs/02-system-concept.md?raw';
import roadmap from '../content/docs/03-roadmap.md?raw';
import decisions from '../content/docs/04-decisions-and-assumptions.md?raw';
import questions from '../content/docs/05-open-questions.md?raw';
import sources from '../content/docs/06-research-sources.md?raw';
import publicSite from '../content/docs/07-public-site-and-platform.md?raw';
import ideaLog from '../content/docs/idea-log.md?raw';

export type PublicDoc = {
  slug: string;
  label: string;
  eyebrow: string;
  description: string;
  content: string;
};

export const publicDocs: PublicDoc[] = [
  {
    slug: 'product-vision',
    label: 'Product vision',
    eyebrow: 'Start here',
    description: 'The problem, audience, promise, and principles behind WPs.',
    content: vision,
  },
  {
    slug: 'system-architecture',
    label: 'System architecture',
    eyebrow: 'Technical thesis',
    description: 'The local runtime, Studio control plane, module system, and editing model.',
    content: architecture,
  },
  {
    slug: 'roadmap',
    label: 'Working roadmap',
    eyebrow: 'Where we are going',
    description: 'A risk-first path from concept to plugin, agency kit, Studio, and agents.',
    content: roadmap,
  },
  {
    slug: 'decisions',
    label: 'Decisions & assumptions',
    eyebrow: 'Decision record',
    description: 'What we currently believe, what is settled, and what still needs evidence.',
    content: decisions,
  },
  {
    slug: 'open-questions',
    label: 'Open questions',
    eyebrow: 'Help wanted',
    description: 'The product, UX, WordPress, SaaS, and governance questions still in play.',
    content: questions,
  },
  {
    slug: 'public-platform',
    label: 'Public & hosted model',
    eyebrow: 'Open ecosystem',
    description: 'How independent builders and the hosted WPs Studio can coexist.',
    content: publicSite,
  },
  {
    slug: 'research-sources',
    label: 'Research sources',
    eyebrow: 'Primary sources',
    description: 'The WordPress APIs and current Core direction informing feasibility.',
    content: sources,
  },
  {
    slug: 'build-log',
    label: 'Idea & build log',
    eyebrow: 'In public',
    description: 'A chronological record of how the product thesis is evolving.',
    content: ideaLog,
  },
];

export function getDoc(slug: string) {
  return publicDocs.find((doc) => doc.slug === slug);
}
