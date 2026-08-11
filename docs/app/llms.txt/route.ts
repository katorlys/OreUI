import { llms } from "fumadocs-core/source";

import { source } from "@/lib/source";

export const dynamic = "force-static";

export function GET() {
  const index = llms(source)
    .index()
    .replaceAll("](/", "](https://katorly.dev/OreUI/");

  return new Response(index);
}
