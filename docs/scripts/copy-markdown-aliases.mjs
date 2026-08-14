// This file is for supporting appending .md and .mdx at the end of the path feature on static sites.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("out");
const markdownDir = path.join(outputDir, "llms.mdx");
const utf8Bom = Buffer.from([0xef, 0xbb, 0xbf]); // UTF-8 BOM

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
      const content = await readFile(contentPath);
      const encodedContent = Buffer.concat([utf8Bom, content]);
      const targetDir = path.join(
        outputDir,
        ...nextSegments.slice(0, -1),
      );
      const targetName = nextSegments.at(-1);

      await mkdir(targetDir, { recursive: true });
      await Promise.all(
        ["md", "mdx"].map((extension) =>
          writeFile(
            path.join(targetDir, `${targetName}.${extension}`),
            encodedContent,
          ),
        ),
      );
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }

    await copyMarkdownFiles(sourceDir, nextSegments);
  }
}

await copyMarkdownFiles(markdownDir);
