import { PageHeader } from "@/components/ui/PageHeader";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CTASection } from "@/components/home/CTASection";

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                title="What We Build"
                subtitle="From resilient intelligent systems to compelling digital experiences. We engineer software and brands for performance, clarity, and exponential growth."
            />
            <div className="pb-32">
                <ServicesGrid />
            </div>
            <CTASection />
        </>
    );
}
