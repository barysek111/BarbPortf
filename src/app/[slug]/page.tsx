import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { ProjectStub } from "@/components/work/ProjectStub";
import { getCaseStudy } from "@/content/case-studies";
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

  const caseStudy = getCaseStudy(slug);
  if (caseStudy) {
    return <CaseStudyPage study={caseStudy} />;
  }

  return <ProjectStub project={project} />;
}
