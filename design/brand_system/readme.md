# A. Lloyd Flanagan — Design System

Personal/professional website for A. Lloyd Flanagan, a software developer — home, about, blog, education and "prompts" (an AI-build changelog) pages. The site is a small FastAPI + Jinja2 app with Lit web components and Shoelace primitives; it was built largely as an "AI-only" experiment (see `content/INDEX.md`).

**Sources consulted** (paths as given, read-only, may not be attached in future sessions):
- `lloydflanagan/` — the live codebase: `templates/*.html`, `static/css/variables.css`, `static/js/{site-header,markdown-card,blog-card}.js`, `content/*.md`, `PROMPTS.md`.
- `lloydflanagan/design/design_handoff_site_redesign/` — a design handoff package (`README.md`, `Home.dc.html`, `Site Wireframes.dc.html`, screenshots) documenting the **"Classic Column"** redesign direction, which is the current live design and this design system's ground truth.
- Uploaded images: `art_deco_logo_192x192.png` / `_1024x1024.png` / `_1024x1024_reduced_colors.png` (the live crest/logo), `grunge-paper-background-11.jpg` (page background texture).

**⚠️ Note on the brief:** the request that kicked off this design system asked for a "cyberpunk" look and included a second logo, `Futuristic AF and AI logo.png` (a glossy blue/purple bubble mark). That directly contradicts the actual, already-implemented brand: a parchment / dark-academia / art-deco identity with a gold-on-black crest, Playwrite New Zealand Basic wordmark and Georgia body copy — fully specified in `variables.css`, the redesign handoff doc, and the live Lit components. Per this system's own rule ("the attached kit is ground truth"), **this design system follows the existing parchment/art-deco brand**, not the cyberpunk brief. The futuristic logo was not used anywhere. Flagged for the user to confirm — see the end of this readme.

## Content fundamentals

- **Voice:** first person, understated, a little self-deprecating. "I consider it a success", "Everything should be as simple as possible, but not simpler." No sales language, no exclamation-heavy copy.
- **Casing:** sentence case for body copy and headings ("Welcome to my site", "The Prompts"); nav items and section labels are uppercase with wide letter-spacing as a *typographic* device, not a copy-style one.
- **Tone examples:**
  - INDEX.md: "This version of the site started as an AI experiment — could I create a website using only AI prompts? But all experiments must end..."
  - philosophy.md: "'Everything should be as simple as possible, but not simpler.' Is actually not what Einstein said, but it's pretty close."
  - about-me.md: "Father, Husband, Professional Programmer" — plain, comma-separated facts, no self-promotion.
- **Person:** "I"/"my", never addresses the reader as "you" except rarely, dryly ("assuming you were willing to pay for all the tokens").
- **Punctuation:** liberal em dashes for asides; middle dots (·) separate short label runs ("Father · Husband · Professional Programmer").
- **No emoji anywhere.** The only non-letter glyphs are an arrow (→ "Read more"), a down arrow (↓ résumé), an external-link arrow (↗ GitHub), and a checkmark-free ✕ close icon.

## Visual foundations

- **Palette:** parchment/aged-paper neutrals (`--parchment-lightest` #F8EDD4 → `--parchment-espresso` #3D1C08) sampled from the background texture, plus three cool accents used sparingly (slate blue for links/CTAs, sage for success, aged crimson for warnings). No blues-and-purples-gradient "AI" palette anywhere in the real product.
- **Type:** one display face used only for the brand wordmark and prompt numbers — **Playwrite New Zealand Basic** (a handwriting/cursive Google Font) — paired with **Georgia** for all reading content (headings, body, dates) and **system-ui** for chrome (nav, labels, buttons, the GitHub pill). This is a three-role system: cursive brand mark, serif reading voice, sans UI chrome — never mixed within one role.
- **Spacing:** one reading column, `max-width: 720px`, `padding: 0 24px 70px`. Cards: `28px 30px` desktop padding / `13px 14px` mobile, stacked with `30px` gaps.
- **Backgrounds:** every page sits on the same full-bleed, fixed-attachment parchment/grunge-paper photo texture (`grunge-paper-background-11.jpg`) under a translucent warm-white "lightening wash" gradient so body text stays legible on the grain. No stock photography, no illustrations, no gradients used decoratively — the *only* gradient in the system is that wash and the thin gold divider rule under the masthead.
- **Cards:** the one recurring surface. Semi-transparent parchment fill (`rgba(248,237,212,.66–.70)`), 1px light-parchment border, 14px radius, soft low-contrast espresso shadow (`0 3px 14px rgba(61,28,8,.08)`). No colored left-border accent strips, no drop shadows beyond that one soft value.
- **Animation:** effectively none — only a couple of 0.15s color/border-color transitions on nav hover. No fades, no bounces, no motion library.
- **Hover states:** nav/links darken toward espresso or shift to slate-blue; no lightening, no scale.
- **Press/active states:** active nav gets a 2px gold (`--color-active` #C09050) bottom border (desktop) or a filled gold-tinted background (mobile drawer) — never a color inversion.
- **Borders:** hairline (1px, sometimes 1.5px), always the light-parchment token; never heavier, never colored per-component.
- **Shadows:** one soft espresso-tinted card shadow reused everywhere (crest and GitHub pill get slightly stronger variants of the same value — never a second shadow "system").
- **Transparency/blur:** cards use alpha transparency (not blur) so the paper grain reads faintly through them; the opaque `--color-surface-card-solid` variant exists for spots where that transparency would hurt contrast (e.g. small chips). No backdrop-filter/blur anywhere.
- **Corner radii:** 14px cards, 8px buttons/blocks, 12–13px crest/avatar, 22px GitHub pill, 20px chips — a small, consistent family, no fully-round buttons except the pill.
- **Layout rules:** single fixed element — the top-right GitHub pill; everything else scrolls with the page. One breakpoint (~640px) collapses the centered masthead + row nav into a left-aligned brand + hamburger + full-screen drawer.
- **Imagery color vibe:** warm sepia/parchment tones throughout (from the one background texture); the About page portrait is a plain photographic avatar, not stylized.

## Iconography

There is no icon font or SVG icon set in the codebase. The entire "iconography" is: a handful of Unicode glyphs used as inline text (→, ↓, ↗, ✕, ✓-free) and the hamburger, which is three literal `<span>` bars (not a glyph). No emoji. No icon library is linked. If a consuming project needs real icons, pick a thin-stroke set (e.g. Lucide) that doesn't fight the serif/cursive pairing, and flag the substitution — none is bundled here because the source defines none.

## Assets

- `assets/logo/art-deco-crest-192.png`, `-1024.png`, `-1024-reduced.png` — the live crest/logo (gold art-deco frame, black ground), used at 60×60/13px-radius in the masthead.
- `assets/avatar/lloyd-avatar.png` — the About page portrait.
- `assets/textures/parchment-paper.jpg` — the full-bleed page background texture.
- **Not included:** `Futuristic AF and AI logo.png` (uploaded but not used anywhere in the live site or handoff spec — see the caveat above).

## Components

Sourced from the site's actual component inventory (Lit components + the recurring inline card/label/button patterns in the templates) — no invented primitives beyond the ones below.

- **Masthead** (`components/navigation/`) — centered crest, brand wordmark, tagline, nav with gold active-underline, fixed GitHub pill, mobile hamburger + drawer. Recreates `site-header.js`.
- **MarkdownCard** (`components/content/`) — the parchment card shell around rendered markdown. Recreates `markdown-card.js`.
- **BlogCard** (`components/content/`) — full and `preview` (compact list-row) blog-post card. Recreates `blog-card.js`.
- **Card** (`components/layout/`) — *intentional addition.* The bare `.card`/`sl-card` shell is hand-rolled inline in `prompts.html` and `design.html` rather than componentized in the source; factored out here since every page repeats the identical style.
- **SectionLabel** (`components/layout/`) — *intentional addition.* The uppercase gold label pattern ("Recent writing", "University", "Professional Development") repeats across templates without its own component in source.
- **Button** (`components/actions/`) — *intentional addition.* The `.hf-btn` résumé-download link style from the About screen spec, factored into a reusable primitive.

## UI kit

`ui_kits/site/` — an interactive click-through recreation of the five real pages (Home, About, Blog, Education, Prompts) plus the mobile nav drawer, built from the Classic Column handoff spec and the live templates/content.

## Index

- `styles.css` — imports all tokens (root stylesheet consumers link).
- `tokens/colors.css`, `tokens/typography.css`, `tokens/effects.css` — primitive + semantic custom properties.
- `guidelines/*.html` — foundation specimen cards (Colors, Type, Effects, Spacing, Brand).
- `assets/` — logo, avatar, background texture.
- `components/navigation/Masthead.*`, `components/content/{MarkdownCard,BlogCard}.*`, `components/layout/{Card,SectionLabel}.*`, `components/actions/Button.*`.
- `ui_kits/site/` — the click-through site recreation.
- `reference/PROMPTS.md` — copy of the site's own build-prompt log, kept for content reference.
- `SKILL.md` — Claude-Code-compatible skill wrapper for this design system.

## Caveats / ask

1. **Brand direction conflict:** the brief asked for "cyberpunk" + a glossy blue/purple AI logo; the actual codebase implements a fully-realized parchment/dark-academia/art-deco brand. I built this system to match the live product (per the "attached kit is ground truth" rule) rather than override it. **Please confirm:** keep the parchment/art-deco direction (recommended — it's real, shipped, and coherent), or do you actually want a from-scratch cyberpunk rebrand replacing it?
2. Playwrite New Zealand Basic is loaded live from Google Fonts (as the real site does) — no font files were vendored, so there's nothing to flag as a substitution.
3. The mobile hamburger drawer and nav are re-created visually in React; exact Lit-component state transitions weren't ported (this is a design system, not the app itself).
