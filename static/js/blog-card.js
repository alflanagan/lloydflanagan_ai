import {
  LitElement,
  html,
  css,
  unsafeHTML,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js'

import './basic-card.js'

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

/**
 * Extract the first plain-text paragraph from a markdown string.
 * Used for the excerpt in preview mode.
 */
function extractExcerpt(markdown) {
  // Split into lines, skip headings/blank lines, take first paragraph block
  const lines = markdown.split('\n')
  const paraLines = []
  let inPara = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (inPara) break
      continue
    }
    if (trimmed.startsWith('#')) continue
    inPara = true
    paraLines.push(trimmed)
  }

  return paraLines.join(' ').replace(/[*_`[\]]/g, '')
}

class BlogCard extends LitElement {
  static properties = {
    src: {type: String},
    preview: {type: Boolean},
    _content: {state: true},
    _excerpt: {state: true},
    _loading: {state: true},
    _error: {state: true},
    _title: {state: true},
    _date: {state: true},
    _revised: {state: true},
  }

  static styles = css`
    :host {
      display: block;

      /* ── Font sizes ──────────────────────────────────────────── */
      --bc-font-size-title: 19px;
      --bc-font-size-body: 15px;
      --bc-font-size-meta: 13px;
      --bc-font-size-h2: 22px;
      --bc-font-size-h3: 18px;
      --bc-font-size-label: 11.5px;

      /* ── Spacing ─────────────────────────────────────────────── */
      --bc-padding-card-x: 28px;
      --bc-padding-header-y: 16px;
      --bc-padding-body-top: 20px;
      --bc-meta-indent: 16px;
      --bc-preview-row-gap: 10px;
      --bc-excerpt-gap: 8px;

      /* ── Shape & shadow ──────────────────────────────────────── */
      --bc-radius-card: 14px;
      --bc-radius-block: 8px;
      --bc-radius-code: 4px;
      --bc-shadow-card: 0 3px 14px rgba(61, 28, 8, 0.08);
    }

    basic-card::part(base) {
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--bc-radius-card);
      background: var(--color-surface-card);
      box-shadow: var(--bc-shadow-card);
    }

    basic-card::part(header) {
      padding: var(--bc-padding-header-y) var(--bc-padding-card-x);
      border-bottom: 1px solid var(--color-border-subtle);
    }

    basic-card::part(body) {
      padding: var(--bc-padding-body-top) var(--bc-padding-card-x)
        var(--bc-padding-card-x);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
    }

    .header-title {
      font-family: Georgia, serif;
      font-weight: bold;
      font-size: var(--bc-font-size-title);
      color: var(--color-text-primary);
    }

    .header-dates {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: var(--bc-meta-indent);
    }

    .header-date,
    .header-revised {
      font-family: Georgia, serif;
      font-style: italic;
      font-size: var(--bc-font-size-meta);
      color: var(--color-text-secondary);
      white-space: nowrap;
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
      border-radius: var(--bc-radius-block);
    }

    .content {
      font-family: Georgia, serif;
      font-size: var(--bc-font-size-body);
      line-height: 1.7;
      color: var(--color-text-primary);
      background: transparent;
    }

    .content h1,
    .content h2,
    .content h3,
    .content h4,
    .content h5,
    .content h6 {
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: bold;
    }

    .content h2 {
      font-size: var(--bc-font-size-h2);
    }

    .content h3 {
      font-size: var(--bc-font-size-h3);
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
      border-radius: var(--bc-radius-code);
      font-family: monospace;
      font-size: 0.9em;
    }

    .content pre {
      background: var(--color-surface-muted);
      padding: 1rem;
      border-radius: var(--bc-radius-block);
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
      color: var(--color-text-secondary);
      font-style: italic;
    }

    .content a {
      color: var(--color-link);
      text-decoration: none;
    }

    .content a:hover {
      text-decoration: underline;
    }

    /* ── Preview mode ─────────────────────────────────────────── */
    .preview-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid rgba(192, 144, 80, 0.32);
      padding-bottom: var(--bc-padding-header-y);
      margin-bottom: var(--bc-preview-row-gap);
    }

    .preview-row:last-of-type {
      border-bottom: none;
    }

    .preview-title a {
      font-family: Georgia, serif;
      font-weight: bold;
      font-size: var(--bc-font-size-title);
      color: var(--color-text-primary);
      text-decoration: none;
    }

    .preview-title a:hover {
      color: var(--color-link);
    }

    .preview-date {
      font-family: Georgia, serif;
      font-style: italic;
      font-size: var(--bc-font-size-meta);
      color: var(--color-text-secondary);
      white-space: nowrap;
      margin-left: var(--bc-meta-indent);
    }

    .preview-excerpt {
      font-family: Georgia, serif;
      font-size: var(--bc-font-size-body);
      line-height: 1.7;
      color: var(--color-text-primary);
      margin: 0 0 var(--bc-excerpt-gap);
    }

    .preview-read-more {
      font-family: system-ui, sans-serif;
      font-size: var(--bc-font-size-label);
      font-weight: 600;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--color-link);
      text-decoration: none;
    }

    .preview-read-more:hover {
      text-decoration: underline;
    }
  `

  constructor() {
    super()
    this._content = ''
    this._excerpt = ''
    this._loading = false
    this._error = null
    this._title = ''
    this._date = ''
    this._revised = ''
    this.preview = false
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

      this._excerpt = extractExcerpt(markdown)
      const renderedHtml = await marked(markdown)

      // Sanitize rendered HTML to prevent XSS (DOMPurify ESM)
      let cleanHtml = renderedHtml
      try {
        const dompurifyModule =
          await import('https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.es.js')
        const DOMPurify =
          dompurifyModule.default ??
          dompurifyModule.DOMPurify ??
          dompurifyModule
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

  _postUrl() {
    if (!this.src) return '#'
    const filename = this.src.split('/').pop()
    return `/content/blog/${filename}`
  }

  _blogUrl() {
    if (!this.src) return '#'
    const filename = this.src.split('/').pop()
    return `/blog#post-${filename.replace(/\.md$/, '')}`
  }

  render() {
    if (this.preview) {
      return html`
        <div class="preview-row">
          <div style="flex: 1; min-width: 0;">
            <div
              style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="preview-title">
                <a href="${this._postUrl()}">${this._title}</a>
              </span>
              <span class="preview-date">${this._date}</span>
            </div>
            ${this._excerpt ?
              html`
                <p class="preview-excerpt">${this._excerpt}</p>
              `
            : ''}
            <a class="preview-read-more" href="${this._blogUrl()}">
              Read more →
            </a>
          </div>
        </div>
      `
    }

    return html`
      <basic-card>
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
      </basic-card>
    `
  }
}

customElements.define('blog-card', BlogCard)
