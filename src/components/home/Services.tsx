import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/home";
import { cn } from "@/lib/cn";
import { ruledRowClass } from "@/lib/ruled-row";

export function Services() {
  return (
    <section className="section-wrap flex flex-col gap-36" data-name="Section - Services">
      <div className="desktop:grid desktop:grid-cols-2 desktop:gap-12">
        <div className="hidden min-w-0 desktop:block" aria-hidden="true" />
        <SectionHeading className="min-w-0 max-w-none">SERVICES</SectionHeading>
      </div>
      <div>
        {services.map((service) => (
          <div
            key={service.index}
            className={cn(
              ruledRowClass,
              "grid grid-cols-1 items-start gap-24 tablet:grid-cols-2 tablet:gap-12",
            )}
          >
            <div className="flex min-w-0 flex-row items-start gap-12 tablet:grid tablet:grid-cols-2">
              <img
                src={service.icon}
                alt=""
                width={48}
                height={48}
                className="order-1 h-[48px] w-[48px] shrink-0 text-ink tablet:col-start-2 tablet:row-start-1 tablet:justify-self-start"
                aria-hidden="true"
              />
              <div className="order-2 flex min-w-0 flex-row flex-wrap items-start gap-12 tablet:col-start-1 tablet:row-start-1">
                <p className="type-label reveal-clip min-w-0">
                  <span>{service.index}</span>
                </p>
                <p className="type-label reveal-clip min-w-0">
                  <span>{service.title}</span>
                </p>
              </div>
            </div>
            <p className="type-body appear max-w-[500px]" data-appear="60">
              <span>{service.description}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
