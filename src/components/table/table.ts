export type OreTableElement = HTMLTableElement;
export type OreTableVariant = "plain" | "striped";
export type OreTableSortDirection = "none" | "ascending" | "descending";

export interface OreTableSortDetail {
  column: string;
  direction: OreTableSortDirection;
}

const tableSelector = ".ore-table > table";
const initializedTables = new WeakSet<OreTableElement>();

function initTable(table: OreTableElement): void {
  if (initializedTables.has(table)) {
    return;
  }

  initializedTables.add(table);
  table.dataset.oreInitialized = "table";
  table.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const button = event.target.closest<HTMLButtonElement>(".ore-table-sort");
    const header = button?.closest<HTMLTableCellElement>("th");

    if (!button || !header || button.disabled || !table.contains(button)) {
      return;
    }

    const current = header.getAttribute("aria-sort") ?? "none";
    const direction: OreTableSortDirection =
      current === "none"
        ? "ascending"
        : current === "ascending"
          ? "descending"
          : "none";

    for (const sortable of table.querySelectorAll("th[aria-sort]")) {
      sortable.setAttribute("aria-sort", "none");
    }
    header.setAttribute("aria-sort", direction);

    table.dispatchEvent(
      new CustomEvent<OreTableSortDetail>("sort", {
        bubbles: true,
        detail: { column: button.value, direction },
      }),
    );
  });
}

export { initTable };

export function initTables(root: ParentNode = document): void {
  if (root instanceof HTMLTableElement && root.matches(tableSelector)) {
    initTable(root);
  }

  for (const table of root.querySelectorAll<OreTableElement>(tableSelector)) {
    initTable(table);
  }
}

if (typeof document !== "undefined") {
  initTables();

  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          initTables(node);
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}
