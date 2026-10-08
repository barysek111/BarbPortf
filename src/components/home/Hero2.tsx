import { Button } from "@/components/ui/Button";
import IsometricLiftCarousel from "@/components/ui/isometric-lift-carousel";
import { heroRing } from "@/content/hero-ring";

const omitted = new Set([0, 3, 5, 10, heroRing.length - 1]);

const heroItems = heroRing.flatMap((item, i) =>
  omitted.has(i) ? [] : [{ title: `Work ${String(i + 1).padStart(2, "0")}`, src: item.src, alt: item.alt }],
);

export function Hero2() {
  return (
    <section
      className="section-wrap relative h-svh overflow-clip"
      data-name="Section - Hero 2"
    >
      <div className="absolute inset-0">
        <IsometricLiftCarousel
          items={heroItems}
          height="100%"
          background="transparent"
          fontFamily="inherit"
          titles={false}
          controls={false}
          defaultIndex={4}
          ariaLabel="Latest work"
        />
      </div>

      <p className="type-label pointer-events-none absolute top-1/2 left-0 z-stack hidden -translate-y-1/2 tablet:block">
        latest work
      </p>
      <p className="type-label pointer-events-none absolute top-1/2 left-1/2 z-stack -translate-x-1/2 -translate-y-1/2 text-center tablet:left-auto tablet:right-0 tablet:translate-x-0">
        product designer
      </p>

      <div className="absolute bottom-12 left-1/2 z-stack -translate-x-1/2">
        <Button href="#latest">scroll down</Button>
      </div>
    </section>
  );
}
