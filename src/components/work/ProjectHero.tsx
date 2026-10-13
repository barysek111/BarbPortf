import { ImageRow } from "@/components/sections/ImageRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ImageFrameVariant } from "@/components/ui/ImageFrame";

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
  imageVariant = "solid",
  imageBackgroundSrc,
  imageColor,
}: {
  title: string;
  aboutLabel: string;
  description: string;
  meta: readonly ProjectHeroMeta[];
  imageSrc?: string;
  imageAlt?: string;
  imageVariant?: ImageFrameVariant;
  imageBackgroundSrc?: string;
  /** Solid frame fill. */
  imageColor?: string;
}) {
  return (
    <section
      className="flex flex-col gap-96"
      data-name="Section - About the Project"
    >
      <div className="flex flex-col gap-56">
        <SectionHeading as="h1" className="w-full desktop:max-w-1/2">
          {title}
        </SectionHeading>
        <div className="flex flex-col gap-12 tablet:grid tablet:grid-cols-2 tablet:gap-12">
          <div className="flex flex-col gap-12 tablet:pr-56 desktop:pr-152">
            <p className="type-label-medium appear" data-appear="20">
              <span>{aboutLabel}</span>
            </p>
            <p className="type-body appear whitespace-pre-line" data-appear="60">
              <span>{description}</span>
            </p>
          </div>
          <div className="contents tablet:grid tablet:w-full tablet:grid-cols-3 tablet:items-start tablet:gap-12">
            {meta.map((item) => (
              <div key={item.label} className="flex min-w-0 flex-col gap-12">
                <p className="type-label-medium appear" data-appear="20">
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
      <ImageRow
        columns={1}
        frames={[
          {
            variant: imageVariant,
            src: imageSrc,
            alt: imageAlt,
            backgroundSrc: imageBackgroundSrc,
            color: imageColor,
          },
        ]}
      />
    </section>
  );
}
