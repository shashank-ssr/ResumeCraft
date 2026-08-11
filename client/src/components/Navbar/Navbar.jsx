import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Resume<span>Craft</span>
        </Link>

        <nav className="navbar__links">
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
        </nav>

        <Link to="/builder" className="navbar__button">
          Create Resume
        </Link>
      </div>
    </header>
  );
}