import { source } from "@/lib/source";

const siteUrl = "https://katorly.dev/OreUI";

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${siteUrl}${page.url})

${processed}`;
}
