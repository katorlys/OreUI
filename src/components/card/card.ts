import { ReactiveElement } from "lit";

export class OreCard extends ReactiveElement {
  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-card")) {
  customElements.define("ore-card", OreCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-card": OreCard;
  }
}
