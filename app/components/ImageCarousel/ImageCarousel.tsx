"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "./ImageCarousel.css";

const slides = [
  {
    src: "/sauna.png",
    alt: "Sauna interior",
    caption: "Relax & Restore",
  },
  {
    src: "/sauna-hero.png",
    alt: "Sauna hero",
    caption: "Pure Nordic Warmth",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 500);
    },
    [animating]
  );

  const prev = () => {
    const index = (current - 1 + slides.length) % slides.length;
    goTo(index, "left");
  };

  const next = useCallback(() => {
    const index = (current + 1) % slides.length;
    goTo(index, "right");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="carousel">
      <div
        className={`carousel-track ${animating ? `exit-${direction}` : "enter"}`}
        key={current}
      >
        <Image
          src={slides[current].src}
          alt={slides[current].alt}
          fill
          className="carousel-image"
          priority
        />
        <div className="carousel-overlay" />
        <p className="carousel-caption">{slides[current].caption}</p>
      </div>

      <button className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? " carousel-dot-active" : ""}`}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
