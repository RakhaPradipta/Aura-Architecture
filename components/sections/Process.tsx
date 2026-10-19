"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/Animations";
import { GridOverlay, Crosshair } from "@/components/Technical";
import { ColumnDivider, BrassRule } from "@/components/arch/ArchElements";
import Tilt3D from "@/components/three/Tilt3D";

const steps = [
  {
    number: "01", numeral: "I", title: "Konsultasi", latin: "Audire — mendengar",
    description: "Mendengar dalam-dalam. Visi, gaya hidup, budget, dan cerita tapak — bangunan hebat lahir dari perbincangan hebat.",
    duration: "1–2 minggu", weeks: 1.5,
    outputs: ["Survei & ukur tapak", "Design brief tertulis", "Estimasi budget awal", "Timeline proyek"],
  },
  {
    number: "02", numeral: "II", title: "Konsep", latin: "Imaginari — membayangkan",
    description: "Moodboard, studi ruang, dan maket massing — menangkap roh yang akan kita bangun bersama.",
    duration: "2–4 minggu", weeks: 3,
    outputs: ["Moodboard & referensi", "Studi massing 3D", "Alternatif denah", "Presentasi konsep"],
  },
  {
    number: "03", numeral: "III", title: "Desain", latin: "Delineare — menggambar",
    description: "Gambar kerja, visual 3D, RAB, dan koordinasi struktur — konsep menjadi dokumen yang siap dibangun.",
    duration: "6–12 minggu", weeks: 9,
    outputs: ["Gambar kerja (DED)", "Visual 3D fotorealistik", "RAB detail", "Spesifikasi material"],
  },
  {
    number: "04", numeral: "IV", title: "Konstruksi", latin: "Aedificare — membangun",
    description: "Kami mengawal tukang di lapangan — visit berkala, review craftsmanship, memastikan realita sesuai niat desain.",
    duration: "6–18 bulan", weeks: 52,
    outputs: ["Pengawasan berkala", "Review shop drawing", "QC craftsmanship", "Laporan progres mingguan"],
  },
  {
    number: "05", numeral: "V", title: "Serah Terima", latin: "Tradere — menyerahkan",
    description: "Walkthrough terakhir, kunci di tangan, cahaya pertama memasuki ruang. Detail tuntas baru kami sebut selesai.",
    duration: "1–2 minggu", weeks: 1.5,
    outputs: ["Walkthrough & snag list", "As-built drawing", "Manual perawatan", "Garansi pemeliharaan"],
  },
];

export default function Process() {
  const [active, setActive] = useState(2);
  const step = steps[active];
  const totalWeeks = steps.reduce((a, s) => a + s.weeks, 0);

  return (
    <section id="process" className="travertine-vein relative overflow-hidden bg-[#E4DED2] py-28 md:py-36">
      <GridOverlay variant="paper" />
      {/* watermark numeral raksasa */}
      <div aria-hidden className="pointer-events-none absolute -right-6 top-10 select-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={step.numeral}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-[26vw] leading-none text-ink-950/[0.05] md:text-[16rem]"
          >
            {step.numeral}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <FadeIn className="text-center">
          <ColumnDivider />
          <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-blueprint-700">— Cara Kerja · A-05 —</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-[0.98] text-ink-950 md:text-6xl">
            Dari Visi<br />menjadi <em className="italic text-blueprint-700">Bangunan</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-600">
            Proses teruji 80+ proyek — transparan, kolaboratif, dan menyenangkan.
            Pilih fase untuk melihat output yang Anda terima di setiap tahap.
          </p>
        </FadeIn>

        {/* ── Phase selector ── */}
        <FadeIn delay={0.1}>
          <div className="mt-12 flex gap-2 overflow-x-auto pb-2 md:justify-center">
            {steps.map((s, i) => (
              <button
                key={s.number}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`flex shrink-0 items-center gap-3 border px-5 py-3.5 transition-all duration-300 ${
                  active === i
                    ? "border-ink-950 bg-ink-950 text-paper shadow-[0_18px_40px_-16px_rgba(11,25,38,0.6)]"
                    : "border-ink-950/15 bg-white/50 text-ink-600 hover:border-brass-600/60 hover:text-ink-950"
                }`}
              >
                <span className={`flex h-9 w-8 items-center justify-center rounded-t-full border font-serif text-base ${
                  active === i ? "border-brass-400/70 text-brass-300" : "border-ink-950/25 text-brass-700"
                }`}>
                  {s.numeral}
                </span>
                <span className="text-left">
                  <span className="block font-serif text-[17px] leading-none">{s.title}</span>
                  <span className={`mt-1 block font-mono text-[11px] tracking-[0.12em] ${active === i ? "text-paper/55" : "text-ink-500"}`}>{s.duration}</span>
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── Active detail card ── */}
        <FadeIn delay={0.15} className="mt-6">
          <Tilt3D max={5} scale={1.005} glare={false}>
            <div className="relative overflow-hidden rounded-t-[72px] rounded-b-2xl border border-ink-950/12 bg-[#F2F0EA] shadow-[0_36px_80px_-32px_rgba(11,25,38,0.45)]">
              <div aria-hidden className="fluted-light absolute inset-x-0 top-0 h-14" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-1 gap-8 p-8 md:grid-cols-12 md:p-12"
                >
                  {/* left: phase info */}
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brass-700">
                        Fase {step.number} / 05 · {step.latin}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-4xl text-ink-950 md:text-5xl">{step.title}</h3>
                    <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-ink-600">{step.description}</p>
                    <div className="mt-6 inline-flex items-center gap-3 border border-brass-600/40 bg-brass-500/10 px-4 py-2.5">
                      <span className="font-mono text-sm text-brass-800">◷</span>
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brass-800">{step.duration}</span>
                    </div>

                    {/* prev / next */}
                    <div className="mt-8 flex items-center gap-3">
                      <button
                        onClick={() => setActive((active + steps.length - 1) % steps.length)}
                        className="flex h-11 w-11 items-center justify-center border border-ink-950/20 text-ink-800 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-paper"
                        aria-label="Fase sebelumnya"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setActive((active + 1) % steps.length)}
                        className="flex h-11 w-11 items-center justify-center border border-ink-950/20 text-ink-800 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-paper"
                        aria-label="Fase berikutnya"
                      >
                        →
                      </button>
                      <span className="ml-2 font-mono text-xs tracking-[0.16em] text-ink-500 tabular-nums">
                        {String(active + 1).padStart(2, "0")} — {String(steps.length).padStart(2, "0")}
                      </span>
                      <span className="ml-auto hidden gap-1.5 sm:flex">
                        {steps.map((_, i) => (
                          <span key={i} className={`h-1.5 w-6 ${i === active ? "bg-brass-600" : i < active ? "bg-ink-950/50" : "bg-ink-950/15"}`} />
                        ))}
                      </span>
                    </div>
                  </div>

                  {/* right: deliverables */}
                  <div className="md:col-span-5">
                    <div className="h-full border border-ink-950/12 bg-ink-950 p-7 text-paper md:p-8">
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brass-300">
                        ✓ Output yang Anda terima
                      </p>
                      <ul className="mt-5 space-y-0">
                        {step.outputs.map((o, i) => (
                          <motion.li
                            key={o}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="flex items-center gap-3 border-b border-white/10 py-3.5 last:border-0"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-t-full border border-brass-400/50 font-mono text-[11px] text-brass-300">
                              {i + 1}
                            </span>
                            <span className="text-[15px] text-paper/85">{o}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-6"><BrassRule /></div>
                      <a href="#contact" className="mt-5 block border border-brass-400/60 bg-brass-400/10 py-3 text-center font-mono text-xs font-medium uppercase tracking-[0.18em] text-brass-200 transition-colors hover:bg-brass-400 hover:text-ink-950">
                        Diskusi fase {step.title} →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tilt3D>
        </FadeIn>

        {/* ── Programme bar proporsional ── */}
        <FadeIn delay={0.2}>
          <div className="mt-10 border border-ink-950/12 bg-[#F2F0EA]/80 p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-600">
                Programme keseluruhan — proporsional terhadap durasi
              </p>
              <p className="font-mono text-xs tracking-[0.12em] text-brass-700">⧖ 8–24 bulan tipikal</p>
            </div>
            <div className="mt-5 flex h-14 w-full gap-1">
              {steps.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => setActive(i)}
                  title={`${s.title} — ${s.duration}`}
                  style={{ flexGrow: s.weeks, flexBasis: 0 }}
                  className={`group relative min-w-0 overflow-hidden transition-all ${
                    active === i ? "bg-ink-950" : "bg-ink-950/12 hover:bg-brass-500/50"
                  }`}
                >
                  <span className={`absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.1em] ${
                    active === i ? "text-brass-300" : "text-ink-600 group-hover:text-ink-950"
                  }`}>
                    {s.numeral}
                  </span>
                  {i === 3 && (
                    <span className="absolute inset-x-0 top-0 h-1 bg-brass-500" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
              <span>Minggu 0 — brief</span>
              <span className="hidden sm:block">Konstruksi = bobot terbesar, wajar</span>
              <span>Serah terima 🔑</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mx-auto mt-12 max-w-md"><BrassRule /></div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Crosshair className="text-brass-700" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-500">Tipikal programme · 8–24 bulan total</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
