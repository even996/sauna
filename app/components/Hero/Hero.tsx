"use client";

import { useRef } from "react";
import "./Hero.css";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="hero" ref={heroRef} id="om-oss">
      <div className="hero-bg" />
      <div className="hero-grain" />

      {/* Subtle steam lines behind image */}
      {[15, 30, 50].map((left, i) => (
        <div
          key={i}
          className="steam-line"
          style={{
            left: `${left}%`,
            top: `${25 + i * 15}%`,
            height: `${80 + i * 20}px`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3.5 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="hero-inner">
        {/* LEFT: text */}
        <div className="hero-content">
          <span className="hero-tag">Bergen, Norge · Mobil badstue til leie</span>
          <h1 className="hero-h1">
            Finn roen i<br />varmen — <em>når som<br />helst, hvor som helst</em>
          </h1>
          <p className="hero-sub">
            Private badstueopplevelser midt i naturen. Vedfyrt, nøye utformet og dypt
            gjenopprettende — for deg som vet at ekte hvile er fortjent.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onBookClick}>
              Reserver en økt
            </button>
            <a href="#badstuer" className="btn-ghost">
              Se våre badstuer <span className="btn-ghost-arrow">→</span>
            </a>
          </div>
        </div>

        {/* RIGHT: sauna image */}
        <div className="hero-image-wrap">
          <div className="hero-image-frame">
            <img src="/sauna-hero.png" alt="Mobil tønnebadstue ved vannet" />
            <div className="hero-image-badge">
              <span className="hero-image-badge-label">Vår badstue</span>
              <span className="hero-image-badge-text">Tønnebadstue · Vedfyrt</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        Rull
      </div>
    </section>
  );
}
