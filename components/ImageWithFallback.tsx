"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";

type ImageWithFallbackProps = ComponentProps<typeof Image> & {
  fallbackAlt?: string;
  /** Placeholder surface — "dark" for cyanotype sections. */
  tone?: "light" | "dark";
};

/**
 * Renders next/image, but swaps to a drawing-sheet placeholder if the file
 * cannot be loaded (e.g. an asset that has not been exported yet). Keeps
 * `fill` positioning so the layout does not collapse.
 */
export default function ImageWithFallback({
  alt,
  fallbackAlt,
  onError,
  className,
  fill,
  tone = "light",
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const dark = tone === "dark";
    return (
      <div
        role="img"
        aria-label={fallbackAlt || alt || "Image"}
        className={[
          fill ? "absolute inset-0" : "",
          "flex flex-col items-center justify-center gap-3",
          dark ? "bg-ink-900 grid-cyanotype" : "bg-ink-100 grid-paper",
          className ?? "",
        ].join(" ")}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden
          className={dark ? "text-blueprint-400" : "text-ink-300"}
        >
          <rect x="4" y="8" width="40" height="32" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth="1.25" />
          <path
            d="M4 32l10-10 8 8 8-12 14 14"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24 4v4M24 40v4" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
            dark ? "text-ink-400" : "text-ink-500"
          }`}
        >
          Image not loaded
        </span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      fill={fill}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
