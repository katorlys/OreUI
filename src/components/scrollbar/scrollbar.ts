import { ReactiveElement } from "lit";

export class OreScrollbar extends ReactiveElement {
  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }

    this.addEventListener("keydown", this.#handleKeydown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener("keydown", this.#handleKeydown);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  readonly #handleKeydown = (event: KeyboardEvent): void => {
    const page = this.clientHeight;
    const scrollBy: Partial<Record<string, number>> = {
      ArrowDown: 40,
      ArrowUp: -40,
      PageDown: page,
      PageUp: -page,
    };

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      this.scrollTop = event.key === "Home" ? 0 : this.scrollHeight;
      return;
    }

    const top = scrollBy[event.key];

    if (top !== undefined) {
      event.preventDefault();
      this.scrollBy({ top });
    }
  };
}

if (!customElements.get("ore-scrollbar")) {
  customElements.define("ore-scrollbar", OreScrollbar);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-scrollbar": OreScrollbar;
  }
}
