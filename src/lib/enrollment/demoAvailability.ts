import { demoTeachers, type DemoTeacher } from "./demoData";

const KEY = "tibyan.demo.availability.v1";
type Slots = DemoTeacher["weeklySlots"];
type Overrides = Record<string, Slots>;

function readOverrides(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value as Overrides : {};
  } catch { return {}; }
}

export function getDemoTeachers(): DemoTeacher[] {
  const overrides = readOverrides();
  return demoTeachers.map((teacher) => {
    const stored = overrides[teacher.id];
    if (!stored || typeof stored !== "object") return teacher;
    const weeklySlots: Slots = {};
    for (let day = 0; day < 7; day++) {
      const values = stored[day];
      weeklySlots[day] = Array.isArray(values)
        ? [...new Set(values.filter((value): value is string => typeof value === "string" && /^([01]\d|2[0-3]):[03]0$/.test(value)))].sort()
        : [];
    }
    return { ...teacher, weeklySlots };
  });
}

export function saveDemoSlots(teacherId: string, weeklySlots: Slots): void {
  if (typeof window === "undefined" || !demoTeachers.some((teacher) => teacher.id === teacherId)) return;
  const overrides = readOverrides();
  overrides[teacherId] = weeklySlots;
  window.localStorage.setItem(KEY, JSON.stringify(overrides));
  window.dispatchEvent(new Event("tibyan-demo-availability"));
}

export function resetDemoSlots(teacherId: string): void {
  if (typeof window === "undefined") return;
  const overrides = readOverrides();
  delete overrides[teacherId];
  window.localStorage.setItem(KEY, JSON.stringify(overrides));
  window.dispatchEvent(new Event("tibyan-demo-availability"));
}
