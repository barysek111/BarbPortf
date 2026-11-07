import { SectionHeading } from "@/components/ui/SectionHeading";
import { home } from "@/copy-database/home";
import { cn } from "@/lib/cn";
import { ruledRowClass } from "@/lib/ruled-row";

export function Services() {
  return (
    <section className="flex flex-col gap-36" data-name="Section - Services">
      <div className="desktop:grid desktop:grid-cols-2 desktop:gap-12">
        <div className="hidden min-w-0 desktop:block" aria-hidden="true" />
        <SectionHeading className="min-w-0 max-w-none">{home.servicesHeading}</SectionHeading>
      </div>
      <div>
        {home.services.map((service) => (
          <div
            key={service.index}
            className={cn(ruledRowClass, "appear")}
            data-appear="20"
          >
            <div className="appear-body grid grid-cols-[56px_minmax(0,1fr)] items-start gap-12 tablet:grid-cols-2">
              <div className="col-start-1 row-start-1 w-[56px] tablet:grid tablet:w-auto tablet:min-w-0 tablet:grid-cols-2 tablet:items-start tablet:gap-12">
                <div className="hidden min-w-0 flex-row items-start gap-12 tablet:flex">
                  <p className="type-label reveal-clip shrink-0 text-muted">
                    <span>{service.index}</span>
                  </p>
                  <p className="type-label reveal-clip min-w-0">
                    <span>{service.title}</span>
                  </p>
                </div>
                <img
                  src={service.icon}
                  alt={home.servicesIconAlt}
                  width={56}
                  height={56}
                  className="h-[56px] w-[56px] shrink-0 text-ink tablet:col-start-2 tablet:row-start-1 tablet:justify-self-start"
                  aria-hidden="true"
                />
              </div>
              <div className="col-start-2 row-start-1 flex min-w-0 flex-col gap-12 tablet:contents">
                <div className="flex min-w-0 flex-col items-start gap-12 tablet:hidden">
                  <p className="type-label reveal-clip shrink-0 text-muted">
                    <span>{service.index}</span>
                  </p>
                  <p className="type-label reveal-clip min-w-0">
                    <span>{service.title}</span>
                  </p>
                </div>
                <p className="type-body min-w-0 max-w-[500px] tablet:col-start-2 tablet:row-start-1">
                  <span>{service.description}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
