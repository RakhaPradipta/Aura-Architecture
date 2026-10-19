/**
 * Responsive `sizes` strings for Next.js <Image> components.
 *
 * Breakpoints (Tailwind defaults):
 *   md  = 768px
 *   lg  = 1024px
 *   xl  = 1280px
 *   2xl = 1536px
 *
 * Layout grid uses section-padding:
 *   px-6  (24px)  → mobile
 *   px-12 (48px)  → md
 *   px-20 (80px)  → lg
 *   px-32 (128px) → xl
 */

// ─── Full-bleed ──────────────────────────────────────────────────
/** Hero backgrounds, panoramic banners — edge-to-edge at every width. */
export const fullBleed = "100vw";

// ─── Project card grid (3-col / 2-col / 1-col) ──────────────────
/**
 * Portfolio grid: 1 col mobile, 2 cols md (some cards span 2), 3 cols lg.
 * - md:  container ≈ viewport − 96px padding − 24px gap → each col ≈ (vw − 120) / 2
 * - lg:  container ≈ viewport − 160px padding − 48px gap → each col ≈ (vw − 208) / 3
 *
 * Worst-case (span-2 card at md) is 100vw, so we use that as the md breakpoint
 * to avoid under-requesting.  The lg fallback targets a single column.
 */
export const projectCard =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px";

// ─── Project detail: overview image (5/12 + 7/12 split) ──────────
/**
 * At lg the right column is 7/12 of the container:
 *   (vw − 160px − 80px gap) × 7/12 ≈ 58vw
 * Below lg it's full-width.
 */
export const projectOverview = "(max-width: 1024px) 100vw, 58vw";

// ─── Gallery (2-col grid) ────────────────────────────────────────
/**
 * 2 columns at md+, each ≈ (vw − 120px gap) / 2.
 * At xl each column ≈ 540px.
 */
export const projectGallery =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px";

// ─── Related projects (2-col grid) ───────────────────────────────
export const relatedCard =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px";

// ─── Team grid (3-col / 2-col / 1-col) ──────────────────────────
/**
 * Same grid rhythm as the project card grid.
 */
export const teamGrid =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px";

// ─── Small team headshot (circular, fixed size) ──────────────────
/** 96×96px rounded avatar used on project detail "Project Team" section. */
export const headshot = "96px";

// ─── Modal (max-w-4xl = 896px, centered) ────────────────────────
/**
 * Modal content is capped at 896px and centered.
 * Below md it fills the viewport with p-4 padding.
 */
export const modal = "(max-width: 768px) 100vw, 896px";

// ─── About page: asymmetric 2-col images (7/12 column) ──────────
/**
 * The right column is 7/12 of the container.  Inside it, a 2-col grid
 * with gap-4 splits the space.  Each image ≈ (7/12 × container) / 2 − gap.
 * - lg:  (vw − 160px) × 7/12 ≈ 58vw → per image ≈ 29vw
 * - xl:  per image ≈ (vw − 256px) × 7/12 / 2 ≈ 24vw ≈ 350px
 */
export const aboutImages =
  "(max-width: 1024px) 50vw, (max-width: 1200px) 28vw, 350px";

// ─── About page: team grid (3-col) ──────────────────────────────
/** Same as teamGrid — used on the About page's team section. */
export const aboutTeamGrid = teamGrid;
