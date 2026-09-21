import { CredentialSection } from "@/components/sections/CredentialSection";
import { education } from "@/content/education";

/** Courses, certificates and degrees. Layout lives in CredentialSection. */
export function Education() {
  return (
    <CredentialSection
      name="Section - Education"
      title={education.title}
      rows={education.items}
    />
  );
}
