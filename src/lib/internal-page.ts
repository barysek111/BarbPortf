import { notFound } from "next/navigation";

/**
 * The design system is a local catalogue.
 * `next dev` still serves them. A published build returns 404.
 */
export function hideInternalPage() {
  if (process.env.NODE_ENV === "production") notFound();
}
