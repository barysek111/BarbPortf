"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { global } from "@/copy-database/global";

export function useViewCursor() {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  return {
    cursor,
    bind: {
      onMouseMove: (event: React.MouseEvent) => setCursor({ x: event.clientX, y: event.clientY }),
      onMouseLeave: () => setCursor(null),
    },
  };
}

/** Same bracket spacing as Button, without the label roll. 4px paper frame at full opacity. */
function ViewCursorLabel() {
  return (
    <span className="type-label inline-flex items-center gap-4 bg-paper p-4 text-ink">
      <span aria-hidden="true">{global.brackets.open}</span>
      <span>{global.cursor.view}</span>
      <span aria-hidden="true">{global.brackets.close}</span>
    </span>
  );
}

/** [view] label fixed to the pointer. Renders in place when `inline` is set, for the catalogue. */
export function ViewCursor({
  cursor,
  inline = false,
}: {
  cursor?: { x: number; y: number } | null;
  inline?: boolean;
}) {
  if (inline) return <ViewCursorLabel />;
  if (!cursor || typeof document === "undefined") return null;
  return createPortal(
    <span
      aria-hidden="true"
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
      style={{ left: cursor.x, top: cursor.y }}
    >
      <ViewCursorLabel />
    </span>,
    document.body,
  );
}
