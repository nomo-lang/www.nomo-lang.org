export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__wordmark" aria-hidden="true">
        NOMO
      </div>
      <div className="site-footer__meta">
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
          <a href="https://github.com/nomo-lang/nomo/blob/main/LICENSE">
            License
          </a>
        </div>
        <span>© 2026 Nomo contributors</span>
      </div>
    </footer>
  );
}

