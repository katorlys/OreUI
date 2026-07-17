import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type OreUIButtonType = "button" | "submit" | "reset";
export type OreUIButtonVariant = "general" | "minecraft";
export type OreUIButtonSize = "normal" | "compact";

@customElement("oreui-button")
export class OreUIButton extends LitElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      min-inline-size: 8rem;
      block-size: 105px;
      padding: var(--oreui-border-width, 4px) var(--oreui-border-width, 4px)
        calc(var(--oreui-border-width, 4px) + var(--oreui-shadow-offset-y, 8px));
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
      transform: translateY(var(--oreui-button-minecraft-label-offset-y, -4px));
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
      border: var(--oreui-border-width, 4px) solid
        var(--oreui-color-ink, #1e1e1f);
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
        var(--oreui-color-highlight, #fbfbfd);
      border-radius: 0;
      background: var(--oreui-color-surface, #f4f6f9);
      box-shadow: 0 var(--oreui-shadow-offset-y, 8px) 0
        var(--oreui-color-shadow, #58585a);
      color: var(--oreui-color-ink, #1e1e1f);
      font: inherit;
      font-size: var(--oreui-button-font-size, 2.5rem);
      line-height: 1;
      cursor: pointer;
    }

    button:hover:not(:disabled) {
      background: var(--oreui-color-surface-hover, #b1b2b5);
    }

    button:focus-visible {
      background: var(--oreui-color-surface-focus, #d0d1d4);
      outline: var(--oreui-border-width, 4px) solid
        var(--oreui-color-focus-ring, #ffffff);
      outline-offset: var(--oreui-border-width, 4px);
    }

    button:active:not(:disabled) {
      background: var(--oreui-color-surface, #f4f6f9);
      box-shadow: 0 0 0 var(--oreui-border-width, 4px)
        var(--oreui-color-ink, #1e1e1f);
      transform: translateY(var(--oreui-shadow-offset-y, 8px));
    }

    button:active:not(:disabled) + .frame {
      display: none;
    }

    button:disabled {
      block-size: calc(
        var(--oreui-button-height, 89px) + var(--oreui-shadow-offset-y, 8px)
      );
      border-color: var(--oreui-color-disabled-highlight, #d0d1d3);
      background: var(--oreui-color-disabled-surface, #b1b2b5);
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
  `;

  private readonly internals = this.attachInternals();

  @property({ reflect: true })
  type: OreUIButtonType = "button";

  @property({ reflect: true })
  variant: OreUIButtonVariant = "general";

  @property({ reflect: true })
  size: OreUIButtonSize = "normal";

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
