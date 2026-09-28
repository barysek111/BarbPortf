"use client";

import { useState } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { WorkCard } from "@/components/work/WorkCard";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * The single way projects are displayed. Grid by default, with a grid/list toggle.
 *
 * Used by the homepage and /works. The works-grid utility owns columns and gutters
 * (2-up below 810px, 4-up from tablet); row height hugs each row's tallest card.
 */

const ROLL = "label-roll group-hover:-translate-y-full group-focus-visible:-translate-y-full";

// Inactive toggles are muted; the active one takes the 8px mark to its left.
const TOGGLE =
  "group relative cursor-pointer overflow-clip border-0 bg-transparent p-0 " +
  "not-[.is-on]:text-muted [&.is-on]:mark-leader-before";

// Columns and gutters live in the `works-grid` utility in globals.css.
// To change the column count set --works-grid-columns.
const GRID = "works-grid";

// Matches the service row: a full-bleed ::after painting only its bottom edge,
// so the rule sits outside the row's 12px bottom padding.
const LIST_ROW =
  "relative flex flex-col gap-gutter overflow-clip pb-12 " +
  "desktop:h-176 desktop:flex-row desktop:items-stretch desktop:gap-gutter " +
  "after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-muted after:content-['']";

const LIST_IMAGES =
  "grid min-w-0 shrink-0 gap-tight overflow-hidden " +
  "below-tablet:grid-cols-2 below-tablet:grid-rows-2 below-tablet:h-auto " +
  "tablet:h-176 tablet:grid-cols-4 " +
  "desktop:h-full desktop:min-h-0 desktop:flex-1";

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn(TOGGLE, on && "is-on")} aria-pressed={on}>
      <span className="flex h-[1.3em] flex-col overflow-hidden">
        <span className={ROLL}>{label}</span>
        <span aria-hidden="true" className={ROLL}>
          {label}
        </span>
      </span>
    </button>
  );
}

export function WorksDisplay({
  title = "LATEST WORK",
  headingLevel = "h2",
  className,
}: {
  title?: string;
  headingLevel?: "h1" | "h2";
  /** Extra section-level classes, e.g. a page's top offset. */
  className?: string;
}) {
  const [mode, setMode] = useState<"grid" | "list">("grid");
  const Heading = headingLevel;

  return (
    // Must stay a direct child of site-main: it centres its children, so any
    // wrapper without w-full would collapse this section and the grid with it.
    <section id="latest" className={cn("section-wrap pb-section", className)} data-name="Section - Works Display">
      <div className="w-full">
        <div className="flex items-start justify-between pb-header">
          <div className="flex items-start gap-8">
            <Heading className="type-h2 appear" data-appear="60">
              <span>{title}</span>
            </Heading>
            <p className="type-label appear pt-8" data-appear="20">
              <span>[{projects.length}]</span>
            </p>
          </div>
          <div className="type-label flex flex-col items-end gap-hairline pt-8">
            <Toggle label="grid" on={mode === "grid"} onClick={() => setMode("grid")} />
            <Toggle label="list" on={mode === "list"} onClick={() => setMode("list")} />
          </div>
        </div>

        {mode === "grid" ? (
          <div className={GRID}>
            {projects.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {projects.map((project) => (
              <div key={project.slug} className={LIST_ROW}>
                <div className="flex min-w-0 flex-col desktop:h-full desktop:min-h-0 desktop:flex-1 desktop:justify-between">
                  <div className="flex tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-gutter">
                    <div className="flex min-w-0 flex-col gap-hairline">
                      <p className="type-label reveal-clip">
                        <span>{project.title}</span>
                      </p>
                      <p className="type-label reveal-clip w-full text-muted tablet:w-[60%] tablet:max-w-[60%]">
                        <span>{project.description}</span>
                      </p>
                      <p className="type-label reveal-clip tablet:hidden">
                        <span>{project.year}</span>
                      </p>
                    </div>
                    <p className="type-label reveal-clip hidden shrink-0 tablet:block">
                      <span>{project.year}</span>
                    </p>
                  </div>
                  <BracketButton href={`/${project.slug}`} className="hidden desktop:inline-flex">
                    view project
                  </BracketButton>
                </div>
                <div className={LIST_IMAGES}>
                  {project.listImages.slice(0, 4).map((image, imageIndex) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`${project.slug}-${imageIndex}`}
                      src={image.src}
                      alt=""
                      className="block h-full w-full object-cover below-tablet:aspect-[4/3] below-tablet:h-auto tablet:aspect-auto"
                    />
                  ))}
                </div>
                <BracketButton href={`/${project.slug}`} className="desktop:hidden">
                  view project
                </BracketButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
