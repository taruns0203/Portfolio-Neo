"use client";
import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, Terminal, X } from "lucide-react";
import { devtoolsTabs, type DevtoolsTab } from "@/data/devtools";
import type { DevtoolsVersions } from "@/types/devtools";
import { DevtoolsIcon, DevtoolsPanel } from "./devtools-panels";

export default function DevtoolsDrawer({
  versions,
  onClose,
}: {
  versions: DevtoolsVersions;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [tab, setTab] = useState<DevtoolsTab>("overview");
  const [expanded, setExpanded] = useState(false);
  const current = devtoolsTabs.find((item) => item.id === tab)!;
  useEffect(() => {
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  function navigate(next: DevtoolsTab) {
    setTab(next);
    content.current?.scrollTo({ top: 0, behavior: "instant" });
    heading.current?.focus({ preventScroll: true });
  }
  return (
    <dialog
      ref={dialog}
      className={`dt-drawer ${expanded ? "dt-expanded" : ""}`}
      aria-labelledby="dt-title"
      aria-describedby="dt-description"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          event.currentTarget.close();
      }}
    >
      <div className="dt-shell">
        <header className="dt-header">
          <span className="dt-terminal">
            <Terminal size={25} aria-hidden="true" />
          </span>
          <div>
            <h2 id="dt-title">Portfolio DevTools</h2>
            <p id="dt-description">
              Explore the engineering behind this website
            </p>
          </div>
          <div className="dt-header-actions">
            <button
              className="dt-expand"
              aria-label={expanded ? "Collapse DevTools" : "Expand DevTools"}
              aria-pressed={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
            </button>
            <button
              autoFocus
              aria-label="Close DevTools"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
        </header>
        <div className="dt-layout">
          <nav className="dt-nav" aria-label="DevTools sections">
            {devtoolsTabs.map((item) => (
              <button
                key={item.id}
                aria-current={item.id === tab ? "page" : undefined}
                onClick={() => navigate(item.id)}
              >
                <DevtoolsIcon name={item.icon} />
                {item.label}
              </button>
            ))}
            <span className="dt-nav-footer">
              ENGINEERING NOTES
              <br />
              Data from this project
            </span>
          </nav>
          <label className="dt-mobile-nav">
            Explore{" "}
            <select
              aria-label="DevTools section"
              value={tab}
              onChange={(event) => navigate(event.target.value as DevtoolsTab)}
            >
              {devtoolsTabs.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <div
            className="dt-content"
            ref={content}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a[href]")) onClose();
            }}
          >
            <div className="dt-page-heading">
              <span className="dt-kicker">PORTFOLIO / DEVTOOLS</span>
              <h2 ref={heading} tabIndex={-1} id="dt-section-title">
                {current.label}
              </h2>
            </div>
            <section
              aria-labelledby="dt-section-title"
              className="dt-panel"
              key={tab}
            >
              <DevtoolsPanel
                tab={tab}
                versions={versions}
                navigate={navigate}
                onClose={onClose}
              />
            </section>
            <footer className="dt-panel-footer">
              <span>Built to be explored.</span>
              <span>Tarun Sharma · Portfolio</span>
            </footer>
          </div>
        </div>
      </div>
    </dialog>
  );
}
