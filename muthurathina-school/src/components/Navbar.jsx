import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";

const NAV_LINKS = [
  {
    label: "HOME",
    href: "#home",
    hasDropdown: false,
    icon: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>,
  },
  {
    label: "ABOUT US",
    href: "#about",
    hasDropdown: true,
    submenu: ["Our Story", "Vision & Mission", "Management Committee"],
    icon: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.02 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>,
  },
  {
    label: "ACADEMICS",
    href: "#academics",
    hasDropdown: true,
    submenu: ["Curriculum", "Our Faculty", "Examination Results"],
    icon: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" /></svg>,
  },
  {
    label: "FACILITIES",
    href: "#facilities",
    hasDropdown: false,
    icon: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" /></svg>,
  },
  {
    label: "GALLERY",
    href: "#gallery",
    hasDropdown: false,
    icon: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>,
  },
  {
    label: "ADMISSIONS",
    href: "#admissions",
    hasDropdown: true,
    submenu: ["How to Apply", "Fee Structure", "Required Documents"],
    icon: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>,
  },
  {
    label: "CONTACT",
    href: "#contact",
    hasDropdown: false,
    icon: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("HOME");
  const [progress, setProgress] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const [hover, setHover] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const linksRef = useRef(null);
  const itemRefs = useRef({});

  /* ---------- scroll progress + sticky shadow ---------- */
  useEffect(() => {
    const onScroll = () => {
      // Hysteresis: enter "scrolled" state past 80px, only leave it below 30px.
      // A single shared threshold (e.g. > 40) causes a feedback loop: crossing it
      // collapses the top bar, which shrinks the navbar and shifts the page content
      // up, which the browser's scroll anchoring "corrects" by nudging scrollY back
      // below the threshold, which re-expands the top bar, which pushes scrollY back
      // over it again — flickering every frame. Separating the on/off thresholds
      // breaks that loop.
      setScrolled((prev) => {
        if (window.scrollY > 80) return true;
        if (window.scrollY < 30) return false;
        return prev;
      });
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- lock body scroll when mobile drawer is open ---------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) setMobileAccordion(null);
  }, [menuOpen]);

  /* ---------- scrollspy: auto-highlight the section in view ---------- */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = NAV_LINKS.find((l) => `#${entry.target.id}` === l.href);
            if (match) setActive(match.label);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ---------- measure the active tab so the pill can glide to it ---------- */
  const measureIndicator = useCallback(() => {
    const container = linksRef.current;
    const activeEl = itemRefs.current[active];
    if (!container || !activeEl) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      ready: true,
    });
  }, [active]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  const handleClick = (label) => {
    setActive(label);
    setMenuOpen(false);
  };

  const handleItemHover = (label, e) => {
    const container = linksRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = e.currentTarget.getBoundingClientRect();
    setHover({ left: elRect.left - containerRect.left, width: elRect.width });
  };

  const toggleMobileAccordion = (label) => {
    setMobileAccordion((cur) => (cur === label ? null : label));
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      {/* TOP UTILITY INFORMATION STRIP */}
      <div className="navbar__top-bar">
        <div className="navbar__top-inner">
          <div className="navbar__top-info">
            <span className="info-item">
              <svg viewBox="0 0 24 24" className="top-icon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
              Vazhudavur Road, Kavundampalayam, Puducherry - 605009
            </span>
            <span className="info-item">
              <svg viewBox="0 0 24 24" className="top-icon"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              0413 227 3434
            </span>
            <span className="info-item">
              <svg viewBox="0 0 24 24" className="top-icon"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              muthurathinahighschool@gmail.com
            </span>
          </div>
          <div className="navbar__top-socials">
            <a href="#facebook" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" /></svg></a>
            <a href="#instagram" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m4.4 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9m0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m4.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" /></svg></a>
            <a href="#youtube" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
          </div>
        </div>
      </div>

      {/* HEADER SECTION Container */}
      <div className="navbar__inner">
        <a href="#home" className="navbar__brand" onClick={() => handleClick("HOME")}>
          <span className="navbar__logo-wrap">
            <img src={logo} alt="School Logo" className="navbar__logo" />
          </span>
          <div className="navbar__brand-text">
            <h1 className="navbar__title">MUTHU RATHINA</h1>
            <h2 className="navbar__subtitle">ARANGAM HIGHER SECONDARY SCHOOL</h2>
            <p className="navbar__tagline">ACQUIRE THOROUGHLY, ACT ACCORDINGLY</p>
          </div>
        </a>

        {/* PRIMARY FLEX MAIN NAVIGATION */}
        <nav
          className="navbar__links"
          aria-label="Primary"
          ref={linksRef}
          onMouseLeave={() => setHover(null)}
        >
          <span
            className="navbar__hover-pill"
            style={{
              transform: `translateX(${hover ? hover.left : 0}px)`,
              width: hover ? hover.width : 0,
              opacity: hover ? 1 : 0,
            }}
            aria-hidden="true"
          />
          <span
            className="navbar__indicator"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="navbar__item"
              ref={(el) => (itemRefs.current[link.label] = el)}
              onMouseEnter={(e) => handleItemHover(link.label, e)}
            >
              <a
                href={link.href}
                className={`navbar__link ${active === link.label ? "navbar__link--active" : ""}`}
                onClick={() => handleClick(link.label)}
                aria-current={active === link.label ? "page" : undefined}
                aria-haspopup={link.hasDropdown ? "true" : undefined}
              >
                {link.icon}
                <span className="navbar__link-label">
                  {link.label}
                  {link.hasDropdown && <span className="dropdown-arrow">▼</span>}
                </span>
              </a>

              {link.hasDropdown && link.submenu && (
                <div className="navbar__dropdown" role="menu">
                  {link.submenu.map((item) => (
                    <a
                      key={item}
                      href={link.href}
                      role="menuitem"
                      className="navbar__dropdown-item"
                      onClick={() => handleClick(link.label)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <a href="#admissions" className="navbar__cta">
          <span className="navbar__cta-label">ENQUIRY</span>
          <span className="navbar__cta-arrow" aria-hidden="true">&rarr;</span>
        </a>

        {/* BURGER BOX RESPONSIVE INTERACTION */}
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

      <div className="navbar__progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className={`navbar__overlay ${menuOpen ? "navbar__overlay--open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* DRAWER RESPONSIVE DROPDOWN PANEL */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {NAV_LINKS.map((link, i) => (
          <div className="navbar__mobile-item" key={link.label} style={{ transitionDelay: `${i * 0.04}s` }}>
            <div className="navbar__mobile-link-row">
              <a
                href={link.href}
                className={`navbar__mobile-link ${active === link.label ? "navbar__mobile-link--active" : ""}`}
                onClick={() => handleClick(link.label)}
              >
                {link.icon}
                {link.label}
              </a>
              {link.hasDropdown && link.submenu && (
                <button
                  className={`navbar__mobile-chevron ${mobileAccordion === link.label ? "navbar__mobile-chevron--open" : ""}`}
                  aria-label={`Toggle ${link.label} submenu`}
                  aria-expanded={mobileAccordion === link.label}
                  onClick={() => toggleMobileAccordion(link.label)}
                >
                  ▼
                </button>
              )}
            </div>

            {link.hasDropdown && link.submenu && (
              <div className={`navbar__mobile-submenu ${mobileAccordion === link.label ? "navbar__mobile-submenu--open" : ""}`}>
                {link.submenu.map((item) => (
                  <a key={item} href={link.href} onClick={() => handleClick(link.label)}>
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}