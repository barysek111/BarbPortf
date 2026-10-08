export type PlaygroundItem = {
  id: string;
  src: string;
};

export const playgroundHeadline = "Old experiments, unfinished ideas, just for fun";

const media = "/images/playground";

/** Order matches the playground page. Files stay in the format they were added as. */
export const playgroundItems: readonly PlaygroundItem[] = [
  { id: "11", src: `${media}/11.jpg` },
  { id: "ezgif-com-gif-maker", src: `${media}/ezgif-com-gif-maker.gif` },
  { id: "2-06", src: `${media}/2-06.jpg` },
  { id: "ezgif-com-resize", src: `${media}/ezgif-com-resize.gif` },
  { id: "7-06", src: `${media}/7-06.jpg` },
  { id: "aaa1rgb", src: `${media}/aaa1rgb.jpg` },
  { id: "kreslici-platno-3", src: `${media}/kreslici-platno-3.jpg` },
  { id: "screenshot-01-19-50", src: `${media}/screenshot-2026-08-25-at-01-19-50.png` },
  { id: "screenshot-01-20-14", src: `${media}/screenshot-2026-08-25-at-01-20-14.png` },
  { id: "screenshot-01-23-40", src: `${media}/screenshot-2026-08-25-at-01-23-40.png` },
  { id: "screenshot-01-27-17", src: `${media}/screenshot-2026-08-25-at-01-27-17.png` },
  { id: "screenshot-01-34-52", src: `${media}/screenshot-2026-08-25-at-01-34-52.png` },
  { id: "airtame-task-01", src: `${media}/airtame-task-01.jpg` },
  { id: "baugasm20", src: `${media}/baugasm20.png` },
  { id: "baugasm24", src: `${media}/baugasm24.png` },
  { id: "baugasm7-kopie", src: `${media}/baugasm7-kopie.png` },
  { id: "enterthevoid", src: `${media}/enterthevoid.jpg` },
  { id: "font-presentation-11", src: `${media}/font-presentation-11.jpg` },
  { id: "gradients", src: `${media}/gradients.jpg` },
  { id: "jan-titulky-08", src: `${media}/jan-titulky-08.jpg` },
  { id: "jio", src: `${media}/jio.jpg` },
  { id: "love", src: `${media}/love.jpg` },
  { id: "post1square", src: `${media}/post1square.jpg` },
];
