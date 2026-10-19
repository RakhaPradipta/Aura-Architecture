"use client";

import { useState } from "react";
import Link from "next/link";
import { Crosshair, NorthArrow, DimensionLine } from "@/components/Technical";
import { CorniceDivider } from "@/components/arch/ArchElements";

const footerLinks = [
  { title: "Studio", links: [{ label: "Filosofi", href: "/about" }, { label: "Layanan", href: "#services" }, { label: "Karya", href: "#portfolio" }, { label: "Proses", href: "#process" }] },
  { title: "Connect", links: [{ label: "Instagram", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Pinterest", href: "#" }, { label: "ArchDaily", href: "#" }] },
  { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-[#060b11] text-ink-300">
      <CorniceDivider />
      <div className="absolute inset-0 grid-cyanotype opacity-20" />
      {/* giant pediment */}
      <p aria-hidden className="text-stroke-paper pointer-events-none absolute inset-x-0 -top-2 text-center font-serif text-[13vw] leading-none opacity-[0.06]">AURA</p>

      <div className="relative mx-auto max-w-[1500px] px-6 pb-10 pt-16 md:px-12 lg:px-16">
        <div className="flex items-center gap-4">
          <Crosshair className="text-brass-400" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-brass-300">Tabula Ansata — Title Block</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-paper/30">/ A-00</span>
          <span className="hidden h-px flex-1 bg-gradient-to-r from-brass-500/40 to-transparent sm:block" />
          <NorthArrow className="hidden text-brass-400/90 sm:flex" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-t-full border border-brass-400/60 bg-brass-500/10 font-serif text-xl text-brass-300">Æ</span>
              <span className="font-serif text-2xl font-light text-paper"><span className="brass-text">Aura</span> Architecture</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/55">
              Merancang ruang yang bernapas. Di mana arsitektur bertemu alam, dan setiap garis memiliki tujuan — <em className="font-serif italic text-brass-200">firmitas, utilitas, venustas.</em>
            </p>
            <DimensionLine label="Exstructa Yogyakarta · MMXVI" tone="dark" className="mt-7 max-w-xs" />
            <div className="mt-7">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">Epistula / kabar gambar</p>
              <form onSubmit={(e) => { e.preventDefault(); if (email) { setSubscribed(true); setEmail(""); setTimeout(() => setSubscribed(false), 4000); } }} className="flex">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" required
                  className="min-w-0 flex-1 border border-brass-500/30 bg-white/[0.04] px-4 py-3 font-mono text-sm text-paper placeholder:text-paper/30 focus:border-brass-300 focus:outline-none" />
                <button type="submit" className="border border-l-0 border-brass-500/30 bg-brass-400/15 px-6 font-mono text-brass-200 transition-colors hover:bg-brass-400 hover:text-ink-950">{subscribed ? "✓" : "→"}</button>
              </form>
              {subscribed && <p className="mt-2 font-mono text-xs text-brass-300">Gratias! Surat tercatat di arsip.</p>}
            </div>
          </div>

          {footerLinks.map((g) => (
            <div key={g.title} className="lg:col-span-2">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.28em] text-brass-300/80">{g.title}</h4>
              <ul className="mt-5 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="group flex items-center gap-2 text-sm text-paper/55 transition-colors hover:text-brass-200">
                      <span className="h-px w-0 bg-brass-400 transition-all group-hover:w-4" />{l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.28em] text-brass-300/80">Aedes</h4>
            <address className="mt-5 space-y-1 text-sm not-italic text-paper/55">
              <p>Jl. Diponegoro No. 42</p><p>Yogyakarta 55281</p>
              <p className="pt-3"><a href="mailto:hello@auraarchitecture.com" className="text-brass-200/90 hover:text-brass-100">hello@auraarchitecture.com</a></p>
              <p><a href="tel:+622745551234" className="hover:text-paper">+62 274 555 1234</a></p>
            </address>
          </div>
        </div>

        {/* arch frieze */}
        <div aria-hidden className="mt-14 flex items-end justify-center gap-2 opacity-50">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={`block w-6 border border-brass-500/30 bg-white/[0.02] ${i % 2 ? "h-8" : "h-12 rounded-t-full"}`} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">© {new Date().getFullYear()} Aura Architecture · SPQR Architectura</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">Ex lapide, ligno, lumine · Sheet A-00 · Rev 04</p>
        </div>
      </div>
    </footer>
  );
}
