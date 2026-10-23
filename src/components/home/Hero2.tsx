import { Button } from "@/components/ui/Button";
import IsometricLiftCarousel from "@/components/ui/isometric-lift-carousel";
import { home } from "@/copy-database/home";

const heroRing = home.hero.images;

const omitted = new Set([0, 3, 5, 10, heroRing.length - 1]);

const heroItems = heroRing.flatMap((item, i) =>
  omitted.has(i)
    ? []
    : [{
        title: `${home.hero.slideTitlePrefix}${String(i + 1).padStart(2, "0")}`,
        src: item.src,
        alt: item.alt,
        ratio: item.w / item.h,
      }],
);
const lastHeroItem = heroItems.pop();
if (lastHeroItem) heroItems.splice(4, 0, lastHeroItem);
const [firstHeroItem, , thirdHeroItem] = heroItems;
const heroRest = heroItems.filter((_, index) => index !== 0 && index !== 2);
heroRest.unshift(thirdHeroItem);
heroRest.splice(4, 0, firstHeroItem);
heroItems.splice(0, heroItems.length, ...heroRest);
[heroItems[1], heroItems[2]] = [heroItems[2], heroItems[1]];
[heroItems[4], heroItems[5]] = [heroItems[5], heroItems[4]];
[heroItems[5], heroItems[6]] = [heroItems[6], heroItems[5]];

export function Hero2() {
  return (
    <section
      className="relative h-svh text-paper"
      data-name="Section - Hero 2"
      data-nav-ink
      data-skip-page-top
    >
      <div className="absolute top-0 left-1/2 h-full w-screen -translate-x-1/2 overflow-hidden bg-ink">
        <IsometricLiftCarousel
          items={heroItems}
          height="100%"
          background="transparent"
          fontFamily="inherit"
          titles={false}
          controls={false}
          activateOnHover
          lift={80}
          bounce={0.25}
          duration={1.3}
          cardWidth="clamp(100px, 12vw, 140px)"
          skew={10}
          gap={-44}
          gapX={-64}
          ariaLabel={home.hero.carouselLabel}
        />
      </div>

      <p className="type-label pointer-events-none absolute top-1/2 left-0 z-stack hidden -translate-y-1/2 tablet:block">
        {home.hero.latestWork}
      </p>
      <p className="type-label pointer-events-none absolute top-1/2 left-1/2 z-stack -translate-x-1/2 -translate-y-1/2 text-center tablet:left-auto tablet:right-0 tablet:translate-x-0">
        {home.hero.role}
      </p>

      <div className="absolute bottom-12 left-1/2 z-stack -translate-x-1/2">
        <Button href="#latest">{home.hero.scrollDown}</Button>
      </div>
    </section>
  );
}
