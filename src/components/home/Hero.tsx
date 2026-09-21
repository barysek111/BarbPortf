import { BracketButton } from "@/components/ui/BracketButton";
import { HeroRing } from "@/components/home/HeroRing";

export function Hero() {
  return (
    <section
      className="relative flex h-svh w-full max-w-(--container-section) items-center overflow-clip px-gutter mb-section"
      data-name="Section - Hero"
    >
      <div className="relative h-[90svh] w-full tablet:h-full">
        <p className="type-label absolute top-1/2 left-0 z-3 -translate-y-1/2">latest work</p>
        <p className="type-label absolute top-1/2 right-0 z-3 -translate-y-1/2">product designer</p>

        {/* The frame sizes the stage; the ring fills it. */}
        <div className="hero-frame" data-name="3D Carousel">
          <HeroRing />
        </div>

        <div className="absolute bottom-10 left-1/2 z-3 -translate-x-1/2">
          <BracketButton href="#latest">scroll down</BracketButton>
        </div>
      </div>
    </section>
  );
}
