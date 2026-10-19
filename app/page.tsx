import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import { getProjects } from "@/lib/data";

// ISR: homepage statis + revalidasi 1 jam — TTFB cepat, data tetap segar
export const revalidate = 3600;

// Below-the-fold di-code-split: tidak ikut JS awal.
// Hero/About/Services tetap eager (LCP), sisanya lazy.
const StructureShowcase = dynamic(
  () => import("@/components/sections/StructureShowcase"),
  { ssr: true }
);
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"), {
  ssr: true,
});
const MaterialAtlas = dynamic(
  () => import("@/components/sections/MaterialAtlas"),
  { ssr: true }
);
const Process = dynamic(() => import("@/components/sections/Process"), {
  ssr: true,
});
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  { ssr: true }
);
const Awards = dynamic(() => import("@/components/sections/Awards"), {
  ssr: true,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: true,
});

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <StructureShowcase />
      <Portfolio projects={projects} />
      <MaterialAtlas />
      <Process />
      <Testimonials />
      <Awards />
      <Contact />
    </>
  );
}
