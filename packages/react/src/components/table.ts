import { createComponent, type EventName } from "@lit/react";
import {
  OreTable as OreTableElement,
  type OreTableSortDetail,
} from "@katorlys/oreui/table";
import React from "react";

export const OreTable = createComponent({
  react: React,
  tagName: "ore-table",
  elementClass: OreTableElement,
  events: {
    onSort: "sort" as EventName<CustomEvent<OreTableSortDetail>>,
  },
  displayName: "OreTable",
});

export type OreTableProps = React.ComponentProps<typeof OreTable>;
