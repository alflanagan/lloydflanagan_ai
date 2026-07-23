# AGENTS.md

This file provides guidance to [Codex](https://Codex.ai/code) when
working with code in this repository.

## Project Overview

A personal website for A. Lloyd Flanagan, with assistance from Codex 4.6 via
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


## Behavioral Guidelines

Aside: Based on
[andrey-kapathy-skills](https://github.com/multica-ai/andrej-karpathy-skills).

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes,
simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it
work") require constant clarification.

## Imported Claude Cowork project instructions

Write each AI prompt to the PROMPTS.md file.
