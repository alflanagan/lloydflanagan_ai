import {
  LitElement,
  html,
  css,
  unsafeHTML,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js'

import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/card/card.js'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/**
 * Parse a blog filename in the form YYMMDD-Title_With_Underscores.md.
 *
 * Returns an object with:
 *   - title: the title with underscores replaced by spaces
 *   - date:  formatted as "Mmm DD, YYYY" (e.g. "May 01, 2026")
 */
function parseFilename(src) {
  const basename = src.split('/').pop()
  const noExt = basename.replace(/\.md$/, '')
  const dashIdx = noExt.indexOf('-')

  if (dashIdx === -1) {
    return {title: noExt, date: ''}
  }

  const datePart = noExt.slice(0, dashIdx)
  const titlePart = noExt.slice(dashIdx + 1)

  const yy = parseInt(datePart.slice(0, 2), 10)
  const mm = parseInt(datePart.slice(2, 4), 10)
  const dd = parseInt(datePart.slice(4, 6), 10)
  const year = 2000 + yy
  const monthStr = MONTHS[mm - 1] ?? '???'
  const dayStr = String(dd).padStart(2, '0')

  return {
    title: titlePart.replace(/_/g, ' '),
    date: `${monthStr} ${dayStr}, ${year}`,
  }
}

class BlogCard extends LitElement {
  static properties = {
    src: {type: String},
    _content: {state: true},
    _loading: {state: true},
    _error: {state: true},
    _title: {state: true},
    _date: {state: true},
  }

  static styles = css`
    :host {
      display: block;
      /* override sl-card background var. */
      --sl-panel-background-color: var(--color-surface-card);
    }

    .card {
      padding: var(--sl-spacing-large);
      border-radius: var(--sl-border-radius-medium);
      border-width: 1px;
      border-color: var(--color-border-strong);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
    }

    .header-title {
      font-weight: 600;
      font-size: var(--sl-font-size-large);
      color: var(--color-text-primary);
    }

    .header-date {
      font-size: var(--sl-font-size-small);
      color: var(--color-text-secondary);
      white-space: nowrap;
      margin-left: var(--sl-spacing-medium);
    }

    .loading {
      padding: 1rem;
      color: var(--color-text-primary);
      font-style: italic;
    }

    .error {
      padding: 1rem;
      color: var(--color-danger);
      background: var(--color-danger);
      border-radius: var(--sl-border-radius-medium);
    }

    .content {
      line-height: 1.6;
      color: var(--color-text-primary);
      background: transparent;
      padding: var(--sl-spacing-medium);
    }

    .content h1,
    .content h2,
    .content h3,
    .content h4,
    .content h5,
    .content h6 {
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .content h1 {
      font-size: var(--sl-font-size-2x-large);
    }

    .content h2 {
      font-size: var(--sl-font-size-x-large);
    }

    .content h3 {
      font-size: var(--sl-font-size-large);
    }

    .content p {
      margin: 0.75rem 0;
    }

    .content ul,
    .content ol {
      margin: 0.75rem 0;
      padding-left: 2rem;
    }

    .content li {
      margin: 0.5rem 0;
    }

    .content code {
      background: var(--color-surface-muted);
      padding: 0.2rem 0.4rem;
      border-radius: var(--sl-border-radius-small);
      font-family: monospace;
      font-size: 0.9em;
    }

    .content pre {
      background: var(--color-surface-muted);
      padding: 1rem;
      border-radius: var(--sl-border-radius-medium);
      overflow-x: auto;
      margin: 1rem 0;
    }

    .content pre code {
      background: none;
      padding: 0;
    }

    .content blockquote {
      border-left: 4px solid var(--color-border-subtle);
      padding-left: 1rem;
      margin: 1rem 0;
      color: var(--sl-color-neutral-700);
      font-style: italic;
    }

    .content a {
      color: var(--color-text-secondary);
      text-decoration: none;
    }

    .content a:hover {
      text-decoration: underline;
    }
  `

  constructor() {
    super()
    this._content = ''
    this._loading = false
    this._error = null
    this._title = ''
    this._date = ''
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.src) {
      const {title, date} = parseFilename(this.src)
      this._title = title
      this._date = date
    }
    this.loadMarkdown()
  }

  async loadMarkdown() {
    if (!this.src) {
      this._error = 'No src attribute provided'
      return
    }

    this._loading = true
    this._error = null

    try {
      const response = await fetch(this.src)
      if (!response.ok) {
        throw new Error(`Failed to load ${this.src}: ${response.statusText}`)
      }

      const markdown = await response.text()

      // Dynamically import marked (same approach as markdown-card.js)
      const {marked} = await import(
        'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
      )

      const renderedHtml = await marked(markdown)
      this._content = renderedHtml
    } catch (error) {
      this._error = error.message
      console.error('Error loading blog post:', error)
    } finally {
      this._loading = false
    }
  }

  render() {
    return html`
      <sl-card>
        <div slot="header" class="header">
          <span class="header-title">${this._title}</span>
          <span class="header-date">${this._date}</span>
        </div>
        ${this._loading ?
          html`
            <div class="loading">Loading...</div>
          `
        : ''}
        ${this._error ?
          html`
            <div class="error">Error: ${this._error}</div>
          `
        : ''}
        ${!this._loading && !this._error ?
          html`
            <div class="content">${unsafeHTML(this._content)}</div>
          `
        : ''}
      </sl-card>
    `
  }
}

customElements.define('blog-card', BlogCard)
