"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair } from "@/components/Technical";

const navLinks = [
  { label: "Filosofi", href: "/about", numeral: "I" },
  { label: "Tim", href: "/team", numeral: "II" },
  { label: "Layanan", href: "#services", numeral: "III" },
  { label: "Karya", href: "#portfolio", numeral: "IV" },
  { label: "Proses", href: "#process", numeral: "V" },
  { label: "Material", href: "#materials", numeral: "VI" },
  { label: "Kontak", href: "#contact", numeral: "VII" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-brass-500/25 bg-[#0b1320]/90 py-4 backdrop-blur-xl"
            : "border-b border-white/[0.06] bg-gradient-to-b from-black/50 to-transparent py-6"
        }`}
      >
        {/* dentil course under header */}
        <span aria-hidden className={`absolute inset-x-0 bottom-0 block h-[4px] bg-[repeating-linear-gradient(90deg,rgba(201,168,106,0.55)_0_10px,transparent_10px_18px)] transition-opacity ${scrolled ? "opacity-100" : "opacity-40"}`} />
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-10 px-6 md:px-10 lg:px-14">
          <Link href="/" className="group relative z-10 flex shrink-0 items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-t-full border border-brass-400/60 bg-gradient-to-b from-brass-500/25 to-transparent">
              <Crosshair className="text-brass-300" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl tracking-tight text-paper md:text-2xl">
                <span className="brass-text font-medium">Aura</span> Architecture
              </span>
              <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.24em] text-paper/60">
                Firmitas · Utilitas · Venustas
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="group relative px-1 py-2 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-paper/75 transition-colors hover:text-brass-200"
              >
                <span className="mr-1.5 text-[11px] text-brass-400/90">{link.numeral}·</span>
                {link.label}
                <span className="absolute -bottom-0.5 left-1 right-1 h-px origin-left scale-x-0 bg-brass-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 shrink-0 border border-brass-400/70 bg-brass-400/10 px-7 py-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brass-200 transition-all hover:bg-brass-400 hover:text-ink-950"
            >
              Mulai Proyek
            </a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-10 flex h-8 w-8 flex-col items-end justify-center gap-1.5 text-paper lg:hidden"
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-current transition-all duration-300 ${isOpen ? "w-8 rotate-45 translate-y-[3.5px]" : "w-8"}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${isOpen ? "w-8 -rotate-45 -translate-y-[3.5px]" : "w-5"}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080e15]/97 backdrop-blur-xl lg:hidden"
          >
            <div className="absolute inset-0 grid-cyanotype opacity-25" />
            <nav className="relative flex h-full flex-col items-center justify-center gap-3 px-6">
              <span className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.24em] text-brass-300">— Portico Menu —</span>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex items-baseline gap-4 py-2.5 font-serif text-3xl text-paper hover:text-brass-200"
                >
                  <span className="font-mono text-sm text-brass-400">{link.numeral}</span>
                  {link.label}
                </motion.a>
              ))}
              <span className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-paper/50">Sheet A-00 · Aura Architecture</span>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
