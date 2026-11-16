import "server-only";
import type {
  GithubCalendar,
  GithubData,
  GithubLanguage,
} from "@/types/github";

export function validateGithubUsername(
  value: string | undefined,
): string | null {
  return value &&
    /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(value) &&
    !value.includes("--")
    ? value
    : null;
}

export function languageDistribution(
  totals: Record<string, number>,
): GithubLanguage[] {
  const entries = Object.entries(totals)
    .filter(([, bytes]) => Number.isFinite(bytes) && bytes > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  const grouped = entries.slice(0, 5);
  if (entries.length > 5)
    grouped.push([
      "Other",
      entries.slice(5).reduce((sum, [, bytes]) => sum + bytes, 0),
    ]);
  return grouped.map(([name, bytes]) => ({
    name,
    bytes,
    percent: (bytes / total) * 100,
  }));
}

type Repo = {
  name: string;
  fork: boolean;
  private: boolean;
  stargazers_count: number;
  owner: { login: string };
};
const count = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

export async function fetchGithubData({
  username,
  token,
  fetcher = fetch,
}: {
  username: string | null;
  token?: string;
  fetcher?: typeof fetch;
}): Promise<GithubData> {
  const data: GithubData = {
    state: "unavailable",
    username: validateGithubUsername(username ?? undefined),
    repositories: null,
    followers: null,
    stars: null,
    languages: null,
    calendar: null,
    calendarNote:
      "Contribution history is unavailable. Explore the full activity on GitHub.",
  };
  if (!data.username) return data;
  const login = data.username;
  const signal = AbortSignal.timeout(25000);
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  async function request(path: string, body?: object) {
    const response = await fetcher(`https://api.github.com${path}`, {
      method: body ? "POST" : "GET",
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal,
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("GitHub data unavailable");
    return response.json();
  }
  const profileTask = async () => {
    try {
      const profile = await request(`/users/${login}`);
      if (count(profile.public_repos) && count(profile.followers)) {
        data.repositories = profile.public_repos;
        data.followers = profile.followers;
      }
    } catch {
      /* Preserve independent panels. */
    }
  };
  const repoTask = async () => {
    try {
      const repos = new Map<string, Repo>();
      let complete = false;
      for (let page = 1; page <= 50; page++) {
        const batch: Repo[] = await request(
          `/users/${login}/repos?type=owner&per_page=100&sort=full_name&page=${page}`,
        );
        if (!Array.isArray(batch)) throw new Error("Invalid repositories");
        for (const repo of batch) {
          if (
            !repo.owner ||
            typeof repo.name !== "string" ||
            !count(repo.stargazers_count) ||
            typeof repo.fork !== "boolean" ||
            typeof repo.private !== "boolean"
          )
            throw new Error("Invalid repository");
          if (
            !repo.fork &&
            !repo.private &&
            repo.owner.login.toLowerCase() === login.toLowerCase()
          )
            repos.set(repo.name, repo);
        }
        if (batch.length < 100) {
          complete = true;
          break;
        }
      }
      if (!complete) throw new Error("Repository list incomplete");
      data.stars = [...repos.values()].reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0,
      );
      const totals: Record<string, number> = Object.create(null);
      const list = [...repos.values()];
      // Bounded concurrency; never publish a partial language total.
      for (let index = 0; index < list.length; index += 4) {
        const results = await Promise.all(
          list
            .slice(index, index + 4)
            .map((repo) =>
              request(
                `/repos/${login}/${encodeURIComponent(repo.name)}/languages`,
              ),
            ),
        );
        for (const result of results) {
          if (!result || Array.isArray(result) || typeof result !== "object")
            throw new Error("Invalid languages");
          for (const [name, bytes] of Object.entries(result)) {
            if (!count(bytes)) throw new Error("Invalid language bytes");
            totals[name] = (totals[name] ?? 0) + bytes;
          }
        }
      }
      data.languages = languageDistribution(totals);
    } catch {
      /* Stars remain available if only language requests failed. */
    }
  };
  const calendarTask = async () => {
    if (!token) return;
    try {
      // Stable daily bounds avoid a new cache entry on every render.
      const to = new Date();
      to.setUTCHours(0, 0, 0, 0);
      const from = new Date(to);
      from.setUTCFullYear(from.getUTCFullYear() - 1);
      const result = await request("/graphql", {
        query:
          "query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}",
        variables: { login, from: from.toISOString(), to: to.toISOString() },
      });
      const calendar: GithubCalendar =
        result.data?.user?.contributionsCollection?.contributionCalendar;
      if (
        result.errors ||
        !calendar ||
        !count(calendar.totalContributions) ||
        !Array.isArray(calendar.weeks) ||
        calendar.weeks.length === 0 ||
        !calendar.weeks.every(
          (week) =>
            Array.isArray(week.contributionDays) &&
            week.contributionDays.every(
              (day) =>
                /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
                Number.isFinite(Date.parse(day.date)) &&
                count(day.contributionCount),
            ),
        )
      )
        throw new Error("Invalid calendar");
      data.calendar = calendar;
      data.calendarNote =
        "Rolling 12 months through the start of today (UTC), as reported by GitHub.";
    } catch {
      /* Missing permission or rate limits must not break the homepage. */
    }
  };
  await Promise.all([profileTask(), repoTask(), calendarTask()]);
  const available = [
    data.repositories,
    data.followers,
    data.stars,
    data.languages,
    data.calendar,
  ].filter((value) => value !== null).length;
  data.state =
    available === 5 ? "ready" : available ? "partial" : "unavailable";
  return data;
}
