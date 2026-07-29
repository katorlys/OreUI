import { type PropertyValues, ReactiveElement } from "lit";

export class OreCheckbox extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    name: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
    value: { type: String },
  };

  declare checked: boolean;
  declare disabled: boolean;
  declare name: string;
  declare required: boolean;
  declare value: string;

  readonly #internals = this.attachInternals();
  #defaultChecked = false;
  #formDisabled = false;
  #tabIndex = 0;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.name = "";
    this.required = false;
    this.value = "on";
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get labels(): NodeList {
    return this.#internals.labels;
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  get validationMessage(): string {
    return this.#internals.validationMessage;
  }

  get willValidate(): boolean {
    return this.#internals.willValidate;
  }

  checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  override connectedCallback(): void {
    this.#defaultChecked = this.hasAttribute("checked");
    super.connectedCallback();

    if (!this.hasAttribute("tabindex")) {
      this.tabIndex = 0;
    }

    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeyDown);
    this.addEventListener("keyup", this.#handleKeyUp);
    this.addEventListener("pointerdown", this.#handlePointerDown);
    this.addEventListener("blur", this.#releasePress);
    this.#sync();
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
    if (
      changed.has("checked") ||
      changed.has("disabled") ||
      changed.has("required") ||
      changed.has("value")
    ) {
      this.#sync();
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.#formDisabled = disabled;
    this.toggleAttribute("form-disabled", disabled);
    this.#sync();
  }

  formResetCallback(): void {
    this.checked = this.#defaultChecked;
    this.#sync();
  }

  #isDisabled(): boolean {
    return this.disabled || this.#formDisabled;
  }

  #sync(): void {
    const disabled = this.#isDisabled();

    this.setAttribute("role", "checkbox");
    this.setAttribute("aria-checked", String(this.checked));
    this.setAttribute("aria-disabled", String(disabled));
    this.setAttribute("aria-required", String(this.required));
    this.#internals.setFormValue(this.checked ? this.value : null);
    this.#internals.setValidity(
      this.required && !this.checked ? { valueMissing: true } : {},
      this.required && !this.checked ? "Please check this box." : "",
    );

    if (disabled) {
      if (this.tabIndex >= 0) {
        this.#tabIndex = this.tabIndex;
      }
      this.tabIndex = -1;
    } else if (this.tabIndex < 0) {
      this.tabIndex = this.#tabIndex;
    }
  }

  #toggle(): void {
    this.checked = !this.checked;
    this.#sync();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  readonly #handleClick = (event: MouseEvent): void => {
    if (this.#isDisabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.#toggle();
  };

  readonly #handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.#isDisabled() && event.key === " ") {
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

if (!customElements.get("ore-checkbox")) {
  customElements.define("ore-checkbox", OreCheckbox);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-checkbox": OreCheckbox;
  }
}
