# Brielle Edge Solutions Ltd. — Landing Page

Responsive single-page website built with semantic HTML, CSS custom properties, and vanilla JavaScript (GSAP + ScrollTrigger, Lenis, Swiper) for **Brielle Edge Solutions Ltd.** (Port Harcourt, Nigeria).

## Project Structure

```text
index.html
404.html
robots.txt
sitemap.xml
.nojekyll
css/style.css           Design tokens in :root + fluid responsive layout
js/main.js              Navigation drawer, hero tab switcher, carousels, static forms, animations
docs/design-notes.md    Reference audit, hex sampling, WCAG contrast decisions, typography scale
assets/svg/             Reproduced vector brand logos and destination landmarks illustration
assets/img/             Responsive desktop/mobile WebP photographs & Open Graph social card
```

## Quick Customization (`EDIT` Markers)

Search for `<!-- EDIT:` in `index.html`, `robots.txt`, and `sitemap.xml` to update any item:

| Marker | Where | Purpose |
|---|---|---|
| `<!-- EDIT: domain -->` | `index.html`, `robots.txt`, `sitemap.xml` | Canonical URL, Open Graph URL, Sitemap domain |
| `<!-- EDIT: logo -->` | `index.html` header | Inline vector brand logo lockup |
| `<!-- EDIT: phone & WhatsApp numbers -->` | `index.html`, `js/main.js` (`WHATSAPP_NUMBER`) | Desk phone numbers & WhatsApp routing |
| `<!-- EDIT: address -->` | `index.html` drawer, `#contact`, footer | Physical office address |
| `<!-- EDIT: opening hours & social handles -->` | `index.html` `#contact`, footer | Verified desk operating hours and social URLs |
| `<!-- EDIT: testimonials -->` | `index.html` `#proof` | Replace `[Placeholder]` cards with verified client quotes |
| `<!-- TODO: connect to a form service -->` | `index.html` `#consultation-form`, footer callback | Connect form endpoint (e.g., Formspree / Web3Forms / backend) |

## Design Tokens (`css/style.css` `:root`)

| Token | Default Value | Role |
|---|---|---|
| `--brand-navy` | `#0a2471` | Primary brand navy (Logo background) |
| `--brand-navy-deep` | `#061547` | High-contrast ink on gold & dark surfaces |
| `--brand-gold` | `#ffb909` | Brand wing accent & hero circle fill |
| `--gold-text-display` | `#b47300` | WCAG AA large-text amber highlight on white |
| `--gold-text-ui` | `#9c6000` | WCAG AA normal-text amber accent on white |
| `--surface-mist` | `#f3f6fd` | Cool mist section surface |
| `--surface-warm` | `#fff8e6` | Warm cream featured banner & hero rings |

## Swapping the Brand Logo

Standalone SVG assets are stored in:
- `assets/svg/brielle-logo.svg` (dark navy wordmark + golden wing for light backgrounds)
- `assets/svg/brielle-logo-light.svg` (white wordmark + golden wing for dark backgrounds)
- `assets/svg/favicon.svg` (icon badge)

To swap the header logo, replace the inline `<svg class="brand-lockup__svg">` in `index.html` with `<img src="assets/svg/brielle-logo.svg" ...>` or your new SVG artwork.

## Deploying to GitHub Pages

1. Commit and push all files to your GitHub repository (`main` branch).
2. Go to **Settings -> Pages -> Build and deployment**.
3. Set Source to **Deploy from a branch**, select `main` and `/ (root)`, and click **Save**.
4. Because `.nojekyll` is present and all paths are relative (`css/style.css`, `assets/...`), the site serves cleanly from both `https://username.github.io/repo-name/` and a root custom domain.

### Adding a Custom Domain

1. Under **Settings -> Pages -> Custom domain**, enter `brielleedgesolutions.com` (or your chosen domain) and save.
2. Add DNS `A` / `CNAME` records at your domain registrar pointing to GitHub Pages.
3. Update the `<!-- EDIT: domain -->` tags in `index.html`, `robots.txt`, and `sitemap.xml`, then enable **Enforce HTTPS**.
