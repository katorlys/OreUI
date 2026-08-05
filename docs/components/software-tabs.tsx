import { CodeBlockTabsTrigger as FumadocsCodeBlockTabsTrigger } from "fumadocs-ui/components/codeblock";
import type { ComponentProps } from "react";

const softwareIcons: Record<string, string> = {
  bun: "/OreUI/softwares/bun.svg",
  npm: "/OreUI/softwares/npm.svg",
  pnpm: "/OreUI/softwares/pnpm.svg",
  yarn: "/OreUI/softwares/yarn.svg",
};

type SoftwareTabsTriggerProps = ComponentProps<
  typeof FumadocsCodeBlockTabsTrigger
>;

export function SoftwareTabsTrigger({
  children,
  ...props
}: SoftwareTabsTriggerProps) {
  const software = typeof children === "string" ? children.toLowerCase() : "";
  const icon = softwareIcons[software];

  return (
    <FumadocsCodeBlockTabsTrigger {...props}>
      {icon ? (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="not-prose size-4 object-contain"
        />
      ) : null}
      {children}
    </FumadocsCodeBlockTabsTrigger>
  );
}
