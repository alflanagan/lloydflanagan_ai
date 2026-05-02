---
title: About Me Page
type: prd
status: draft
created: 2026-04-13
updated: 2026-04-13
---

# PRD: About Me Page

## 1. Problem Statement

The `/about` route exists but renders an empty stub — an `sl-card` with a header and no content. Professional visitors (employers, collaborators, potential clients) arriving at this page find nothing useful. The page must be filled with biographical content so that any professional visitor can understand who A. Lloyd Flanagan is, what they do, and how to make contact.

## 2. Proposed Solution

Follow the same content delivery pattern used by the home page: store biographical content in a Markdown file (`content/ABOUT.md`) and render it client-side via the existing `<markdown-card>` web component. This keeps content editing separate from template markup and reuses established infrastructure.

The template (`templates/about.html`) is updated to replace the empty card with `<markdown-card src="/content/ABOUT.md">`. The Markdown file ships initially with placeholder/draft content; real content is filled in separately.

## 3. Goals

- The `/about` page renders real content — professional background, technical skills, and contact/social links — for a professional visitor audience.
- Contact links (GitHub at minimum) are discoverable and clickable.
- The page renders correctly on mobile, tablet, and desktop.
- The implementation is consistent with existing site patterns (markdown-card, Shoelace, base.html).

## 4. Non-Goals

- No blog-style long-form writing — that belongs on `/blog`.
- No portfolio or project gallery — separate page if ever needed.
- No PDF résumé download link.
- No duplication of formal education detail — that lives on `/education`.
- No resume download.

## 5. Requirements

### P0 — Must Have (blocks release)

| ID | Requirement |
|----|-------------|
| REQ-001 | `templates/about.html` renders `<markdown-card src="/content/ABOUT.md">` instead of the current empty card body. |
| REQ-002 | `content/ABOUT.md` exists and contains non-empty content (placeholder or real). |
| REQ-003 | The `<title>` tag on the About page reads `About Me — A Lloyd Flanagan` (already set; must remain correct after template change). |
| REQ-004 | The "About Me" nav link in `<site-header>` highlights as active when the visitor is on `/about` (existing behaviour; must not regress). |

### P1 — Should Have

| ID | Requirement |
|----|-------------|
| REQ-005 | `content/ABOUT.md` contains a skills section with skill categories (e.g. Languages, Frameworks, Tools) formatted for scannability. |

### P2 — Nice to Have

| ID | Requirement |
|----|-------------|
| REQ-006 | A short (2–3 sentence) summary paragraph appears at the top of `ABOUT.md` before the detail sections. |
| REQ-007 | Contact links (GitHub, email, LinkedIn) are included in `ABOUT.md` with correct URLs. |

## 6. Technical Considerations

- **Pattern reuse**: `<markdown-card>` is already loaded globally via `base.html`'s script tag. No new JS or CSS dependencies needed.
- **Content serving**: `content/` is mounted at `/content` in `app.py` via `StaticFiles`. `content/ABOUT.md` will be served at `/content/ABOUT.md` automatically — no route change required.
- **Mobile rendering**: `markdown-card.js` renders content inside `sl-card`. The existing `.content` styles in `markdown-card.js` shadow DOM use relative units and should reflow correctly. Verify on narrow viewports.
- **No backend changes**: `app.py` already has the `GET /about` route returning `about.html`. The only server-side change is the template file itself.
- **XSS note**: `markdown-card.js` uses `unsafeHTML` — safe here because `src` is a hard-coded path to an author-controlled file.

## 7. Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Content placeholder ships as final | Medium | Track REQ-002 and REQ-005 separately so real content can be added without re-releasing the template wiring. |
| markdown-card fetch fails silently on production | Low | The component shows an error state inline; verify on Fly.io after deploy. |
| Mobile layout breaks for skills table/list | Low | Test `content/ABOUT.md` on a narrow viewport before marking P1 complete. |

## 8. User Experience

**Primary flow:**
1. Visitor arrives at `alloydflanagan.com/about` via nav or direct link.
2. Page loads; `<markdown-card>` fetches `/content/ABOUT.md`.
3. Brief "Loading…" state appears, then biographical content renders inside `sl-card`.
4. Visitor reads background and skills, then clicks a contact link (GitHub etc.) to follow up.

**No new UI components** are introduced. The page uses the existing header, footer, and card layout shared by all pages.

## 9. Open Questions

1. **Real content**: What specific biographical details, skills, and contact links should appear in `content/ABOUT.md`? This must be provided before REQ-005 and REQ-007 can be marked done. *(Blocks P1/P2 — not P0)*
