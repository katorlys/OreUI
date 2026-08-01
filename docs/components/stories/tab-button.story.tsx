"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreTabBar } from "@katorlys/oreui-react/tab-bar";
import { OreTabButton } from "@katorlys/oreui-react/tab-button";
import { useState } from "react";

interface TabButtonPreviewProps {
  disabled: boolean;
  palette: "default" | "toggle";
}

function TabButtonPreview({ disabled, palette }: TabButtonPreviewProps) {
  const [selected, setSelected] = useState("worlds");

  return (
    <OreTabBar aria-label="Play menu">
      <OreTabButton
        palette={palette}
        selected={selected === "worlds"}
        onChange={() => setSelected("worlds")}
      >
        Worlds
      </OreTabButton>
      <OreTabButton
        palette={palette}
        selected={selected === "realms"}
        onChange={() => setSelected("realms")}
      >
        Realms
      </OreTabButton>
      <OreTabButton disabled={disabled} palette={palette}>
        Discover
      </OreTabButton>
    </OreTabBar>
  );
}

const { defineStory } = defineStoryFactory();

export const tabButtonStory = defineStory({
  Component: TabButtonPreview,
  displayName: "Tab Button",
  args: {
    initial: {
      disabled: false,
      palette: "default",
    },
  },
});

export const TabButtonStory = tabButtonStory.WithControl;