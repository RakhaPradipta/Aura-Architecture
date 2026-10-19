import ImageWithFallback from "@/components/ImageWithFallback";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/Animations";
import { GridOverlay, DimensionLine } from "@/components/Technical";
import { ColumnDivider, ArchFrame, BrassRule } from "@/components/arch/ArchElements";
import Tilt3D from "@/components/three/Tilt3D";

const values = [
  { number: "I", title: "Cahaya sebagai Material", tag: "Lux & Umbra", description: "Cahaya matahari kami perlakukan sebagai material utama — dibelokkan sirip kuningan, disaring roster, dijatuhkan skylight tepat di atas meja makan." },
  { number: "II", title: "Alam, Bukan Dekorasi", tag: "Genius Loci", description: "Setiap courtyard, dinding taman, dan teras tanam adalah struktur — bukan tempelan. Bangunan menumpang pada lanskap." },
  { number: "III", title: "Tangan Pengrajin", tag: "Manus & Materia", description: "Dari serat handrail jati hingga nat batu andesit — detail dikerjakan pengrajin Jogja yang kami kenal namanya satu per satu." },
];

const stats = [
  ["80+", "Proyek terbangun"],
  ["12", "Arsitek & desainer"],
  ["9", "Penghargaan"],
  ["10", "Tahun berkarya"],
];

export default function About() {
  return (
    <section id="about" className="travertine-vein relative overflow-hidden bg-[#EDE9DF] py-28 md:py-36">
      <GridOverlay variant="paper" />
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeIn>
              <ColumnDivider />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.32em] text-blueprint-700">— Filosofi · A-02 —</p>
              <h2 className="mt-4 font-serif text-4xl leading-[0.98] text-ink-950 md:text-6xl">
                Arsitektur adalah <em className="italic text-blueprint-700">Meruang</em> dengan Penuh Pikiran
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="body-lg mt-7 text-ink-700">
                Didirikan 2016 di Yogyakarta, Aura lahir dari keyakinan bahwa desain hebat dimulai dari mendengar —
                klien, tapak, dan budaya yang mengelilinginya.
              </p>
              <p className="body-md mt-5 text-ink-600">
                Dipimpin arsitek utama <strong className="font-medium text-ink-950">Aditya Prasetyo</strong>, tim dua belas
                arsitek, desainer interior, dan spesialis lansekap merawat tiap proyek sebagai dialog antara tempat & tujuan.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="mt-8 grid grid-cols-4 gap-px border border-ink-950/12 bg-ink-950/12">
                {stats.map(([v, l]) => (
                  <div key={l} className="bg-[#EDE9DF] px-3 py-4 text-center">
                    <p className="font-serif text-2xl text-ink-950 md:text-3xl">{v}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-[0.18em] text-ink-500">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6"><BrassRule /></div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-5">
              <FadeIn delay={0.15}>
                <Tilt3D max={10}>
                  <ArchFrame>
                    <div className="relative aspect-[3/4]">
                      <ImageWithFallback src="/images/about/studio-interior.jpg" alt="Studio" fill className="object-cover" sizes="(max-width:768px) 50vw, 30vw" />
                      <span className="absolute bottom-3 left-3 bg-ink-950/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85">Fig. 01 · Studio</span>
                    </div>
                  </ArchFrame>
                </Tilt3D>
              </FadeIn>
              <FadeIn delay={0.28} className="mt-12">
                <Tilt3D max={10}>
                  <ArchFrame>
                    <div className="relative aspect-[3/4]">
                      <ImageWithFallback src="/images/about/design-detail.jpg" alt="Detail" fill className="object-cover" sizes="(max-width:768px) 50vw, 30vw" />
                      <span className="absolute bottom-3 left-3 bg-ink-950/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85">Fig. 02 · Detail joinery</span>
                    </div>
                  </ArchFrame>
                </Tilt3D>
              </FadeIn>
            </div>

            <StaggerChildren className="mt-12 space-y-0 border-t border-ink-950/12">
              {values.map((v) => (
                <StaggerItem key={v.number}>
                  <div className="group grid grid-cols-12 gap-4 border-b border-ink-950/12 py-6 transition-colors hover:bg-white/50">
                    <span className="col-span-2 flex h-11 w-11 items-center justify-center rounded-t-full border border-brass-600/60 bg-white/60 font-serif text-lg text-brass-700">{v.number}</span>
                    <div className="col-span-10">
                      <div className="flex flex-wrap items-baseline gap-x-4">
                        <h3 className="font-serif text-xl text-ink-950">{v.title}</h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500 italic">{v.tag}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <DimensionLine label="Tiga prinsip Vitruvius" className="mt-8 max-w-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
