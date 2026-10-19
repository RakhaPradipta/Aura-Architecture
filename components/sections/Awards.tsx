import { FadeIn } from "@/components/Animations";
import { Crosshair, HatchSwatch } from "@/components/Technical";

const awards = [
  { name: "World Architecture Festival", year: "2024", category: "Finalist — Housing", code: "WAF" },
  { name: "ASEAN Architecture Award", year: "2023", category: "Excellence in Design", code: "AAA" },
  { name: "Indonesia Institute of Architects", year: "2023", category: "Best Commercial Project", code: "IAI" },
  { name: "ArchDaily Building of the Year", year: "2022", category: "Nominee", code: "ADY" },
  { name: "A' Design Award", year: "2022", category: "Gold — Architecture", code: "ADA" },
  { name: "Architectural Digest", year: "2024", category: "Asia's Rising Studios", code: "AD" },
];

export default function Awards() {
  return (
    <section className="py-20 border-y border-ink-950/10 bg-paper">
      <div className="section-padding">
        <FadeIn className="mb-10 flex flex-wrap items-center gap-4">
          <Crosshair className="text-blueprint-700" />
          <span className="label-sm text-blueprint-700">Recognition</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-ink-500 tabular-nums">
            / Schedule A-07
          </span>
          <span className="hidden sm:block h-px flex-1 bg-ink-950/10" />
          <HatchSwatch label="Verified" />
        </FadeIn>

        {/* Schedule: every entry is a ruled row of the drawing register */}
        <FadeIn delay={0.2}>
          <ul className="border-t border-ink-950/10">
            {awards.map((award) => (
              <li
                key={award.name}
                className="group grid grid-cols-12 items-center gap-4 border-b border-ink-950/10 py-4 hover:bg-ash/60 transition-colors duration-300"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.2em] text-blueprint-700 tabular-nums">
                  {award.code}
                </span>
                <span className="col-span-10 md:col-span-4 text-sm font-medium text-ink-950">
                  {award.name}
                </span>
                <span className="col-span-12 md:col-span-5 text-sm text-ink-500 md:pl-4">
                  {award.category}
                </span>
                <span className="col-span-12 md:col-span-2 font-mono text-[11px] tracking-[0.2em] text-ink-500 md:text-right tabular-nums">
                  {award.year}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
