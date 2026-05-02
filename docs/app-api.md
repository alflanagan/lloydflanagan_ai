---
title: Application API
type: api
status: draft
created: 2026-04-13
updated: 2026-04-13
---

# Application API

## Purpose

The central FastAPI application that serves the personal website at `alloydflanagan.com`. It exists to wire together all page routes, serve static assets and content files, and enforce host-header security via middleware. Every user-facing URL on the site is defined here.

## Mount Path

Routes are registered at the application root — no prefix. The app is served at `/` in all environments.

## Dependencies

```python
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
```

- **Jinja2 templates** read from `templates/` (relative to working directory at startup)
- **Static files** served from `static/` at `/static`
- **Content files** served from `content/` at `/content`
- **PROMPTS.md** read at runtime on every `/prompts` request

## Middleware

| Middleware | Configuration |
|-----------|--------------|
| `TrustedHostMiddleware` | Allowed hosts: `alloydflanagan.com`, `www.alloydflanagan.com`, `lloydflanagan.fly.dev`, `localhost`, `127.0.0.1`. Requests with any other `Host` header receive `400 Bad Request`. |

## Static Mounts

| Mount point | Source directory | Notes |
|-------------|-----------------|-------|
| `/static` | `static/` | JS, CSS, images |
| `/content` | `content/` | Markdown content files (e.g. `INDEX.md`) |

## Endpoints

All endpoints are read-only (`GET`). There are no authentication requirements. All page routes return `200 OK` with an HTML body; no JSON responses.

### `GET /`

Returns the home page.

- **Template**: `templates/index.html`
- **Context**: `{ request }`
- **Notes**: The template renders a `<markdown-card src="/content/INDEX.md">` component; the markdown content is fetched client-side.

### `GET /about`

Returns the About Me page.

- **Template**: `templates/about.html`
- **Context**: `{ request }`

### `GET /blog`

Returns the Blog page.

- **Template**: `templates/blog.html`
- **Context**: `{ request }`

### `GET /education`

Returns the Education page.

- **Template**: `templates/education.html`
- **Context**: `{ request }`

### `GET /design`

Returns the Design page.

- **Template**: `templates/design.html`
- **Context**: `{ request }`

### `GET /prompts`

Returns the Prompts page, listing every natural-language prompt used to build the site.

- **Template**: `templates/prompts.html`
- **Context**: `{ request, prompts: list[str] }`
- **Data resolution**: Reads `PROMPTS.md` from the working directory at request time. Lines starting with `- ` begin a new prompt entry (the `- ` prefix is stripped). Lines starting with two spaces are treated as continuation of the previous prompt and appended with a single space. Lines matching neither pattern are ignored.
- **Fallback**: If `PROMPTS.md` does not exist, `prompts` is an empty list — the page renders with no entries rather than raising an error.

### Error responses

FastAPI's default error handling applies:

| Status | Trigger |
|--------|---------|
| `400 Bad Request` | `Host` header not in the allowed list (TrustedHostMiddleware) |
| `404 Not Found` | No matching route |
| `405 Method Not Allowed` | Non-GET request to a page route |
| `500 Internal Server Error` | Unhandled exception (e.g. missing template file) |

## Side Effects

All endpoints are read-only. No database writes, no cache mutations, no external calls.

The only I/O side effect is `GET /prompts` reading `PROMPTS.md` from disk on every request. There is no caching — the file is re-read each time.

## Usage Example

```bash
# Home page
curl https://alloydflanagan.com/

# Prompts list (returns HTML)
curl https://alloydflanagan.com/prompts

# Dev server
uv run python main.py
# → http://localhost:8000
```
