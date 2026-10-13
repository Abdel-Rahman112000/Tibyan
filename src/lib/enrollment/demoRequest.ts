import { areAdjacentSlots, type ProgramId } from "./demoData";
import type { WeeklySlot } from "./demoStudent";

const KEY = "tibyan.demo.request.v1";
export const DEMO_REQUEST_EVENT = "tibyan-demo-request";

/** Schedule preference only. Never store enrollment identity or credentials in this preview. */
export type DemoRequest = {
  program: ProgramId;
  requestedSlots: WeeklySlot[];
  submittedAt: string;
  status: "pending" | "assigned";
};

export function getDemoRequest(): DemoRequest | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const request = value as Partial<DemoRequest>;
    if (request.program !== "reading" && request.program !== "tajweed" && request.program !== "memorization") return null;
    if (!Array.isArray(request.requestedSlots) || request.requestedSlots.length !== 2 || !request.requestedSlots.every((slot) =>
      slot && Number.isInteger(slot.weekday) && slot.weekday >= 0 && slot.weekday <= 6 && typeof slot.time === "string" && /^([01]\d|2[0-1]):[03]0$/.test(slot.time))) return null;
    if (request.requestedSlots[0].weekday === request.requestedSlots[1].weekday && !areAdjacentSlots(request.requestedSlots[0].time, request.requestedSlots[1].time)) return null;
    if (typeof request.submittedAt !== "string") return null;
    return { ...request, status: request.status === "assigned" ? "assigned" : "pending" } as DemoRequest;
  } catch { return null; }
}

export function saveDemoRequest(request: DemoRequest): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(request));
  window.dispatchEvent(new Event(DEMO_REQUEST_EVENT));
}
