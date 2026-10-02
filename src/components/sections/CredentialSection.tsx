import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { ruledRowClass } from "@/lib/ruled-row";

export type CredentialRow = {
  title: string;
  meta: string;
  year: string;
};

/** Stacked: title | year on row 1; meta row 2 left. Tablet+: 50/50, right cell meta|year. */
const ROW =
  "grid grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] items-start gap-x-12 gap-y-2 " +
  "tablet:grid-cols-2 tablet:grid-rows-1 tablet:gap-y-0";

const META_YEAR_WRAP =
  "contents min-w-0 tablet:col-start-2 tablet:row-start-1 " +
  "tablet:grid tablet:grid-cols-[minmax(0,1fr)_auto] tablet:gap-x-12";

/**
 * Ruled list with a section headline: Experience and Education on /about.
 * Rows carry a top rule only (no bottom rule on the last row).
 */
export function CredentialSection({
  label,
  title,
  rows,
  name,
}: {
  label?: string;
  title: string;
  rows: CredentialRow[];
  name: string;
}) {
  return (
    <section className="section-wrap flex flex-col gap-36" data-name={name}>
      <div className="desktop:grid desktop:grid-cols-2 desktop:gap-12">
        <div className="hidden min-w-0 desktop:block" aria-hidden="true" />
        <div className="flex min-w-0 flex-col gap-12">
          <SectionHeading className="max-w-none">{title}</SectionHeading>
          {label ? (
            <p className="type-label appear" data-appear="20">
              <span>{label}</span>
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col">
        {rows.map((row) => (
          <div key={`${row.title}-${row.year}`} className={cn(ruledRowClass, ROW)}>
            <p className="type-label reveal-clip col-start-1 row-start-1 min-w-0">
              <span>{row.title}</span>
            </p>
            <div className={META_YEAR_WRAP}>
              <p className="type-label reveal-clip col-start-1 row-start-2 min-w-0 text-left tablet:col-start-1 tablet:row-start-1">
                <span>{row.meta}</span>
              </p>
              <p className="type-label reveal-clip col-start-2 row-start-1 shrink-0 justify-self-end self-start text-right tablet:col-start-2 tablet:row-start-1">
                <span>{row.year}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
