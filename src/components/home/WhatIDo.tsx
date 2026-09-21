import { whatIDo } from "@/content/home";

export function WhatIDo() {
  return (
    <section
      className="w-full max-w-(--container-section) overflow-clip bg-paper px-gutter pb-section"
      data-name="Section - What I Do"
    >
      <div className="flex w-full flex-col gap-gutter">
        <div className="flex items-center justify-between">
          {whatIDo.tags.map((tag) => (
            <p key={tag} className="type-label appear" data-appear="20">
              <span>{tag}</span>
            </p>
          ))}
        </div>
        <h2 className="type-h2 appear max-w-(--container-measure)" data-appear="60">
          <span>{whatIDo.body}</span>
        </h2>
      </div>
    </section>
  );
}
