import { OreHomePage } from "@/components/home-page";

export default function HomePage() {
  return <OreHomePage lang="zh-CN" />;
}

export function generateStaticParams() {
  return [{ lang: "zh-CN" }];
}
