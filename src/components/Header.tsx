// components/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context";
import { getHeaderData, urlFor } from "../sanity.io";
import type { HeaderData, NavigationItem } from "../sanity.io";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const location = useLocation();
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await getHeaderData();
        setHeaderData(data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
    console.log(headerData);
  }, []);

  const getIconUrl = (icon: any): string => {
    if (!icon?.asset?._id) return "";
    return urlFor(icon).url();
  };

  const handleNavClick = (): void => {
    setMenuOpen(false);
  };

  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  const renderNavigationItem = (
    item: NavigationItem,
    index: number
  ): any | null => {
    const linkContent = (
      <>
        {item.icon && (
          <img
            src={getIconUrl(item.icon)}
            alt={item.icon.alt || `${item.label} icon`}
            className="nav-icon"
          />
        )}
        <span>{item.label}</span>
      </>
    );

    switch (item.type) {
      case "page":
        const href = item.isExternal ? item.externalUrl : item.pageRoute;

        if (item.isExternal) {
          return (
            <li key={index}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="nav-link-with-icon"
              >
                {linkContent}
              </a>
            </li>
          );
        }

        return (
          <li key={index}>
            <Link
              to={href || "/"}
              onClick={handleNavClick}
              className={`nav-link-with-icon ${
                isActivePath(item.pageRoute || "/") ? "active" : ""
              }`}
            >
              {linkContent}
            </Link>
          </li>
        );

      case "section":
        return (
          <li key={index}>
            <a
              href={`#${item.sectionId}`}
              onClick={handleNavClick}
              className={`nav-link-with-icon ${
                location.pathname === "/" ? "" : "disabled-link"
              }`}
            >
              {linkContent}
            </a>
          </li>
        );

      case "homeSection":
        if (location.pathname === "/") {
          return (
            <li key={index}>
              <a
                href={`#${item.sectionId}`}
                onClick={handleNavClick}
                className="nav-link-with-icon"
              >
                {linkContent}
              </a>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <Link
                to={`../#${item.sectionId}`}
                onClick={handleNavClick}
                className={`nav-link-with-icon ${
                  isActivePath("/") ? "active" : ""
                }`}
              >
                {linkContent}
              </Link>
            </li>
          );
        }

      default:
        return null;
    }
  };

  if (!headerData) {
    return <header>Loading...</header>;
  }

  const { name, logo, navigationItems, themeToggle, icons } = headerData;

  // Sort navigation items by order
  const sortedNavItems =
    navigationItems
      ?.filter((item) => item.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0)) || [];

  // Get appropriate menu icons based on theme and state
  const getMenuIcon = () => {
    if (menuOpen) {
      // Close icon - choose based on theme
      return isDark
        ? icons?.mobileMenuCloseIconDark || icons?.mobileMenuCloseIcon
        : icons?.mobileMenuCloseIcon || icons?.mobileMenuCloseIconDark;
    } else {
      // Menu icon - choose based on theme
      return isDark
        ? icons?.mobileMenuIconDark || icons?.mobileMenuIcon
        : icons?.mobileMenuIcon || icons?.mobileMenuIconDark;
    }
  };

  const getMenuIconAlt = (): string => {
    if (menuOpen) {
      return isDark
        ? icons?.mobileMenuCloseIconDark?.alt ||
            icons?.mobileMenuCloseIcon?.alt ||
            "Close menu"
        : icons?.mobileMenuCloseIcon?.alt ||
            icons?.mobileMenuCloseIconDark?.alt ||
            "Close menu";
    } else {
      return isDark
        ? icons?.mobileMenuIconDark?.alt ||
            icons?.mobileMenuIcon?.alt ||
            "Open menu"
        : icons?.mobileMenuIcon?.alt ||
            icons?.mobileMenuIconDark?.alt ||
            "Open menu";
    }
  };

  // Get appropriate theme icon based on current theme
  const themeIcon = isDark
    ? icons?.themeIcons?.lightThemeIcon
    : icons?.themeIcons?.darkThemeIcon;
  const themeIconAlt = isDark
    ? icons?.themeIcons?.lightThemeIcon?.alt || "Switch to light mode"
    : icons?.themeIcons?.darkThemeIcon?.alt || "Switch to dark mode";

  return (
    <header>
      <h4 className="cursive">
        <Link to="/" onClick={handleNavClick} className="logo-link">
          {logo ? (
            <img
              src={getIconUrl(logo)}
              alt={logo.alt || name}
              className="logo-image"
            />
          ) : (
            name
          )}
        </Link>
      </h4>
      <nav>
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={getIconUrl(getMenuIcon())} alt={getMenuIconAlt()} />
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {sortedNavItems.map((item, index) =>
            renderNavigationItem(item, index)
          )}
        </ul>

        {themeToggle && (
          <button
            className="theme-switcher"
            onClick={() => setIsDark(!isDark)}
            aria-label={themeIconAlt}
          >
            <img src={getIconUrl(themeIcon)} alt={themeIconAlt} />
          </button>
        )}
      </nav>
    </header>
  );
}
