"use client";

import * as React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Alert, Box, Button, Card, Checkbox, Chip, Container, Divider,
  FormControlLabel, LinearProgress, MenuItem, Stack, TextField,
  ToggleButton, ToggleButtonGroup, Typography,
} from "@mui/material";
import type { ProgramId } from "@/lib/enrollment/demoData";
import type { WeeklySlot } from "@/lib/enrollment/demoStudent";
import { saveDemoRequest } from "@/lib/enrollment/demoRequest";

type ScheduleMode = "single" | "split";
const programIds: ProgramId[] = ["reading", "tajweed", "memorization"];
const times = Array.from({ length: 28 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()-]{8,20}$/;

const copy = {
  ar: {
    brand: "تبيان", home: "الرئيسية", back: "السابق", next: "التالي",
    steps: ["البرنامج", "الوقت المفضل", "البيانات"],
    programTitle: "ابدأ بالبرنامج المناسب", programHint: "اختر مسار التعلم الذي يناسبك.",
    programs: { reading: ["القراءة الصحيحة", "الحروف والنطق وقراءة الآيات"], tajweed: ["التجويد والتلاوة", "تطبيق الأحكام وتحسين التلاوة"], memorization: ["الحفظ والمراجعة", "خطة حفظ ومراجعة منتظمة"] },
    scheduleTitle: "ما الأيام والأوقات التي تناسبك؟", scheduleHint: "اكتب الوقت الذي تفضله كل أسبوع. لا تحتاج إلى اختيار معلم؛ ستراجع الإدارة طلبك وتختار المعلم المناسب.",
    single: "ساعة كاملة في يوم واحد", split: "نصف ساعة في يومين", firstDay: "اليوم", firstTime: "بداية الساعة", splitFirstDay: "اليوم الأول", splitFirstTime: "وقت اليوم الأول", secondDay: "اليوم الثاني", secondTime: "وقت اليوم الثاني",
    timezone: "الأوقات بتوقيت القاهرة", splitError: "اختر يومين مختلفين عند تقسيم الساعة.", preferenceNotice: "هذه أوقات مفضلة وليست حجزًا مؤكدًا. ستتواصل الإدارة معك إذا لم يتوفر معلم فيها.",
    days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], hour: "٦٠ دقيقة أسبوعيًا", halfHour: "٣٠ دقيقة لكل يوم",
    detailsTitle: "بيانات الطالب والحساب", detailsHint: "أدخل بريدًا وكلمة مرور وتأكيدها ليُجهّز حساب الطالب عند تشغيل التسجيل الفعلي.", first: "الاسم الأول", last: "اسم العائلة", phone: "رقم الموبايل", email: "البريد الإلكتروني", password: "كلمة المرور", confirm: "تأكيد كلمة المرور", child: "الطالب طفل", guardian: "بريد ولي الأمر الإلكتروني", guardianHint: "ولي الأمر يحتاج إلى حساب منفصل لمتابعة طفله بعد التفعيل.",
    summary: "ملخص الوقت المطلوب", submit: "مراجعة الطلب التجريبي", required: "أكمل جميع الحقول بشكل صحيح.", mismatch: "كلمتا المرور غير متطابقتين.", passwordRule: "كلمة المرور ٨ أحرف على الأقل.",
    doneTitle: "اكتملت معاينة الطلب", doneHint: "حُفظت تفضيلات الوقت والبرنامج في هذا المتصفح لعرضها في لوحة الإدارة التجريبية فقط. لم يُنشأ حساب أو حجز، ولم تُحفظ بياناتك الشخصية أو كلمة المرور. ستؤكد الإدارة المعلم والوقت بعد مراجعة الطلب عند تشغيل النظام الفعلي.", admin: "معاينة مراجعة الإدارة", studentPreview: "معاينة صفحة الطالب", startOver: "طلب جديد",
  },
  en: {
    brand: "Tibyan", home: "Home", back: "Back", next: "Next",
    steps: ["Program", "Preferred time", "Details"],
    programTitle: "Choose your program", programHint: "Pick the learning path that suits you.",
    programs: { reading: ["Confident reading", "Letters, pronunciation and verses"], tajweed: ["Tajweed & recitation", "Apply rules and improve recitation"], memorization: ["Memorization & review", "A steady memorization and review plan"] },
    scheduleTitle: "Which days and times suit you?", scheduleHint: "Tell us your preferred weekly time. You do not need to choose a teacher; an admin will review your request and assign one.",
    single: "One full hour on one day", split: "Half an hour on two days", firstDay: "Day", firstTime: "Hour starts", splitFirstDay: "First day", splitFirstTime: "First day's time", secondDay: "Second day", secondTime: "Second day's time",
    timezone: "Times are in Cairo time", splitError: "Choose two different days when splitting the hour.", preferenceNotice: "These are preferred times, not a confirmed booking. An admin will contact you if no teacher can cover them.",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], hour: "60 minutes weekly", halfHour: "30 minutes on each day",
    detailsTitle: "Student and account details", detailsHint: "Enter an email, password, and confirmation to prepare the student account when live registration is available.", first: "First name", last: "Last name", phone: "Mobile number", email: "Email address", password: "Password", confirm: "Confirm password", child: "Student is a child", guardian: "Parent email address", guardianHint: "A parent will need a separate account to follow their child after activation.",
    summary: "Requested time", submit: "Review demo request", required: "Complete all fields correctly.", mismatch: "Passwords do not match.", passwordRule: "Password must be at least 8 characters.",
    doneTitle: "Request preview complete", doneHint: "Only the program and preferred times were saved in this browser for the admin preview. No account or booking was created, and your identity or password was not stored. An admin will confirm the teacher and time after reviewing the request when the real system is available.", admin: "Preview admin review", studentPreview: "Preview student page", startOver: "Start again",
  },
} as const;

function nextHalfHour(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const next = hour * 60 + minute + 30;
  return `${String(Math.floor(next / 60)).padStart(2, "0")}:${String(next % 60).padStart(2, "0")}`;
}

export default function EnrollmentWizard() {
  const locale = useLocale();
  const c = copy[locale === "ar" ? "ar" : "en"];
  const [step, setStep] = React.useState(0);
  const [program, setProgram] = React.useState<ProgramId | null>(null);
  const [mode, setMode] = React.useState<ScheduleMode>("single");
  const [firstDay, setFirstDay] = React.useState(0);
  const [firstTime, setFirstTime] = React.useState("17:00");
  const [secondDay, setSecondDay] = React.useState(2);
  const [secondTime, setSecondTime] = React.useState("17:00");
  const [form, setForm] = React.useState({ first: "", last: "", phone: "", email: "", password: "", confirm: "", child: false, guardian: "" });
  const [error, setError] = React.useState("");

  const requestedSlots: WeeklySlot[] = mode === "single"
    ? [{ weekday: firstDay, time: firstTime }, { weekday: firstDay, time: nextHalfHour(firstTime) }]
    : [{ weekday: firstDay, time: firstTime }, { weekday: secondDay, time: secondTime }];
  const validSchedule = mode === "single" || firstDay !== secondDay;
  const scheduleLabel = mode === "single"
    ? `${c.days[firstDay]} · ${firstTime}–${nextHalfHour(nextHalfHour(firstTime))} (${c.hour})`
    : `${c.days[firstDay]} · ${firstTime} / ${c.days[secondDay]} · ${secondTime} (${c.halfHour})`;
  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const submit = () => {
    setError("");
    if (!program || !validSchedule) { setError(c.splitError); return; }
    if (!form.first.trim() || !form.last.trim() || !phonePattern.test(form.phone.trim()) || !emailPattern.test(form.email.trim()) || (form.child && !emailPattern.test(form.guardian.trim()))) { setError(c.required); return; }
    if (form.password.length < 8) { setError(c.passwordRule); return; }
    if (form.password !== form.confirm) { setError(c.mismatch); return; }
    saveDemoRequest({ program, requestedSlots, submittedAt: new Date().toISOString(), status: "pending" });
    // The preview stores only schedule preferences. Clear identity and secrets immediately.
    setForm({ first: "", last: "", phone: "", email: "", password: "", confirm: "", child: false, guardian: "" });
    setStep(3);
  };

  return <Box component="main" dir={locale === "ar" ? "rtl" : "ltr"} sx={{ minHeight: "100dvh", bgcolor: "background.default", py: { xs: 2, md: 5 } }}><Container maxWidth="md">
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}><Typography component={Link} href={`/${locale}`} fontSize={22} fontWeight={900} color="primary.main" sx={{ textDecoration: "none" }}>{c.brand}</Typography><Button component={Link} href={`/${locale}`} size="small">{c.home}</Button></Stack>
    <Card variant="outlined" sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, boxShadow: 2 }}>
      {step < 3 && <><Stack direction="row" gap={1} sx={{ mb: 1 }}>{c.steps.map((label, index) => <Chip key={label} label={`${index + 1}. ${label}`} color={index === step ? "primary" : "default"} variant={index === step ? "filled" : "outlined"} size="small" />)}</Stack><LinearProgress variant="determinate" value={(step + 1) / 3 * 100} sx={{ mb: 4, borderRadius: 3 }} /></>}
      {step === 0 && <><Typography variant="h4" fontWeight={850}>{c.programTitle}</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>{c.programHint}</Typography><Stack spacing={1.5}>{programIds.map((id) => <Card key={id} onClick={() => setProgram(id)} variant="outlined" sx={{ p: 2, cursor: "pointer", borderWidth: program === id ? 2 : 1, borderColor: program === id ? "primary.main" : "divider", bgcolor: program === id ? "action.hover" : "background.paper" }}><Typography fontWeight={800}>{c.programs[id][0]}</Typography><Typography variant="body2" color="text.secondary">{c.programs[id][1]}</Typography></Card>)}</Stack></>}
      {step === 1 && <><Typography variant="h4" fontWeight={850}>{c.scheduleTitle}</Typography><Typography color="text.secondary" sx={{ mb: 2 }}>{c.scheduleHint}</Typography><Chip label={c.timezone} variant="outlined" size="small" sx={{ mb: 2 }} /><Stack spacing={2}>
        <ToggleButtonGroup value={mode} exclusive onChange={(_, value: ScheduleMode | null) => { if (value) { setMode(value); if (value === "single" && firstTime === "21:30") setFirstTime("21:00"); setError(""); } }} fullWidth color="primary" sx={{ "& .MuiToggleButton-root": { flex: 1, px: 1, fontSize: { xs: 11, sm: 14 } } }}><ToggleButton value="single">{c.single}</ToggleButton><ToggleButton value="split">{c.split}</ToggleButton></ToggleButtonGroup>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}><TextField select label={mode === "single" ? c.firstDay : c.splitFirstDay} value={firstDay} onChange={(event) => { setFirstDay(Number(event.target.value)); setError(""); }}>{c.days.map((day, index) => <MenuItem key={day} value={index}>{day}</MenuItem>)}</TextField><TextField select label={mode === "single" ? c.firstTime : c.splitFirstTime} value={firstTime} onChange={(event) => setFirstTime(event.target.value)}>{times.filter((time) => mode === "split" || time !== "21:30").map((time) => <MenuItem key={time} value={time}>{time}</MenuItem>)}</TextField>
          {mode === "split" && <><TextField select label={c.secondDay} value={secondDay} error={firstDay === secondDay} helperText={firstDay === secondDay ? c.splitError : undefined} onChange={(event) => { setSecondDay(Number(event.target.value)); setError(""); }}>{c.days.map((day, index) => <MenuItem key={day} value={index} disabled={index === firstDay}>{day}</MenuItem>)}</TextField><TextField select label={c.secondTime} value={secondTime} onChange={(event) => setSecondTime(event.target.value)}>{times.map((time) => <MenuItem key={time} value={time}>{time}</MenuItem>)}</TextField></>}
        </Box><Alert severity="info">{c.preferenceNotice}</Alert><Card variant="outlined" sx={{ p: 2 }}><Typography variant="body2" color="text.secondary">{c.summary}</Typography><Typography fontWeight={800}>{scheduleLabel}</Typography></Card>
      </Stack></>}
      {step === 2 && <><Typography variant="h4" fontWeight={850}>{c.detailsTitle}</Typography><Typography color="text.secondary" sx={{ mb: 2 }}>{c.detailsHint}</Typography><Alert severity="info" sx={{ mb: 2 }}>{c.programs[program ?? "reading"][0]} · {scheduleLabel}</Alert><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}><TextField required label={c.first} autoComplete="given-name" value={form.first} onChange={(e) => update("first", e.target.value)} /><TextField required label={c.last} autoComplete="family-name" value={form.last} onChange={(e) => update("last", e.target.value)} /><TextField required label={c.phone} type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} /><TextField required label={c.email} type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} /><TextField required label={c.password} type="password" autoComplete="new-password" value={form.password} onChange={(e) => update("password", e.target.value)} /><TextField required label={c.confirm} type="password" autoComplete="new-password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} /></Box><FormControlLabel sx={{ mt: 1 }} control={<Checkbox checked={form.child} onChange={(e) => update("child", e.target.checked)} />} label={c.child} />{form.child && <><TextField fullWidth required type="email" label={c.guardian} value={form.guardian} onChange={(e) => update("guardian", e.target.value)} sx={{ mt: 2 }} /><Typography color="text.secondary" variant="caption">{c.guardianHint}</Typography></>}</>}
      {step === 3 && <Stack spacing={2} alignItems="flex-start"><Typography variant="h4" fontWeight={850}>{c.doneTitle}</Typography><Alert severity="warning">{c.doneHint}</Alert><Button component={Link} href={`/${locale}/admin`} variant="contained">{c.admin}</Button><Button component={Link} href={`/${locale}/student`} variant="outlined">{c.studentPreview}</Button><Button onClick={() => { setProgram(null); setStep(0); }}>{c.startOver}</Button></Stack>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {step < 3 && <><Divider sx={{ my: 3 }} /><Stack direction="row" justifyContent="space-between"><Button disabled={step === 0} onClick={() => { setStep(step - 1); setError(""); }}>{c.back}</Button><Button variant="contained" disabled={step === 0 ? !program : step === 1 ? !validSchedule : false} onClick={() => step === 2 ? submit() : (setStep(step + 1), setError(""))}>{step === 2 ? c.submit : c.next}</Button></Stack></>}
    </Card>
  </Container></Box>;
}
