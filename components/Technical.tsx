import type { ReactNode } from "react";
import { FadeIn } from "@/components/Animations";

/**
 * Drawing-sheet primitives.
 *
 * These carry the four values of the studio into the interface:
 *   structure & grid  → SheetLabel, DimensionLine, grid overlays
 *   light & shadow    → LightWash
 *   material & craft  → Hatch swatches
 *   context & nature  → NorthArrow / ScaleBar (site, orientation, scale)
 */

/* ── Structure & grid ──────────────────────────────────────────── */

/** A drafting dimension line: end ticks, extension line, measurement. */
export function DimensionLine({
  label,
  tone = "light",
  className = "",
}: {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  // Hairline weights: the line recedes, the measurement reads.
  const line = tone === "dark" ? "text-paper/30" : "text-ink-950/20";
  const note = tone === "dark" ? "text-ink-300" : "text-ink-500";

  return (
    <div aria-hidden className={`flex items-center gap-3 ${line} ${className}`}>
      <span className="h-2 w-px bg-current shrink-0" />
      <span className="h-px flex-1 bg-current" />
      {label && (
        <span
          className={`font-mono text-xs tracking-[0.16em] uppercase ${note} shrink-0 tabular-nums font-medium`}
        >
          {label}
        </span>
      )}
      <span className="h-px flex-1 bg-current" />
      <span className="h-2 w-px bg-current shrink-0" />
    </div>
  );
}

/** Registration crosshair used as a section anchor. */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="7" cy="7" r="2.75" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

/** Sheet header: index, eyebrow, rule — everything reads as a drawing note. */
export function SheetLabel({
  index,
  eyebrow,
  dark = false,
}: {
  index?: string;
  eyebrow: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <Crosshair className={dark ? "text-blueprint-400" : "text-blueprint-700"} />
      <span
        className={`label-sm ${dark ? "text-blueprint-300" : "text-blueprint-700"}`}
      >
        {eyebrow}
      </span>
      {index && (
        <span
          className={`font-mono text-xs tracking-[0.16em] tabular-nums ${
            dark ? "text-ink-400" : "text-ink-500"
          }`}
        >
          / {index}
        </span>
      )}
      <span
        className={`hidden sm:block h-px flex-1 ${
          dark ? "bg-paper/15" : "bg-ink-950/10"
        }`}
      />
    </div>
  );
}

/**
 * Consistent section header used across the site: sheet label, serif title,
 * optional description and a dimension line that measures the heading block.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  maxWidth = "max-w-3xl",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  maxWidth?: string;
}) {
  const center = align === "center";

  return (
    <FadeIn className={center ? "text-center" : ""}>
      <div className={center ? "flex justify-center" : ""}>
        <SheetLabel index={index} eyebrow={eyebrow} dark={dark} />
      </div>

      <h2
        className={`heading-lg mt-7 ${
          dark ? "text-paper" : "text-ink-950"
        } ${center ? `mx-auto ${maxWidth}` : maxWidth}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`body-md mt-6 ${dark ? "text-ink-300" : "text-ink-600"} ${
            center ? `mx-auto max-w-2xl` : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}

      <DimensionLine
        tone={dark ? "dark" : "light"}
        className={`mt-9 ${center ? "max-w-xs mx-auto" : "max-w-md"}`}
      />
    </FadeIn>
  );
}

/** Absolutely-positioned graph paper, for structure behind a section. */
export function GridOverlay({
  variant = "paper",
  className = "",
}: {
  variant?: "paper" | "cyanotype";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${
        variant === "cyanotype" ? "grid-cyanotype" : "grid-paper"
      } ${className}`}
    />
  );
}

/* ── Light & shadow ────────────────────────────────────────────── */

/** Directional wash laid over imagery. */
export function LightWash({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`pointer-events-none absolute inset-0 light-wash ${className}`} />;
}

/* ── Material & craft ──────────────────────────────────────────── */

/** Diagonal hatch swatch — the section-cut convention for solid material. */
export function HatchSwatch({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className={`hatch h-4 w-8 shrink-0 ${
          dark ? "text-blueprint-400" : "text-blueprint-700"
        }`}
      />
      <span
        className={`font-mono text-xs uppercase tracking-[0.16em] ${
          dark ? "text-ink-300" : "text-ink-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Context & nature ──────────────────────────────────────────── */

/** North arrow — orientation, the first question asked of any site. */
export function NorthArrow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden>
        <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="0.75" />
        <path d="M13 4l4 12-4-3-4 3 4-12z" fill="currentColor" />
        <path d="M13 22v-6" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <span className="font-mono text-xs tracking-[0.16em] font-medium">N</span>
    </div>
  );
}

/** Graphic scale bar, the honest way to state size. */
export function ScaleBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-3 ${className}`} aria-hidden>
      <div className="flex h-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`block w-5 h-1.5 border border-current ${
              i % 2 === 0 ? "bg-current" : "bg-transparent"
            }`}
          />
        ))}
      </div>
      <span className="font-mono text-xs tracking-[0.16em] tabular-nums font-medium">
        0—10 M
      </span>
    </div>
  );
}

/* ── Title block ───────────────────────────────────────────────── */

export interface TitleBlockCell {
  label: string;
  value: ReactNode;
}

/**
 * Drawing title block — the grid of project facts in the corner of every
 * sheet. Used for project metadata and studio facts.
 */
export function TitleBlock({
  cells,
  dark = false,
  className = "",
}: {
  cells: TitleBlockCell[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l ${
        dark ? "border-paper/15" : "border-ink-950/10"
      } ${className}`}
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          className={`border-r border-b px-5 py-5 md:px-6 md:py-6 ${
            dark ? "border-paper/15" : "border-ink-950/10"
          }`}
        >
          <dt
            className={`label-sm ${
              dark ? "text-ink-400" : "text-ink-500"
            }`}
          >
            {cell.label}
          </dt>
          <dd
            className={`mt-2.5 font-serif text-lg leading-snug ${
              dark ? "text-paper" : "text-ink-950"
            }`}
          >
            {cell.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
