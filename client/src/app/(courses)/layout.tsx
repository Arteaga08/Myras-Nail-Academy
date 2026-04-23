import { LandingNavbar } from "@/app/_components/LandingNavbar";
import { LandingFooter } from "@/app/_components/LandingFooter";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      <div className="pt-24">{children}</div>
      <LandingFooter />
    </>
  );
}
