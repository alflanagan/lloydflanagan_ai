# Color Palette

The site uses a **parchment / aged-paper** theme derived from the background
texture (`grunge-paper-background-11.jpg`). All tokens live in
`static/css/variables.css` and are available as CSS custom properties
throughout the site.

---

## Primitive Tokens

These are the raw color values. Prefer the **semantic tokens** (below) in
templates and components — use primitives only when no semantic alias fits.

### Parchment Neutrals

Sampled directly from the background texture. They harmonize with the paper
grain rather than fighting it.

<table>
  <thead>
    <tr><th>Swatch</th><th>Variable</th><th>Hex</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--parchment-lightest);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--parchment-lightest</code></td>
      <td><code>#F8EDD4</code></td>
      <td>Lightest highlight — card fills</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--parchment-light);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--parchment-light</code></td>
      <td><code>#E4C98A</code></td>
      <td>Mid-light — borders, dividers</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--parchment-mid);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--parchment-mid</code></td>
      <td><code>#C09050</code></td>
      <td>Antique gold — active states</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--parchment-sienna);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--parchment-sienna</code></td>
      <td><code>#8B5A2B</code></td>
      <td>Sienna brown — secondary text</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--parchment-espresso);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--parchment-espresso</code></td>
      <td><code>#3D1C08</code></td>
      <td>Deep espresso — headings, body</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--parchment-putty);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--parchment-putty</code></td>
      <td><code>#D9C9A8</code></td>
      <td>Dusty putty — muted fills, tags</td>
    </tr>
  </tbody>
</table>

### Cool Accents

Cool-toned counterpoints that prevent the warm palette from feeling muddy.
Use sparingly — one or two per page section.

<table>
  <thead>
    <tr><th>Swatch</th><th>Variable</th><th>Hex</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--accent-slate-blue);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--accent-slate-blue</code></td>
      <td><code>#4A6D8C</code></td>
      <td>Slate blue — primary links, CTAs</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--accent-sage);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--accent-sage</code></td>
      <td><code>#6B7C5E</code></td>
      <td>Sage green — success, organic</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--accent-crimson);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--accent-crimson</code></td>
      <td><code>#7A3B3B</code></td>
      <td>Aged crimson — warnings, emphasis</td>
    </tr>
  </tbody>
</table>

---

## Semantic Tokens

Use these in all templates and components. They map to primitives above, so
a future palette change only touches `variables.css`.

### Surfaces

<table>
  <thead>
    <tr><th>Swatch</th><th>Variable</th><th>Use</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-surface-card);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--color-surface-card</code></td>
      <td>Semi-transparent card background (88 % opacity)</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-surface-card-solid);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--color-surface-card-solid</code></td>
      <td>Opaque card variant — use where transparency causes contrast issues</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-surface-dark);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--color-surface-dark</code></td>
      <td>Reversed / dark sections — pair with <code>--color-text-on-dark</code></td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-surface-muted);border:1px solid var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--color-surface-muted</code></td>
      <td>Tags, chips, low-emphasis fills</td>
    </tr>
  </tbody>
</table>

### Text

<table>
  <thead>
    <tr><th>Example</th><th>Variable</th><th>Use</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="color:var(--color-text-primary);font-weight:bold;">Aa</span></td>
      <td><code>--color-text-primary</code></td>
      <td>Headings and body copy</td>
    </tr>
    <tr>
      <td><span style="color:var(--color-text-secondary);">Aa</span></td>
      <td><code>--color-text-secondary</code></td>
      <td>Labels, captions, metadata</td>
    </tr>
    <tr>
      <td><span style="color:var(--color-text-muted);">Aa</span></td>
      <td><code>--color-text-muted</code></td>
      <td>Placeholders, hints, disabled text</td>
    </tr>
    <tr>
      <td><span style="color:var(--color-text-on-dark);background:var(--color-surface-dark);padding:0 4px;border-radius:3px;">Aa</span></td>
      <td><code>--color-text-on-dark</code></td>
      <td>Text on dark/reversed backgrounds</td>
    </tr>
    <tr>
      <td><span style="color:var(--color-text-on-dark-muted);background:var(--color-surface-dark);padding:0 4px;border-radius:3px;">Aa</span></td>
      <td><code>--color-text-on-dark-muted</code></td>
      <td>Secondary text on dark backgrounds</td>
    </tr>
  </tbody>
</table>

### Links & Interactive

<table>
  <thead>
    <tr><th>Example</th><th>Variable</th><th>Use</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="color:var(--color-link);">Link</span></td>
      <td><code>--color-link</code></td>
      <td>Default anchor color</td>
    </tr>
    <tr>
      <td><span style="color:var(--color-link-hover);">Link:hover</span></td>
      <td><code>--color-link-hover</code></td>
      <td>Anchor hover state</td>
    </tr>
    <tr>
      <td><span style="color:var(--color-active);font-weight:bold;">Active</span></td>
      <td><code>--color-active</code></td>
      <td>Active nav item, selected state</td>
    </tr>
    <tr>
      <td><span style="outline:2px solid var(--color-focus-ring);padding:0 4px;border-radius:3px;">Focus</span></td>
      <td><code>--color-focus-ring</code></td>
      <td>Keyboard focus outline</td>
    </tr>
  </tbody>
</table>

### Borders

<table>
  <thead>
    <tr><th>Swatch</th><th>Variable</th><th>Use</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-border-subtle);border-radius:3px;"></span></td>
      <td><code>--color-border-subtle</code></td>
      <td>Cards, dividers, table lines</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-border-strong);border-radius:3px;"></span></td>
      <td><code>--color-border-strong</code></td>
      <td>Emphasis borders, focus outlines (alternative)</td>
    </tr>
  </tbody>
</table>

### Status

<table>
  <thead>
    <tr><th>Swatch</th><th>Variable</th><th>Use</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-success);border-radius:3px;"></span></td>
      <td><code>--color-success</code></td>
      <td>Success states, confirmation messages</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-warning);border-radius:3px;"></span></td>
      <td><code>--color-warning</code></td>
      <td>Warnings, caution indicators</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-danger);border-radius:3px;"></span></td>
      <td><code>--color-danger</code></td>
      <td>Errors, destructive actions</td>
    </tr>
    <tr>
      <td><span style="display:inline-block;width:2rem;height:1rem;background:var(--color-info);border-radius:3px;"></span></td>
      <td><code>--color-info</code></td>
      <td>Informational messages, tooltips</td>
    </tr>
  </tbody>
</table>

---

## Usage Guide

Always reach for a **semantic token** first. Only drop down to a primitive
when no semantic alias captures your intent.

```css
/* ✓ Preferred — semantic token */
.card {
  background: var(--color-surface-card);
  color:       var(--color-text-primary);
  border:      1px solid var(--color-border-subtle);
}

/* ✓ Acceptable — primitive with no semantic equivalent */
.badge {
  background: var(--parchment-putty);
}

/* ✗ Avoid — hard-coded values break theme consistency */
.card {
  background: rgba(248, 237, 212, 0.88);
  color: #3D1C08;
}
```

### Reversed sections (dark background)

```css
.hero {
  background: var(--color-surface-dark);
  color:      var(--color-text-on-dark);
}

.hero p {
  color: var(--color-text-on-dark-muted);
}
```

### Status badges

```css
.badge--success { background: var(--color-success); color: var(--color-text-on-dark); }
.badge--warning { background: var(--color-warning); color: var(--color-text-primary); }
.badge--danger  { background: var(--color-danger);  color: var(--color-text-on-dark); }
.badge--info    { background: var(--color-info);    color: var(--color-text-on-dark); }
```

---

*All tokens are defined in `static/css/variables.css` and applied globally
via `:root`.*
