/** Demo-only teacher schedules. Replace with API data when the backend is ready. */
export type ProgramId = "reading" | "tajweed" | "memorization";

export interface DemoTeacher {
  id: string;
  nameAr: string;
  nameEn: string;
  initialsAr: string;
  initialsEn: string;
  focus: ProgramId[];
  /** JavaScript weekday (Sunday = 0), each entry starts a 30-minute slot. */
  weeklySlots: Partial<Record<number, string[]>>;
}

export const demoTeachers: DemoTeacher[] = [
  {
    id: "ahmed-demo",
    nameAr: "الأستاذ أحمد",
    nameEn: "Ustadh Ahmed",
    initialsAr: "أ",
    initialsEn: "A",
    focus: ["reading", "tajweed", "memorization"],
    weeklySlots: {
      1: ["17:00", "17:30", "18:00", "18:30"],
      3: ["17:00", "17:30", "18:00", "18:30"],
      6: ["10:00", "10:30", "11:00", "11:30"],
    },
  },
  {
    id: "mariam-demo",
    nameAr: "الأستاذة مريم",
    nameEn: "Ustadha Mariam",
    initialsAr: "م",
    initialsEn: "M",
    focus: ["reading", "tajweed", "memorization"],
    weeklySlots: {
      0: ["11:00", "11:30", "12:00", "12:30"],
      2: ["16:00", "16:30", "17:00", "17:30"],
      3: ["17:00", "17:30"],
      4: ["16:00", "16:30", "17:00", "17:30"],
    },
  },
];

function cairoParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: value("year"), month: value("month"), day: value("day"), hour: value("hour"), minute: value("minute") };
}

export function getDemoDates(now = new Date()): Date[] {
  const today = cairoParts(now);
  const first = new Date(today.year, today.month - 1, today.day);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(first);
    date.setDate(first.getDate() + index);
    return date;
  });
}

export function getAvailableDemoSlots(teacher: DemoTeacher, date: Date, now = new Date()): string[] {
  const slots = teacher.weeklySlots[date.getDay()] ?? [];
  const cairo = cairoParts(now);
  const todayKey = dateKey(new Date(cairo.year, cairo.month - 1, cairo.day));
  if (dateKey(date) !== todayKey) return slots;
  const currentMinutes = cairo.hour * 60 + cairo.minute;
  return slots.filter((slot) => {
    const [hour, minute] = slot.split(":").map(Number);
    return hour * 60 + minute > currentMinutes + 30;
  });
}

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function areAdjacentSlots(first: string, second: string): boolean {
  const toMinutes = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  };
  return Math.abs(toMinutes(first) - toMinutes(second)) === 30;
}

export type RequestedSlot = { date: string; time: string };

/** Show each time once, even if multiple qualified teachers can teach it. */
export function getCombinedAvailableSlots(teachers: DemoTeacher[], program: ProgramId, date: Date): string[] {
  return [...new Set(teachers
    .filter((teacher) => teacher.focus.includes(program))
    .flatMap((teacher) => getAvailableDemoSlots(teacher, date)))].sort();
}

/** A single teacher must be able to cover the student's entire weekly hour. */
export function getTeachersForRequestedSlots(
  teachers: DemoTeacher[],
  program: ProgramId,
  slots: RequestedSlot[],
): DemoTeacher[] {
  return teachers.filter((teacher) => teacher.focus.includes(program) && slots.every((slot) => {
    const [year, month, day] = slot.date.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return getAvailableDemoSlots(teacher, date).includes(slot.time);
  }));
}
