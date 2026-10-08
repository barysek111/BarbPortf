import { PlaygroundGrid } from "@/components/sections/PlaygroundGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { playgroundHeadline } from "@/content/playground";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Playground",
  description: playgroundHeadline,
});

export default function PlaygroundPage() {
  return (
    <section className="section-wrap flex flex-col gap-96 pt-216" data-name="Section - Playground">
      <SectionHeading as="h1" className="desktop:max-w-1/2">{playgroundHeadline}</SectionHeading>
      <PlaygroundGrid />
    </section>
  );
}
