import { Services } from "@/components/home/Services";
import { AboutHero } from "@/components/sections/AboutHero";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Experience />
      <Education />
      <Services />
    </>
  );
}
