"use client";

import { useState } from "react";
import { FadeIn } from "@/components/Animations";
import Tilt3D from "@/components/three/Tilt3D";
import { ColumnDivider, BrassRule } from "@/components/arch/ArchElements";

const materials = [
  { name: "Andesit Candi", latin: "Lapis Andescite", color: "linear-gradient(135deg,#2f3d49,#5a6f80 55%,#1e2933)", desc: "Batu vulkanik Merapi — kaki bangunan yang membumi, anti licin, menua dengan anggun.", spec: "60×60 · bakar + brush" },
  { name: "Jati Perhutani", latin: "Tectona Grandis", color: "linear-gradient(135deg,#834f33,#b97c51 50%,#563627)", desc: "Kayu jati solid untuk kusen, decking, dan brise soleil yang menghangatkan cahaya.", spec: "Oven · MC 12%" },
  { name: "Kuningan Asli", latin: "Orichalcum", color: "linear-gradient(135deg,#8a6d3c,#f2e3c0 50%,#b08d4f)", desc: "List, handle, dan fasad secondary skin — memantulkan senja ke dalam ruang.", spec: "Brass 70/30 · patina" },
  { name: "Beton Ekspos", latin: "Opus Caementicium", color: "linear-gradient(135deg,#a9b8c4,#e6ebf0 55%,#7f93a3)", desc: "Vault & dinding struktural dengan bekisting kayu — jujur, mentah, monumental.", spec: "K-350 · boardmark" },
  { name: "Terakota Lombok", latin: "Terra Cotta", color: "linear-gradient(135deg,#a0643f,#ddb595 55%,#6a412c)", desc: "Roster & breeze block — ventilasi silang alami khas tropis tanpa AC.", spec: "20×20×10 · bakar" },
  { name: "Kaca Low-E", latin: "Vitrum Lumina", color: "linear-gradient(135deg,#1c4e7d,#93d2f5 55%,#122b47)", desc: "Dinding kaca hemat energi — terang tanpa panas, menghubungkan dalam & luar.", spec: "8+12A+8 · U 1.1" },
];

export default function MaterialAtlas() {
  const [active, setActive] = useState(2);

  return (
    <section id="materials" className="relative overflow-hidden bg-[#0a1119] py-28 md:py-36">
      <div className="absolute inset-0 grid-cyanotype opacity-25" />
      <div className="vault-lines absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 md:px-12 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <FadeIn>
            <ColumnDivider />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-brass-300">— Atlas Material · A-06 —</p>
            <h2 className="mt-4 font-serif text-4xl leading-[0.98] text-paper md:text-6xl">
              Palet <em className="brass-text italic">Material</em> Nusantara
            </h2>
            <p className="mt-5 max-w-md text-paper/60">
              Enam material jujur yang kami ulang di setiap karya — disentuh tangan pengrajin Kotagede & Kasongan.
              Arahkan kursor untuk membaca spesifikasi tukang.
            </p>
            <div className="mt-8 border border-brass-500/25 bg-white/[0.03] p-6 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brass-300">Spesimen aktif — {materials[active].latin}</p>
              <p className="mt-2 font-serif text-3xl text-paper">{materials[active].name}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper/65">{materials[active].desc}</p>
              <div className="mt-4"><BrassRule /></div>
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-brass-200">{materials[active].spec}</p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["Potongan", "Retak", "Patina"].map((t) => (
                  <span key={t} className="border border-white/10 bg-black/30 px-2 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {materials.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.06}>
              <Tilt3D max={11}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group w-full overflow-hidden rounded-t-[64px] rounded-b-lg border p-5 text-left transition-all duration-400 ${
                    active === i ? "border-brass-400 bg-white/[0.07] shadow-[0_24px_60px_-20px_rgba(201,168,106,0.45)]" : "border-white/10 bg-white/[0.02] hover:border-brass-500/50"
                  }`}
                >
                  <span className="fluted pointer-events-none absolute" />
                  <span className="block h-28 w-full rounded-t-[48px] border border-white/15" style={{ background: m.color }} />
                  <span className="mt-4 flex items-baseline justify-between">
                    <span className="font-serif text-xl text-paper">{m.name}</span>
                    <span className="font-mono text-[10px] text-brass-300">0{i + 1}</span>
                  </span>
                  <span className="block font-mono text-[10px] uppercase italic tracking-[0.24em] text-paper/45">{m.latin}</span>
                  <span className={`mt-3 block h-px transition-all duration-500 ${active === i ? "w-full bg-brass-400" : "w-8 bg-white/20 group-hover:w-full group-hover:bg-brass-500/60"}`} />
                </button>
              </Tilt3D>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
