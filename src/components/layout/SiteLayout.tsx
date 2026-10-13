import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SiteCursor } from "@/components/layout/SiteCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteCursor />
      <SmoothScroll>
        <Nav />
        <div className="page-inset">
          <main className="page-main">
            {children}
            <Footer />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
}
