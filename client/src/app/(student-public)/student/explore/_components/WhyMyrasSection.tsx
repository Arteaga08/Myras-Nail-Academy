import {
  CertificateIcon as Certificate,
  PlayCircleIcon as PlayCircle,
  HeartIcon as Heart,
} from '@phosphor-icons/react/ssr'
import { NailSparkle } from '@/components/ui/DecorativeAssets'

const benefits = [
  {
    icon: Certificate,
    title: 'Certificado Profesional',
    description:
      'Obtén un certificado firmado por Myra al completar cada curso y respáldalo con tu salón.',
  },
  {
    icon: PlayCircle,
    title: 'Clases en Video HD',
    description:
      'Lecciones grabadas con detalle para que veas cada técnica desde el mejor ángulo.',
  },
  {
    icon: Heart,
    title: 'Aprende a Tu Ritmo',
    description:
      'Acceso permanente a tus cursos. Practica cuando quieras, cuantas veces necesites.',
  },
]

export function WhyMyrasSection() {
  return (
    <section className="rounded-3xl border border-rose-100 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
      <div className="text-center">
        <h2 className="inline-flex items-center justify-center gap-3 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
          <NailSparkle size={22} className="shrink-0" />
          <span>
            ¿Por qué Estudiar con <span className="text-rose-500">Myra's</span>?
          </span>
          <NailSparkle size={22} className="shrink-0" />
        </h2>
        <p className="mt-2 text-sm text-neutral-500 sm:text-base">
          Todo lo que necesitas para dominar el arte del nail design.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-rose-100 bg-nude-50 p-6 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
              <Icon size={32} weight="fill" className="text-rose-500" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-neutral-900">
              {title}
            </h3>
            <p className="mt-2 text-sm text-neutral-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
