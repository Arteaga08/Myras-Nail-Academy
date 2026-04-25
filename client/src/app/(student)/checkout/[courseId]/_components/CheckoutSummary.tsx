import {
  BookOpenIcon as BookOpen,
  ClockIcon as Clock,
  StarIcon as Star,
  ShieldCheckIcon as ShieldCheck,
} from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDuration } from "@/lib/formatters";
import type { Course } from "@/hooks/useExploreCourses";

interface CheckoutSummaryProps {
  course: Course;
  amount: number;
}

export function CheckoutSummary({ course, amount }: CheckoutSummaryProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-4xl bg-linear-to-b from-white to-rose-50/30 shadow-xl shadow-rose-900/5 ring-1 ring-neutral-100">
      {/* Thumbnail a Sangre */}
      <div className="relative h-48 w-full bg-rose-50">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen size={48} className="text-rose-200" />
          </div>
        )}
        {/* Etiqueta flotante */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-rose-600 shadow-sm backdrop-blur-sm">
            Pago Único
          </span>
        </div>
      </div>

      {/* Contenido del Resumen */}
      <div className="flex flex-col p-6 sm:p-8">
        {/* Info del Curso */}
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold leading-snug text-neutral-900">
            {course.title}
          </h3>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-neutral-500">
            {course.totalLessons > 0 && (
              <span className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-rose-400" />
                {course.totalLessons} clases
              </span>
            )}
            {course.totalDuration > 0 && (
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-rose-400" />
                {formatDuration(course.totalDuration)}
              </span>
            )}
          </div>
        </div>

        {/* Separador punteado estilo Ticket */}
        <div className="my-6 w-full border-t-2 border-dashed border-neutral-200" />

        {/* Desglose de Precio */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-medium text-neutral-600">
            <span>Subtotal</span>
            <span>{formatCurrency(amount / 100)}</span>
          </div>

          {course.isOnSale && (
            <div className="flex items-center justify-between text-xs text-rose-500">
              <span>Descuento aplicado</span>
              <span>-{formatCurrency(course.price - amount / 100)}</span>
            </div>
          )}

          <div className="mt-2 flex items-baseline justify-between pt-4 border-t border-neutral-100">
            <span className="text-base font-bold text-neutral-900">
              Total a pagar
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-extrabold tracking-tight text-neutral-900">
                {formatCurrency(amount / 100)}
              </span>
              <span className="text-sm font-bold text-neutral-400">MXN</span>
            </div>
          </div>
        </div>

        {/* Garantía */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-neutral-100">
          <ShieldCheck
            size={24}
            weight="duotone"
            className="shrink-0 text-emerald-500"
          />
          <p className="text-xs leading-relaxed text-neutral-500">
            <strong className="font-semibold text-neutral-700">
              Acceso Inmediato.
            </strong>{" "}
            Al completar el pago, tendrás acceso de por vida a todo el contenido
            del curso y sus futuras actualizaciones.
          </p>
        </div>
      </div>
    </div>
  );
}
