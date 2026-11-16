"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  architectureNodes,
  codeQuestUrl,
  decisions,
  deploymentProvider,
  performanceWork,
  publicRepositoryUrl,
  type DevtoolsTab,
} from "@/data/devtools";
import type { DevtoolsVersions } from "@/types/devtools";

const CodeExplorer = dynamic(() => import("./code-explorer"), {
  loading: () => <p role="status">Loading curated code…</p>,
});
export function DevtoolsIcon({ name }: { name: string }) {
  return (
    <Image
      src={`/assets/devtools/icon-${name}.svg`}
      width={22}
      height={22}
      alt=""
      aria-hidden="true"
    />
  );
}
export function Architecture({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(architectureNodes[1].id);
  const current = architectureNodes.find((node) => node.id === selected)!;
  return (
    <>
      <div className="dt-flow" aria-label="Website architecture">
        {architectureNodes.map((node, index) => (
          <div key={node.id} className="dt-flow-step">
            {index > 0 && (
              <span className="dt-flow-arrow">
                {["", "requests →", "reads / fetches →", "hosted by →"][index]}
              </span>
            )}
            <button
              className={`dt-node dt-tone-${index}`}
              aria-pressed={selected === node.id}
              aria-controls={
                compact ? "dt-overview-node" : "dt-architecture-node"
              }
              onClick={() => setSelected(node.id)}
            >
              <DevtoolsIcon name={node.icon} />
              <strong>{node.title}</strong>
            </button>
          </div>
        ))}
      </div>
      <div
        id={compact ? "dt-overview-node" : "dt-architecture-node"}
        className="dt-node-detail"
        aria-live="polite"
      >
        <h3>{current.title}</h3>
        <p>{current.summary}</p>
        {!compact && (
          <dl className="dt-detail-list">
            <dt>Boundary</dt>
            <dd>{current.boundary}</dd>
            <dt>Rendering & caching</dt>
            <dd>{current.strategy}</dd>
            <dt>Alternatives & tradeoffs</dt>
            <dd>{current.tradeoff}</dd>
            <dt>Implementation</dt>
            <dd>
              <code>{current.source}</code>
            </dd>
          </dl>
        )}
      </div>
    </>
  );
}
function Overview({
  versions,
  navigate,
}: {
  versions: DevtoolsVersions;
  navigate: (tab: DevtoolsTab) => void;
}) {
  return (
    <>
      <div className="dt-intro">
        <span className="dt-kicker">BUILT WITH INTENTION</span>
        <h3>A look under the hood.</h3>
        <p>
          The structure, choices and small details behind this portfolio. Real
          implementation, openly explained.
        </p>
      </div>
      <div className="dt-stats">
        <div>
          <Image
            src="/assets/devtools/tech-nextjs.svg"
            width={28}
            height={28}
            alt=""
          />
          <strong>Next.js {versions.next}</strong>
          <span>App Router</span>
        </div>
        <div>
          <Image
            src="/assets/devtools/tech-typescript.svg"
            width={28}
            height={28}
            alt=""
          />
          <strong>TypeScript {versions.typescript}</strong>
          <span>Strict mode</span>
        </div>
        <div>
          <DevtoolsIcon name="performance" />
          <strong>Not measured</strong>
          <span>Site performance</span>
        </div>
        <div>
          <DevtoolsIcon name="deployment" />
          <strong>{deploymentProvider ?? "Not verified"}</strong>
          <span>Deployment</span>
        </div>
      </div>
      <section className="dt-card">
        <div className="dt-section-heading">
          <h3>
            <DevtoolsIcon name="architecture" />
            System architecture
          </h3>
          <button onClick={() => navigate("architecture")}>Explore →</button>
        </div>
        <Architecture compact />
      </section>
      <div className="dt-bento">
        <section className="dt-card dt-mint">
          <DevtoolsIcon name="performance" />
          <h3>Speed, with evidence.</h3>
          <p>
            No Lighthouse or field metrics have been connected for this site.
          </p>
          <button onClick={() => navigate("performance")}>
            See the approach →
          </button>
        </section>
        <section className="dt-card">
          <DevtoolsIcon name="tech-stack" />
          <h3>A focused stack.</h3>
          <p>
            React {versions.react}, Tailwind CSS {versions.tailwind}, MDX and a
            shared component system.
          </p>
          <button onClick={() => navigate("stack")}>Explore the stack →</button>
        </section>
      </div>
      <section className="dt-code-teaser">
        <div>
          <span className="dt-kicker">CURATED, READ-ONLY</span>
          <h3>Good code has a story.</h3>
          <p>Explore short excerpts from this portfolio.</p>
          <button onClick={() => navigate("code")}>Open Code Explorer →</button>
        </div>
        <span aria-hidden="true" className="dt-code-glyph">
          {"</>"}
        </span>
      </section>
    </>
  );
}
function Performance() {
  return (
    <>
      <div className="dt-card dt-yellow">
        <span className="dt-kicker">THIS PORTFOLIO</span>
        <h3>Metrics not yet connected</h3>
        <p>
          No dated Lighthouse report or field dataset is available.
          Implementation choices below are not measured outcomes.
        </p>
      </div>
      <dl className="dt-metrics">
        {["LCP", "INP", "CLS", "TTFB"].map((metric) => (
          <div key={metric}>
            <dt>{metric}</dt>
            <dd>Not measured</dd>
          </div>
        ))}
      </dl>
      <div className="dt-work-list">
        {performanceWork.map(([title, body]) => (
          <section key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </section>
        ))}
      </div>
      <section className="dt-card">
        <h3>How to establish a baseline</h3>
        <ol>
          <li>
            Measure the deployed URL on a recorded device and network profile.
          </li>
          <li>
            Save the date, tool version and report; repeat under the same
            conditions.
          </li>
          <li>
            Compare lab observations with field data before claiming a user
            impact.
          </li>
        </ol>
      </section>
      <p className="dt-note">
        Career case studies are separate: the Projects section describes work on
        Junk.com. Those results do not measure this portfolio.{" "}
        <Link href="/#work">View project context →</Link>
      </p>
    </>
  );
}
function Stack({ versions }: { versions: DevtoolsVersions }) {
  const groups = [
    [
      "Frontend",
      `Next.js ${versions.next} · React ${versions.react} · TypeScript ${versions.typescript}`,
      "Used in this portfolio’s routes, typed content and interactive components.",
    ],
    [
      "Styling & UI",
      `Tailwind CSS ${versions.tailwind} · Lucide · class-variance-authority`,
      "Theme tokens and shared controls; selective hard shadows rather than a separate UI framework.",
    ],
    [
      "Backend & rendering",
      "Next.js server components · Node.js",
      "Server-side article compilation and GitHub requests. No separate backend service is configured.",
    ],
    [
      "Content & data",
      "Local TypeScript · MDX · remark-gfm · GitHub API",
      "Article metadata and project records live locally. GitHub statistics are fetched server-side. No portfolio database is configured.",
    ],
    [
      "Cloud & deployment",
      "Not verified",
      "AWS appears in career project content; that does not establish this portfolio’s hosting provider.",
    ],
    [
      "Tooling",
      "pnpm · ESLint · Prettier · TypeScript",
      "Build, lint, formatting and strict type checks are defined in the project. Playwright is used by the verification scripts.",
    ],
  ];
  return (
    <>
      <p>Installed versions, not versions from the mockup.</p>
      <div className="dt-work-list">
        {groups.map(([title, stack, usage]) => (
          <section key={title}>
            <span className="dt-kicker">{title}</span>
            <h3>{stack}</h3>
            <p>
              <strong>Where I used it:</strong> {usage}
            </p>
          </section>
        ))}
      </div>
      <p className="dt-note">
        The broader career stack is documented separately in{" "}
        <Link href="/#tech-stack">Skills</Link> and{" "}
        <Link href="/#work">Projects</Link>.
      </p>
    </>
  );
}
function Experiments() {
  const [shadow, setShadow] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [tone, setTone] = useState("lavender");
  const [compact, setCompact] = useState(false);
  return (
    <>
      <p>
        A small design playground. These controls affect only the preview below.
        Your system’s reduced-motion preference always takes priority.
      </p>
      <div className="dt-experiment-controls">
        <label>
          <input
            type="checkbox"
            checked={shadow}
            onChange={(e) => setShadow(e.target.checked)}
          />{" "}
          Brutalist shadow
        </label>
        <label>
          <input
            type="checkbox"
            checked={reduce}
            onChange={(e) => setReduce(e.target.checked)}
          />{" "}
          Reduce preview motion
        </label>
        <label>
          <input
            type="checkbox"
            checked={compact}
            onChange={(e) => setCompact(e.target.checked)}
          />{" "}
          Compact composition
        </label>
        <label>
          Highlight{" "}
          <select
            aria-label="Highlight"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="lavender">Lavender</option>
            <option value="yellow">Yellow</option>
            <option value="mint">Mint</option>
            <option value="pink">Pink</option>
          </select>
        </label>
      </div>
      <div
        className={`dt-experiment-preview dt-preview-${tone} ${shadow ? "dt-shadow" : ""} ${reduce ? "dt-no-motion" : ""} ${compact ? "dt-compact" : ""}`}
      >
        <span className="dt-kicker">INTERACTIVE DEMO</span>
        <DevtoolsIcon name="experiments" />
        <h3>Playful. Purposeful.</h3>
        <p>A little personality, with plenty of room to breathe.</p>
        <button onClick={() => setShadow((value) => !value)}>
          Try the shadow
        </button>
      </div>
    </>
  );
}
function About({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="dt-about-art">
        <Image
          src="/assets/devtools/developer-devtools-illustration.png"
          alt="Illustrated developer exploring code at a laptop"
          width={1536}
          height={1024}
          sizes="(max-width: 600px) 90vw, 480px"
        />
      </div>
      <h3>Engineering with personality.</h3>
      <p>
        This portfolio brings together Tarun Sharma’s projects, career
        experience and technical writing. DevTools makes the engineering
        decisions behind the interface easier to explore.
      </p>
      <p>
        Warm surfaces, expressive typography and selective bento layouts balance
        playful neo-brutalism with readable, minimal content.
      </p>
      <div className="dt-work-list">
        <section>
          <h3>Accessible by intention</h3>
          <p>
            Semantic content, visible focus, keyboard controls, native modal
            behavior and reduced-motion support. Automated checks support, but
            do not replace, assistive-technology testing.
          </p>
        </section>
        <section>
          <h3>Performance without pretend numbers</h3>
          <p>
            Server rendering and focused client boundaries form the approach.
            Measured performance remains unreported until a dated baseline
            exists.
          </p>
        </section>
      </div>
      <div className="dt-quick-links">
        <Link href="/#work" onClick={onClose}>
          Projects ↗
        </Link>
        <Link href="/#contact" onClick={onClose}>
          Contact ↗
        </Link>
        {codeQuestUrl ? (
          <a href={codeQuestUrl}>CodeQuest ↗</a>
        ) : (
          <span>CodeQuest · Not available yet</span>
        )}
      </div>
      {publicRepositoryUrl ? (
        <a href={publicRepositoryUrl}>Read the source ↗</a>
      ) : (
        <p className="dt-note">
          A public source repository has not been linked for this site.
        </p>
      )}
    </>
  );
}
export function DevtoolsPanel({
  tab,
  versions,
  navigate,
  onClose,
}: {
  tab: DevtoolsTab;
  versions: DevtoolsVersions;
  navigate: (tab: DevtoolsTab) => void;
  onClose: () => void;
}) {
  switch (tab) {
    case "overview":
      return <Overview versions={versions} navigate={navigate} />;
    case "architecture":
      return (
        <>
          <p>Select a node to inspect its responsibility and tradeoffs.</p>
          <Architecture />
        </>
      );
    case "performance":
      return <Performance />;
    case "stack":
      return <Stack versions={versions} />;
    case "code":
      return <CodeExplorer />;
    case "decisions":
      return (
        <>
          <p>
            Implementation notes grounded in the current code, rather than a
            reconstructed decision history.
          </p>
          {decisions.map((decision) => (
            <details className="dt-decision" key={decision.title}>
              <summary>{decision.title}</summary>
              <dl className="dt-detail-list">
                {(
                  [
                    "context",
                    "decision",
                    "alternatives",
                    "tradeoffs",
                    "source",
                  ] as const
                ).map((key) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{decision[key]}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </>
      );
    case "experiments":
      return <Experiments />;
    case "about":
      return <About onClose={onClose} />;
  }
}
