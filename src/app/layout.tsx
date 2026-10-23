import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { global } from "@/copy-database/global";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: global.site.title,
    template: `%s${global.titleSeparator}${global.site.name}`,
  },
  description: global.site.description,
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
