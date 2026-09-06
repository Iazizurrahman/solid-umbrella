import { cn } from "@/lib/utils";
import { WhatsAppSimulator } from "./WhatsAppSimulator";

/**
 * The four product-UI panels that sit beside the platform stack canvas.
 *
 * Structure and content are lifted from the Sand bundle
 * (`docs/DAITA_Sand_Site.html`) — the same tabbed component that ships the
 * "Purchase orders / Calendar / Agent" views, including its real row data,
 * column ratios, day-cell layout and message sequence.
 *
 * Colour and type are NOT Sand's. Sand is a light-themed page and its palette
 * had already been through a template pass (`{{ t0c }}` placeholders, outgoing
 * bubbles emitted as `background:#FFFFFF;color:#fff`), so every value here comes
 * from this project's tokens instead, per the rebrand brief.
 *
 * One deliberate gap: Sand encodes status as red / amber / green
 * (`#B42318`, `#B54708`, `#067647`). This design system has no status colours —
 * the only accent is the brand blue — so status is carried by emphasis instead
 * (primary > secondary > tertiary). Introducing three new colour tokens would be
 * a design-system change, not a restyle.
 *
 * The fourth panel, `chase`, has no Sand counterpart. It is built from the
 * content the rebrand brief specifies for that card (§1.4, layer 2) in the same
 * visual language as the other three.
 */

/* ── shared chrome ─────────────────────────────────────────────────────── */

const LABEL = "font-mono text-[0.625rem] leading-3 tracking-[0.1em] text-ns-content-tertiary uppercase";
const MONO = "font-mono text-[0.75rem] leading-[1.25rem] tracking-[0.02em]";
const BODY = "text-[0.875rem] leading-[1.25rem] text-ns-content-secondary";

function Panel({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[6px] border border-ns-border-secondary bg-ns-bg-glass-secondary p-6">
      {/* Sand: title 16px/600 with a mono meta line, baseline-aligned */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[1rem] leading-[1.5rem] font-semibold text-ns-content-primary">
          {title}
        </p>
        <p className={cn(MONO, "text-ns-content-tertiary")}>{meta}</p>
      </div>
      {children}
    </div>
  );
}

/* ── 1. capture — WhatsApp agent exchange ──────────────────────────────── */

const THREAD: { from: "line" | "agent"; text: string }[] = [
  { from: "line", text: "Sew update PO 4821 today 380 pcs" },
  { from: "agent", text: "Log 380 pcs sewn for PO #4821, 14 Apr? Reply Y to confirm." },
  { from: "line", text: "Y" },
  {
    from: "agent",
    text: "Logged. Sewing at 2,940 of 4,800 pcs. 3 days behind plan — finishing moved to 15 Apr.",
  },
];

export function AgentPanel() {
  return (
    <Panel title="WhatsApp agent · floor update" meta="TA · EN · HI">
      <div className="flex flex-col gap-[0.625rem]">
        {THREAD.map((m) => (
          <div
            key={m.text}
            className={cn(
              "max-w-[84%] px-3 py-[0.625rem] text-[0.875rem] leading-[1.45]",
              m.from === "line"
                ? "self-start rounded-[10px_10px_10px_3px] border border-ns-border-secondary bg-ns-bg-glass-primary text-ns-content-secondary"
                : "self-end rounded-[10px_10px_3px_10px] bg-ns-bg-inverse text-ns-content-inverse",
            )}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-ns-border-secondary pt-4 max-[479px]:grid-cols-1">
        <div className="flex flex-col gap-[0.375rem]">
          <p className={LABEL}>Written to</p>
          <p className={BODY}>PO #4821 · Sewing</p>
        </div>
        <div className="flex flex-col gap-[0.375rem]">
          <p className={LABEL}>Notified</p>
          <p className={BODY}>Merch, buying office, brand</p>
        </div>
      </div>
    </Panel>
  );
}

/* ── 2. chase — no Sand counterpart; built from the brief's §1.4 layer 2 ── */

const NUDGE_STEPS = [
  { at: "18:00", text: "#4821 · sewing update due", state: "due" },
  { at: "18:04", text: "Nudge sent", state: "sent" },
  { at: "18:21", text: "Reply logged · 380 pcs", state: "sent" },
  { at: "—", text: "Milestone closed, no chasing", state: "done" },
] as const;

export function ChasePanel() {
  return (
    <Panel title="Milestone chaser · #4821" meta="SEWING · DUE 18:00">
      <div className="flex flex-col">
        {NUDGE_STEPS.map((s, i) => (
          <div
            key={s.text}
            className={cn(
              "grid grid-cols-[3.5rem_1fr] items-center gap-3 py-[0.625rem]",
              i > 0 && "border-t border-ns-border-secondary",
            )}
          >
            <span className={cn(MONO, "text-ns-content-tertiary")}>{s.at}</span>
            <span
              className={cn(
                "text-[0.875rem] leading-[1.25rem]",
                s.state === "done"
                  ? "font-semibold text-ns-content-primary"
                  : "text-ns-content-secondary",
              )}
            >
              {s.text}
            </span>
          </div>
        ))}
      </div>
      <p className={BODY}>
        The agent asked before the merchandiser had to, and wrote the answer to
        the milestone rather than leaving it in a thread.
      </p>
    </Panel>
  );
}

/* ── 3. slip — production calendar ─────────────────────────────────────── */

type Day = { n: number; tag?: string; tone?: "plan" | "late" | "ship" };

// Sand's April grid, verbatim: 3-4 CUT, 8-9 + 12 SEW, 10-11 LATE, 15-16 FIN, 18 SHIP.
const DAYS: Day[] = [
  { n: 1 }, { n: 2 },
  { n: 3, tag: "CUT", tone: "plan" }, { n: 4, tag: "CUT", tone: "plan" },
  { n: 5 }, { n: 6 }, { n: 7 },
  { n: 8, tag: "SEW", tone: "plan" }, { n: 9, tag: "SEW", tone: "plan" },
  { n: 10, tag: "LATE", tone: "late" }, { n: 11, tag: "LATE", tone: "late" },
  { n: 12, tag: "SEW", tone: "plan" },
  { n: 13 }, { n: 14 },
  { n: 15, tag: "FIN", tone: "plan" }, { n: 16, tag: "FIN", tone: "plan" },
  { n: 17 },
  { n: 18, tag: "SHIP", tone: "ship" },
  { n: 19 }, { n: 20 }, { n: 21 },
];

export function CalendarPanel() {
  return (
    <Panel title="Production calendar · Apr" meta="CUT · SEW · FINISH · SHIP">
      <div className="flex flex-col gap-[0.3125rem]">
        <div className="grid grid-cols-7 gap-[0.3125rem] text-center">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className={cn(MONO, "text-ns-content-tertiary")}>
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[0.3125rem]">
          {DAYS.map((d) => (
            <div
              key={d.n}
              className={cn(
                "aspect-square rounded-[4px] border p-[0.3125rem] font-mono text-[0.625rem] leading-3",
                !d.tone && "border-ns-border-secondary bg-ns-bg-glass-secondary text-ns-content-tertiary",
                // border-primary, not secondary: against this cell's own 10% wash the
                // secondary border composites to the fill colour and the grid loses its
                // cell edges entirely.
                d.tone === "plan" && "border-ns-border-primary bg-ns-bg-glass-primary text-ns-content-secondary",
                // Sand uses red here; this system has no status colour, so the
                // late days carry the strongest border and weight instead.
                d.tone === "late" && "border-ns-border-hover bg-ns-bg-glass-primary font-semibold text-ns-content-primary",
                d.tone === "ship" && "border-ns-border-primary bg-ns-bg-inverse text-ns-content-inverse",
              )}
            >
              {d.n}
              {d.tag ? <span className="mt-[0.1875rem] block">{d.tag}</span> : null}
            </div>
          ))}
        </div>
      </div>
      <p className={BODY}>
        Two late sewing days on #4821 pushed finishing by 48 hours. DAITA
        reflowed the plan and held the 18 Apr ship date.
      </p>
    </Panel>
  );
}

/* ── 4. reconcile — open purchase orders table ─────────────────────────── */

const COLS = "grid grid-cols-[0.7fr_1.3fr_0.7fr_0.9fr] gap-[0.625rem]";

const ORDERS = [
  { po: "#4821", style: "Crew tee, 180 GSM", qty: "4,800", status: "Overdue 3 d", tone: "high" },
  { po: "#4834", style: "Fleece hoodie", qty: "2,200", status: "At risk", tone: "mid" },
  { po: "#4840", style: "Denim jogger", qty: "3,000", status: "On time", tone: "low" },
  { po: "#4852", style: "Rib knit polo", qty: "1,650", status: "On time", tone: "low" },
] as const;

export function OrdersPanel() {
  return (
    <Panel title="Open purchase orders" meta="14 OPEN · 3 AT RISK · 1 OVERDUE">
      <div className="overflow-hidden rounded-[6px] border border-ns-border-secondary bg-ns-bg-glass-secondary">
        {/*
          `text-ns-content-secondary`, not the tertiary the other labels use: this row
          sits on a 10% ink wash inside an already-tinted card, and tertiary measured
          4.37:1 against it under the Sand theme — just under AA for 10px type.
        */}
        <div className={cn(COLS, "bg-ns-bg-glass-primary px-3 py-[0.5625rem]", LABEL, "text-ns-content-secondary")}>
          <span>PO</span>
          <span>Style</span>
          <span>Qty</span>
          <span>Status</span>
        </div>
        {ORDERS.map((o) => (
          <div
            key={o.po}
            className={cn(
              COLS,
              "items-center border-t border-ns-border-secondary px-3 py-[0.6875rem] text-[0.75rem] leading-[1.25rem] text-ns-content-secondary",
            )}
          >
            <span className={MONO}>{o.po}</span>
            <span>{o.style}</span>
            <span className={MONO}>{o.qty}</span>
            <span
              className={cn(
                o.tone === "high" && "font-semibold text-ns-content-primary",
                o.tone === "mid" && "text-ns-content-primary",
                o.tone === "low" && "text-ns-content-tertiary",
              )}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-[0.625rem]">
        {[
          { label: "Flagged today", text: "Sewing 3 days behind on #4821 · ETD at risk" },
          { label: "Fabric", text: "Lot 18 short 400 m · substitute approved" },
        ].map((c) => (
          <div
            key={c.label}
            className="flex flex-1 basis-[190px] flex-col gap-[0.4375rem] rounded-[6px] border border-ns-border-secondary bg-ns-bg-glass-secondary p-[0.8125rem]"
          >
            <p className={LABEL}>{c.label}</p>
            <p className={BODY}>{c.text}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** The chase card's slot: the same simulator, sized for the stack column. */
function ChaseSimulatorPanel() {
  return <WhatsAppSimulator compact />;
}

/* ── keyed to the stack cards, in card order ───────────────────────────── */

/**
 * The chase card's panel is the playable WhatsApp simulator rather than the static
 * nudge timeline: chasing is the one thing on this page a visitor can actually be shown
 * doing. `ChasePanel` is kept and exported — it is the static fallback, and the
 * timeline is still the clearest picture of what the agent does unattended.
 */
export const STACK_PANELS = [
  { id: "capture", Panel: AgentPanel },
  { id: "chase", Panel: ChaseSimulatorPanel },
  { id: "slip", Panel: CalendarPanel },
  { id: "reconcile", Panel: OrdersPanel },
] as const;
