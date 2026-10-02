import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatIDo } from "@/content/home";

export function WhatIDo() {
  return (
    <section
      className="section-wrap flex flex-col gap-12 overflow-clip bg-paper"
      data-name="Section - What I Do"
    >
      <div className="flex w-full items-center justify-between">
        {whatIDo.tags.map((tag) => (
          <p key={tag} className="type-label appear" data-appear="20">
            <span>{tag}</span>
          </p>
        ))}
      </div>
      <SectionHeading className="max-w-(--container-measure)">{whatIDo.body}</SectionHeading>
    </section>
  );
}
