import { ArrowIcon } from "./ArrowIcon";

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

export function Principles() {
  return (
    <section className="principles section-shell" id="principles">
      <div className="section-index">
        <span>02 / PRINCIPLES</span>
        <span>DESIGNED TO STAY LEGIBLE</span>
      </div>
      <div className="principles__heading">
        <p className="eyebrow">Language design</p>
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
      <div className="principle-list">
        {principles.map((principle) => (
          <article className="principle-row" key={principle.number}>
            <span className="principle-row__number">{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
            <span className="principle-row__mark" aria-hidden="true">
              +
            </span>
          </article>
        ))}
      </div>
      <div className="build-story">
        <div className="build-story__flow">
          <p className="eyebrow">Compilation path</p>
          <div className="flow-diagram" aria-label="Nomo compilation stages">
            <div>
              <span>01</span>
              <strong>.nomo</strong>
              <small>source</small>
            </div>
            <i aria-hidden="true" />
            <div>
              <span>02</span>
              <strong>.c</strong>
              <small>readable C99</small>
            </div>
            <i aria-hidden="true" />
            <div>
              <span>03</span>
              <strong>bin</strong>
              <small>native</small>
            </div>
          </div>
          <a
            className="text-link"
            href="https://github.com/nomo-lang/nomo/tree/main/docs/rfcs"
          >
            Read the RFCs
            <ArrowIcon />
          </a>
        </div>
        <div className="toolchain">
          <div className="toolchain__title">
            <span>TOOLCHAIN</span>
            <span>ONE COMMAND AWAY</span>
          </div>
          {toolchain.map(([command, description]) => (
            <div className="toolchain__row" key={command}>
              <code>{command}</code>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

