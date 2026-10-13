import { demoTeachers, type ProgramId } from "./demoData";
import { isValidPassage, type QuranPassage } from "@/lib/quran/catalog";

const KEY = "tibyan.demo.students.v2";
const LEGACY_KEY = "tibyan.demo.student.v1";
export const DEMO_STUDENT_EVENT = "tibyan-demo-student";

export type WeeklySlot = { weekday: number; time: string };
export type WeeklySession = { weekday: number; start: string; end: string; minutes: number };
export type ProgressRecord = {
  id: string;
  date: string;
  stage: string;
  /** Kept for older demo records and quick summaries. */
  heard: string;
  next: string;
  grade: number;
  notes: string;
  minutes: number;
  past?: QuranPassage;
  newMaterial?: QuranPassage;
};

export type DemoStudent = {
  id: string;
  nameAr: string;
  nameEn: string;
  guardianAr: string;
  guardianEn: string;
  isChild: boolean;
  program: ProgramId;
  requestedSlots: WeeklySlot[];
  teacherId: string | null;
  meetUrl: string;
  history: ProgressRecord[];
};

/** Fictional learners for preview only. Real learner records need an authenticated backend. */
export const initialDemoStudents: DemoStudent[] = [
  {
    id: "student-demo-1", nameAr: "يوسف علي", nameEn: "Yusuf Ali", guardianAr: "أحمد علي", guardianEn: "Ahmed Ali", isChild: true,
    program: "reading", requestedSlots: [{ weekday: 3, time: "17:00" }, { weekday: 3, time: "17:30" }], teacherId: "ahmed-demo", meetUrl: "",
    history: [
      { id: "record-1", date: "2026-09-30", stage: "تأسيس القراءة", heard: "الحروف ومخارجها", next: "سورة الفاتحة", grade: 72, notes: "تحسّن في مخارج الحروف.", minutes: 60 },
      { id: "record-2", date: "2026-10-07", stage: "قراءة قصار السور", heard: "سورة الفاتحة", next: "سورة الإخلاص", grade: 82, notes: "قراءة أوضح وثقة أكبر.", minutes: 60 },
    ],
  },
  {
    id: "student-demo-2", nameAr: "ليلى محمود", nameEn: "Layla Mahmoud", guardianAr: "محمود حسن", guardianEn: "Mahmoud Hassan", isChild: true,
    program: "memorization", requestedSlots: [{ weekday: 1, time: "17:00" }, { weekday: 1, time: "17:30" }], teacherId: "ahmed-demo", meetUrl: "",
    history: [
      { id: "record-3", date: "2026-10-05", stage: "حفظ قصار السور", past: { juz: 30, surahId: 114, fromAyah: 1, toAyah: 6 }, newMaterial: { juz: 30, surahId: 113, fromAyah: 1, toAyah: 5 }, heard: "ماضي: الناس؛ جديد: الفلق", next: "مراجعة الناس والفلق", grade: 88, notes: "حفظ جيد مع مراجعة مخارج الحروف.", minutes: 60 },
    ],
  },
  {
    id: "student-demo-3", nameAr: "عمر خالد", nameEn: "Omar Khaled", guardianAr: "", guardianEn: "", isChild: false,
    program: "tajweed", requestedSlots: [{ weekday: 2, time: "16:00" }, { weekday: 2, time: "16:30" }], teacherId: "mariam-demo", meetUrl: "",
    history: [],
  },
];

export const initialDemoStudent = initialDemoStudents[0];

function validSlots(value: unknown): value is WeeklySlot[] {
  return Array.isArray(value) && value.length === 2 && value.every((slot) =>
    slot && Number.isInteger(slot.weekday) && slot.weekday >= 0 && slot.weekday <= 6 && typeof slot.time === "string" && /^([01]\d|2[0-1]):[03]0$/.test(slot.time));
}

function validRecord(value: unknown): value is ProgressRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<ProgressRecord>;
  return typeof record.id === "string" && typeof record.date === "string" && typeof record.stage === "string" &&
    typeof record.heard === "string" && typeof record.next === "string" && typeof record.notes === "string" &&
    typeof record.grade === "number" && record.grade >= 0 && record.grade <= 100 &&
    typeof record.minutes === "number" && record.minutes > 0 &&
    (record.past === undefined || isValidPassage(record.past)) &&
    (record.newMaterial === undefined || isValidPassage(record.newMaterial));
}

function hydrate(seed: DemoStudent, raw: unknown): DemoStudent {
  if (!raw || typeof raw !== "object") return seed;
  const value = raw as Partial<DemoStudent>;
  return {
    ...seed,
    program: value.program === "reading" || value.program === "tajweed" || value.program === "memorization" ? value.program : seed.program,
    requestedSlots: validSlots(value.requestedSlots) ? value.requestedSlots : seed.requestedSlots,
    teacherId: typeof value.teacherId === "string" && demoTeachers.some((teacher) => teacher.id === value.teacherId) ? value.teacherId : value.teacherId === null ? null : seed.teacherId,
    meetUrl: typeof value.meetUrl === "string" && /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/i.test(value.meetUrl) ? value.meetUrl : "",
    history: Array.isArray(value.history) ? value.history.filter(validRecord) : seed.history,
  };
}

export function getDemoStudents(): DemoStudent[] {
  if (typeof window === "undefined") return initialDemoStudents;
  try {
    const raw = window.localStorage.getItem(KEY);
    const stored: unknown = raw ? JSON.parse(raw) : null;
    const list = Array.isArray(stored) ? stored : [];
    const legacyRaw = window.localStorage.getItem(LEGACY_KEY);
    const legacy: unknown = legacyRaw ? JSON.parse(legacyRaw) : null;
    return initialDemoStudents.map((seed) => hydrate(seed, list.find((item) => item && item.id === seed.id) ?? (seed.id === initialDemoStudent.id ? legacy : null)));
  } catch { return initialDemoStudents; }
}

export function getDemoStudent(): DemoStudent {
  return getDemoStudents()[0];
}

export function saveDemoStudent(value: DemoStudent): void {
  if (typeof window === "undefined" || !initialDemoStudents.some((item) => item.id === value.id)) return;
  // Only fictional preview learners are stored. Enrollment names, email, phone, and passwords are never written here.
  const next = getDemoStudents().map((item) => item.id === value.id ? value : item);
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(DEMO_STUDENT_EVENT));
}

export function getProgressSummary(history: ProgressRecord[]) {
  const completed = [...history].sort((a, b) => b.date.localeCompare(a.date));
  const grades = completed.map((record) => record.grade);
  return {
    sessions: completed.length,
    minutes: completed.reduce((total, record) => total + record.minutes, 0),
    average: grades.length ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length) : 0,
    improvement: grades.length > 1 ? grades[0] - grades[grades.length - 1] : 0,
    latest: completed[0],
    sorted: completed,
  };
}

function toMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function fromMinutes(value: number): string {
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

export function getWeeklySessions(slots: WeeklySlot[]): WeeklySession[] {
  const sorted = [...slots].sort((a, b) => a.weekday - b.weekday || toMinutes(a.time) - toMinutes(b.time));
  const sessions: WeeklySession[] = [];
  for (const slot of sorted) {
    const last = sessions[sessions.length - 1];
    if (last && last.weekday === slot.weekday && toMinutes(last.end) === toMinutes(slot.time)) {
      last.end = fromMinutes(toMinutes(slot.time) + 30);
      last.minutes += 30;
    } else {
      sessions.push({ weekday: slot.weekday, start: slot.time, end: fromMinutes(toMinutes(slot.time) + 30), minutes: 30 });
    }
  }
  return sessions;
}

export function getLiveSessionStatus(slots: WeeklySlot[], now = new Date()): { kind: "now" | "soon"; minutes: number } | null {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Cairo", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(part("weekday"));
  const current = Number(part("hour")) * 60 + Number(part("minute"));
  const today = slots.filter((slot) => slot.weekday === weekday).map((slot) => toMinutes(slot.time));
  if (today.some((start) => current >= start && current < start + 30)) return { kind: "now", minutes: 0 };
  const next = today.filter((start) => start > current).sort((a, b) => a - b)[0];
  return next !== undefined && next - current <= 15 ? { kind: "soon", minutes: next - current } : null;
}
