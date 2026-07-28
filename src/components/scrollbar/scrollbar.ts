import { ReactiveElement } from "lit";

export class OreScrollbar extends ReactiveElement {
  #managesTabIndex = false;
  #managedTabIndex: string | null = null;
  #tabIndexInitialized = false;
  #initialSync: number | undefined;
  readonly #resizeObserver = new ResizeObserver(() => this.#syncTabIndex());
  readonly #tabIndexObserver = new MutationObserver(() => {
    if (this.getAttribute("tabindex") !== this.#managedTabIndex) {
      this.#managesTabIndex = false;
    }
  });
  readonly #mutationObserver = new MutationObserver(() => {
    this.#observeContent();
    this.#syncTabIndex();
  });

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.#tabIndexInitialized) {
      this.#managesTabIndex = !this.hasAttribute("tabindex");
      this.#tabIndexInitialized = true;
    }

    this.addEventListener("keydown", this.#handleKeydown);
    this.#mutationObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    this.#tabIndexObserver.observe(this, {
      attributeFilter: ["tabindex"],
    });
    this.#observeContent();
    this.#syncTabIndex();
    this.#initialSync = window.setTimeout(() => this.#syncTabIndex());
  }

  override disconnectedCallback(): void {
    this.removeEventListener("keydown", this.#handleKeydown);
    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();
    this.#tabIndexObserver.disconnect();
    window.clearTimeout(this.#initialSync);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  #observeContent(): void {
    this.#resizeObserver.disconnect();
    this.#resizeObserver.observe(this);

    for (const child of this.children) {
      this.#resizeObserver.observe(child);
    }
  }

  #syncTabIndex(): void {
    if (this.#managesTabIndex) {
      const scrollable =
        this.scrollHeight > this.clientHeight ||
        this.scrollWidth > this.clientWidth;
      const tabIndex = scrollable ? 0 : -1;

      this.#managedTabIndex = String(tabIndex);
      this.tabIndex = tabIndex;
    }
  }

  readonly #handleKeydown = (event: KeyboardEvent): void => {
    if (event.target !== this) {
      return;
    }

    const vertical = this.scrollHeight > this.clientHeight;
    const scrollBy: Partial<Record<string, { left?: number; top?: number }>> = {
      ArrowDown: { top: 40 },
      ArrowLeft: { left: -40 },
      ArrowRight: { left: 40 },
      ArrowUp: { top: -40 },
      PageDown: vertical
        ? { top: this.clientHeight }
        : { left: this.clientWidth },
      PageUp: vertical
        ? { top: -this.clientHeight }
        : { left: -this.clientWidth },
    };

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (vertical) {
        this.scrollTop = event.key === "Home" ? 0 : this.scrollHeight;
      } else {
        this.scrollLeft = event.key === "Home" ? 0 : this.scrollWidth;
      }
      return;
    }

    const offset = scrollBy[event.key];

    if (offset) {
      event.preventDefault();
      this.scrollBy(offset);
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
