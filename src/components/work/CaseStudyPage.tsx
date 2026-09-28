import { Chapter } from "@/components/sections/Chapter";
import { ImageRow } from "@/components/sections/ImageRow";
import { NextProject } from "@/components/work/NextProject";
import { ProjectHero } from "@/components/work/ProjectHero";
import type { CaseStudy } from "@/content/case-studies/types";
import { getProjectNeighbor } from "@/content/projects";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article className="case">
      <ProjectHero
        title={study.title}
        aboutLabel={study.aboutLabel}
        description={study.description}
        meta={study.meta}
        imageSrc={study.heroImage?.src}
        imageAlt={study.heroImage?.alt}
      />

      {study.chapters.map((chapter) => (
        <div key={chapter.headline}>
          <Chapter headline={chapter.headline} sections={chapter.sections} />
          {chapter.imageRows
            ? chapter.imageRows.map((row, index) => (
                <ImageRow
                  key={`${chapter.headline}-row-${index}`}
                  columns={row.columns}
                  frames={[...row.frames]}
                />
              ))
            : null}
        </div>
      ))}

      <ProjectNeighbor slug={study.slug} />
    </article>
  );
}

function ProjectNeighbor({ slug }: { slug: string }) {
  const neighbor = getProjectNeighbor(slug);
  if (!neighbor) return null;
  return (
    <NextProject
      title={neighbor.project.title}
      href={`/${neighbor.project.slug}`}
      imageSrc={neighbor.project.image}
      label={neighbor.label}
    />
  );
}
