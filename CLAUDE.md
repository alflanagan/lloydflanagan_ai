# CLAUDE.md

This file provides guidance to [Claude Code](https://claude.ai/code) when
working with code in this repository.

## Project Overview

A personal website for A. Lloyd Flanagan, with assistance from Claude 4.6 via
natural-language prompts. The full prompt history is tracked in `PROMPTS.md` and
rendered at `/prompts`.

## Architecture

**Framework:** FastAPI + Jinja2, served via uvicorn. Entry point is `main.py`;
app is defined in `src/lloydflanagan/app.py`. Run locally with `make run`
(uses `uv run python ./main.py`).

**Python:** 3.14, managed with `uv`.

**Templates:** Jinja2 with a `base.html` template file. All pages extend
`base.html` and fill `{% block content %}`.

**CSS variables:** `static/css/variables.css` defines CSS custom properties. Use
these instead of hard-coded colors in templates and components.

**Web components:** Custom elements in `static/js/` use
[Lit](https://lit.dev/) (`blog-card.js`, `markdown-card.js`, `site-header.js`).

**Content:** Markdown files in `content/` are served statically. Blog posts
live in `content/blog/` and follow the naming pattern
`YYMMDD[-YYMMDD]-Post_Title.md`.

## Conventions

- When adding a new page: add a route in `src/lloydflanagan/app.py`, create
  a template in `templates/`, and add a nav link in
  `static/js/site-header.js`. Run `make fmtjs` after editing
  `site-header.js`.
- After editing any Jinja2 template, run `make djhtml`.
- After editing any Python file, run `ruff check` (and `ruff format` if
  needed). Run `make mypy` for type checking.
- When a new prompt is used to build the site, append it to `PROMPTS.md` as
  the next numbered list item (hard-wrapped at column 80, continuation lines
  indented 3 spaces to align with the text after the number).

## Deployment

Deployed to [Fly.io](https://fly.io) as app `lloydflanagan`.
