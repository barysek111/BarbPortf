export type ProjectHeroMeta = {
  label: string;
  value: string;
};

export function ProjectHero({
  title,
  aboutLabel,
  description,
  meta,
}: {
  title: string;
  aboutLabel: string;
  description: string;
  meta: readonly ProjectHeroMeta[];
}) {
  return (
    <section className="w-full max-w-(--container-section) px-gutter pt-page-top pb-section" data-name="Section - About the Project">
      <div className="flex flex-col gap-header">
        <h1 className="type-h2 appear" data-appear="60">
          <span>{title}</span>
        </h1>
        <div className="grid grid-cols-1 gap-36 desktop:grid-cols-2 desktop:gap-0">
          {/* 160px inner right inset so the body does not run into the meta. */}
          <div className="flex flex-col gap-12 desktop:pr-[160px]">
            <p className="type-label-strong appear" data-appear="20">
              <span>{aboutLabel}</span>
            </p>
            <p className="type-body appear whitespace-pre-line" data-appear="60">
              <span>{description}</span>
            </p>
          </div>
          <div className="grid w-full grid-cols-1 items-start gap-gutter desktop:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label} className="flex min-w-0 flex-col gap-gutter">
                <p className="type-label appear" data-appear="20">
                  <span>{item.label}</span>
                </p>
                <p className="type-label appear whitespace-pre-line" data-appear="20">
                  <span>{item.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
