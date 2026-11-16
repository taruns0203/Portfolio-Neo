// Dependency-free fixture checks; no network or credentials required.
import fs from "node:fs";
import ts from "typescript";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const source = fs
  .readFileSync("src/lib/github.ts", "utf8")
  .replace('import "server-only";', "");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const mod = { exports: {} };
new Function("exports", "require", "module", compiled)(
  mod.exports,
  require,
  mod,
);
const { fetchGithubData, validateGithubUsername, languageDistribution } =
  mod.exports;
const repo = (name, stars = 1) => ({
  name,
  stargazers_count: stars,
  fork: false,
  private: false,
  owner: { login: "tester" },
});
const response = (body, status = 200) =>
  new Response(JSON.stringify(body), { status });
const calendar = {
  totalContributions: 2,
  weeks: [{ contributionDays: [{ date: "2026-11-01", contributionCount: 2 }] }],
};
function mock({
  repos = [],
  status = 200,
  failPage2 = false,
  languageFailure = false,
} = {}) {
  return async (url, options) => {
    if (status !== 200) return response({}, status);
    if (url.endsWith("/graphql"))
      return response({
        data: {
          user: { contributionsCollection: { contributionCalendar: calendar } },
        },
      });
    if (url.includes("/languages"))
      return response(
        { TypeScript: 80, HTML: 20 },
        languageFailure ? 403 : 200,
      );
    if (url.includes("/repos?")) {
      const page = Number(new URL(url).searchParams.get("page"));
      return failPage2 && page === 2
        ? response({}, 429)
        : response(repos.slice((page - 1) * 100, page * 100));
    }
    assert.equal(options.next.revalidate, 3600);
    return response({ public_repos: repos.length, followers: 5 });
  };
}
(async () => {
  assert.equal(validateGithubUsername("../bad"), null);
  assert.equal(validateGithubUsername("a--b"), null);
  let calls = 0;
  const unconfigured = await fetchGithubData({
    username: null,
    fetcher: async () => {
      calls++;
    },
  });
  assert.equal(calls, 0);
  assert.equal(unconfigured.state, "unavailable");
  const repos = Array.from({ length: 101 }, (_, i) =>
    repo(`repo-${i}`, i === 100 ? 20 : 1),
  );
  let data = await fetchGithubData({
    username: "tester",
    fetcher: mock({ repos }),
  });
  assert.equal(data.stars, 120);
  assert.equal(data.state, "partial");
  assert.equal(data.calendar, null);
  assert.equal(data.languages[0].percent, 80);
  data = await fetchGithubData({
    username: "tester",
    token: "fixture-not-a-secret",
    fetcher: mock({ repos: [repo("one")] }),
  });
  assert.equal(data.state, "ready");
  assert.equal(data.calendar.totalContributions, 2);
  for (const status of [403, 429, 500]) {
    data = await fetchGithubData({
      username: "tester",
      fetcher: mock({ status }),
    });
    assert.equal(data.state, "unavailable");
    assert.equal(data.stars, null);
  }
  data = await fetchGithubData({ username: "tester", fetcher: mock() });
  assert.equal(data.stars, 0);
  assert.deepEqual(data.languages, []);
  data = await fetchGithubData({
    username: "tester",
    fetcher: mock({ repos, failPage2: true }),
  });
  assert.equal(data.stars, null);
  assert.equal(data.languages, null);
  assert.equal(data.followers, 5);
  data = await fetchGithubData({
    username: "tester",
    fetcher: mock({ repos: [repo("one")], languageFailure: true }),
  });
  assert.equal(data.stars, 1);
  assert.equal(data.languages, null);
  data = await fetchGithubData({
    username: "tester",
    fetcher: mock({
      repos: [
        repo("own"),
        { ...repo("fork", 50), fork: true },
        { ...repo("private", 50), private: true },
      ],
    }),
  });
  assert.equal(data.stars, 1);
  data = await fetchGithubData({
    username: "tester",
    fetcher: async () => {
      throw Error("offline");
    },
  });
  assert.equal(data.state, "unavailable");
  const languages = languageDistribution({
    A: 10,
    B: 9,
    C: 8,
    D: 7,
    E: 6,
    F: 5,
    G: 4,
  });
  assert.equal(languages.length, 6);
  assert.equal(languages[5].name, "Other");
  assert.ok(
    Math.abs(languages.reduce((s, l) => s + l.percent, 0) - 100) < 0.0001,
  );
  console.log(
    "GitHub fixtures passed: pagination, fork/private exclusion, missing config/token, ready, partial, errors, rate limits, empty data, language aggregation.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
