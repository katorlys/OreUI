"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { Button } from "@katorlys/oreui-react/button";
import { Tooltip } from "@katorlys/oreui-react/tooltip";
import { useEffect, useState } from "react";

interface TooltipPreviewProps {
  content: string;
  delay: number;
  side: "top" | "right" | "bottom" | "left";
}

function TooltipPreview({ content, delay, side }: TooltipPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ padding: "4rem" }}>
      {mounted ? (
        <Tooltip delay={delay} side={side}>
          <Button className="ore-tooltip-trigger" type="button">
            Hover
          </Button>
          <div className="ore-tooltip-content">
            {content}
            <span aria-hidden="true" className="ore-tooltip-arrow" />
          </div>
        </Tooltip>
      ) : null}
    </div>
  );
}

const { defineStory } = defineStoryFactory();

export const tooltipStory = defineStory({
  Component: TooltipPreview,
  displayName: "Tooltip",
  args: {
    initial: {
      content: "Create a copy of this world",
      delay: 300,
      side: "top",
    },
  },
});

export const TooltipStory = tooltipStory.WithControl;
