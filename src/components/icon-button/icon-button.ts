import { OreButton } from "../button/button.js";

export class OreIconButton extends OreButton {}

if (!customElements.get("ore-icon-button")) {
  customElements.define("ore-icon-button", OreIconButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-icon-button": OreIconButton;
  }
}
