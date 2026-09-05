"use client";

import { useId, useState } from "react";

import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import {
  MinusIcon,
  PlusIcon,
} from "@/components/sites/daita/shared/icons";
import { Container } from "@/components/sites/daita/shared/layout";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Do our factories have to change how they report?",
    answer:
      "No. Supervisors keep sending WhatsApp messages, photos and voice notes the way they already do. The agent reads them, matches each one to a PO and milestone, and confirms the quantity back before writing it.",
  },
  {
    question: "Which languages does the agent handle?",
    answer:
      "Tamil, Hindi and English, including voice notes and mixed script. Additional languages are added per unit during onboarding.",
  },
  {
    question: "Does DAITA replace our ERP?",
    answer:
      "No. It sits alongside the ERP and fills the gap between the floor and the system of record. POs, styles and milestones sync both ways, so the ERP stays the book of record.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A pilot runs on one unit: open POs imported, milestones mapped to how that unit actually works, and the WhatsApp numbers connected. No migration and no change to the floor’s routine.",
  },
  {
    question: "Who can see what?",
    answer:
      "Access is set by role. A line supervisor sees their own POs, a merchandiser sees the orders they own, a buying office sees its brands, and leadership sees the unit roll-up. Brands never see another brand’s orders.",
  },
  {
    question: "How is DAITA priced?",
    answer:
      "Per active production unit, with users included. Talk to us and we’ll price the pilot against the number of POs that unit runs in a season.",
  },
];

/**
 * `[data-accordion="single"]` — the same accordion the platform stack uses.
 *
 * Reused verbatim from `PlatformStackMobileSection`'s `LayerAccordion`: the
 * `grid-template-rows: 0fr -> 1fr` height transition paired with opacity (so no
 * height is measured in JS), the 1px `border-ns-content-primary` bottom rule per
 * trigger, and the `PlusIcon` / `MinusIcon` toggle in a `w-4 flex-none` box.
 * `single` means at most one row is open; every row starts collapsed and a
 * second click on an open row re-collapses it.
 */
function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div data-accordion="single" className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = open === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} data-accordion-item="">
            <button
              type="button"
              id={triggerId}
              data-accordion-trigger=""
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 border-b border-ns-content-primary bg-transparent py-2 text-left"
            >
              <h3 className="text-[1.5rem] font-medium leading-[2rem] text-ns-content-primary max-[767px]:text-[1rem] max-[767px]:font-bold max-[767px]:leading-[1.25rem]">
                {item.question}
              </h3>
              {/* .platform-slider_accordion_plus > .plus-toggle */}
              <div className="w-4 flex-none">
                <div className="flex items-center justify-center text-ns-content-primary">
                  {isOpen ? (
                    <MinusIcon className="block w-full" />
                  ) : (
                    <PlusIcon className="block w-full" />
                  )}
                </div>
              </div>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              data-accordion-expand=""
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-[0.625rem] pt-5">
                  <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-secondary">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * "Frequently asked questions" — the section that used to carry the four-card
 * story row. DAITA has no blog, so the cards (and their artwork) are gone and
 * the slot holds an FAQ accordion instead. The section wrapper, both
 * `.section_padding` spacers, the `.body-content` heading block and
 * `.section_lines` are untouched.
 */
export function LatestStoriesSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* .section_padding (base variant: 7.5rem / 5.5rem) */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      <Container>
        <div>
          {/* .section_featured-blog */}
          <div className="flex flex-col gap-10">
            {/* .body-content > .body-content_copy > .body-content_title-wrap */}
            <div className="flex max-w-[37.75rem] flex-col gap-8 max-md:max-w-none">
              <div className="flex max-w-[37.75rem] flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-[3rem] leading-[3.25rem] font-medium text-ns-content-primary max-md:text-[2rem] max-md:leading-[2.625rem]">
                    Frequently asked questions
                  </h2>
                  <p className="text-[1rem] leading-[1.5rem] text-ns-content-secondary">
                    If yours isn’t here, write to us and we’ll answer it against
                    your own orders.
                  </p>
                </div>
              </div>
            </div>

            {/* .featured-blog_collection */}
            <div className="max-md:w-full">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </Container>

      {/* .section_padding */}
      <div className="h-[7.5rem] max-md:h-[5.5rem]" />

      {/* .section_lines */}
      <SectionLines />

      {/* .section_color */}
      <div className="absolute inset-0 -z-30 h-full w-full bg-ns-bg-primary" />
    </section>
  );
}
