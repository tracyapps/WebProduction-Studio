// Dependency-free sanity checks for the design-separation prototypes.
//   npm run validate:prototypes
//
// 1. Every prototype HTML file has balanced <script>/<style> tags and closes </html>.
// 2. Every embedded <script> body is roughly brace/bracket balanced.
// 3. The shared Acme Co. renderer produces output for every section kind and
//    every purpose x treatment combination.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKIP = new Set(['node_modules', '.git', '.next', 'dist', 'out', 'build', '.vinext', '.wrangler', '.openai']);
let failures = 0;
const ok = (msg) => console.log(`  ok    ${msg}`);
const bad = (msg) => { failures++; console.log(`  FAIL  ${msg}`); };

function walk(dir, acc = { html: [], assets: [] }) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.html.push(full);
    else if (entry.name === 'wps-content.js') acc.assets.push(full);
  }
  return acc;
}
const found = walk(root);
const rel = (p) => path.relative(root, p);

for (const file of found.html) {
  const html = fs.readFileSync(file, 'utf8');
  const count = (re) => (html.match(re) || []).length;
  if (count(/<script\b/g) === count(/<\/script>/g)) ok(`${rel(file)}: <script> balanced`);
  else bad(`${rel(file)}: unbalanced <script>`);
  if (count(/<style\b/g) === count(/<\/style>/g)) ok(`${rel(file)}: <style> balanced`);
  else bad(`${rel(file)}: unbalanced <style>`);
  if (/<\/html>\s*$/.test(html)) ok(`${rel(file)}: closes </html>`);
  else bad(`${rel(file)}: missing closing </html>`);

  for (const [, body] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    if (!body.trim()) continue;
    const opens = (body.match(/[{[(]/g) || []).length;
    const closes = (body.match(/[}\])]/g) || []).length;
    if (Math.abs(opens - closes) > 2) bad(`${rel(file)}: embedded script may be unbalanced (${opens} vs ${closes})`);
  }
}

if (!found.assets.length) {
  bad('no wps-content.js found under public/prototypes/design-separation');
} else {
  global.window = { localStorage: { getItem: () => null, setItem: () => {} } };
  global.React = { createElement: (type, props) => ({ type, props }) };
  eval(fs.readFileSync(found.assets[0], 'utf8'));

  const { WPS, WPS_SITE } = global.window;
  const assert = (cond, msg) => (cond ? ok(msg) : bad(msg));

  assert(WPS.sections.length === 4, 'example content: 4 base sections');
  assert(WPS.addable.length === 4, 'example content: 4 addable sections');

  const full = WPS_SITE.render(WPS.sections, WPS.services, { activeId: 'services' });
  assert(full.includes('Acme Co.'), 'full render includes the site name');
  assert(/data-section="services"[^>]*data-active="true"/.test(full), 'full render marks the active section');

  for (const kind of Object.keys(WPS.purposes)) {
    const base = WPS.sections.find((s) => s.kind === kind);
    let combos = 0;
    for (const purpose of WPS.purposes[kind]) {
      for (const treatment of WPS.treatments) {
        const out = WPS_SITE.renderSection(
          { ...base, design: { colorTreatment: treatment.id, layout: purpose.id } },
          WPS.services,
          {},
        );
        if (!out.includes('sc-section')) bad(`render ${kind}/${purpose.id}/${treatment.id}`);
        combos++;
      }
    }
    ok(`${kind}: ${combos} purpose x treatment renders`);
  }

  for (const choice of WPS.addable) {
    const out = WPS_SITE.renderSection(
      { id: choice.kind, kind: choice.kind, label: choice.label, heading: choice.label, body: 'x', design: { colorTreatment: 'light' } },
      WPS.services,
      {},
    );
    assert(out.includes('sc-section'), `render addable kind: ${choice.kind}`);
  }
}

console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
