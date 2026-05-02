<style>h1, h2, h3, h4, h5, h6 { font-family: Arial, sans-serif; }</style>
<div style="width: 768px; margin-left: 0.5rem;">
# Requirements — alloydflanagan.com

## 1. Project Purpose

A personal website for A. Lloyd Flanagan, built entirely with
AI-generated code. Every line of application code is produced by Claude
4.6 via natural-language prompts. The full prompt history is tracked in
`PROMPTS.md` and rendered on the site itself.

## 2. Pages

### 2.1 Home (`/`)

Displays a welcome message loaded at runtime from a Markdown file
(`content/INDEX.md`) using the `<markdown-card>` web component. Serves
as the landing page and entry point for all other sections.

### 2.2 About Me (`/about`)

A biographical page describing A. Lloyd Flanagan — professional
background, skills, interests, and anything else the author wishes to
share with visitors. Currently a stub (empty card with header only);
needs content.

### 2.3 Professional Blog (`/blog/professional`)

A blog focused on software engineering, technology, and career-related
topics. Requirements:

- Posts are stored as Markdown files under `content/blog/professional/`.
- An index page lists posts in reverse-chronological order, showing
  title, date, and a short excerpt.
- Each post has its own permalink route (e.g.
  `/blog/professional/2026/04/some-slug`).
- Posts support front-matter metadata (title, date, tags, excerpt).
- Tag-based filtering on the index page.

### 2.4 Personal Blog (`/blog/personal`)

A blog for personal interests, hobbies, and non-technical writing.
Shares the same engine and layout conventions as the professional blog,
but lives under a separate URL prefix and content directory
(`content/blog/personal/`).

### 2.5 Blog Landing (`/blog`)

Currently a stub. Should become a combined landing page that shows
recent posts from both the professional and personal blogs, clearly
labelled by category, with links to each blog's full index.

### 2.6 Education (`/education`)

A page listing formal education, certifications, and relevant
coursework. Currently a stub; needs content.

### 2.7 Design Notes (`/design`)

Documents the design goals and third-party software choices for the
site. Already implemented with two cards: "Design Goals" and
"Third-Party Software." Linked from the header (below the GitHub icon).

### 2.8 Prompts (`/prompts`)

Renders every AI prompt used to build the site, parsed at runtime from
`PROMPTS.md`. Each prompt is displayed in a numbered card. Already
implemented.

## 3. Site-Wide Features

### 3.1 Navigation

A `<site-header>` Lit web component provides consistent navigation
across all pages. It includes: the site title (links to home), a Home
icon link, nav links for About Me, Blog, Education, and Prompts, a
GitHub repository link (upper-right), and a Design page link. The
active page is highlighted based on `window.location.pathname`.

### 3.2 Markdown Content System

A `<markdown-card>` Lit web component fetches a Markdown file from the
`/content` static mount, converts it to HTML via the `marked` library,
and renders it inside a Shoelace card. Used by the home page; should be
extended to serve blog posts and any other content-heavy pages.

### 3.3 Theming and Styling

All styling is driven by Shoelace CSS custom properties (`--sl-*`).
The site title uses the "Playwrite New Zealand Basic" Google Font. The
layout is centered at a max-width of 960px with responsive padding.

### 3.4 Responsive Design

The site should render well on mobile, tablet, and desktop screens. The
base layout uses a centered max-width container; additional responsive
breakpoints should be added as needed for the navigation and blog
layouts.

## 4. Technology Stack

| Layer        | Technology                          |
|------------- |-------------------------------------|
| Backend      | Python 3.14, FastAPI, Uvicorn       |
| Templating   | Jinja2                              |
| Frontend     | Lit 3 (web components), Shoelace 2  |
| Content      | Markdown (rendered via `marked`)    |
| Package mgmt | uv                                  |
| Linting      | Ruff (rules E, F, I, UP; line 88)   |
| Testing      | pytest                              |
| Deployment   | Docker (two-stage), Fly.io          |

## 5. Content Conventions

- Static files are served from `static/` at `/static`.
- Markdown content files live under `content/` and are served at
  `/content`.
- Blog posts use Markdown with YAML front-matter.
- When a new prompt is used to build the site, it is appended to
  `PROMPTS.md` as a `- ` list item, wrapped at column 80 with
  continuation lines indented by two spaces.

## 6. Development Workflow

- Install: `uv sync`
- Run dev server: `uv run python main.py`
- Lint: `uv run ruff check .`
- Format: `uv run ruff format .`
- Test: `uv run pytest`

## 7. Deployment

- Hosted on Fly.io as app `lloydflanagan-ai` (primary region: `iad`).
- Two-stage Docker build: `python:3.14` builder, `python:3.14-slim`
  runtime.
- Internal port 8080; HTTPS enforced.
- Allowed hosts: `alloydflanagan.com`, `www.alloydflanagan.com`,
  `lloydflanagan.fly.dev`, `localhost`, `127.0.0.1`.

## 8. Non-Functional Requirements

- Pages should load quickly; all heavy assets (Shoelace, Lit, Google
  Fonts, marked) are loaded from CDN.
- Accessibility: Shoelace components provide baseline ARIA support;
  custom components should follow the same patterns.
- The site should be fully functional with JavaScript enabled (web
  components require JS).
</div>
