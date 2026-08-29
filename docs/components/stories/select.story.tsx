"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Select } from "@oreui-web/react/select";
import { useState } from "react";

interface SelectPreviewProps {
  disabled: boolean;
  initialValue: string;
  required: boolean;
}

function SelectPreview({
  disabled,
  initialValue,
  required,
}: SelectPreviewProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
      <label htmlFor="select-story">Game mode</label>
      <Select
        disabled={disabled}
        id="select-story"
        required={required}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      >
        <option value="">Choose a mode</option>
        <option value="survival">Survival</option>
        <option value="creative">Creative</option>
        <option value="adventure">Adventure</option>
        <option value="spectator" disabled>
          Spectator
        </option>
      </Select>
      <output aria-live="polite">Selected: {value || "none"}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const selectStory = defineStory({
  Component: SelectPreview,
  displayName: "Select",
  args: {
    initial: {
      disabled: false,
      initialValue: "creative",
      required: false,
    },
  },
});

export const SelectStory = selectStory.WithControl;
