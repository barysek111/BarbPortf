export type CredentialRow = {
  title: string;
  meta: string;
  year: string;
};

/**
 * Shared layout for the Experience and Education sections: a headline (left)
 * above a ruled list, each row pairing a title with its institution and year.
 *
 * Rows carry their own top rule and the last one closes with a bottom rule,
 * which is why the border lives on the row rather than on the list. Row height
 * is content plus 24px above and below; there is no fixed height.
 *
 * Both sections render through here so a change to the layout reaches both.
 * Only the label, headline and rows differ.
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
  /** data-name used for layer identification when comparing against a reference. */
  name: string;
}) {
  return (
    <section className="w-full max-w-(--container-section) pb-section" data-name={name}>
      <div className="px-gutter">
        <div className="flex flex-col gap-gutter pb-header">
          <h2 className="type-h2 appear w-full max-w-none" data-appear="60">
            <span>{title}</span>
          </h2>
          {label ? (
            <p className="type-label appear" data-appear="20">
              <span>{label}</span>
            </p>
          ) : null}
        </div>
        {/* One column template for all rows so meta/year lines stay aligned when year width varies. */}
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-x-gutter">
          {rows.map((row) => (
            <div
              key={`${row.title}-${row.year}`}
              className="col-span-3 grid grid-cols-subgrid items-start gap-x-gutter overflow-clip border-t border-muted py-24 last:border-b"
            >
              <p className="type-label reveal-clip min-w-0">
                <span>{row.title}</span>
              </p>
              <p className="type-label reveal-clip min-w-0">
                <span>{row.meta}</span>
              </p>
              {/* Year sits flush to the row's right edge. */}
              <p className="type-label reveal-clip min-w-0 text-right">
                <span>{row.year}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
