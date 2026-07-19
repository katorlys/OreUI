import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getOreUIIcon } from "./icon-list.js";

@customElement("oreui-icon")
export class OreUIIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      inline-size: var(--oreui-icon-size, 24px);
      block-size: var(--oreui-icon-size, 24px);
      flex: none;
      color: inherit;
      vertical-align: middle;
    }

    svg {
      display: block;
      inline-size: 100%;
      block-size: 100%;
      overflow: visible;
      shape-rendering: crispEdges;
    }

    image {
      image-rendering: pixelated;
    }
  `;

  @property({ reflect: true })
  name = "";

  @property({ type: Number, reflect: true })
  size = 24;

  @property()
  label = "";

  protected override render() {
    const renderer = getOreUIIcon(this.name);

    return html`
      <svg
        viewBox="0 0 24 24"
        style=${`--oreui-icon-size: ${this.size}px`}
        role=${this.label ? "img" : "presentation"}
        aria-label=${this.label || undefined}
        aria-hidden=${this.label ? "false" : "true"}
        part="svg"
      >
        ${renderer ? renderer() : svg``}
      </svg>
    `;
  }

  protected override updated() {
    this.style.setProperty("--oreui-icon-size", `${Math.max(1, this.size)}px`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oreui-icon": OreUIIcon;
  }
}
