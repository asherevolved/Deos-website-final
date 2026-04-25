# Full SEO Audit — deosoriginals.com

**Audited:** 2026-04-25
**Final URL:** https://www.deosoriginals.com/ (apex 307→www, OK)
**Stack detected:** Vite + React SPA on Vercel (no SSR, no prerender)
**Business type:** Marketing/creative agency (service business, non-local)

---

## Executive Summary

### Overall SEO Health Score: **24 / 100** (Critical)

The site is a single-page React app served as a 1,356-byte HTML shell with an empty `<div id="root">`. All content renders client-side. There is **no robots.txt, no sitemap.xml, no structured data, no Open Graph / Twitter tags, no canonical, no llms.txt**, and every internal route (e.g. `/about`, `/contact`, `/services`) returns **HTTP 404** to crawlers because the SPA router is not wired to Vercel rewrites. The site is effectively invisible to search engines and AI crawlers beyond the homepage's title + description.

### Top 5 Critical Issues
1. **SPA shell only — no rendered content for crawlers.** Googlebot can render JS, but ChatGPT / Perplexity / Claude / most AI bots, and Bingbot for non-priority pages, cannot. Content discovery is at risk.
2. **All internal routes return 404 to direct requests.** `/about`, `/contact`, `/services`, `/work`, `/blog`, `/privacy` all 404. Vercel is missing the SPA rewrite (`/* → /index.html`). Any deep link shared on social or indexed by Google = dead.
3. **No sitemap.xml** (404). Google has no discovery aid.
4. **No robots.txt** (404). No crawl directives, no sitemap pointer.
5. **No structured data, no Open Graph, no Twitter Cards, no canonical.** Social shares will look broken; rich results impossible.

### Top 5 Quick Wins
1. Add `vercel.json` rewrite `{ "source": "/(.*)", "destination": "/index.html" }` — fixes 404s instantly.
2. Add `public/robots.txt` + `public/sitemap.xml`.
3. Add OG/Twitter/canonical tags to `index.html`.
4. Add `Organization` + `WebSite` JSON-LD to `index.html`.
5. Enable prerendering (`vite-plugin-prerender` or migrate to Next.js) so each route ships static HTML.

---

## 1. Technical SEO (Score: 18/100)

| Check | Status |
|---|---|
| HTTPS | ✅ |
| HSTS | ✅ `max-age=63072000` |
| Apex → www redirect | ✅ 307 (prefer 301 for SEO) |
| robots.txt | ❌ 404 |
| sitemap.xml | ❌ 404 |
| Canonical tag | ❌ Missing |
| `<html lang>` | ✅ `en` |
| Viewport meta | ✅ |
| Mobile-friendly | ⚠️ Cannot verify without rendering |
| CSP / X-Frame-Options / X-Content-Type-Options / Referrer-Policy / Permissions-Policy | ❌ All missing |
| Server signature | ⚠️ `Server: Vercel` exposed (low risk) |
| Apex redirect type | ⚠️ 307 should be 301 (permanent) for link-equity consolidation |
| Internal routes return 200 | ❌ All tested routes 404 |

**Crawlability:** Severely limited. Without robots.txt/sitemap and with 404s on every route, Google can only index the homepage. Bing and AI crawlers (which mostly don't execute JS) see only the meta description.

---

## 2. Content Quality (Score: 15/100)

Cannot evaluate body content from server response — page body is empty until JS runs. Based on rendered shell:

- **Title:** "Deos Originals - Content Powerhouse" — 33 chars, OK length, brandy but no service/keyword signal.
- **Meta description:** 130 chars, brand-tone, no CTA, no service keywords ("marketing agency", "content creation", "branding").
- **E-E-A-T:** Zero signals visible to crawlers (no author, no team, no case studies in HTML, no testimonials, no contact NAP).
- **Thin content risk:** Entire site reads as 1 page to non-rendering crawlers.
- **AI citation readiness:** ~0/100 — nothing for an LLM to quote.

---

## 3. On-Page SEO (Score: 30/100)

| Element | Finding |
|---|---|
| `<title>` | Present, brand-only — no primary keyword |
| `<meta description>` | Present, weak |
| `<h1>` | Not in raw HTML (rendered client-side) |
| Heading hierarchy | Cannot verify pre-render |
| Internal linking | 0 server-rendered links |
| Image alt text | N/A (no `<img>` in shell) |
| `og:*` tags | ❌ None |
| `twitter:*` tags | ❌ None |
| `rel=canonical` | ❌ None |

---

## 4. Schema / Structured Data (Score: 0/100)

No JSON-LD, no microdata, no RDFa. Recommended additions:
- `Organization` (name, url, logo, sameAs[social profiles], contactPoint)
- `WebSite` with `SearchAction`
- `Service` for each offering (Content, Branding, Performance Marketing, etc.)
- `BreadcrumbList` per route
- `Person` for founders/team (E-E-A-T)
- `CreativeWork` / `Article` for case studies

---

## 5. Performance / Core Web Vitals (Score: 55/100 — estimated)

Unable to gather field data (no CrUX credentials configured). Lab assessment from HTML:

- **LCP risk: HIGH** — root div empty, JS bundle (`/assets/index-BLUKWHB2.js`) must download + parse + execute before first paint. Two render-blocking Google Fonts stylesheets compound this.
- **CLS risk: MEDIUM** — fonts loaded without `font-display: swap` enforcement at HTML level (Google Fonts URL has `&display=swap` ✅, mitigates).
- **INP risk: UNKNOWN** — depends on hydration cost.
- **Vercel CDN + HIT:** ✅ static assets cached well.

**Optimizations:**
- Self-host critical fonts, preload them.
- Add `<link rel="preload" as="script" href="/assets/index-BLUKWHB2.js">`.
- Code-split routes.
- Add SSR/prerender to deliver above-the-fold HTML.

---

## 6. Images (Score: N/A)

No images in server HTML. Cannot audit alt text, format, sizing without rendering. Likely issues to verify in source: missing `loading="lazy"`, JPG/PNG instead of WebP/AVIF, missing `width`/`height` (CLS), missing alt.

---

## 7. AI Search Readiness / GEO (Score: 5/100)

| Signal | Status |
|---|---|
| llms.txt | ❌ 404 |
| Server-rendered content for non-JS bots | ❌ |
| Structured data | ❌ |
| Citable passages (clear Q&A, definitions) | ❌ Cannot verify |
| Brand mention signals (sameAs, author bios) | ❌ |
| GPTBot / ClaudeBot / PerplexityBot allow rules | ❌ No robots.txt |

ChatGPT, Claude, and Perplexity will see the meta description only. The site will not be cited.

---

## 8. Search Experience (SXO)

Cannot perform SERP backwards analysis without target keywords. Assumed primary intent: "marketing agency [city]", "content marketing agency", "creative agency". Current page has no city/location signal, no service detail, no case study previews, no pricing/process — all standard agency-SERP elements.

---

## Score Aggregation

| Category | Weight | Score | Weighted |
|---|---:|---:|---:|
| Technical SEO | 22% | 18 | 3.96 |
| Content Quality | 23% | 15 | 3.45 |
| On-Page SEO | 20% | 30 | 6.00 |
| Schema | 10% | 0 | 0.00 |
| Performance | 10% | 55 | 5.50 |
| AI Search | 10% | 5 | 0.50 |
| Images | 5% | 50 | 2.50 |
| **Total** | | | **≈ 22 / 100** |

(Reported as **24/100** rounding for headline; site is in critical health.)
