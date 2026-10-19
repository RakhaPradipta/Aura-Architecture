"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/Animations";
import { GridOverlay } from "@/components/Technical";
import { BrassRule, ColumnDivider } from "@/components/arch/ArchElements";
import Tilt3D from "@/components/three/Tilt3D";
import ProjectCard, { ProjectModal } from "@/components/ProjectCard";
import type { Project } from "@/lib/api";

const categories = ["All", "Residential", "Commercial", "Renovation"];

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="travertine-vein relative overflow-hidden bg-[#EDE9DF] py-28 md:py-36">
      <GridOverlay variant="paper" />
      {/* colonnade shadow top */}
      <div aria-hidden className="fluted-light absolute inset-x-0 top-0 h-24 opacity-70" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[10px] bg-gradient-to-b from-ink-950/25 to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-16">
        <FadeIn className="text-center">
          <ColumnDivider label="portfolio" />
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-blueprint-700">— Galeri Karya · A-04 —</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[0.98] text-ink-950 md:text-6xl">
            Karya <em className="italic text-blueprint-700">Monumental</em><br />Terbangun 2016—2026
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-ink-600">
            Delapan puluh proyek di seluruh Indonesia — dari vault house di Sleman hingga heritage resto di Kotagede.
            Klik kartu untuk membuka dossier proyek.
          </p>
          <div className="mx-auto mt-8 max-w-md"><BrassRule /></div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`group flex items-center gap-2 border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategory === cat
                  ? "border-ink-950 bg-ink-950 text-paper shadow-[0_14px_36px_-12px_rgba(11,25,38,0.6)]"
                  : "border-ink-950/15 bg-white/40 text-ink-600 hover:border-brass-600 hover:text-ink-950"
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-t-full border text-[9px] ${activeCategory === cat ? "border-brass-400 text-brass-300" : "border-ink-950/25 text-ink-500"}`}>
                {String(i).padStart(2, "0")}
              </span>
              {cat}
            </button>
          ))}
        </FadeIn>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45 }}
              >
                <Tilt3D max={9} scale={1.015}>
                  <div className="overflow-hidden rounded-t-[72px] rounded-b-lg border border-ink-950/12 bg-white/70 shadow-[0_30px_70px_-30px_rgba(11,25,38,0.45)] backdrop-blur-sm">
                    <ProjectCard project={project} index={index} onSelect={setSelectedProject} />
                    <div className="flex items-center justify-between border-t border-ink-950/10 px-5 py-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
                        No. {String(index + 1).padStart(3, "0")} · {project.year}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-brass-700">
                        <span className="h-1.5 w-1.5 rotate-45 bg-brass-500" /> {project.location}
                      </span>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
