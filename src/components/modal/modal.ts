import { type PropertyValues, ReactiveElement } from "lit";

export type OreModalCloseReason = "backdrop" | "close" | "escape";

export interface OreModalCloseDetail {
  reason: OreModalCloseReason;
}

let modalId = 0;

export class OreModal extends ReactiveElement {
  static properties = {
    defaultOpen: { type: Boolean, attribute: "default-open" },
    open: { type: Boolean, reflect: true },
  };

  declare defaultOpen: boolean;
  declare open: boolean;

  #reason: OreModalCloseReason = "close";
  #trigger: HTMLElement | null = null;
  #boundDialog: HTMLDialogElement | null = null;
  #closeNotified = true;
  readonly #dialogObserver = new MutationObserver(() => {
    if (this.#boundDialog && !this.#boundDialog.open) {
      this.#finishClose();
    }
  });

  constructor() {
    super();
    this.defaultOpen = false;
    this.open = false;
  }

  get dialog(): HTMLDialogElement | null {
    return this.querySelector(":scope > .ore-modal-dialog");
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick);
    void this.updateComplete.then(() => {
      if (this.isConnected) {
        this.#connectDialog();
      }
    });

    if (this.defaultOpen) {
      this.open = true;
    }
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick);
    this.#boundDialog?.removeEventListener("cancel", this.#handleCancel);
    this.#boundDialog?.removeEventListener("close", this.#handleClose);
    this.#dialogObserver.disconnect();
    this.#boundDialog = null;
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

  show(): void {
    this.open = true;
  }

  close(reason: OreModalCloseReason = "close"): void {
    this.#reason = reason;
    this.open = false;
  }

  #connectDialog(): void {
    const dialog = this.dialog;

    if (!dialog || dialog === this.#boundDialog) {
      return;
    }

    this.#boundDialog?.removeEventListener("cancel", this.#handleCancel);
    this.#boundDialog?.removeEventListener("close", this.#handleClose);
    this.#boundDialog = dialog;
    dialog.addEventListener("cancel", this.#handleCancel);
    dialog.addEventListener("close", this.#handleClose);
    this.#dialogObserver.observe(dialog, {
      attributeFilter: ["open"],
    });
    this.#setup();
    this.#syncOpen();
  }

  #setup(): void {
    const dialog = this.dialog;

    if (!dialog) {
      return;
    }

    const title = dialog.querySelector<HTMLElement>(".ore-modal-title");
    const description = dialog.querySelector<HTMLElement>(
      ".ore-modal-description",
    );

    if (title) {
      title.id ||= `ore-modal-title-${++modalId}`;
      dialog.setAttribute("aria-labelledby", title.id);
    }

    if (description) {
      description.id ||= `ore-modal-description-${modalId || ++modalId}`;
      dialog.setAttribute("aria-describedby", description.id);
    }
  }

  #syncOpen(): void {
    const dialog = this.dialog;

    if (!dialog) {
      return;
    }

    if (this.open && !dialog.open) {
      this.#closeNotified = false;
      this.#trigger =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialog.showModal();
    } else if (!this.open && dialog.open) {
      dialog.close();
    }
  }

  #finishClose(): void {
    if (this.#closeNotified) {
      return;
    }

    this.#closeNotified = true;

    if (this.open) {
      this.open = false;
    }

    this.#trigger?.focus();
    this.dispatchEvent(
      new CustomEvent<OreModalCloseDetail>("modal-close", {
        bubbles: true,
        composed: true,
        detail: { reason: this.#reason },
      }),
    );
    this.#reason = "close";
  }

  readonly #handleClick = (event: MouseEvent): void => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest(".ore-modal-trigger")) {
      this.show();
    } else if (target.closest(".ore-modal-close")) {
      this.close("close");
    } else if (target === this.dialog) {
      this.close("backdrop");
    }
  };

  readonly #handleCancel = (event: Event): void => {
    event.preventDefault();
    this.close("escape");
  };

  readonly #handleClose = (): void => {
    this.#finishClose();
  };
}

if (!customElements.get("ore-modal")) {
  customElements.define("ore-modal", OreModal);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-modal": OreModal;
  }
}
