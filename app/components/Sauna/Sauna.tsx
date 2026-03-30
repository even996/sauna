"use client";

import { useState } from "react";
import "./Sauna.css";

interface Sauna {
  id: number;
  name: string;
  capacity: string;
  temp: string;
  duration: string;
  price: string;
  tag: string;
  desc: string;
}

const SAUNAS: Sauna[] = [
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

interface SaunaProps {
  onBookClick: (saunaName: string) => void;
}

export default function Sauna({ onBookClick }: SaunaProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="section" id="badstuer">
      <div className="section-header">
        <span className="section-tag">Våre rom</span>
        <h2 className="section-h2">
          Tre måter å finne<br />din <em>indre ro</em>
        </h2>
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
            <button className="sauna-cta" onClick={() => onBookClick(s.name)}>
              Book denne badstuen →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
