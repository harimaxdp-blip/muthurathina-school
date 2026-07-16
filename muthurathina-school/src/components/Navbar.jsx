import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png"; // place your logo file at src/assets/logo.png
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  {
    label: "Academics",
    href: "#academics",
    children: [
      { label: "Curriculum", href: "#curriculum" },
      { label: "Primary School", href: "#primary" },
      { label: "Secondary School", href: "#secondary" },
      { label: "Higher Secondary", href: "#higher-secondary" },
    ],
  },
  {
    label: "Admissions",
    href: "#admissions",
    children: [
      { label: "Admission Process", href: "#process" },
      { label: "Fee Structure", href: "#fees" },
      { label: "Download Prospectus", href: "#prospectus" },
    ],
  },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "News & Events", href: "#news" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      {/* Top utility bar */}
      <div className="topbar">
        <div className="topbar__inner">
          <ul className="topbar__info">
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.5 7 11.5 7.3 11.8.2.1.4.2.7.2s.5-.1.7-.2C13 21.5 20 15.5 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/></svg>
              <span>Sithaneri, Puducherry - 605 110</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm16 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <span>info@muthurathinaarangamhrsec.com</span>
            </li>
            <li className="topbar__hide-sm">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.6l4.2 2.5-.8 1.3-5-3V6h1.6v6.6z"/></svg>
              <span>Mon&nbsp;-&nbsp;Sat: 8.30 AM - 4.30 PM</span>
            </li>
          </ul>

          <div className="topbar__right">
            <a className="topbar__phone" href="tel:+919788812345">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z"/></svg>
              <span>+91 97888 12345</span>
            </a>
            <div className="topbar__social">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.5 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.5-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.3-.7-.5-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.5 2.5-.5C9.9 2 10.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.5 6.2a2.8 2.8 0 00-2-2C18.7 3.7 12 3.7 12 3.7s-6.7 0-8.5.5a2.8 2.8 0 00-2 2A29 29 0 001 12a29 29 0 00.5 5.8 2.8 2.8 0 002 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 002-2A29 29 0 0023 12a29 29 0 00-.5-5.8zM9.8 15.5V8.5L15.8 12l-6 3.5z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mainbar" ref={navRef}>
        <div className="mainbar__inner">
          <a className="brand" href="#home">
            <img src={logo} alt="Muthu Rathina Arangam Hr. Sec. School logo" className="brand__logo" />
            <span className="brand__text">
              <span className="brand__name">
                MUTHU RATHINA
              </span>
              <span className="brand__sub">ARANGAM HR. SEC. SCHOOL</span>
              <span className="brand__tag">Acquire Thoroughly, Act Accordingly</span>
            </span>
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            <ul>
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className={link.children ? "has-dropdown" : ""}
                  onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                  onMouseLeave={() => link.children && setOpenDropdown(null)}
                >
                  <a href={link.href} className={link.label === "Home" ? "is-active" : ""}>
                    {link.label}
                    {link.children && (
                      <svg className="caret" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    )}
                  </a>
                  {link.children && (
                    <ul className={`dropdown ${openDropdown === link.label ? "is-open" : ""}`}>
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href}>{child.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mainbar__actions">
            <a href="#enquiry" className="btn-enquiry">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
              Enquiry Now
            </a>
            <button
              className={`hamburger ${isMobileOpen ? "is-open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`nav-mobile ${isMobileOpen ? "is-open" : ""}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <div className="nav-mobile__row">
                <a href={link.href}>{link.label}</a>
                {link.children && (
                  <button
                    className={`nav-mobile__caret ${openDropdown === link.label ? "is-open" : ""}`}
                    onClick={() => toggleDropdown(link.label)}
                    aria-label={`Toggle ${link.label} submenu`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg>
                  </button>
                )}
              </div>
              {link.children && (
                <ul className={`nav-mobile__sub ${openDropdown === link.label ? "is-open" : ""}`}>
                  {link.children.map((child) => (
                    <li key={child.label}>
                      <a href={child.href}>{child.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <a href="#enquiry" className="btn-enquiry btn-enquiry--mobile">
              Enquiry Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
