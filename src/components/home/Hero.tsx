import { Button } from "@/components/ui/Button";
import { HeroRing } from "@/components/home/HeroRing";
import { home } from "@/copy-database/home";

export function Hero() {
  return (
    <section
      className="relative flex h-svh items-center overflow-clip"
      data-name="Section - Hero"
    >
      <div className="relative h-full w-full">
        <p className="type-label absolute top-1/2 left-0 z-stack hidden -translate-y-1/2 tablet:block">
          {home.hero.latestWork}
        </p>
        <p className="type-label absolute top-1/2 left-1/2 z-stack -translate-x-1/2 -translate-y-1/2 text-center tablet:left-auto tablet:right-0 tablet:translate-x-0">
          {home.hero.role}
        </p>

        <div className="hero-frame" data-name="3D Carousel">
          <HeroRing />
        </div>

        <div className="absolute bottom-12 left-1/2 z-stack -translate-x-1/2">
          <Button href="#latest">{home.hero.scrollDown}</Button>
        </div>
      </div>
    </section>
  );
}
