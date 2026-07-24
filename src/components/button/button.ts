import { type PropertyValues, ReactiveElement } from "lit";

export type OreButtonType = "button" | "reset" | "submit";

export class OreButton extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    disabled: { type: Boolean, reflect: true },
    type: { type: String, reflect: true },
  };

  declare disabled: boolean;
  declare type: OreButtonType;

  readonly #internals = this.attachInternals();
  #formDisabled = false;
  #tabIndex = 0;

  constructor() {
    super();
    this.disabled = false;
    this.type = "submit";
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }

    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeyDown);
    this.addEventListener("keyup", this.#handleKeyUp);
    this.addEventListener("pointerdown", this.#handlePointerDown);
    this.addEventListener("blur", this.#releasePress);
    this.#syncAccessibility();
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("keydown", this.#handleKeyDown);
    this.removeEventListener("keyup", this.#handleKeyUp);
    this.removeEventListener("pointerdown", this.#handlePointerDown);
    this.removeEventListener("blur", this.#releasePress);
    this.#releasePress();
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("disabled")) {
      this.#syncAccessibility();
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.toggleAttribute("form-disabled", disabled);
    this.#syncAccessibility();
  }

  #isDisabled(): boolean {
    return this.disabled || this.#formDisabled;
  }

  #syncAccessibility(): void {
    const disabled = this.#isDisabled();

    this.setAttribute("role", "button");
    this.setAttribute("aria-disabled", String(disabled));

    if (disabled) {
      if (this.tabIndex >= 0) {
        this.#tabIndex = this.tabIndex;
      }
      this.tabIndex = -1;
    } else if (this.tabIndex < 0) {
      this.tabIndex = this.#tabIndex;
    }
  }

  readonly #handleClick = (event: MouseEvent): void => {
    if (this.#isDisabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (this.type === "reset") {
      this.#internals.form?.reset();
    } else if (this.type === "submit") {
      this.#internals.form?.requestSubmit();
    }
  };

  readonly #handleKeyDown = (event: KeyboardEvent): void => {
    if (this.#isDisabled()) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      this.click();
    } else if (event.key === " ") {
      event.preventDefault();
      this.setAttribute("pressed", "");
    }
  };

  readonly #handleKeyUp = (event: KeyboardEvent): void => {
    if (!this.#isDisabled() && event.key === " ") {
      event.preventDefault();
      this.#releasePress();
      this.click();
    }
  };

  readonly #handlePointerDown = (event: PointerEvent): void => {
    if (this.#isDisabled() || event.button !== 0) {
      return;
    }

    this.setAttribute("pressed", "");
    window.addEventListener("pointerup", this.#releasePress, { once: true });
    window.addEventListener("pointercancel", this.#releasePress, {
      once: true,
    });
  };

  readonly #releasePress = (): void => {
    this.removeAttribute("pressed");
    window.removeEventListener("pointerup", this.#releasePress);
    window.removeEventListener("pointercancel", this.#releasePress);
  };
}

if (!customElements.get("ore-button")) {
  customElements.define("ore-button", OreButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-button": OreButton;
  }
}
