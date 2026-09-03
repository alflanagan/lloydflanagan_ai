import {
  LitElement,
  html,
  css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'

class SiteHeader extends LitElement {
  static properties = {
    _menuOpen: {state: true},
  }

  /* note comment blocks before string literals are a hint to prettier */
  static styles = css`
    :host {
      display: block;
      background: transparent;
    }

    /* ── Masthead wrapper ─────────────────────────────────────── */
    .masthead {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 36px 24px 0;
      position: relative;
    }

    /* ── Crest / logo ─────────────────────────────────────────── */
    .crest {
      width: 60px;
      height: 60px;
      border-radius: 13px;
      box-shadow: 0 3px 11px rgba(61, 28, 8, 0.32);
      object-fit: cover;
      margin-bottom: 14px;
    }

    /* ── Brand name ───────────────────────────────────────────── */
    .brand {
      font-family: 'Playwrite New Zealand Basic', cursive;
      font-size: 40px;
      line-height: 1.35;
      color: var(--color-text-primary);
      text-align: center;
      margin: 0 0 6px;
    }

    .brand a {
      color: inherit;
      text-decoration: none;
    }

    .brand a:hover {
      opacity: 0.8;
    }

    /* ── Tagline ──────────────────────────────────────────────── */
    .tagline {
      font-family: Georgia, serif;
      font-style: italic;
      font-size: 15px;
      color: var(--color-text-secondary);
      margin: 0 0 22px;
      text-align: center;
    }

    /* ── Nav ──────────────────────────────────────────────────── */
    nav {
      display: flex;
      flex-direction: row;
      gap: 26px;
      justify-content: center;
      align-items: center;
    }

    nav a {
      font-family: system-ui, sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
      text-decoration: none;
      padding-bottom: 4px;
      border-bottom: 2px solid transparent;
      transition:
        color 0.15s,
        border-color 0.15s;
    }

    nav a:hover {
      color: var(--color-text-primary);
    }

    nav a.active {
      color: var(--color-text-primary);
      border-bottom-color: var(--color-active);
      pointer-events: none;
    }

    /* ── Divider rule ─────────────────────────────────────────── */
    .divider {
      width: 100%;
      max-width: 560px;
      height: 1px;
      border: none;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(192, 144, 80, 0.6),
        transparent
      );
      margin: 30px 0 0;
    }

    /* ── GitHub pill (fixed top-right) ───────────────────────── */
    .github-pill {
      position: fixed;
      top: 16px;
      right: 16px;
      font-family: system-ui, sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
      background: rgba(248, 237, 212, 0.78);
      border: 1px solid var(--color-border-subtle);
      border-radius: 22px;
      padding: 7px 14px;
      text-decoration: none;
      box-shadow: 0 2px 7px rgba(61, 28, 8, 0.1);
      white-space: nowrap;
      z-index: 100;
    }

    .github-pill:hover {
      color: var(--color-text-primary);
    }

    /* ── Gitlab pill (fixed top-right) ───────────────────────── */
    .gitlab-pill {
      position: fixed;
      top: 53px;
      right: 16px;
      font-family: system-ui, sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
      background: rgba(248, 237, 212, 0.78);
      border: 1px solid var(--color-border-subtle);
      border-radius: 22px;
      padding: 7px 14px;
      text-decoration: none;
      box-shadow: 0 2px 7px rgba(61, 28, 8, 0.1);
      white-space: nowrap;
      z-index: 100;
    }

    .gitlab-pill:hover {
      color: var(--color-text-primary);
    }

    /* ── Hamburger button (mobile only) ──────────────────────── */
    .hamburger {
      display: none;
      position: absolute;
      top: 36px;
      right: 16px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      flex-direction: column;
      gap: 5px;
    }

    .hamburger span {
      display: block;
      width: 19px;
      height: 2px;
      background: var(--color-text-primary);
      border-radius: 1px;
    }

    /* ── Mobile drawer ────────────────────────────────────────── */
    .drawer {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(250, 243, 226, 0.97);
      z-index: 200;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .drawer.open {
      display: flex;
    }

    .drawer-close {
      position: absolute;
      top: 16px;
      right: 20px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--color-text-primary);
      line-height: 1;
    }

    .drawer a {
      font-family: system-ui, sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-text-secondary);
      text-decoration: none;
      padding: 11px 13px;
      border-radius: 9px;
      border: 1px solid var(--color-border-subtle);
      background: rgba(248, 237, 212, 0.6);
      width: 180px;
      text-align: center;
    }

    .drawer a.active {
      color: var(--color-text-primary);
      border-color: var(--color-active);
      background: rgba(192, 144, 80, 0.14);
    }

    /* ── Responsive ───────────────────────────────────────────── */
    @media (max-width: 640px) {
      .brand {
        font-size: 16px;
      }

      .crest {
        display: none;
      }

      nav {
        display: none;
      }

      .hamburger {
        display: flex;
      }

      .masthead {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 14px 16px;
      }

      .tagline {
        display: none;
      }

      .divider {
        margin: 10px 0 0;
      }
    }
  `

  constructor() {
    super()
    this._menuOpen = false
  }

  _toggleMenu() {
    this._menuOpen = !this._menuOpen
  }

  _closeMenu() {
    this._menuOpen = false
  }

  render() {
    const currentPath = window.location.pathname

    const navLink = (href, label) => html`
      <a
        href="${href}"
        class="${currentPath === href ? 'active' : ''}"
        @click="${currentPath === href ? (e) => e.preventDefault() : null}">
        ${label}
      </a>
    `

    const drawerLink = (href, label) => html`
      <a
        href="${href}"
        class="${currentPath === href ? 'active' : ''}"
        @click="${() => this._closeMenu()}">
        ${label}
      </a>
    `

    return /* html */ html`
      <a
        class="github-pill"
        href="https://github.com/alflanagan/lloydflanagan_ai"
        target="_blank"
        rel="noopener">
        GitHub ↗
      </a>

    <a
        class="gitlab-pill"
        href="https://gitlab.com/alflanagan/lloydflanagan_ai"
        target="_blank"
        rel="noopener">
        GitLab ↗
      </a>

      <div class="masthead">
        <img
          class="crest"
          src="/static/images/alf-monogram.svg"
          alt="A. Lloyd Flanagan logo" />
        <p class="brand"><a href="/">A. Lloyd Flanagan</a></p>
        <p class="tagline">Father · Husband · Professional Programmer</p>
        <nav>
          ${navLink('/', 'Home')} ${navLink('/about', 'About')}
          ${navLink('/blog', 'Blog')} ${navLink('/education', 'Education')}
          ${navLink('/prompts', 'Prompts')} ${navLink('/design', 'Design')}
        </nav>
        <button
          class="hamburger"
          aria-label="Open navigation"
          @click="${this._toggleMenu}">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <hr class="divider" />
      </div>

      <div class="drawer ${this._menuOpen ? 'open' : ''}">
        <button
          class="drawer-close"
          aria-label="Close navigation"
          @click="${this._closeMenu}">
          ✕
        </button>
        ${drawerLink('/', 'Home')} ${drawerLink('/about', 'About')}
        ${drawerLink('/blog', 'Blog')} ${drawerLink('/education', 'Education')}
        ${drawerLink('/prompts', 'Prompts')} ${drawerLink('/design', 'Design')}
      </div>
    `
  }
}

customElements.define('site-header', SiteHeader)
