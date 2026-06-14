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
 * Format a raw YYMMDD string as "Mmm DD, YYYY" (e.g. "May 01, 2026").
 */
function formatDate(datePart) {
  const yy = parseInt(datePart.slice(0, 2), 10)
  const mm = parseInt(datePart.slice(2, 4), 10)
  const dd = parseInt(datePart.slice(4, 6), 10)
  const year = 2000 + yy
  const monthStr = MONTHS[mm - 1] ?? '???'
  const dayStr = String(dd).padStart(2, '0')
  return `${monthStr} ${dayStr}, ${year}`
}

/**
 * Parse a blog filename in the form YYMMDD-Title_With_Underscores.md,
 * or YYMMDD-YYMMDD-Title_With_Underscores.md when a revised date is
 * present (the second YYMMDD segment).
 *
 * Returns an object with:
 *   - title:   the title with underscores replaced by spaces
 *   - date:    published date formatted as "Mmm DD, YYYY"
 *   - revised: revised date formatted as "Mmm DD, YYYY", or '' if absent
 */
function parseFilename(src) {
  const basename = src.split('/').pop()
  const noExt = basename.replace(/\.md$/, '')

  // Match leading YYMMDD date segment
  const dateRe = /^(\d{6})-/
  const firstMatch = noExt.match(dateRe)

  if (!firstMatch) {
    return {title: noExt.replace(/_/g, ' '), date: '', revised: ''}
  }

  const publishedDate = formatDate(firstMatch[1])
  const rest = noExt.slice(firstMatch[0].length)

  // Check whether the next segment is also a YYYYMMDD date (revised date)
  const secondMatch = rest.match(dateRe)
  let revisedDate = ''
  let titlePart

  if (secondMatch) {
    revisedDate = formatDate(secondMatch[1])
    titlePart = rest.slice(secondMatch[0].length)
  } else {
    titlePart = rest
  }

  return {
    title: titlePart.replace(/_/g, ' '),
    date: publishedDate,
    revised: revisedDate,
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
    _revised: {state: true},
  }

  static styles = css`
    :host {
      display: block;
      /* override sl-card background var. */
      --sl-panel-background-color: var(--color-surface-card);
    }

    blog-card {
      margin-bottom: 2rem;
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
      font-family: var(--font-heading);
      padding-bottom: var(--sl-spacing-medium);
      border-bottom: 1px solid;
      border-color: var(--accent-color);
    }

    .header-title {
      font-weight: 600;
      font-size: var(--sl-font-size-large);
      color: var(--color-text-primary);
    }

    .header-dates {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: var(--sl-spacing-medium);
    }

    .header-date,
    .header-revised {
      font-size: var(--sl-font-size-small);
      color: var(--color-text-secondary);
      white-space: nowrap;
    }

    .header-revised {
      font-style: italic;
    }

    .loading {
      padding: 1rem;
      color: var(--color-text-primary);
      font-style: italic;
    }

    .error {
      padding: 1rem;
      color: var(--color-danger);
      background: var(--color-surface-muted);
      border-radius: var(--sl-border-radius-medium);
    }

    .content {
      line-height: 1.6;
      color: var(--color-text-primary);
      background: transparent;
      padding-bottom: var(--sl-spacing-medium);
      padding-left: var(--sl-spacing-medium);
      padding-right: var(--sl-spacing-medium);
      font-family: var(--font-content);
      font-size: var(--sl-font-size-large);
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
    this._revised = ''
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.src) {
      const {title, date, revised} = parseFilename(this.src)
      this._title = title
      this._date = date
      this._revised = revised
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
      const {marked} =
        await import('https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js')

      const renderedHtml = await marked(markdown)

      // Sanitize rendered HTML to prevent XSS (DOMPurify ESM)
      let cleanHtml = renderedHtml
      try {
        const dompurifyModule = await import('https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.es.js')
        const DOMPurify = dompurifyModule.default ?? dompurifyModule.DOMPurify ?? dompurifyModule
        cleanHtml = DOMPurify.sanitize(renderedHtml)
      } catch (e) {
        // If DOMPurify fails to load, fall back to unsanitized HTML but log a warning.
        console.warn('DOMPurify failed to load; rendering unsanitized HTML', e)
      }

      this._content = cleanHtml
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
          <div class="header-dates">
            <span class="header-date">${this._date}</span>
            ${this._revised ?
              html`
                <span class="header-revised">Revised: ${this._revised}</span>
              `
            : ''}
          </div>
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
