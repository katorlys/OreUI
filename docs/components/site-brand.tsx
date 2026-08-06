"use client";

import Image from "next/image";

import type { ComponentProps } from "react";

export function SiteBrand() {
  return (
    <span className="inline-flex items-center gap-2.5 text-fd-foreground max-sm:gap-1.5">
      <a
        className="inline-flex items-center"
        href="https://katorly.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Katorly Lab"
      >
        <Image
          src="/OreUI/katorlylab.svg"
          alt=""
          width={32}
          height={32}
        />
      </a>
      <span className="font-(--font-sans) text-[#8d9093]" aria-hidden="true">
        /
      </span>
      <a
        className="inline-flex items-center gap-2 font-(--ore-font-display) text-lg leading-none max-sm:gap-1.5 max-sm:text-sm"
        href="/OreUI/"
        aria-label="OreUI home"
      >
        <Image
          src="/OreUI/icon.svg"
          alt=""
          aria-hidden="true"
          width={34}
          height={34}
        />
        <span style={{ fontFamily: "var(--ore-font-display)" }}>OreUI</span>
      </a>
    </span>
  );
}

export function SiteBrandSlot(props: ComponentProps<"a">) {
  return <div className={props.className}><SiteBrand /></div>;
}
