import { describe, expect, it } from "vitest";
import { assetUrl, detectPlatform, platforms, releaseVersion } from "./release";

describe("website release metadata", () => {
  it("exposes the published preview for four targets", () => {
    expect(releaseVersion).toBe("0.0.0-20260721120555");
    expect(platforms).toHaveLength(4);
    expect(new Set(platforms.map(({ id }) => id)).size).toBe(4);
  });

  it("creates direct GitHub release asset links", () => {
    expect(assetUrl(platforms[0].archive)).toContain(
      `/releases/download/v${releaseVersion}/`,
    );
  });

  it("detects common desktop platforms", () => {
    expect(detectPlatform("Mozilla/5.0 (Windows NT 10.0)", "Win32")).toBe(
      "windows-x64",
    );
    expect(detectPlatform("Mozilla/5.0 (X11; Linux x86_64)", "Linux")).toBe(
      "linux-x64",
    );
    expect(detectPlatform("Mozilla/5.0 (Macintosh; ARM Mac OS X)", "MacARM")).toBe(
      "mac-arm64",
    );
  });
});
