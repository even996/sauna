"use client";

import "./Sauna.css";
import { SAUNAS } from "../../data/saunas";
import type { Sauna } from "../../data/saunas";

interface SaunaProps {
  onBookClick: (saunaName: string) => void;
}

export default function Sauna({ onBookClick }: SaunaProps) {
  return (
    <section className="section" id="badstuer">
      <div className="section-header">
        <span className="section-tag">Våre badstuer</span>
        <h2 className="section-h2">
          Tre måter å finne<br />din <em>indre ro</em>
        </h2>
      </div>
      <div className="sauna-grid" id="priser">
        {SAUNAS.map((s: Sauna) => (
          <div
            className="sauna-card"
            key={s.id}
            onClick={() => onBookClick(s.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onBookClick(s.name)}
            aria-label={`Book ${s.name}`}
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
            <span className="sauna-cta">Book denne badstuen →</span>
          </div>
        ))}
      </div>
    </section>
  );
}