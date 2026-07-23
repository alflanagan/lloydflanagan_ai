# Replace `sl-card` with a custom `basic-card` element

## Context

`markdown-card.js` and `blog-card.js` both wrap their content in Shoelace's
`<sl-card>` (loaded directly from the CDN:
`@shoelace-style/shoelace@2.20.1/cdn/components/card/card.js`). `sl-card` is
the *only* Shoelace element either component uses — confirmed by grepping the
whole repo for `<sl-` and `sl-card`/`sl-badge`/`sl-button` etc. This lines up
with the removal plan already noted in `content/tech-list.md` ("this library
is no longer maintained, so I plan to incorporate elements into my own code
and remove the dependency").

Both consumers already fully own the card's visual styling via
`::part(base)`, `::part(header)` (blog-card only), and `::part(body)`
overrides — they set border, border-radius, background, box-shadow, and
padding explicitly using the site's own `--color-*` / `--mc-*` / `--bc-*`
tokens. `sl-card` itself contributes almost nothing visually beyond a
correctly-shaped shadow DOM to attach those parts to. That makes it a clean,
low-risk swap: replicate just enough of `sl-card`'s shadow-DOM contract
(fetched from the real Shoelace v2.20.1 source on GitHub, not reconstructed
from memory) that the exact same `::part()` selectors keep working.

**Scope, per your answers:** minimal parity — only the `header` (named) and
default (`body`) slots that are actually used today. No `image`/`footer`
slots, no Shoelace-style `HasSlotController`/conditional
`card--has-header`-type classing. New element name: `basic-card`.

**Deliberately out of scope:** the Shoelace CDN `<link>`/`<script>` in
`templates/base.html` stays. It's still load-bearing for reasons unrelated to
`sl-card`: `body`'s `font-family` in `base.html` reads `var(--sl-font-sans)`
directly, and `static/css/variables.css` defines `--font-content` /
`--font-heading` / `--font-menu` in terms of `--sl-font-serif` /
`--sl-font-sans`. Removing the CDN include would silently change the site's
base typography. Fully retiring Shoelace is a separate, larger follow-up (out
of scope for "replace sl-card") — worth flagging to you now, not fixing here.

## Reference: real `sl-card` shadow-DOM contract (v2.20.1, fetched from
`raw.githubusercontent.com/shoelace-style/shoelace/v2.20.1/...`)

```html
<div part="base" class="card ...">
  <slot name="image" part="image" class="card__image"></slot>
  <slot name="header" part="header" class="card__header"></slot>
  <slot part="body" class="card__body"></slot>
  <slot name="footer" part="footer" class="card__footer"></slot>
</div>
```

Key fact that must be preserved: Shoelace's own `.card__header` /
`.card__body` (the `<slot>` elements themselves) are given a real box
(`display: block`-equivalent) so that `border`/`padding` applied via
`::part()` actually render — a bare `<slot>` defaults to `display: contents`
in browsers, which would make consumer `::part(header)`/`::part(body)`
border/padding rules silently no-op. `basic-card` must replicate this or the
existing `::part()` overrides in `markdown-card.js`/`blog-card.js` will stop
rendering visibly even though the CSS itself is unchanged.

## Implementation

### 1. New file: `static/js/basic-card.js`

A small Lit element, same import/registration pattern as the other
components in `static/js/` (`markdown-card.js`, `blog-card.js`,
`site-header.js`):

```js
import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js'

class BasicCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      display: flex;
      flex-direction: column;
    }

    slot {
      display: block;
    }
  `

  render() {
    return html`
      <div part="base" class="card">
        <slot name="header" part="header"></slot>
        <slot part="body"></slot>
      </div>
    `
  }
}

customElements.define('basic-card', BasicCard)
```

No default border/padding/background/shadow on `base`, `header`, or `body` —
matching how `sl-card` is used today, where consumers supply 100% of the
visible styling via `::part()`. An unused `header` slot (markdown-card's
case) stays invisible: it has no assigned nodes and no consumer-supplied
`::part(header)` rule, so it renders as a zero-size block.

### 2. `static/js/markdown-card.js`

- Replace the shoelace import (line 8) with `import './basic-card.js'`.
- Remove the now-orphaned `--sl-panel-background-color: var(--color-surface-card);`
  line from `:host` (line 23) and from the `sl-card { ... }` rule (line 42) —
  it fed a Shoelace-internal token `basic-card` doesn't read, and
  `::part(base)` already sets `background` explicitly.
- Rename selectors: `sl-card` → `basic-card`, `sl-card::part(base)` →
  `basic-card::part(base)`, `sl-card::part(body)` → `basic-card::part(body)`.
- In `render()`, swap `<sl-card>...</sl-card>` for
  `<basic-card>...</basic-card>`.

### 3. `static/js/blog-card.js`

- Replace the shoelace import (line 8) with `import './basic-card.js'`.
- Remove the orphaned `--sl-panel-background-color` line from `:host`
  (line 122).
- Rename selectors: `sl-card::part(base)` / `::part(header)` / `::part(body)`
  → `basic-card::part(...)`.
- In `render()`'s non-preview branch, swap `<sl-card>...</sl-card>` for
  `<basic-card>...</basic-card>` (the `preview` branch doesn't use a card at
  all — untouched).

### Not touched

- `templates/base.html` — Shoelace CDN `<link>`/`<script>` stay (see Context).
- `content/tech-list.md` — leaving its Shoelace note as-is, since the CDN
  dependency isn't actually gone yet, only the `sl-card` usage.
- `package.json`'s `"shoelace": "^0.1.1"` line is an unrelated, already-noted
  misdeclared dependency stub — unaffected either way.

## Verification

1. `make fmtjs` — reformat the new and edited JS files with prettier.
2. `make run` — start the dev server.
3. Visually compare, before vs. after, in a browser:
   - `/design` — 4 stacked `markdown-card`s (no header slot in use).
   - `/` — "Recent writing" preview `blog-card`s (preview mode, unaffected —
     sanity check only).
   - `/blog` — full (non-preview) `blog-card`s, which exercise the `header`
     slot: title + date/revised-date row, border, padding, background, shadow
     should look pixel-identical to today.
4. Confirm in devtools that `<basic-card>` shadow DOM appears in place of
   `<sl-card>` and that `::part(base|header|body)` styles are actually
   applied (not silently dropped due to slot `display`).

## Status

Implemented and verified in the browser (`/design` and `/blog`) with no
console errors. The "not touched" items above remain as a follow-up if full
Shoelace removal is ever pursued.
