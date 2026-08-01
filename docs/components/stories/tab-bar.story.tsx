"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreTabBar } from "@katorlys/oreui-react/tab-bar";
import { OreTabButton } from "@katorlys/oreui-react/tab-button";
import { useState } from "react";

interface TabBarPreviewProps {
  disabledLastTab: boolean;
  label: string;
  palette: "default" | "toggle";
}

function TabBarPreview({
  disabledLastTab,
  label,
  palette,
}: TabBarPreviewProps) {
  const [selected, setSelected] = useState("worlds");

  return (
    <OreTabBar aria-label={label}>
      {[
        ["worlds", "Worlds"],
        ["realms", "Realms"],
        ["discover", "Discover"],
      ].map(([value, text], index) => (
        <OreTabButton
          disabled={disabledLastTab && index === 2}
          key={value}
          palette={palette}
          selected={selected === value}
          onChange={() => setSelected(value)}
        >
          {text}
        </OreTabButton>
      ))}
    </OreTabBar>
  );
}

const { defineStory } = defineStoryFactory();

export const tabBarStory = defineStory({
  Component: TabBarPreview,
  displayName: "Tab Bar",
  args: {
    initial: {
      disabledLastTab: false,
      label: "Play menu",
      palette: "default",
    },
  },
});

export const TabBarStory = tabBarStory.WithControl;