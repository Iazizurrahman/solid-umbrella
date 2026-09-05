import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";

/**
 * Blocked pending written sign-off from Estee Exports for the name, the quote and both
 * figures. Until that lands this section renders nothing — flip this one constant to
 * true when sign-off is held. Do not substitute a different quote, an unattributed one,
 * or a second invented card to fill the row.
 */
const TESTIMONIAL_SIGNED_OFF = false;

/** The single testimonial. There is no second one — do not invent one. */
const TESTIMONIAL = {
  name: "Mr. Thirukkumaran",
  role: "CEO, Estee Exports · Tiruppur",
  quote:
    "They didn't sell from a distance. They moved to Tiruppur and stayed. This product was built here, with our people, on our real problems. That's why it works.",
};

/**
 * The only two statistics permitted anywhere on the site, and this is the only place
 * they may appear. Do not add a third.
 */
const STATS = [
  { label: "Lead time", value: "85 → 75 days" },
  { label: "On-time shipment", value: "90% → 94%" },
];

/**
 * "Testimonials" — `.section_testimonials`.
 *
 * Previously a carousel of three cards. With a single testimonial the carousel
 * mechanics (scroll-snap track, prev/next navigation, slide-width maths) have no work
 * to do, so the card is rendered once, centred, in the same `.testimonials_card`
 * styling. The section wrapper, heading and padding are unchanged.
 */
export function TestimonialsSection() {
  if (!TESTIMONIAL_SIGNED_OFF) return null;

  return (
    /* .section (overflow variant) */
    <section className="relative isolate overflow-hidden">
      {/* .section_padding */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      <Container>
        <div>
          {/* .section_testimonials */}
          <div className="flex flex-col items-start justify-start gap-[4.5rem] max-md:gap-8">
            {/* .body-content > .body-content_copy > .body-content_title-wrap */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-md:max-w-none">
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] leading-[3.25rem] font-medium text-ns-content-primary max-md:text-[2rem] max-md:leading-[2.625rem]">
                    Testimonials
                  </h2>
                </div>
              </div>
            </div>

            {/* The single card, centred, plus the stat strip beneath it. */}
            <div className="flex w-full justify-center">
              <div className="flex w-full max-w-[37.75rem] flex-col gap-8">
                {/* .testimonials_card */}
                <div className="flex h-full min-h-[25rem] flex-col justify-between gap-20 rounded-[8px] border border-ns-border-secondary bg-ns-bg-glass-deep-blue p-6 max-md:gap-15 max-md:p-4">
                  {/* .testimonials_card_top */}
                  <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start max-md:gap-2.5">
                    {/* .testimonials_card_person */}
                    <div className="flex flex-col items-start justify-start gap-4">
                      {/* .testimonials_card_name-wrap */}
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[1rem] leading-[1.25rem] font-bold">
                          {TESTIMONIAL.name}
                        </h3>
                        {/* .testimonias_card_position */}
                        <div className="opacity-30">
                          <div className="text-[0.875rem] leading-[1.25rem]">
                            {TESTIMONIAL.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* .testimonials_card_bottom */}
                  <div className="flex gap-4 text-ns-content-primary max-md:flex-col max-md:gap-2.5">
                    <div className="text-[1rem] leading-[1.5rem]">
                      {TESTIMONIAL.quote}
                    </div>
                  </div>
                </div>

                {/* Stat strip */}
                <div className="flex flex-col gap-4">
                  <div className="flex gap-10 max-md:flex-col max-md:gap-4">
                    {STATS.map((stat) => (
                      <div key={stat.label} className="flex flex-col gap-1">
                        <div className="text-[0.625rem] leading-3 font-semibold text-ns-content-tertiary uppercase">
                          {stat.label}
                        </div>
                        <div className="font-mono text-[1rem] leading-[1.25rem] tracking-[0.02em] text-ns-content-primary">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Caption — same treatment as the card's position line. */}
                  <div className="opacity-30">
                    <div className="text-[0.875rem] leading-[1.25rem]">
                      Estee Exports merchandising team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* .section_padding */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      {/* .section_lines */}
      <SectionLines />

      {/* .section_color (secondary variant) */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-ns-bg-secondary" />
    </section>
  );
}
