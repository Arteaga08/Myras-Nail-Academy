'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { useAdminStats } from '@/hooks/useAdminStats'
import { StatsGrid } from './_components/StatsGrid'
import { RecentEnrollmentsTable } from './_components/RecentEnrollmentsTable'
import { CourseBreakdownChart } from './_components/CourseBreakdownChart'

export default function DashboardPage() {
  const { stats, isLoading, error } = useAdminStats()

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar estadísticas. Intenta recargar la página.
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Resumen general de la academia"
      />

      <StatsGrid
        totalRevenue={stats.totalRevenue}
        totalOrders={stats.totalOrders}
        totalStudents={stats.totalStudents}
        totalCourses={stats.totalCourses}
        completedCourses={stats.completedCourses}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentEnrollmentsTable enrollments={stats.recentEnrollments} />
        <CourseBreakdownChart data={stats.courseBreakdown} />
      </div>
    </div>
  )
}
