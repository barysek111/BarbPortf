import { Services } from "@/components/home/Services";
import { WhatIDo } from "@/components/home/WhatIDo";
import { Chapter } from "@/components/sections/Chapter";
import { CredentialSection } from "@/components/sections/CredentialSection";
import { about } from "@/copy-database/about";
import { aboutMetadata } from "@/lib/page-metadata";

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <>
      <WhatIDo />
      <Chapter
        id="about"
        sections={[
          { label: about.thinking.label, paragraphs: [about.thinking.text] },
          {
            label: about.making.label,
            paragraphs: [about.making.text],
            images: [{ src: about.making.image, alt: about.making.imageAlt, variant: "fill" }],
          },
        ]}
      />
      <Services />
      <CredentialSection
        name="Section - Experience"
        title={about.experienceTitle}
        rows={about.jobs.map((job) => ({
          title: job.role,
          meta: job.company,
          year: job.period,
        }))}
      />
      <CredentialSection name="Section - Education" title={about.education.title} rows={about.education.items} />
    </>
  );
}
