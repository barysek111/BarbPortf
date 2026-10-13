import { Hero2 } from "@/components/home/Hero2";
import { WorksGrid } from "@/components/sections/WorksGrid";
import { Services } from "@/components/home/Services";
import { WhatIDo } from "@/components/home/WhatIDo";
import { homeMetadata } from "@/lib/page-metadata";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      <Hero2 />
      <WorksGrid />
      <Services />
      <WhatIDo />
    </>
  );
}
