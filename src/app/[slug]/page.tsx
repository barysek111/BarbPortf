import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterBlock } from "@/components/sections/ChapterBlock";
import { NextProject } from "@/components/work/NextProject";
import { ProjectHero } from "@/components/work/ProjectHero";
import { getCaseStudy } from "@/content/case-studies";
import { getProject, projects } from "@/content/projects";
import { projectMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return projectMetadata(project);
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="flex w-full flex-col gap-96">
      <ProjectHero
        title={study.title}
        aboutLabel={study.aboutLabel}
        description={study.description}
        meta={study.meta}
        imageSrc={study.heroImage?.src}
        imageAlt={study.heroImage?.alt}
      />

      {study.chapters.map((chapter) => (
        <ChapterBlock
          key={chapter.headline}
          headline={chapter.headline}
          sections={chapter.sections}
          imageRows={chapter.imageRows}
        />
      ))}

      <NextProject slug={study.slug} />
    </article>
  );
}
