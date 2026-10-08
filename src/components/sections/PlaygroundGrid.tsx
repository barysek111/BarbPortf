import { playgroundItems, type PlaygroundItem } from "@/content/playground";

/**
 * Playground grid. Images keep their ratio, fill the padded cell, and sit on the top of the row.
 * Row height follows the tallest image. 3 columns below desktop, 6 from 1200.
 * 12px between columns, 64px between rows, 32px padding on the left and right of each cell.
 */
export function PlaygroundGrid({ items = playgroundItems }: { items?: readonly PlaygroundItem[] }) {
  return (
    <ul
      className="grid grid-cols-3 items-start gap-x-12 gap-y-64 desktop:grid-cols-6"
      data-name="Playground grid"
    >
      {items.map((item) => (
        <li key={item.id} className="min-w-0 px-32">
          <img src={item.src} alt="" draggable={false} className="block h-auto w-full" />
        </li>
      ))}
    </ul>
  );
}
