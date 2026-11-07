"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useState, type ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DitherOverlay } from "@/components/work/DitherOverlay";
import { WorkCard } from "@/components/work/WorkCard";
import { useViewCursor, ViewCursor } from "@/components/work/ViewCursor";
import { WORK_THUMB_HOVER_GRAY, WORK_THUMB_HOVER_ZOOM } from "@/components/work/WorkThumbMedia";
import { works } from "@/copy-database/works";
import { formatYear, projects, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ruledRowClass } from "@/lib/ruled-row";

type Mode = "grid" | "list";

const ModeContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
} | null>(null);

function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("WorksGrid requires mode provider");
  return ctx;
}

function WorksGridModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("grid");
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <div className="flex w-full flex-col gap-56">{children}</div>
    </ModeContext.Provider>
  );
}

function WorksGridModeSwitch({ className }: { className?: string }) {
  const { mode, setMode } = useMode();
  return (
    <div className={cn("type-label flex shrink-0 flex-col gap-2 pt-4 max:pt-8", className)}>
      <Button
        pressed={mode === "grid"}
        aria-pressed={mode === "grid"}
        muted={mode !== "grid"}
        onClick={() => setMode("grid")}
      >
        {works.grid}
      </Button>
      <Button
        pressed={mode === "list"}
        aria-pressed={mode === "list"}
        muted={mode !== "list"}
        onClick={() => setMode("list")}
      >
        {works.list}
      </Button>
    </div>
  );
}

function WorksListYearName({ project, stacked = false }: { project: Project; stacked?: boolean }) {
  return (
    <div className={cn("flex min-w-0 items-start gap-12", stacked ? "flex-col" : "flex-row")}>
      <p className="type-label reveal-clip shrink-0 text-muted">
        <span>{formatYear(project.year)}</span>
      </p>
      <p className="type-label reveal-clip min-w-0">
        <span>{project.title}</span>
      </p>
    </div>
  );
}

function WorksListRow({ project }: { project: Project }) {
  const { cursor, bind } = useViewCursor();
  const image = project.listImage;

  return (
    <>
      <Link
        href={`/${project.slug}`}
        aria-label={project.title}
        data-hide-site-cursor=""
        onMouseMove={bind.onMouseMove}
        onMouseLeave={bind.onMouseLeave}
        className={cn(ruledRowClass, "appear group block w-full cursor-none")}
        data-appear="20"
      >
        <div className="appear-body grid grid-cols-[128px_minmax(0,1fr)] items-start gap-12 tablet:grid-cols-2">
        <div className="col-start-1 row-start-1 w-[128px] tablet:col-start-1 tablet:grid tablet:w-auto tablet:min-w-0 tablet:grid-cols-2 tablet:items-start tablet:gap-12">
          <div className="hidden min-w-0 tablet:block">
            <WorksListYearName project={project} />
          </div>
          {image ? (
            <div className="relative w-[128px] overflow-hidden tablet:col-start-2 tablet:h-[128px] tablet:w-max tablet:max-w-full tablet:justify-self-start">
              <Image
                src={image.src}
                alt={works.listImageAlt}
                width={image.w}
                height={image.h}
                sizes="128px"
                className={cn(
                  "block h-auto w-[128px] object-contain object-left-top",
                  "tablet:h-full tablet:w-auto tablet:max-w-full",
                  WORK_THUMB_HOVER_GRAY,
                  WORK_THUMB_HOVER_ZOOM,
                )}
              />
              <DitherOverlay src={image.src} fit="contain" position="top" />
            </div>
          ) : null}
        </div>
        <div className="col-start-2 row-start-1 flex min-w-0 flex-col gap-12 tablet:contents">
          <div className="tablet:hidden">
            <WorksListYearName project={project} stacked />
          </div>
          <p className="type-body min-w-0 max-w-[500px] tablet:col-start-2 tablet:row-start-1">
            <span>{project.description}</span>
          </p>
        </div>
        </div>
      </Link>
      <ViewCursor cursor={cursor} />
    </>
  );
}

function WorksGridProjectList() {
  const { mode } = useMode();

  if (mode === "grid") {
    return (
      <div className="works-grid items-start">
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} dither caption="above" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <WorksListRow key={project.slug} project={project} />
      ))}
    </div>
  );
}

/**
 * The single way projects are displayed. Grid by default, with a grid/list toggle.
 * Must stay a direct child of page-main.
 */
export type WorksGridProps = {
  title?: string;
  headingLevel?: "h1" | "h2";
  className?: string;
};

export function WorksGrid({
  title = works.heading,
  headingLevel = "h2",
  className,
}: WorksGridProps) {
  return (
    <section id="latest" className={className} data-name="Section - Works Grid">
      <WorksGridModeProvider>
        <div className="flex min-w-0 items-start gap-12">
          <SectionHeading as={headingLevel}>{title}</SectionHeading>
          <WorksGridModeSwitch />
        </div>
        <WorksGridProjectList />
      </WorksGridModeProvider>
    </section>
  );
}
