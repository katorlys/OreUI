import { ReactiveElement } from "lit";

import "../radio/radio.js";

export class OreRadioGroup extends ReactiveElement {
  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "radiogroup");
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-radio-group")) {
  customElements.define("ore-radio-group", OreRadioGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-radio-group": OreRadioGroup;
  }
}
