import { type PropertyValues, ReactiveElement } from "lit";

export class OreTextField extends ReactiveElement {
  static formAssociated = true;

  static properties = {
    description: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    error: { type: String, reflect: true },
    label: { type: String, reflect: true },
    name: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    readonly: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    type: { type: String, reflect: true },
    value: { type: String },
  };

  declare description: string;
  declare disabled: boolean;
  declare error: string;
  declare label: string;
  declare name: string;
  declare placeholder: string;
  declare readonly: boolean;
  declare required: boolean;
  declare type: string;
  declare value: string;

  readonly #internals = this.attachInternals();
  #defaultValue = "";
  #formDisabled = false;

  constructor() {
    super();
    this.description = "";
    this.disabled = false;
    this.error = "";
    this.label = "";
    this.name = "";
    this.placeholder = "";
    this.readonly = false;
    this.required = false;
    this.type = "text";
    this.value = "";
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

  get input(): HTMLInputElement | null {
    return this.querySelector(":scope > .ore-text-field-control > input");
  }

  checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  override connectedCallback(): void {
    this.#defaultValue = this.getAttribute("value") ?? this.value;
    super.connectedCallback();

    if (!this.input) {
      const label = document.createElement("label");
      const control = document.createElement("span");
      const input = document.createElement("input");
      const description = document.createElement("span");
      const error = document.createElement("span");
      const icon = this.querySelector<HTMLElement>(
        ":scope > .ore-text-field-icon",
      );

      label.className = "ore-text-field-label";
      control.className = "ore-text-field-control";
      input.className = "ore-text-field-input";
      input.defaultValue = this.#defaultValue;
      description.className = "ore-text-field-description";
      error.className = "ore-text-field-error";
      error.setAttribute("aria-live", "polite");
      control.append(...(icon ? [icon, input] : [input]));
      this.append(label, control, description, error);
      label.addEventListener("click", () => input.focus());
      input.addEventListener("input", this.#handleInput);
      input.addEventListener("change", this.#handleChange);
    }

    this.#sync();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (
      changed.has("description") ||
      changed.has("disabled") ||
      changed.has("error") ||
      changed.has("label") ||
      changed.has("placeholder") ||
      changed.has("readonly") ||
      changed.has("required") ||
      changed.has("type") ||
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
    this.value = this.#defaultValue;
  }

  #sync(): void {
    const input = this.input;
    const label = this.querySelector<HTMLElement>(
      ":scope > .ore-text-field-label",
    );
    const description = this.querySelector<HTMLElement>(
      ":scope > .ore-text-field-description",
    );
    const error = this.querySelector<HTMLElement>(
      ":scope > .ore-text-field-error",
    );

    if (!input || !label || !description || !error) {
      return;
    }

    const disabled = this.disabled || this.#formDisabled;

    label.textContent = this.label;
    label.hidden = !this.label;
    description.textContent = this.description;
    description.hidden = !this.description;
    input.disabled = disabled;
    input.placeholder = this.placeholder;
    input.readOnly = this.readonly;
    input.required = this.required;
    input.type = this.type;
    input.value = this.value;
    input.setCustomValidity(this.error);
    input.setAttribute(
      "aria-label",
      this.getAttribute("aria-label") || this.label || "Text field",
    );
    const describedBy: string[] = [];

    if (this.description) {
      const id =
        description.id || `ore-text-field-description-${crypto.randomUUID()}`;
      description.id = id;
      describedBy.push(id);
    }

    const invalid = !input.validity.valid;
    const errorMessage = invalid ? input.validationMessage : "";

    error.textContent = errorMessage;
    error.hidden = !errorMessage;
    if (errorMessage) {
      const id = error.id || `ore-text-field-error-${crypto.randomUUID()}`;
      error.id = id;
      describedBy.push(id);
    }

    if (describedBy.length > 0) {
      input.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      input.removeAttribute("aria-describedby");
    }

    input.setAttribute("aria-invalid", String(invalid));

    this.#internals.setFormValue(this.value);
    this.#internals.setValidity(input.validity, input.validationMessage, input);
    this.setAttribute("aria-disabled", String(disabled));
    this.setAttribute("aria-invalid", String(invalid));
  }

  readonly #handleInput = (event: Event): void => {
    event.stopPropagation();
    this.value = this.input?.value ?? this.value;
    this.#sync();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  };

  readonly #handleChange = (event: Event): void => {
    event.stopPropagation();
    this.dispatchEvent(new Event("change", { bubbles: true }));
  };
}

if (!customElements.get("ore-text-field")) {
  customElements.define("ore-text-field", OreTextField);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-text-field": OreTextField;
  }
}
