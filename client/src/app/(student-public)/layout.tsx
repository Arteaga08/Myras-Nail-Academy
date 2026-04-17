import { StudentShell } from '@/components/layout/StudentShell'

export default function StudentPublicLayout({ children }: { children: React.ReactNode }) {
  return <StudentShell>{children}</StudentShell>
}
