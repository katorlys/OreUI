import { ReactiveElement } from "lit";

export type OreContainerVariant = "dark" | "light";

export class OreContainer extends ReactiveElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  declare variant: OreContainerVariant;

  constructor() {
    super();
    this.variant = "dark";
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-container")) {
  customElements.define("ore-container", OreContainer);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-container": OreContainer;
  }
}
