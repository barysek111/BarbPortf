"use client";

import { useEffect, useState } from "react";
import { global } from "@/copy-database/global";
import { cn } from "@/lib/cn";

export function NavClock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: global.site.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "shortOffset",
        }).format(new Date()),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const line = "type-label h-[1.3em] overflow-hidden leading-[1.3em] whitespace-nowrap";

  return (
    <div className={className}>
      <p className={cn(line, "tablet:col-start-3 tablet:row-start-1")}>{time}</p>
      <p className={cn(line, "tablet:col-start-3 tablet:row-start-2")}>{global.site.clockLabel}</p>
    </div>
  );
}
