import { global } from "@/copy-database/global";
import { works } from "@/copy-database/works";

export type Thumb = { src: string; w: 160 | 320 };

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
  listImages: Thumb[];
  masonryY: number;
};

function listThumbs(folder: string, files: readonly string[]): Thumb[] {
  return files.map((file, index) => ({
    src: `/images/works/list/${folder}/${file}`,
    w: index === 2 ? 320 : 160,
  }));
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
  listImages: listThumbs(entry.listFolder, entry.listFiles),
}));

export function formatIndex(index: number) {
  return String(index + 1).padStart(3, "0");
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
