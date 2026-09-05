"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  AS_OF,
  ORDERS,
  STAGES,
  addDays,
  buildRow,
  daysBetween,
  type Cell,
  type PurchaseOrder,
  type StageId,
} from "./tna-data";

/**
 * Shared state for the TNA Engine demo.
 *
 * It lives in a provider rather than in the grid because two different components
 * drive it: the grid's own "mark complete" control, and the WhatsApp simulator, which
 * logs a floor update against a stage. Where both are on the page they share one
 * provider, so a reply typed into the phone frame moves the grid behind it.
 *
 * The simulator also renders on its own inside the platform stack, with no grid in
 * sight. `useTnaOptional` is what lets it do that without a provider.
 */

/** A stage marked complete during the session, and the actual date recorded for it. */
type CompletionMap = Partial<Record<StageId, string>>;
/** Day shifts applied on top of the baseline plan by a downstream reflow. */
type ReflowMap = Partial<Record<StageId, number>>;

export interface TnaChange {
  id: number;
  poRef: string;
  stage: StageId;
  /** Human sentence for the activity list under the grid. */
  text: string;
  /** Where the change came from, so the demo can show the two paths apart. */
  source: "grid" | "whatsapp";
}

interface TnaState {
  completions: Record<string, CompletionMap>;
  reflows: Record<string, ReflowMap>;
  changes: TnaChange[];
  nextId: number;
}

const EMPTY: TnaState = { completions: {}, reflows: {}, changes: [], nextId: 1 };

interface CompleteAction {
  type: "complete";
  poRef: string;
  stage: StageId;
  /** Defaults to the demo's frozen today. */
  actual?: string;
  source: TnaChange["source"];
  /** Optional extra clause for the activity line, e.g. the quantity reported. */
  detail?: string;
}

/** Records an update that does not close a stage, so partial progress still shows. */
interface NoteAction {
  type: "note";
  poRef: string;
  stage: StageId;
  text: string;
  source: TnaChange["source"];
}

type Action = CompleteAction | NoteAction | { type: "reset" };

const byRef = (ref: string): PurchaseOrder | undefined => ORDERS.find((o) => o.ref === ref);

function reducer(state: TnaState, action: Action): TnaState {
  if (action.type === "reset") return EMPTY;

  if (action.type === "note") {
    return {
      ...state,
      changes: [
        {
          id: state.nextId,
          poRef: action.poRef,
          stage: action.stage,
          text: action.text,
          source: action.source,
        },
        ...state.changes,
      ].slice(0, 6),
      nextId: state.nextId + 1,
    };
  }

  const order = byRef(action.poRef);
  if (!order) return state;

  const index = STAGES.findIndex((s) => s.id === action.stage);
  if (index < 0) return state;

  // Closing a stage twice would shift the downstream dates twice. Two components can
  // dispatch this, so the guard lives here rather than in either of them.
  if (state.completions[action.poRef]?.[action.stage]) return state;

  const reflow = state.reflows[action.poRef] ?? {};
  const stage = STAGES[index];
  const planned = addDays(order.start, stage.offset + (reflow[action.stage] ?? 0));
  const actual = action.actual ?? AS_OF;
  const delta = daysBetween(planned, actual);

  // Everything after this stage moves by the same number of days. A stage that landed
  // early pulls the rest of the plan in; the arithmetic is the same either way.
  const nextReflow: ReflowMap = { ...reflow };
  for (let i = index + 1; i < STAGES.length; i += 1) {
    const id = STAGES[i].id;
    nextReflow[id] = (nextReflow[id] ?? 0) + delta;
  }

  const moved =
    delta === 0
      ? "downstream dates unchanged"
      : `${STAGES.length - index - 1} downstream stage${
          STAGES.length - index - 1 === 1 ? "" : "s"
        } moved ${delta > 0 ? "+" : "−"}${Math.abs(delta)}d`;

  const text = `${order.ref} · ${stage.label} closed${
    action.detail ? ` · ${action.detail}` : ""
  } · ${moved}`;

  return {
    completions: {
      ...state.completions,
      [action.poRef]: { ...(state.completions[action.poRef] ?? {}), [action.stage]: actual },
    },
    reflows: { ...state.reflows, [action.poRef]: nextReflow },
    changes: [
      { id: state.nextId, poRef: action.poRef, stage: action.stage, text, source: action.source },
      ...state.changes,
    ].slice(0, 6),
    nextId: state.nextId + 1,
  };
}

export interface TnaApi {
  /** One row of eight cells per order, in `ORDERS` order. */
  rows: { order: PurchaseOrder; cells: Cell[] }[];
  changes: readonly TnaChange[];
  /** True once anything has been changed, so the Reset control can disable itself. */
  dirty: boolean;
  markComplete: (input: Omit<CompleteAction, "type">) => void;
  note: (input: Omit<NoteAction, "type">) => void;
  reset: () => void;
}

const TnaContext = createContext<TnaApi | null>(null);

export function TnaProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, EMPTY);

  const rows = useMemo(
    () =>
      ORDERS.map((order) => ({
        order,
        cells: buildRow(order, state.reflows[order.ref], state.completions[order.ref]),
      })),
    [state.reflows, state.completions],
  );

  const markComplete = useCallback(
    (input: Omit<CompleteAction, "type">) => dispatch({ type: "complete", ...input }),
    [],
  );
  const note = useCallback(
    (input: Omit<NoteAction, "type">) => dispatch({ type: "note", ...input }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const value = useMemo<TnaApi>(
    () => ({
      rows,
      changes: state.changes,
      dirty: state.changes.length > 0,
      markComplete,
      note,
      reset,
    }),
    [rows, state.changes, markComplete, note, reset],
  );

  return <TnaContext.Provider value={value}>{children}</TnaContext.Provider>;
}

/** The grid's own hook — it is always inside a provider. */
export function useTna(): TnaApi {
  const value = useContext(TnaContext);
  if (!value) throw new Error("useTna must be used inside <TnaProvider>");
  return value;
}

/** For components that work with or without the grid on the page. */
export function useTnaOptional(): TnaApi | null {
  return useContext(TnaContext);
}
