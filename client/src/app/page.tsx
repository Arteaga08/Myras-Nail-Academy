import type { Metadata } from "next";
import { LandingNavbar } from "./_components/LandingNavbar";
import { LandingHero } from "./_components/LandingHero";
import { InfiniteMarquee } from "./_components/InfiniteMarquee";
import { CourseSalesSection } from "./_components/CourseSalesSection";
import { AboutInstructorSection } from "./_components/AboutInstructorSection";
import { PortfolioShowcase } from "./_components/PortfolioShowcase";
import { CourseSalesCtaSection } from "./_components/CourseSalesCtaSection";
import { LandingFooter } from "./_components/LandingFooter";
import type { MarqueeItem } from "./_components/landing.types";

export const metadata: Metadata = {
  title: "Myra's Nail Academy — Aprende el Arte de las Uñas",
  description:
    "Cursos profesionales de diseño de uñas con Myra. Aprende técnicas certificadas a tu propio ritmo.",
  openGraph: {
    title: "Myra's Nail Academy",
    description: "Cursos profesionales de diseño de uñas con certificado.",
    type: "website",
    locale: "es_MX",
  },
};

const FIRST_MARQUEE_ITEMS: MarqueeItem[] = [
  { id: "m1-1", content: "Nail Art" },
  { id: "m1-2", content: "Gel Polish" },
  { id: "m1-3", content: "Acrílico" },
  { id: "m1-4", content: "Spa de Manos" },
  { id: "m1-5", content: "Certificación" },
];

const SECOND_MARQUEE_ITEMS: MarqueeItem[] = [
  { id: "m2-1", content: "Comunidad" },
  { id: "m2-2", content: "Práctica" },
  { id: "m2-3", content: "Técnica" },
  { id: "m2-4", content: "Pasión" },
  { id: "m2-5", content: "Creatividad" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <LandingHero />
      <InfiniteMarquee
        items={FIRST_MARQUEE_ITEMS}
        speed={30}
        direction="left"
        className="border-y border-nude-300 bg-rose-400"
      />
      <CourseSalesSection />
      <AboutInstructorSection />
      <InfiniteMarquee
        items={SECOND_MARQUEE_ITEMS}
        speed={40}
        direction="right"
        className="border-y border-rose-300 bg-rose-200"
      />
      <PortfolioShowcase />
      <CourseSalesCtaSection />
      <LandingFooter />
    </main>
  );
}
