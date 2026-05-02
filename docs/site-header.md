---
title: site-header Web Component
type: module
status: draft
created: 2026-04-13
updated: 2026-04-13
---

# `<site-header>` Web Component

## Purpose

A Lit 3 custom element that renders the persistent page header across every page of the site. It centralises the site title, primary navigation, GitHub link, and Design shortcut in one place so all pages stay in sync without duplicating markup in each template. Active-link highlighting is handled here rather than server-side, since the component reads `window.location.pathname` at render time.

## Source

`static/js/site-header.js`

## Dependencies

```js
import { LitElement, html, css }
  from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
```

- **Lit 3 core** (CDN, `lit-core.min.js`) — `LitElement`, `html`, `css`
- **Shoelace 2** (CDN, loaded in `base.html`) — CSS custom properties (`--sl-*`) used throughout for colours, spacing, typography, and border-radius; `<sl-icon>` element used in the Home nav link
- **Google Fonts** — `Playwrite New Zealand Basic` (loaded in `base.html`), applied to the `<h1>` site title

No properties or attributes are declared — the component is fully self-contained and requires no configuration.

## Registered Element

```js
customElements.define('site-header', SiteHeader);
```

Tag name: **`<site-header>`**

## Public API

The element exposes no observed attributes, no public properties, and no custom events. Drop it into a template as a void element:

```html
<site-header></site-header>
```

## Rendered Structure

```
<site-header>
  └── Shadow DOM
      └── .header-inner
          ├── .header-right
          │   ├── <a class="github-link"> → GitHub repo (opens in new tab)
          │   └── <a class="design-link"> → /design
          ├── <h1><a href="/">A Lloyd Flanagan</a></h1>
          └── <nav>
              ├── <a href="/">  (Home — sl-icon house-fill)
              ├── <a href="/about">  About Me
              ├── <a href="/blog">   Blog
              ├── <a href="/education"> Education
              └── <a href="/prompts">   Prompts
```

### Active-link detection

On every render the component reads `window.location.pathname` and applies the `active` CSS class to the nav link whose `href` exactly matches the current path. This is a string equality check — sub-paths (e.g. `/about/cv`) will not highlight `/about`.

## Styling

All styles are encapsulated in the shadow DOM. Key design tokens consumed from Shoelace:

| Token | Used for |
|-------|---------|
| `--sl-color-neutral-0` | Header background |
| `--sl-color-neutral-200` | Bottom border |
| `--sl-color-neutral-700/900` | Nav link text |
| `--sl-color-primary-600` | Active nav link background; Design link hover |
| `--sl-color-primary-400` | Design link default colour |
| `--sl-font-size-medium` | Nav link font size |
| `--sl-font-size-2x-large` | Base for `<h1>` font size (`× 1.5`) |
| `--sl-spacing-medium` | Gap between GitHub icon and Design link |
| `--sl-border-radius-medium` | Nav link border radius |

The `max-width` of the inner container is hard-coded at `960px`.

## Usage Example

`base.html` loads the script as an ES module and places the element at the top of every page:

```html
<!-- in <head> -->
<script type="module" src="/static/js/site-header.js"></script>

<!-- in <body> -->
<site-header></site-header>
```

Adding a new nav link requires editing `render()` in `site-header.js`:

```js
<a href="/new-page" class="${currentPath === '/new-page' ? 'active' : ''}">New Page</a>
```
