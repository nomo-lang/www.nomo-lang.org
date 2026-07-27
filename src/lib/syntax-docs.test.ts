import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

const sourceFiles = [
  new URL("../routes/+page.svelte", import.meta.url),
  new URL("../routes/docs/+page.svx", import.meta.url),
];
const helloWorldFixture = new URL("../../tests/fixtures/hello-world.nomo", import.meta.url);

describe("canonical Nomo syntax in public pages", () => {
  it.each(sourceFiles)("%s avoids legacy module roots and explicit declaration void", async (sourceFile) => {
    const source = await readFile(sourceFile, "utf8");

    expect(source).not.toContain("package app.main");
    expect(source).not.toMatch(/\bfn\s+\w+\([^)]*\)\s*->\s*void\b/);
  });

  it("shows the scaffolded manifest root on both entry points", async () => {
    const sources = await Promise.all(
      sourceFiles.map((sourceFile) => readFile(sourceFile, "utf8")),
    );

    for (const source of sources) {
      expect(source).toContain("hello_world");
    }
  });

  it("keeps the documentation code fence synchronized with the compiler fixture", async () => {
    const [documentation, fixture] = await Promise.all([
      readFile(sourceFiles[1], "utf8"),
      readFile(helloWorldFixture, "utf8"),
    ]);

    expect(documentation).toContain(`\`\`\`nomo\n${fixture.trim()}\n\`\`\``);
  });
});
