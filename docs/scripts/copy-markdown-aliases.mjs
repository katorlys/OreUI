import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("out");
const markdownDir = path.join(outputDir, "llms.mdx");

async function copyMarkdownFiles(directory, segments = []) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const nextSegments = [...segments, entry.name];
    const sourceDir = path.join(directory, entry.name);
    const contentPath = path.join(sourceDir, "content.md");

    try {
      const targetPath = path.join(
        outputDir,
        ...nextSegments.slice(0, -1),
        `${nextSegments.at(-1)}.mdx`,
      );

      await mkdir(path.dirname(targetPath), { recursive: true });
      await cp(contentPath, targetPath);
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }

    await copyMarkdownFiles(sourceDir, nextSegments);
  }
}

await copyMarkdownFiles(markdownDir);
