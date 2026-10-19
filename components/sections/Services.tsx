"use client";

import { useState } from "react";
import Tilt3D from "@/components/three/Tilt3D";
import { ColumnDivider, BrassRule } from "@/components/arch/ArchElements";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Animations";
import { SectionHeading, GridOverlay } from "@/components/Technical";

const services = [
  {
    code: "S-01", numeral: "I", title: "Desain Hunian", en: "Residential",
    description: "Villa tropis, courtyard house, dan apartemen — sanctuary pribadi dari cahaya, angin, dan bayangan.",
    detail: "Mulai 150 jt · 8–16 minggu",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M6 38V16l16-9 16 9v22H6z" stroke="#c9a86a" strokeWidth="1.4" />
        <path d="M22 7v31M6 16l16-9 16 9" stroke="#c9a86a" strokeWidth="1" opacity="0.6" />
        <path d="M17 38v-9a5 5 0 0110 0v9" stroke="#93d2f5" strokeWidth="1.3" />
        <circle cx="22" cy="24" r="1.4" fill="#c9a86a" />
      </svg>
    ),
  },
  {
    code: "S-02", numeral: "II", title: "Desain Komersial", en: "Commercial",
    description: "Kantor, retail, dan hospitality yang memperkuat identitas brand lewat facade berirama dan lobby monumental.",
    detail: "Mulai 350 jt · 12–24 minggu",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect x="7" y="12" width="30" height="26" stroke="#c9a86a" strokeWidth="1.4" />
        <path d="M7 12l5-6h20l5 6" stroke="#c9a86a" strokeWidth="1.2" />
        <path d="M13 20h8M13 25h18M13 30h12" stroke="#93d2f5" strokeWidth="1.2" />
        <path d="M22 12v26" stroke="#c9a86a" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      </svg>
    ),
  },
  {
    code: "S-03", numeral: "III", title: "Desain Interior", en: "Interior",
    description: "Palet material, joinery jati, dan lighting design — setiap sudut terasa dirancang hingga ke sekrup terakhir.",
    detail: "Mulai 85 jt · 6–12 minggu",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M10 38V10a12 12 0 0124 0v28" stroke="#c9a86a" strokeWidth="1.4" />
        <path d="M15 22h14M15 27h10" stroke="#93d2f5" strokeWidth="1.2" />
        <circle cx="22" cy="15" r="2.4" stroke="#c9a86a" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    code: "S-04", numeral: "IV", title: "Urban & Lansekap", en: "Urban",
    description: "Masterplan, ruang publik, dan taman — menyeimbangkan densitas, ruang hijau, dan skala manusia.",
    detail: "By brief · masterplan",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="15" stroke="#c9a86a" strokeWidth="1.4" />
        <path d="M7 22h30M22 7c-5 5-5 10 0 15s5 10 0 15M22 7c5 5 5 10 0 15s-5 10 0 15" stroke="#93d2f5" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    code: "S-05", numeral: "V", title: "Renovasi Heritage", en: "Renovation",
    description: "Menyuntik nyawa baru ke bangunan kolonial & joglo — konservasi cermat dengan sentuhan kontemporer.",
    detail: "Survey gratis · 10–20 minggu",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M8 34L22 10l14 24" stroke="#c9a86a" strokeWidth="1.4" />
        <path d="M14 34v-8h16v8" stroke="#93d2f5" strokeWidth="1.2" />
        <path d="M8 34h28" stroke="#c9a86a" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    code: "S-06", numeral: "VI", title: "Konsultasi & IMB", en: "Consult",
    description: "Feasibility, sustainability, struktur & perizinan — keputusan tepat sebelum fondasi pertama digali.",
    detail: "2 jt / sesi · online/offline",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="3" stroke="#c9a86a" strokeWidth="1.4" />
        <path d="M22 6v8M22 30v8M6 22h8M30 22h8" stroke="#93d2f5" strokeWidth="1.2" />
        <circle cx="22" cy="22" r="13" stroke="#c9a86a" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#080e15] py-28 md:py-36">
      <div className="absolute inset-0 grid-cyanotype opacity-25" />
      <div className="absolute inset-0 concrete-noise opacity-40" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-16">
        <FadeIn className="text-center">
          <ColumnDivider />
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-brass-300">— Portico Layanan · A-03 —</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[1.02] text-paper md:text-6xl">
            Enam Pilar <em className="brass-text italic">Keahlian</em> Kami
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-paper/60">
            Setiap proyek dimulai dari perbincangan. Seperti kuil klasik — setiap layanan adalah kolom yang menopang keseluruhan karya.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.code}>
              <Tilt3D max={10} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-t-[110px] rounded-b-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-8 pt-10 backdrop-blur-sm transition-colors duration-500 hover:border-brass-400/60">
                  <div className="fluted pointer-events-none absolute inset-x-0 top-0 h-16 opacity-40" />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-16 w-16 items-center justify-center rounded-t-full border border-brass-500/40 bg-ink-950/60">{s.icon}</span>
                    <span className="text-right">
                      <span className="block font-serif text-2xl text-brass-300/90">{s.numeral}</span>
                      <span className="font-mono text-[10px] tracking-[0.24em] text-paper/40">{s.code}</span>
                    </span>
                  </div>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint-300">{s.en}</p>
                  <h3 className="mt-1 font-serif text-2xl text-paper">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">{s.description}</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <BrassRule />
                    <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-brass-200/80">{s.detail}</p>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brass-600 via-brass-300 to-brass-600 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Tilt3D>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.2} className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">Entablature · scope of services</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40 tabular-nums">Drawing A-03 · Rev 04</span>
        </FadeIn>
      </div>
    </section>
  );
}
