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
import { teamGrid } from "@/lib/imageSizes";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the architects and designers behind Aura Architecture \u2014 a Yogyakarta-based studio creating spaces that harmonize people, nature, and light.",
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/team.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM EBcQERMRCwsMEBgPEhMSFBITExIYFRYYHB4fHhT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAFRABAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8ApsD/2Q=="
          />
          <div className="absolute inset-0 bg-ink-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-ink-950/50" />
          <LightWash />
          <GridOverlay variant="cyanotype" className="opacity-45" />
        </div>
        <div className="relative h-full flex flex-col justify-end section-padding pb-16">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-14 bg-blueprint-400" />
              <span className="label-sm text-blueprint-300">
                Sheet A-09 / The Studio
              </span>
            </div>
            <h1 className="heading-xl text-paper max-w-3xl">
              People Who{" "}
              <em className="italic text-blueprint-300">Think</em>{" "}
              About Space
            </h1>
            <p className="body-lg text-paper/75 mt-6 max-w-2xl">
              A tight-knit team of architects, designers, and thinkers united by
              a shared conviction: that great architecture emerges from empathy,
              craft, and an uncompromising attention to place.
            </p>
            <DimensionLine
              label="12 on the sheet"
              tone="dark"
              className="mt-8 max-w-sm"
            />
          </FadeIn>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative section-padding-y overflow-hidden">
        <GridOverlay variant="paper" />
        <div className="relative section-padding">
          <div className="flex items-center gap-4 mb-12">
            <span className="label-sm text-blueprint-700">Personnel Schedule</span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-ink-600">
              / 12 entries
            </span>
            <span className="hidden sm:block h-px flex-1 bg-ink-950/10" />
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {team.map((member) => (
              <StaggerItem key={member.slug}>
                <Link
                  href={`/team/${member.slug}`}
                  className="group block"
                >
                  {/* Headshot */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-ink-100">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={teamGrid}
                    />
                    <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/15 transition-all duration-500" />
                    {/* Bias badge on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="label-sm text-blueprint-300">
                        Architectural Bias
                      </span>
                      <p className="text-paper text-sm mt-1 font-medium">
                        {member.bias}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-serif text-xl text-ink-900 group-hover:text-blueprint-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="label-sm text-blueprint-700 mt-1">
                    {member.role}
                  </p>
                  <p className="text-ink-500 text-sm leading-relaxed mt-3 line-clamp-2">
                    {member.biasDescription}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Philosophy CTA */}
      <section className="relative section-padding-y bg-ink-950 text-paper overflow-hidden">
        <GridOverlay variant="cyanotype" className="opacity-40" />
        <div className="relative section-padding text-center">
          <SectionHeading
            index="A-09.1"
            eyebrow="Our Philosophy"
            title="Architecture Begins with Listening"
            description="Every project starts by understanding the site, the climate, the culture, and the story our clients want to tell. Our biases shape our questions — not our answers."
            align="center"
            dark
            maxWidth="max-w-2xl"
          />
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="/about" className="btn-primary-inverse">
                About Aura
              </a>
              <a href="/#contact" className="btn-secondary-inverse">
                Start a Project
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
