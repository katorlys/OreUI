import Link from "next/link";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/layout";

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">OreUI</h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground">
          非官方 Ore UI 跨框架组件库
        </p>
        <div className="mt-8">
          <Link
            href="/zh-CN/docs"
            className="inline-flex h-10 items-center border border-fd-border bg-fd-primary px-4 text-sm font-medium text-fd-primary-foreground"
          >
            查看文档
          </Link>
        </div>
      </main>
    </HomeLayout>
  );
}

export function generateStaticParams() {
  return [{ lang: "zh-CN" }];
}
