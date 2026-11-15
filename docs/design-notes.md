# Brielle Edge Solutions Ltd. — Design Notes & Reference Audit

## 1. Reference Inventory & Dimensions

| Reference Asset | Original Size | Role in Build | Key Observations |
|---|---|---|---|
| `media_1794702955851_60d06f35.jpg` (ANTravel Hero) | `1024 x 715 px` (Desktop 1440 px layout scale) | **Hero Section Architecture** | Airy `#FFFFFF` canvas, 5-link center nav with short accent bar under active link, secondary + primary CTA pills on right. Left: 3-line condensed uppercase display H1 (`line-height: 1.02`), concise body lead, floating tabbed enquiry bar (`3 tabs` overlapping white pill container with structured inputs + primary CTA). Right: giant accent circle containing subtle dotted world map, layered subject cutout, dashed flight orbit arc with jet, and 5 crisp white floating service badges (`rounded-xl`, soft shadow, square tinted icon chip). Concentric low-opacity rings radiate from behind the globe. |
| `media_1794702955825_004f4da7.png` (Wanderlux Full UI) | `254 x 1024 px` (Full-page desktop vertical scroll reference, 1440 px layout scale) | **Full-Page Section Rhythm & Downstream UI** | Clear alternation of pure `#FFFFFF` white space and soft `#F3F6FD` rounded full-bleed sections (`border-radius: 28px–36px`). Asymmetric 2-column section intros (`horizontal rule + uppercase eyebrow` left, bold headline + supporting prose right). Section flow: About + 3 bold KPIs + 2 asymmetric photos -> 3-card Showcase Carousel with notched top-right diagonal arrow badges -> Asymmetric Bento Offers (wide pale landmark banner + 1 wide brand-color hero card + 2 vertical photo cards with bottom-right arrow badges) -> 2-up Testimonial Carousel beside large lifestyle photo -> Full-bleed dark rounded atmospheric CTA banner -> Oversized signature brand footer (`Brielle Edge.`) with rounded top corners, inline callback/newsletter bar, centered links, and social circles. |
| `media_1794702955800_776cf697.jpg` (Brielle Flyer) | `682 x 1024 px` | **Brand Voice, Palette & 3-Pillar Content Hierarchy** | Tagline `"Your World, Handled."` (`Your World,` in Navy, `Handled.` in Amber-Gold). Three core pillars in pill-shaped deep navy banners with white circular icon badges and right-bleeding photography (`Brielle Travels`, `Event Management`, `Brielle Errands`). Footer navy ribbon with gold wave accent, Port Harcourt address, two phone lines, email, and `@brielleedge` / `@brielleedgesolutions` handles. |
| `media_1794702955799_6045970e.jpg` (Brand Logo) | `1024 x 1024 px` | **Vector SVG Logo & Primary Brand Tokens** | Solid `#0A2471` Royal Navy ground, radiant `#FFB909` Golden Amber 3-plume soaring wing mark positioned above the first `l` of bold italic `#FFFFFF` stacked wordmark `Brielle Edge` / `Solutions`. |

---

## 2. Color System & Contrast Audit Tokens

Sampled directly from the Brielle Logo and Flyer (`#0A2471`, `#FFB909`, `#F9B202`, `#F3F6FD`), tuned for WCAG AA/AAA compliance:

```css
:root {
  /* Core Brand Palette (from Logo & Flyer) */
  --brand-navy: #0A2471;          /* Logo background & primary brand ink */
  --brand-navy-deep: #061547;     /* Flyer dark anchor, high-contrast button fill */
  --brand-navy-ink: #0A1638;      /* Primary dark body copy */
  --brand-gold: #FFB909;          /* Logo wing & hero focal circle fill */
  --brand-gold-rich: #F9B202;     /* Flyer warm gold gradient accent */

  /* Contrast-Safe Text Shades Derived from Brand Gold */
  --gold-text-display: #B47300;   /* 3.89:1 on #FFFFFF (AA Large >= 48px bold) */
  --gold-text-ui: #9C6000;        /* 5.14:1 on #FFFFFF (AA Normal text & labels) */
  --gold-text-mist: #8D5600;      /* 5.60:1 on #F3F6FD (AA Normal text on mist cards) */

  /* Neutrals & Tinted Surfaces (from Flyer & Wanderlux rhythm) */
  --surface-white: #FFFFFF;
  --surface-mist: #F3F6FD;        /* Sampled flyer cool light surface */
  --surface-warm: #FFF8E6;        /* Soft gold tint for featured banners & hero rings */
  --ink-muted: #475577;           /* 7.41:1 on #FFFFFF, 6.85:1 on #F3F6FD */
  --border-subtle: rgba(10, 36, 113, 0.10);
}
```

### Key Contrast Decisions
- Never set `#FFB909` text on `#FFFFFF` (`1.72:1` — fails WCAG AA) or `#FFFFFF` text on `#FFB909` (`1.72:1` — fails WCAG AA).
- All `#FFB909` golden buttons, pill tags, and Bento cards use `--brand-navy-deep` (`#061547`, **10.11:1**) or `--brand-navy` (`#0A2471`, **8.11:1**) text.
- All `#0A2471` / `#061547` navy containers use `#FFFFFF` (**13.97:1 – 17.41:1**) or `#FFB909` (**8.11:1 – 10.11:1**) text.
- Large display gold highlight in Hero H1 uses `#B47300` (**3.89:1**, AA large text pass); small labels/eyebrows/quotes on white use `#9C6000` (**5.14:1**) and on mist use `#8D5600` (**5.60:1**).

---

## 3. Typography & Type Scale

- **Hero Display (`--font-condensed`)**: `'Barlow Condensed', 'Arial Narrow', sans-serif` (700, 800) — matches the tall, condensed geometric uppercase authority of `LET'S GO! / THE ADVENTURE IS / WAITING FOR YOU` in the Hero reference.
- **Brand UI, Editorial Headings & Body (`--font-sans`)**: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif` (400, 500, 600, 700, 800) — harmonizes with both the rounded geometric Brielle logo wordmark and the crisp Wanderlux UI headings/oversized footer wordmark.
- **Fluid Scale (`clamp()`):**
  - Hero H1: `clamp(2.85rem, 6.2vw, 4.75rem)` (`45.6px` -> `76px`), `line-height: 0.98`, `letter-spacing: -0.015em`.
  - Section H2: `clamp(1.75rem, 3.2vw, 2.75rem)` (`28px` -> `44px`), `line-height: 1.15`.
  - Editorial Intro Lead: `clamp(1.25rem, 2.1vw, 1.75rem)` (`20px` -> `28px`), `line-height: 1.35`.
  - Body text: `clamp(1rem, 0.25vw + 0.95rem, 1.0625rem)` (strictly `>= 16px` across all viewports).
  - Giant Footer Wordmark: `clamp(3.25rem, 15.2vw, 13.75rem)` (`letter-spacing: -0.035em`).

---

## 4. Layout Tree & Responsive Strategy

1. **Header (`<header class="site-header">`)**: Single row, max-width `1320px`, Brielle SVG logo left, 5 anchor links center (`Services`, `Packages`, `Divisions`, `About`, `Contact`), `WhatsApp Us` + `Call Desk` actions right; collapses cleanly to hamburger button (`aria-expanded`, `aria-controls`, focus-trapped slide-over drawer) below `1024px`.
2. **Hero (`#hero`)**: `min-height: 100dvh` (`100vh` fallback) on desktop/tablet without clipping; 2-column grid (`1.05fr 1fr`) above `1024px`, single stacked column below `1024px`. Left: H1 + subtitle + interactive 3-tab Quick Concierge Enquiry widget (`Travels` / `Events` / `Errands`). Right: concentric warm-gold rings + `#FFB909` globe circle with dotted world map SVG + dashed curved flight path + subject visual + 5 floating service pills (gracefully responsive on mobile so nothing overflows `320px`).
3. **About & Leadership (`#about`)**: Asymmetric Wanderlux layout: left `About Brielle Edge` rule, right editorial narrative highlighting **Brielle Edge Solutions Ltd.**, Port Harcourt office, and **Siya Joshua / Siya Ideriah** (`7+` years travel industry experience). Below: 3 real KPI figures (`7+` Years Industry Experience, `3` Core Service Divisions, `24/7` Travel Assistance) + dual asymmetric photography cards + consultation CTA.
4. **Signature Packages Carousel (`#packages`)**: `#F3F6FD` rounded container (`border-radius: clamp(20px, 3vw, 36px)`). Header + Swiper `<` `>` controls + 6 division/service cards (Canada/Italy/China Visas, Oman/Serbia/NZ Relocation, Flights & Global Stays, Weddings & Private Parties, Corporate Functions, Personal & Corporate Errands) with notched top-right circular `↗` triggers that pre-select the corresponding enquiry tab/topic.
5. **Core Divisions & Focus Bento Grid (`#divisions`)**: Wide `#FFF8E6` global destination & visa desk banner with landmark skyline visual -> 3-card asymmetric row (`1.4fr 1fr 1fr` on desktop, single/2-col adaptive on tablet/mobile): Gold Brielle Travels card + two dark photographic cards for Brielle Events and Brielle Errands.
6. **Client Experiences (`#proof`)**: `#F3F6FD` rounded container with left lounge editorial photo + right 2-up Swiper carousel of `[Placeholder]` client review cards (strictly preserving zero fabricated reviews/ratings!).
7. **Consultation & Contact Desk (`#contact`)**: Clean 2-column contact block matching the Wanderlux design language — Port Harcourt office card (`Ebtregarth Balm Plaza, Opposite Toskay Oil & Gas Station, SARS Road, Port Harcourt, Rivers State`), clickable `tel:` links (`+234 816 920 3706`, `+234 815 905 3176`), WhatsApp quick launch, email, social handles, and static accessible Consultation Form (`>= 16px` inputs, `inputmode`, `autocomplete`, `enterkeyhint`, visible labels, static validation UI, `<!-- TODO: connect to a form service -->`).
8. **Full-Bleed Atmospheric CTA Banner**: Rounded twilight photography container with dark navy gradient scrim, centered headline `"Your World, Handled."`, and high-contrast WhatsApp/Call CTAs.
9. **Signature Giant Footer + Mobile Sticky Action Bar**: Deep `#0A2471` rounded-top footer with inline quick callback input bar, nav links, oversized `Brielle Edge.` edge-to-edge display typography, and social/legal bottom bar. On `< 1024px`, a dedicated safe-area-aware sticky bottom Call + WhatsApp action bar sits above `env(safe-area-inset-bottom)` with matching footer clearance padding.

---

## 5. Radii, Shadows & Motion Feel

- **Radii**: `--radius-sm: 12px` (icon chips), `--radius-md: 18px` (cards, floating pills), `--radius-lg: 26px` (section photos, bento cards), `--radius-xl: 36px` (section containers), `--radius-pill: 9999px` (buttons & flyer-inspired badges).
- **Shadows**: Soft navy-tinted elevation (`0 18px 48px rgba(10, 36, 113, 0.08)` for floating hero widget & service badges; `0 8px 24px rgba(10, 36, 113, 0.06)` for testimonial cards).
- **Motion**: Crisp, unhurried concierge poise (`0.55s–0.85s`, `power3.out`). Hero entrance staggers H1 lines, quick-enquiry bar, globe ring scale, and floating pill arrival. ScrollTrigger reveals downstream sections once cleanly (`once: true`) on `transform` & `opacity` only; disabled/simplified on `< 768px` via `gsap.matchMedia()` and fully bypassed under `prefers-reduced-motion: reduce`. Lenis smooth scroll enabled on fine-pointer desktop, native touch scrolling preserved on mobile/touch.
