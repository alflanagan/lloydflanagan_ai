# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal website for A. Lloyd Flanagan, built entirely with AI-generated code. Every line was produced by Claude 4.6 via natural-language prompts. The full prompt history is tracked in `PROMPTS.md` and rendered at `/prompts`.

## Commands

```bash
# Install dependencies
uv sync

# Run development server (with hot reload)
uv run python main.py

# Lint
uv run ruff check .

# Format
uv run ruff format .

# Run tests
uv run pytest
```

The `dev` script alias (`uv run dev`) also starts the server via `main.py`.

## Architecture

**Backend:** FastAPI app in `src/lloydflanagan/app.py`. All routes render Jinja2 templates from `templates/`. Static files are served from `static/` at `/static`.

**Entry point:** `main.py` starts uvicorn pointing at `src.lloydflanagan.app:app`. The Dockerfile uses `fastapi run` instead (listening on port 8080 for Fly.io).

**Templates:** Jinja2 with a `base.html` that includes Shoelace (CDN), Google Fonts (Playwrite New Zealand Basic), and the `<site-header>` web component. All pages extend `base.html` and fill `{% block content %}`.

**Frontend:** The site header (`static/js/site-header.js`) is a Lit 3 web component loaded as an ES module from CDN. It highlights the active nav link by comparing `window.location.pathname`. Shoelace CSS custom properties (`--sl-*`) are used throughout for theming.

**Prompts page:** The `/prompts` route reads `PROMPTS.md` at runtime and parses lines starting with `- ` as individual prompts (with continuation lines merged in). The parsed list is passed to `prompts.html`.

## Conventions

- When adding a new page: add a route in `src/lloydflanagan/app.py`, create a template in `templates/`, and add a nav link in `static/js/site-header.js`.
- Ruff is configured with rules `E`, `F`, `I`, `UP` at line length 88, targeting Python 3.14.
- When a new prompt is used to build the site, append it to `PROMPTS.md` as a `- ` list item (wrapping at column 80 for continuation lines indented with 2 spaces).

## Deployment

Deployed to [Fly.io](https://fly.io) as app `lloydflanagan-ai` (primary region: `iad`). The Dockerfile does a two-stage build using `python:3.14` → `python:3.14-slim`. Internal port is 8080; HTTPS is forced.
