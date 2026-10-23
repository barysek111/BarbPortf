import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/copy-database/home";

export function WhatIDo() {
  return (
    <section
      className="flex flex-col gap-36 overflow-clip bg-paper"
      data-name="Section - What I Do"
    >
      <div className="flex w-full items-center justify-between">
        {home.whatIDo.tags.map((tag) => (
          <p key={tag} className="type-label appear" data-appear="20">
            <span>{tag}</span>
          </p>
        ))}
      </div>
      <SectionHeading className="max-w-(--container-measure)">{home.whatIDo.body}</SectionHeading>
    </section>
  );
}
