"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreTable } from "@katorlys/oreui-react/table";
import { useState } from "react";

interface TablePreviewProps {
  caption: string;
  variant: "plain" | "striped";
}

const rows = [
  { name: "Mountains", ping: 42, players: 4, slots: 10 },
  { name: "Village", ping: 68, players: 8, slots: 20 },
];

type SortDirection = "ascending" | "descending" | "none";

function TablePreview({ caption, variant }: TablePreviewProps) {
  const [sort, setSort] = useState<{
    column: "ping" | "players" | null;
    direction: SortDirection;
  }>({ column: null, direction: "none" });
  const sortedRows = [...rows];

  if (sort.column && sort.direction !== "none") {
    sortedRows.sort((first, second) => {
      const difference = first[sort.column!] - second[sort.column!];
      return sort.direction === "ascending" ? difference : -difference;
    });
  }

  return (
    <div>
      <OreTable
        variant={variant}
        onSort={(event) => {
          const column = event.detail.column;

          if (column === "players" || column === "ping") {
            setSort({ column, direction: event.detail.direction });
          }
        }}
      >
        <table aria-label={caption}>
          <thead>
            <tr>
              <th scope="col">World</th>
              <th aria-sort="none" scope="col">
                <button className="ore-table-sort" type="button" value="players">
                  Players
                  <span aria-hidden="true" className="ore-table-sort-indicator" />
                </button>
              </th>
              <th aria-sort="none" scope="col">
                <button className="ore-table-sort" type="button" value="ping">
                  Ping
                  <span aria-hidden="true" className="ore-table-sort-indicator" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                <td>{row.players} / {row.slots}</td>
                <td>{row.ping} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </OreTable>
      <p aria-live="polite">
        {sort.column
          ? `${sort.column}: ${sort.direction}`
          : "Select a column to sort"}
      </p>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const tableStory = defineStory({
  Component: TablePreview,
  displayName: "Table",
  args: {
    initial: {
      caption: "Available worlds",
      variant: "striped",
    },
  },
});

export const TableStory = tableStory.WithControl;