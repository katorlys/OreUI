import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { OreUIColor } from "../../colors.js";
import { oreUIColorStyles } from "../../control-colors.js";
import "../../default-theme.js";

@customElement("oreui-checkbox")
export class OreUICheckbox extends LitElement {
  static formAssociated = true;

  static styles = [
    oreUIColorStyles,
    css`
      :host {
        display: inline-block;
        color: var(--oreui-color-ink);
        font-family: var(--oreui-font-family, "Minecraft", monospace);
        vertical-align: middle;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--oreui-checkbox-label-gap, 12px);
        cursor: pointer;
      }

      .control {
        position: relative;
        flex: none;
        inline-size: var(--oreui-checkbox-size, 112px);
        block-size: var(--oreui-checkbox-size, 112px);
      }

      input {
        position: absolute;
        z-index: 3;
        inset: 0;
        inline-size: 100%;
        block-size: 100%;
        margin: 0;
        opacity: 0;
        cursor: inherit;
      }

      .diamond {
        position: absolute;
        inset-block-start: 24px;
        inset-inline-start: 24px;
        inline-size: var(--oreui-checkbox-diamond-size, 64px);
        block-size: var(--oreui-checkbox-diamond-size, 64px);
        box-sizing: border-box;
        padding: var(--oreui-border-width, 4px);
        background: var(--oreui-color-ink);
        transform: rotate(-45deg);
      }

      .surface {
        position: relative;
        display: block;
        inline-size: 100%;
        block-size: 100%;
        border: var(--oreui-border-width, 4px) solid
          var(--oreui-color-checkbox-off-highlight);
        box-sizing: border-box;
        background: var(--oreui-color-checkbox-off-surface);
      }

      .mark {
        position: absolute;
        inset-block-start: 16px;
        inset-inline-start: 16px;
        inline-size: 32px;
        block-size: 32px;
        display: none;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
      }

      .pixel:nth-child(1),
      .pixel:nth-child(4) {
        background: var(--oreui-checkbox-mark-mid);
      }

      .pixel:nth-child(2) {
        background: var(--oreui-checkbox-mark-light);
      }

      .pixel:nth-child(3) {
        background: var(--oreui-checkbox-mark-dark, var(--oreui-color-ink));
      }

      input:checked ~ .diamond .surface {
        border-color: var(
          --oreui-control-highlight,
          var(--oreui-color-checkbox-on-highlight, var(--oreui-color-highlight))
        );
        background: var(--oreui-control-surface, var(--oreui-color-surface));
      }

      input:checked ~ .diamond .mark {
        display: grid;
      }

      input:hover:not(:disabled) ~ .diamond .surface {
        background: var(
          --oreui-control-surface-hover,
          var(--oreui-color-surface-hover)
        );
      }

      input:focus-visible ~ .diamond {
        box-shadow: inset 0 0 0 var(--oreui-border-width, 4px)
          var(--oreui-color-focus-ring);
      }

      input:active:not(:disabled) ~ .diamond .mark {
        inset-block-start: 19.98px;
        inset-inline-start: 19.98px;
        inline-size: 24.04px;
        block-size: 24.04px;
      }

      input:disabled ~ .diamond {
        background: var(--oreui-control-shadow, var(--oreui-color-shadow));
      }

      input:disabled ~ .diamond .surface {
        border-color: var(--oreui-color-checkbox-disabled-highlight);
        background: var(--oreui-color-disabled-surface);
      }

      input:checked:disabled ~ .diamond .surface {
        border-color: var(
          --oreui-control-disabled-highlight,
          var(--oreui-color-checkbox-disabled-highlight)
        );
        background: var(
          --oreui-control-disabled-surface,
          var(--oreui-color-disabled-surface)
        );
      }

      input:checked:disabled ~ .diamond .mark {
        background: none;
      }

      input:checked:disabled ~ .diamond .pixel:nth-child(1),
      input:checked:disabled ~ .diamond .pixel:nth-child(4) {
        background: var(--oreui-color-checkbox-disabled-mark-mid);
      }

      input:checked:disabled ~ .diamond .pixel:nth-child(2) {
        background: var(--oreui-color-checkbox-disabled-mark-light);
      }

      input:checked:disabled ~ .diamond .pixel:nth-child(3) {
        background: var(--oreui-color-checkbox-disabled-mark-dark);
      }

      :host([disabled]) label {
        cursor: not-allowed;
      }

      .label {
        font-size: var(--oreui-checkbox-label-font-size, 24px);
        line-height: 1;
      }
    `,
  ];

  private readonly internals = this.attachInternals();
  private initialChecked = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ reflect: true })
  color: OreUIColor = "general";

  @property({ reflect: true })
  name = "";

  @property()
  value = "on";

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  label = "";

  override focus(options?: FocusOptions) {
    this.inputElement?.focus(options);
  }

  override firstUpdated() {
    this.initialChecked = this.checked;
    this.syncFormState();
  }

  override updated() {
    this.syncFormState();
  }

  formResetCallback() {
    this.checked = this.initialChecked;
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    this.checked = state === "checked";
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
    return html`
      <label>
        <span class="control" part="control">
          <input
            type="checkbox"
            .checked=${this.checked}
            .value=${this.value}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.label || "Checkbox"}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <span class="diamond" part="box">
            <span class="surface"></span>
            <span class="mark" part="mark">
              <span class="pixel"></span>
              <span class="pixel"></span>
              <span class="pixel"></span>
              <span class="pixel"></span>
            </span>
          </span>
        </span>
        ${
          this.label
            ? html`<span class="label" part="label">${this.label}</span>`
            : null
        }
      </label>
    `;
  }

  private get inputElement() {
    return this.renderRoot.querySelector("input");
  }

  private handleInput(event: InputEvent) {
    event.stopPropagation();
    const input = event.currentTarget as HTMLInputElement;
    this.checked = input.checked;
    this.syncFormState();
    this.dispatchEvent(
      new InputEvent("input", { bubbles: true, composed: true }),
    );
  }

  private handleChange(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  private syncFormState() {
    this.internals.setFormValue(
      this.disabled || !this.checked ? null : this.value,
      this.checked ? "checked" : "unchecked",
    );

    if (!this.disabled && this.required && !this.checked) {
      this.internals.setValidity(
        { valueMissing: true },
        "Please select this checkbox.",
        this.inputElement ?? undefined,
      );
    } else {
      this.internals.setValidity({});
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oreui-checkbox": OreUICheckbox;
  }
}
