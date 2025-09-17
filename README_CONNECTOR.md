# JewSide Connector (Static)
This is a minimal static landing + Cloudflare Pages Functions to verify your pipeline.

## Local preview (with Wrangler)
- You can preview via Cloudflare CLI: `npx wrangler pages dev`
- Then open http://localhost:8788
- Visit `/api/status` and `/healthcheck`

## Deploy (Git → Cloudflare Pages)
1) Push this repo to GitHub (`main` branch).
2) Cloudflare Dashboard → Workers & Pages → **Create application** → **Pages** → Connect to Git → select repo.
3) Build command: **None** (static) or `echo "ok"` ; Output dir: root.
4) Custom domains: Project → **Custom domains** → add `jewside.com`.

When live, `index.html` calls `/api/status` which shows { ok, branch, commit, url, hostname, timestamp }.
Link the buttons to your real routes as you add them (Explore/Prayers/Videos/Admin).

## Design System & Theming

The JewSide Connector uses a dynamic theming system with three gradient themes:

### Available Themes

1. **Aurora** (Default)
   - Primary colors: Indigo → Cyan → Teal
   - Brand color: `#4F46E5` (Indigo-600)
   - Accent color: `#06B6D4` (Cyan-500)

2. **Royal**
   - Primary colors: Purple → Violet → Blue
   - Brand color: `#7C3AED` (Purple-600)
   - Accent color: `#8B5CF6` (Violet-500)

3. **Sunset**
   - Primary colors: Pink → Orange → Amber
   - Brand color: `#DB2777` (Pink-600)
   - Accent color: `#F97316` (Orange-500)

### Adding New Themes

To add a new theme:

1. Add a new CSS variable set in `styles.css`:
```css
html[data-theme="new-theme-name"] {
  --bg-grad-1: R, G, B; /* Primary gradient start */
  --bg-grad-2: R, G, B; /* Primary gradient middle */
  --bg-grad-3: R, G, B; /* Primary gradient end */
  --brand-600: R, G, B; /* Brand color */
  --accent-400: R, G, B; /* Accent color */
  --ring: rgba(R, G, B, 0.5); /* Focus ring (brand color with opacity) */
}
```

2. Add a new theme pill in the HTML:
```html
<button class="theme-pill new-theme-pill" data-theme="new-theme-name" aria-label="New theme name"></button>
```

3. Add the theme pill styles in `styles.css`:
```css
.new-theme-pill {
  background: linear-gradient(135deg, rgb(R, G, B), rgb(R, G, B));
}
```

4. Add the theme color to the theme-color meta tag mapping in the JavaScript:
```javascript
const themeColors = {
  // Existing themes...
  'new-theme-name': '#RRGGBB'
};
```

## Cloudflare UI Settings (Static)
- Build command: None
- Deploy command: None
- Output directory: /
- Custom domain: status.jewside.com (recommended)
- Enable: Always Use HTTPS + HSTS

### Test after deploy
- Visit `/healthcheck` → should show `OK`
- Visit `/api/status` → should return JSON with { ok, branch, commit, url, hostname, timestamp }