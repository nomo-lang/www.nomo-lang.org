# Nomo website

The official public site for the Nomo programming language.

The site introduces Nomo's design principles, shows its source-to-C99 build
path, and links directly to the published preview binaries. It is a static
React and TypeScript application built with Vite.

## Local development

Requires Node.js 24 and npm.

```sh
npm install
npm run dev
```

Before opening a pull request, run the same checks used by CI:

```sh
npm run lint
npm test
npm run build
```

## Deployment

Merges to `main` deploy through GitHub Actions to the project Pages URL:

<https://nomo-lang.github.io/www.nomo-lang.org/>

The custom `www.nomo-lang.org` domain will be configured after its DNS records
exist. Until then, the Pages workflow deliberately uses the repository base
path and does not publish a `CNAME` file.

## Content sources

Release versions and asset names live in `src/data/release.ts`. Update them
from the corresponding signed release in
[`nomo-lang/nomo`](https://github.com/nomo-lang/nomo/releases).

Organization-wide contribution, security, and support guidance is inherited
from [`nomo-lang/.github`](https://github.com/nomo-lang/.github).

