"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Terminal } from "lucide-react";
import type { DevtoolsVersions } from "@/types/devtools";

const Drawer = dynamic(() => import("./devtools-drawer"), {
  loading: () => (
    <span className="dt-loading" role="status">
      Loading DevTools…
    </span>
  ),
  ssr: false,
});
export function DevtoolsLauncher({ versions }: { versions: DevtoolsVersions }) {
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={launcher}
        className="dt-launcher"
        aria-label="Open Portfolio DevTools"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Terminal size={20} aria-hidden="true" /> DevTools
      </button>
      {open && (
        <Drawer
          versions={versions}
          onClose={() => {
            setOpen(false);
            launcher.current?.focus();
          }}
        />
      )}
    </>
  );
}
