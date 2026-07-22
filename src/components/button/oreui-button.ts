import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { OreUIColor } from "../../colors.js";
import { oreUIColorStyles } from "../../control-colors.js";
import "../../default-theme.js";

export type OreUIButtonType = "button" | "submit" | "reset";
export type OreUIButtonVariant = "general" | "minecraft";
export type OreUIButtonSize = "normal" | "compact";

@customElement("oreui-button")
export class OreUIButton extends LitElement {
  static formAssociated = true;

  static styles = [
    oreUIColorStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        min-inline-size: 8rem;
        block-size: 105px;
        padding: var(--oreui-border-width, 4px) var(--oreui-border-width, 4px)
          calc(
            var(--oreui-border-width, 4px) + var(--oreui-shadow-offset-y, 8px)
          );
        background: transparent;
        font-family: var(--oreui-font-family, "Minecraft", monospace);
        vertical-align: middle;
      }

      :host([variant="minecraft"]) {
        font-family: var(
          --oreui-font-family-ten,
          "Minecraft Ten",
          "Minecraft",
          monospace
        );
      }

      :host([variant="minecraft"]) [part="label"] {
        transform: translateY(
          var(--oreui-button-minecraft-label-offset-y, -4px)
        );
      }

      :host([size="compact"]) {
        min-inline-size: 6rem;
        block-size: 72px;
        --oreui-button-height: 56px;
        --oreui-button-font-size: 1.5rem;
      }

      :host([disabled]) {
        cursor: not-allowed;
      }

      .frame {
        position: absolute;
        inset: 0;
        box-sizing: border-box;
        border: var(--oreui-border-width, 4px) solid var(--oreui-color-ink);
        pointer-events: none;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        box-sizing: border-box;
        inline-size: 100%;
        block-size: var(--oreui-button-height, 89px);
        margin: 0;
        padding: 0 1em;
        border: var(--oreui-border-width, 4px) solid
          var(--oreui-control-highlight, var(--oreui-color-highlight));
        border-radius: 0;
        background: var(--oreui-control-surface, var(--oreui-color-surface));
        box-shadow: 0 var(--oreui-shadow-offset-y, 8px) 0
          var(--oreui-control-shadow, var(--oreui-color-shadow));
        color: var(--oreui-control-text, var(--oreui-color-ink));
        font: inherit;
        font-size: var(--oreui-button-font-size, 40px);
        line-height: 1;
        cursor: pointer;
      }

      button:hover:not(:disabled) {
        background: var(
          --oreui-control-surface-hover,
          var(--oreui-color-surface-hover)
        );
      }

      button:focus-visible {
        background: var(
          --oreui-control-surface-focus,
          var(--oreui-color-surface-focus)
        );
        outline: var(--oreui-border-width, 4px) solid
          var(--oreui-color-focus-ring);
        outline-offset: var(--oreui-border-width, 4px);
      }

      button:active:not(:disabled) {
        background: var(--oreui-control-surface, var(--oreui-color-surface));
        box-shadow: 0 0 0 var(--oreui-border-width, 4px) var(--oreui-color-ink);
        transform: translateY(var(--oreui-shadow-offset-y, 8px));
      }

      button:active:not(:disabled) + .frame {
        display: none;
      }

      button:disabled {
        block-size: calc(
          var(--oreui-button-height, 89px) + var(--oreui-shadow-offset-y, 8px)
        );
        border-color: var(
          --oreui-control-disabled-highlight,
          var(--oreui-color-disabled-highlight)
        );
        background: var(
          --oreui-control-disabled-surface,
          var(--oreui-color-disabled-surface)
        );
        box-shadow: none;
        cursor: inherit;
      }

      button:disabled > * {
        opacity: 0.5;
      }

      ::slotted([slot="prefix"]),
      ::slotted([slot="suffix"]) {
        flex: none;
        inline-size: 1em;
        block-size: 1em;
      }
    `,
  ];

  private readonly internals = this.attachInternals();

  @property({ reflect: true })
  type: OreUIButtonType = "button";

  @property({ reflect: true })
  variant: OreUIButtonVariant = "general";

  @property({ reflect: true })
  size: OreUIButtonSize = "normal";

  @property({ reflect: true })
  color: OreUIColor = "general";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  override focus(options?: FocusOptions) {
    this.renderRoot.querySelector("button")?.focus(options);
  }

  protected render() {
    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot name="prefix"></slot>
        <span part="label"><slot></slot></span>
        <slot name="suffix"></slot>
      </button>
      <span class="frame" aria-hidden="true"></span>
    `;
  }

  private handleClick() {
    if (this.disabled) {
      return;
    }

    if (this.type === "submit") {
      this.internals.form?.requestSubmit();
    } else if (this.type === "reset") {
      this.internals.form?.reset();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oreui-button": OreUIButton;
  }
}
