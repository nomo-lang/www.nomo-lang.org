import { describe, expect, it } from "vitest";

import en from "../../messages/en.json";
import zh from "../../messages/zh.json";

describe("website message catalogs", () => {
  it("keeps locale keys in sync", () => {
    expect(Object.keys(zh).sort()).toEqual(Object.keys(en).sort());
  });

  it("contains localized metadata and documentation", () => {
    expect(en.meta_title).toContain("Small language");
    expect(zh.meta_title).toContain("小巧的语言");
    expect(zh.docs_title).toBe("开始使用 Nomo");
  });
});
