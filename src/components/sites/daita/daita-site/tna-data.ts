/**
 * Sample data for the TNA Engine demo (§2.3 of docs/daita-rebrand.md).
 *
 * EVERYTHING IN THIS FILE IS FICTIONAL. The purchase orders, styles, quantities,
 * buyers, units and points of contact are invented for the demo and are labelled as
 * sample data wherever they are rendered. No real customer, order or person appears
 * here, and no claim in §0 of the rebrand brief is restated or implied.
 *
 * The grid is deterministic: it is seeded from fixed ISO dates and a fixed "as of"
 * date, never from `Date.now()`, so the server render and the client hydration agree
 * and a screenshot taken next month looks the same as one taken today.
 */

/* ── dates ─────────────────────────────────────────────────────────────────── */

/** The demo's frozen "today". Rendered in the caption so the states can be read. */
export const AS_OF = "2026-04-14";

/** Days from `a` to `b`, both `YYYY-MM-DD`. Positive means `b` is later. */
export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/** `iso` shifted by `days`, back as `YYYY-MM-DD`. */
export function addDays(iso: string, days: number): string {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** `2026-04-14` -> `14 Apr`. Day and month only; the grid never spans a year. */
export function formatDay(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]}`;
}

/** `+3d`, `-1d`, `on plan`. */
export function formatDelta(delta: number): string {
  if (delta === 0) return "on plan";
  return `${delta > 0 ? "+" : "−"}${Math.abs(delta)}d`;
}

/* ── stages ────────────────────────────────────────────────────────────────── */

export type StageId =
  | "sampling"
  | "fabric"
  | "cutting"
  | "sewing"
  | "qc"
  | "finishing"
  | "packing"
  | "shipment";

export interface Stage {
  id: StageId;
  /** Full name, used in the detail panel and as the column's accessible name. */
  label: string;
  /** Column header at grid width. */
  short: string;
  /** Baseline plan: days from the order's start date. */
  offset: number;
  /** Who has to sign the stage off, shown in the detail panel. */
  approval: string;
}

export const STAGES: readonly Stage[] = [
  { id: "sampling", label: "Sampling", short: "SAMP", offset: 0, approval: "Buyer approval" },
  { id: "fabric", label: "Fabric sourcing", short: "FABRIC", offset: 12, approval: "Merchandiser approval" },
  { id: "cutting", label: "Cutting", short: "CUT", offset: 30, approval: "Merchandiser approval" },
  { id: "sewing", label: "Sewing", short: "SEW", offset: 40, approval: "Auto-logged from WhatsApp" },
  { id: "qc", label: "Quality check", short: "QC", offset: 58, approval: "QA sign-off" },
  { id: "finishing", label: "Finishing", short: "FIN", offset: 64, approval: "Merchandiser approval" },
  { id: "packing", label: "Packing", short: "PACK", offset: 70, approval: "QA sign-off" },
  { id: "shipment", label: "Shipment", short: "SHIP", offset: 76, approval: "Buyer approval" },
];

/* ── points of contact ─────────────────────────────────────────────────────── */

export type UnitId = "Unit 1" | "Unit 2" | "Unit 3";

export const UNITS: readonly UnitId[] = ["Unit 1", "Unit 2", "Unit 3"];

/**
 * Who owns each stage at each unit. `null` is the *No POC* flag from the brief —
 * a stage nobody has been named against yet, which the grid has to show rather than
 * quietly leave blank.
 */
const POC: Record<UnitId, Record<StageId, string | null>> = {
  "Unit 1": {
    sampling: "S. Anand",
    fabric: "K. Meena",
    cutting: "R. Balan",
    sewing: "T. Vasu",
    qc: "N. Priya",
    finishing: "J. Ilango",
    packing: "R. Balan",
    shipment: "M. Selva",
  },
  "Unit 2": {
    sampling: "S. Anand",
    fabric: "K. Meena",
    cutting: "D. Arasu",
    sewing: "L. Chitra",
    qc: "N. Priya",
    finishing: null,
    packing: "V. Ganesan",
    shipment: "M. Selva",
  },
  "Unit 3": {
    sampling: "P. Kavitha",
    fabric: null,
    cutting: "D. Arasu",
    sewing: "L. Chitra",
    qc: "B. Ravi",
    finishing: "J. Ilango",
    packing: "V. Ganesan",
    shipment: "M. Selva",
  },
};

/* ── orders ────────────────────────────────────────────────────────────────── */

export interface PurchaseOrder {
  /** Display reference, e.g. `#4821`. */
  ref: string;
  style: string;
  /** Construction and weight, the way a tech pack states it. */
  fabric: string;
  qty: number;
  unit: UnitId;
  /** Sampling date. Every other planned date is this plus the stage offset. */
  start: string;
  /**
   * The last stage with a real actual against it. Everything up to and including this
   * is complete; everything after is still projected.
   */
  completedThrough: StageId | null;
  /** Day slip on completed stages. Absent means the stage landed on plan. */
  slip: Partial<Record<StageId, number>>;
}

export const ORDERS: readonly PurchaseOrder[] = [
  {
    ref: "#4821",
    style: "Crew tee, short sleeve",
    fabric: "Single jersey · 180 GSM",
    qty: 4800,
    unit: "Unit 1",
    start: "2026-01-28",
    completedThrough: "finishing",
    slip: { fabric: 2, sewing: 3, qc: 3, finishing: 2 },
  },
  {
    ref: "#4834",
    style: "Fleece hoodie, kangaroo pocket",
    fabric: "Brushed fleece · 320 GSM",
    qty: 2200,
    unit: "Unit 2",
    start: "2026-02-04",
    completedThrough: "sewing",
    slip: { cutting: 1, sewing: 4 },
  },
  {
    ref: "#4840",
    style: "Denim jogger, elastic cuff",
    fabric: "Stretch denim · 340 GSM",
    qty: 3000,
    unit: "Unit 3",
    start: "2026-02-11",
    completedThrough: "cutting",
    slip: { fabric: 6, cutting: 5 },
  },
  {
    ref: "#4852",
    style: "Rib knit polo, tipped collar",
    fabric: "Interlock rib · 220 GSM",
    qty: 1650,
    unit: "Unit 1",
    start: "2026-02-18",
    completedThrough: "cutting",
    slip: {},
  },
  {
    ref: "#4907",
    style: "Jersey midi dress",
    fabric: "Viscose jersey · 160 GSM",
    qty: 2750,
    unit: "Unit 2",
    start: "2026-02-25",
    completedThrough: "fabric",
    slip: { fabric: 1 },
  },
  {
    ref: "#5033",
    style: "Twill cargo short",
    fabric: "Cotton twill · 260 GSM",
    qty: 3400,
    unit: "Unit 3",
    start: "2026-03-04",
    completedThrough: "sampling",
    slip: { sampling: 2 },
  },
];

/* ── derived cell state ────────────────────────────────────────────────────── */

/**
 * The five states the brief asks for. `noPoc` is orthogonal in the data model — a stage
 * can be both unowned and overdue — but the grid gives it precedence on incomplete
 * cells, because "nobody owns this" is the thing to fix first.
 */
export type CellState = "complete" | "overdue" | "dueSoon" | "onTrack" | "noPoc";

export interface Cell {
  poRef: string;
  stage: StageId;
  planned: string;
  /** `null` until the stage is signed off. */
  actual: string | null;
  /** Signed days. On completed cells this is actual − planned; otherwise projected. */
  delta: number;
  /** True when `delta` is a forecast rather than a recorded fact. */
  projected: boolean;
  /** Days past the projected finish, on overdue cells only. Zero everywhere else. */
  lateBy: number;
  owner: string | null;
  approval: string;
  state: CellState;
}

/** How many days out from `AS_OF` still counts as "due soon" rather than "on track". */
const DUE_SOON_WINDOW = 7;

/**
 * Build one order's row of cells.
 *
 * `reflow` carries per-stage day shifts applied on top of the baseline plan — this is
 * how "mark complete" moves the downstream dates, and how the WhatsApp simulator's
 * logged quantity reaches the grid. It is kept out of the seed data so the sample set
 * stays the fixed starting point a Reset can return to.
 */
export function buildRow(
  order: PurchaseOrder,
  reflow: Partial<Record<StageId, number>> = {},
  completedOverride: Partial<Record<StageId, string>> = {},
  asOf: string = AS_OF,
): Cell[] {
  const completedIndex = order.completedThrough
    ? STAGES.findIndex((s) => s.id === order.completedThrough)
    : -1;

  // The worst slip seen so far is what a merchandiser carries forward as the forecast
  // for every stage still to come.
  let carried = 0;

  return STAGES.map((stage, index) => {
    const shift = reflow[stage.id] ?? 0;
    const planned = addDays(order.start, stage.offset + shift);

    const forced = completedOverride[stage.id];
    const seededComplete = index <= completedIndex;
    const isComplete = Boolean(forced) || seededComplete;

    let actual: string | null = null;
    if (forced) {
      actual = forced;
    } else if (seededComplete) {
      actual = addDays(planned, order.slip[stage.id] ?? 0);
    }

    let delta: number;
    let projected: boolean;
    if (actual) {
      delta = daysBetween(planned, actual);
      carried = Math.max(carried, delta);
      projected = false;
    } else {
      delta = carried;
      projected = true;
    }

    const owner = POC[order.unit][stage.id];

    const runsTo = addDays(planned, Math.max(0, delta));
    const daysOut = daysBetween(asOf, runsTo);

    let state: CellState;
    if (isComplete) {
      state = "complete";
    } else if (owner === null) {
      state = "noPoc";
    } else if (daysOut < 0) {
      state = "overdue";
    } else if (daysOut <= DUE_SOON_WINDOW) {
      state = "dueSoon";
    } else {
      state = "onTrack";
    }

    return {
      poRef: order.ref,
      stage: stage.id,
      planned,
      actual,
      delta,
      projected,
      lateBy: isComplete ? 0 : Math.max(0, -daysOut),
      owner,
      approval: stage.approval,
      state,
    };
  });
}

/* ── saved views ───────────────────────────────────────────────────────────── */

export interface SavedView {
  id: string;
  label: string;
  /** Blurb shown beside the selector so the view's rule is legible, not magic. */
  rule: string;
  unit: UnitId | "all";
  grouped: boolean;
  /** Keep only orders with at least one cell in one of these states. */
  states: readonly CellState[] | null;
}

export const SAVED_VIEWS: readonly SavedView[] = [
  {
    id: "all-open",
    label: "All open orders",
    rule: "Every order, flat.",
    unit: "all",
    grouped: false,
    states: null,
  },
  {
    id: "at-risk",
    label: "At risk this week",
    rule: "Orders with an overdue or due-soon stage.",
    unit: "all",
    grouped: false,
    states: ["overdue", "dueSoon"],
  },
  {
    id: "unowned",
    label: "Unowned stages",
    rule: "Orders with a stage nobody owns.",
    unit: "all",
    grouped: false,
    states: ["noPoc"],
  },
  {
    id: "by-unit",
    label: "By unit",
    rule: "Every order, grouped by production unit.",
    unit: "all",
    grouped: true,
    states: null,
  },
];
