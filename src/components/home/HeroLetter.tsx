import { Button } from "@/components/ui/Button";
import { SplineSquare } from "@/components/spline/SplineSquare";
import { home } from "@/copy-database/home";

export function HeroLetter() {
  return (
    <section
      className="footer-bleed relative h-svh overflow-clip bg-ink text-paper"
      data-name="Section - Hero Letter"
      data-nav-ink
      data-skip-page-top
    >
      <div className="page-inset h-full">
        <div className="section-wrap relative h-full">
          <p className="type-label absolute top-1/2 left-0 z-stack hidden -translate-y-1/2 tablet:block">
            {home.hero.latestWork}
          </p>
          <p className="type-label absolute top-1/2 left-1/2 z-stack -translate-x-1/2 -translate-y-1/2 text-center tablet:left-auto tablet:right-0 tablet:translate-x-0">
            {home.hero.role}
          </p>

          <div className="hero-frame grid place-items-center">
            <SplineSquare />
          </div>

          <div className="absolute bottom-12 left-1/2 z-stack -translate-x-1/2">
            <Button href="#latest">{home.hero.scrollDown}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
