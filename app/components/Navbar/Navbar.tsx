"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Badstuer", href: "#badstuer" },
  { label: "Priser", href: "#priser" },
  { label: "Steder", href: "#steder" },
  { label: "Om oss", href: "#om-oss" },
];

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo">
        Sauna på farten
        <span>Bergen, Norge</span>
      </a>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <button className="nav-book-btn" onClick={onBookClick}>
        Book nå
      </button>
    </nav>
  );
}
