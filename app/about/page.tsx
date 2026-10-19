import type { Metadata } from "next";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Animations";
import {
  SectionHeading,
  GridOverlay,
  LightWash,
  DimensionLine,
} from "@/components/Technical";
import { getTeam } from "@/lib/api";
import { aboutImages, aboutTeamGrid } from "@/lib/imageSizes";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the architects and designers behind Aura Architecture. A Yogyakarta-based studio creating spaces that harmonize people, nature, and light.",
};

const values = [
  {
    number: "01",
    title: "Light as Material",
    description:
      "We treat natural light as our primary building material \u2014 shaping spaces around how light enters, moves, and transforms throughout the day.",
  },
  {
    number: "02",
    title: "Nature, Not Decor",
    description:
      "Every garden wall, every planted terrace, every courtyard is integral to the architecture, not an afterthought.",
  },
  {
    number: "03",
    title: "Craft & Detail",
    description:
      "From the grain of a wooden handrail to the joint between stone panels, we obsess over the details that make spaces feel alive.",
  },
  {
    number: "04",
    title: "Context First",
    description:
      "We never impose a signature style. Each project begins by listening \u2014 to the site, the climate, the culture, and the client's story.",
  },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/about.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM EBcQERMRCwsMEBgPEhMSFBITExIYFRYYHB4fHhT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAFRABAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8ApsD/2Q=="
          />
          <div className="absolute inset-0 bg-ink-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-ink-950/50" />
          <LightWash />
          <GridOverlay variant="cyanotype" className="opacity-45" />
        </div>
        <div className="relative h-full flex flex-col justify-end section-padding pb-16">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-14 bg-blueprint-400" />
              <span className="label-sm text-blueprint-300">
                Sheet A-02 / Our Story
              </span>
            </div>
            <h1 className="heading-xl text-paper max-w-3xl">
              Architecture Is the{" "}
              <em className="italic text-blueprint-300">Thoughtful</em>{" "}
              Making of Space
            </h1>
            <DimensionLine
              label="Founded 2016 · Yogyakarta"
              tone="dark"
              className="mt-8 max-w-md"
            />
          </FadeIn>
        </div>
      </section>

      {/* Studio Story */}
      <section className="relative section-padding-y overflow-hidden">
        <GridOverlay variant="paper" />
        <div className="relative section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <FadeIn>
                <h2 className="heading-lg text-ink-950">
                  Founded on the Belief That Design Begins with Listening
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="body-lg text-ink-600 mt-8">
                  In 2016, Aura Architecture opened its doors in a converted
                  Javanese joglo on the banks of the Code River in Yogyakarta.
                  What began as a one-person practice has grown into a studio of
                  twelve architects, interior designers, and landscape
                  specialists united by a shared conviction: that great
                  architecture emerges from empathy.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="body-md text-ink-500 mt-6">
                  We have completed over 80 projects across Indonesia \u2014 from
                  private villas in the jungles of Bali to office towers in
                  Jakarta&apos;s skyline, from heritage warehouse renovations in
                  Yogyakarta to boutique resorts on the shores of Lombok. Our
                  work has been recognized by the World Architecture Festival,
                  ASEAN Architecture Awards, ArchDaily, and the Indonesia
                  Institute of Architects.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.2} direction="right">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden mt-8">
                    <ImageWithFallback
                      src="/images/about/studio-interior.jpg"
                      alt="Aura Architecture studio interior"
                      fill
                      className="object-cover"
                      sizes={aboutImages}
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <ImageWithFallback
                      src="/images/about/design-detail.jpg"
                      alt="Aura Architecture design detail"
                      fill
                      className="object-cover"
                      sizes={aboutImages}
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative section-padding-y bg-ash overflow-hidden">
        <GridOverlay variant="paper" />
        <div className="relative section-padding">
          <SectionHeading
            index="A-02.1"
            eyebrow="Our Values"
            title="What Guides Every Decision"
            align="center"
            maxWidth="max-w-3xl"
          />

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <StaggerItem key={value.number}>
                <div className="flex gap-6">
                  <span className="font-serif text-4xl font-light text-blueprint-700 shrink-0">
                    {value.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-ink-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding-y">
        <div className="section-padding">
          <FadeIn className="text-center mb-16">
            <span className="label-sm text-blueprint-700">The Team</span>
            <h2 className="heading-lg text-ink-950 mt-4">
              The People Behind the Vision
            </h2>
            <p className="body-md text-ink-500 mt-4 max-w-2xl mx-auto">
              A tight-knit team of architects, designers, and thinkers who share
              a passion for craft, context, and the transformative power of
              well-made space.
            </p>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.slug}>
                <Link href={`/team/${member.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-ink-100">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={aboutTeamGrid}
                    />
                    <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-all duration-500" />
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 group-hover:text-blueprint-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="label-sm text-blueprint-700 mt-1 mb-3">
                    {member.role}
                  </p>
                  <p className="text-ink-500 text-xs uppercase tracking-wider mb-2">
                    Bias: {member.bias}
                  </p>
                  <p className="text-ink-600 text-sm leading-relaxed line-clamp-2">
                    {member.bio}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn className="text-center mt-12">
            <Link href="/team" className="btn-secondary">
              Meet the Full Team
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="relative section-padding-y bg-ink-950 text-paper overflow-hidden">
        <GridOverlay variant="cyanotype" className="opacity-40" />
        <div className="relative section-padding">
          <div className="flex items-center gap-4 mb-12">
            <span className="label-sm text-blueprint-300">Studio Register</span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-ink-500">
              / A-02.2
            </span>
            <span className="hidden sm:block h-px flex-1 bg-ink-800" />
          </div>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "80+", label: "Projects Completed" },
              { number: "12", label: "Team Members" },
              { number: "8", label: "Years of Practice" },
              { number: "15+", label: "Design Awards" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <p className="font-serif text-5xl md:text-6xl font-light text-blueprint-400">
                  {stat.number}
                </p>
                <p className="label-sm text-ink-400 mt-3">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
