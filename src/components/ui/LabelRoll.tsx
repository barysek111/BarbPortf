const LINE = "label-roll";
const TRACK = "label-roll-track";

/** Two-line stack; parent applies hover/focus on `.label-roll-track` (not each line). */
export function LabelRoll({ children }: { children: string }) {
  return (
    <span className="block h-[1.3em] overflow-hidden">
      <span className={`${TRACK} flex flex-col`}>
        <span className={LINE}>{children}</span>
        <span aria-hidden="true" className={LINE}>
          {children}
        </span>
      </span>
    </span>
  );
}
