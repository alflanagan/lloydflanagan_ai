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
      position: relative;
    }

    .github-link {
      position: absolute;
      top: 1.5rem;
      right: 1rem;
      color: var(--sl-color-neutral-600);
      transition: color 0.2s;
    }

    .github-link:hover {
      color: var(--sl-color-neutral-900);
    }

    .github-link svg {
      width: 28px;
      height: 28px;
      fill: currentColor;
    }

    h1 {
      margin: 0 0 1rem;
      font-size: calc(var(--sl-font-size-2x-large) * 1.5);
      font-family: 'Playwrite New Zealand Basic', cursive;
      color: var(--sl-color-neutral-900);
      text-align: center;
    }

    h1 a {
      color: inherit;
      text-decoration: none;
    }

    h1 a:hover {
      opacity: 0.8;
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
        <a class="github-link" href="https://github.com/alflanagan/lloydflanagan_ai" target="_blank" rel="noopener" title="View on GitHub">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
        <h1><a href="/">A Lloyd Flanagan</a></h1>
        <nav>
          <a href="/" class="${currentPath === '/' ? 'active' : ''}">Home</a>
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
