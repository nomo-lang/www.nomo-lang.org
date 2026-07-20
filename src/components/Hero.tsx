import { ArrowIcon } from "./ArrowIcon";
import { CodeFrame } from "./CodeFrame";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__signal">
        <span>01 / LANGUAGE</span>
        <span>EARLY PREVIEW</span>
      </div>
      <div className="hero__content">
        <div className="hero__copy">
          <p className="eyebrow">A language for the code you need to trust</p>
          <h1>
            Small language.
            <br />
            <em>Native programs.</em>
          </h1>
          <p className="hero__lede">
            Nomo is a small, explicit programming language for systems tools,
            CLIs, and small services. It compiles to readable C99, then to a
            native executable you can inspect.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#download">
              Download the preview
              <ArrowIcon />
            </a>
            <a
              className="text-link"
              href="https://nomo-lang.github.io/nomo-playground/"
            >
              Open playground
              <ArrowIcon />
            </a>
          </div>
        </div>
        <CodeFrame />
      </div>
      <div className="hero__facts" aria-label="Nomo at a glance">
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
  );
}

