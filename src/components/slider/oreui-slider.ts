import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { OreUIColor } from "../../colors.js";
import { oreUIColorStyles } from "../../control-colors.js";
import "../../default-theme.js";

export type OreUISliderVariant = "default" | "segmented";

@customElement("oreui-slider")
export class OreUISlider extends LitElement {
  static formAssociated = true;

  static styles = [
    oreUIColorStyles,
    css`
      :host {
        display: inline-block;
        min-inline-size: 12rem;
        color: var(--oreui-color-ink);
        font-family: var(--oreui-font-family, "Minecraft", monospace);
        vertical-align: middle;
      }

      label {
        display: grid;
        gap: var(--oreui-slider-label-gap, 8px);
      }

      .header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        font-size: var(--oreui-slider-label-font-size, 24px);
        line-height: 1;
      }

      .control {
        position: relative;
        block-size: var(--oreui-slider-height, 66px);
      }

      input {
        position: absolute;
        z-index: 3;
        inset: 0;
        inline-size: 100%;
        block-size: 100%;
        margin: 0;
        appearance: none;
        background: transparent;
        cursor: pointer;
      }

      input::-webkit-slider-runnable-track {
        block-size: 100%;
        background: transparent;
      }

      input::-webkit-slider-thumb {
        inline-size: var(--oreui-slider-thumb-frame-width, 58px);
        block-size: var(--oreui-slider-thumb-frame-height, 58px);
        appearance: none;
        background: transparent;
      }

      .track {
        position: absolute;
        inset-inline: 0;
        inset-block-start: 20px;
        block-size: var(--oreui-slider-track-height, 26px);
        box-sizing: border-box;
        border: var(--oreui-border-width, 4px) solid var(--oreui-color-ink);
        background: var(--oreui-color-slider-track);
        overflow: hidden;
      }

      .fill {
        display: block;
        block-size: 100%;
        inline-size: var(--oreui-slider-progress, 0%);
        background: var(
          --oreui-control-surface,
          var(--oreui-color-slider-fill)
        );
      }

      .segment {
        position: absolute;
        z-index: 1;
        inset-block: 0;
        inline-size: var(--oreui-border-width, 4px);
        background: var(--oreui-color-ink);
        pointer-events: none;
      }

      .thumb-frame {
        position: absolute;
        z-index: 2;
        inset-block-start: 4px;
        inset-inline-start: var(--oreui-slider-progress, 0%);
        inline-size: var(--oreui-slider-thumb-frame-width, 58px);
        block-size: var(--oreui-slider-thumb-frame-height, 58px);
        box-sizing: border-box;
        padding: var(--oreui-border-width, 4px) var(--oreui-border-width, 4px)
          12px;
        background: var(--oreui-color-ink);
        transform: translateX(calc(-1 * var(--oreui-slider-progress, 0%)));
      }

      .thumb {
        display: block;
        inline-size: 100%;
        block-size: 100%;
        box-sizing: border-box;
        border: var(--oreui-border-width, 4px) solid
          var(--oreui-color-highlight);
        background: var(--oreui-color-surface);
        box-shadow: 0 var(--oreui-shadow-offset-y, 8px) 0
          var(--oreui-color-shadow);
      }

      input:hover:not(:disabled) ~ .thumb-frame .thumb {
        background: var(--oreui-color-surface-hover);
      }

      input:focus-visible ~ .thumb-frame {
        outline: var(--oreui-border-width, 4px) solid
          var(--oreui-color-focus-ring);
        outline-offset: var(--oreui-border-width, 4px);
      }

      input:disabled {
        cursor: not-allowed;
      }

      input:disabled ~ .track {
        border-color: var(--oreui-color-shadow);
        background: var(--oreui-color-slider-disabled-track);
      }

      input:disabled ~ .track .fill {
        background: var(
          --oreui-control-disabled-surface,
          var(--oreui-color-slider-disabled-fill)
        );
      }

      input:disabled ~ .thumb-frame {
        background: var(--oreui-color-shadow);
      }

      input:disabled ~ .thumb-frame .thumb {
        border-color: var(--oreui-color-disabled-highlight);
        background: var(--oreui-color-disabled-surface);
        box-shadow: 0 var(--oreui-shadow-offset-y, 8px) 0
          var(--oreui-color-slider-disabled-track);
      }
    `,
  ];

  private readonly internals = this.attachInternals();
  private initialValue = "50";

  @property({ reflect: true })
  name = "";

  @property({ reflect: true })
  color: OreUIColor = "general";

  @property()
  value = "50";

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  variant: OreUISliderVariant = "default";

  @property()
  label = "";

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
    const progress = this.calculateProgress();
    const segmentCount = this.calculateSegmentCount();
    const segmentSeparators = Array.from(
      { length: this.variant === "segmented" ? segmentCount - 1 : 0 },
      (_, index) => ((index + 1) / segmentCount) * 100,
    );

    return html`
      <label
        style=${`--oreui-slider-progress: ${progress}%; --oreui-slider-segment-count: ${segmentCount}`}
      >
        ${
          this.label
            ? html`<span class="header" part="label">
                <span>${this.label}</span>
                <output part="value">${this.value}</output>
              </span>`
            : null
        }
        <span class="control" part="control">
          <input
            type="range"
            .value=${this.value}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.label || "Slider"}
            @keydown=${this.handleKeydown}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          <span class="track" part="track">
            <span class="fill" part="fill"></span>
            ${segmentSeparators.map(
              (position) =>
                html`<span
                  class="segment"
                  style=${`inset-inline-start: ${position}%`}
                ></span>`,
            )}
          </span>
          <span class="thumb-frame">
            <span class="thumb" part="thumb"></span>
          </span>
        </span>
      </label>
    `;
  }

  private get inputElement() {
    return this.renderRoot.querySelector("input");
  }

  private handleInput(event: InputEvent) {
    event.stopPropagation();
    this.value = (event.currentTarget as HTMLInputElement).value;
    this.syncFormState();
    this.dispatchEvent(
      new InputEvent("input", { bubbles: true, composed: true }),
    );
  }

  private handleChange(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  private handleKeydown(event: KeyboardEvent) {
    const input = event.currentTarget as HTMLInputElement;

    if (event.key === "Home") {
      input.value = String(this.min);
    } else if (event.key === "End") {
      input.value = String(this.max);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      input.stepDown();
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      input.stepUp();
    } else {
      return;
    }

    event.preventDefault();
    this.value = input.value;
    this.syncFormState();
    this.dispatchEvent(
      new InputEvent("input", { bubbles: true, composed: true }),
    );
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  private calculateProgress() {
    const value = Number(this.value);
    if (!Number.isFinite(value) || this.max <= this.min) {
      return 0;
    }
    return Math.min(
      100,
      Math.max(0, ((value - this.min) / (this.max - this.min)) * 100),
    );
  }

  private calculateSegmentCount() {
    const range = this.max - this.min;
    if (
      !Number.isFinite(range) ||
      range <= 0 ||
      !Number.isFinite(this.step) ||
      this.step <= 0
    ) {
      return 1;
    }
    return Math.max(1, Math.ceil(range / this.step));
  }

  private syncFormState() {
    const input = this.inputElement;
    this.internals.setFormValue(this.disabled ? null : this.value, this.value);

    if (!input) {
      return;
    }

    if (!input.validity.valid) {
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
    "oreui-slider": OreUISlider;
  }
}
