export const releaseVersion = "0.0.0-20260720080715";
export const releaseTag = `v${releaseVersion}`;
export const releaseUrl = `https://github.com/nomo-lang/nomo/releases/tag/${releaseTag}`;
export const releaseDownloadBase = `https://github.com/nomo-lang/nomo/releases/download/${releaseTag}`;

export type PlatformId = "mac-arm64" | "mac-x64" | "linux-x64" | "windows-x64";

export type Platform = {
  id: PlatformId;
  label: string;
  detail: string;
  archive: string;
  command: string;
};

const archiveBase = `nomo-${releaseTag}`;

export const platforms: Platform[] = [
  {
    id: "mac-arm64",
    label: "macOS",
    detail: "Apple silicon",
    archive: `${archiveBase}-aarch64-apple-darwin.tar.gz`,
    command: `curl -LO ${releaseDownloadBase}/${archiveBase}-aarch64-apple-darwin.tar.gz`,
  },
  {
    id: "mac-x64",
    label: "macOS",
    detail: "Intel",
    archive: `${archiveBase}-x86_64-apple-darwin.tar.gz`,
    command: `curl -LO ${releaseDownloadBase}/${archiveBase}-x86_64-apple-darwin.tar.gz`,
  },
  {
    id: "linux-x64",
    label: "Linux",
    detail: "x86_64 GNU",
    archive: `${archiveBase}-x86_64-unknown-linux-gnu.tar.gz`,
    command: `curl -LO ${releaseDownloadBase}/${archiveBase}-x86_64-unknown-linux-gnu.tar.gz`,
  },
  {
    id: "windows-x64",
    label: "Windows",
    detail: "x86_64 MSVC",
    archive: `${archiveBase}-x86_64-pc-windows-msvc.zip`,
    command: `curl.exe -LO ${releaseDownloadBase}/${archiveBase}-x86_64-pc-windows-msvc.zip`,
  },
];

export function assetUrl(archive: string) {
  return `${releaseDownloadBase}/${archive}`;
}

export function detectPlatform(
  userAgent: string,
  platform: string,
): PlatformId | undefined {
  const fingerprint = `${userAgent} ${platform}`.toLowerCase();

  if (fingerprint.includes("win")) return "windows-x64";
  if (fingerprint.includes("linux")) return "linux-x64";
  if (fingerprint.includes("mac")) {
    return fingerprint.includes("arm") || fingerprint.includes("aarch64")
      ? "mac-arm64"
      : "mac-x64";
  }

  return undefined;
}
