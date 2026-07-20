import { ArrowIcon } from "./ArrowIcon";

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

export function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Nomo home">
        <span className="wordmark__mark" aria-hidden="true">
          N
        </span>
        <span>Nomo</span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-action" href="#download">
        Get Nomo
        <ArrowIcon direction="down" />
      </a>
    </header>
  );
}

