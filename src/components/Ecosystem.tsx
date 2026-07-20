import { ArrowIcon } from "./ArrowIcon";

const links = [
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

export function Ecosystem() {
  return (
    <section className="ecosystem section-shell" id="ecosystem">
      <div className="section-index">
        <span>04 / ECOSYSTEM</span>
        <span>BUILT IN THE OPEN</span>
      </div>
      <div className="ecosystem__heading">
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
      <div className="ecosystem__links">
        {links.map((link, index) => (
          <a href={link.href} key={link.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <small>{link.label}</small>
            <strong>{link.title}</strong>
            <p>{link.description}</p>
            <ArrowIcon />
          </a>
        ))}
      </div>
    </section>
  );
}

