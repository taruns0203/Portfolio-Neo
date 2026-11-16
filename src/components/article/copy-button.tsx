"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function CopyButton({
  text,
  label = "Copy code",
}: {
  text?: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        text ?? window.location.href.split("#")[0],
      );
      setStatus("Copied");
    } catch {
      setStatus("Copy unavailable. Select and copy manually.");
    }
  }
  return (
    <span className="article-copy">
      <Button variant="outline" size="sm" onClick={copy}>
        {label}
      </Button>
      <span role="status" className="article-copy-status">
        {status}
      </span>
    </span>
  );
}
