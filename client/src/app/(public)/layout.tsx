import { LandingNavbar } from "@/app/_components/LandingNavbar";
import { LandingFooter } from "@/app/_components/LandingFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      {children}
      <LandingFooter />
    </>
  );
}
