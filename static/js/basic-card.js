import {
  LitElement,
  html,
  css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js'

class BasicCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      display: flex;
      flex-direction: column;
    }

    slot {
      display: block;
    }
  `

  render() {
    return html`
      <div part="base" class="card">
        <slot name="header" part="header"></slot>
        <slot part="body"></slot>
      </div>
    `
  }
}

customElements.define('basic-card', BasicCard)
