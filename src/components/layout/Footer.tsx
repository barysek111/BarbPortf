import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

// Links reveal an 8px square to their left on hover, drawn as a ::before so it
// sits outside the text box and never shifts layout.
const MARK =
  "type-label relative w-max before:absolute before:top-[calc(50%-4px)] before:-left-12 before:h-8 before:w-8 " +
  "before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:content-[''] " +
  "hover:before:opacity-100 focus-visible:before:opacity-100";

export function Footer() {
  return (
    <footer className="stack-front w-full bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-(--container-section) flex-col px-gutter pt-104 pb-gutter">
        <div className="hidden min-h-[32px] items-center justify-end desktop:flex">
          <div className="flex flex-col items-end gap-hairline text-right">
            <p className="type-label">for all enquiries please contact</p>
            <a href={`mailto:${site.email}`} className={MARK}>
              {site.email}
            </a>
          </div>
        </div>

        {/* Wordmark spans the full page width; height follows its own ratio. */}
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="relative mt-gutter mb-24 block aspect-[1445/217] w-full desktop:my-gutter"
        >
          <Image src="/images/shared/wordmark.svg" alt={site.name} fill className="object-contain object-left" />
        </Link>

        <div className="grid grid-cols-2 items-start gap-gutter desktop:grid-cols-4">
          <p className="type-label">{site.name}</p>
          <div className="hidden desktop:block" />
          <div className="hidden desktop:block" />
          <div className="col-start-2 flex flex-col items-end gap-0 desktop:col-start-4">
            <a href={site.links.resume} className={MARK} target="_blank" rel="noreferrer">
              VIEW RESUME
            </a>
            <a href={site.links.linkedin} className={MARK} target="_blank" rel="noreferrer">
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
