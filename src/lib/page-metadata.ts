import type { Metadata } from "next";
import { site } from "@/content/site";

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
  const documentTitle = absoluteTitle ? title : `${title} — ${site.name}`;
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

export const worksMetadata: Metadata = pageMetadata({
  title: "Works",
  description: `Selected product design work — ${site.description}`,
});

export const aboutMetadata: Metadata = pageMetadata({
  title: "About",
  description: aboutDescription(),
});

function aboutDescription() {
  return `${site.description} Background in branding, UX, and product design.`;
}

export function projectMetadata(project: {
  title: string;
  description: string;
  client: string;
}): Metadata {
  return pageMetadata({
    title: project.title,
    description: `${project.description} Client: ${project.client}.`,
  });
}
