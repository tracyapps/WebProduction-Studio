# WebProduction Studio (WPS)

The public project home and documentation site for WebProduction Studio.

## Local development

Requires Node.js 22 and npm.

```bash
npm install
npm run dev
```

The site reads its public product documentation from `content/docs`. The `predev` and `prebuild` scripts generate a typed module from those Markdown files automatically.

## Verification

```bash
npm run build
npm run lint
```

## GitHub and Vercel

This directory is the repository root.

1. Create an empty GitHub repository.
2. Replace the current `origin` with the GitHub repository URL and push `main`.
3. Import that repository into Vercel.
4. Vercel should detect **Next.js** automatically. Leave the project root as `./`.
5. The included `vercel.json`, `.nvmrc`, `engines` field, lockfile, and build scripts provide the required deployment settings.
6. Add `webproduction.studio` and optionally `www.webproduction.studio` in the Vercel project’s Domains settings, then apply the DNS records Vercel provides.

No runtime environment variables are currently required. `.vercel/`, `.env*`, build output, dependencies, and local editor files are excluded from Git.

## Public content model

- `/` — public landing page and collaborator invitation
- `/docs` — documentation generated from the living Markdown notebook
- `/docs/[slug]` — individual public documents
- `/studio` — the future hosted product, intentionally separate from the open system
