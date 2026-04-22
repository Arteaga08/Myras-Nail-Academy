"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useExploreCourses } from "@/hooks/useExploreCourses";
import { useMyEnrollments } from "@/hooks/useMyEnrollments";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  MagnifyingGlassIcon as MagnifyingGlass,
  SparkleIcon as Sparkle,
} from "@phosphor-icons/react/ssr";
import { NailAccent, NailSparkle } from "@/components/ui/DecorativeAssets";
import { CourseCatalogGrid } from "./_components/CourseCatalogGrid";
import { CatalogHeader } from "./_components/CatalogHeader";
import { WhyMyrasSection } from "./_components/WhyMyrasSection";
import { PurchaseModal } from "./_components/PurchaseModal";
import type { Course } from "@/hooks/useExploreCourses";

export default function ExplorePage() {
  const { token } = useStudentAuth();
  const { courses, enrolledIds, isLoading, error } = useExploreCourses();
  const { mutate: refreshEnrollments } = useMyEnrollments();
  const searchParams = useSearchParams();
  const router = useRouter();
  const buyIntent = searchParams.get("buy");

  const [autoOpenCourse, setAutoOpenCourse] = useState<Course | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!buyIntent || !token || isLoading || courses.length === 0) return;

    const course = courses.find((c) => c._id === buyIntent);
    if (course && !enrolledIds.has(course._id)) {
      setAutoOpenCourse(course);
      router.replace("/student/explore", { scroll: false });
    }
  }, [buyIntent, token, isLoading, courses, enrolledIds, router]);

  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesCategory =
        !selectedCategoryId || c.category?._id === selectedCategoryId;
      const matchesSearch = !term || c.title.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategoryId, searchTerm]);

  if (isLoading) return <FullPageSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-neutral-500">
        No se pudieron cargar los cursos. Intenta de nuevo más tarde.
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ✨ HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-500 to-rose-400 px-6 py-8 shadow-lg sm:px-12 sm:py-10">
          {/* Orbes ambientales */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            {/* Texto */}
            <div>
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                <Sparkle size={14} weight="fill" />
                <span>Catálogo de Especialización</span>
              </div>

              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Eleva tu arte al siguiente nivel
              </h1>

              <p className="mt-4 text-base leading-relaxed text-rose-100 sm:text-lg">
                Descubre nuevas metodologías y domina técnicas exclusivas.
                Expande los servicios de tu salón y conviértete en una autoridad
                del sector.
              </p>
            </div>

            {/* Composición decorativa ambiental */}
            <div className="pointer-events-none relative hidden h-48 lg:block">
              <div className="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute right-4 top-2 opacity-40">
                <NailAccent size={80} className="**:fill-white!" />
              </div>
              <div className="absolute bottom-0 right-24 opacity-60">
                <NailSparkle
                  size={140}
                  className="**:fill-white! **:opacity-30!"
                />
              </div>
              <div className="absolute left-4 top-10 opacity-50">
                <NailSparkle
                  size={48}
                  className="**:fill-white! **:opacity-40!"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BARRA DE CATÁLOGO */}
        {courses.length > 0 && (
          <CatalogHeader
            courses={courses}
            totalCount={filteredCourses.length}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={setSelectedCategoryId}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        )}

        {/* CONTENIDO DEL CATÁLOGO */}
        {courses.length === 0 ? (
          <EmptyState
            icon={<MagnifyingGlass size={28} />}
            title="No hay cursos disponibles"
            description="Próximamente habrá nuevos cursos para ti."
          />
        ) : filteredCourses.length === 0 ? (
          <EmptyState
            icon={<MagnifyingGlass size={28} />}
            title="No encontramos cursos con esos filtros"
            description="Prueba con otra categoría o búsqueda diferente."
          />
        ) : (
          <CourseCatalogGrid
            courses={filteredCourses}
            enrolledIds={enrolledIds}
            onEnrollSuccess={() => refreshEnrollments()}
          />
        )}

        {/* ¿POR QUÉ MYRA'S? */}
        <WhyMyrasSection />
      </div>

      {autoOpenCourse && (
        <PurchaseModal
          course={autoOpenCourse}
          onClose={() => setAutoOpenCourse(null)}
          onSuccess={() => {
            refreshEnrollments();
            setAutoOpenCourse(null);
          }}
        />
      )}
    </>
  );
}
