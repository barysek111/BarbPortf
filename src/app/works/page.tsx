import { WorksDisplay } from "@/components/sections/WorksDisplay";
import { worksMetadata } from "@/lib/page-metadata";

export const metadata = worksMetadata;

export default function WorksPage() {
  return <WorksDisplay title="Works" headingLevel="h1" className="pt-216" />;
}
