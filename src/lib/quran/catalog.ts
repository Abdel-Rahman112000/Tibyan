import chapterData from "./chapters.json";
import juzData from "./juzs.json";

export type QuranPassage = {
  juz: number;
  surahId: number;
  fromAyah: number;
  toAyah: number;
};

type Chapter = { id: number; nameAr: string; nameEn: string; verses: number };
type Juz = { number: number; verseMapping: Partial<Record<string, string>> };

export const chapters = chapterData as Chapter[];
export const juzs = juzData as Juz[];

export function getJuz(number: number): Juz | undefined {
  return juzs.find((juz) => juz.number === number);
}

export function getSurahsInJuz(number: number): Chapter[] {
  const mapping = getJuz(number)?.verseMapping ?? {};
  return chapters.filter((chapter) => Object.hasOwn(mapping, chapter.id));
}

export function getAyahBounds(juzNumber: number, surahId: number): { min: number; max: number } | null {
  const range = getJuz(juzNumber)?.verseMapping[String(surahId)];
  const chapter = chapters.find((item) => item.id === surahId);
  if (!range || !chapter) return null;
  const [min, max] = range.split("-").map(Number);
  return Number.isInteger(min) && Number.isInteger(max) && min >= 1 && max <= chapter.verses && min <= max ? { min, max } : null;
}

export function isValidPassage(value: unknown): value is QuranPassage {
  if (!value || typeof value !== "object") return false;
  const passage = value as Partial<QuranPassage>;
  if (!Number.isInteger(passage.juz) || !Number.isInteger(passage.surahId) || !Number.isInteger(passage.fromAyah) || !Number.isInteger(passage.toAyah)) return false;
  const bounds = getAyahBounds(passage.juz!, passage.surahId!);
  return !!bounds && passage.fromAyah! >= bounds.min && passage.toAyah! <= bounds.max && passage.fromAyah! <= passage.toAyah!;
}

export function formatPassage(passage: QuranPassage, ar: boolean): string {
  const chapter = chapters.find((item) => item.id === passage.surahId);
  return ar
    ? `الجزء ${passage.juz} · سورة ${chapter?.nameAr ?? passage.surahId} · الآيات ${passage.fromAyah}–${passage.toAyah}`
    : `Juz ${passage.juz} · ${chapter?.nameEn ?? passage.surahId} · ayahs ${passage.fromAyah}–${passage.toAyah}`;
}
