"use client";

import * as React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { alpha } from "@mui/material/styles";
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Divider, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { demoTeachers, type DemoTeacher } from "@/lib/enrollment/demoData";
import { getDemoTeachers, resetDemoSlots, saveDemoSlots } from "@/lib/enrollment/demoAvailability";
import { DEMO_STUDENT_EVENT, getDemoStudents, getLiveSessionStatus, getWeeklySessions, initialDemoStudents } from "@/lib/enrollment/demoStudent";
import TeacherStudentPanel from "./TeacherStudentPanel";

type View = "overview" | "schedule" | "availability" | "students";
const views: View[] = ["overview", "schedule", "availability", "students"];
const possibleTimes = Array.from({ length: 28 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

export default function TeacherWorkspace() {
  const t = useTranslations("teacherDemo");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [view, setView] = React.useState<View>("overview");
  const [teacherId, setTeacherId] = React.useState(demoTeachers[0].id);
  const [teachers, setTeachers] = React.useState(demoTeachers);
  const [day, setDay] = React.useState(0);
  const [time, setTime] = React.useState("09:00");
  const [feedback, setFeedback] = React.useState("");
  const [students, setStudents] = React.useState(initialDemoStudents);
  const [now, setNow] = React.useState(() => new Date());
  const days = t.raw("days") as string[];

  React.useEffect(() => {
    const refresh = () => setTeachers(getDemoTeachers());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("tibyan-demo-availability", refresh);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener("tibyan-demo-availability", refresh); };
  }, []);
  React.useEffect(() => {
    const refresh = () => setStudents(getDemoStudents());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(DEMO_STUDENT_EVENT, refresh);
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener(DEMO_STUDENT_EVENT, refresh); window.clearInterval(timer); };
  }, []);

  const teacher = teachers.find((item) => item.id === teacherId) ?? teachers[0];
  const teacherName = (item: DemoTeacher) => isArabic ? item.nameAr : item.nameEn;
  const slotCount = Object.values(teacher.weeklySlots).reduce((total, slots) => total + (slots?.length ?? 0), 0);
  const assignedStudents = students.filter((student) => student.teacherId === teacherId);
  const liveStudents = assignedStudents.map((student) => ({ student, status: getLiveSessionStatus(student.requestedSlots, now) })).filter((item) => item.status);
  const weeklyLessons = assignedStudents.flatMap((student) => getWeeklySessions(student.requestedSlots).map((session) => ({ student, session }))).sort((a, b) => a.session.weekday - b.session.weekday || a.session.start.localeCompare(b.session.start));
  const changeSlot = (targetDay: number, targetTime: string, add: boolean) => {
    const current = teacher.weeklySlots[targetDay] ?? [];
    if (add && current.includes(targetTime)) { setFeedback(t("availability.duplicate")); return; }
    saveDemoSlots(teacher.id, { ...teacher.weeklySlots, [targetDay]: add ? [...current, targetTime].sort() : current.filter((value) => value !== targetTime) });
    setTeachers(getDemoTeachers());
    setFeedback(t("availability.saved"));
  };

  return <Box component="main" dir={isArabic ? "rtl" : "ltr"} sx={{ minHeight: "100dvh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
    <Box component="aside" sx={{ width: { xs: "100%", md: 230 }, flexShrink: 0, bgcolor: "primary.dark", color: "#fff", p: { xs: 2, md: 3 }, display: "flex", flexDirection: { xs: "row", md: "column" }, alignItems: { xs: "center", md: "stretch" }, gap: 2 }}>
      <Stack direction="row" gap={1} alignItems="center"><Avatar sx={{ bgcolor: "secondary.light", color: "primary.dark", width: 38, height: 38 }}><AutoStoriesOutlinedIcon fontSize="small" /></Avatar><Box><Typography fontWeight={900} lineHeight={1.1}>{t("brand")}</Typography><Typography fontSize={11} sx={{ opacity: .76 }}>{t("workspace")}</Typography></Box></Stack>
      <Chip label={t("preview")} size="small" variant="outlined" sx={{ alignSelf: { xs: "center", md: "flex-start" }, color: "secondary.light", borderColor: "secondary.light", ml: { xs: "auto", md: 0 } }} />
      <Stack spacing={.7} sx={{ mt: 4, display: { xs: "none", md: "flex" } }}>{views.map((item) => <Button key={item} onClick={() => { setView(item); setFeedback(""); }} startIcon={item === "overview" || item === "students" ? <GroupsOutlinedIcon /> : item === "schedule" ? <CalendarMonthOutlinedIcon /> : <EventAvailableOutlinedIcon />} sx={{ justifyContent: "flex-start", color: view === item ? "primary.dark" : "#e0ede2", bgcolor: view === item ? "secondary.light" : "transparent", fontWeight: 750, "&:hover": { bgcolor: view === item ? "secondary.light" : "#ffffff1a" } }}>{item === "students" ? (isArabic ? "الطلاب والتقدم" : "Learners & progress") : t(`tabs.${item}`)}</Button>)}</Stack>
      <Button component={Link} href={`/${locale}/auth/login`} sx={{ mt: "auto", display: { xs: "none", md: "flex" }, color: "#d7e4d8", fontSize: 12, justifyContent: "flex-start" }}>{t("back")}</Button>
    </Box>
    <Box sx={{ flex: 1, minWidth: 0, maxWidth: 1400, mx: "auto", width: "100%", p: { xs: 2, sm: 3, lg: 4 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} gap={2} sx={{ mb: 2 }}><Box><Typography color="secondary.dark" fontSize={12} fontWeight={850}>{t("workspace")}</Typography><Typography variant="h5" fontWeight={850}>{teacherName(teacher)}</Typography></Box><TextField select size="small" label={t("teacherLabel")} value={teacherId} onChange={(event) => { setTeacherId(event.target.value); setFeedback(""); }} sx={{ minWidth: 210, bgcolor: "background.paper" }}>{teachers.map((item) => <MenuItem value={item.id} key={item.id}>{teacherName(item)}</MenuItem>)}</TextField></Stack>
      <Alert severity="info" sx={{ mb: 2, fontSize: 12 }}>{t("notice")}</Alert>
      {liveStudents.map(({ student, status }) => status && <Alert key={student.id} severity={status.kind === "now" ? "success" : "warning"} sx={{ mb: 2 }}>{status.kind === "now" ? (isArabic ? `حصة ${student.nameAr} الآن` : `${student.nameEn}'s lesson is now`) : (isArabic ? `حصة ${student.nameAr} بعد ${status.minutes} دقيقة` : `${student.nameEn}'s lesson starts in ${status.minutes} minutes`)}{student.meetUrl && <Button size="small" href={student.meetUrl} target="_blank" rel="noopener noreferrer" sx={{ mx: 1 }}>{isArabic ? "دخول Google Meet" : "Join Google Meet"}</Button>}</Alert>)}
      <Tabs value={view} onChange={(_, next: View) => { setView(next); setFeedback(""); }} variant="scrollable" scrollButtons="auto" sx={{ display: { xs: "flex", md: "none" }, mb: 2, bgcolor: "background.paper", borderRadius: 2 }}>{views.map((item) => <Tab key={item} value={item} label={item === "students" ? (isArabic ? "الطلاب والتقدم" : "Learners & progress") : t(`tabs.${item}`)} sx={{ fontSize: 12, minWidth: 0 }} />)}</Tabs>

      {view === "overview" && <Stack spacing={2}>
        <Box><Typography variant="h4" sx={{ fontWeight: 850, fontSize: { xs: 24, sm: 30 } }}>{t("overview.title")}</Typography><Typography color="text.secondary" fontSize={14}>{t("overview.subtitle")}</Typography></Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 1.5 }}>{([["students", assignedStudents.length], ["sessions", assignedStudents.reduce((total, student) => total + student.history.length, 0)], ["slots", slotCount]] as const).map(([key, value]) => <Card key={key} variant="outlined" sx={{ borderRadius: 3 }}><CardContent sx={{ p: { xs: 1.5, sm: 2.5 }, "&:last-child": { pb: { xs: 1.5, sm: 2.5 } } }}><Typography color="text.secondary" sx={{ fontSize: { xs: 10, sm: 13 } }}>{t(`overview.${key}`)}</Typography><Typography color="primary.main" sx={{ fontSize: { xs: 24, sm: 32 }, fontWeight: 850 }}>{value}</Typography></CardContent></Card>)}</Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.15fr .85fr" }, gap: 2 }}><Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}><Stack direction="row" alignItems="center" gap={1}><CalendarMonthOutlinedIcon color="secondary" /><Typography variant="h6" fontWeight={800}>{isArabic ? "حصص الطلاب الأسبوعية" : "Weekly learner lessons"}</Typography></Stack><Divider sx={{ my: 2 }} />{weeklyLessons.length ? <Stack spacing={1.5}>{weeklyLessons.map(({ student, session }) => <Stack key={`${student.id}-${session.weekday}-${session.start}`} direction="row" justifyContent="space-between" gap={2} alignItems="center"><Box><Typography fontWeight={800}>{isArabic ? student.nameAr : student.nameEn}</Typography><Typography variant="body2" color="text.secondary">{days[session.weekday]} · {session.start}–{session.end} · {session.minutes} {isArabic ? "دقيقة" : "min"}</Typography></Box><Button size="small" onClick={() => setView("students")}>{isArabic ? "التسميع" : "Recitation"}</Button></Stack>)}</Stack> : <Typography color="text.secondary">{t("overview.empty")}</Typography>}</Paper><Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}><Typography variant="h6" fontWeight={800}>{t("overview.flowTitle")}</Typography><Stack spacing={1.5} sx={{ mt: 2 }}>{(["flow1", "flow2", "flow3", "flow4"] as const).map((key, index) => <Stack direction="row" gap={1.5} alignItems="flex-start" key={key}><Avatar sx={{ width: 24, height: 24, fontSize: 11, bgcolor: index === 0 ? "primary.main" : (theme) => alpha(theme.palette.primary.main, .1), color: index === 0 ? "#fff" : "primary.main" }}>{index + 1}</Avatar><Typography fontSize={13}>{t(`overview.${key}`)}</Typography></Stack>)}</Stack></Paper></Box>
        <Button onClick={() => setView("availability")} variant="contained" sx={{ alignSelf: "flex-start" }}>{t("tabs.availability")}</Button>
      </Stack>}

      {view === "schedule" && <Stack spacing={2}>
        <Box><Typography variant="h4" sx={{ fontWeight: 850, fontSize: { xs: 24, sm: 30 } }}>{t("schedule.title")}</Typography><Typography color="text.secondary" fontSize={14}>{t("schedule.subtitle")}</Typography></Box><Chip label={t("timezone")} variant="outlined" sx={{ alignSelf: "flex-start" }} />
        <Typography variant="h6" fontWeight={850}>{isArabic ? "الطلاب ومواعيد حصصهم" : "Learners and their lesson times"}</Typography>
        {weeklyLessons.length ? <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,minmax(0,1fr))" }, gap: 1.5 }}>{weeklyLessons.map(({ student, session }) => <Paper key={`${student.id}-${session.weekday}-${session.start}`} variant="outlined" sx={{ p: 2, borderRadius: 3 }}><Typography fontWeight={850}>{isArabic ? student.nameAr : student.nameEn}</Typography><Typography color="text.secondary" variant="body2">{days[session.weekday]} · {session.start}–{session.end} · {session.minutes} {isArabic ? "دقيقة" : "min"}</Typography></Paper>)}</Box> : <Alert severity="info">{isArabic ? "لا يوجد طلاب معيّنون لهذا المعلم في المعاينة." : "No preview learners are assigned to this teacher."}</Alert>}
        <Divider /><Typography variant="h6" fontWeight={850}>{isArabic ? "أوقات توفر المعلم" : "Teacher availability"}</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,minmax(0,1fr))", sm: "repeat(3,minmax(0,1fr))", lg: "repeat(4,minmax(0,1fr))" }, gap: 1.5 }}>{days.map((label, index) => <Paper key={label} variant="outlined" sx={{ p: 2, borderRadius: 3, minHeight: 120 }}><Typography fontWeight={800} sx={{ mb: 1 }}>{label}</Typography><Stack direction="row" flexWrap="wrap" gap={.7}>{(teacher.weeklySlots[index] ?? []).length ? (teacher.weeklySlots[index] ?? []).map((slot) => <Chip key={slot} label={slot} size="small" sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, .1), color: "primary.main", fontWeight: 750 }} />) : <Typography color="text.secondary" fontSize={12}>{t("schedule.emptyDay")}</Typography>}</Stack></Paper>)}</Box>
        <Alert severity="success">{t("schedule.noBooking")}</Alert><Button variant="contained" onClick={() => setView("availability")} sx={{ alignSelf: "flex-start" }}>{t("schedule.edit")}</Button>
      </Stack>}

      {view === "availability" && <Stack spacing={2}>
        <Box><Typography variant="h4" sx={{ fontWeight: 850, fontSize: { xs: 24, sm: 30 } }}>{t("availability.title")}</Typography><Typography color="text.secondary" fontSize={14}>{t("availability.subtitle")}</Typography></Box><Alert severity="warning" sx={{ fontSize: 12 }}>{t("availability.hint")}</Alert>
        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}><Stack direction={{ xs: "column", sm: "row" }} gap={1.5} alignItems={{ xs: "stretch", sm: "center" }}><TextField select size="small" label={t("availability.day")} value={day} onChange={(event) => { setDay(Number(event.target.value)); setFeedback(""); }} sx={{ minWidth: 150 }}>{days.map((label, index) => <MenuItem key={label} value={index}>{label}</MenuItem>)}</TextField><TextField select size="small" label={t("availability.time")} value={time} onChange={(event) => setTime(event.target.value)} sx={{ minWidth: 130 }}>{possibleTimes.map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}</TextField><Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => changeSlot(day, time, true)} sx={{ minHeight: 40 }}>{t("availability.add")}</Button></Stack><Divider sx={{ my: 2.5 }} /><Typography fontWeight={800} sx={{ mb: 1.5 }}>{days[day]} · {t("timezone")}</Typography><Stack direction="row" flexWrap="wrap" gap={1}>{(teacher.weeklySlots[day] ?? []).length ? (teacher.weeklySlots[day] ?? []).map((slot) => <Chip key={slot} label={slot} onDelete={() => changeSlot(day, slot, false)} sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, .1), fontWeight: 750 }} />) : <Typography color="text.secondary" fontSize={13}>{t("availability.empty")}</Typography>}</Stack></Paper>
        {feedback && <Alert severity={feedback === t("availability.duplicate") ? "warning" : "success"}>{feedback}</Alert>}<Button startIcon={<RestartAltRoundedIcon />} variant="outlined" onClick={() => { resetDemoSlots(teacher.id); setTeachers(getDemoTeachers()); setFeedback(t("availability.saved")); }} sx={{ alignSelf: "flex-start" }}>{t("availability.reset")}</Button><Button component={Link} href={`/${locale}/admin`} variant="text" sx={{ alignSelf: "flex-start" }}>{isArabic ? "معاينة مراجعة الطلبات في الإدارة" : "Preview request review in admin"}</Button>
      </Stack>}
      {view === "students" && <TeacherStudentPanel key={teacherId} teacherId={teacherId} ar={isArabic} />}
      <Button component={Link} href={`/${locale}/auth/login`} sx={{ display: { xs: "flex", md: "none" }, mt: 3, fontSize: 12 }}>{t("back")}</Button>
    </Box>
  </Box>;
}
