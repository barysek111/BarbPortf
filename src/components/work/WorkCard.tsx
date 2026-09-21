import Link from "next/link";
import { formatIndex, type Project } from "@/content/projects";

export function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/works/${project.slug}`} className="relative min-w-0 overflow-clip">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.title}
        className="block h-auto w-full rounded-none"
        style={{ aspectRatio: `372 / ${project.imageH}` }}
      />
      <div className="type-label flex h-[26px] justify-between gap-gutter overflow-clip px-gutter pt-gutter [&>span]:block">
        <span>{formatIndex(index)}</span>
        <span>{project.title}</span>
      </div>
    </Link>
  );
}
