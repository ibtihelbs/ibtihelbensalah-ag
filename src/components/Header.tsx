// components/Header.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, setIsDark } = useTheme();

  const getIconSrc = (icon: string) => {
    return isDark
      ? `./images/icons/${icon}.svg`
      : `./images/icons/${icon}-dark.svg`;
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header>
      <h4 className="cursive">
        <Link to="/" onClick={handleNavClick}>
          ibtihel ben salah
        </Link>
      </h4>
      <nav>
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={getIconSrc("menu-2")} alt="menu" />
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {/* Page Routes */}
          <li>
            <Link
              to="/"
              onClick={handleNavClick}
              className={isActivePath("/") ? "active" : ""}
            >
              home
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              onClick={handleNavClick}
              className={isActivePath("/blog") ? "active" : ""}
            >
              blog
            </Link>
          </li>

          {/* Section Links (only work on home page) */}
          <li>
            <a
              href="#about-section"
              onClick={handleNavClick}
              className={location.pathname === "/" ? "" : "disabled-link"}
            >
              about
            </a>
          </li>
          <li>
            <a
              href="#services-section"
              onClick={handleNavClick}
              className={location.pathname === "/" ? "" : "disabled-link"}
            >
              services
            </a>
          </li>
          <li>
            <a
              href="#work-section"
              onClick={handleNavClick}
              className={location.pathname === "/" ? "" : "disabled-link"}
            >
              projects
            </a>
          </li>
          <li>
            <a
              href="#pricing-section"
              onClick={handleNavClick}
              className={location.pathname === "/" ? "" : "disabled-link"}
            >
              pricing
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={handleNavClick}
              className={location.pathname === "/" ? "" : "disabled-link"}
            >
              contact
            </a>
          </li>
        </ul>

        <button className="theme-switcher" onClick={() => setIsDark(!isDark)}>
          <img src={getIconSrc("sun")} alt="theme-switcher" />
        </button>
      </nav>
    </header>
  );
}
