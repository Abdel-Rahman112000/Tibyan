"use client";

import * as React from "react";
import Link from "next/link";
import {
  Alert, Box, Button, Card, CardActionArea, Chip, Divider,
  MenuItem, Stack, TextField, Typography,
} from "@mui/material";
import {
  DEMO_STUDENT_EVENT, getDemoStudents, getLiveSessionStatus,
  getProgressSummary, getWeeklySessions, initialDemoStudents,
  saveDemoStudent,
} from "@/lib/enrollment/demoStudent";
import {
  formatPassage, getAyahBounds, getSurahsInJuz,
  isValidPassage, juzs, type QuranPassage,
} from "@/lib/quran/catalog";

type PassageInput = { juz: number; surahId: number; fromAyah: string; toAyah: string };
const emptyPassage = (): PassageInput => ({ juz: 0, surahId: 0, fromAyah: "", toAyah: "" });
const weekdaysAr = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const weekdaysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function PassageFields({ title, value, onChange, ar }: { title: string; value: PassageInput; onChange: (next: PassageInput) => void; ar: boolean }) {
  const surahs = getSurahsInJuz(value.juz);
  const bounds = getAyahBounds(value.juz, value.surahId);
  return <Card variant="outlined" sx={{ p: 2, flex: 1 }}>
    <Typography fontWeight={850} sx={{ mb: 2 }}>{title}</Typography>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
      <TextField select required label={ar ? "الجزء" : "Juz"} value={value.juz} onChange={(event) => onChange({ juz: Number(event.target.value), surahId: 0, fromAyah: "", toAyah: "" })}><MenuItem value={0} disabled>{ar ? "اختر الجزء" : "Choose a juz"}</MenuItem>{juzs.map((juz) => <MenuItem key={juz.number} value={juz.number}>{ar ? `الجزء ${juz.number}` : `Juz ${juz.number}`}</MenuItem>)}</TextField>
      <TextField select required label={ar ? "السورة" : "Surah"} value={value.surahId} disabled={!value.juz} onChange={(event) => onChange({ ...value, surahId: Number(event.target.value), fromAyah: "", toAyah: "" })}><MenuItem value={0} disabled>{ar ? "اختر السورة" : "Choose a surah"}</MenuItem>{surahs.map((chapter) => <MenuItem key={chapter.id} value={chapter.id}>{chapter.id}. {ar ? chapter.nameAr : chapter.nameEn}</MenuItem>)}</TextField>
      <TextField required type="number" label={ar ? "من الآية" : "From ayah"} value={value.fromAyah} disabled={!bounds} onChange={(event) => onChange({ ...value, fromAyah: event.target.value })} slotProps={{ htmlInput: { min: bounds?.min, max: bounds?.max, step: 1 } }} />
      <TextField required type="number" label={ar ? "إلى الآية" : "To ayah"} value={value.toAyah} disabled={!bounds} onChange={(event) => onChange({ ...value, toAyah: event.target.value })} slotProps={{ htmlInput: { min: bounds?.min, max: bounds?.max, step: 1 } }} />
    </Box>
    {bounds && <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>{ar ? `آيات السورة في هذا الجزء: ${bounds.min}–${bounds.max}` : `Ayahs in this juz: ${bounds.min}–${bounds.max}`}</Typography>}
  </Card>;
}

export default function TeacherStudentPanel({ teacherId, ar }: { teacherId: string; ar: boolean }) {
  const [students, setStudents] = React.useState(initialDemoStudents);
  const [selectedId, setSelectedId] = React.useState("");
  const [now, setNow] = React.useState(() => new Date());
  const [form, setForm] = React.useState({ date: new Date().toISOString().slice(0, 10), stage: "", next: "", grade: "", notes: "" });
  const [past, setPast] = React.useState<PassageInput>(emptyPassage);
  const [newMaterial, setNewMaterial] = React.useState<PassageInput>(emptyPassage);
  const [feedback, setFeedback] = React.useState("");

  React.useEffect(() => {
    const refresh = () => setStudents(getDemoStudents());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(DEMO_STUDENT_EVENT, refresh);
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener(DEMO_STUDENT_EVENT, refresh); window.clearInterval(timer); };
  }, []);

  const assigned = students.filter((item) => item.teacherId === teacherId);
  const student = assigned.find((item) => item.id === selectedId) ?? assigned[0];
  const days = ar ? weekdaysAr : weekdaysEn;
  const summary = getProgressSummary(student?.history ?? []);
  const live = student ? getLiveSessionStatus(student.requestedSlots, now) : null;
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const selectStudent = (id: string) => {
    setSelectedId(id);
    setForm({ date: new Date().toISOString().slice(0, 10), stage: "", next: "", grade: "", notes: "" });
    setPast(emptyPassage());
    setNewMaterial(emptyPassage());
    setFeedback("");
  };

  const add = () => {
    if (!student || student.teacherId !== teacherId) return;
    const grade = Number(form.grade);
    const pastPassage: QuranPassage = { juz: past.juz, surahId: past.surahId, fromAyah: Number(past.fromAyah), toAyah: Number(past.toAyah) };
    const newPassage: QuranPassage = { juz: newMaterial.juz, surahId: newMaterial.surahId, fromAyah: Number(newMaterial.fromAyah), toAyah: Number(newMaterial.toAyah) };
    if (!form.date || !form.stage.trim() || !form.next.trim() || !Number.isInteger(grade) || grade < 0 || grade > 100 ||
      !past.fromAyah || !past.toAyah || !newMaterial.fromAyah || !newMaterial.toAyah || !isValidPassage(pastPassage) || !isValidPassage(newPassage)) {
      setFeedback(ar ? "أكمل الماضي والجديد بتحديد الجزء والسورة ونطاق الآيات الصحيح، ثم اكتب المرحلة والقادم والدرجة من 100." : "Complete valid juz, surah, and ayah ranges for past and new material, then enter stage, next step, and grade out of 100.");
      return;
    }
    const minutes = getWeeklySessions(student.requestedSlots)[0]?.minutes ?? 30;
    saveDemoStudent({ ...student, history: [...student.history, {
      id: crypto.randomUUID(), date: form.date, stage: form.stage.trim(),
      past: pastPassage, newMaterial: newPassage,
      heard: `ماضي: ${formatPassage(pastPassage, true)}؛ جديد: ${formatPassage(newPassage, true)}`,
      next: form.next.trim(), grade, notes: form.notes.trim(), minutes,
    }] });
    setForm({ date: new Date().toISOString().slice(0, 10), stage: "", next: "", grade: "", notes: "" });
    setPast(emptyPassage());
    setNewMaterial(emptyPassage());
    setFeedback(ar ? "حُفظ الماضي والجديد والدرجة في تاريخ الطالب." : "Past and new recitation, and the grade, were saved to the learner's history.");
  };

  return <Stack spacing={2}>
    <Box><Typography variant="h4" fontWeight={850}>{ar ? "طلابي ومواعيد حصصهم" : "My learners and lesson times"}</Typography><Typography color="text.secondary">{ar ? "اختر الطالب لتسجيل الماضي والجديد والدرجة بعد كل حصة." : "Select a learner to record past and new recitation, and the grade after each lesson."}</Typography></Box>
    {!assigned.length && <Alert severity="info">{ar ? "لا يوجد طلاب تجريبيون معيّنون لهذا المعلم. يمكن تعيين طالب من معاينة لوحة الإدارة." : "No demo learners are assigned to this teacher. Assign one in the admin preview."}</Alert>}
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,minmax(0,1fr))", lg: "repeat(3,minmax(0,1fr))" }, gap: 1.5 }}>{assigned.map((item) => <Card key={item.id} variant="outlined" sx={{ borderWidth: student?.id === item.id ? 2 : 1, borderColor: student?.id === item.id ? "primary.main" : "divider" }}><CardActionArea onClick={() => selectStudent(item.id)} sx={{ p: 2, height: "100%" }}><Typography fontWeight={850}>{ar ? item.nameAr : item.nameEn}</Typography><Typography variant="body2" color="text.secondary">{ar ? "الحصص الأسبوعية" : "Weekly lessons"}</Typography><Stack direction="row" gap={.7} flexWrap="wrap" sx={{ mt: 1 }}>{getWeeklySessions(item.requestedSlots).map((session) => <Chip key={`${session.weekday}-${session.start}`} size="small" label={`${days[session.weekday]} ${session.start}–${session.end}`} variant="outlined" />)}</Stack></CardActionArea></Card>)}</Box>
    {student && <>
      {live && <Alert severity={live.kind === "now" ? "success" : "warning"}>{live.kind === "now" ? (ar ? `حصة ${student.nameAr} الآن` : `${student.nameEn}'s lesson is now`) : (ar ? `حصة ${student.nameAr} بعد ${live.minutes} دقيقة` : `${student.nameEn}'s lesson starts in ${live.minutes} minutes`)}{student.meetUrl && <Button size="small" href={student.meetUrl} target="_blank" rel="noopener noreferrer" sx={{ mx: 1 }}>{ar ? "دخول Google Meet" : "Join Google Meet"}</Button>}</Alert>}
      <Card variant="outlined" sx={{ p: 2.5 }}><Typography variant="h6" fontWeight={850}>{ar ? student.nameAr : student.nameEn}</Typography><Stack direction="row" gap={1} flexWrap="wrap" sx={{ my: 1.5 }}>{getWeeklySessions(student.requestedSlots).map((session) => <Chip key={`${session.weekday}-${session.start}`} label={`${days[session.weekday]} · ${session.start}–${session.end} (${session.minutes} ${ar ? "دقيقة" : "min"})`} color="primary" variant="outlined" />)}</Stack><Stack direction="row" gap={1} flexWrap="wrap"><Chip label={`${ar ? "الحصص المسجلة" : "Recorded lessons"}: ${summary.sessions}`} /><Chip label={`${ar ? "متوسط الدرجة" : "Average grade"}: ${summary.average}%`} /></Stack><Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 1 }}><Button component={Link} href={`/${ar ? "ar" : "en"}/student?student=${student.id}`} size="small">{ar ? "معاينة صفحة الطالب" : "Preview learner page"}</Button>{student.meetUrl && <Button href={student.meetUrl} target="_blank" rel="noopener noreferrer" size="small">{ar ? "رابط اللقاء الثابت" : "Reusable meeting link"}</Button>}</Stack></Card>
      <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}><Typography variant="h6" fontWeight={850} sx={{ mb: 2 }}>{ar ? "تسجيل تسميع الحصة" : "Record this lesson's recitation"}</Typography><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5, mb: 2 }}><TextField type="date" label={ar ? "تاريخ الحصة" : "Lesson date"} value={form.date} onChange={(event) => update("date", event.target.value)} slotProps={{ inputLabel: { shrink: true } }} /><TextField label={ar ? "مرحلة التعلم" : "Learning stage"} value={form.stage} onChange={(event) => update("stage", event.target.value)} /></Box><Stack direction={{ xs: "column", md: "row" }} gap={2}><PassageFields title={ar ? "الماضي — مراجعة" : "Past — review"} value={past} onChange={setPast} ar={ar} /><PassageFields title={ar ? "الجديد — حفظ أو تلاوة" : "New — memorization or recitation"} value={newMaterial} onChange={setNewMaterial} ar={ar} /></Stack><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" }, gap: 1.5, mt: 2 }}><TextField required label={ar ? "المطلوب للحصة القادمة" : "For the next lesson"} value={form.next} onChange={(event) => update("next", event.target.value)} /><TextField required type="number" label={ar ? "الدرجة من 100" : "Grade out of 100"} value={form.grade} onChange={(event) => update("grade", event.target.value)} slotProps={{ htmlInput: { min: 0, max: 100, step: 1 } }} /></Box><TextField fullWidth multiline minRows={2} label={ar ? "ملاحظات المعلم" : "Teacher notes"} value={form.notes} onChange={(event) => update("notes", event.target.value)} sx={{ mt: 1.5 }} /><Button variant="contained" onClick={add} sx={{ mt: 2 }}>{ar ? "حفظ التسميع والدرجة" : "Save recitation and grade"}</Button>{feedback && <Alert severity={feedback.startsWith("حُفظ") || feedback.startsWith("Past and new") ? "success" : "error"} sx={{ mt: 2 }}>{feedback}</Alert>}</Card>
      <Typography variant="h6" fontWeight={850}>{ar ? "سجل هذا الطالب" : "This learner's history"}</Typography>{summary.sorted.map((record) => <Card variant="outlined" key={record.id} sx={{ p: 2 }}><Stack direction="row" justifyContent="space-between" gap={1}><Box><Typography fontWeight={800}>{record.stage}</Typography><Typography variant="body2" color="text.secondary">{record.date} · {record.minutes} {ar ? "دقيقة" : "minutes"}</Typography></Box><Chip size="small" label={`${record.grade}/100`} color="primary" /></Stack><Divider sx={{ my: 1 }} />{record.past && record.newMaterial ? <><Typography variant="body2"><strong>{ar ? "الماضي:" : "Past:"}</strong> {formatPassage(record.past, ar)}</Typography><Typography variant="body2"><strong>{ar ? "الجديد:" : "New:"}</strong> {formatPassage(record.newMaterial, ar)}</Typography></> : <Typography variant="body2">{ar ? "ما سمعه:" : "Recited:"} {record.heard}</Typography>}<Typography variant="body2">{ar ? "القادم:" : "Next:"} {record.next}</Typography>{record.notes && <Typography variant="body2" color="text.secondary">{record.notes}</Typography>}</Card>)}
    </>}
  </Stack>;
}
