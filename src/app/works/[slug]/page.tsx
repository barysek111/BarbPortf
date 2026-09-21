import { notFound } from "next/navigation";
import { ProjectStub } from "@/components/work/ProjectStub";
import { SolaraPage } from "@/components/work/SolaraPage";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  if (slug === "solara") {
    return <SolaraPage />;
  }

  return <ProjectStub project={project} />;
}
