"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import Image from "next/image";


const SAUNAS = [
  {
    id: 1,
    name: "Bjørkehytta",
    capacity: "Opptil 6 personer",
    temp: "80–100°C",
    duration: "Fra 2 timer",
    price: "Fra 490 kr",
    tag: "Mest populær",
    desc: "Tradisjonell finsk røykbadstue omgitt av skog. Bjørketre interiør, vedovn og et kaldt dykk i naturlig vann like utenfor døren.",
  },
  {
    id: 2,
    name: "Fjordsuiten",
    capacity: "Opptil 4 personer",
    temp: "70–90°C",
    duration: "Fra 2 timer",
    price: "Fra 390 kr",
    tag: "Panoramautsikt",
    desc: "En privat tønnebadstue med glassfasade over fjorden. Storslått utsikt, infrarød varme og en privat terrasse kun for deg.",
  },
  {
    id: 3,
    name: "Steinlodgen",
    capacity: "Opptil 10 personer",
    temp: "85–110°C",
    duration: "Fra 3 timer",
    price: "Fra 790 kr",
    tag: "Gruppe og arrangement",
    desc: "En raus steinbadstue bygget for selskaper. Støpejernsovn, kaldtvannskar, garderobe og privat lounge er inkludert.",
  },
];

const FEATURES = [
  { icon: "🔥", label: "Vedfyrt varme", sub: "Ekte ovn, ekte damp" },
  { icon: "❄️", label: "Kaldt dykk", sub: "Isbad eller sjødykk" },
  { icon: "🌲", label: "Privat natur", sub: "Ingen folkemengder, bare stillhet" },
  { icon: "🛁", label: "Alt inkludert", sub: "Håndklær, kåper og kaldt vann" },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSauna, setSelectedSauna] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDialogOpen(false);
    };
    if (dialogOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [dialogOpen]);

  const openBooking = (saunaName?: string) => {
    setSelectedSauna(saunaName ?? null);
    setDialogOpen(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --charcoal: #141210;
          --ash: #1e1b18;
          --ember: #c0763a;
          --amber: #e8a95c;
          --cream: #f2ece3;
          --mist: #a89e93;
          --birch: #d4c4b0;
          --white: #faf7f2;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--charcoal);
          color: var(--cream);
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          overflow-x: hidden;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          overflow: hidden;
          padding: 0 3rem 5rem;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 20% 60%, rgba(192,118,58,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(100,70,40,0.12) 0%, transparent 50%),
            linear-gradient(160deg, #0d0b09 0%, #1a1410 40%, #221a12 100%);
          z-index: 0;
        }
        .hero-grain {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px; z-index: 1;
        }
        .steam-line {
          position: absolute; width: 1px;
          background: linear-gradient(to top, transparent, rgba(232,169,92,0.15), transparent);
          animation: rise 4s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes rise {
          0% { transform: translateY(30px) scaleY(0.8); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(-80px) scaleY(1.2); opacity: 0; }
        }

        /* Hero inner layout: text left, image right */
        .hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3rem;
          width: 100%;
          animation: fadeUp 1s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-content {
          max-width: 560px;
          flex-shrink: 0;
        }

        /* Sauna image in hero */
        .hero-image-wrap {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          position: relative;
          min-width: 0;
        }
        .hero-image-frame {
          position: relative;
          width: clamp(300px, 38vw, 560px);
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border: 1px solid rgba(192,118,58,0.2);
          flex-shrink: 0;
        }
        .hero-image-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(14,10,6,0.55) 0%,
            rgba(14,10,6,0.1) 40%,
            transparent 70%
          );
          z-index: 1;
          pointer-events: none;
        }
        .hero-image-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 60px rgba(192,118,58,0.08);
          z-index: 2;
          pointer-events: none;
        }
        .hero-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
          transition: transform 6s ease;
        }
        .hero-image-frame:hover img {
          transform: scale(1.03);
        }
        .hero-image-badge {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          z-index: 3;
          background: rgba(14,10,6,0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(192,118,58,0.25);
          padding: 0.6rem 1rem;
        }
        .hero-image-badge-label {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ember);
          display: block;
          margin-bottom: 0.15rem;
        }
        .hero-image-badge-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          color: var(--cream);
        }

        .hero-tag {
          display: inline-block;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ember);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(192,118,58,0.35);
        }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 5.5vw, 5.2rem);
          font-weight: 300;
          line-height: 1.05;
          color: var(--white);
          margin-bottom: 1.5rem;
        }
        .hero-h1 em { font-style: italic; color: var(--amber); }
        .hero-sub {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--mist);
          max-width: 400px;
          margin-bottom: 2.5rem;
        }
        .hero-actions { display: flex; gap: 1.2rem; align-items: center; }
        .btn-primary {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 1rem 2.4rem;
          background: var(--ember);
          color: var(--white);
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
        }
        .btn-primary:hover { background: var(--amber); transform: translateY(-2px); }
        .btn-ghost {
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--birch);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
        }
        .btn-ghost:hover { color: var(--amber); }
        .btn-ghost-arrow { transition: transform 0.2s; }
        .btn-ghost:hover .btn-ghost-arrow { transform: translateX(4px); }

        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          right: 3rem;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--mist);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, var(--ember), transparent);
          animation: scrollDrop 2s ease infinite;
        }
        @keyframes scrollDrop {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
        }

        /* FEATURES */
        .features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(192,118,58,0.1);
          border-bottom: 1px solid rgba(192,118,58,0.1);
        }
        .feature-item {
          padding: 2.5rem 2rem;
          border-right: 1px solid rgba(192,118,58,0.1);
          transition: background 0.3s;
        }
        .feature-item:last-child { border-right: none; }
        .feature-item:hover { background: rgba(192,118,58,0.05); }
        .feature-icon { font-size: 1.6rem; margin-bottom: 0.8rem; }
        .feature-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: var(--cream);
          margin-bottom: 0.25rem;
        }
        .feature-sub { font-size: 0.78rem; color: var(--mist); letter-spacing: 0.05em; }

        /* SAUNAS SECTION */
        .section { padding: 6rem 3rem; }
        .section-header { margin-bottom: 3.5rem; }
        .section-tag {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ember);
          margin-bottom: 1rem;
          display: block;
        }
        .section-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 300;
          color: var(--white);
          line-height: 1.15;
        }
        .section-h2 em { font-style: italic; color: var(--amber); }

        .sauna-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
          background: rgba(192,118,58,0.08);
        }
        .sauna-card {
          background: var(--ash);
          padding: 2.5rem;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
          overflow: hidden;
        }
        .sauna-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, var(--ember), var(--amber));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .sauna-card:hover { background: #252018; }
        .sauna-card:hover::before { transform: scaleX(1); }
        .sauna-card-tag {
          display: inline-block;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ember);
          border: 1px solid rgba(192,118,58,0.3);
          padding: 0.25rem 0.7rem;
          margin-bottom: 1.5rem;
        }
        .sauna-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 300;
          color: var(--white);
          margin-bottom: 0.75rem;
        }
        .sauna-card-desc {
          font-size: 0.85rem;
          color: var(--mist);
          line-height: 1.75;
          margin-bottom: 2rem;
        }
        .sauna-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.8rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .sauna-meta-row { display: flex; justify-content: space-between; font-size: 0.78rem; }
        .sauna-meta-key { color: var(--mist); letter-spacing: 0.08em; }
        .sauna-meta-val { color: var(--birch); }
        .sauna-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: var(--amber);
          margin-bottom: 1.2rem;
        }
        .sauna-cta {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ember);
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0;
          transition: color 0.2s, gap 0.2s;
        }
        .sauna-card:hover .sauna-cta { color: var(--amber); gap: 0.8rem; }

        /* CTA BANNER */
        .cta-banner {
          margin: 0 3rem 6rem;
          padding: 4rem;
          background: linear-gradient(120deg, rgba(192,118,58,0.15) 0%, rgba(100,60,20,0.08) 100%);
          border: 1px solid rgba(192,118,58,0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }
        .cta-text-h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 300;
          color: var(--white);
          margin-bottom: 0.5rem;
        }
        .cta-text-h3 em { font-style: italic; color: var(--amber); }
        .cta-text-p { color: var(--mist); font-size: 0.9rem; line-height: 1.7; }
        .cta-actions { display: flex; gap: 1rem; flex-shrink: 0; }

        /* FOOTER */
        footer {
          border-top: 1px solid rgba(192,118,58,0.1);
          padding: 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: var(--amber);
          font-weight: 300;
          letter-spacing: 0.06em;
        }
        .footer-links { display: flex; gap: 2rem; list-style: none; }
        .footer-links a {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--mist);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--amber); }
        .footer-copy { font-size: 0.72rem; color: var(--mist); opacity: 0.6; }

        /* DIALOG */
        .dialog-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(10,8,6,0.75);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          animation: overlayIn 0.25s ease forwards;
        }
        @keyframes overlayIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .dialog {
          background: var(--ash);
          border: 1px solid rgba(192,118,58,0.2);
          max-width: 480px; width: 100%;
          position: relative;
          animation: dialogIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes dialogIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dialog-header {
          padding: 2rem 2rem 1.25rem;
          border-bottom: 1px solid rgba(192,118,58,0.12);
          position: relative;
        }
        .dialog-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--ember); margin-bottom: 0.4rem; display: block;
        }
        .dialog-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 300; color: var(--white);
        }
        .dialog-close {
          position: absolute; top: 1.25rem; right: 1.25rem;
          background: none; border: none; color: var(--mist);
          font-size: 1.2rem; cursor: pointer; line-height: 1;
          padding: 0.25rem; transition: color 0.2s;
        }
        .dialog-close:hover { color: var(--amber); }
        .dialog-body { padding: 1.75rem 2rem; }
        .dialog-intro {
          font-size: 0.88rem; color: var(--mist);
          line-height: 1.75; margin-bottom: 1.75rem;
        }
        .dialog-contact-list { display: flex; flex-direction: column; gap: 1rem; }
        .dialog-contact-item {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1rem 1.1rem;
          border: 1px solid rgba(192,118,58,0.1);
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .dialog-contact-item:hover {
          border-color: rgba(192,118,58,0.35);
          background: rgba(192,118,58,0.05);
        }
        .dialog-contact-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 0.1rem; }
        .dialog-contact-label {
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--mist); margin-bottom: 0.2rem;
        }
        .dialog-contact-value { font-size: 0.92rem; color: var(--cream); }
        .dialog-footer {
          padding: 1.25rem 2rem 1.75rem;
          border-top: 1px solid rgba(192,118,58,0.08);
          font-size: 0.78rem; color: var(--mist); line-height: 1.65;
        }
        .dialog-footer strong { color: var(--birch); font-weight: 400; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .hero-image-frame { width: clamp(240px, 32vw, 420px); }
        }
        @media (max-width: 900px) {
          nav { padding: 1.2rem 1.5rem; }
          nav.scrolled { padding: 0.8rem 1.5rem; }
          .nav-links { display: none; }
          .hero { padding: 6rem 1.5rem 3rem; min-height: auto; }
          .hero-inner { flex-direction: column; align-items: flex-start; gap: 2rem; }
          .hero-image-wrap { width: 100%; justify-content: center; }
          .hero-image-frame { width: 100%; max-width: 420px; aspect-ratio: 4 / 3; }
          .hero-scroll { display: none; }
          .features { grid-template-columns: repeat(2, 1fr); }
          .feature-item:nth-child(2) { border-right: none; }
          .section { padding: 4rem 1.5rem; }
          .sauna-grid { grid-template-columns: 1fr; }
          .cta-banner { margin: 0 1.5rem 4rem; padding: 2.5rem; flex-direction: column; }
          .cta-actions { width: 100%; }
          footer { flex-direction: column; gap: 1.5rem; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; }
          .dialog { max-width: 100%; }
        }
      `}</style>

      <Navbar onBookClick={() => openBooking()} />
      
      {/* HERO */}
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
              Private badstueopplevelser midt i naturen. Vedfyrt, nøye utformet og dypt gjenopprettende — for deg som vet at ekte hvile er fortjent.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => openBooking()}>Reserver en økt</button>
              <a href="#badstuer" className="btn-ghost">
                Se våre badstuer <span className="btn-ghost-arrow">→</span>
              </a>
            </div>
          </div>

          {/* RIGHT: sauna image */}
          <div className="hero-image-wrap">
            <div className="hero-image-frame">
              <img
                src="/sauna-hero.png"
                alt="Mobil tønnebadstue ved vannet"
              />
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

      {/* FEATURES */}
      <div className="features">
        {FEATURES.map((f) => (
          <div className="feature-item" key={f.label}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-label">{f.label}</div>
            <div className="feature-sub">{f.sub}</div>
          </div>
        ))}
      </div>

      {/* SAUNAS */}
      <section className="section" id="badstuer">
        <div className="section-header">
          <span className="section-tag">Våre rom</span>
          <h2 className="section-h2">Tre måter å finne<br />din <em>indre ro</em></h2>
        </div>
        <div className="sauna-grid" id="priser">
          {SAUNAS.map((s) => (
            <div
              className="sauna-card"
              key={s.id}
              onMouseEnter={() => setActiveCard(s.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <span className="sauna-card-tag">{s.tag}</span>
              <h3 className="sauna-card-name">{s.name}</h3>
              <p className="sauna-card-desc">{s.desc}</p>
              <div className="sauna-meta">
                <div className="sauna-meta-row">
                  <span className="sauna-meta-key">Kapasitet</span>
                  <span className="sauna-meta-val">{s.capacity}</span>
                </div>
                <div className="sauna-meta-row">
                  <span className="sauna-meta-key">Temperatur</span>
                  <span className="sauna-meta-val">{s.temp}</span>
                </div>
                <div className="sauna-meta-row">
                  <span className="sauna-meta-key">Varighet</span>
                  <span className="sauna-meta-val">{s.duration}</span>
                </div>
              </div>
              <div className="sauna-price">{s.price}</div>
              <button className="sauna-cta" onClick={() => openBooking(s.name)}>
                Book denne badstuen →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <div>
          <h3 className="cta-text-h3">Klar til å <em>puste ut</em>?</h3>
          <p className="cta-text-p">
            Tilgjengelig alle dager. Book på noen minutter — ingen medlemskap nødvendig.<br />
            Gavekort er også tilgjengelig — perfekt for noen som fortjener en god svette.
          </p>
        </div>
        <div className="cta-actions">
          <button className="btn-primary" onClick={() => openBooking()}>Book en økt</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer id="sted">
        <div className="footer-logo">Sauna på farten</div>
        <ul className="footer-links">
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Kontakt</a></li>
          <li><a href="#">Personvern</a></li>
          <li><a href="#">Gavekort</a></li>
        </ul>
        <span className="footer-copy">© 2026 Sauna på farten. Alle rettigheter forbeholdt. Kontakt oss</span>
      </footer>

      {/* BOOKING DIALOG */}
      {dialogOpen && (
        <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div
            className="dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Book en økt"
          >
            <div className="dialog-header">
              <span className="dialog-eyebrow">
                {selectedSauna ? `Booking · ${selectedSauna}` : "Book en økt"}
              </span>
              <h2 className="dialog-title">Ta kontakt</h2>
              <button className="dialog-close" onClick={() => setDialogOpen(false)} aria-label="Lukk">✕</button>
            </div>

            <div className="dialog-body">
              <p className="dialog-intro">
                Kontakt oss via telefon, e-post eller Instagram — vi bekrefter bookingen din, svarer på spørsmål og sørger for at ovnen er klar til deg.
              </p>
              <div className="dialog-contact-list">
                <a className="dialog-contact-item" href="tel:+4799999999">
                  <span className="dialog-contact-icon">📞</span>
                  <div>
                    <div className="dialog-contact-label">Telefon og WhatsApp</div>
                    <div className="dialog-contact-value">+47 999 99 999</div>
                  </div>
                </a>
                <a className="dialog-contact-item" href="mailto:book@saunapaafarten.no">
                  <span className="dialog-contact-icon">✉️</span>
                  <div>
                    <div className="dialog-contact-label">E-post</div>
                    <div className="dialog-contact-value">book@saunapaafarten.no</div>
                  </div>
                </a>
                <a className="dialog-contact-item" href="https://instagram.com/saunapaafarten" target="_blank" rel="noopener noreferrer">
                  <span className="dialog-contact-icon">📸</span>
                  <div>
                    <div className="dialog-contact-label">Instagram</div>
                    <div className="dialog-contact-value">@saunapaafarten</div>
                  </div>
                </a>
                <a className="dialog-contact-item" href="https://maps.google.com/?q=Bergen,Norge" target="_blank" rel="noopener noreferrer">
                  <span className="dialog-contact-icon">📍</span>
                  <div>
                    <div className="dialog-contact-label">Sted</div>
                    <div className="dialog-contact-value">Nordnesparken, Bergen, Norge</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="dialog-footer">
              <strong>Åpningstider:</strong> Man–søn, 09:00–22:00 &nbsp;·&nbsp; Vi svarer vanligvis innen noen timer.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
