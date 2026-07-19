import React, { useEffect, useState } from "react";
import SchoolLogo from "./SchoolLogo";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "News & Events", href: "#news" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleClick = (label) => {
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__brand" onClick={() => handleClick("Home")}>
          <SchoolLogo size={54} className="navbar__logo" />
          <div className="navbar__brand-text">
            <span className="navbar__title">Muthu Rathina</span>
            <span className="navbar__subtitle">Arangam Higher Secondary School</span>
            <span className="navbar__tagline">Acquire Thoroughly, Act Accordingly</span>
          </div>
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`navbar__link ${active === link.label ? "navbar__link--active" : ""}`}
              onClick={() => handleClick(link.label)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#admissions" className="navbar__cta">
          Enquire Now
          <span className="navbar__cta-arrow" aria-hidden="true">
            &#8594;
          </span>
        </a>

        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={`navbar__mobile-link ${active === link.label ? "navbar__mobile-link--active" : ""}`}
            style={{ transitionDelay: `${i * 40}ms` }}
            onClick={() => handleClick(link.label)}
          >
            {link.label}
          </a>
        ))}
        <a href="#admissions" className="navbar__cta navbar__cta--mobile" onClick={() => setMenuOpen(false)}>
          Enquire Now <span aria-hidden="true">&#8594;</span>
        </a>
      </div>
    </header>
  );
}