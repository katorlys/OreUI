"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Button } from "@oreui-web/react/button";
import { Dropdown } from "@oreui-web/react/dropdown";
import { useEffect, useState } from "react";

interface DropdownPreviewProps {
  initialValue: string;
  label: string;
  variant: "bordered" | "borderless";
}

const items = ["Survival", "Creative", "Adventure", "Spectator"];

function DropdownPreview({
  initialValue,
  label,
  variant,
}: DropdownPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Dropdown
        value={value}
        variant={variant}
        onChange={(event) => setValue(event.detail.value)}
      >
        <Button
          className="ore-dropdown-trigger"
          type="button"
          color="secondary"
        >
          <span className="ore-dropdown-trigger-label">{label}</span>
        </Button>
        <div className="ore-dropdown-menu">
          {items.map((item) => {
            const itemValue = item.toLowerCase();
            return (
              <button
                key={itemValue}
                className="ore-dropdown-item"
                data-value={itemValue}
                disabled={itemValue === "spectator"}
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
      </Dropdown>
      <output aria-live="polite">Selected: {value || "none"}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const dropdownStory = defineStory({
  Component: DropdownPreview,
  displayName: "Dropdown",
  args: {
    initial: {
      initialValue: "creative",
      label: "Game mode",
      variant: "bordered",
    },
  },
});

export const DropdownStory = dropdownStory.WithControl;
