import {
  LitElement,
  html,
  css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'

class SiteHeader extends LitElement {
  /* note comment blocks before string literals are a hint to prettier */
  static styles = /* css */ css`
    :host {
      display: block;
      border-bottom: 1px solid var(--accent-slate-blue);
      background: var(--color-surface-page);
      color: var(--color-parchment-espresso);
    }

    .header-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: var(--sl-spacing-large) var(--sl-spacing-medium)
        var(--sl-spacing-medium);
      position: relative;
    }

    .header-right {
      position: absolute;
      top: 1.5rem;
      right: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--sl-spacing-medium);
    }

    .header-right a.active {
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
    }

    .github-link {
      color: var(--color-text-primary);
      text-decoration: none;
    }

    .github-link svg {
      width: 28px;
      height: 28px;
      fill: currentColor;
      display: block;
    }

    .gitlab-link {
      color: var(--color-text-primary);
      text-decoration: none;
    }

    .design-link {
      font-size: var(--sl-font-size-medium);
      color: var(--color-text-primary);
      text-decoration: none;
    }

    h1 {
      margin: 0 0 1rem;
      font-size: calc(var(--sl-font-size-2x-large) * 1.5);
      font-family: 'Playwrite New Zealand Basic', cursive;
      color: var(--color-text-primary);
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
      color: var(--color-link);
      font-size: var(--sl-font-size-large);
      transition:
        background 0.2s,
        color 0.2s;
    }

    nav a:hover {
      color: var(--color-link-hover);
    }

    nav a.active {
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
    }

    nav a sl-icon {
      color: var(--parchment-lightest);
    }

    nav a:hover sl-icon {
      color: var(--color-surface-card-solid);
    }

    nav a.active sl-icon {
      color: white;
    }
  `

  render() {
    const currentPath = window.location.pathname

    return /* html */ html`
      <div class="header-inner">
        <div class="header-right">
          <a
            class="github-link"
            href="https://github.com/alflanagan/lloydflanagan_ai"
            target="_blank"
            rel="noopener"
            title="View on GitHub">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
          <a
            class="gitlab-link"
            href="https://gitlab.com/alflanagan/lloydflanagan_ai"
            target="_blank"
            rel="noopener"
            title="View on Gitlab">
            <span aria-hidden="true" data-testid="brand-header-default-logo">
              <svg
                aria-hidden="true"
                role="img"
                class="tanuki-logo"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  class="tanuki-shape tanuki"
                  d="m24.507 9.5-.034-.09L21.082.562a.896.896 0 0 0-1.694.091l-2.29 7.01H7.825L5.535.653a.898.898 0 0 0-1.694-.09L.451 9.411.416 9.5a6.297 6.297 0 0 0 2.09 7.278l.012.01.03.022 5.16 3.867 2.56 1.935 1.554 1.176a1.051 1.051 0 0 0 1.268 0l1.555-1.176 2.56-1.935 5.197-3.89.014-.01A6.297 6.297 0 0 0 24.507 9.5Z"
                  fill="#E24329"></path>
                <path
                  class="tanuki-shape right-cheek"
                  d="m24.507 9.5-.034-.09a11.44 11.44 0 0 0-4.56 2.051l-7.447 5.632 4.742 3.584 5.197-3.89.014-.01A6.297 6.297 0 0 0 24.507 9.5Z"
                  fill="#FC6D26"></path>
                <path
                  class="tanuki-shape chin"
                  d="m7.707 20.677 2.56 1.935 1.555 1.176a1.051 1.051 0 0 0 1.268 0l1.555-1.176 2.56-1.935-4.743-3.584-4.755 3.584Z"
                  fill="#FCA326"></path>
                <path
                  class="tanuki-shape left-cheek"
                  d="M5.01 11.461a11.43 11.43 0 0 0-4.56-2.05L.416 9.5a6.297 6.297 0 0 0 2.09 7.278l.012.01.03.022 5.16 3.867 4.745-3.584-7.444-5.632Z"
                  fill="#FC6D26"></path>
              </svg>
            </span>
          </a>
          <a class="design-link ${currentPath === '/design' ? 'active' : ''}"
             href="/design"
             ${currentPath === '/design' ? '[aria-disabled="true"]' : ''}>
          Design
          </a>
        </div>
        <h1><a href="/">A Lloyd Flanagan</a></h1>
        <nav>
          <a
            href="/"
            class="${currentPath === '/' ? 'active' : ''}"
            title="Home"
            aria-label="Home"
            ${currentPath === '/' ? '[aria-disabled="true"]' : ''}">
            Home
          </a>
          <a
            href="/about"
            class="${currentPath === '/about' ? 'active' : ''}"
            ${currentPath === '/about' ? '[aria-disabled="true"]' : ''}>
            About Me
          </a>
          <a href="/blog" class="${currentPath === '/blog' ? 'active' : ''}" ${currentPath === '/blog' ? '[aria-disabled="true"]' : ''}>
            Blog
          </a>
          <a
            href="/education"
            class="${currentPath === '/education' ? 'active' : ''}" ${currentPath === '/education' ? '[aria-disabled="true"]' : ''}>
            Education
          </a>
          <a
            href="/prompts"
            class="${currentPath === '/prompts' ? 'active' : ''}" ${currentPath === '/prompts' ? '[aria-disabled="true"]' : ''}>
            Prompts
          </a>
        </nav>
      </div>
    `
  }
}

customElements.define('site-header', SiteHeader)
