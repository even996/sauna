import "./CtaBanner.css";

interface CtaBannerProps {
  onBookClick: () => void;
}

export default function CtaBanner({ onBookClick }: CtaBannerProps) {
  return (
    <div className="cta-banner">
      <div>
        <h3 className="cta-text-h3">Klar til å <em>puste ut</em>?</h3>
        <p className="cta-text-p">
          Tilgjengelig alle dager. Book på noen minutter — ingen medlemskap nødvendig.<br />
          Gavekort er også tilgjengelig — perfekt for noen som fortjener en god svette.
        </p>
      </div>
      <div className="cta-actions">
        <button className="btn-primary" onClick={onBookClick}>Book en økt</button>
      </div>
    </div>
  );
}
