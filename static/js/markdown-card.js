import {
  LitElement,
  html,
  css,
  unsafeHTML,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js'

import './basic-card.js'

class MarkdownCard extends LitElement {
  static properties = {
    src: {type: String},
    // should we make "title" a separate property? Currently using #Title in
    // markdown content
    _content: {state: true},
    _loading: {state: true},
    _error: {state: true},
  }

  static styles = css`
    :host {
      display: block;

      /* ── Font sizes ──────────────────────────────────────────── */
      --mc-font-size-body: 16px;
      --mc-font-size-h2: 25px;
      --mc-font-size-h3: 20px;

      /* ── Spacing ─────────────────────────────────────────────── */
      --mc-padding-card-y: 28px;
      --mc-padding-card-x: 30px;

      /* ── Shape & shadow ──────────────────────────────────────── */
      --mc-radius-card: 14px;
      --mc-radius-block: 8px;
      --mc-radius-code: 4px;
      --mc-shadow-card: 0 3px 14px rgba(61, 28, 8, 0.08);
    }

    basic-card {
      border-radius: var(--mc-radius-card);
      box-shadow: var(--mc-shadow-card);
    }

    basic-card::part(base) {
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--mc-radius-card);
      background: var(--color-surface-card);
    }

    basic-card::part(body) {
      padding: var(--mc-padding-card-y) var(--mc-padding-card-x);
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
      border-radius: var(--mc-radius-block);
    }

    .content {
      font-family: Georgia, serif;
      font-size: var(--mc-font-size-body);
      line-height: 1.75;
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
      font-size: var(--mc-font-size-h2);
    }

    .content h3 {
      font-size: var(--mc-font-size-h3);
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
      border-radius: var(--mc-radius-code);
      font-family: monospace;
      font-size: 0.9em;
    }

    .content pre {
      background: var(--color-surface-muted);
      padding: 1rem;
      border-radius: var(--mc-radius-block);
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
  `

  constructor() {
    super()
    this._content = ''
    this._loading = false
    this._error = null
  }

  connectedCallback() {
    super.connectedCallback()
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

      // Dynamically import marked
      const {marked} =
        await import('https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js')

      // Convert markdown to HTML
      const html = await marked(markdown)
      this._content = html
    } catch (error) {
      this._error = error.message
      console.error('Error loading markdown:', error)
    } finally {
      this._loading = false
    }
  }

  render() {
    return html`
      <basic-card>
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

customElements.define('markdown-card', MarkdownCard)
