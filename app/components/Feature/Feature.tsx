import "./Feature.css";

const FEATURES = [
  { icon: "🔥", label: "Vedfyrt varme", sub: "Ekte ovn, ekte damp" },
  { icon: "❄️", label: "Kaldt dykk", sub: "Isbad eller sjødykk" },
  { icon: "🌲", label: "Privat natur", sub: "Ingen folkemengder, bare stillhet" },
  { icon: "🛁", label: "Alt inkludert", sub: "Håndklær, kåper og kaldt vann" },
];

export default function Feature() {
  return (
    <div className="features">
      {FEATURES.map((f) => (
        <div className="feature-item" key={f.label}>
          <div className="feature-icon">{f.icon}</div>
          <div className="feature-label">{f.label}</div>
          <div className="feature-sub">{f.sub}</div>
        </div>
      ))}
    </div>
  );
}
