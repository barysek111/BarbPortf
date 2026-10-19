import { notFound } from "next/navigation";

/**
 * Design system and archive are local catalogues.
 * `next dev` still serves them. A published build returns 404.
 */
export function hideInternalPage() {
  if (process.env.NODE_ENV === "production") notFound();
}
