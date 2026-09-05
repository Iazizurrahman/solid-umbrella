"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/sites/daita/shared/layout";
import { SectionLines } from "@/components/sites/daita/shared/SectionLines";
import { useTna } from "./TnaProvider";
import {
  AS_OF,
  SAVED_VIEWS,
  STAGES,
  UNITS,
  formatDay,
  formatDelta,
  type Cell,
  type CellState,
  type PurchaseOrder,
  type SavedView,
  type StageId,
  type UnitId,
} from "./tna-data";

/**
 * TNA Engine — the order × stage grid from §2.3, built as a working demo rather than
 * a picture of one.
 *
 * SAMPLE DATA. Every order, style, quantity and name in this grid is fictional and is
 * labelled as such on screen. Nothing here is a customer, an outcome or a metric.
 *
 * STATE COLOUR — the brief asks for five states drawn from the existing semantic
 * tokens. The palette has no dedicated status ramp, so the five states are carried by
 * the tokens that already exist for the job (`glass-green`, `glass-orange`,
 * `destructive`, the glass fills and the border set) and never by colour alone: each
 * state also has its own glyph, its own border treatment, and a full sentence in the
 * cell's accessible name. No new token was added.
 */

/* ── state presentation ────────────────────────────────────────────────────── */

interface StateStyle {
  label: string;
  /** Carried alongside colour so the grid survives greyscale and colour blindness. */
  glyph: string;
  cell: string;
}

const STATE: Record<CellState, StateStyle> = {
  complete: {
    label: "Complete",
    glyph: "✓",
    cell: "border-ns-border-secondary bg-ns-bg-glass-green text-ns-content-tertiary",
  },
  onTrack: {
    label: "On track",
    glyph: "·",
    cell: "border-ns-border-secondary bg-ns-bg-glass-secondary text-ns-content-secondary",
  },
  dueSoon: {
    label: "Due soon",
    glyph: "!",
    cell: "border-ns-border-hover bg-ns-bg-glass-orange text-ns-content-primary",
  },
  overdue: {
    label: "Overdue",
    glyph: "▲",
    cell: "border-destructive/50 bg-destructive/15 text-destructive",
  },
  noPoc: {
    label: "No POC",
    glyph: "?",
    cell: "border-dashed border-ns-border-primary bg-ns-bg-glass-secondary text-ns-content-tertiary",
  },
};

const STATE_ORDER: readonly CellState[] = ["complete", "onTrack", "dueSoon", "overdue", "noPoc"];

/* ── shared type ───────────────────────────────────────────────────────────── */

const LABEL = "text-[0.625rem] leading-3 font-semibold uppercase tracking-[0.08em]";
const MONO = "font-mono text-[0.75rem] leading-[1.125rem] tracking-[0.02em]";
const MONO_TINY = "font-mono text-[0.625rem] leading-3 tracking-[0.06em]";

/** Focus ring used on every interactive part of the demo, so the token stays in one place. */
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ns-border-hover";

const CONTROL =
  "flex h-8 items-center rounded-[4px] border border-ns-border-secondary bg-ns-bg-glass-secondary px-[0.625rem] font-mono text-[0.625rem] leading-3 uppercase tracking-[0.08em] text-ns-content-secondary transition-colors duration-200 hover:border-ns-border-hover hover:text-ns-content-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ns-border-secondary disabled:hover:text-ns-content-secondary";

const CONTROL_ON =
  "border-ns-border-hover bg-ns-bg-glass-primary text-ns-content-primary";

/* ── the section ───────────────────────────────────────────────────────────── */

/** `.section_padding` — 7.5rem, 5.5rem at <=767px. */
function SectionPadding() {
  return <div className="h-[7.5rem] max-[767px]:h-[5.5rem]" aria-hidden="true" />;
}

export interface TnaEngineSectionProps {
  heading?: string;
  subheading?: string;
}

export function TnaEngineSection({
  heading = "TNA Engine",
  subheading = "Every open order against every stage, with planned, actual and delta side by side. Open a cell to see who owns it and how it is signed off; close a stage and the rest of the plan moves with it.",
}: TnaEngineSectionProps = {}) {
  const { rows, changes, dirty, markComplete, reset } = useTna();
  const baseId = useId();

  const [viewId, setViewId] = useState<string>(SAVED_VIEWS[0].id);
  const [unit, setUnit] = useState<UnitId | "all">(SAVED_VIEWS[0].unit);
  const [grouped, setGrouped] = useState<boolean>(SAVED_VIEWS[0].grouped);
  const [states, setStates] = useState<readonly CellState[] | null>(SAVED_VIEWS[0].states);
  /** Set once the visitor changes a control by hand, so the selector stops lying. */
  const [custom, setCustom] = useState(false);

  const [hoverRef, setHoverRef] = useState<string | null>(null);
  const [openCell, setOpenCell] = useState<{ poRef: string; stage: StageId } | null>(null);
  const [focusPos, setFocusPos] = useState<{ row: number; col: number }>({ row: 0, col: 0 });

  const cellRefs = useRef(new Map<string, HTMLDivElement>());
  const returnFocusTo = useRef<string | null>(null);

  const applyView = useCallback((view: SavedView) => {
    setViewId(view.id);
    setUnit(view.unit);
    setGrouped(view.grouped);
    setStates(view.states);
    setCustom(false);
  }, []);

  /* Rows surviving the current filters, flattened in render order. */
  const visible = useMemo(() => {
    let list = rows;
    if (unit !== "all") list = list.filter((r) => r.order.unit === unit);
    if (states) {
      const wanted = new Set(states);
      list = list.filter((r) => r.cells.some((c) => wanted.has(c.state)));
    }
    if (grouped) {
      const order = new Map(UNITS.map((u, i) => [u, i]));
      list = [...list].sort(
        (a, b) => (order.get(a.order.unit) ?? 0) - (order.get(b.order.unit) ?? 0),
      );
    }
    return list;
  }, [rows, unit, states, grouped]);

  /*
   * The stored position is clamped at render rather than corrected in an effect: a
   * filter can shorten the grid under the cursor, and re-deriving is both cheaper and
   * one render fewer than writing the correction back into state.
   */
  const focus = useMemo(
    () => ({ row: Math.min(focusPos.row, Math.max(0, visible.length - 1)), col: focusPos.col }),
    [focusPos, visible.length],
  );

  const key = (row: number, col: number) => `${row}:${col}`;

  const focusAt = useCallback((row: number, col: number) => {
    setFocusPos({ row, col });
    cellRefs.current.get(key(row, col))?.focus();
  }, []);

  const closeDetail = useCallback(() => {
    setOpenCell(null);
    const back = returnFocusTo.current;
    returnFocusTo.current = null;
    if (back) cellRefs.current.get(back)?.focus();
  }, []);

  const openAt = useCallback(
    (row: number, col: number) => {
      const target = visible[row];
      if (!target) return;
      returnFocusTo.current = key(row, col);
      setOpenCell({ poRef: target.order.ref, stage: STAGES[col].id });
    },
    [visible],
  );

  const onGridKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { row, col } = focus;
      const last = visible.length - 1;
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          focusAt(row, Math.min(STAGES.length - 1, col + 1));
          break;
        case "ArrowLeft":
          event.preventDefault();
          focusAt(row, Math.max(0, col - 1));
          break;
        case "ArrowDown":
          event.preventDefault();
          focusAt(Math.min(last, row + 1), col);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusAt(Math.max(0, row - 1), col);
          break;
        case "Home":
          event.preventDefault();
          focusAt(event.ctrlKey ? 0 : row, 0);
          break;
        case "End":
          event.preventDefault();
          focusAt(event.ctrlKey ? last : row, STAGES.length - 1);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          openAt(row, col);
          break;
        case "Escape":
          if (openCell) {
            event.preventDefault();
            closeDetail();
          }
          break;
        default:
          break;
      }
    },
    [focus, visible.length, focusAt, openAt, openCell, closeDetail],
  );

  /* Escape has to work from inside the detail panel too, not only from the grid. */
  useEffect(() => {
    if (!openCell) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDetail();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openCell, closeDetail]);

  const detail = useMemo(() => {
    if (!openCell) return null;
    const row = rows.find((r) => r.order.ref === openCell.poRef);
    const cell = row?.cells.find((c) => c.stage === openCell.stage);
    const stage = STAGES.find((s) => s.id === openCell.stage);
    if (!row || !cell || !stage) return null;
    return { order: row.order, cell, stage };
  }, [openCell, rows]);

  const selectId = `${baseId}-view`;
  const gridId = `${baseId}-grid`;
  const detailId = `${baseId}-detail`;

  return (
    <section className="relative isolate bg-ns-bg-primary">
      <SectionPadding />

      <Container>
        <div className="flex flex-col gap-10 max-[767px]:gap-8">
          {/* .body-content — the standard section head, unchanged. */}
          <div className="flex max-w-[37.75rem] flex-col gap-6">
            <h2 className="text-[3rem] font-medium leading-[3.25rem] text-ns-content-primary max-[767px]:text-[2rem] max-[767px]:leading-[2.625rem]">
              {heading}
            </h2>
            <div className="text-ns-content-secondary">
              <p>{subheading}</p>
            </div>
          </div>

          <SampleDataBanner />

          {/* Toolbar */}
          <div className="flex flex-wrap items-end gap-x-8 gap-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor={selectId} className={cn(LABEL, "text-ns-content-tertiary")}>
                Saved view
              </label>
              <select
                id={selectId}
                value={custom ? "custom" : viewId}
                onChange={(event) => {
                  const next = SAVED_VIEWS.find((v) => v.id === event.target.value);
                  if (next) applyView(next);
                }}
                className={cn(CONTROL, FOCUS, "pr-6")}
              >
                {SAVED_VIEWS.map((view) => (
                  <option key={view.id} value={view.id}>
                    {view.label}
                  </option>
                ))}
                {custom ? <option value="custom">Custom</option> : null}
              </select>
              <p className={cn(MONO_TINY, "text-ns-content-tertiary")}>
                {custom
                  ? "Filters changed by hand."
                  : SAVED_VIEWS.find((v) => v.id === viewId)?.rule}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className={cn(LABEL, "text-ns-content-tertiary")} id={`${baseId}-unit`}>
                Unit
              </span>
              <div className="flex flex-wrap gap-2" role="group" aria-labelledby={`${baseId}-unit`}>
                {(["all", ...UNITS] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={unit === option}
                    onClick={() => {
                      setUnit(option);
                      setCustom(true);
                    }}
                    className={cn(CONTROL, FOCUS, unit === option && CONTROL_ON)}
                  >
                    {option === "all" ? "All" : option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-pressed={grouped}
                onClick={() => {
                  setGrouped((g) => !g);
                  setCustom(true);
                }}
                className={cn(CONTROL, FOCUS, grouped && CONTROL_ON)}
              >
                Group by unit
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  applyView(SAVED_VIEWS[0]);
                  setOpenCell(null);
                }}
                disabled={!dirty}
                className={cn(CONTROL, FOCUS)}
              >
                Reset demo
              </button>
            </div>
          </div>

          <Legend />

          {/*
            The grid scrolls inside its own box; the page never scrolls sideways.
            `relative` is load-bearing: the column headers carry `sr-only` spans, which
            are absolutely positioned, so without a positioned scroll container they
            resolve against the section instead and escape the clip, widening the
            document by the full grid width at mobile sizes.

            The scroller deliberately does NOT bleed to the viewport edge. Matching
            `.ns-padding-global` with a negative margin needs a `max-[767px]` variant,
            which Tailwind compiles to `min-width: 767px` and so fires one pixel later
            than the stylesheet's `max-width: 767px` — leaving a 4px horizontal overflow
            at exactly 767. Staying inside the container removes the coupling entirely.
          */}
          <div className="relative overflow-x-auto">
            <div
              id={gridId}
              role="grid"
              aria-label="Sample purchase orders by production stage"
              aria-rowcount={visible.length + 1}
              aria-colcount={STAGES.length + 1}
              onKeyDown={onGridKeyDown}
              className="grid min-w-[62rem] grid-cols-[minmax(12rem,1.5fr)_repeat(8,minmax(5.5rem,1fr))] gap-[0.1875rem]"
            >
              {/* Header row */}
              <div role="row" className="contents">
                <div
                  role="columnheader"
                  aria-colindex={1}
                  className={cn(LABEL, "flex items-end pb-2 text-ns-content-tertiary")}
                >
                  Purchase order
                </div>
                {STAGES.map((stage, index) => (
                  <div
                    key={stage.id}
                    role="columnheader"
                    aria-colindex={index + 2}
                    title={stage.label}
                    className={cn(
                      MONO_TINY,
                      "flex items-end pb-2 text-ns-content-tertiary uppercase",
                    )}
                  >
                    <span className="sr-only">{stage.label}</span>
                    <span aria-hidden="true">{stage.short}</span>
                  </div>
                ))}
              </div>

              {visible.length === 0 ? (
                <div role="row" className="contents">
                  <div
                    role="gridcell"
                    aria-colindex={1}
                    aria-colspan={STAGES.length + 1}
                    className="col-span-full rounded-[6px] border border-dashed border-ns-border-secondary p-6 text-ns-content-tertiary"
                  >
                    No sample orders match this view.
                  </div>
                </div>
              ) : null}

              {visible.map((row, rowIndex) => {
                const previous = visible[rowIndex - 1];
                const startsGroup =
                  grouped && (!previous || previous.order.unit !== row.order.unit);
                return (
                  <GridRow
                    key={row.order.ref}
                    order={row.order}
                    cells={row.cells}
                    rowIndex={rowIndex}
                    focusPos={focus}
                    groupLabel={startsGroup ? row.order.unit : null}
                    highlighted={hoverRef === row.order.ref}
                    openStage={
                      openCell?.poRef === row.order.ref ? openCell.stage : null
                    }
                    onHover={setHoverRef}
                    onOpen={openAt}
                    registerRef={(col, node) => {
                      const k = key(rowIndex, col);
                      if (node) cellRefs.current.set(k, node);
                      else cellRefs.current.delete(k);
                    }}
                    detailId={detailId}
                  />
                );
              })}
            </div>
          </div>

          <p className={cn(MONO_TINY, "text-ns-content-tertiary")}>
            Arrow keys move between cells · Enter opens the stage detail · Escape closes it
          </p>

          <div className="grid grid-cols-[1.2fr_1fr] gap-4 max-[991px]:grid-cols-1">
            <StageDetail
              id={detailId}
              detail={detail}
              onClose={closeDetail}
              onComplete={(poRef, stage) => {
                markComplete({ poRef, stage, source: "grid" });
              }}
            />
            <ActivityList changes={changes} />
          </div>
        </div>
      </Container>

      <SectionPadding />
      <SectionLines />
    </section>
  );
}

/* ── pieces ────────────────────────────────────────────────────────────────── */

/**
 * The sample-data notice. Deliberately loud and never conditional: this grid looks
 * enough like a real dashboard that an unlabelled version would read as a customer's
 * live data.
 */
function SampleDataBanner() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[6px] border border-dashed border-ns-border-primary bg-ns-bg-glass-secondary px-4 py-3">
      <span
        className={cn(
          LABEL,
          "rounded-[4px] border border-ns-border-primary bg-ns-bg-glass-primary px-2 py-1 text-ns-content-primary",
        )}
      >
        Sample data
      </span>
      <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-secondary">
        Fictional purchase orders, styles, quantities and names, frozen at{" "}
        {formatDay(AS_OF)} 2026. Not a customer, not a case study, not a claim.
      </p>
    </div>
  );
}

function Legend() {
  return (
    <ul role="list" className="flex flex-wrap gap-x-6 gap-y-3">
      {STATE_ORDER.map((state) => (
        <li key={state} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-[3px] border",
              MONO_TINY,
              STATE[state].cell,
            )}
          >
            {STATE[state].glyph}
          </span>
          <span className={cn(MONO_TINY, "text-ns-content-tertiary uppercase")}>
            {STATE[state].label}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface GridRowProps {
  order: PurchaseOrder;
  cells: Cell[];
  rowIndex: number;
  focusPos: { row: number; col: number };
  groupLabel: string | null;
  highlighted: boolean;
  openStage: StageId | null;
  onHover: (ref: string | null) => void;
  onOpen: (row: number, col: number) => void;
  registerRef: (col: number, node: HTMLDivElement | null) => void;
  detailId: string;
}

function GridRow({
  order,
  cells,
  rowIndex,
  focusPos,
  groupLabel,
  highlighted,
  openStage,
  onHover,
  onOpen,
  registerRef,
  detailId,
}: GridRowProps) {
  return (
    <>
      {groupLabel ? (
        <div role="row" className="contents">
          <div
            role="gridcell"
            aria-colindex={1}
            aria-colspan={STAGES.length + 1}
            className={cn(
              LABEL,
              "col-span-full mt-4 border-b border-ns-border-secondary pb-2 text-ns-content-tertiary",
            )}
          >
            {groupLabel}
          </div>
        </div>
      ) : null}

      <div
        role="row"
        aria-rowindex={rowIndex + 2}
        className="contents"
        onMouseEnter={() => onHover(order.ref)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(order.ref)}
        onBlur={() => onHover(null)}
      >
        <div
          role="rowheader"
          aria-colindex={1}
          className={cn(
            "flex flex-col justify-center gap-1 rounded-[4px] border px-3 py-2 transition-colors duration-200",
            highlighted
              ? "border-ns-border-hover bg-ns-bg-glass-primary"
              : "border-transparent bg-ns-bg-glass-secondary",
          )}
        >
          <span className={cn(MONO, "text-ns-content-primary")}>
            {order.ref} · {order.unit}
          </span>
          <span className="text-[0.75rem] leading-[1rem] text-ns-content-tertiary">
            {order.style} · {order.fabric} · {order.qty.toLocaleString("en-GB")} pcs
          </span>
        </div>

        {cells.map((cell, colIndex) => {
          const style = STATE[cell.state];
          const focused = focusPos.row === rowIndex && focusPos.col === colIndex;
          const open = openStage === cell.stage;
          const stage = STAGES[colIndex];
          const name = [
            `${order.ref}`,
            stage.label,
            `planned ${formatDay(cell.planned)}`,
            cell.actual ? `actual ${formatDay(cell.actual)}` : "no actual yet",
            cell.projected ? `projected ${formatDelta(cell.delta)}` : formatDelta(cell.delta),
            cell.lateBy > 0 ? `${cell.lateBy} days past due` : null,
            style.label,
            cell.owner ? `owner ${cell.owner}` : "no point of contact",
          ]
            .filter(Boolean)
            .join(", ");

          return (
            <div
              key={cell.stage}
              ref={(node) => registerRef(colIndex, node)}
              role="gridcell"
              aria-colindex={colIndex + 2}
              aria-label={name}
              aria-expanded={open}
              aria-controls={detailId}
              tabIndex={focused ? 0 : -1}
              onClick={() => onOpen(rowIndex, colIndex)}
              className={cn(
                "flex cursor-pointer flex-col justify-center gap-[0.125rem] rounded-[4px] border px-2 py-2 transition-colors duration-200",
                FOCUS,
                style.cell,
                highlighted && "brightness-125",
                open && "outline outline-2 outline-offset-2 outline-ns-border-hover",
              )}
            >
              <span className={cn(MONO_TINY, "opacity-70")} aria-hidden="true">
                {formatDay(cell.planned)}
              </span>
              <span className={cn(MONO, "flex items-center gap-1")} aria-hidden="true">
                <span>{style.glyph}</span>
                <span>
                  {cell.actual
                    ? formatDay(cell.actual)
                    : cell.lateBy > 0
                      ? `${cell.lateBy}d late`
                      : cell.delta === 0
                        ? "—"
                        : formatDelta(cell.delta)}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

interface StageDetailProps {
  id: string;
  detail: { order: PurchaseOrder; cell: Cell; stage: (typeof STAGES)[number] } | null;
  onClose: () => void;
  onComplete: (poRef: string, stage: StageId) => void;
}

/**
 * Non-modal by choice. A dialog would trap focus and force the visitor out of the grid
 * to read a cell; keeping the panel beside the grid lets arrow keys keep working while
 * the detail updates, which is how the real screen behaves. Escape still closes it and
 * returns focus to the cell that opened it.
 */
function StageDetail({ id, detail, onClose, onComplete }: StageDetailProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-live="polite"
      className="flex min-h-[11.5rem] flex-col gap-4 rounded-[6px] border border-ns-border-secondary bg-ns-bg-glass-secondary p-6 max-[767px]:p-4"
    >
      {detail === null ? (
        <>
          <h3 id={headingId} className={cn(LABEL, "text-ns-content-tertiary")}>
            Stage detail
          </h3>
          <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-tertiary">
            Select a cell to see its planned and actual dates, the delta, who owns the
            stage and how it is signed off.
          </p>
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 id={headingId} className="text-[1rem] leading-[1.5rem] font-semibold text-ns-content-primary">
              {detail.order.ref} · {detail.stage.label}
            </h3>
            <button type="button" onClick={onClose} className={cn(CONTROL, FOCUS)}>
              Close
            </button>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 max-[479px]:grid-cols-1">
            {[
              ["Planned", formatDay(detail.cell.planned)],
              ["Actual", detail.cell.actual ? formatDay(detail.cell.actual) : "Not yet reported"],
              [
                "Delta",
                detail.cell.projected
                  ? `${formatDelta(detail.cell.delta)} projected`
                  : formatDelta(detail.cell.delta),
              ],
              [
                "Past due",
                detail.cell.lateBy > 0 ? `${detail.cell.lateBy} days` : "—",
              ],
              ["State", STATE[detail.cell.state].label],
              ["Owner", detail.cell.owner ?? "No POC assigned"],
              ["Approval", detail.cell.approval],
            ].map(([term, value]) => (
              <div key={term} className="flex flex-col gap-1">
                <dt className={cn(LABEL, "text-ns-content-tertiary")}>{term}</dt>
                <dd className={cn(MONO, "text-ns-content-primary")}>{value}</dd>
              </div>
            ))}
          </dl>

          {detail.cell.state === "complete" ? (
            <p className={cn(MONO_TINY, "text-ns-content-tertiary")}>
              Stage closed. Downstream dates already reflect it.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => onComplete(detail.order.ref, detail.stage.id)}
              className={cn(
                "flex h-8 w-fit items-center gap-1 rounded-[4px] bg-ns-bg-inverse px-4 text-[0.875rem] leading-[1.25rem] text-ns-content-inverse transition-opacity duration-200 hover:opacity-90",
                FOCUS,
              )}
            >
              Mark complete on {formatDay(AS_OF)}
            </button>
          )}
        </>
      )}
    </section>
  );
}

function ActivityList({ changes }: { changes: readonly { id: number; text: string; source: string }[] }) {
  return (
    <section
      aria-label="Changes made in this demo"
      className="flex min-h-[11.5rem] flex-col gap-3 rounded-[6px] border border-ns-border-secondary bg-ns-bg-glass-secondary p-6 max-[767px]:p-4"
    >
      <h3 className={cn(LABEL, "text-ns-content-tertiary")}>Change history</h3>
      {changes.length === 0 ? (
        <p className="text-[0.875rem] leading-[1.25rem] text-ns-content-tertiary">
          Nothing changed yet. Closing a stage records what moved, and by how much.
        </p>
      ) : (
        <ol role="list" className="flex flex-col gap-2">
          {changes.map((change) => (
            <li key={change.id} className={cn(MONO_TINY, "flex gap-2 text-ns-content-secondary")}>
              <span className="text-ns-content-tertiary uppercase">
                {change.source === "whatsapp" ? "WA" : "GRID"}
              </span>
              <span>{change.text}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
