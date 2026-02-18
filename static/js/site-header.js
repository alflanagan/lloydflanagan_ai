import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class SiteHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--sl-color-neutral-0);
      border-bottom: 1px solid var(--sl-color-neutral-200);
    }

    .header-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 1.5rem 1rem 1rem;
    }

    h1 {
      margin: 0 0 1rem;
      font-size: calc(var(--sl-font-size-2x-large) * 1.5);
      font-family: 'Playwrite New Zealand Basic', cursive;
      color: var(--sl-color-neutral-900);
      text-align: center;
    }

    nav {
      display: flex;
      gap: 1rem;
    }
  `;

  render() {
    const currentPath = window.location.pathname;

    return html`
      <div class="header-inner">
        <h1>A Lloyd Flanagan</h1>
        <nav>
          <sl-button variant="${currentPath === '/about' ? 'primary' : 'text'}" href="/about">About Me</sl-button>
          <sl-button variant="${currentPath === '/blog' ? 'primary' : 'text'}" href="/blog">Blog</sl-button>
          <sl-button variant="${currentPath === '/education' ? 'primary' : 'text'}" href="/education">Education</sl-button>
        </nav>
      </div>
    `;
  }
}

customElements.define('site-header', SiteHeader);
