import { ReactiveElement } from "lit";

export class OreNavbar extends ReactiveElement {
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

if (!customElements.get("ore-navbar")) {
  customElements.define("ore-navbar", OreNavbar);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-navbar": OreNavbar;
  }
}
