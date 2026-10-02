"use client";

import { Button } from "@/components/ui/Button";

export function ButtonToggleDemo() {
  return (
    <div className="flex flex-col items-start gap-2">
      <Button pressed aria-pressed onClick={() => {}}>
        grid
      </Button>
      <Button muted aria-pressed={false} onClick={() => {}}>
        list
      </Button>
    </div>
  );
}
