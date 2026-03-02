import { Hero } from "@/components/home/Hero";
import { ScrollZoomFeature } from "@/components/home/ScrollZoomFeature";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { AICapabilities } from "@/components/home/AICapabilities";
import { Industries } from "@/components/home/Industries";
import { Approach } from "@/components/home/Approach";
import { Metrics } from "@/components/home/Metrics";
import { WhyRadlabs } from "@/components/home/WhyRadlabs";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollZoomFeature />
      <ServicesGrid />
      <AICapabilities />
      <Industries />
      <Approach />
      <Metrics />
      <WhyRadlabs />
      <CTASection />
    </>
  );
}


