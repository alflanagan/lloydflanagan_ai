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

    nav a {
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: var(--sl-border-radius-medium, 0.25rem);
      color: var(--sl-color-neutral-700);
      font-size: var(--sl-font-size-medium);
      transition: background 0.2s, color 0.2s;
    }

    nav a:hover {
      background: var(--sl-color-neutral-100);
      color: var(--sl-color-neutral-900);
    }

    nav a.active {
      background: var(--sl-color-primary-600, #0969da);
      color: white;
    }
  `;

  render() {
    const currentPath = window.location.pathname;

    return html`
      <div class="header-inner">
        <h1>A Lloyd Flanagan</h1>
        <nav>
          <a href="/about" class="${currentPath === '/about' ? 'active' : ''}">About Me</a>
          <a href="/blog" class="${currentPath === '/blog' ? 'active' : ''}">Blog</a>
          <a href="/education" class="${currentPath === '/education' ? 'active' : ''}">Education</a>
          <a href="/prompts" class="${currentPath === '/prompts' ? 'active' : ''}">Prompts</a>
        </nav>
      </div>
    `;
  }
}

customElements.define('site-header', SiteHeader);
