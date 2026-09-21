import { Hero } from "@/components/home/Hero";
import { WorksDisplay } from "@/components/sections/WorksDisplay";
import { Services } from "@/components/home/Services";
import { WhatIDo } from "@/components/home/WhatIDo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorksDisplay />
      <Services />
      <WhatIDo />
    </>
  );
}
