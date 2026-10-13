import StudentWorkspace from "@/components/student/StudentWorkspace";

export default async function StudentPage({ searchParams }: { searchParams: Promise<{ student?: string }> }) {
  const { student } = await searchParams;
  return <StudentWorkspace studentId={student} />;
}
