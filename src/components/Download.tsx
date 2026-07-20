import { useMemo, useState } from "react";
import {
  assetUrl,
  detectPlatform,
  platforms,
  releaseTag,
  releaseUrl,
  type Platform,
} from "../data/release";
import { ArrowIcon } from "./ArrowIcon";

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function DownloadRow({
  platform,
  recommended,
}: {
  platform: Platform;
  recommended: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyText(platform.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <article className={`download-row${recommended ? " is-recommended" : ""}`}>
      <div className="download-row__platform">
        <strong>{platform.label}</strong>
        <span>{platform.detail}</span>
        {recommended && <small>Detected for this device</small>}
      </div>
      <code>{platform.archive}</code>
      <div className="download-row__actions">
        <button onClick={handleCopy} type="button">
          {copied ? "Copied" : "Copy command"}
        </button>
        <a href={assetUrl(platform.archive)}>
          Download
          <ArrowIcon direction="down" />
        </a>
      </div>
    </article>
  );
}

export function Download() {
  const detected = useMemo(
    () => detectPlatform(navigator.userAgent, navigator.platform),
    [],
  );
  const orderedPlatforms = useMemo(
    () =>
      [...platforms].sort((left, right) => {
        if (left.id === detected) return -1;
        if (right.id === detected) return 1;
        return 0;
      }),
    [detected],
  );

  return (
    <section className="download section-shell" id="download">
      <div className="section-index">
        <span>03 / DOWNLOAD</span>
        <span>FIRST PUBLIC PREVIEW</span>
      </div>
      <div className="download__intro">
        <div>
          <p className="eyebrow">Published July 20, 2026</p>
          <h2>
            Build something
            <br />
            <em>you can inspect.</em>
          </h2>
        </div>
        <div className="release-note">
          <span>CURRENT PREVIEW</span>
          <strong>{releaseTag}</strong>
          <p>
            Early software. Expect sharp edges, fast changes, and an evolving
            standard library.
          </p>
          <a href={releaseUrl}>
            Release notes
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="download-list">
        {orderedPlatforms.map((platform) => (
          <DownloadRow
            key={platform.id}
            platform={platform}
            recommended={platform.id === detected}
          />
        ))}
      </div>
      <div className="download__meta">
        <a href={assetUrl("SHA256SUMS")}>
          Verify with SHA256SUMS
          <ArrowIcon />
        </a>
        <a href={releaseUrl}>
          View all release assets
          <ArrowIcon />
        </a>
        <span>Source builds require a C99 toolchain.</span>
      </div>
    </section>
  );
}

