'use client'

import { MagnifyingGlassIcon as MagnifyingGlass } from '@phosphor-icons/react/ssr'
import { Button } from '@/components/ui/Button'
import { NailSparkle } from '@/components/ui/DecorativeAssets'
import type { Course } from '@/hooks/useExploreCourses'

interface CatalogHeaderProps {
  courses: Course[]
  totalCount: number
  selectedCategoryId: string | null
  onCategoryChange: (id: string | null) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function CatalogHeader({
  courses,
  totalCount,
  selectedCategoryId,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: CatalogHeaderProps) {
  const categoryMap = new Map<string, string>()
  for (const course of courses) {
    if (course.category && !categoryMap.has(course.category._id)) {
      categoryMap.set(course.category._id, course.category.name)
    }
  }
  const categories = Array.from(categoryMap, ([id, name]) => ({ id, name }))

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        <NailSparkle size={16} className="shrink-0" />
        <span>
          {totalCount} {totalCount === 1 ? 'curso disponible' : 'cursos disponibles'}
        </span>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={selectedCategoryId === null ? 'primary' : 'secondary'}
            size="md"
            onClick={() => onCategoryChange(null)}
          >
            Todos
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              type="button"
              variant={selectedCategoryId === cat.id ? 'primary' : 'secondary'}
              size="md"
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      )}

      <div className="relative w-full md:w-64">
        <MagnifyingGlass
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar curso..."
          className="w-full rounded-full border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>
    </div>
  )
}
