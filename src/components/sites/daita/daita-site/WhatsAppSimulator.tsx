"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import { MULTILINGUAL } from "@/components/sites/daita/shared/typography";
import { useTnaOptional } from "./TnaProvider";
import { AS_OF, SIM, SIM_REMAINING, formatDay } from "./tna-data";

/**
 * WhatsApp agent simulator — the "never chase a status again" card, playable.
 *
 * SAMPLE DATA. The order, quantities and thread are fictional and labelled as such.
 *
 * The visitor plays the line supervisor at Unit 3. The agent's evening nudge is already
 * in the thread; they report a quantity, the agent reads it back and asks for a Y, and
 * the confirmed reply is written to the milestone. Five messages end to end.
 *
 * Where the TNA grid is on the same page the two share a `TnaProvider`, so confirming
 * here closes `#4840 · Sewing` in the grid and reflows everything downstream. Inside the
 * platform stack there is no provider and no grid; `useTnaOptional` is what lets the
 * same component render in both places.
 *
 * The nudge is trilingual because the group is: a Tiruppur sewing floor runs in Tamil,
 * a migrant line in Hindi, and the merchandising desk in English. Those runs use the
 * Noto faces loaded for exactly this purpose — see `MULTILINGUAL`.
 */

type Step = "await-qty" | "await-confirm" | "closed" | "logged";

interface Message {
  from: "agent" | "you";
  /** Rendered with the Indic-capable stack when true. */
  multilingual?: boolean;
  text: string;
}

const LABEL = "text-[0.625rem] leading-3 font-semibold uppercase tracking-[0.08em]";
const MONO_TINY = "font-mono text-[0.625rem] leading-3 tracking-[0.06em]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-border-hover";

const NUDGE: Message = {
  from: "agent",
  multilingual: true,
  text: `${SIM.poRef} · Sewing was due 23 Mar and is still open. இன்று எத்தனை பீஸ் தைச்சீங்க? · आज कितने पीस सिले?`,
};

function buildThread(step: Step, qty: number): Message[] {
  const thread: Message[] = [NUDGE];
  if (step === "await-qty") return thread;

  const cumulative = SIM.sewnToDate + qty;
  const closes = cumulative >= SIM.total;

  thread.push({ from: "you", text: `${qty}` });
  thread.push({
    from: "agent",
    multilingual: true,
    text: closes
      ? `${qty} pcs on ${formatDay(AS_OF)} → ${cumulative.toLocaleString("en-GB")} of ${SIM.total.toLocaleString("en-GB")} sewn. That closes the milestone. சரியா? Reply Y.`
      : `${qty} pcs on ${formatDay(AS_OF)} → ${cumulative.toLocaleString("en-GB")} of ${SIM.total.toLocaleString("en-GB")} sewn, ${(SIM.total - cumulative).toLocaleString("en-GB")} still to go. சரியா? Reply Y to log it.`,
  });
  if (step === "await-confirm") return thread;

  thread.push({ from: "you", text: "Y" });
  thread.push({
    from: "agent",
    multilingual: true,
    text: closes
      ? `Logged. सिलाई पूरी. Sewing closed on ${formatDay(AS_OF)}. Finishing, packing and shipment moved with it, and the merchandiser has the new dates.`
      : `Logged against ${SIM.poRef} · Sewing. सिलाई जारी. I'll ask again tomorrow at 18:00 and flag it if nothing comes back.`,
  });
  return thread;
}

export interface WhatsAppSimulatorProps {
  /** Compact drops the surrounding copy so the frame fits the platform stack column. */
  compact?: boolean;
}

export function WhatsAppSimulator({ compact = false }: WhatsAppSimulatorProps = {}) {
  const tna = useTnaOptional();
  const baseId = useId();
  const inputId = `${baseId}-qty`;

  const [step, setStep] = useState<Step>("await-qty");
  const [qty, setQty] = useState<number>(SIM_REMAINING);
  const [draft, setDraft] = useState<string>(String(SIM_REMAINING));
  const composerRef = useRef<HTMLInputElement>(null);

  const thread = useMemo(() => buildThread(step, qty), [step, qty]);
  const closes = SIM.sewnToDate + qty >= SIM.total;

  const sendQty = useCallback(() => {
    const parsed = Number.parseInt(draft, 10);
    if (!Number.isFinite(parsed)) return;
    const clamped = Math.max(1, Math.min(SIM_REMAINING, parsed));
    setQty(clamped);
    setDraft(String(clamped));
    setStep("await-confirm");
  }, [draft]);

  const sendYes = useCallback(() => {
    const cumulative = SIM.sewnToDate + qty;
    if (cumulative >= SIM.total) {
      setStep("closed");
      tna?.markComplete({
        poRef: SIM.poRef,
        stage: SIM.stage,
        source: "whatsapp",
        detail: `${qty} pcs reported from ${SIM.unit}`,
      });
    } else {
      setStep("logged");
      tna?.note({
        poRef: SIM.poRef,
        stage: SIM.stage,
        source: "whatsapp",
        text: `${SIM.poRef} · Sewing · ${qty} pcs logged · ${(SIM.total - cumulative).toLocaleString("en-GB")} still to sew, milestone stays open`,
      });
    }
  }, [qty, tna]);

  const reset = useCallback(() => {
    setStep("await-qty");
    setQty(SIM_REMAINING);
    setDraft(String(SIM_REMAINING));
    tna?.reset();
    composerRef.current?.focus();
  }, [tna]);

  const done = step === "closed" || step === "logged";

  return (
    <div className={cn("flex flex-col gap-4", compact ? "max-w-[22rem]" : "w-full")}>
      {/* Phone frame — a bezel and a screen, both from the existing surface tokens. */}
      <div className="rounded-[24px] border border-ns-border-primary bg-ns-bg-secondary p-2">
        <div className="flex flex-col overflow-hidden rounded-[18px] border border-ns-border-secondary bg-ns-bg-primary">
          {/* Thread header */}
          <div className="flex items-center gap-3 border-b border-ns-border-secondary bg-ns-bg-glass-secondary px-4 py-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ns-border-primary bg-ns-bg-glass-primary font-mono text-[0.625rem] text-ns-content-primary"
            >
              U3
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[0.875rem] leading-[1.25rem] text-ns-content-primary">
                {SIM.poRef} · {SIM.unit} · Sewing
              </span>
              <span className={cn(MONO_TINY, "text-ns-content-tertiary")}>
                DAITA agent · 4 members
              </span>
            </span>
          </div>

          {/*
            Fixed minimum height for the full five-message transcript. Inside the
            platform stack the panels are cross-faded in a shared grid cell, so a
            transcript that grew as the visitor played would reflow the whole column.
          */}
          <ol
            role="list"
            aria-live="polite"
            aria-label="Sample WhatsApp thread"
            className="flex min-h-[20rem] flex-col justify-end gap-[0.375rem] p-3"
          >
            {thread.map((message, index) => (
              <li
                key={`${index}-${message.text.slice(0, 12)}`}
                className={cn(
                  "max-w-[86%] px-3 py-2 text-[0.8125rem] leading-[1.25rem]",
                  message.multilingual && MULTILINGUAL,
                  message.from === "agent"
                    ? "self-start rounded-[10px_10px_10px_3px] border border-ns-border-secondary bg-ns-bg-glass-primary text-ns-content-secondary"
                    : "self-end rounded-[10px_10px_3px_10px] bg-ns-bg-inverse text-ns-content-inverse",
                )}
              >
                <span className="sr-only">
                  {message.from === "agent" ? "DAITA agent: " : "You: "}
                </span>
                {message.text}
              </li>
            ))}
          </ol>

          {/* Composer — one control per step, so there is never a wrong thing to press. */}
          <div className="flex flex-wrap items-center gap-2 border-t border-ns-border-secondary bg-ns-bg-glass-secondary p-3">
            {step === "await-qty" ? (
              <>
                <label htmlFor={inputId} className="sr-only">
                  Pieces sewn today, up to {SIM_REMAINING}
                </label>
                <input
                  id={inputId}
                  ref={composerRef}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={SIM_REMAINING}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      sendQty();
                    }
                  }}
                  className={cn(
                    "h-8 w-24 rounded-[4px] border border-ns-border-primary bg-transparent px-3 font-mono text-[0.875rem] leading-[1.25rem] text-ns-content-primary",
                    FOCUS,
                  )}
                />
                <button
                  type="button"
                  onClick={sendQty}
                  className={cn(
                    "flex h-8 items-center rounded-[4px] bg-ns-bg-inverse px-4 font-mono text-[0.75rem] leading-[1.25rem] text-ns-content-inverse transition-opacity duration-200 hover:opacity-90",
                    FOCUS,
                  )}
                >
                  Send
                </button>
                <span className={cn(MONO_TINY, "text-ns-content-tertiary")}>
                  {SIM_REMAINING} pcs left to sew
                </span>
              </>
            ) : null}

            {step === "await-confirm" ? (
              <>
                <button
                  type="button"
                  onClick={sendYes}
                  className={cn(
                    "flex h-8 items-center rounded-[4px] bg-ns-bg-inverse px-4 font-mono text-[0.75rem] leading-[1.25rem] text-ns-content-inverse transition-opacity duration-200 hover:opacity-90",
                    FOCUS,
                  )}
                >
                  Reply Y
                </button>
                <button
                  type="button"
                  onClick={() => setStep("await-qty")}
                  className={cn(
                    "flex h-8 items-center rounded-[4px] border border-ns-border-secondary px-4 font-mono text-[0.75rem] leading-[1.25rem] text-ns-content-secondary transition-colors duration-200 hover:border-ns-border-hover hover:text-ns-content-primary",
                    FOCUS,
                  )}
                >
                  Change the number
                </button>
              </>
            ) : null}

            {done ? (
              <>
                <span className={cn(MONO_TINY, "text-ns-content-secondary")}>
                  {step === "closed"
                    ? `Milestone closed${tna ? " · grid updated" : ""}`
                    : "Update logged · milestone still open"}
                </span>
                <button
                  type="button"
                  onClick={reset}
                  className={cn(
                    "ml-auto flex h-8 items-center rounded-[4px] border border-ns-border-secondary px-4 font-mono text-[0.75rem] leading-[1.25rem] text-ns-content-secondary transition-colors duration-200 hover:border-ns-border-hover hover:text-ns-content-primary",
                    FOCUS,
                  )}
                >
                  Start over
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            LABEL,
            "rounded-[4px] border border-ns-border-primary bg-ns-bg-glass-primary px-2 py-1 text-ns-content-primary",
          )}
        >
          Sample data
        </span>
        <p className={cn(MONO_TINY, "text-ns-content-tertiary")}>
          Fictional order and thread · you are the line supervisor
          {closes ? "" : " · partial reports keep the milestone open"}
        </p>
      </div>
    </div>
  );
}

/* ── the /platform section wrapper ─────────────────────────────────────────── */

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

const BEATS: readonly { lead: string; text: string }[] = [
  {
    lead: "The agent asks first.",
    text: "A milestone with no update by its cut-off gets a nudge in the group it already lives in, in the language that group speaks.",
  },
  {
    lead: "A number, not a conversation.",
    text: "The reply is read back for confirmation before anything is written, so a mistyped figure never becomes a record.",
  },
  {
    lead: "The confirmation is the record.",
    text: "Y writes the quantity to the milestone, closes it if the order is complete, and moves every downstream date with it.",
  },
];

/**
 * The same simulator on `/platform`, beside the three beats it demonstrates. Placed
 * inside the TNA Engine's provider so a confirmed reply closes the stage in the grid
 * further up the page.
 */
export function WhatsAppSimulatorSection() {
  return (
    <section className="relative isolate bg-ns-bg-secondary">
      <SectionPadding />

      <Container>
        <div className="flex flex-col gap-10 max-[767px]:gap-8">
          <div className="flex max-w-[37.75rem] flex-col gap-6">
            <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
              Never chase a status again
            </h2>
            <div className="text-ns-content-secondary">
              <p>
                Play the line supervisor. The evening nudge is already in the group;
                report the pieces sewn and confirm, and watch the milestone close in the
                grid above.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,22rem)_minmax(0,1fr)] items-start gap-10 max-[991px]:grid-cols-1 max-[991px]:gap-8">
            <WhatsAppSimulator />

            <ol role="list" className="flex max-w-[37.75rem] flex-col gap-6">
              {BEATS.map((beat, index) => (
                <li key={beat.lead} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      MONO_TINY,
                      "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ns-border-primary text-ns-content-tertiary",
                    )}
                  >
                    {index + 1}
                  </span>
                  <p className="text-ns-content-secondary">
                    <span className="text-ns-content-primary">{beat.lead}</span>{" "}
                    {beat.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}
