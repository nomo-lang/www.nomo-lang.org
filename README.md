# Nomo website

The official public site for the Nomo programming language.

The site introduces Nomo's design principles, shows its source-to-C99 build
path, and links directly to the published preview binaries. It is a statically
prerendered SvelteKit and TypeScript application deployed on Cloudflare.

## Local development

Requires Node.js 24 and pnpm 11.

```sh
pnpm install
pnpm run dev
```

Before opening a pull request, run the same checks used by CI:

```sh
pnpm run lint
pnpm test
pnpm run build
pnpm run check:cloudflare
```

## Deployment

The production target is Cloudflare Workers Static Assets. The checked-in
`wrangler.jsonc` deploys the SvelteKit worker and its prerendered assets as one
unit. Cloudflare custom domains are declared in the same file; the canonical
public origin is `https://www.nomo-lang.org` and the apex origin advertises that
canonical URL.

To test the production runtime locally:

```sh
pnpm run preview
```

After authenticating Wrangler with the target Cloudflare account, deploy with:

```sh
pnpm run deploy
```

After the production deployment completes, run the HTTP acceptance smoke:

```sh
pnpm run smoke:production
```

For Cloudflare Git integration, use `pnpm run build` as the build command and
`pnpm exec wrangler deploy` as the deploy command. The generated output lives in
`.svelte-kit/cloudflare` and is served from the domain root.

## Internationalization

English is served at `/` and Simplified Chinese at `/zh/`. Both variants are
prerendered and set the correct document language. Internationalization uses
the official Svelte Paraglide add-on: source messages live in
`messages/en.json` and `messages/zh.json`, locale configuration lives in
`project.inlang/settings.json`, and the generated type-safe runtime under
`src/lib/paraglide` is not committed.

## Documentation

The localized documentation entry points are `/docs/` and `/zh/docs/`.
Documentation pages use mdsvex, so Markdown code fences and Svelte components
can live in the same `.svx` source. User-facing prose remains in the Paraglide
message catalogs to keep both locales in sync.

## Content sources

Release versions and asset names live in `src/lib/data/release.ts`. Update them
from the corresponding signed release in
[`nomo-lang/nomo`](https://github.com/nomo-lang/nomo/releases).

Organization-wide contribution, security, and support guidance is inherited
from [`nomo-lang/.github`](https://github.com/nomo-lang/.github).
