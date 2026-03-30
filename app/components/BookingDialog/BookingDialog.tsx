"use client";

import { useEffect } from "react";
import "./BookingDialog.css";

interface BookingDialogProps {
  isOpen: boolean;
  selectedSauna: string | null;
  onClose: () => void;
}

export default function BookingDialog({ isOpen, selectedSauna, onClose }: BookingDialogProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
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
          <button className="dialog-close" onClick={onClose} aria-label="Lukk">✕</button>
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
            <a
              className="dialog-contact-item"
              href="https://instagram.com/saunapaafarten"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="dialog-contact-icon">📸</span>
              <div>
                <div className="dialog-contact-label">Instagram</div>
                <div className="dialog-contact-value">@saunapaafarten</div>
              </div>
            </a>
            <a
              className="dialog-contact-item"
              href="https://maps.google.com/?q=Bergen,Norge"
              target="_blank"
              rel="noopener noreferrer"
            >
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
  );
}
