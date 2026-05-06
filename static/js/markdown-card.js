import { LitElement, html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

class MarkdownCard extends LitElement {
  static properties = {
    src: { type: String },
    // should we make "title" a separate property? Currently using #Title in
    // markdown content
    _content: { state: true },
    _loading: { state: true },
    _error: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background-color: var(--color-surface-card);
      border-color: var(--color-border-strong);
      /* --color-border-subtle isn't visible with the background texture */
    }

    .loading {
      padding: 1rem;
      color: var(--sl-color-neutral-600);
      font-style: italic;
    }

    .error {
      padding: 1rem;
      color: var(--color-danger);
      background: var(--color-danger);
      background-opacity: 0.5;
      border-radius: var(--sl-border-radius-medium);
    }

    .content {
      line-height: 1.6;
      color: var(--sl-color-neutral-800);
    }

    .content h1,
    .content h2,
    .content h3,
    .content h4,
    .content h5,
    .content h6 {
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--sl-color-neutral-900);
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
      background: var(--sl-color-neutral-100);
      padding: 0.2rem 0.4rem;
      border-radius: var(--sl-border-radius-small);
      font-family: monospace;
      font-size: 0.9em;
    }

    .content pre {
      background: var(--sl-color-neutral-100);
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
      color: var(--sl-color-primary-600);
      text-decoration: none;
    }

    .content a:hover {
      text-decoration: underline;
    }
  `;

  constructor() {
    super();
    this._content = '';
    this._loading = false;
    this._error = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadMarkdown();
  }

  async loadMarkdown() {
    if (!this.src) {
      this._error = 'No src attribute provided';
      return;
    }

    this._loading = true;
    this._error = null;

    try {
      const response = await fetch(this.src);
      if (!response.ok) {
        throw new Error(`Failed to load ${this.src}: ${response.statusText}`);
      }

      const markdown = await response.text();

      // Dynamically import marked
      const { marked } = await import('https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js');

      // Convert markdown to HTML
      const html = await marked(markdown);
      this._content = html;
    } catch (error) {
      this._error = error.message;
      console.error('Error loading markdown:', error);
    } finally {
      this._loading = false;
    }
  }

  render() {
    return html`
      <sl-card>
        ${this._loading ? html`<div class="loading">Loading...</div>` : ''}
        ${this._error ? html`<div class="error">Error: ${this._error}</div>` : ''}
        ${!this._loading && !this._error ? html`<div class="content">${unsafeHTML(this._content)}</div>` : ''}
      </sl-card>
    `;
  }
}

customElements.define('markdown-card', MarkdownCard);
