import { ReactiveElement } from "lit";

export class OreNav extends ReactiveElement {
  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "navigation");
    }
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-nav")) {
  customElements.define("ore-nav", OreNav);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-nav": OreNav;
  }
}
