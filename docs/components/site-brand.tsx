"use client";

import Image from "next/image";

import type { ComponentProps } from "react";

export function SiteBrand() {
  return (
    <span className="inline-flex items-center text-fd-foreground">
      <a
        className="inline-flex items-center gap-2 text-lg font-normal leading-none max-sm:gap-1.5 max-sm:text-sm"
        href="/OreUI/"
        aria-label="OreUI home"
        style={{ fontFamily: "var(--ore-font-display)" }}
      >
        <Image
          src="/OreUI/icon.svg"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
        />
        <span>OreUI</span>
      </a>
    </span>
  );
}

export function SiteBrandSlot(props: ComponentProps<"a">) {
  return (
    <div className={props.className}>
      <SiteBrand />
    </div>
  );
}
