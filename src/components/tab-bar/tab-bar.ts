import { ReactiveElement } from "lit";

import "../tab-button/tab-button.js";

export class OreTabBar extends ReactiveElement {
  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-tab-bar")) {
  customElements.define("ore-tab-bar", OreTabBar);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-tab-bar": OreTabBar;
  }
}
