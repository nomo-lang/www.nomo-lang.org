<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale, localizeHref } from "$lib/paraglide/runtime";

  let { children } = $props();
  let locale = $derived(getLocale());
</script>

<a class="skip-link" href="#docs-content">{m.skip()}</a>

<div class="docs-shell">
  <header class="docs-header">
    <a class="wordmark" href={localizeHref("/")} aria-label={m.home()}>
      <span class="wordmark__mark" aria-hidden="true">N</span>
      <span>Nomo</span>
    </a>
    <nav aria-label={m.primary_navigation()}>
      <a href={localizeHref("/")}>{m.docs_back()}</a>
      <a
        class="locale-link"
        data-sveltekit-reload
        href={localizeHref("/docs/", {
          locale: locale === "en" ? "zh" : "en",
        })}
      >
        {m.switch_language()}
      </a>
    </nav>
  </header>

  <main id="docs-content" class="docs-content">
    {@render children()}
  </main>
</div>
