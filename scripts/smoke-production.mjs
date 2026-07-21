const base = new URL(process.env.SITE_URL ?? "https://www.nomo-lang.org/");

const pages = [
  ["/", 'lang="en"'],
  ["/zh/", 'lang="zh"'],
  ["/docs/", "Nomo Docs"],
  ["/zh/docs/", "Nomo 文档"],
];

for (const [pathname, marker] of pages) {
  const url = new URL(pathname, base);
  const response = await fetch(url);
  const body = await response.text();
  if (!response.ok || !body.includes(marker)) {
    throw new Error(`${url} failed: ${response.status}, marker ${marker}`);
  }
}

const home = await (await fetch(base)).text();
for (const href of [
  "https://playground.nomo-lang.org/",
  "https://github.com/nomo-lang/rfcs",
  'rel="canonical" href="https://www.nomo-lang.org/"',
]) {
  if (!home.includes(href)) throw new Error(`homepage is missing ${href}`);
}

const icon = await fetch(new URL("/favicon.svg", base));
if (!icon.ok || !icon.headers.get("content-type")?.includes("image/svg+xml")) {
  throw new Error(`favicon failed: ${icon.status}`);
}

const missing = await fetch(new URL("/__nomo_release_smoke_missing__", base));
const missingBody = await missing.text();
if (missing.status !== 404 || !missingBody.includes("Page not found")) {
  throw new Error(`localized 404 failed: ${missing.status}`);
}

console.log(`Website production smoke passed for ${base.origin}`);
