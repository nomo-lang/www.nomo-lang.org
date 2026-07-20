<script lang="ts">
  import { onMount } from "svelte";

  import ArrowIcon from "$lib/components/ArrowIcon.svelte";
  import {
    assetUrl,
    detectPlatform,
    platforms,
    releaseTag,
    releaseUrl,
    type Platform,
    type PlatformId,
  } from "$lib/data/release";

  type CodeView = "nomo" | "c99" | "native";
  type CodeToken = {
    text: string;
    className?: string;
  };

  const token = (text: string, className?: string): CodeToken => ({
    text,
    className,
  });

  const sourceLines: Record<CodeView, CodeToken[][]> = {
    nomo: [
      [token("package", "token-keyword"), token(" app.main")],
      [token(" ")],
      [token("import", "token-keyword"), token(" std.io")],
      [token(" ")],
      [
        token("fn", "token-keyword"),
        token(" "),
        token("main", "token-fn"),
        token("() -> "),
        token("void", "token-type"),
        token(" {"),
      ],
      [
        token("  io.println("),
        token('"Hello, Nomo"', "token-string"),
        token(")"),
      ],
      [token("}")],
    ],
    c99: [
      [
        token("#include", "token-keyword"),
        token(" "),
        token("<stdio.h>", "token-string"),
      ],
      [token(" ")],
      [
        token("int", "token-type"),
        token(" "),
        token("main", "token-fn"),
        token("(void) {"),
      ],
      [token("  puts("), token('"Hello, Nomo"', "token-string"), token(");")],
      [token("  return 0;")],
      [token("}")],
    ],
    native: [
      [token("$ nomo build hello.nomo", "token-comment")],
      [token("emitted build/hello.c")],
      [token("linked build/hello")],
      [token(" ")],
      [token("$ ./build/hello", "token-comment")],
      [token("Hello, Nomo", "token-output")],
    ],
  };

  const labels: Record<CodeView, string> = {
    nomo: "Nomo",
    c99: "Readable C99",
    native: "Native",
  };

  const navItems = [
    {
      label: "Docs",
      href: "https://github.com/nomo-lang/nomo/tree/main/docs",
    },
    {
      label: "Playground",
      href: "https://nomo-lang.github.io/nomo-playground/",
    },
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "GitHub", href: "https://github.com/nomo-lang" },
  ];

  const principles = [
    {
      number: "01",
      title: "Small before powerful",
      body: "A compact language surface is easier to learn, audit, and maintain. New features must earn their place.",
    },
    {
      number: "02",
      title: "Explicit over magic",
      body: "Control flow, mutation, and failure stay visible. The code should tell you what the program can do.",
    },
    {
      number: "03",
      title: "No null. No exceptions.",
      body: "Recoverable failure travels through Result. Programming defects stop through panic instead of hidden unwinding.",
    },
    {
      number: "04",
      title: "Inspect the whole build",
      body: "Nomo emits readable C99 before linking, keeping generated code and the native toolchain in reach.",
    },
  ];

  const toolchain = [
    ["nomo fmt", "Stable source formatting"],
    ["nomo check", "Parse and type-check"],
    ["nomo build", "Emit C99 and link"],
    ["nomo run", "Build and execute"],
  ];

  const ecosystemLinks = [
    {
      label: "Language",
      title: "Compiler & standard library",
      description: "Read the source, follow the roadmap, or open an issue.",
      href: "https://github.com/nomo-lang/nomo",
    },
    {
      label: "Try it",
      title: "Browser playground",
      description: "Explore real syntax with instant examples and diagnostics.",
      href: "https://nomo-lang.github.io/nomo-playground/",
    },
    {
      label: "Design",
      title: "RFC index",
      description: "See the decisions shaping packages, builds, and operations.",
      href: "https://github.com/nomo-lang/nomo/tree/main/docs/rfcs",
    },
  ];

  let active = $state<CodeView>("nomo");
  let detected = $state<PlatformId>();
  let copiedId = $state<PlatformId>();

  let orderedPlatforms = $derived(
    [...platforms].sort((left, right) => {
      if (left.id === detected) return -1;
      if (right.id === detected) return 1;
      return 0;
    }),
  );

  onMount(detectCurrentPlatform);

  function detectCurrentPlatform() {
    detected = detectPlatform(navigator.userAgent, navigator.platform);
  }

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

  async function copyCommand(platform: Platform) {
    await copyText(platform.command);
    copiedId = platform.id;
    window.setTimeout(() => {
      if (copiedId === platform.id) copiedId = undefined;
    }, 1600);
  }
</script>

<svelte:head>
  <title>Nomo — Small language. Native programs.</title>
  <meta
    name="description"
    content="Nomo is a small, explicit programming language that compiles to readable C99 and native programs."
  />
  <meta
    property="og:title"
    content="Nomo — Small language. Native programs."
  />
  <meta
    property="og:description"
    content="A small, explicit programming language for systems tools, CLIs, and small services."
  />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <a class="wordmark" href="#top" aria-label="Nomo home">
    <span class="wordmark__mark" aria-hidden="true">N</span>
    <span>Nomo</span>
  </a>
  <nav class="site-nav" aria-label="Primary navigation">
    {#each navItems as item (item.label)}
      <a href={item.href}>{item.label}</a>
    {/each}
  </nav>
  <a class="header-action" href="#download">
    Get Nomo
    <ArrowIcon direction="down" />
  </a>
</header>

<main id="main">
  <section class="hero" id="top">
    <div class="hero__signal">
      <span>01 / LANGUAGE</span>
      <span>EARLY PREVIEW</span>
    </div>
    <div class="hero__content">
      <div class="hero__copy">
        <p class="eyebrow">A language for the code you need to trust</p>
        <h1>
          Small language.
          <br />
          <em>Native programs.</em>
        </h1>
        <p class="hero__lede">
          Nomo is a small, explicit programming language for systems tools,
          CLIs, and small services. It compiles to readable C99, then to a
          native executable you can inspect.
        </p>
        <div class="hero__actions">
          <a class="button button--primary" href="#download">
            Download the preview
            <ArrowIcon />
          </a>
          <a
            class="text-link"
            href="https://nomo-lang.github.io/nomo-playground/"
          >
            Open playground
            <ArrowIcon />
          </a>
        </div>
      </div>

      <div class="code-frame">
        <div class="code-frame__topline">
          <span>hello.nomo</span>
          <span class="code-frame__status">
            <i aria-hidden="true"></i>
            preview
          </span>
        </div>
        <div
          class="code-frame__tabs"
          role="tablist"
          aria-label="Build stages"
        >
          {#each Object.keys(labels) as view (view)}
            <button
              aria-selected={active === view}
              class:is-active={active === view}
              onclick={() => (active = view as CodeView)}
              role="tab"
              type="button"
            >
              {labels[view as CodeView]}
            </button>
          {/each}
        </div>
        <div
          aria-label="{labels[active]} output"
          class="code-frame__body"
          role="tabpanel"
        >
          <span class="code-frame__rail" aria-hidden="true">
            {#each sourceLines[active] as _, index (`${active}-rail-${index}`)}
              <span>{String(index + 1).padStart(2, "0")}</span>
            {/each}
          </span>
          <code>
            {#each sourceLines[active] as line, index (`${active}-${index}`)}
              <span class="code-line">
                {#each line as part, partIndex (`${active}-${index}-${partIndex}`)}
                  <span class={part.className}>{part.text}</span>
                {/each}
              </span>
            {/each}
          </code>
        </div>
        <div class="code-frame__footer">
          <span>Nomo source</span>
          <span aria-hidden="true">→</span>
          <span>C99</span>
          <span aria-hidden="true">→</span>
          <span>native executable</span>
        </div>
      </div>
    </div>
    <div class="hero__facts" aria-label="Nomo at a glance">
      <div>
        <span>OUTPUT</span>
        <strong>Readable C99</strong>
      </div>
      <div>
        <span>FAILURE</span>
        <strong>Result, not exceptions</strong>
      </div>
      <div>
        <span>DEFAULT</span>
        <strong>Immutable values</strong>
      </div>
      <div>
        <span>LICENSE</span>
        <strong>Apache-2.0</strong>
      </div>
    </div>
  </section>

  <section class="principles section-shell" id="principles">
    <div class="section-index">
      <span>02 / PRINCIPLES</span>
      <span>DESIGNED TO STAY LEGIBLE</span>
    </div>
    <div class="principles__heading">
      <p class="eyebrow">Language design</p>
      <h2>
        Explicit
        <br />
        <em>by design.</em>
      </h2>
      <p>
        Nomo aims for code that remains understandable from source file to
        emitted C. Its constraints are part of the product, not temporary
        omissions.
      </p>
    </div>
    <div class="principle-list">
      {#each principles as principle (principle.number)}
        <article class="principle-row">
          <span class="principle-row__number">{principle.number}</span>
          <h3>{principle.title}</h3>
          <p>{principle.body}</p>
          <span class="principle-row__mark" aria-hidden="true">+</span>
        </article>
      {/each}
    </div>
    <div class="build-story">
      <div class="build-story__flow">
        <p class="eyebrow">Compilation path</p>
        <div class="flow-diagram" aria-label="Nomo compilation stages">
          <div>
            <span>01</span>
            <strong>.nomo</strong>
            <small>source</small>
          </div>
          <i aria-hidden="true"></i>
          <div>
            <span>02</span>
            <strong>.c</strong>
            <small>readable C99</small>
          </div>
          <i aria-hidden="true"></i>
          <div>
            <span>03</span>
            <strong>bin</strong>
            <small>native</small>
          </div>
        </div>
        <a
          class="text-link"
          href="https://github.com/nomo-lang/nomo/tree/main/docs/rfcs"
        >
          Read the RFCs
          <ArrowIcon />
        </a>
      </div>
      <div class="toolchain">
        <div class="toolchain__title">
          <span>TOOLCHAIN</span>
          <span>ONE COMMAND AWAY</span>
        </div>
        {#each toolchain as [command, description] (command)}
          <div class="toolchain__row">
            <code>{command}</code>
            <span>{description}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="download section-shell" id="download">
    <div class="section-index">
      <span>03 / DOWNLOAD</span>
      <span>FIRST PUBLIC PREVIEW</span>
    </div>
    <div class="download__intro">
      <div>
        <p class="eyebrow">Published July 20, 2026</p>
        <h2>
          Build something
          <br />
          <em>you can inspect.</em>
        </h2>
      </div>
      <div class="release-note">
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
    <div class="download-list">
      {#each orderedPlatforms as platform (platform.id)}
        <article
          class="download-row"
          class:is-recommended={platform.id === detected}
        >
          <div class="download-row__platform">
            <strong>{platform.label}</strong>
            <span>{platform.detail}</span>
            {#if platform.id === detected}
              <small>Detected for this device</small>
            {/if}
          </div>
          <code>{platform.archive}</code>
          <div class="download-row__actions">
            <button
              onclick={() => void copyCommand(platform)}
              type="button"
            >
              {copiedId === platform.id ? "Copied" : "Copy command"}
            </button>
            <a href={assetUrl(platform.archive)}>
              Download
              <ArrowIcon direction="down" />
            </a>
          </div>
        </article>
      {/each}
    </div>
    <div class="download__meta">
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

  <section class="ecosystem section-shell" id="ecosystem">
    <div class="section-index">
      <span>04 / ECOSYSTEM</span>
      <span>BUILT IN THE OPEN</span>
    </div>
    <div class="ecosystem__heading">
      <h2>
        Follow the work.
        <br />
        <em>Shape what comes next.</em>
      </h2>
      <p>
        Nomo grows through executable examples, tests, and small RFCs. The
        repositories are public before the language is finished.
      </p>
    </div>
    <div class="ecosystem__links">
      {#each ecosystemLinks as link, index (link.title)}
        <a href={link.href}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <small>{link.label}</small>
          <strong>{link.title}</strong>
          <p>{link.description}</p>
          <ArrowIcon />
        </a>
      {/each}
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="site-footer__wordmark" aria-hidden="true">NOMO</div>
  <div class="site-footer__meta">
    <p>
      A small language for
      <br />
      inspectable native software.
    </p>
    <div>
      <a href="https://github.com/nomo-lang">GitHub</a>
      <a href="https://github.com/nomo-lang/nomo/blob/main/CONTRIBUTING.md">
        Contribute
      </a>
      <a href="https://github.com/nomo-lang/.github/blob/main/SECURITY.md">
        Security
      </a>
      <a href="https://github.com/nomo-lang/nomo/blob/main/LICENSE">License</a>
    </div>
    <span>© 2026 Nomo contributors</span>
  </div>
</footer>
