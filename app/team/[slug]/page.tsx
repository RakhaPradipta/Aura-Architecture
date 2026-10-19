import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Animations";
import ImageWithFallback from "@/components/ImageWithFallback";
import { getTeam, getTeamMemberBySlug, type TeamMember } from "@/lib/api";
import { fullBleed } from "@/lib/imageSizes";

interface TeamPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const team = await getTeam();
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: TeamPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug).catch(() => null);
  if (!member) return { title: "Team Member Not Found" };

  return {
    title: member.name,
    description: `${member.name} \u2014 ${member.role}. Architectural bias: ${member.bias}. ${member.bio}`,
    openGraph: {
      title: `${member.name} | Aura Architecture`,
      description: `${member.role}. Architectural bias: ${member.bias}.`,
      images: [{ url: member.image, width: 600, height: 800 }],
    },
  };
}

export default async function TeamMemberPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug).catch(() => null);

  if (!member) notFound();

  const team = await getTeam().catch(() => []);

  const currentIndex = team.findIndex((m) => m.slug === slug);
  const prevMember = currentIndex > 0 ? team[currentIndex - 1] : null;
  const nextMember =
    currentIndex < team.length - 1 ? team[currentIndex + 1] : null;

  return (
    <>
      {/* Hero \u2014 full headshot */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
          priority
          sizes={fullBleed}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />

        <div className="relative h-full flex flex-col justify-end section-padding pb-16">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/team"
                className="label-sm text-ink-300 hover:text-blueprint-300 transition-colors"
              >
                Team
              </Link>
              <span className="w-1 h-1 rounded-full bg-ink-500" />
              <span className="label-sm text-blueprint-300">
                {member.role}
              </span>
            </div>
            <h1 className="heading-xl text-paper max-w-3xl">
              {member.name}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Bias \u2014 the architect's philosophy */}
      <section className="section-padding-y">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="label-sm text-blueprint-700">
                  Architectural Bias
                </span>
                <h2 className="heading-md text-ink-950 mt-3">
                  {member.bias}
                </h2>
                <div className="w-12 h-px bg-blueprint-600 mt-6" />
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-8">
              <div className="max-w-2xl">
                <p className="body-lg text-ink-700 leading-relaxed">
                  {member.biasDescription}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bio & Details */}
      <section className="section-padding-y bg-ash">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Bio */}
            <FadeIn className="lg:col-span-7">
              <span className="label-sm text-blueprint-700">Background</span>
              <h2 className="heading-md text-ink-950 mt-3 mb-6">
                About {member.name.split(" ")[0]}
              </h2>
              <p className="body-lg text-ink-600">{member.bio}</p>
            </FadeIn>

            {/* Details card */}
            <FadeIn delay={0.2} className="lg:col-span-5">
              <div className="bg-paper border border-ink-950/10 p-8">
                <h3 className="font-serif text-lg text-ink-900 mb-6">
                  Quick Facts
                </h3>

                <div className="space-y-5">
                  <div>
                    <p className="label-sm text-ink-600">Education</p>
                    <p className="text-ink-800 mt-1">{member.education}</p>
                  </div>
                  <div>
                    <p className="label-sm text-ink-600">Experience</p>
                    <p className="text-ink-800 mt-1">
                      {member.experience}
                    </p>
                  </div>
                  <div>
                    <p className="label-sm text-ink-600">Role</p>
                    <p className="text-ink-800 mt-1">{member.role}</p>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-ink-950/10">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-xs text-ink-600 hover:text-blueprint-700 transition-colors uppercase tracking-wider"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      className="text-xs text-ink-600 hover:text-blueprint-700 transition-colors uppercase tracking-wider"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Notable Projects */}
      <section className="section-padding-y">
        <div className="section-padding">
          <FadeIn>
            <span className="label-sm text-blueprint-700">
              Notable Projects
            </span>
            <h2 className="heading-md text-ink-950 mt-3 mb-10">
              Selected Work
            </h2>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {member.notableProjects.map((project) => (
              <StaggerItem key={project}>
                <div className="border border-ink-950/10 p-6 bg-paper hover:border-blueprint-300 transition-colors">
                  <p className="font-serif text-lg text-ink-900">
                    {project}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Navigation \u2014 Previous / Next */}
      <section className="border-t border-ink-950/10">
        <div className="section-padding py-10">
          <div className="flex justify-between items-center">
            {prevMember ? (
              <Link
                href={`/team/${prevMember.slug}`}
                className="group flex items-center gap-3"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-ink-500 group-hover:text-blueprint-700 transition-colors -rotate-180"
                >
                  <path
                    d="M5 10h10m0 0l-4-4m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="label-sm text-ink-600">Previous</p>
                  <p className="text-ink-900 font-medium group-hover:text-blueprint-700 transition-colors">
                    {prevMember.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextMember ? (
              <Link
                href={`/team/${nextMember.slug}`}
                className="group flex items-center gap-3 text-right"
              >
                <div>
                  <p className="label-sm text-ink-600">Next</p>
                  <p className="text-ink-900 font-medium group-hover:text-blueprint-700 transition-colors">
                    {nextMember.name}
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-ink-500 group-hover:text-blueprint-700 transition-colors"
                >
                  <path
                    d="M5 10h10m0 0l-4-4m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-y bg-ink-950 text-paper">
        <div className="section-padding text-center">
          <FadeIn>
            <h2 className="heading-lg text-paper">
              Work With Our Team
            </h2>
            <p className="body-md text-ink-400 mt-4 max-w-xl mx-auto">
              Every great building starts with a conversation. Tell us about
              your vision \u2014 we will find the right architect to bring it to life.
            </p>
            <a href="/#contact" className="btn-primary-inverse mt-8">
              Start a Conversation
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
