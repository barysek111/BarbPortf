import { NextProject } from "@/components/work/NextProject";
import { getProjectNeighbor, type Project } from "@/content/projects";

export function ProjectStub({ project }: { project: Project }) {
  const neighbor = getProjectNeighbor(project.slug);

  return (
    <article>
      <div className="w-full max-w-(--container-section) px-gutter pt-page-top pb-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={project.title} className="block h-auto w-full" />
      </div>
      {neighbor ? (
        <NextProject
          title={neighbor.project.title}
          href={`/${neighbor.project.slug}`}
          imageSrc={neighbor.project.image}
          label={neighbor.label}
        />
      ) : null}
    </article>
  );
}
