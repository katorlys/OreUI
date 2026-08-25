import { LegacyButton } from "../../behaviors/legacy-button.js";

export class OreIconButton extends LegacyButton {}

if (!customElements.get("ore-icon-button")) {
  customElements.define("ore-icon-button", OreIconButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-icon-button": OreIconButton;
  }
}
