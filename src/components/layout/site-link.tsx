"use client";

import { usePathname } from "next/navigation";
import type { ComponentPropsWithRef, MouseEvent } from "react";
import type { SiteDestination } from "@/config/site";

export interface SiteLinkProps extends Omit<
  ComponentPropsWithRef<"a">,
  "href"
> {
  destination: SiteDestination;
  onNavigate?: () => void;
  isActive?: boolean;
}

/** Keeps real anchors, and gives unfinished local destinations an explicit explanation. */
export function SiteLink({
  destination,
  onNavigate,
  onClick,
  children,
  isActive,
  ...props
}: SiteLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // When not on root home page, route in-page anchors back to home sections
  const resolvedHref =
    !isHome && destination.href.startsWith("#")
      ? `/${destination.href}`
      : destination.href;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (isHome && destination.noticeId) {
      const notice = document.getElementById(destination.noticeId);
      if (notice instanceof HTMLDialogElement) {
        event.preventDefault();
        onNavigate?.();
        notice.showModal();
      }
      return;
    }
    onNavigate?.();
  }

  return (
    <a
      {...props}
      href={resolvedHref}
      aria-current={isActive ? "page" : undefined}
      aria-haspopup={isHome && destination.noticeId ? "dialog" : undefined}
      onClick={handleClick}
    >
      {children}
      {isHome && destination.noticeId && (
        <span className="sr-only"> (coming soon)</span>
      )}
    </a>
  );
}
