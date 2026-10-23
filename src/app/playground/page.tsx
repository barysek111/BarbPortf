import { PlaygroundGrid } from "@/components/sections/PlaygroundGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { playground } from "@/copy-database/playground";
import { global } from "@/copy-database/global";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: global.nav.playground,
  description: playground.headline,
});

export default function PlaygroundPage() {
  return (
    <>
      <header data-name="Section - Playground">
        <SectionHeading as="h1" className="desktop:max-w-1/2">{playground.headline}</SectionHeading>
      </header>
      <section aria-label={playground.gridLabel}>
        <PlaygroundGrid />
      </section>
    </>
  );
}
