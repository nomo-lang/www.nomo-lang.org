import { describe, expect, it } from "vitest";

import {
  localeFromPathname,
  localeHref,
  messages,
  toLocale,
} from "./i18n";

describe("website locales", () => {
  it("uses English at the root and Chinese under /zh", () => {
    expect(localeFromPathname("/")).toBe("en");
    expect(localeFromPathname("/zh/download/")).toBe("zh");
    expect(toLocale("unknown")).toBe("en");
  });

  it("creates stable locale links", () => {
    expect(localeHref("en")).toBe("/");
    expect(localeHref("zh")).toBe("/zh/");
  });

  it("provides translated metadata", () => {
    expect(messages.en.meta.title).toContain("Small language");
    expect(messages.zh.meta.title).toContain("小巧的语言");
  });
});
