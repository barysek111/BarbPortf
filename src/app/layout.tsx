import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
