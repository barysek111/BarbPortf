"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useState, type ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WorkCard } from "@/components/work/WorkCard";
import { useViewCursor, ViewCursor } from "@/components/work/ViewCursor";
import { works } from "@/copy-database/works";
import { projects, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";

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

const LIST_ROW =
  "grid w-full grid-cols-1 items-stretch gap-24 border-t border-ink px-12 py-24 tablet:h-176 tablet:grid-cols-2 tablet:gap-12";

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
        className={cn(LIST_ROW, "cursor-none")}
      >
        <div className="grid h-auto min-h-0 min-w-0 grid-cols-2 gap-12 tablet:h-full tablet:grid-cols-3">
          {image ? (
            <div className="hidden min-h-0 min-w-0 tablet:block tablet:h-full">
              <Image
                src={image.src}
                alt={works.listImageAlt}
                width={image.w}
                height={image.h}
                sizes="176px"
                className="block h-full w-full min-h-0 object-contain object-left-top"
              />
            </div>
          ) : null}
          <p className="type-label reveal-clip min-w-0 desktop:pr-32">
            <span>{project.title}</span>
          </p>
          <p className="type-label reveal-clip min-w-0">
            <span>{project.year}</span>
          </p>
        </div>
        <p className="type-body min-w-0 max-w-[500px]">
          <span>{project.description}</span>
        </p>
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
        {projects.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} dither caption="above" />
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
