import "./Footer.css";

export default function Footer() {
  return (
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
  );
}
