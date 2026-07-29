import { ReactiveElement } from "lit";

export type OreTableVariant = "plain" | "striped";
export type OreTableSortDirection = "none" | "ascending" | "descending";

export interface OreTableSortDetail {
  column: string;
  direction: OreTableSortDirection;
}

export class OreTable extends ReactiveElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  declare variant: OreTableVariant;

  constructor() {
    super();
    this.variant = "plain";
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick, true);
  }

  override disconnectedCallback(): void {
    this.removeEventListener("click", this.#handleClick, true);
    super.disconnectedCallback();
  }

  protected override createRenderRoot(): HTMLElement {
    return this;
  }

  readonly #handleClick = (event: MouseEvent): void => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const button = event.target.closest<HTMLButtonElement>(".ore-table-sort");
    const header = button?.closest<HTMLTableCellElement>("th");

    if (!button || !header || button.disabled || !this.contains(button)) {
      return;
    }

    const current = header.getAttribute("aria-sort") ?? "none";
    const direction: OreTableSortDirection =
      current === "none"
        ? "ascending"
        : current === "ascending"
          ? "descending"
          : "none";

    for (const sortable of this.querySelectorAll("th[aria-sort]")) {
      sortable.setAttribute("aria-sort", "none");
    }
    header.setAttribute("aria-sort", direction);

    this.dispatchEvent(
      new CustomEvent<OreTableSortDetail>("sort", {
        bubbles: true,
        composed: true,
        detail: { column: button.value, direction },
      }),
    );
  };
}

if (!customElements.get("ore-table")) {
  customElements.define("ore-table", OreTable);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-table": OreTable;
  }
}
