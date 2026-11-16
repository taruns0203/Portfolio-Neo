export interface GithubDay {
  date: string;
  contributionCount: number;
}
export interface GithubCalendar {
  totalContributions: number;
  weeks: { contributionDays: GithubDay[] }[];
}
export interface GithubLanguage {
  name: string;
  bytes: number;
  percent: number;
}
export interface GithubData {
  state: "loading" | "ready" | "partial" | "unavailable";
  username: string | null;
  repositories: number | null;
  followers: number | null;
  stars: number | null;
  languages: GithubLanguage[] | null;
  calendar: GithubCalendar | null;
  calendarNote: string;
}
