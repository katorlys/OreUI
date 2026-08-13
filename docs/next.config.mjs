import { createMDX } from "fumadocs-mdx/next";
import { createNextStory } from "@fumadocs/story/next";
import siteConfig from "./site-config.json" with { type: "json" };

const withMDX = createMDX();
const withStory = createNextStory();

/** @type {import("next").NextConfig} */
const config = {
  output: "export",
  basePath: siteConfig.basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    useTypeScriptCli: true,
  },
};

export default withStory(withMDX(config));
