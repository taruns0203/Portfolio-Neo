import "server-only";
import nextPackage from "next/package.json";
import reactPackage from "react/package.json";
import typescriptPackage from "typescript/package.json";
import tailwindPackage from "tailwindcss/package.json";
import type { DevtoolsVersions } from "@/types/devtools";

// Only these public version strings cross the server/client boundary.
export const devtoolsVersions: DevtoolsVersions = {
  next: nextPackage.version,
  react: reactPackage.version,
  typescript: typescriptPackage.version,
  tailwind: tailwindPackage.version,
};
