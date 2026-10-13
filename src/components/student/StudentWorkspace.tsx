"use client";

import * as React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Container, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { demoTeachers } from "@/lib/enrollment/demoData";
import { DEMO_REQUEST_EVENT, getDemoRequest, type DemoRequest } from "@/lib/enrollment/demoRequest";
import { DEMO_STUDENT_EVENT, getDemoStudents, getLiveSessionStatus, getProgressSummary, initialDemoStudent, initialDemoStudents } from "@/lib/enrollment/demoStudent";
import { formatPassage } from "@/lib/quran/catalog";

export default function StudentWorkspace({ studentId = initialDemoStudent.id }: { studentId?: string }) {
  const locale = useLocale();
  const ar = locale === "ar";
  const [student, setStudent] = React.useState(initialDemoStudents.find((item) => item.id === studentId) ?? initialDemoStudent);
  const [request, setRequest] = React.useState<DemoRequest | null>(null);
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const refresh = () => { setStudent(getDemoStudents().find((item) => item.id === studentId) ?? initialDemoStudent); setRequest(getDemoRequest()); };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(DEMO_STUDENT_EVENT, refresh);
    window.addEventListener(DEMO_REQUEST_EVENT, refresh);
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener(DEMO_STUDENT_EVENT, refresh); window.removeEventListener(DEMO_REQUEST_EVENT, refresh); window.clearInterval(timer); };
  }, [studentId]);
  const teacher = demoTeachers.find((item) => item.id === student.teacherId);
  const summary = getProgressSummary(student.history);
  const live = getLiveSessionStatus(student.requestedSlots, now);
  const days = ar ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const program = ar ? { reading: "القراءة الصحيحة", tajweed: "التجويد والتلاوة", memorization: "الحفظ والمراجعة" } : { reading: "Confident reading", tajweed: "Tajweed & recitation", memorization: "Memorization & review" };
  if (studentId === initialDemoStudent.id && request?.status === "pending") return <Box component="main" dir={ar ? "rtl" : "ltr"} sx={{ minHeight: "100dvh", bgcolor: "background.default", py: 4 }}><Container maxWidth="sm"><Typography component={Link} href={`/${locale}`} color="primary.main" sx={{ textDecoration: "none", fontSize: 22, fontWeight: 900 }}>{ar ? "تبيان" : "Tibyan"}</Typography><Card variant="outlined" sx={{ p: 3, mt: 4 }}><Chip color="warning" label={ar ? "الوقت قيد المراجعة" : "Time under review"} /><Typography variant="h4" fontWeight={850} sx={{ mt: 2 }}>{ar ? "طلب الوقت وصل للإدارة" : "Your time request is with the admin"}</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>{ar ? "هذه معاينة محلية. لم يُعيَّن معلم أو يُؤكَّد موعد بعد. إذا لم يناسب الوقت أي معلم، تتواصل الإدارة مع الطالب لاقتراح بديل." : "This is a local preview. No teacher or time has been confirmed yet. If no teacher can cover it, an admin contacts the learner about an alternative."}</Typography><Divider sx={{ my: 2 }} /><Typography fontWeight={800}>{program[request.program]}</Typography><Stack direction="row" gap={1} flexWrap="wrap" sx={{ my: 2 }}>{request.requestedSlots.map((slot, index) => <Chip key={index} label={`${days[slot.weekday]} · ${slot.time}`} variant="outlined" />)}</Stack><Button component={Link} href={`/${locale}/auth/enroll`}>{ar ? "تغيير الوقت المطلوب" : "Change requested time"}</Button></Card></Container></Box>;
  const stats = [
    [ar ? "الحصص المسجلة" : "Recorded lessons", summary.sessions],
    [ar ? "دقائق التعلم" : "Learning minutes", summary.minutes],
    [ar ? "متوسط الدرجات" : "Average grade", `${summary.average}%`],
    [ar ? "تطور الدرجة" : "Grade change", `${summary.improvement > 0 ? "+" : ""}${summary.improvement}`],
  ] as const;
  return <Box component="main" dir={ar ? "rtl" : "ltr"} sx={{ minHeight: "100dvh", bgcolor: "background.default", py: { xs: 2, md: 4 } }}><Container maxWidth="lg">
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}><Typography component={Link} href={`/${locale}`} sx={{ textDecoration: "none", color: "primary.main", fontWeight: 900, fontSize: 22 }}>{ar ? "تبيان" : "Tibyan"}</Typography><Chip label={ar ? "معاينة صفحة الطالب وولي الأمر" : "Student and parent preview"} color="warning" variant="outlined" /></Stack>
    <Alert severity="info" sx={{ mb: 3 }}>{ar ? "هذه بيانات طالب افتراضي لمعاينة الفلو. الصفحة غير محمية بتسجيل دخول بعد، ولا تعرض الاسم أو البريد اللذين أدخلتهما في التسجيل." : "This is a fictional learner preview. The page is not protected by sign in yet and does not show the name or email entered during enrollment."}</Alert>
    {live && <Alert severity={live.kind === "now" ? "success" : "warning"} sx={{ mb: 3 }}><strong>{live.kind === "now" ? (ar ? "موعد التسميع الآن" : "Recitation time is now") : (ar ? `موعد التسميع بعد ${live.minutes} دقيقة` : `Recitation starts in ${live.minutes} minutes`)}</strong>{student.meetUrl ? <Button size="small" href={student.meetUrl} target="_blank" rel="noopener noreferrer" sx={{ mx: 1 }}>{ar ? "دخول Google Meet" : "Join Google Meet"}</Button> : ` — ${ar ? "رابط اللقاء لم يُضف بعد" : "Meeting link has not been added"}`}</Alert>}
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={2} sx={{ mb: 3 }}><Box><Typography color="secondary.dark" fontWeight={800} variant="overline">{ar ? "رحلتك مع القرآن" : "Your Quran journey"}</Typography><Typography variant="h4" fontWeight={900}>{ar ? `أهلًا ${student.nameAr}` : `Welcome, ${student.nameEn}`}</Typography><Typography color="text.secondary">{program[student.program]} · {student.isChild ? (ar ? `ولي الأمر: ${student.guardianAr}` : `Parent: ${student.guardianEn}`) : ""}</Typography></Box><Avatar sx={{ width: 62, height: 62, bgcolor: "primary.main", fontSize: 25 }}>{(ar ? student.nameAr : student.nameEn).charAt(0)}</Avatar></Stack>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4,1fr)" }, gap: 1.5, mb: 3 }}>{stats.map(([label, value]) => <Card key={label} variant="outlined"><CardContent><Typography color="text.secondary" variant="body2">{label}</Typography><Typography variant="h4" color="primary.main" fontWeight={850}>{value}</Typography></CardContent></Card>)}</Box>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
      <Card variant="outlined" sx={{ p: 3 }}><Typography variant="h6" fontWeight={850}>{ar ? "المعلم وجدول التسميع" : "Teacher and recitation schedule"}</Typography><Divider sx={{ my: 2 }} /><Typography>{teacher ? (ar ? teacher.nameAr : teacher.nameEn) : (ar ? "سيحدده المسؤول بعد مراجعة الطلب" : "An admin will assign a teacher after review")}</Typography><Stack direction="row" gap={1} flexWrap="wrap" sx={{ my: 2 }}>{student.requestedSlots.map((slot, index) => <Chip key={index} label={`${days[slot.weekday]} · ${slot.time}`} variant="outlined" />)}</Stack>{student.meetUrl ? <Button href={student.meetUrl} target="_blank" rel="noopener noreferrer" variant="contained">{ar ? "دخول رابط Google Meet الثابت" : "Open the reusable Google Meet link"}</Button> : <Alert severity="warning">{ar ? "رابط Google Meet سيظهر هنا بعد إضافته من لوحة الإدارة." : "The Google Meet link will appear here after an admin adds it."}</Alert>}</Card>
      <Card variant="outlined" sx={{ p: 3 }}><Typography variant="h6" fontWeight={850}>{ar ? "آخر حصة والخطوة القادمة" : "Latest lesson and next step"}</Typography><Divider sx={{ my: 2 }} />{summary.latest ? <><Typography color="text.secondary" variant="body2">{summary.latest.date} · {summary.latest.stage}</Typography>{summary.latest.past && summary.latest.newMaterial ? <><Typography sx={{ mt: 1 }}><strong>{ar ? "الماضي:" : "Past:"}</strong> {formatPassage(summary.latest.past, ar)}</Typography><Typography><strong>{ar ? "الجديد:" : "New:"}</strong> {formatPassage(summary.latest.newMaterial, ar)}</Typography></> : <Typography sx={{ mt: 1 }}><strong>{ar ? "سمع:" : "Recited:"}</strong> {summary.latest.heard}</Typography>}<Typography><strong>{ar ? "سيسمع:" : "Next:"}</strong> {summary.latest.next}</Typography><Typography><strong>{ar ? "الدرجة:" : "Grade:"}</strong> {summary.latest.grade}/100</Typography><LinearProgress variant="determinate" value={summary.latest.grade} sx={{ mt: 2, height: 8, borderRadius: 2 }} /><Typography color="text.secondary" variant="body2" sx={{ mt: 2 }}>{summary.latest.notes}</Typography></> : <Typography color="text.secondary">{ar ? "لم يسجل المعلم حصة بعد." : "No lesson has been recorded yet."}</Typography>}</Card>
    </Box>
    <Typography variant="h5" fontWeight={850} sx={{ mb: 2 }}>{ar ? "سجل التعلم من البداية" : "Learning history from the start"}</Typography><Stack spacing={1.5}>{summary.sorted.map((record, index) => <Card key={record.id} variant="outlined" sx={{ p: 2.5 }}><Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1}><Box><Typography fontWeight={850}>{summary.sorted.length - index}. {record.stage}</Typography><Typography variant="body2" color="text.secondary">{record.date} · {record.minutes} {ar ? "دقيقة" : "minutes"}</Typography></Box><Chip color="primary" label={`${record.grade}/100`} sx={{ alignSelf: "flex-start" }} /></Stack>{record.past && record.newMaterial ? <><Typography variant="body2" sx={{ mt: 1 }}>{ar ? "الماضي" : "Past"}: {formatPassage(record.past, ar)}</Typography><Typography variant="body2">{ar ? "الجديد" : "New"}: {formatPassage(record.newMaterial, ar)}</Typography></> : <Typography variant="body2" sx={{ mt: 1 }}>{ar ? "سمع" : "Recited"}: {record.heard}</Typography>}<Typography variant="body2">{ar ? "التالي" : "Next"}: {record.next}</Typography><Typography variant="body2" color="text.secondary">{record.notes}</Typography></Card>)}</Stack>
  </Container></Box>;
}
