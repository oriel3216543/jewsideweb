# Cloudflare Pages Deploy (Wrangler / Custom Build)

This repo is a static site (root `index.html`) with Cloudflare Pages Functions in `/functions`. Deploy using Pages with a Custom Build that calls Wrangler.

## UI Settings (Pages → Project → Settings)

- Build command:
  ```
  echo "skip-build"
  ```
- Deploy command:
  ```
  npx wrangler pages deploy . --project-name=jewsideweb --account-id $CLOUDFLARE_ACCOUNT_ID
  ```
- Non-production deploy (Preview branches):
  ```
  npx wrangler pages deploy . --project-name=jewsideweb --account-id $CLOUDFLARE_ACCOUNT_ID --branch $CF_PAGES_BRANCH
  ```
- Output directory: `/` (root)
- Variables & Secrets:
  - Add `CLOUDFLARE_ACCOUNT_ID` (Account → Overview → API)

## API Token (for CI or UI Deploy Command)
- Create an API Token with scopes:
  - Account → Cloudflare Pages: Edit
  - Account → Workers Scripts: Edit
- Token must belong to the same account as `$CLOUDFLARE_ACCOUNT_ID`.

## Security & Headers
- `_headers` includes:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Cache-Control: public, max-age=300`
- `_redirects` includes:
  - `www.jewside.com https://jewside.com 301`

## Validate
- Local preview:
  ```bash
  npx wrangler pages dev
  ```
  Then open `http://localhost:8788`.
- Endpoints:
  - `/healthcheck` → `OK`
  - `/api/status` → JSON `{ ok, branch, commit, url, hostname, timestamp }`

## Notes
- Pages Functions run on the edge; responses set `cache-control: no-store`.
- No build step required; static files are served from root.
