# CLAUDE.md

This file provides guidance to [Claude Code](https://claude.ai/code) when
working with code in this repository.

## Project Overview

A personal website for A. Lloyd Flanagan, built entirely with AI-generated
code. Every line was produced by Claude 4.6 via natural-language prompts.
The full prompt history is tracked in `PROMPTS.md` and rendered at `/prompts`.

## Commands

```bash
# Install Python dependencies
uv sync

# Install JS dependencies
yarn install

# Run development server (with hot reload)
uv run python main.py

# Lint
uv run ruff check .

# Format Python
uv run ruff format .

# Format Jinja2 templates
uv run djhtml templates

# Run tests
uv run pytest
```

Makefile shortcuts: `make run` (same as `uv run python ./main.py`),
`make dbuild` (Docker build), `make context` (build context image),
`make djhtml` (format Jinja2 templates with djhtml).

The `dev` script alias (`uv run dev`) also starts the server via `main.py`.

## Architecture

**Backend:** FastAPI app in `src/lloydflanagan/app.py`. All routes render
Jinja2 templates from `templates/`. Static files are served from `static/`
at `/static`. The `content/` directory is also served as static files at
`/content` (used for markdown documents fetched by the frontend).

**Entry point:** `main.py` starts uvicorn pointing at
`src.lloydflanagan.app:app` on port 8000. The Dockerfile uses `fastapi run`
instead (also on port 8000 for Fly.io).

**Templates:** Jinja2 with a `base.html` that includes Shoelace (CDN),
Google Fonts (Playwrite New Zealand Basic), and the `<site-header>` web
component. All pages extend `base.html` and fill `{% block content %}`.

**Frontend:** Two Lit 3 web components in `static/js/`:

- `site-header.js` — the site nav bar, loaded as an ES module from CDN.
  Highlights the active nav link by comparing `window.location.pathname`.
- `markdown-card.js` — fetches a markdown file from `/content` and renders
  it inside a Shoelace `<sl-card>`. Uses `lit/dist@3/all/lit-all.min.js`
  for the `unsafeHTML` directive.

Both components currently import Lit from the jsDelivr CDN. Lit is also
declared as a local dependency in `package.json` (managed by Yarn 4),
but the components have not yet been migrated to use the local package.

Shoelace CSS custom properties (`--sl-*`) are used throughout for theming.

**Prompts page:** The `/prompts` route reads `PROMPTS.md` at runtime and
parses numbered list items (`^\d+\. `) as individual prompts, merging
continuation lines (indented 3 spaces). The parsed list is passed to
`prompts.html`.

**Docs:** The `docs/` directory holds component documentation
(`site-header.md`, `markdown-card.md`, `app-api.md`) plus `docs/plans/` and
`docs/prds/` for design artifacts. `root.config.json` configures the Root
AI tool, pointing it at `docs/` for ingestion.

## Conventions

- When adding a new page: add a route in `src/lloydflanagan/app.py`, create
  a template in `templates/`, and add a nav link in
  `static/js/site-header.js`.
- Ruff is configured with rules `E`, `F`, `I`, `UP` at line length 88,
  targeting Python 3.14.
- After editing any Python file, run `ruff check` on it. If errors are
  found, ask the user whether ruff should correct them. If yes, run
  `ruff check --fix` and `ruff format` on the affected files.
- After editing any Jinja2 template, run `uv run djhtml <file>` (or
  `make djhtml` to format all templates at once).
- An `.editorconfig` is present: UTF-8, LF line endings, 2-space indent
  for most files, tab indent for Makefiles.
- When a new prompt is used to build the site, append it to `PROMPTS.md` as
  the next numbered list item (hard-wrapped at column 80, continuation lines
  indented 3 spaces to align with the text after the number).

## Deployment

Deployed to [Fly.io](https://fly.io) as app `lloydflanagan` (primary
region: `ord`). The Dockerfile does a two-stage build using `python:3.14` →
`python:3.14-slim`. Internal port is 8000; HTTPS is forced.
