'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { truncate } from '@/lib/formatters'

interface CourseBreakdownChartProps {
  data: { _id: string; title: string; enrollmentCount: number }[]
}

export function CourseBreakdownChart({ data }: CourseBreakdownChartProps) {
  const chartData = data.map((d) => ({
    name: truncate(d.title, 22),
    inscripciones: d.enrollmentCount,
  }))

  return (
    <div>
      <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
        Cursos más populares
      </h2>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-neutral-400">
            Sin datos de inscripciones
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#E4E4E7"
              />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#71717A' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{ fontSize: 12, fill: '#52525B' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: '#FFF5F8' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #E4E4E7',
                  fontSize: '13px',
                  boxShadow: '0 4px 12px rgba(24,24,27,0.08)',
                }}
                formatter={(value) => [value ?? 0, 'Inscripciones']}
              />
              <Bar
                dataKey="inscripciones"
                fill="#E91E63"
                radius={[0, 6, 6, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
