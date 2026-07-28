import { type PropertyValues, ReactiveElement } from "lit";

let accordionId = 0;

export class OreAccordion extends ReactiveElement {
  static properties = {
    defaultOpen: { type: Boolean, attribute: "default-open" },
    open: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
  };

  declare defaultOpen: boolean;
  declare open: boolean;
  declare value: string;

  constructor() {
    super();
    this.defaultOpen = false;
    this.open = false;
    this.value = "";
  }

  get trigger(): HTMLElement | null {
    return this.querySelector(":scope > .ore-accordion-trigger");
  }

  get content(): HTMLElement | null {
    return this.querySelector(":scope > .ore-accordion-content");
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick);
    this.addEventListener("focusout", this.#handleFocusOut);
    this.#setup();

    if (this.defaultOpen) {
      this.open = true;
    }
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("focusout", this.#handleFocusOut);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("open")) {
      this.#syncOpen();
    }

    if (changed.has("open") && changed.get("open") !== undefined) {
      this.dispatchEvent(
        new CustomEvent<boolean>("open-change", {
          bubbles: true,
          composed: true,
          detail: this.open,
        }),
      );
    }
  }

  #setup(): void {
    const trigger = this.trigger;
    const content = this.content;

    if (!trigger || !content) {
      return;
    }

    if (!content.id) {
      content.id = `ore-accordion-${++accordionId}`;
    }

    trigger.setAttribute("aria-controls", content.id);
    this.#syncOpen();
  }

  #syncOpen(): void {
    const trigger = this.trigger;
    const content = this.content;

    trigger?.setAttribute("aria-expanded", String(this.open));

    if (content) {
      content.hidden = !this.open;
    }
  }

  readonly #handleClick = (event: MouseEvent): void => {
    if (
      event.target instanceof Element &&
      event.target.closest(".ore-accordion-trigger") === this.trigger
    ) {
      this.open = !this.open;
    }
  };

  readonly #handleFocusOut = (event: FocusEvent): void => {
    if (event.target === this.trigger) {
      queueMicrotask(() => this.#syncOpen());
    }
  };
}

if (!customElements.get("ore-accordion")) {
  customElements.define("ore-accordion", OreAccordion);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-accordion": OreAccordion;
  }
}
