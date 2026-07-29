import { ReactiveElement } from "lit";

export class OreToggles extends ReactiveElement {
  readonly #observer = new MutationObserver(() => this.#syncTabs());

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.#observer.observe(this, { childList: true, subtree: true });
    this.#syncTabs();
  }

  override disconnectedCallback(): void {
    this.#observer.disconnect();
    super.disconnectedCallback();
  }

  #syncTabs(): void {
    for (const tab of this.querySelectorAll("ore-tab-button")) {
      tab.setAttribute("palette", "toggle");
    }
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }
}

if (!customElements.get("ore-toggles")) {
  customElements.define("ore-toggles", OreToggles);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-toggles": OreToggles;
  }
}
