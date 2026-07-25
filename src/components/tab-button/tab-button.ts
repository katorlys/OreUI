import { type PropertyValues } from "lit";

import { OreButton } from "../button/button.js";

export type OreTabButtonPalette = "default" | "toggle";

export class OreTabButton extends OreButton {
  static properties = {
    ...OreButton.properties,
    palette: { type: String, reflect: true },
    selected: { type: Boolean, reflect: true },
  };

  declare palette: OreTabButtonPalette;
  declare selected: boolean;

  constructor() {
    super();
    this.palette = "default";
    this.selected = false;
    this.type = "button";
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.#handleSelect);
    this.addEventListener("keydown", this.#handleNavigation);
    this.#syncTab();
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleSelect);
    this.removeEventListener("keydown", this.#handleNavigation);
    super.disconnectedCallback();
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("selected") || changed.has("disabled")) {
      this.#syncTab();
    }
  }

  #tabs(): OreTabButton[] {
    const tablist = this.closest('[role="tablist"]');
    return tablist
      ? [...tablist.querySelectorAll<OreTabButton>("ore-tab-button")]
      : [this];
  }

  #syncTab(): void {
    this.setAttribute("role", "tab");
    this.setAttribute("aria-selected", String(this.selected));

    if (this.getAttribute("aria-disabled") !== "true") {
      this.tabIndex =
        this.selected || !this.#tabs().some((tab) => tab.selected) ? 0 : -1;
    }
  }

  #select(): void {
    if (this.getAttribute("aria-disabled") === "true" || this.selected) {
      return;
    }

    for (const tab of this.#tabs()) {
      tab.selected = tab === this;
    }

    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  #move(offset: number): void {
    const tabs = this.#tabs().filter(
      (tab) => tab.getAttribute("aria-disabled") !== "true",
    );
    const index = tabs.indexOf(this);
    const next = tabs[(index + offset + tabs.length) % tabs.length];

    if (next) {
      next.focus();
      next.#select();
    }
  }

  #selectEdge(edge: "first" | "last"): void {
    const tabs = this.#tabs().filter(
      (tab) => tab.getAttribute("aria-disabled") !== "true",
    );
    const next = edge === "first" ? tabs[0] : tabs.at(-1);

    if (next) {
      next.focus();
      next.#select();
    }
  }

  readonly #handleSelect = (): void => {
    this.#select();
  };

  readonly #handleNavigation = (event: KeyboardEvent): void => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      this.#move(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      this.#move(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      this.#selectEdge("first");
    } else if (event.key === "End") {
      event.preventDefault();
      this.#selectEdge("last");
    }
  };
}

if (!customElements.get("ore-tab-button")) {
  customElements.define("ore-tab-button", OreTabButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-tab-button": OreTabButton;
  }
}
