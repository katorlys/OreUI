import { ReactiveElement } from "lit";

export class OreDivider extends ReactiveElement {
  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "separator");
    }
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-divider")) {
  customElements.define("ore-divider", OreDivider);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-divider": OreDivider;
  }
}
