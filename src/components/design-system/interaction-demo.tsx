"use client";

import { useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function InteractionDemo() {
  const [state, setState] = useState<"idle" | "loading" | "saved">("idle");
  async function saveExample() {
    setState("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setState("saved");
  }
  return (
    <Card
      variant="outlined"
      className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
    >
      <div className="max-w-prose">
        <h3 className="type-h3">Small details. Clear feedback.</h3>
        <p className="mt-3 text-muted-foreground">
          Try a complete button interaction. Tab to focus, press Enter to save,
          then reset the example.
        </p>
        <p
          role="status"
          aria-live="polite"
          className="type-small mt-4 min-h-6 font-medium"
        >
          {state === "idle"
            ? "Ready for a test drive."
            : state === "loading"
              ? "Saving the example…"
              : "Example saved. Nothing was sent to a server."}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-4">
        <Button
          onClick={saveExample}
          loading={state === "loading"}
          loadingLabel="Saving…"
          disabled={state === "saved"}
          trailingIcon={state === "saved" ? <Check /> : <ArrowRight />}
        >
          {state === "saved" ? "Saved" : "Save example"}
        </Button>
        <Button
          variant="ghost"
          disabled={state === "loading"}
          onClick={() => setState("idle")}
          leadingIcon={<RotateCcw />}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}
