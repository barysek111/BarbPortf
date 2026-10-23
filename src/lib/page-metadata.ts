import type { Metadata } from "next";
import { about } from "@/copy-database/about";
import { global } from "@/copy-database/global";

const site = global.site;

/** Shared Open Graph defaults for public routes. */
export function pageMetadata({
  title,
  description = site.description,
  /** Skip layout title template (homepage only). */
  absoluteTitle = false,
}: {
  title: string;
  description?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const documentTitle = absoluteTitle ? title : `${title}${global.titleSeparator}${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      title: documentTitle,
      description,
      type: "website",
    },
  };
}

export const homeMetadata: Metadata = pageMetadata({
  title: site.title,
  description: site.description,
  absoluteTitle: true,
});

export const aboutMetadata: Metadata = pageMetadata({
  title: global.nav.about,
  description: aboutDescription(),
});

function aboutDescription() {
  return `${site.description}${about.metaDescriptionExtra}`;
}

export function projectMetadata(project: {
  title: string;
  description: string;
  client: string;
}): Metadata {
  return pageMetadata({
    title: project.title,
    description: `${project.description}${global.meta.projectClientLeadIn}${project.client}${global.meta.projectClientEnd}`,
  });
}
