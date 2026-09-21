import { about } from "@/content/about";

/**
 * About-page opener: kicker + headline, then thinking/making and the photo pair.
 * First-on-page spacing is pt-page-top; section-to-section space is pb-section.
 */
export function AboutHero() {
  return (
    <section
      id="about"
      className="w-full max-w-(--container-section) px-gutter pt-page-top pb-section"
      data-name="Section - About Hero"
    >
      <div className="grid grid-cols-1 gap-gutter pb-header desktop:grid-cols-2">
        <p className="type-label appear" data-appear="20">
          <span>{about.label}</span>
        </p>
        <h1 className="type-h2 appear" data-appear="60">
          <span>{about.headline}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-36 pb-header desktop:grid-cols-2">
        <div />
        <div className="flex flex-col gap-36 [&_.type-body]:mt-12">
          {[about.thinking, about.making].map((block) => (
            <div key={block.label}>
              <p className="type-label appear" data-appear="20">
                <span>{block.label}</span>
              </p>
              <p className="type-body appear" data-appear="60">
                <span>{block.text}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-tight desktop:grid-cols-2">
        {about.images.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            className="block h-auto w-full rounded-none object-cover desktop:h-[600px]"
          />
        ))}
      </div>
    </section>
  );
}
