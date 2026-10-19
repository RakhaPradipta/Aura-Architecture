import Link from "next/link";
import {
  Crosshair,
  DimensionLine,
  GridOverlay,
  NorthArrow,
} from "@/components/Technical";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center section-padding overflow-hidden">
      <GridOverlay variant="paper" />

      <div className="relative text-center max-w-lg">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Crosshair className="text-blueprint-700" />
          <span className="label-sm text-blueprint-700">Sheet missing</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-ink-600">
            / A-404
          </span>
        </div>

        <p className="font-serif text-8xl md:text-9xl font-light text-blueprint-700 leading-none">
          404
        </p>

        <DimensionLine label="Drawing not found in this set" className="mt-8" />

        <h1 className="heading-md text-ink-950 mt-8 mb-4">Page Not Found</h1>

        <p className="body-md text-ink-600 mb-8">
          The sheet you are looking for does not exist or has been removed from
          the set. Let us help you find your way back.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/#portfolio" className="btn-secondary">
            View Portfolio
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <NorthArrow className="text-ink-500" />
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-ink-600">
            North is that way · Aura Architecture
          </span>
        </div>
      </div>
    </section>
  );
}
