import { useState, type Dispatch, type SetStateAction } from "react";

export default function Header({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getIconSrc = (icon: string) => {
    return isDark
      ? `./images/icons/${icon}.svg`
      : `./images/icons/${icon}-dark.svg`;
  };
  return (
    <header>
      <h4 className="cursive">ibtihel ben salah</h4>
      <nav>
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={getIconSrc("menu-2")} alt="menu" />
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#about-section">about</a>
          </li>
          <li>
            <a href="#services-section">service</a>
          </li>
          <li>
            <a href="#work-section">projects</a>
          </li>
          <li>
            <a href="#pricing-section">pricing</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </ul>
        <button
          className="theme-switcher"
          onClick={() => {
            setIsDark((prev) => !prev);
          }}
        >
          <img src={getIconSrc("sun")} alt="theme-switcher" />
        </button>
      </nav>
    </header>
  );
}
