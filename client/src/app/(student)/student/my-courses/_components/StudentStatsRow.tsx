import {
  BookOpenIcon as BookOpen,
  CheckCircleIcon as CheckCircle,
  ChartBarIcon as ChartBar,
} from '@phosphor-icons/react/ssr'
import { Card } from '@/components/ui/Card'

interface StudentStatsRowProps {
  total: number
  completed: number
  average: number
}

const stats = (total: number, completed: number, average: number) => [
  {
    label: 'Cursos inscritos',
    value: total,
    icon: <BookOpen size={22} weight="bold" className="text-white" />,
    iconBg: 'bg-linear-to-br from-rose-400 to-rose-500',
  },
  {
    label: 'Cursos completados',
    value: completed,
    icon: <CheckCircle size={22} weight="bold" className="text-white" />,
    iconBg: 'bg-linear-to-br from-success-600 to-success-700',
  },
  {
    label: 'Progreso promedio',
    value: `${average}%`,
    icon: <ChartBar size={22} weight="bold" className="text-white" />,
    iconBg: 'bg-linear-to-br from-info-500 to-info-700',
  },
]

export function StudentStatsRow({ total, completed, average }: StudentStatsRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats(total, completed, average).map(({ label, value, icon, iconBg }) => (
        <Card
          key={label}
          variant="brand"
          className="flex items-center gap-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className={['flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', iconBg].join(' ')}>
            {icon}
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-neutral-900">{value}</p>
            <p className="text-sm text-neutral-500">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
