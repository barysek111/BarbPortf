import { services } from "@/content/home";

export function Services() {
  return (
    <section className="section-wrap pb-section" data-name="Section - Services">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-gutter pb-header desktop:grid-cols-2">
          <div />
          <h2 className="type-h2 appear" data-appear="60">
            <span>SERVICES</span>
          </h2>
        </div>
        <div>
          {services.map((service) => (
            <div
              key={service.index}
              // Two equal halves: icon + “[01] Title” on the left, description
              // from mid-page on the right. Content vertically centred.
              className="grid grid-cols-1 items-center gap-gutter overflow-clip border-t border-muted py-24 last:border-b desktop:grid-cols-2"
            >
              <div className="flex items-center gap-gutter">
                {/* Icons from barboragadlinova.com/about — currentColor SVGs. */}
                <img
                  src={service.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-64 w-64 shrink-0 text-ink"
                  aria-hidden="true"
                />
                <p className="type-label reveal-clip">
                  <span>
                    {service.index} {service.title}
                  </span>
                </p>
              </div>
              <p className="type-label reveal-clip text-muted">
                <span>{service.description}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
