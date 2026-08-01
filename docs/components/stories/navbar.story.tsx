"use client";

import { defineStoryFactory } from "@fumadocs/story/next/client";
import { OreNavbar } from "@katorlys/oreui-react/navbar";
import { createElement } from "react";

const backIcon = (
  <svg viewBox="0 0 8 8">
    <path
      d="M5 2h1V1H5zm0 0v1H4V2zm1 6H5V7h-.966V6h1v1H6zM3 4h1V3H3zm0 1V4H2v1zm0 0h1v1H3z"
      fill="currentColor"
      fillRule="evenodd"
      transform="translate(0 -.5)"
    />
  </svg>
);

interface NavbarPreviewProps {
  action: string;
  showBackButton: boolean;
  title: string;
}

function NavbarPreview({
  action,
  showBackButton,
  title,
}: NavbarPreviewProps) {
  return (
    <OreNavbar
      aria-label="Screen navigation"
      style={{ width: "min(100%, 40rem)" }}
    >
      <div className="ore-navbar-start">
        {showBackButton ? (
          <button className="ore-navbar-button" type="button" aria-label="Back">
            {createElement("ore-icon", { "aria-hidden": "true" }, backIcon)}
          </button>
        ) : null}
      </div>
      <span className="ore-navbar-title">{title}</span>
      <div className="ore-navbar-actions">
        <button className="ore-navbar-action" type="button">
          <span className="ore-navbar-action-label">{action}</span>
        </button>
      </div>
    </OreNavbar>
  );
}

const { defineStory } = defineStoryFactory();

export const navbarStory = defineStory({
  Component: NavbarPreview,
  displayName: "Navbar",
  args: {
    initial: {
      action: "Edit",
      showBackButton: true,
      title: "Worlds",
    },
  },
});

export const NavbarStory = navbarStory.WithControl;