import { Services } from "@/components/home/Services";
import { Chapter } from "@/components/sections/Chapter";
import { CredentialSection } from "@/components/sections/CredentialSection";
import { about } from "@/content/about";
import { education } from "@/content/education";
import { aboutMetadata } from "@/lib/page-metadata";

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <>
      <Chapter
        id="about"
        headingLevel="h1"
        className="pt-216"
        headline={about.headline}
        sections={[
          { label: about.thinking.label, paragraphs: [about.thinking.text] },
          {
            label: about.making.label,
            paragraphs: [about.making.text],
            images: [{ src: about.making.image, variant: "fill" }],
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
      <CredentialSection name="Section - Education" title={education.title} rows={education.items} />
    </>
  );
}
