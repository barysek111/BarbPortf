import Link from "next/link";

export function NextProject({
  title,
  href,
  imageSrc,
  label,
}: {
  title: string;
  href: string;
  /** Home-grid thumbnail, centered behind the title. */
  imageSrc?: string;
  /** "next project" or "previous project". */
  label: string;
}) {
  return (
    <section
      className="w-full max-w-(--container-section) px-gutter pt-104 pb-section"
      data-name="Section - Next Project"
    >
      <div className="grid w-full place-items-center has-[:hover]:[&_img]:scale-125 has-[:hover]:[&_img]:[filter:blur(12px)] has-[:focus-visible]:[&_img]:scale-125 has-[:focus-visible]:[&_img]:[filter:blur(12px)] has-[:hover]:[&_.roll]:-translate-y-full has-[:focus-visible]:[&_.roll]:-translate-y-full">
        {imageSrc ? (
          <Link
            href={href}
            aria-label={title}
            tabIndex={-1}
            className="relative col-start-1 row-start-1 w-[50vw] overflow-hidden tablet:w-[25vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="block h-auto w-full origin-center transition-[filter,transform] duration-500 ease-out"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-paper/40" />
          </Link>
        ) : null}
        <Link
          href={href}
          className="z-lift col-start-1 row-start-1 flex w-max max-w-full flex-col items-center justify-center gap-12 text-center"
        >
          <h3 className="type-h3 appear" data-appear="60">
            <span>{title}</span>
          </h3>
          <span className="type-label inline-flex items-center gap-hairline overflow-clip">
            <span aria-hidden="true">[</span>
            <span className="flex h-[1.3em] flex-col overflow-hidden">
              <span className="roll label-roll">{label}</span>
              <span aria-hidden="true" className="roll label-roll">
                {label}
              </span>
            </span>
            <span aria-hidden="true">]</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
