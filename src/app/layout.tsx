import { DevtoolsLauncher } from "@/components/devtools/devtools-launcher";
import { devtoolsVersions } from "@/lib/devtools-model";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-50 -translate-y-24 rounded-md bg-foreground px-6 py-3 text-surface focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <DevtoolsLauncher versions={devtoolsVersions} />
      </body>
    </html>
  );
}
