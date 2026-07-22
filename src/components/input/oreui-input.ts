import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../../default-theme.js";

export type OreUIInputType =
  "email" | "number" | "password" | "search" | "tel" | "text" | "url";

@customElement("oreui-input")
export class OreUIInput extends LitElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: inline-block;
      min-inline-size: 12rem;
      color: var(--oreui-color-ink);
      font-family: var(--oreui-font-family, "Minecraft", monospace);
      vertical-align: middle;
    }

    label {
      display: grid;
      gap: var(--oreui-input-label-gap, 8px);
    }

    .label,
    .message {
      font-family: inherit;
    }

    .label {
      font-size: var(--oreui-input-label-font-size, 24px);
      line-height: 1;
    }

    .field {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      block-size: var(--oreui-input-height, 75px);
      padding: var(--oreui-input-border-width, 4px)
        var(--oreui-input-padding-inline, 16px);
      border: var(--oreui-input-border-width, 4px) solid var(--oreui-color-ink);
      background: var(--oreui-color-input-surface);
      box-shadow: inset 0 0 0 var(--oreui-input-accent-width, 4px) transparent;
    }

    .field:focus-within {
      box-shadow: inset 0 0 0 var(--oreui-input-accent-width, 4px)
        var(--oreui-color-input-accent);
    }

    :host([error]:not([error=""])) .field {
      box-shadow: inset 0 0 0 var(--oreui-input-accent-width, 4px)
        var(--oreui-color-error);
    }

    :host([readonly]) .field {
      background: var(--oreui-color-input-readonly-surface);
    }

    :host([disabled]) {
      cursor: not-allowed;
    }

    :host([disabled]) .field {
      background: var(--oreui-color-input-disabled-surface);
    }

    .control {
      display: flex;
      align-items: center;
      min-inline-size: 0;
      inline-size: 100%;
    }

    .prefix {
      display: contents;
    }

    ::slotted([slot="prefix"]) {
      flex: none;
      inline-size: var(--oreui-input-icon-size, 40px);
      block-size: var(--oreui-input-icon-size, 40px);
      margin-inline-end: var(--oreui-input-icon-gap, 16px);
      color: var(--oreui-color-input-icon);
    }

    input {
      min-inline-size: 0;
      inline-size: 100%;
      padding: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--oreui-color-input-text);
      font: inherit;
      font-size: var(--oreui-input-font-size, 36px);
      line-height: 1;
    }

    input::placeholder {
      color: var(--oreui-color-text-muted);
      opacity: 1;
    }

    input:disabled {
      color: color-mix(in srgb, var(--oreui-color-ink) 50%, transparent);
      cursor: inherit;
    }

    .message {
      min-block-size: 1em;
      margin: 0;
      color: var(--oreui-color-text-muted);
      font-size: var(--oreui-input-message-font-size, 20px);
      line-height: 1;
    }

    :host([error]:not([error=""])) .message {
      color: var(--oreui-color-error);
    }
  `;

  private readonly internals = this.attachInternals();
  private initialValue = "";

  @property()
  value = "";

  @property({ reflect: true })
  name = "";

  @property({ reflect: true })
  type: OreUIInputType = "text";

  @property()
  placeholder = "";

  @property()
  label = "";

  @property()
  help = "";

  @property({ reflect: true })
  error = "";

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private hasPrefix = false;

  override focus(options?: FocusOptions) {
    this.inputElement?.focus(options);
  }

  override firstUpdated() {
    this.initialValue = this.value;
    this.syncFormState();
  }

  override updated() {
    const input = this.inputElement;
    if (input && input.value !== this.value) {
      input.value = this.value;
    }
    this.syncFormState();
  }

  formResetCallback() {
    this.value = this.initialValue;
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === "string") {
      this.value = state;
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  checkValidity() {
    return this.internals.checkValidity();
  }

  reportValidity() {
    return this.internals.reportValidity();
  }

  protected render() {
    const message = this.error || this.help;

    return html`
      <label>
        ${
          this.label
            ? html`<span class="label" part="label">${this.label}</span>`
            : null
        }
        <span class="field" part="field">
          <span class="control">
            <span class="prefix" ?hidden=${!this.hasPrefix}>
              <slot name="prefix" @slotchange=${this.handlePrefixChange}></slot>
            </span>
            <input
              part="input"
              .value=${this.value}
              type=${this.type}
              placeholder=${this.placeholder}
              ?required=${this.required}
              ?readonly=${this.readOnly}
              ?disabled=${this.disabled}
              aria-invalid=${this.error ? "true" : "false"}
              aria-describedby=${message ? "message" : ""}
              @input=${this.handleInput}
              @change=${this.handleChange}
            />
          </span>
        </span>
        ${
          message
            ? html`<span id="message" class="message" part="message"
                >${message}</span
              >`
            : null
        }
      </label>
    `;
  }

  private get inputElement() {
    return this.renderRoot.querySelector("input");
  }

  private handleInput(event: InputEvent) {
    this.value = (event.currentTarget as HTMLInputElement).value;
    this.syncFormState();
  }

  private handleChange() {
    this.syncFormState();
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  private handlePrefixChange(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement;
    this.hasPrefix = slot.assignedElements().length > 0;
  }

  private syncFormState() {
    const input = this.inputElement;
    this.internals.setFormValue(this.disabled ? null : this.value, this.value);

    if (!input) {
      return;
    }

    if (this.error) {
      this.internals.setValidity({ customError: true }, this.error, input);
    } else if (!input.validity.valid) {
      this.internals.setValidity(
        input.validity,
        input.validationMessage,
        input,
      );
    } else {
      this.internals.setValidity({});
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oreui-input": OreUIInput;
  }
}
