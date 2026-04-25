"use client";

import Link from "next/link";
import {
  StarIcon as Star,
  BookOpenIcon as BookOpen,
} from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/formatters";
import type { Course } from "@/hooks/useExploreCourses";

interface ExploreCourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onEnrollSuccess?: () => void;
}

export function ExploreCourseCard({
  course,
  isEnrolled,
}: ExploreCourseCardProps) {
  const effectivePrice = course.isOnSale ? course.salePrice : course.price;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      {/* Thumbnail: Lleva a los detalles del curso */}
      <Link href={`/cursos/${course.slug}`} className="block">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-52 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-52 w-full items-center justify-center bg-rose-50">
            <BookOpen size={48} className="text-rose-300" />
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        {/* Category */}
        {course.category && (
          <Badge color="rose" className="self-start">
            {course.category.name}
          </Badge>
        )}

        {/* Title */}
        <Link href={`/cursos/${course.slug}`}>
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-neutral-900 transition-colors hover:text-rose-600">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        {course.shortDescription && (
          <p className="line-clamp-2 text-sm text-neutral-500">
            {course.shortDescription}
          </p>
        )}

        {/* Rating */}
        {course.reviewCount > 0 && (
          <div className="flex items-center gap-1">
            <Star size={14} weight="fill" className="text-lavender-400" />
            <span className="text-sm font-semibold text-neutral-700">
              {course.averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-neutral-400">
              ({course.reviewCount} reseñas)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-neutral-900">
            {formatCurrency(effectivePrice)}
          </span>
          {course.isOnSale && (
            <span className="text-sm text-neutral-400 line-through">
              {formatCurrency(course.price)}
            </span>
          )}
        </div>

        {/* Action */}
        {isEnrolled ? (
          <div className="flex items-center gap-2">
            <Badge color="success">Ya inscrita ✓</Badge>
            <Link href={`/student/courses/${course.slug}`} className="w-full">
              <Button variant="ghost" size="md" className="w-full">
                Ir al curso
              </Button>
            </Link>
          </div>
        ) : (
          <Link href={`/checkout/${course._id}`} className="w-full">
            <Button variant="primary" size="md" className="w-full">
              Comprar
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
