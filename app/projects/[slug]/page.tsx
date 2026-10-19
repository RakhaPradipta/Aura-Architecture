import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Animations";
import {
  GridOverlay,
  LightWash,
  DimensionLine,
  TitleBlock,
} from "@/components/Technical";
import ImageWithFallback from "@/components/ImageWithFallback";
import { getProjects, getProjectById, type Project } from "@/lib/api";
import { getTeam, type TeamMember } from "@/lib/api";
import {
  fullBleed,
  projectOverview,
  projectGallery,
  relatedCard,
  headshot,
} from "@/lib/imageSizes";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectById(slug).catch(() => null);
  if (!project) return { title: "Project Not Found" };

  const url = `https://auraarchitecture.com/projects/${project.id}`;

  return {
    title: `${project.title} \u2014 ${project.category} Project`,
    description: `${project.description} Area: ${project.area}. Location: ${project.location}. Year: ${project.year}.`,
    keywords: [
      project.category.toLowerCase(),
      "architecture",
      "indonesia",
      project.location.split(",")[0].toLowerCase(),
      ...project.tags.map((t) => t.toLowerCase()),
    ],
    openGraph: {
      title: `${project.title} | Aura Architecture`,
      description: project.description,
      url,
      siteName: "Aura Architecture",
      images: [
        {
          url: project.images[0],
          width: 1200,
          height: 675,
          alt: `${project.title} \u2014 ${project.location}`,
        },
        {
          url: project.images[1],
          width: 1200,
          height: 675,
          alt: `${project.title} detail view`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aura Architecture`,
      description: project.description,
      images: [project.images[0]],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectById(slug).catch(() => null);

  if (!project) notFound();

  const team = await getTeam().catch(() => []);

  // Find team members for this project
  const projectTeam = project.teamMembers
    .map((memberSlug) => team.find((m) => m.slug === memberSlug))
    .filter(Boolean) as TeamMember[];

  // Get all projects for related projects and prev/next
  const projects = await getProjects().catch(() => []);

  // Related projects (same category first, then fill)
  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  if (relatedProjects.length < 2) {
    const more = projects
      .filter((p) => p.id !== project.id && !relatedProjects.includes(p))
      .slice(0, 2 - relatedProjects.length);
    relatedProjects.push(...more);
  }

  // Prev / Next navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitectureProject",
    name: project.title,
    description: project.description,
    url: `https://auraarchitecture.com/projects/${project.id}`,
    image: project.images[0],
    dateCreated: project.year,
    location: {
      "@type": "Place",
      name: project.location,
    },
    creator: {
      "@type": "Organization",
      name: "Aura Architecture",
      url: "https://auraarchitecture.com",
    },
    keywords: project.tags.join(", "),
    ...(project.testimonial && {
      review: {
        "@type": "Review",
        reviewBody: project.testimonial.quote,
        author: {
          "@type": "Person",
          name: project.testimonial.author,
        },
      },
    }),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <ImageWithFallback
          src={project.images[0]}
          alt={`${project.title} \u2014 ${project.location}`}
          fill
          className="object-cover"
          priority
          sizes={fullBleed}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-ink-950/45" />
        <LightWash />
        <GridOverlay variant="cyanotype" className="opacity-45" />

        <div className="relative h-full flex flex-col justify-end section-padding pb-16">
          <FadeIn>
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
              <Link
                href="/"
                className="label-sm text-ink-300 hover:text-blueprint-300 transition-colors"
              >
                Home
              </Link>
              <span className="w-1 h-1 rounded-full bg-ink-500" />
              <Link
                href="/#portfolio"
                className="label-sm text-ink-300 hover:text-blueprint-300 transition-colors"
              >
                Projects
              </Link>
              <span className="w-1 h-1 rounded-full bg-ink-500" />
              <span className="label-sm text-blueprint-300">
                {project.title}
              </span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="label-sm text-blueprint-300">
                {project.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-ink-400" />
              <span className="label-sm text-ink-300">{project.year}</span>
            </div>
            <h1 className="heading-xl text-paper max-w-3xl">
              {project.title}
            </h1>
            <DimensionLine
              label={`${project.year} · ${project.area}`}
              tone="dark"
              className="mt-6 max-w-md"
            />
            <p className="body-lg text-ink-200 mt-4 flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-blueprint-400 shrink-0"
              >
                <path
                  d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z"
                  fill="currentColor"
                />
              </svg>
              {project.location}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Project title block — the fact register in the corner of the sheet */}
      <section className="section-padding pt-0">
        <TitleBlock
          cells={[
            { label: "Client", value: project.client },
            { label: "Location", value: project.location },
            { label: "Year", value: project.year },
            { label: "Area", value: project.area },
            { label: "Category", value: project.category },
          ]}
        />
      </section>

      {/* Overview + First Detail Image */}
      <section className="section-padding-y">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn className="lg:col-span-5">
              <span className="label-sm text-blueprint-700">Overview</span>
              <h2 className="heading-md text-ink-950 mt-3 mb-6">
                {project.title}
              </h2>
              <p className="body-lg text-ink-600">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs uppercase tracking-wider text-ink-600 border border-ink-950/10 hover:border-blueprint-300 hover:text-blueprint-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-7">
              <div className="relative aspect-[16/9] w-full">
                <ImageWithFallback
                  src={project.images[1]}
                  alt={`${project.title} \u2014 design detail`}
                  fill
                  className="object-cover"
                  sizes={projectOverview}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="relative section-padding-y bg-ink-950 text-paper overflow-hidden">
        <GridOverlay variant="cyanotype" className="opacity-40" />
        <div className="relative section-padding">
          <div className="flex items-center gap-4 mb-6">
            <span className="label-sm text-blueprint-400">At a Glance</span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-ink-500">
              / A-10.1
            </span>
            <span className="hidden sm:block h-px flex-1 bg-ink-800" />
          </div>
          <h2 className="heading-md text-paper mb-12">Project Numbers</h2>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {project.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <p className="font-serif text-3xl md:text-4xl font-light text-blueprint-400">
                  {stat.value}
                </p>
                <p className="label-sm text-ink-400 mt-3">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Design Story \u2014 Challenge & Solution */}
      <section className="section-padding-y">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn className="lg:col-span-5">
              <span className="label-sm text-blueprint-700">The Challenge</span>
              <h2 className="heading-md text-ink-950 mt-3 mb-6">
                What We Faced
              </h2>
              <p className="body-lg text-ink-600 leading-relaxed">
                {project.designChallenge}
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-7">
              <span className="label-sm text-blueprint-700">
                Our Response
              </span>
              <h2 className="heading-md text-ink-950 mt-3 mb-6">
                How We Solved It
              </h2>
              <p className="body-lg text-ink-600 leading-relaxed">
                {project.designSolution}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery \u2014 2-column masonry-ish grid */}
      <section className="section-padding-y bg-ash">
        <div className="section-padding">
          <FadeIn className="text-center mb-12">
            <span className="label-sm text-blueprint-700">Gallery</span>
            <h2 className="heading-md text-ink-950 mt-3">
              In Detail
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.slice(1).map((img, i) => (
              <FadeIn
                key={i}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`relative overflow-hidden bg-ink-100 ${
                    i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${project.title} \u2014 gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes={projectGallery}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features + Materials \u2014 side by side */}
      <section className="section-padding-y">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Features */}
            <FadeIn>
              <span className="label-sm text-blueprint-700">Key Features</span>
              <h2 className="heading-md text-ink-950 mt-3 mb-8">
                What Makes It Special
              </h2>
              <ul className="space-y-4">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-4 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-blueprint-500 mt-2.5 shrink-0" />
                    <p className="text-ink-700 leading-relaxed">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Materials */}
            <FadeIn delay={0.2}>
              <span className="label-sm text-blueprint-700">
                Materials & Craft
              </span>
              <h2 className="heading-md text-ink-950 mt-3 mb-8">
                What It&apos;s Made Of
              </h2>
              <ul className="space-y-4">
                {project.materials.map((material) => (
                  <li key={material} className="flex gap-4 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-400 mt-2.5 shrink-0" />
                    <p className="text-ink-700 leading-relaxed">
                      {material}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section-padding-y bg-ash">
        <div className="section-padding">
          <FadeIn className="text-center mb-12">
            <span className="label-sm text-blueprint-700">The Journey</span>
            <h2 className="heading-md text-ink-950 mt-3">
              Before & After
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn direction="left">
              <div className="p-8 bg-paper border border-ink-950/10 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-ink-950/10 flex items-center justify-center">
                    <span className="label-sm text-ink-600">B</span>
                  </div>
                  <span className="label-sm text-ink-600">Before</span>
                </div>
                <p className="text-ink-700 leading-relaxed">
                  {project.beforeDescription}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="p-8 bg-paper border border-blueprint-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blueprint-100 flex items-center justify-center">
                    <span className="label-sm text-blueprint-700">A</span>
                  </div>
                  <span className="label-sm text-blueprint-700">After</span>
                </div>
                <p className="text-ink-700 leading-relaxed">
                  {project.afterDescription}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      {project.testimonial && (
        <section className="section-padding-y">
          <div className="section-padding">
            <FadeIn className="max-w-3xl mx-auto text-center">
              <span className="label-sm text-blueprint-700">
                Client Words
              </span>
              <blockquote className="font-serif text-2xl md:text-3xl font-light text-ink-900 mt-6 leading-relaxed italic">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8">
                <p className="text-ink-900 font-medium">
                  {project.testimonial.author}
                </p>
                <p className="label-sm text-ink-600 mt-1">
                  {project.testimonial.role}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Project Team */}
      {projectTeam.length > 0 && (
        <section className="section-padding-y bg-ash">
          <div className="section-padding">
            <FadeIn className="text-center mb-12">
              <span className="label-sm text-blueprint-700">
                Project Team
              </span>
              <h2 className="heading-md text-ink-950 mt-3">
                Who Made It Happen
              </h2>
            </FadeIn>

            <StaggerChildren className="flex flex-wrap justify-center gap-12">
              {projectTeam.map((member) => (
                <StaggerItem key={member.slug}>
                  <Link
                    href={`/team/${member.slug}`}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-ink-950/10">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes={headshot}
                      />
                    </div>
                    <p className="text-ink-900 font-medium group-hover:text-blueprint-700 transition-colors">
                      {member.name}
                    </p>
                    <p className="label-sm text-ink-600 mt-1">
                      {member.role}
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* Full Width Image */}
      <section className="relative w-full aspect-[21/9] overflow-hidden">
        <ImageWithFallback
          src={project.images[0]}
          alt={`${project.title} \u2014 panoramic view`}
          fill
          className="object-cover"
          sizes={fullBleed}
        />
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding-y">
          <div className="section-padding">
            <FadeIn className="mb-12">
              <span className="label-sm text-blueprint-700">
                More Projects
              </span>
              <h2 className="heading-md text-ink-950 mt-3">
                Related Work
              </h2>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((related) => (
                <StaggerItem key={related.id}>
                  <Link
                    href={`/projects/${related.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-ink-100">
                      <ImageWithFallback
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes={relatedCard}
                      />
                      <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-all duration-500" />
                    </div>
                    <span className="label-sm text-blueprint-700">
                      {related.category}
                    </span>
                    <h3 className="font-serif text-xl text-ink-900 mt-1 group-hover:text-blueprint-700 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-ink-500 mt-1">
                      {related.location} \u00b7 {related.year}
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <section className="border-t border-ink-950/10">
        <div className="section-padding py-10">
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
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
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex items-center gap-3 text-right"
              >
                <div>
                  <p className="label-sm text-ink-600">Next</p>
                  <p className="text-ink-900 font-medium group-hover:text-blueprint-700 transition-colors">
                    {nextProject.title}
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
              Have a Project in Mind?
            </h2>
            <p className="body-md text-ink-400 mt-4 max-w-xl mx-auto">
              We would love to hear about your vision. Every great building
              starts with a conversation.
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
