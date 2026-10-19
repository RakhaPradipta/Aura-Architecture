"use client";

import { memo } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/api";
import { projectCard, modal } from "@/lib/imageSizes";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      className={`group ${
        index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
      } ${index % 3 === 0 ? "md:row-span-2" : ""}`}
      layout
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="block w-full text-left"
        aria-label={`Open ${project.title}`}
      >
      <div className="relative overflow-hidden bg-ink-100 aspect-[4/3]">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={projectCard}
          // Kartu pertama = above the fold di grid portfolio
          priority={index === 0}
          loading={index === 0 ? undefined : "lazy"}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/60 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
          <div className="w-full">
            <span className="label-sm text-blueprint-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {project.category}
            </span>
            <h3 className="heading-md text-paper mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <span className="text-sm text-ink-300">{project.location}</span>
              <span className="w-1 h-1 rounded-full bg-ink-400" />
              <span className="text-sm text-ink-300">{project.year}</span>
            </div>
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.2em] text-paper border-b border-paper/50 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 hover:border-paper"
              onClick={(e) => e.stopPropagation()}
            >
              View Project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8m0 0L7 3m3 3L7 9" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Always-visible minimal info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink-950/40 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <span className="text-xs uppercase tracking-[0.2em] text-paper/80">
            {project.category}
          </span>
        </div>
      </div>
      </button>
    </motion.div>
  );
}

export default memo(ProjectCard);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative bg-paper w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-paper/90 backdrop-blur-sm hover:bg-paper transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Hero image */}
            <div className="relative aspect-[16/9] w-full">
              <ImageWithFallback
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                sizes={modal}
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="label-sm text-blueprint-700">{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-ink-400" />
                <span className="label-sm text-ink-600">{project.year}</span>
              </div>

              <h2 className="heading-lg text-ink-950 mb-2">{project.title}</h2>
              <p className="text-ink-500 mb-8">{project.location}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="label-sm text-ink-600 mb-3">Overview</h4>
                  <p className="body-md text-ink-700">{project.description}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="label-sm text-ink-600 mb-2">Before</h4>
                    <p className="body-md text-ink-600">{project.beforeDescription}</p>
                  </div>
                  <div>
                    <h4 className="label-sm text-ink-600 mb-2">After</h4>
                    <p className="body-md text-ink-600">{project.afterDescription}</p>
                  </div>
                </div>
              </div>

            {/* Second image */}
            {project.images[1] && (
              <div className="relative aspect-[16/9] w-full mt-8">
                <ImageWithFallback
                  src={project.images[1]}
                  alt={`${project.title} detail`}
                  fill
                  className="object-cover"
                  sizes={modal}
                  loading="lazy"
                />
              </div>
            )}

            {/* View Full Project link */}
            <div className="mt-8 pt-8 border-t border-ink-950/10">
              <Link
                href={`/projects/${project.id}`}
                className="btn-primary"
              >
                View Full Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
