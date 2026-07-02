# Handoff: A. Lloyd Flanagan — Site Redesign (Classic Column direction)

## Overview
A full redesign of the personal site (Home, About, Blog, Education, Prompts +
shared header/nav). Five whole-site directions were explored as low-fi
wireframes; the chosen direction — **Classic Column (1a)** — was then taken to
high fidelity for every page, plus mobile. This package documents that chosen
direction so it can be built into the real site.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes
that show the intended look, layout, and behavior. They are **not** production
code to copy verbatim.

This project already has a codebase:

- **Backend:** FastAPI + Jinja2 templates (`templates/*.html` extending
  `base.html`)
- **Frontend:** Lit web components (`site-header`, `markdown-card`, and a
  planned `blog-card`)
- **UI library:** Shoelace v2 (`sl-card`, etc.)
- **Tokens:** `static/css/variables.css` (the parchment palette — already the
  source of truth)
- **Font:** Playwrite New Zealand Basic (Google Fonts), Georgia for body

The task is to **recreate these designs inside that existing environment**,
reusing the Lit components, the Shoelace primitives, and the `variables.css`
tokens — not to ship the HTML prototypes directly. The prototype CSS hardcodes
hex values for portability; in the real codebase **use the `var(--…)` tokens
instead** (mapping table below).

## Fidelity
**Mixed — implement to the high-fidelity spec.**

- **High-fidelity (use pixel-perfect):** The Classic Column page set —
  `Home.dc.html` and turn 4 of `Site Wireframes.dc.html` (options `4a`–`4f`).
  Final colors, type, spacing, and the paper texture. Recreate these exactly,
  using `variables.css` tokens and the existing components.
- **Low-fidelity (use as structural guide only):** Turns 1–3 of
  `Site Wireframes.dc.html` — the five direction explorations (`1a`–`1e`), the
  full per-page wireframes (`2a`–`2f`), and the mobile wireframes (`3a`–`3e`).
  These show structure/flow for the alternate directions and are reference, not
  build targets, unless you decide to revisit a different direction.

---

## Design System (Classic Column)

A single **centered masthead** tops every page, followed by one calm reading
column of cards. The masthead is the existing `site-header` component; page
bodies are rendered by `markdown-card` / the planned `blog-card`.

### Masthead (shared `site-header`)
Centered, vertical stack, on the paper texture:
1. **Crest** — the art-deco "AF AI" logo, 60×60px, `border-radius: 13px`,
   `box-shadow: 0 3px 11px rgba(61,28,8,.32)`. (Desktop only; optional.)
2. **Brand name** — "A. Lloyd Flanagan", Playwrite New Zealand Basic, 40px
   desktop / 16px mobile, color `--color-text-primary` (#3D1C08),
   `line-height: 1.35`.
3. **Tagline** — "Father · Husband · Professional Programmer", Georgia italic,
   15px, color `--color-text-secondary` (#8B5A2B).
4. **Nav** — flex row, centered, `gap: 26px`. Each item: system-ui, 12px,
   weight 600, `letter-spacing: .14em`, `text-transform: uppercase`, color
   `--color-text-secondary` (#8B5A2B). **Active item:** color #3D1C08 with a
   2px `--color-active` (#C09050) bottom border (`padding-bottom: 4px`). Order:
   Home · About · Blog · Education · Prompts.
5. **Divider rule** — 1px, `max-width: 560px`,
   `background: linear-gradient(90deg, transparent, rgba(192,144,80,.6), transparent)`,
   `margin-top: 30px`.
6. **GitHub link** — fixed top-right pill, system-ui 11px/600,
   `letter-spacing: .08em`, uppercase, color #8B5A2B,
   `background: rgba(248,237,212,.78)`, 1px #E4C98A border, `border-radius: 22px`,
   `padding: 7px 14px`. Links to the repo.

**Mobile masthead:** brand left-aligned (16px) + hamburger right (3 bars, 19px
wide, 2px, #3D1C08). Tapping opens a full-screen drawer: vertical list of nav
items as tap targets (`padding: 11px 13px`, `border-radius: 9px`,
`background: rgba(248,237,212,.6)`, 1px #E4C98A; active gets #C09050 border +
`rgba(192,144,80,.14)` fill). Each page shows a small uppercase current-page
label (the "crumb") under the divider for context.

### Cards
`background: rgba(248,237,212,.66)` → use `--color-surface-card`.
`border: 1px solid #E4C98A` → `--color-border-subtle`.
`border-radius: 14px`, `box-shadow: 0 3px 14px rgba(61,28,8,.08)`,
`padding: 28px 30px` (desktop). `margin-top: 30px` between stacked cards.
These map cleanly onto Shoelace `sl-card`.

### Page background
`linear-gradient(rgba(250,243,226,.55), rgba(250,243,226,.55))` over
`#ecdcbb url('grunge-paper-background-11.jpg')`, `background-size: cover`,
`background-attachment: fixed`. The gradient overlay is a **lightening layer**
added in this redesign so body copy reads more comfortably than on the raw
texture — keep it.

### Reading column
`max-width: 720px`, centered (`margin: 0 auto`), `padding: 0 24px 70px`.

---

## Screens / Views

### 1. Home (`4a`, and full page in `Home.dc.html`)
- **Purpose:** Landing — welcome message + recent writing.
- **Layout:** Masthead → "Welcome" card → "Recent writing" section label →
  list of recent post cards.
- **Welcome card:** `h2` "Welcome to my site" (Georgia bold, 25px,
  `margin: 0 0 13px`) + two paragraphs (Georgia, 16px, `line-height: 1.75`).
  Copy (from `content/INDEX.md`):
  > "This version of the site started as an AI experiment — could I create a
  > website using only AI prompts?"
  > "But all experiments must end. In this case, it ended when I started to run
  > out of my weekly token allowance. I consider it a success: I think I showed
  > you could build a site using AI alone, assuming you were willing to pay for
  > all the tokens."
- **Section label** "Recent writing": system-ui 12px/700,
  `letter-spacing: .16em`, uppercase, color #C09050 (`--color-active`),
  `margin: 44px 0 2px`.
- **Post row:** title (Georgia bold, 19px, #3D1C08, links to post) on the left,
  italic date (Georgia italic, 13px, #8B5A2B) on the right (baseline-aligned,
  space-between); excerpt below (Georgia, 15px, `line-height: 1.7`); "Read
  more →" link (system-ui 11.5px/600, uppercase, `letter-spacing: .07em`, color
  #4A6D8C / `--color-link`). Rows separated by a
  `1px solid rgba(192,144,80,.32)` bottom border; last row no border.

### 2. About (`4b`)
- **Purpose:** Personal info + résumé.
- **Layout:** Masthead → one card (row: portrait + details) → résumé button.
- **Portrait:** `assets/avatar.png`, 92×92px, `border-radius: 12px`,
  `object-fit: cover`, 1.5px #E4C98A border, `box-shadow: 0 2px 7px rgba(61,28,8,.15)`.
- **Details** (Georgia): name (bold 17px), then meta lines (11.5px, color
  #5c3a18) — "North Chesterfield, VA", "lloyd.flanagan@pm.me", a short divider
  rule, "Father · Husband · Professional Programmer", "BS, Computer Science —
  VCU". Source: `content/about-me.md`.
- **Résumé button:** `.hf-btn` style — system-ui 10.5px/600, color #4A6D8C, 1px
  `rgba(74,109,140,.45)` border, `border-radius: 8px`, `padding: 7px 12px`,
  `background: rgba(74,109,140,.08)`. Label "↓ Download résumé · coming soon"
  (résumé is **not yet implemented** per `about-me.md`).

### 3. Blog (`4c`)
- **Purpose:** List of posts.
- **Layout:** Masthead → stacked post cards (one card per post).
- **Each card:** title (Georgia bold 19px) + italic date (right), excerpt
  (Georgia 15px/1.7), "Read more →" link.
- **Data:** Posts come from `content/blog/*.md`, whose filenames encode the
  date and title (`YYMMDD-Title.md`). This is exactly the planned **`blog-card`**
  component (see `docs/` / `local_notes/PLAN.md`). Posts, newest first:
  - **One-Handed Keyboard** — Jun 12, 2026 — "A month ago, after breaking my
    arm, I suddenly found typing a lot more difficult — so I went scouring the
    Internet for a one-handed keyboard layout."
  - **My Second Blog Post** — May 18, 2026.
  - **My First Blog Post** — May 14, 2026 — "Welcome to my blog, where I'll be
    posting various discussions of matters technical — hopefully without too
    many tangents."

### 4. Education (`4d`)
- **Purpose:** Education + professional development.
- **Layout:** Masthead → "University" card → "Professional Development" card.
- **Section labels** ("University", "Professional Development"): system-ui
  10px/700, `letter-spacing: .15em`, uppercase, color #C09050.
- **Content** (from `content/education.md`): VCU — BS, Computer Science. Then
  two groups, each a Georgia-bold subtitle (13px, treated as a link) + a list
  of Georgia 12.5px lines:
  - *Machine Learning · Coursera / Stanford* — Unsupervised Learning,
    Recommenders & RL (2026); Advanced Learning Algorithms (2025); Supervised
    ML: Regression & Classification (2025).
  - *Systems & Languages* — Building Microservices API in Go (2025);
    Programming with Google Go (2025); Ultimate Rust 2: Intermediate Concepts
    (2024).

### 5. Prompts (`4e`)
- **Purpose:** The full list of AI prompts used to build the site.
- **Layout:** Masthead → intro card → numbered prompt cards → "N prompts total".
- **Intro card:** `h2` "The Prompts" + one paragraph.
- **Prompt card:** row with a big **number** in Playwrite NZ (15px, color
  #C09050) + the prompt text (Georgia 12.5px). Numbers are zero-padded ("01").
- **Data:** `PROMPTS.md` (124 numbered, column-80 wrapped prompts). Render all;
  the prototype shows the first three and a "124 prompts total" footer.

### 6. Mobile (`4f`, low-fi in `3a`–`3e`)
All pages collapse to a single 228px-wide column; nav becomes the hamburger
drawer described in the masthead section. Type scales down (~16px brand, ~14px
headings, ~11.5px body). Cards use tighter padding (`13px 14px`).

---

## Interactions & Behavior
- **Nav:** standard page navigation; active page shown by the gold underline
  (desktop) / filled tap target (mobile). Brand/crest links to Home.
- **Mobile menu:** hamburger toggles a full-screen nav drawer; "✕" closes it.
- **Post links / "Read more":** navigate to the individual post page.
- **GitHub pill:** external link to the repo (new tab).
- **Hover:** nav items darken to #3D1C08; post titles shift to #4A6D8C
  (`--color-link`).
- **Responsive:** single breakpoint between the centered desktop masthead and
  the mobile hamburger header (~640px is a reasonable cut; the existing
  `site-header` already owns this logic — extend it).
- **Loading/error states:** `markdown-card` already renders loading + error
  states while fetching markdown; reuse that pattern for `blog-card`.

## State Management
Minimal. The site is server-rendered (FastAPI + Jinja2); components fetch their
markdown client-side.
- `site-header`: `activePage` (string) to mark the current nav item; mobile
  `menuOpen` (boolean) for the drawer.
- `markdown-card` / `blog-card`: `src` (string) prop; internal `_content`,
  `_loading`, `_error`; `blog-card` additionally derives `_title` and `_date`
  from the filename (see `local_notes/PLAN.md`).

## Design Tokens

All already defined in `static/css/variables.css` — **use the `var(--…)` names**,
not raw hex. Prototype hex → token map:

| Prototype hex | Token | Role |
|---|---|---|
| `#F8EDD4` | `--parchment-lightest` | Card fills (lightest) |
| `#E4C98A` | `--parchment-light` / `--color-border-subtle` | Borders, dividers |
| `#C09050` | `--parchment-mid` / `--color-active` | Active nav, section labels |
| `#8B5A2B` | `--parchment-sienna` / `--color-text-secondary` | Tagline, dates, labels |
| `#3D1C08` | `--parchment-espresso` / `--color-text-primary` | Headings, body |
| `#D9C9A8` | `--parchment-putty` / `--color-surface-muted` | Chips/tags |
| `#4A6D8C` | `--accent-slate-blue` / `--color-link` | Links, buttons |
| `rgba(248,237,212,.66–.72)` | `--color-surface-card` | Card background |

**Spacing:** card padding `28px 30px` (desktop) / `13px 14px` (mobile); card
gap `30px`; nav gap `26px`; section-label top margin `44px`; column padding
`0 24px 70px`, `max-width: 720px`.

**Type scale:** brand 40px (Playwrite NZ) · page `h2` 25px / post title 19px
(Georgia bold) · body 16px, excerpt 15px, meta 11.5–12.5px (Georgia) · labels
& nav 10–12px (system-ui, uppercase, letter-spacing .14–.16em). Body
`line-height` 1.7–1.75.

**Radius:** cards 14px, buttons 8px, avatar/crest 12–13px, GitHub pill 22px,
chips 20px.

**Shadows:** card `0 3px 14px rgba(61,28,8,.08)`; crest `0 3px 11px rgba(61,28,8,.32)`;
GitHub pill `0 2px 7px rgba(61,28,8,.1)`.

## Assets
In `assets/` (copied here; originals in `static/images/`):
- `paper.jpg` — `grunge-paper-background-11.jpg`, the page background texture.
- `logo.png` — `art_deco_logo_192x192.png`, the crest in the masthead.
- `avatar.png` — `Casual avatar with teal hoodie.png`, the About portrait.

Fonts: **Playwrite New Zealand Basic** (Google Fonts, already linked in
`base.html`) for the brand; **Georgia** (web-safe serif) for body; system-ui
for nav/labels. The standalone export adds a script fallback stack
(`'Snell Roundhand','Segoe Script','Bradley Hand',cursive`) for offline use —
not needed in the real site since Google Fonts is linked.

## Screenshots
Reference renders of the hi-fi Classic Column set are in `screenshots/`:
- `1-home.png` — Home (`4a`)
- `2-about.png` — About (`4b`)
- `3-blog.png` — Blog (`4c`)
- `4-education.png` — Education (`4d`)
- `5-prompts.png` — Prompts (`4e`)
- `6-mobile.png` — Mobile: Home + nav drawer (`4f`)

## Files
Design references in this bundle:
- `Home (standalone).html` — the hi-fi **Home** page as a single self-contained
  file (texture + crest embedded). Open in any browser to see the target look.
- `Home.dc.html` — the same Home page, source form.
- `Site Wireframes.dc.html` — the full exploration. Turn 4 (`4a`–`4f`) is the
  hi-fi Classic Column set; turns 1–3 are the low-fi direction explorations and
  wireframes.
- `assets/` — paper.jpg, logo.png, avatar.png.

In the existing codebase, the matching files to modify are: `templates/base.html`,
`templates/{index,about,blog,education,prompts}.html`,
`static/js/site-header.js`, `static/js/markdown-card.js`, the planned
`static/js/blog-card.js`, and `static/css/variables.css`.
