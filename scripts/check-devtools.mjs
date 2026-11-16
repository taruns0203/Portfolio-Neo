import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Compile isolated fixtures for real component rendering without adding a test runtime.
test("curated viewer handles empty examples and absent public repository", async () => {
  const directory = await mkdtemp(path.resolve("scripts/.devtools-test-"));
  try {
    const data = await readFile("src/data/devtools.ts", "utf8");
    const component = (
      await readFile("src/components/devtools/code-explorer.tsx", "utf8")
    ).replace('"@/data/devtools"', '"./data.cjs"');
    const options = {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2020,
    };
    await writeFile(
      path.join(directory, "data.cjs"),
      ts.transpileModule(data, { compilerOptions: options }).outputText,
    );
    await writeFile(
      path.join(directory, "viewer.cjs"),
      ts.transpileModule(component, {
        compilerOptions: options,
        fileName: "viewer.tsx",
      }).outputText,
    );
    const require = createRequire(import.meta.url);
    const Viewer = require(path.join(directory, "viewer.cjs")).default;
    const empty = renderToStaticMarkup(
      React.createElement(Viewer, { examples: [], repositoryUrl: null }),
    );
    assert.match(empty, /No code excerpts yet/);
    assert.doesNotMatch(empty, /<pre/);
    const populated = renderToStaticMarkup(
      React.createElement(Viewer, { repositoryUrl: null }),
    );
    assert.match(populated, /Public repository link not available/);
    assert.match(populated, /generateStaticParams/);
    assert.doesNotMatch(populated, /href="https:\/\/github.com/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
