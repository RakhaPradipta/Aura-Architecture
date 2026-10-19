"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";

const testimonials = [
  {
    quote:
      "Aura Architecture transformed our vision into a living masterpiece. Every detail, from the way light enters at dawn to the texture of the walls, was considered with extraordinary care.",
    author: "Rina & Budi Wicaksono",
    role: "Homeowners, Villa Serenity",
  },
  {
    quote:
      "Working with the Aura team felt like a true collaboration. They listened deeply, challenged our assumptions, and delivered a headquarters that our employees are genuinely proud to walk into every morning.",
    author: "Dian Kartika",
    role: "CEO, Nara Technologies",
  },
  {
    quote:
      "They have an extraordinary ability to honor a building's history while boldly reimagining its future. Our renovated space has become the creative heartbeat of the entire neighborhood.",
    author: "Arif Rahman",
    role: "Founder, Studio Zen Co-Working",
  },
  {
    quote:
      "The level of craftsmanship and spatial intelligence in their work is rare. They don't just design buildings — they design experiences that stay with you long after you leave.",
    author: "Sarah Mitchell",
    role: "Director, Meridian Hospitality Group",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    // Jangan jalankan autoplay saat tab hidden / reduced-motion
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval>;
    const start = () => {
      timer = setInterval(() => {
        if (!document.hidden) next();
      }, 6000);
    };
    start();
    const onVis = () => {
      clearInterval(timer);
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      <div className="relative min-h-[280px] md:min-h-[220px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute inset-0"
          >
            <span className="label-sm text-blueprint-700 block mb-5 tabular-nums">
              Testimony {String(current + 1).padStart(2, "0")} / 04
            </span>
            <blockquote className="heading-md md:text-3xl font-light text-ink-950 leading-[1.35] mb-9 border-l border-ink-950/20 pl-7">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 pl-7">
              <div className="w-10 h-px bg-blueprint-700/70" />
              <div>
                <p className="font-medium text-ink-900">
                  {testimonials[current].author}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500 mt-1">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Index ticks along a rule, like a drawing scale */}
      <div className="flex items-end gap-0 mt-10 border-t border-ink-950/10 pt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`group flex flex-col items-start gap-2 pr-8 transition-colors ${
              i === current ? "text-blueprint-700" : "text-ink-300 hover:text-ink-500"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          >
            <span
              className={`block w-px transition-all duration-500 ${
                i === current ? "h-5 bg-blueprint-700" : "h-3 bg-current"
              }`}
            />
            <span className="font-mono text-[10px] tracking-[0.24em] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
