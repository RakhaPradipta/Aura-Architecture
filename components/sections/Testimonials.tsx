import { FadeIn } from "@/components/Animations";
import TestimonialSlider from "@/components/TestimonialSlider";
import { SectionHeading, GridOverlay, DimensionLine } from "@/components/Technical";

export default function Testimonials() {
  return (
    <section className="relative section-padding-y overflow-hidden">
      <GridOverlay variant="paper" />

      <div className="relative section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              index="A-06"
              eyebrow="Client Words"
              title="What They Say"
              description="Our greatest reward is hearing that the spaces we design have changed how people live, work, and feel."
              maxWidth="max-w-none"
            />
            <FadeIn delay={0.3}>
              <DimensionLine label="04 recorded" className="mt-8 max-w-[16rem]" />
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="lg:col-span-8 lg:border-l lg:border-ink-950/10 lg:pl-16">
            <TestimonialSlider />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
