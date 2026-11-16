"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { SiteLink } from "./site-link";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function closeMenu() {
    setIsOpen(false);
    menuButton.current?.focus();
  }
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeMenu();
    }
  }

  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <Container className="site-header-inner max-w-home">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="site-wordmark"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/assets/hero/terminal-logo.svg"
            alt=""
            width={64}
            height={64}
            className="site-logo"
          />
          <span>
            {site.name}
            <span className="text-accent-mint" aria-hidden="true">
              .
            </span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-navigation">
          {site.navigation.map((destination) => {
            const isBlogs = destination.href === "/blogs";
            const isActive = isBlogs && pathname.startsWith("/blogs");
            return (
              <SiteLink
                key={destination.label}
                destination={destination}
                isActive={isActive}
                className={cn(
                  "site-nav-link",
                  isActive && "site-nav-link-active",
                )}
              >
                {destination.label}
              </SiteLink>
            );
          })}
        </nav>
        <SiteLink
          destination={site.destinations.contact}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "portfolio-button header-contact bg-accent-pink shadow-brutalist",
          )}
        >
          {site.hero.contactLabel}
          <Image
            src="/assets/hero/arrow-up-right.svg"
            width={24}
            height={24}
            alt=""
          />
        </SiteLink>
        <Button
          ref={menuButton}
          variant="ghost"
          className="mobile-menu-button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen(!isOpen)}
          leadingIcon={isOpen ? <X /> : <Menu />}
        />
      </Container>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!isOpen}
        className="mobile-navigation"
      >
        <Container>
          {site.navigation.map((destination) => {
            const isBlogs = destination.href === "/blogs";
            const isActive = isBlogs && pathname.startsWith("/blogs");
            return (
              <SiteLink
                key={destination.label}
                destination={destination}
                isActive={isActive}
                onNavigate={closeMenu}
                className={cn(
                  "site-nav-link",
                  isActive && "site-nav-link-active",
                )}
              >
                {destination.label}
              </SiteLink>
            );
          })}
          <SiteLink
            destination={site.destinations.contact}
            onNavigate={closeMenu}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "portfolio-button mt-4 mb-3 bg-accent-pink shadow-brutalist",
            )}
          >
            {site.hero.contactLabel}
            <Image
              src="/assets/hero/arrow-up-right.svg"
              width={20}
              height={20}
              alt=""
            />
          </SiteLink>
        </Container>
      </nav>
    </header>
  );
}
