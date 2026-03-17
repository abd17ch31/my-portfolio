import AboutUsSection from "@/components/ui/about-us-section";
import DemoRadialScrollGalleryBento from "@/components/ui/portfolio-gallery-demo";
import EducationSection from "@/components/ui/education-section";
import { PremiumContact } from "@/components/ui/premium-contact";
import PortfolioHero from "@/components/ui/portfolio-hero";
import SiteFooter from "@/components/ui/site-footer";
import SkillsSection from "@/components/ui/skills-section";

const DemoOne = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&family=Orbitron:wght@700;900&display=swap"
      />
      <PortfolioHero />
      <AboutUsSection />
      <DemoRadialScrollGalleryBento />
      <SkillsSection />
      <EducationSection />
      <PremiumContact />
      <SiteFooter />
    </>
  );
};

export { DemoOne };
