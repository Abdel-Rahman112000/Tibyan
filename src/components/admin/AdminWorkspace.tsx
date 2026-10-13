"use client";

import * as React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Alert, Box, Button, Card, Chip, Container, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { demoTeachers } from "@/lib/enrollment/demoData";
import { getDemoTeachers } from "@/lib/enrollment/demoAvailability";
import { DEMO_REQUEST_EVENT, getDemoRequest, saveDemoRequest, type DemoRequest } from "@/lib/enrollment/demoRequest";
import { DEMO_STUDENT_EVENT, getDemoStudent, initialDemoStudent, saveDemoStudent } from "@/lib/enrollment/demoStudent";

export default function AdminWorkspace() {
  const locale = useLocale();
  const ar = locale === "ar";
  const [student, setStudent] = React.useState(initialDemoStudent);
  const [request, setRequest] = React.useState<DemoRequest | null>(null);
  const [teacherId, setTeacherId] = React.useState(initialDemoStudent.teacherId ?? "");
  const [meetUrl, setMeetUrl] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  const [teachers, setTeachers] = React.useState(demoTeachers);
  React.useEffect(() => {
    const refresh = () => {
      const current = getDemoStudent();
      const latestRequest = getDemoRequest();
      const matchesAssignment = !latestRequest ||
        (current.program === latestRequest.program && JSON.stringify(current.requestedSlots) === JSON.stringify(latestRequest.requestedSlots));
      setStudent(current);
      setRequest(latestRequest);
      setTeacherId(matchesAssignment ? current.teacherId ?? "" : "");
      setMeetUrl(matchesAssignment ? current.meetUrl : "");
      setTeachers(getDemoTeachers());
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(DEMO_REQUEST_EVENT, refresh);
    window.addEventListener(DEMO_STUDENT_EVENT, refresh);
    window.addEventListener("tibyan-demo-availability", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(DEMO_REQUEST_EVENT, refresh);
      window.removeEventListener(DEMO_STUDENT_EVENT, refresh);
      window.removeEventListener("tibyan-demo-availability", refresh);
    };
  }, []);

  const program = request?.program ?? student.program;
  const requestedSlots = request?.requestedSlots ?? student.requestedSlots;
  const days = ar ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const programLabels = ar
    ? { reading: "القراءة الصحيحة", tajweed: "التجويد والتلاوة", memorization: "الحفظ والمراجعة" }
    : { reading: "Confident reading", tajweed: "Tajweed & recitation", memorization: "Memorization & review" };
  const eligible = teachers.filter((teacher) => teacher.focus.includes(program) && requestedSlots.every((slot) =>
    (teacher.weeklySlots[slot.weekday] ?? []).includes(slot.time)));
  const save = () => {
    if (teacherId && !eligible.some((teacher) => teacher.id === teacherId)) {
      setFeedback(ar ? "هذا المعلم لا يغطي ساعة الطالب المطلوبة كاملة." : "This teacher cannot cover the learner's full requested hour.");
      return;
    }
    if (meetUrl.trim() && !teacherId) {
      setFeedback(ar ? "عيّن المعلم أولًا قبل نشر رابط اللقاء." : "Assign a teacher before publishing the meeting link.");
      return;
    }
    if (meetUrl.trim() && !/^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/i.test(meetUrl.trim())) {
      setFeedback(ar ? "أدخل رابط Google Meet صحيحًا بصيغة meet.google.com/xxx-xxxx-xxx." : "Enter a valid Google Meet link in the form meet.google.com/xxx-xxxx-xxx.");
      return;
    }
    saveDemoStudent({ ...student, program, requestedSlots, teacherId: teacherId || null, meetUrl: teacherId ? meetUrl.trim() : "" });
    if (request) saveDemoRequest({ ...request, status: teacherId ? "assigned" : "pending" });
    setFeedback(ar ? "حُفظت مراجعة المواعيد في هذا المتصفح." : "Schedule review saved in this browser.");
  };

  return <Box component="main" dir={ar ? "rtl" : "ltr"} sx={{ minHeight: "100dvh", bgcolor: "background.default", py: 4 }}><Container maxWidth="md">
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}><Typography component={Link} href={`/${locale}`} color="primary.main" sx={{ fontSize: 22, fontWeight: 900, textDecoration: "none" }}>{ar ? "تبيان" : "Tibyan"}</Typography><Chip label={ar ? "معاينة الإدارة" : "Admin preview"} color="warning" variant="outlined" /></Stack>
    <Typography variant="h4" fontWeight={900}>{ar ? "مراجعة الوقت وتعيين المعلم" : "Review times and assign a teacher"}</Typography>
    <Typography color="text.secondary" sx={{ mb: 2 }}>{ar ? "الطالب يرسل الساعة الأسبوعية التي يفضلها. الإدارة تتحقق من توفر المعلمين ثم تؤكد التعيين أو تتواصل معه لتغيير الوقت." : "The learner requests a preferred weekly hour. An admin checks teacher availability, then assigns a teacher or contacts the learner about another time."}</Typography>
    <Alert severity="warning" sx={{ mb: 3 }}>{ar ? "هذه معاينة محلية ببيانات طالب افتراضي. طلب التسجيل لا يحفظ الاسم أو البريد أو كلمة المرور، ولا توجد حجوزات أو صلاحيات فعلية. يلزم خادم لمنع تعارض الحجوزات وإنشاء Google Meet تلقائيًا." : "This is a local preview with a fictional learner. Enrollment does not save identity or passwords, and there are no real bookings or permissions. A backend is needed to prevent booking conflicts and create Google Meet links automatically."}</Alert>
    <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
      <Typography variant="h6" fontWeight={850}>{request ? (ar ? "أحدث طلب وقت من الطالب" : "Latest learner time request") : (ar ? "طالب افتراضي للمعاينة" : "Fictional learner preview")}</Typography>
      <Typography color="text.secondary">{programLabels[program]} · {ar ? "ساعة أسبوعيًا" : "One hour weekly"}</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 1.5 }}>{requestedSlots.map((slot, index) => <Chip key={index} label={`${days[slot.weekday]} · ${slot.time}–${String(Number(slot.time.slice(0, 2)) + (slot.time.endsWith("30") ? 1 : 0)).padStart(2, "0")}:${slot.time.endsWith("30") ? "00" : "30"}`} variant="outlined" />)}</Stack>
      <Divider sx={{ my: 2 }} />
      {eligible.length === 0 && <Alert severity="warning" sx={{ mb: 2 }}>{ar ? "لا يوجد معلم يغطي الوقت المطلوب كاملًا في جدول المعاينة. اترك الطلب دون تعيين وتواصل مع الطالب لاقتراح وقت آخر." : "No teacher covers the full requested time in this preview schedule. Leave the request unassigned and contact the learner about another time."}</Alert>}
      <Stack spacing={2}><TextField select label={ar ? "المعلم المعيّن" : "Assigned teacher"} value={teacherId} onChange={(event) => { setTeacherId(event.target.value); setFeedback(""); }} helperText={ar ? "الأسماء هنا للإدارة فقط، ويظهر من يغطي الفترتين كاملتين." : "Only admins see names here; listed teachers cover both 30 minute slots."}><MenuItem value="">{ar ? "لم يُعيّن بعد" : "Not assigned"}</MenuItem>{eligible.map((teacher) => <MenuItem key={teacher.id} value={teacher.id}>{ar ? teacher.nameAr : teacher.nameEn}</MenuItem>)}</TextField><TextField label={ar ? "رابط Google Meet الثابت" : "Reusable Google Meet link"} type="url" value={meetUrl} onChange={(event) => setMeetUrl(event.target.value)} placeholder="https://meet.google.com/abc-defg-hij" helperText={ar ? "أضف الرابط بعد تأكيد المعلم والوقت." : "Add the link after confirming the teacher and time."} /><Button variant="contained" onClick={save} sx={{ alignSelf: "flex-start" }}>{ar ? "حفظ مراجعة الطلب" : "Save request review"}</Button>{feedback && <Alert severity={feedback.includes("حُفظت") || feedback.includes("saved") ? "success" : "error"}>{feedback}</Alert>}</Stack>
    </Card>
    <Stack direction="row" gap={1}><Button component={Link} href={`/${locale}/student`} variant="outlined">{ar ? "معاينة صفحة الطالب" : "Student preview"}</Button><Button component={Link} href={`/${locale}/teacher`} variant="outlined">{ar ? "معاينة لوحة المعلم" : "Teacher preview"}</Button></Stack>
  </Container></Box>;
}
