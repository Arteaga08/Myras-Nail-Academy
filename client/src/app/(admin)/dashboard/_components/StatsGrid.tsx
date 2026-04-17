import {
  CurrencyDollarIcon as CurrencyDollar,
  ShoppingBagIcon as ShoppingBag,
  UsersIcon as Users,
  BookOpenIcon as BookOpen,
  GraduationCapIcon as GraduationCap,
} from '@phosphor-icons/react/ssr'
import { StatCard } from './StatCard'
import { formatCurrency } from '@/lib/formatters'

interface StatsGridProps {
  totalRevenue: number
  totalOrders: number
  totalStudents: number
  totalCourses: number
  completedCourses: number
}

export function StatsGrid({
  totalRevenue,
  totalOrders,
  totalStudents,
  totalCourses,
  completedCourses,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 md:gap-6">
      <StatCard
        label="Ingresos totales"
        value={formatCurrency(totalRevenue / 100)}
        icon={<CurrencyDollar size={24} />}
        variant="brand"
      />
      <StatCard
        label="Órdenes pagadas"
        value={totalOrders.toString()}
        icon={<ShoppingBag size={24} />}
      />
      <StatCard
        label="Estudiantes"
        value={totalStudents.toString()}
        icon={<Users size={24} />}
      />
      <StatCard
        label="Cursos publicados"
        value={totalCourses.toString()}
        icon={<BookOpen size={24} />}
      />
      <StatCard
        label="Cursos completados"
        value={completedCourses.toString()}
        icon={<GraduationCap size={24} />}
      />
    </div>
  )
}
