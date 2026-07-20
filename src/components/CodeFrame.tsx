import { useState, type ReactNode } from "react";

type CodeView = "nomo" | "c99" | "native";

const sourceLines: Record<CodeView, ReactNode[]> = {
  nomo: [
    <>
      <span className="token-keyword">package</span> app.main
    </>,
    "",
    <>
      <span className="token-keyword">import</span> std.io
    </>,
    "",
    <>
      <span className="token-keyword">fn</span>{" "}
      <span className="token-fn">main</span>() -&gt;{" "}
      <span className="token-type">void</span> {"{"}
    </>,
    <>
      {"  "}io.println(<span className="token-string">"Hello, Nomo"</span>)
    </>,
    "}",
  ],
  c99: [
    <>
      <span className="token-keyword">#include</span>{" "}
      <span className="token-string">&lt;stdio.h&gt;</span>
    </>,
    "",
    <>
      <span className="token-type">int</span>{" "}
      <span className="token-fn">main</span>(void) {"{"}
    </>,
    <>
      {"  "}puts(<span className="token-string">"Hello, Nomo"</span>);
    </>,
    "  return 0;",
    "}",
  ],
  native: [
    <span className="token-comment">$ nomo build hello.nomo</span>,
    "emitted build/hello.c",
    "linked build/hello",
    "",
    <span className="token-comment">$ ./build/hello</span>,
    <span className="token-output">Hello, Nomo</span>,
  ],
};

const labels: Record<CodeView, string> = {
  nomo: "Nomo",
  c99: "Readable C99",
  native: "Native",
};

export function CodeFrame() {
  const [active, setActive] = useState<CodeView>("nomo");

  return (
    <div className="code-frame">
      <div className="code-frame__topline">
        <span>hello.nomo</span>
        <span className="code-frame__status">
          <i aria-hidden="true" />
          preview
        </span>
      </div>
      <div className="code-frame__tabs" role="tablist" aria-label="Build stages">
        {(Object.keys(labels) as CodeView[]).map((view) => (
          <button
            aria-selected={active === view}
            className={active === view ? "is-active" : ""}
            key={view}
            onClick={() => setActive(view)}
            role="tab"
            type="button"
          >
            {labels[view]}
          </button>
        ))}
      </div>
      <div
        aria-label={`${labels[active]} output`}
        className="code-frame__body"
        role="tabpanel"
      >
        <span className="code-frame__rail" aria-hidden="true">
          {sourceLines[active].map((_, index) => (
            <span key={index}>{String(index + 1).padStart(2, "0")}</span>
          ))}
        </span>
        <code>
          {sourceLines[active].map((line, index) => (
            <span className="code-line" key={index}>
              {line || " "}
            </span>
          ))}
        </code>
      </div>
      <div className="code-frame__footer">
        <span>Nomo source</span>
        <span aria-hidden="true">→</span>
        <span>C99</span>
        <span aria-hidden="true">→</span>
        <span>native executable</span>
      </div>
    </div>
  );
}

