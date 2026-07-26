import { ReactiveElement } from "lit";

export type OreDataTableVariant = "plain" | "striped";
export type OreDataTableSortDirection = "none" | "ascending" | "descending";

export interface OreDataTableSortDetail {
  column: string;
  direction: OreDataTableSortDirection;
}

export class OreDataTable extends ReactiveElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  declare variant: OreDataTableVariant;

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

    const button = event.target.closest<HTMLButtonElement>(
      ".ore-data-table-sort",
    );
    const header = button?.closest<HTMLTableCellElement>("th");

    if (!button || !header || button.disabled || !this.contains(button)) {
      return;
    }

    const current = header.getAttribute("aria-sort") ?? "none";
    const direction: OreDataTableSortDirection =
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
      new CustomEvent<OreDataTableSortDetail>("sort", {
        bubbles: true,
        composed: true,
        detail: { column: button.value, direction },
      }),
    );
  };
}

if (!customElements.get("ore-data-table")) {
  customElements.define("ore-data-table", OreDataTable);
}

declare global {
  interface HTMLElementTagNameMap {
    "ore-data-table": OreDataTable;
  }
}
