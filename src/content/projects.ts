import { global } from "@/copy-database/global";
import { works } from "@/copy-database/works";

export type Thumb = { src: string; w: number; h: number };

export type Project = {
  slug: string;
  title: string;
  description: string;
  client: string;
  services: string;
  year: string;
  location: string;
  image: string;
  imageH: number;
  listImage: Thumb;
  masonryY: number;
};

/** List row picture. A project with listImage uses that; every other project uses the grid thumbnail. */
function listThumb(entry: (typeof works.projects)[number]): Thumb {
  if (entry.listImage && entry.listImageWidth && entry.listImageHeight) {
    return { src: entry.listImage, w: entry.listImageWidth, h: entry.listImageHeight };
  }
  return { src: entry.image, w: entry.imageWidth, h: entry.imageHeight };
}

/** Display height at 372px card width, from intrinsic dimensions. */
function cardHeight(width: number, height: number) {
  return Math.round((372 * height) / width);
}

export const projects: Project[] = works.projects.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  description: entry.description,
  client: entry.client,
  services: entry.services,
  year: entry.year,
  location: entry.location,
  image: entry.image,
  imageH: cardHeight(entry.imageWidth, entry.imageHeight),
  masonryY: entry.masonryY,
  listImage: listThumb(entry),
}));

export function formatIndex(index: number) {
  const digits = String(index + 1).padStart(2, "0");
  return `${global.brackets.open}${digits}${global.brackets.close}`;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Next project in list order. The last project points at the one before it. */
export function getProjectNeighbor(slug: string):
  | {
      project: Project;
      label: typeof global.nextProject.next | typeof global.nextProject.previous;
    }
  | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return undefined;
  const isLast = index === projects.length - 1;
  const project = projects[isLast ? index - 1 : index + 1];
  if (!project) return undefined;
  return {
    project,
    label: isLast ? global.nextProject.previous : global.nextProject.next,
  };
}
