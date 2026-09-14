"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Switch } from "@oreui-web/react/switch";
import type { ChangeEvent } from "react";
import { useState } from "react";

interface SwitchPreviewProps {
  color:
    | "primary"
    | "secondary"
    | "destructive"
    | "dungeons"
    | "legends"
    | "realms"
    | "gold";
  disabled: boolean;
  initialChecked: boolean;
  label: string;
  variant: "default" | "icons";
}

function SwitchPreview({
  color,
  disabled,
  initialChecked,
  label,
  variant,
}: SwitchPreviewProps) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Switch
        className="text-current"
        labelClassName="text-fd-foreground"
        checked={checked}
        color={color}
        disabled={disabled}
        variant={variant}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setChecked(event.currentTarget.checked);
        }}
      >
        {label}
      </Switch>
      <output aria-live="polite">{checked ? "On" : "Off"}</output>
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const switchStory = defineStory({
  Component: SwitchPreview,
  displayName: "Switch",
  args: {
    initial: {
      color: "primary",
      disabled: false,
      initialChecked: false,
      label: "Enable autosave",
      variant: "icons",
    },
  },
});

export const SwitchStory = switchStory.WithControl;
