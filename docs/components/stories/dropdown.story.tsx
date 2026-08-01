"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreButton } from "@katorlys/oreui-react/button";
import { OreDropdown } from "@katorlys/oreui-react/dropdown";
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
      <OreDropdown
        value={value}
        variant={variant}
        onChange={(event) => setValue(event.detail.value)}
      >
        <OreButton className="ore-dropdown-trigger" type="button" variant="secondary">
          <span className="ore-dropdown-trigger-label">{label}</span>
        </OreButton>
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
      </OreDropdown>
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