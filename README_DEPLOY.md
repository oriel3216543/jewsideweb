# Deploying to Cloudflare Pages

This repository supports deployment to Cloudflare Pages with a custom domain. Two project types are recognized:

- ProjectType=StaticPages: When the root contains `index.html` and `functions/**` with no Next.js dependency.
- ProjectType=NextJS: When `package.json` contains a `next` dependency (this repo uses this mode).

Current detection: NextJS

## Common
- Node version: use `.nvmrc` (20) or set `NODE_VERSION=20` in Cloudflare.
- Endpoints: `/api/status` and `/api/healthcheck` are Edge API routes and fail-safe.

## Cloudflare UI Settings (NextJS)
- Build command: `npm run pages:build`
- Output directory: `.vercel/output/static`
- Environment variables:
  - `NODE_VERSION=20`
- Custom domains: `jewside.com`, `www.jewside.com`
- HTTPS + HSTS: Enabled

### Local validation
- Install: `npm i`
- Typecheck: `npm run typecheck`
- Build for Pages: `npm run pages:build`
- Preview: `npm run preview`

## Cloudflare UI Settings (Static)
If you use the connector-only variant (static + Pages Functions):
- Build command: None
- Deploy command: (leave empty)
- Output directory: `/`
- Custom domain: `status.jewside.com`
- HTTPS + HSTS: Enabled

### Static extras
- `_redirects` and `_headers` at repo root configure redirects and security headers.
- `wrangler.toml` pins `compatibility_date` and enables `nodejs_compat`.

## Rollback & Previews
- Pull Requests automatically create Preview deployments with unique URLs.
- To rollback: In Cloudflare Pages → your project → Deployments, select a previous successful deployment and click "Rollback".
- Main branch pushes create Production deployments.
