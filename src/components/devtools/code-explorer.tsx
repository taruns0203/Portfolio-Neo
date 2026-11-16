"use client";
import { useState } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { codeExamples, publicRepositoryUrl } from "@/data/devtools";
import type { CodeExample } from "@/types/devtools";
hljs.registerLanguage("typescript", typescript);

export default function CodeExplorer({
  examples = codeExamples,
  repositoryUrl = publicRepositoryUrl,
}: {
  examples?: CodeExample[];
  repositoryUrl?: string | null;
}) {
  const [selected, setSelected] = useState(examples[0]?.id);
  const [status, setStatus] = useState("");
  const current =
    examples.find((example) => example.id === selected) ?? examples[0];
  if (!current)
    return (
      <div className="dt-card">
        <h3>No code excerpts yet</h3>
        <p>Curated examples will appear here when available.</p>
      </div>
    );
  const highlighted = hljs
    .highlight(current.code, { language: "typescript" })
    .value.split("\n");
  return (
    <>
      <p>Small, curated excerpts. Read-only by design.</p>
      <div
        className="dt-file-list"
        role="group"
        aria-label="Curated code files"
      >
        {examples.map((example) => (
          <button
            key={example.id}
            aria-pressed={current.id === example.id}
            onClick={() => {
              setSelected(example.id);
              setStatus("");
            }}
          >
            {example.path}
          </button>
        ))}
      </div>
      <div className="dt-code">
        <div className="dt-code-heading">
          <span>{current.path}</span>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(current.code);
                setStatus("Code copied");
              } catch {
                setStatus(
                  "Copy unavailable. Select the code and copy manually.",
                );
              }
            }}
          >
            Copy code
          </button>
        </div>
        <pre tabIndex={0} aria-label={current.path}>
          <code>
            {highlighted.map((line, index) => (
              <span className="dt-code-line" key={index}>
                <span aria-hidden="true" className="dt-line-number">
                  {index + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: line || " " }} />
              </span>
            ))}
          </code>
        </pre>
      </div>
      <p className="dt-caption">
        <strong>{current.label}</strong> · {current.description}
      </p>
      <p role="status" className="dt-copy-status">
        {status}
      </p>
      {repositoryUrl ? (
        <a href={repositoryUrl} target="_blank" rel="noreferrer">
          Open repository ↗
        </a>
      ) : (
        <p className="dt-note">
          Public repository link not available. These excerpts are supplied with
          the portfolio.
        </p>
      )}
    </>
  );
}
