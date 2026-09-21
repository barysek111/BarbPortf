import { CredentialSection } from "@/components/sections/CredentialSection";
import { about } from "@/content/about";

/** Roles held, most recent first. Layout lives in CredentialSection. */
export function Experience() {
  return (
    <CredentialSection
      name="Section - Experience"
      title={about.experienceTitle}
      rows={about.jobs.map((job) => ({
        title: job.role,
        meta: job.company,
        year: job.period,
      }))}
    />
  );
}
