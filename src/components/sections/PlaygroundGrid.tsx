import { playground } from "@/copy-database/playground";

type PlaygroundItem = (typeof playground.items)[number];

/**
 * Playground grid. Images keep their ratio, fill the padded cell, and sit on the top of the row.
 * Row height follows the tallest image. 3 columns below desktop, 6 from 1200.
 * 12px between columns, 96px between rows. 24px padding on the left and right of each cell below tablet, 32px from 810.
 */
export function PlaygroundGrid({ items = playground.items }: { items?: readonly PlaygroundItem[] }) {
  return (
    <ul
      className="grid grid-cols-3 items-start gap-x-12 gap-y-96 desktop:grid-cols-6"
      data-name="Playground grid"
    >
      {items.map((item) => (
        <li key={item.id} className="min-w-0 px-24 tablet:px-32">
          <img src={item.src} alt={item.alt} draggable={false} className="block h-auto w-full" />
        </li>
      ))}
    </ul>
  );
}
