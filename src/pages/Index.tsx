import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TechMarquee from "@/components/home/TechMarquee";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import AchievementsSection from "@/components/home/AchievementsSection";
import CTASection from "@/components/home/CTASection";
import ShowcasesTeaser from "@/components/home/ShowcasesTeaser";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TechMarquee />
      <ServicesPreview />
      <ShowcasesTeaser />
      <ProcessTimeline />
      <AchievementsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
