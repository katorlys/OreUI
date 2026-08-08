"use client";

import { HomeLayout } from "fumadocs-ui/layouts/home";

import { useRouter } from "next/navigation";

import { Button } from "@katorlys/oreui-react/button";
import chevronRightUrl from "@katorlys/oreui/icons/chevron-right";
import { HomeShowcase } from "@/components/home-showcase";
import { baseOptions } from "@/lib/layout";
import packageMetadata from "../../package.json";

type HomePageProps = {
  lang?: "zh-CN";
};

export function OreHomePage({ lang }: HomePageProps) {
  const prefix = lang === "zh-CN" ? "/zh-CN" : "";
  const router = useRouter();
  const year = new Date().getFullYear();
  const version = packageMetadata.version;
  const chevronRightSource =
    typeof chevronRightUrl === "string" ? chevronRightUrl : chevronRightUrl.src;
  const title =
    lang === "zh-CN" ? "将 Ore UI 带入您的项目" : "Ore UI in your projects";
  const description =
    lang === "zh-CN"
      ? "非官方粉丝向的 Ore UI 跨框架组件库，将 Ore UI 设计系统应用到你的项目中"
      : "An unofficial cross-framework component library that implements the OreUI design system into your project.";

  return (
    <HomeLayout {...baseOptions(true)}>
      <main className="min-h-full bg-fd-background font-(--ore-font-body) text-fd-foreground">
        <section
          className="flex flex-col items-center px-6 py-10 text-center md:py-16"
          aria-labelledby="ore-home-title"
        >
          <a
            className="inline-flex min-h-6 items-center gap-2 px-3 rounded-full bg-fd-secondary text-xs no-underline"
            href="https://github.com/katorlys/OreUI/releases"
          >
            Version {version} out now
            <span
              className="size-3 bg-current"
              style={{
                maskImage: `url(${chevronRightSource})`,
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "contain",
                WebkitMaskImage: `url(${chevronRightSource})`,
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
              }}
              aria-hidden="true"
            />
          </a>
          <h1
            id="ore-home-title"
            className="my-4 max-w-3xl text-3xl font-normal leading-tight tracking-normal sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--ore-font-display)" }}
          >
            {title}
          </h1>
          <p
            className="m-0 max-w-3xs text-base leading-6 text-fd-muted-foreground sm:max-w-xl sm:text-xl sm:leading-8"
            style={{ fontFamily: "var(--ore-font-body)" }}
          >
            {description}
          </p>
          <div className="mt-4 sm:mt-8 flex gap-3 max-sm:w-full">
            <Button
              className="max-sm:w-full"
              type="button"
              onClick={() => router.push(`${prefix}/docs/getting-started`)}
            >
              Get started
            </Button>
            <Button
              className="max-sm:w-full"
              type="button"
              color="secondary"
              onClick={() => router.push(`${prefix}/docs/overview`)}
            >
              View components
            </Button>
          </div>
        </section>

        <HomeShowcase />

        <footer className="mx-auto box-border flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-6 py-8 text-center text-sm text-fd-muted-foreground sm:px-10 md:flex-row">
          <span>Made with ❤ by Minecraft enthusiasts.</span>
          <span>
            © {year === 2026 ? "2026" : `2026-${year}`}{" "}
            <a
              className="font-medium text-fd-foreground underline-offset-4 hover:underline"
              href="https://katorly.com"
              target="_blank"
              rel="noreferrer"
            >
              Katorly Lab
            </a>
          </span>
        </footer>
      </main>
    </HomeLayout>
  );
}
