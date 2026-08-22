import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const definitions = [
  ['product-vision', 'Product vision', 'Start here', 'The problem, audience, promise, and principles behind WPS.', '01-product-vision.md'],
  ['system-architecture', 'System architecture', 'Technical thesis', 'The local runtime, Studio control plane, module system, and editing model.', '02-system-concept.md'],
  ['roadmap', 'Working roadmap', 'Where we are going', 'A risk-first path from concept to plugin, agency kit, Studio, and agents.', '03-roadmap.md'],
  ['decisions', 'Decisions & assumptions', 'Decision record', 'What we currently believe, what is settled, and what still needs evidence.', '04-decisions-and-assumptions.md'],
  ['open-questions', 'Open questions', 'Help wanted', 'The product, UX, WordPress, SaaS, and governance questions still in play.', '05-open-questions.md'],
  ['public-platform', 'Public & hosted model', 'Open ecosystem', 'How independent builders and WebProduction Studio can coexist.', '07-public-site-and-platform.md'],
  ['research-sources', 'Research sources', 'Primary sources', 'The WordPress APIs and current Core direction informing feasibility.', '06-research-sources.md'],
  ['build-log', 'Idea & build log', 'In public', 'A chronological record of how the product thesis is evolving.', 'idea-log.md'],
];

const docs = await Promise.all(
  definitions.map(async ([slug, label, eyebrow, description, filename]) => ({
    slug,
    label,
    eyebrow,
    description,
    content: await readFile(join(projectRoot, 'content', 'docs', filename), 'utf8'),
  })),
);

const output = `// Generated from content/docs by scripts/generate-docs.mjs.\n` +
  `// Edit the Markdown sources, then run npm run generate:docs.\n` +
  `export const generatedDocs = ${JSON.stringify(docs, null, 2)} as const;\n`;

await mkdir(join(projectRoot, 'generated'), { recursive: true });
await writeFile(join(projectRoot, 'generated', 'docs.ts'), output, 'utf8');
