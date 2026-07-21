<script lang="ts">
  import { onMount } from "svelte";

  import ArrowIcon from "$lib/components/ArrowIcon.svelte";
  import { getWebsiteCopy } from "$lib/copy";
  import {
    assetUrl,
    detectPlatform,
    platforms,
    releaseTag,
    releaseUrl,
    type Platform,
    type PlatformId,
  } from "$lib/data/release";
  import { getLocale, localizeHref } from "$lib/paraglide/runtime";

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

  const navHrefs = [
    "/docs/",
    "https://nomo-lang.github.io/nomo-playground/",
    "#ecosystem",
    "https://github.com/nomo-lang",
  ];
  const toolCommands = ["nomo fmt", "nomo check", "nomo build", "nomo run"];
  const ecosystemHrefs = [
    "https://github.com/nomo-lang/nomo",
    "https://nomo-lang.github.io/nomo-playground/",
    "https://github.com/nomo-lang/nomo/tree/main/docs/rfcs",
  ];

  let locale = $derived(getLocale());
  let copy = $derived(getWebsiteCopy());
  let labels = $derived<Record<CodeView, string>>({
    nomo: copy.hero.labels[0],
    c99: copy.hero.labels[1],
    native: copy.hero.labels[2],
  });
  let navItems = $derived(
    copy.nav.map((label, index) => ({
      label,
      href: index === 0 ? localizeHref(navHrefs[index]) : navHrefs[index],
    })),
  );
  let principles = $derived(
    copy.principles.items.map(([title, body], index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      body,
    })),
  );
  let toolchain = $derived(
    toolCommands.map((command, index) => [
      command,
      copy.principles.tools[index],
    ]),
  );
  let ecosystemLinks = $derived(
    copy.ecosystem.links.map(([label, title, description], index) => ({
      label,
      title,
      description,
      href: ecosystemHrefs[index],
    })),
  );

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
  <title>{copy.meta.title}</title>
  <meta name="description" content={copy.meta.description} />
  <meta property="og:title" content={copy.meta.title} />
  <meta property="og:description" content={copy.meta.ogDescription} />
  <link rel="alternate" hreflang="en" href="/" />
  <link rel="alternate" hreflang="zh-CN" href="/zh/" />
  <link rel="alternate" hreflang="x-default" href="/" />
</svelte:head>

<a class="skip-link" href="#main">{copy.skip}</a>

<header class="site-header">
  <a class="wordmark" href="#top" aria-label={copy.home}>
    <span class="wordmark__mark" aria-hidden="true">N</span>
    <span>Nomo</span>
  </a>
  <nav class="site-nav" aria-label={copy.primaryNavigation}>
    {#each navItems as item (item.label)}
      <a href={item.href}>{item.label}</a>
    {/each}
  </nav>
  <div class="header-tools">
    <a
      class="locale-link"
      data-sveltekit-reload
      href={localizeHref("/", { locale: locale === "en" ? "zh" : "en" })}
    >
      {copy.switchLanguage}
    </a>
    <a class="header-action" href="#download">
      {copy.getNomo}
      <ArrowIcon direction="down" />
    </a>
  </div>
</header>

<main id="main">
  <section class="hero" id="top">
    <div class="hero__signal">
      <span>{copy.hero.signal[0]}</span>
      <span>{copy.hero.signal[1]}</span>
    </div>
    <div class="hero__content">
      <div class="hero__copy">
        <p class="eyebrow">{copy.hero.eyebrow}</p>
        <h1>
          {copy.hero.title[0]}
          <br />
          <em>{copy.hero.title[1]}</em>
        </h1>
        <p class="hero__lede">{copy.hero.lede}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#download">
            {copy.hero.download}
            <ArrowIcon />
          </a>
          <a
            class="text-link"
            href="https://nomo-lang.github.io/nomo-playground/"
          >
            {copy.hero.playground}
            <ArrowIcon />
          </a>
        </div>
      </div>

      <div class="code-frame">
        <div class="code-frame__topline">
          <span>hello.nomo</span>
          <span class="code-frame__status">
            <i aria-hidden="true"></i>
            {copy.hero.preview}
          </span>
        </div>
        <div
          class="code-frame__tabs"
          role="tablist"
          aria-label={copy.hero.buildStages}
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
          aria-label={`${labels[active]} ${copy.hero.output}`}
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
          <span>{copy.hero.flow[0]}</span>
          <span aria-hidden="true">→</span>
          <span>{copy.hero.flow[1]}</span>
          <span aria-hidden="true">→</span>
          <span>{copy.hero.flow[2]}</span>
        </div>
      </div>
    </div>
    <div class="hero__facts" aria-label={copy.hero.factsLabel}>
      {#each copy.hero.facts as fact (fact[0])}
        <div>
          <span>{fact[0]}</span>
          <strong>{fact[1]}</strong>
        </div>
      {/each}
    </div>
  </section>

  <section class="principles section-shell" id="principles">
    <div class="section-index">
      <span>{copy.principles.index[0]}</span>
      <span>{copy.principles.index[1]}</span>
    </div>
    <div class="principles__heading">
      <p class="eyebrow">{copy.principles.eyebrow}</p>
      <h2>
        {copy.principles.title[0]}
        <br />
        <em>{copy.principles.title[1]}</em>
      </h2>
      <p>{copy.principles.intro}</p>
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
        <p class="eyebrow">{copy.principles.compilationPath}</p>
        <div class="flow-diagram" aria-label={copy.principles.compilationStages}>
          <div>
            <span>01</span>
            <strong>.nomo</strong>
            <small>{copy.principles.stages[0]}</small>
          </div>
          <i aria-hidden="true"></i>
          <div>
            <span>02</span>
            <strong>.c</strong>
            <small>{copy.principles.stages[1]}</small>
          </div>
          <i aria-hidden="true"></i>
          <div>
            <span>03</span>
            <strong>bin</strong>
            <small>{copy.principles.stages[2]}</small>
          </div>
        </div>
        <a
          class="text-link"
          href="https://github.com/nomo-lang/nomo/tree/main/docs/rfcs"
        >
          {copy.principles.readRfcs}
          <ArrowIcon />
        </a>
      </div>
      <div class="toolchain">
        <div class="toolchain__title">
          <span>{copy.principles.toolchain[0]}</span>
          <span>{copy.principles.toolchain[1]}</span>
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
      <span>{copy.download.index[0]}</span>
      <span>{copy.download.index[1]}</span>
    </div>
    <div class="download__intro">
      <div>
        <p class="eyebrow">{copy.download.published}</p>
        <h2>
          {copy.download.title[0]}
          <br />
          <em>{copy.download.title[1]}</em>
        </h2>
      </div>
      <div class="release-note">
        <span>{copy.download.current}</span>
        <strong>{releaseTag}</strong>
        <p>{copy.download.note}</p>
        <a href={releaseUrl}>
          {copy.download.releaseNotes}
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
            <strong>{copy.download.platforms[platform.id][0]}</strong>
            <span>{copy.download.platforms[platform.id][1]}</span>
            {#if platform.id === detected}
              <small>{copy.download.detected}</small>
            {/if}
          </div>
          <code>{platform.archive}</code>
          <div class="download-row__actions">
            <button
              onclick={() => void copyCommand(platform)}
              type="button"
            >
              {copiedId === platform.id
                ? copy.download.copied
                : copy.download.copy}
            </button>
            <a href={assetUrl(platform.archive)}>
              {copy.download.action}
              <ArrowIcon direction="down" />
            </a>
          </div>
        </article>
      {/each}
    </div>
    <div class="download__meta">
      <a href={assetUrl("SHA256SUMS")}>
        {copy.download.verify}
        <ArrowIcon />
      </a>
      <a href={releaseUrl}>
        {copy.download.allAssets}
        <ArrowIcon />
      </a>
      <span>{copy.download.toolchain}</span>
    </div>
  </section>

  <section class="ecosystem section-shell" id="ecosystem">
    <div class="section-index">
      <span>{copy.ecosystem.index[0]}</span>
      <span>{copy.ecosystem.index[1]}</span>
    </div>
    <div class="ecosystem__heading">
      <h2>
        {copy.ecosystem.title[0]}
        <br />
        <em>{copy.ecosystem.title[1]}</em>
      </h2>
      <p>{copy.ecosystem.intro}</p>
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
      {copy.footer.tagline[0]}
      <br />
      {copy.footer.tagline[1]}
    </p>
    <div>
      <a href="https://github.com/nomo-lang">{copy.footer.links[0]}</a>
      <a href="https://github.com/nomo-lang/nomo/blob/main/CONTRIBUTING.md">
        {copy.footer.links[1]}
      </a>
      <a href="https://github.com/nomo-lang/.github/blob/main/SECURITY.md">
        {copy.footer.links[2]}
      </a>
      <a href="https://github.com/nomo-lang/nomo/blob/main/LICENSE">
        {copy.footer.links[3]}
      </a>
    </div>
    <span>{copy.footer.copyright}</span>
  </div>
</footer>
