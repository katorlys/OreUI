import { createComponent, type EventName } from "@lit/react";
import {
  OreTable as OreTableElement,
  type OreTableSortDetail,
} from "oreui-web/table";
import React from "react";

export const Table = createComponent({
  react: React,
  tagName: "ore-table",
  elementClass: OreTableElement,
  events: {
    onSort: "sort" as EventName<CustomEvent<OreTableSortDetail>>,
  },
  displayName: "Table",
});

export type TableProps = React.ComponentProps<typeof Table>;
