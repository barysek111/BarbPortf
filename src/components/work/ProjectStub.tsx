import type { Project } from "@/content/projects";

export function ProjectStub({ project }: { project: Project }) {
  return (
    <article className="w-full max-w-(--container-section) px-gutter pt-page-top pb-section">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.image} alt={project.title} className="block h-auto w-full" />
    </article>
  );
}
