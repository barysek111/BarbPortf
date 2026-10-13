"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useState, type ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WorkCard } from "@/components/work/WorkCard";
import { projects } from "@/content/projects";
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
    <div className={cn("type-label flex shrink-0 flex-col gap-2", className)}>
      <Button
        pressed={mode === "grid"}
        aria-pressed={mode === "grid"}
        muted={mode !== "grid"}
        onClick={() => setMode("grid")}
      >
        grid
      </Button>
      <Button
        pressed={mode === "list"}
        aria-pressed={mode === "list"}
        muted={mode !== "list"}
        onClick={() => setMode("list")}
      >
        list
      </Button>
    </div>
  );
}

const LIST_ROW =
  "relative flex flex-col items-start gap-12 " +
  "desktop:flex-row desktop:gap-12";

const LIST_IMAGES =
  "grid min-w-0 gap-4 overflow-hidden " +
  "below-tablet:grid-cols-2 below-tablet:grid-rows-2 below-tablet:h-auto " +
  "tablet:h-176 tablet:shrink-0 tablet:grid-cols-4 " +
  "desktop:min-h-176 desktop:flex-1";

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
        <div key={project.slug} className={cn(ruledRowClass, LIST_ROW)}>
          <Link
            href={`/${project.slug}`}
            aria-label={project.title}
            className="absolute inset-0 z-lift desktop:hidden"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-12">
              <div className="flex min-w-0 flex-col gap-8">
                <p className="type-label reveal-clip">
                  <span>{project.title}</span>
                </p>
                <p className="type-body reveal-clip w-full text-muted tablet:w-[60%] tablet:max-w-[60%]">
                  <span>{project.description}</span>
                </p>
                <p className="type-label reveal-clip tablet:hidden">
                  <span>{project.year}</span>
                </p>
                <div className="hidden desktop:block">
                  <Button href={`/${project.slug}`}>view project</Button>
                </div>
              </div>
              <p className="type-label reveal-clip hidden shrink-0 tablet:block">
                <span>{project.year}</span>
              </p>
            </div>
          </div>
          <div className={LIST_IMAGES}>
            {project.listImages.slice(0, 4).map((image, imageIndex) => (
              <div
                key={`${project.slug}-${imageIndex}`}
                className="relative min-h-0 w-full below-tablet:aspect-[4/3] tablet:h-full"
              >
                <Image src={image.src} alt="" fill sizes={`${image.w}px`} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
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
  title = "LATEST WORK",
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
