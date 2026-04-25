# SEO Action Plan — deosoriginals.com

## CRITICAL — Fix today

### C1. Fix SPA 404s on all internal routes
Add `vercel.json` at repo root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "redirects": [
    { "source": "/", "destination": "/", "has": [{ "type": "host", "value": "deosoriginals.com" }], "permanent": true }
  ]
}
```
Also change apex→www redirect from **307 → 301** (permanent) via Vercel domain settings to consolidate link equity.

### C2. Add robots.txt
`public/robots.txt`:
```
User-agent: *
Allow: /

# AI crawlers
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://www.deosoriginals.com/sitemap.xml
```

### C3. Add sitemap.xml
Generate at build time with `vite-plugin-sitemap` listing every route in your React Router.

### C4. Server-render or prerender content
**Best:** migrate to Next.js (App Router) — biggest SEO ROI for an agency site.
**Faster:** add `vite-plugin-prerender-spa` or `react-snap` to emit static HTML per route at build.
Without this, AI crawlers and Bing index nothing.

### C5. Add canonical, OG, Twitter, JSON-LD to `index.html`
```html
<link rel="canonical" href="https://www.deosoriginals.com/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Deos Originals — Content Powerhouse" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://www.deosoriginals.com/og-default.jpg" />
<meta property="og:url" content="https://www.deosoriginals.com/" />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json">{ "@context":"https://schema.org", "@type":"Organization", "name":"Deos Originals", "url":"https://www.deosoriginals.com", "logo":"https://www.deosoriginals.com/logo.png", "sameAs":[/* IG, LinkedIn, X URLs */] }</script>
```
For prerendered routes, generate **per-page** canonical/OG/JSON-LD via `react-helmet-async` (or Next.js `metadata`).

---

## HIGH — Fix this week

### H1. Security headers
Add to `vercel.json`:
```json
"headers": [{ "source": "/(.*)", "headers": [
  { "key": "X-Content-Type-Options", "value": "nosniff" },
  { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
  { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
  { "key": "Permissions-Policy", "value": "geolocation=(), camera=(), microphone=()" }
]}]
```

### H2. llms.txt for AI discoverability
Create `public/llms.txt`:
```
# Deos Originals
> Marketing/content/branding agency.

## Services
- Content strategy: /services/content
- Branding: /services/branding
- Performance marketing: /services/performance

## About
- Team: /about
- Case studies: /work
- Contact: /contact
```

### H3. Per-route titles + meta descriptions
Use `react-helmet-async`. Each route needs a unique, keyword-aligned title (≤60 ch) and description (≤155 ch).

### H4. Add `<h1>` and semantic structure to every route
One `<h1>` per page, descriptive `<h2>`/`<h3>` hierarchy, real `<a>` tags (not div-onClick).

### H5. Submit to Google Search Console + Bing Webmaster Tools
Verify domain → submit sitemap → request indexing for primary pages.

---

## MEDIUM — Fix this month

- M1. Self-host critical fonts (Fjalla One, Inter) with `<link rel="preload">`; remove render-blocking Google Fonts CSS for above-the-fold.
- M2. Add `Service`, `BreadcrumbList`, `Person` (founders), `CreativeWork` (case studies) JSON-LD.
- M3. Image optimization pass: WebP/AVIF, explicit `width`/`height`, `loading="lazy"` below fold, descriptive alt text.
- M4. Internal linking: from homepage hero → services → case studies → contact, real anchor text.
- M5. Blog/insights section to capture top-of-funnel keywords (agency selection, content frameworks, brand strategy).
- M6. Configure CrUX/GSC API access and re-run audit with field data.

---

## LOW — Backlog

- L1. Author bio pages with `Person` schema and `sameAs` to LinkedIn (E-E-A-T).
- L2. FAQ schema on services pages.
- L3. CSP header (after auditing third-party scripts).
- L4. Hreflang if expanding internationally.
- L5. Image SERP optimization (filename, alt, surrounding text, IPTC metadata).

---

## Implementation Roadmap

| Week | Deliverables |
|---|---|
| 1 | C1–C5 + H1, H5 — site becomes crawlable & indexable |
| 2 | H2–H4 — per-route SEO + AI discoverability |
| 3–4 | M1–M4 — performance, schema depth, image cleanup |
| 5–8 | M5 (blog launch), L1–L2 (E-E-A-T) |

**Expected impact:** moving from 24 → 75+ health score is achievable in 2–3 weeks because most issues are foundational/one-time fixes, not content debt.
