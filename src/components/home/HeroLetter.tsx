import { Button } from "@/components/ui/Button";
import { MorphingLabel } from "@/components/ui/MorphingLabel";
import { SplineSquare } from "@/components/spline/SplineSquare";
import { home } from "@/copy-database/home";

export function HeroLetter() {
  return (
    <section
      className="footer-bleed relative h-svh overflow-clip bg-ink text-paper"
      data-name="Section - Hero Letter"
      data-skip-page-top
    >
      <div className="page-inset h-full">
        <div className="section-wrap relative h-full">
          <MorphingLabel className="absolute bottom-[calc(50%+25vh)] left-1/2 z-stack -translate-x-1/2 text-center tablet:top-1/2 tablet:bottom-auto tablet:left-0 tablet:translate-x-0 tablet:-translate-y-1/2" />
          <p className="type-label absolute top-[calc(50%+25vh)] left-1/2 z-stack -translate-x-1/2 text-center tablet:top-1/2 tablet:right-0 tablet:left-auto tablet:translate-x-0 tablet:-translate-y-1/2">
            {home.hero.role}
          </p>

          <div className="hero-frame grid place-items-center">
            <SplineSquare />
          </div>

          <div className="absolute bottom-24 left-1/2 z-stack -translate-x-1/2">
            <Button href="#latest">{home.hero.scrollDown}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
