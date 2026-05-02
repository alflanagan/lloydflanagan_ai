---
title: markdown-card Web Component
type: module
status: draft
created: 2026-04-13
updated: 2026-04-13
---

# `<markdown-card>` Web Component

## Purpose

A Lit 3 custom element that fetches a markdown file from a URL, converts it to HTML client-side using the `marked` library, and displays the result inside a Shoelace `<sl-card>`. It exists so that content files (e.g. the home page body) can be authored in Markdown and served as static files — decoupling content from templates without requiring a server-side Markdown pipeline.

## Source

`static/js/markdown-card.js`

## Dependencies

```js
import { LitElement, html, css, unsafeHTML }
  from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
```

- **Lit 3 all** (CDN, `lit-all.min.js`) — `LitElement`, `html`, `css`, plus `unsafeHTML` directive for injecting rendered HTML into the shadow DOM
- **marked** (CDN, dynamically imported at fetch time) — `https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js`
- **Shoelace 2** (CDN, loaded in `base.html`) — `<sl-card>` element and CSS custom properties used for styling

## Registered Element

```js
customElements.define('markdown-card', MarkdownCard);
```

Tag name: **`<markdown-card>`**

## Public API

### Observed attribute / property

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `String` | `undefined` | URL of the markdown file to fetch. Changing this attribute does **not** trigger a re-fetch after first connect — `loadMarkdown` is only called from `connectedCallback`. |

### Internal reactive state (not public)

| Property | Type | Description |
|----------|------|-------------|
| `_content` | `String` | Rendered HTML string produced by `marked` |
| `_loading` | `Boolean` | `true` while the fetch + parse is in flight |
| `_error` | `String \| null` | Error message string, or `null` when no error |

## Lifecycle

1. `connectedCallback()` — called when the element is inserted into the DOM; triggers `loadMarkdown()`.
2. `loadMarkdown()` — async method that orchestrates the fetch/parse flow (see below).

### `loadMarkdown()` flow

1. If `src` is not set → sets `_error = 'No src attribute provided'` and returns immediately.
2. Sets `_loading = true`, `_error = null`.
3. `fetch(this.src)` — uses the browser's default credentials/CORS behaviour.
4. If the response is not OK → throws `Error('Failed to load <src>: <statusText>')`.
5. Reads response body as text.
6. Dynamically imports `marked` from CDN.
7. Calls `marked(markdown)` (async) and stores the HTML string in `_content`.
8. On any exception → stores the error message in `_error` and logs to `console.error`.
9. Always sets `_loading = false` in the `finally` block.

## Rendered States

| State | Output |
|-------|--------|
| Loading | `<div class="loading">Loading...</div>` inside `<sl-card>` |
| Error | `<div class="error">Error: <message></div>` inside `<sl-card>` |
| Success | `<div class="content">${unsafeHTML(_content)}</div>` inside `<sl-card>` |

**Security note:** `unsafeHTML` injects the `marked` output as raw HTML. This is safe because `src` is always a hard-coded path to a static content file controlled by the site author — never user-supplied input. Do not use this component with a `src` that can be influenced by end-users.

## Error Conditions

| Trigger | `_error` value |
|---------|---------------|
| `src` attribute absent or empty | `'No src attribute provided'` |
| HTTP response not OK (e.g. 404) | `'Failed to load <src>: <statusText>'` |
| Network failure (DNS, timeout, CORS) | Browser-generated error message (e.g. `'Failed to fetch'`) |
| `marked` import fails | CDN-related error message |

## Styling

Content inside `.content` is styled via shadow DOM rules. Key styles applied to the fetched HTML:

- Headings (`h1`–`h6`): top/bottom margins, `--sl-color-neutral-900`, weight 600
- Paragraphs: `0.75rem` vertical margin
- `code`: `--sl-color-neutral-100` background, monospace, `border-radius-small`
- `pre`: `--sl-color-neutral-100` background, scrollable overflow
- `blockquote`: left border `--sl-color-primary-600`, italic, indented
- Links: `--sl-color-primary-600`, underline on hover

The `<sl-card>` border colour is set to `--sl-color-neutral-200`.

## Usage Example

In `templates/index.html` (and any other template):

```html
<!-- Load the component -->
<script type="module" src="/static/js/markdown-card.js"></script>

<!-- Render a content file -->
<markdown-card src="/content/INDEX.md"></markdown-card>
```

The `src` value must be a path that the server resolves — static content files are served from `/content` (mapped to the `content/` directory).
