## Cloudflare Pages deployment for `jewside.com`

This project ships an Express + MongoDB API and a static frontend. Cloudflare Pages can host the static site, but the API must run elsewhere (Render, Fly.io, Railway, a Cloudflare Worker using an HTTP-friendly database, etc.). The frontend is now wired to call `https://api.jewside.com` by default and can be overridden via the `<meta name="api-base">` tag or `window.__JEWSIDE_API_BASE__`.

### 1) Stand up the API
- Deploy the existing `server.js` app to a Node host that supports MongoDB (e.g., Render, Railway, Fly.io, VPS).  
- Environment variables required: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ALLOWED_ORIGINS`.  
- Set `ALLOWED_ORIGINS` to include the Pages domain and the custom domain:
  `https://jewside.com,https://www.jewside.com,https://api.jewside.com`.
- Point `api.jewside.com` at the API host (CNAME/ALIAS as required by your provider) and enable HTTPS there.

### 2) Configure Cloudflare Pages
- Project type: **Direct upload / No build**.
- Build command: leave empty.
- Output directory: `public`.
- Environment variables (optional):
  - `JEWSIDE_API_BASE=https://api.jewside.com` if you prefer to inject via a small pre-upload replace step; otherwise the meta tag already sets it.

### 3) Hook the frontend to the API
- The frontend reads `<meta name="api-base">` in `public/index.html`. It is set to `https://api.jewside.com`; update if your API lives elsewhere.
- For local dev, the app still falls back to `http://localhost:3000`.

### 4) Connect the custom domain
1. In Cloudflare Pages → Custom Domains, add `jewside.com` and `www.jewside.com`.
2. Accept the suggested DNS records (CNAMEs to `pages.dev` target).
3. Wait for DNS + SSL to provision.

### 5) Post-deploy checks
- Visit `https://jewside.com/api/health` to confirm the rewrite is hitting your API (or call the API host directly).
- Verify CORS: requests from `https://jewside.com` should succeed; fix `ALLOWED_ORIGINS` otherwise.
- Validate admin login flows and CRUD from the hosted site.

### Notes
- Cloudflare Pages Functions cannot speak to MongoDB over TCP; use an HTTP-based data API or a different database if you want to migrate the API into Cloudflare Workers later.
- If you change the API host, update the meta tag and CORS origins, then redeploy the static site.

