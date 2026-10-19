"use client";

import dynamic from "next/dynamic";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Animations";
import Tilt3D from "@/components/three/Tilt3D";
import { BrassRule } from "@/components/arch/ArchElements";

const MassingModel = dynamic(() => import("@/components/three/MassingModel"), { ssr: false });

const specs = [
  { k: "Luas Tapak", v: "720 m²", d: "Sleman, kontur -1.2 m" },
  { k: "Luas Bangunan", v: "320 m²", d: "2 lantai + mezanin" },
  { k: "Struktur", v: "Vault Beton", d: "bentang 7.2 m" },
  { k: "Orientasi", v: "15° ke Timur", d: "optimal surya pagi" },
  { k: "Ventilasi", v: "Silang 100%", d: "tanpa AC siang hari" },
  { k: "Air Hujan", v: "18.000 L", d: "panen + resapan" },
];

export default function StructureShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#0d1520] py-28 md:py-36">
      <div className="absolute inset-0 grid-cyanotype opacity-20" />
      <p aria-hidden className="text-stroke-brass pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap font-serif text-[11vw] leading-none opacity-[0.10]">STRUCTURA</p>

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:px-16">
        <FadeIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-brass-300">— Bedah Struktur · A-05 —</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.98] text-paper md:text-6xl">
            Dari <em className="brass-text italic">Fondasi</em><br />hingga Bubungan
          </h2>
          <p className="mt-5 max-w-lg text-paper/60">
            Putar model 3D di samping — setiap massa menjawab matahari, angin, dan kontur.
            Vault beton menaungi ruang keluarga, bar kaca menangkap pagi, sirip kuningan memotong silau barat.
          </p>

          <StaggerChildren className="mt-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {specs.map((s) => (
              <StaggerItem key={s.k}>
                <div className="h-full bg-[#0a1119] p-5 transition-colors hover:bg-[#101a28]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/45">{s.k}</p>
                  <p className="mt-1 font-serif text-2xl text-brass-200">{s.v}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-paper/50">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <div className="mt-8 max-w-lg"><BrassRule /></div>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Denah", "Tampak", "Potongan A-A", "Aksonometri"].map((t, i) => (
              <span key={t} className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] ${i === 3 ? "border-brass-400 bg-brass-400/15 text-brass-200" : "border-white/15 text-paper/60"}`}>{t}</span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Tilt3D max={7} scale={1.01}>
            <div className="brass-frame relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#122334] to-[#080e15]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-brass-300">● ● ● &nbsp; viewport — orbit enabled</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-paper/40">FPS 60 · WebGL</span>
              </div>
              <MassingModel className="h-[420px] w-full sm:h-[520px]" />
              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-black/40 backdrop-blur-md">
                {[
                  ["12", "kolom"],
                  ["7.2m", "bentang"],
                  ["45°", "brise"],
                ].map(([v, l]) => (
                  <div key={l} className="px-4 py-3 text-center">
                    <p className="font-serif text-xl text-paper">{v}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Tilt3D>
        </FadeIn>
      </div>
    </section>
  );
}
