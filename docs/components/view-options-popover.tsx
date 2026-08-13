"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { FrameworkProvider } from "fumadocs-core/framework";
import { ViewOptionsPopover as FumadocsViewOptionsPopover } from "fumadocs-ui/layouts/docs/page";

import { siteBasePath } from "@/lib/source";

type ViewOptionsPopoverProps = ComponentProps<
  typeof FumadocsViewOptionsPopover
>;

export function ViewOptionsPopover(props: ViewOptionsPopoverProps) {
  const pathname = usePathname();
  const pagePath = `${siteBasePath}${pathname}`;
  const [pageUrl, setPageUrl] = useState(pagePath);

  useEffect(() => {
    setPageUrl(new URL(pagePath, window.location.origin).href);
  }, [pagePath]);

  return (
    <FrameworkProvider
      Image={() => null}
      Link={(linkProps) => <a {...linkProps} />}
      useParams={() => ({})}
      usePathname={() => pageUrl}
      useRouter={() => ({
        push(url) {
          window.location.assign(url);
        },
        refresh() {
          window.location.reload();
        },
      })}
    >
      <FumadocsViewOptionsPopover {...props} />
    </FrameworkProvider>
  );
}
