export interface DevtoolsVersions {
  next: string;
  react: string;
  typescript: string;
  tailwind: string;
}
export interface CodeExample {
  id: string;
  path: string;
  label: "Portfolio code" | "Illustrative snippet";
  description: string;
  code: string;
}
export interface ArchitectureNode {
  id: string;
  title: string;
  icon: string;
  summary: string;
  source: string;
  boundary: string;
  strategy: string;
  tradeoff: string;
}
