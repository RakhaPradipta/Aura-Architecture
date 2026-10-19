"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Crosshair, DimensionLine, NorthArrow, ScaleBar } from "@/components/Technical";
import { BrassRule, ElevationMarker, CorniceDivider } from "@/components/arch/ArchElements";

const MassingModel = dynamic(() => import("@/components/three/MassingModel"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-mono text-[11px] tracking-[0.3em] text-brass-300/70 animate-pulse">
        ASSEMBLING MASSING…
      </span>
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080e15]">
      {/* Deep architectural backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_70%_30%,rgba(47,143,208,0.22),transparent_70%),radial-gradient(ellipse_50%_40%_at_22%_78%,rgba(201,168,106,0.16),transparent_70%),linear-gradient(to_bottom,#0b1926_0%,#0a1420_55%,#070d14_100%)]" />
        <div className="absolute inset-0 grid-cyanotype opacity-30" />
        <div className="absolute inset-0 concrete-noise opacity-60" />
        {/* giant outline typography — like carved facade lettering */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[6%] select-none overflow-hidden">
          <p className="text-stroke-paper whitespace-nowrap text-center font-serif text-[18vw] leading-none tracking-tight opacity-[0.14]">
            AURA · MMXVI
          </p>
        </div>
        <div className="hero-vignette absolute inset-0" />
      </div>

      {/* Top technical strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-0 right-0 top-24 z-20 md:top-28"
      >
        <div className="section-padding flex items-center gap-5">
          <Crosshair className="text-brass-400" />
          <span className="elevation-tag text-paper/70">Lat −7.7956° · Lon 110.3790° — Yogyakarta</span>
          <span className="hidden md:block h-px flex-1 bg-gradient-to-r from-brass-500/40 via-white/10 to-transparent" />
          <span className="elevation-tag hidden md:block text-brass-300/80">Elevation 1:100 · Rev 04 · Sheet A-01</span>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-44 md:px-12 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:pt-40">
        {/* Left — manifesto */}
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            <div className="inline-flex items-center gap-3 border border-brass-500/35 bg-brass-500/[0.08] px-5 py-2.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rotate-45 bg-brass-400" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brass-200">
                Studio Arsitektur — Est. 2016
              </span>
            </div>

            <h1 className="mt-7 font-serif text-[13.5vw] leading-[0.88] tracking-[-0.03em] text-paper sm:text-6xl md:text-7xl xl:text-[6.2rem]">
              Ruang yang
              <br />
              <span className="italic font-light text-brass-text animate-brass-shimmer">
                Bernapas
              </span>
              <br />
              <span className="relative inline-block">
                dalam Cahaya
                <svg viewBox="0 0 320 14" className="absolute -bottom-2 left-0 w-full" aria-hidden>
                  <path d="M4 10 Q 80 2 160 8 T 316 6" fill="none" stroke="#c9a86a" strokeWidth="1.6" opacity="0.85" />
                  <path d="M12 10 l6 -6 M308 6 l-4 7" stroke="#c9a86a" strokeWidth="1.2" />
                </svg>
              </span>
            </h1>

            <p className="body-lg mt-8 max-w-xl text-paper/70">
              Kami merancang <span className="text-paper">villa tropis, kantor, dan ruang publik</span> di
              mana kolom, lengkung vault, dan material jujur — batu, kayu, kuningan — menari bersama
              matahari khatulistiwa.
            </p>

            <DimensionLine label="Prinsip — firmitas · utilitas · venustas" tone="dark" className="mt-8 max-w-xl" />

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#portfolio" className="group relative overflow-hidden border border-brass-400 bg-brass-400 px-8 py-4 font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-ink-950 transition-all hover:bg-brass-300">
                <span className="relative z-10">Lihat Portfolio ⌁</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a href="#contact" className="border border-paper/25 px-8 py-4 font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-paper backdrop-blur-sm transition-all hover:border-brass-400 hover:text-brass-200">
                Konsultasi Gratis
              </a>
              <div className="ml-1 hidden items-center gap-3 xl:flex">
                <span className="font-mono text-[26px] text-paper/90 tabular-nums">80+</span>
                <span className="font-mono text-[11px] uppercase leading-tight tracking-[0.16em] text-paper/60">proyek<br />terbangun</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-12 flex items-center justify-between gap-8 border-t border-paper/12 pt-6"
          >
            <ScaleBar className="text-paper/55" />
            <span className="elevation-tag hidden text-paper/40 md:block">Residential · Commercial · Interior · Urban</span>
            <NorthArrow className="text-brass-300/90" />
          </motion.div>
        </div>

        {/* Right — interactive 3D massing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55 }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto max-w-[620px]">
            {/* pediment label */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="elevation-tag text-brass-300">Fig. 01 — Massing Study · drag untuk putar</span>
              <span className="elevation-tag text-paper/40 tabular-nums">N ↑ · Skala 1:200</span>
            </div>

            <div className="brass-frame relative overflow-hidden rounded-t-[190px] rounded-b-2xl bg-gradient-to-b from-[#0f1e30] to-[#080e15]">
              <div className="absolute inset-x-8 top-7 z-10 text-center">
                <p className="font-serif text-[15px] italic tracking-wide text-brass-200">— portico & vault study —</p>
              </div>
              <MassingModel className="h-[440px] w-full sm:h-[520px] lg:h-[560px]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070d14] via-transparent to-transparent p-5 pt-14">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brass-300">Omah Asri — Sleman</p>
                    <p className="mt-1 font-serif text-[22px] text-paper">Vault House · 320 m² · 2024</p>
                  </div>
                  <span className="glow-brass hidden h-10 w-10 items-center justify-center rounded-full border border-brass-400/60 bg-brass-400/15 font-mono text-brass-200 sm:flex">↻</span>
                </div>
              </div>

              <ElevationMarker x="8%" y="30%" label="A — brise soleil" detail="kuningan · 45°" />
              <ElevationMarker x="62%" y="22%" label="B — vault" detail="beton · r 3.2m" />
            </div>

            <CorniceDivider className="mt-5" />
            <div className="mt-3 flex items-center justify-between">
              <BrassRule className="flex-1" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["I", "Firmitas", "Kokoh"],
                ["II", "Utilitas", "Guna"],
                ["III", "Venustas", "Indah"],
              ].map(([n, t, d]) => (
                <div key={n} className="border border-white/10 bg-white/[0.03] px-4 py-4 text-center backdrop-blur-sm">
                  <p className="font-mono text-xs font-medium tracking-[0.2em] text-brass-300">{n}</p>
                  <p className="mt-1 font-serif text-[17px] text-paper">{t}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* bottom marquee — like inscription frieze */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-brass-500/25 bg-[#060b11]/85 py-3 backdrop-blur-md">
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {[0, 1].map((k) => (
              <span key={k} className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-paper/65">
                Tropis Modern ✦ Vault & Kolonade ✦ Batu Andesit ✦ Kayu Jati ✦ Kuningan ✦ Ventilasi Silang ✦ Courtyard ✦ Skylight ✦&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
