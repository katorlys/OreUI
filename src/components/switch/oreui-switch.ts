import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { OreUIColor } from "../../colors.js";
import { oreUIColorStyles } from "../../control-colors.js";
import "../../default-theme.js";

@customElement("oreui-switch")
export class OreUISwitch extends LitElement {
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
        gap: var(--oreui-switch-label-gap, 16px);
        cursor: pointer;
      }

      .control {
        position: relative;
        flex: none;
        inline-size: var(--oreui-switch-width, 100px);
        block-size: var(--oreui-switch-height, 56px);
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

      .track {
        position: absolute;
        inset-inline: 0;
        inset-block-start: 8px;
        block-size: 48px;
        background: var(--oreui-color-ink);
      }

      .track::after {
        position: absolute;
        inset-block-start: 4px;
        inset-inline-start: 0;
        inline-size: 96px;
        block-size: var(--oreui-switch-track-height, 40px);
        box-sizing: border-box;
        border: var(--oreui-border-width, 4px) solid
          var(--oreui-color-switch-track-highlight);
        background: var(--oreui-color-switch-track-off);
        content: "";
      }

      .thumb-frame {
        position: absolute;
        z-index: 2;
        inset-block-start: 0;
        inset-inline-start: 0;
        inline-size: 52px;
        block-size: 56px;
        box-sizing: border-box;
        background: var(--oreui-color-ink);
      }

      .thumb {
        position: absolute;
        inset: 4px 4px 12px;
        box-sizing: border-box;
        border: var(--oreui-border-width, 4px) solid
          var(--oreui-color-highlight);
        background: var(--oreui-color-surface);
        box-shadow: 0 var(--oreui-shadow-offset-y, 8px) 0
          var(--oreui-color-shadow);
      }

      input:checked ~ .track::after {
        inset-inline-start: 4px;
        border-color: var(
          --oreui-control-highlight,
          var(--oreui-color-highlight)
        );
        background: var(--oreui-control-surface, var(--oreui-color-surface));
      }

      input:checked ~ .thumb-frame {
        inset-inline-start: 48px;
      }

      input:hover:not(:disabled) ~ .thumb-frame .thumb {
        background: var(--oreui-color-surface-hover);
      }

      input:focus-visible ~ .thumb-frame {
        border: var(--oreui-border-width, 4px) solid
          var(--oreui-color-focus-ring);
      }

      input:focus-visible ~ .thumb-frame .thumb {
        inset: 0 0 8px;
      }

      input:disabled ~ .track {
        background: var(--oreui-color-switch-disabled-track);
      }

      input:disabled ~ .track::after {
        border: 0;
        background: var(--oreui-color-switch-disabled-surface);
      }

      input:checked:disabled ~ .track::after {
        background: var(
          --oreui-control-disabled-surface,
          var(--oreui-color-switch-disabled-surface)
        );
      }

      input:disabled ~ .thumb-frame {
        background: var(--oreui-color-shadow);
      }

      input:disabled ~ .thumb-frame .thumb {
        border: 0;
        background: var(--oreui-color-switch-disabled-surface);
        box-shadow: 0 var(--oreui-shadow-offset-y, 8px) 0
          var(--oreui-color-switch-disabled-track);
      }

      :host([disabled]) label {
        cursor: not-allowed;
      }

      .label {
        font-size: var(--oreui-switch-label-font-size, 24px);
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
            role="switch"
            .checked=${this.checked}
            .value=${this.value}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.label || "Switch"}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <span class="track" part="track"></span>
          <span class="thumb-frame">
            <span class="thumb" part="thumb"></span>
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
    this.checked = (event.currentTarget as HTMLInputElement).checked;
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
        "Please turn on this switch.",
        this.inputElement ?? undefined,
      );
    } else {
      this.internals.setValidity({});
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oreui-switch": OreUISwitch;
  }
}
