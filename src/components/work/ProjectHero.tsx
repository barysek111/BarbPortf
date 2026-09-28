import { ImageRow } from "@/components/sections/ImageRow";

export type ProjectHeroMeta = {
  label: string;
  value: string;
};

const HERO_PLACEHOLDER = "/images/project-hero-placeholder.jpg";

export function ProjectHero({
  title,
  aboutLabel,
  description,
  meta,
  imageSrc = HERO_PLACEHOLDER,
  imageAlt = "",
}: {
  title: string;
  aboutLabel: string;
  description: string;
  meta: readonly ProjectHeroMeta[];
  /** One-column solid row under the copy. Defaults to the shared placeholder. */
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="w-full max-w-(--container-section) pt-page-top" data-name="Section - About the Project">
      <div className="flex flex-col gap-header px-gutter pb-section">
        <h1 className="type-h2 appear w-full tablet:max-w-1/2" data-appear="60">
          <span>{title}</span>
        </h1>
        <div className="flex flex-col gap-16 tablet:grid tablet:grid-cols-2 tablet:gap-0">
          {/* 160px inner right inset so the body does not run into the meta. */}
          <div className="flex flex-col gap-12 tablet:pr-[160px]">
            <p className="type-label appear" data-appear="20">
              <span>{aboutLabel}</span>
            </p>
            <p className="type-body appear whitespace-pre-line" data-appear="60">
              <span>{description}</span>
            </p>
          </div>
          <div className="contents tablet:grid tablet:w-full tablet:grid-cols-3 tablet:items-start tablet:gap-gutter">
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
      <ImageRow columns={1} frames={[{ variant: "solid", src: imageSrc, alt: imageAlt }]} />
    </section>
  );
}
