"use client";

import React from "react";

/* ── Classical architectural primitives ────────────────────────── */

export function BrassRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-brass-500/70" />
      <span className="block h-[7px] w-[7px] rotate-45 border border-brass-400 bg-brass-500/20" />
      <span className="brass-line flex-1" />
      <span className="block h-[7px] w-[7px] rotate-45 border border-brass-400 bg-brass-500/20" />
      <span className="h-px w-10 bg-brass-500/70" />
    </div>
  );
}

export function ColumnDivider({ label = "AURA" }: { label?: string }) {
  // Five fluted pilasters like a colonnade rhythm
  return (
    <div aria-hidden className="flex items-stretch justify-center gap-3 md:gap-5 opacity-70">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <span className="block h-1.5 w-1.5 rotate-45 border border-brass-500/70" />
          <span className={`fluted block w-6 md:w-9 ${i === 2 ? "h-20 md:h-28" : "h-14 md:h-20"} rounded-t-full border border-white/10 bg-white/[0.04]`} />
          <span className="block h-[3px] w-8 md:w-11 bg-brass-500/60" />
          <span className="block h-[10px] w-8 md:w-11 bg-gradient-to-b from-white/10 to-transparent border-x border-brass-500/30" />
        </div>
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function CorniceDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="cornice w-full" />
      <div className="dentil mt-[3px] text-brass-500/80" />
    </div>
  );
}

export function ArchFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="pointer-events-none absolute -inset-3 arch-window border border-brass-500/35" />
      <div aria-hidden className="pointer-events-none absolute -inset-6 arch-window border border-brass-500/15" />
      <div aria-hidden className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <span className="block h-3 w-3 rotate-45 bg-brass-400 shadow-[0_0_18px_rgba(201,168,106,0.8)]" />
      </div>
      <div className="arch-window overflow-hidden brass-frame relative bg-ink-950">
        {children}
      </div>
    </div>
  );
}

export function KeystoneLabel({
  code,
  label,
  dark = true,
}: {
  code: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className={`inline-flex items-center gap-3 ${dark ? "text-paper" : "text-ink-950"}`}>
      <span className="flex h-10 w-10 items-center justify-center rotate-45 border border-brass-500/60 bg-brass-500/10">
        <span className="-rotate-45 font-mono text-xs tracking-widest text-brass-300 font-medium">{code}</span>
      </span>
      <span className="font-mono text-[13px] uppercase tracking-[0.18em] opacity-90 font-medium">{label}</span>
    </div>
  );
}

export function VaultGrid({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`vault-lines pointer-events-none absolute inset-0 ${className}`} />;
}

export function ElevationMarker({
  x,
  y,
  label,
  detail,
}: {
  x: string;
  y: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="absolute z-20 hidden md:block" style={{ left: x, top: y }}>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-brass-200 bg-brass-400" />
        </span>
        <span className="h-px w-10 bg-brass-400/70" />
        <div className="border border-brass-500/30 bg-ink-950/80 px-4 py-2.5 backdrop-blur-md">
          <p className="font-mono text-xs tracking-[0.14em] text-brass-300 font-medium">{label}</p>
          <p className="mt-0.5 font-mono text-xs tracking-[0.1em] text-paper/70">{detail}</p>
        </div>
      </div>
    </div>
  );
}

export function MaterialSwatch({
  name,
  latin,
  color,
  active,
  onHover,
}: {
  name: string;
  latin: string;
  color: string;
  active?: boolean;
  onHover?: () => void;
}) {
  return (
    <button
      onMouseEnter={onHover}
      className={`group text-left border p-5 transition-all duration-400 w-full ${
        active ? "border-brass-400 bg-white/[0.06]" : "border-white/10 bg-white/[0.02] hover:border-brass-500/50"
      }`}
    >
      <span className="block h-14 w-full border border-white/10" style={{ background: color }} />
      <span className="mt-4 block font-serif text-lg text-paper">{name}</span>
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-paper/60 italic">{latin}</span>
      <span className={`mt-3 block h-px transition-all duration-500 ${active ? "w-full bg-brass-400" : "w-8 bg-white/20 group-hover:w-full group-hover:bg-brass-500/60"}`} />
    </button>
  );
}
