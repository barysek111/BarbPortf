export type CredentialRow = {
  title: string;
  meta: string;
  year: string;
};

/**
 * Shared layout for the Experience and Education sections: a label and headline
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
        <div className="grid grid-cols-1 gap-gutter pb-header desktop:grid-cols-2">
          {label ? (
            <p className="type-label appear" data-appear="20">
              <span>{label}</span>
            </p>
          ) : (
            <div />
          )}
          <h2 className="type-h2 appear" data-appear="60">
            <span>{title}</span>
          </h2>
        </div>
        <div>
          {rows.map((row) => (
            <div
              key={`${row.title}-${row.year}`}
              className="grid grid-cols-1 items-start gap-gutter overflow-clip border-t border-muted py-24 last:border-b desktop:grid-cols-2 desktop:items-center"
            >
              <p className="type-label reveal-clip">
                <span>{row.title}</span>
              </p>
              <div className="grid grid-cols-1 gap-gutter desktop:grid-cols-2">
                <p className="type-label reveal-clip">
                  <span>{row.meta}</span>
                </p>
                {/* Year sits flush to the row's right edge. */}
                <p className="type-label reveal-clip desktop:justify-self-end desktop:text-right">
                  <span>{row.year}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
