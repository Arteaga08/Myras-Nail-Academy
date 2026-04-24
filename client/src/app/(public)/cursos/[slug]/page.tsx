"use client";

import { use } from "react";
import { useCourseBySlug } from "@/hooks/useCourseBySlug";
import { CourseHero } from "./_components/CourseHero";
import { CourseContentSection } from "./_components/CourseContentSection"; // <-- NUEVO COMPONENTE MAESTRO
import { CourseInstructor } from "./_components/CourseInstructor";
import { CourseCertificate } from "./_components/CourseCertificate";
import { CourseSalesCtaSection } from "@/app/_components/CourseSalesCtaSection";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  const { slug } = use(params);
  const { course, isLoading, error } = useCourseBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="font-display text-2xl font-bold text-neutral-900">
          Curso no encontrado
        </span>
        <p className="text-neutral-500">
          El curso que buscas no existe o ya no está disponible.
        </p>
      </div>
    );
  }

  return (
    <main>
      <CourseHero course={course} />

      <CourseContentSection course={course} />
      <div className="mx-auto flex max-w-350 flex-col gap-8 px-4 pb-12 sm:px-6 lg:gap-12 lg:pb-20">
        <CourseInstructor />
        <CourseCertificate />
      </div>
      <CourseSalesCtaSection />
    </main>
  );
}
