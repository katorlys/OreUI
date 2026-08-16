import "oreui-web/table";

import type { OreTable, OreTableSortDetail } from "oreui-web/table";
import { createOreComponent } from "../factory.js";
import type { OreComponentProps } from "../types.js";

export type TableProps = OreComponentProps<OreTable, "variant"> & {
  onSort?: (event: CustomEvent<OreTableSortDetail>) => void;
};

export const Table = createOreComponent<OreTable, TableProps>({
  events: { onSort: "sort" },
  properties: ["variant"],
  tagName: "ore-table",
});