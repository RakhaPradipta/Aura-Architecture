"use client";

import { useState } from "react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Animations";
import { ColumnDivider, BrassRule } from "@/components/arch/ArchElements";
import Tilt3D from "@/components/three/Tilt3D";

const projectTypes = ["Hunian", "Komersial", "Interior", "Renovasi", "Konsultasi", "Lainnya"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("sent"); setErrorMsg(""); setForm({ name: "", email: "", projectType: "", message: "" }); }
      else {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.message || "Gagal terkirim.");
        setStatus("error");
      }
    } catch { setErrorMsg("Gagal terkirim."); setStatus("error"); }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#080e15] py-28 md:py-36">
      <div className="absolute inset-0 grid-cyanotype opacity-25" />
      <div className="vault-lines absolute inset-0 opacity-50" />
      <p aria-hidden className="text-stroke-paper pointer-events-none absolute inset-x-0 top-6 text-center font-serif text-[10vw] leading-none opacity-[0.07]">AEDIFICARE</p>

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 md:px-12 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <FadeIn>
            <ColumnDivider />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-brass-300">— Titulus Contact · A-08 —</p>
            <h2 className="mt-4 font-serif text-4xl leading-[0.98] text-paper md:text-6xl">
              Mari <em className="brass-text italic">Membangun</em><br />Bersama
            </h2>
            <p className="mt-5 max-w-md text-paper/60">Ceritakan tapak, brief, atau sekadar rasa yang ingin dihadirkan ruang. Kami membalas dalam dua hari kerja.</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form onSubmit={handleSubmit} className="mt-10 space-y-6 border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md">
              {[
                { id: "name", label: "Nama Anda", num: "01", type: "text", ph: "cth. Rina Wicaksono", val: form.name, set: (v: string) => setForm({ ...form, name: v }) },
                { id: "email", label: "Email", num: "02", type: "email", ph: "nama@email.com", val: form.email, set: (v: string) => setForm({ ...form, email: v }) },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
                    <span className="text-brass-300">{f.num}</span> {f.label}
                  </label>
                  <input id={f.id} type={f.type} required value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                    className="w-full border-b border-white/20 bg-transparent py-3 text-paper placeholder:text-paper/30 focus:border-brass-300 focus:outline-none" />
                </div>
              ))}
              <div>
                <label htmlFor="projectType" className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
                  <span className="text-brass-300">03</span> Jenis Proyek
                </label>
                <select id="projectType" required value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full appearance-none border-b border-white/20 bg-transparent py-3 text-paper focus:border-brass-300 focus:outline-none">
                  <option value="" disabled className="bg-ink-900">Pilih layanan</option>
                  {projectTypes.map((t) => <option key={t} value={t} className="bg-ink-900">{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
                  <span className="text-brass-300">04</span> Cerita Proyek Anda
                </label>
                <textarea id="message" rows={4} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Luas tanah, lokasi, timeline, impian ruang…" className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-paper placeholder:text-paper/30 focus:border-brass-300 focus:outline-none" />
              </div>
              <button type="submit" disabled={status === "sending"}
                className="w-full border border-brass-400 bg-brass-400 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-950 transition-all hover:bg-brass-300 disabled:opacity-60">
                {status === "sending" ? "Mengirim…" : status === "sent" ? "✓ Terkirim — matur nuwun!" : "Kirim Pesan ⌁"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-400">
                  {errorMsg || "Gagal terkirim."}{" "}
                  <a href="mailto:hello@auraarchitecture.com" className="underline hover:text-red-300">
                    Email kami langsung
                  </a>
                </p>
              )}
            </form>
          </FadeIn>
        </div>

        <div className="lg:col-span-7">
          <FadeIn delay={0.2}>
            <Tilt3D max={6}>
              <div className="brass-frame overflow-hidden rounded-t-[140px] rounded-b-2xl bg-[#0d1622]">
                <div className="flex items-center justify-between border-b border-brass-500/20 px-6 py-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-brass-300">Tabula · denah studio</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-paper/40">7.7956°S 110.37°E</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <address className="space-y-1 border-b border-white/10 p-6 text-sm not-italic leading-relaxed text-paper/70 sm:border-b-0 sm:border-r">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brass-300">Visitatio</p>
                    <p className="pt-2 font-serif text-xl text-paper">Jogja Studio</p>
                    <p>Jl. Diponegoro No. 42</p><p>Yogyakarta 55281</p>
                    <p className="pt-2"><a href="tel:+622745551234" className="text-brass-200 hover:text-brass-100">+62 274 555 1234</a></p>
                    <p><a href="mailto:hello@auraarchitecture.com" className="text-brass-200 hover:text-brass-100">hello@auraarchitecture.com</a></p>
                    <div className="pt-4"><BrassRule /></div>
                    <p className="pt-2 font-mono text-[11px] text-paper/50">Senin–Jumat 08–17 · Sabtu 09–13</p>
                  </address>
                  <div className="p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brass-300">Horologium</p>
                    <StaggerChildren className="mt-3 space-y-3">
                      {[["Senin — Jumat", "08.00 — 17.00"], ["Sabtu", "09.00 — 13.00"], ["Minggu", "Clausum · tutup"]].map(([d, h]) => (
                        <StaggerItem key={d}>
                          <div className="flex items-center justify-between border border-white/10 bg-black/30 px-4 py-3">
                            <span className="text-sm text-paper/70">{d}</span>
                            <span className="font-mono text-[11px] tracking-[0.14em] text-brass-200">{h}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                    <div className="mt-4 flex gap-3">
                      {["Instagram", "LinkedIn", "Pinterest"].map((s) => (
                        <a key={s} href="#" className="flex-1 border border-white/12 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60 transition-colors hover:border-brass-400 hover:text-brass-200">{s}</a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[16/8] w-full border-t border-brass-500/20">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.1234!2d110.389!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDQuMiJTIDExMMKwMjMnMjAuNCJF!5e0!3m2!1sen!2sid!4v1234567890"
                    width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) sepia(0.25) contrast(1.05)" }}
                    allowFullScreen loading="lazy" title="Lokasi studio" />
                </div>
              </div>
            </Tilt3D>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
