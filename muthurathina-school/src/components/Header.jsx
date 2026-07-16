import { useState, useEffect, useRef, memo } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  Home,
  BookOpen,
  Compass,
  GraduationCap,
  Calendar,
  Image as ImageIcon,
  Trophy,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import logoImg from "../assets/logo.png";

const SocialIcon = memo(({ path }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
));
SocialIcon.displayName = "SocialIcon";

const ICONS = {
  facebook: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z",
  instagram: "M12 2c-2.7 0-3.1 0-4.1.06-1.1.05-1.8.22-2.5.47a5 5 0 0 0-1.8 1.17 5 5 0 0 0-1.17 1.8c-.25.7-.42 1.4-.47 2.5C2 8.9 2 9.3 2 12s0 3.1.06 4.1c.05 1.1.22 1.8.47 2.5.26.7.6 1.3 1.17 1.8.5.5 1.1.9 1.8 1.17.7.25 1.4.42 2.5.47C8.9 22 9.3 22 12 22s3.1 0 4.1-.06c1.1-.05 1.8-.22 2.5-.47a5 5 0 0 0 1.8-1.17 5 5 0 0 0 1.17-1.8c.25-.7.42-1.4.47-2.5.06-1 .06-1.4.06-4.1s0-3.1-.06-4.1c-.05-1.1-.22-1.8-.47-2.5a5 5 0 0 0-1.17-1.8 5 5 0 0 0-1.8-1.17c-.7-.25-1.4-.42-2.5-.47C15.1 2 14.7 2 12 2zm0 1.8c2.66 0 2.98 0 4.03.06.97.04 1.5.2 1.85.34.46.18.8.4 1.15.75.35.35.57.68.75 1.15.13.35.3.88.34 1.85.06 1.05.06 1.37.06 4.03s0 2.98-.06 4.03c-.04.97-.2 1.5-.34 1.85-.18.46-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.35.13-.88.3-1.85.34-1.05.06-1.37.06-4.03.06s-2.98 0-4.03-.06c-.97-.04-1.5-.2-1.85-.34a3.2 3.2 0 0 1-1.15-.75 3.2 3.2 0 0 1-.75-1.15c-.13-.35-.3-.88-.34-1.85C3.8 14.98 3.8 14.66 3.8 12s0-2.98.06-4.03c.04-.97.2-1.5.34-1.85.18-.46.4-.8.75-1.15.35-.35.68-.57 1.15-.75.35-.13.88-.3 1.85-.34C9.02 3.8 9.34 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z",
  youtube: "M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.6 15.5v-7l6.3 3.5-6.3 3.5z",
};

const NAV_LINKS = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About Us", href: "#about", icon: BookOpen },
  { label: "Academics", href: "#academics", icon: GraduationCap },
  { label: "Campus Life", href: "#campus-life", icon: Compass },
  { label: "Events", href: "#events", icon: Calendar },
  { label: "Gallery", href: "#gallery", icon: ImageIcon },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Contact Us", href: "#contact", icon: MessageSquare },
];

const drawerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const drawerItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

// Heraldic shield outline shared by every layer of the crest badge
const SHIELD_CLIP =
  "polygon(50% 0%, 92% 12%, 100% 42%, 92% 72%, 50% 100%, 8% 72%, 0% 42%, 8% 12%)";

function FallbackCrest() {
  return (
    <svg viewBox="0 0 100 100" className="w-[80%] h-[80%]" aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="#7a1220" stroke="#e3c988" strokeWidth="3" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#e3c988" strokeWidth="1.2" />
      <path d="M50 22 L58 40 L78 42 L63 55 L68 74 L50 63 L32 74 L37 55 L22 42 L42 40 Z" fill="#e3c988" />
      <text x="50" y="90" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#e3c988" letterSpacing="1">
        MRA · 1998
      </text>
    </svg>
  );
}

export default function Header() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const navGlowRef = useRef(null);
  const ctaRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 160, mass: 0.8 };
  const backgroundX = useSpring(mouseX, springConfig);
  const backgroundY = useSpring(mouseY, springConfig);

  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  const ctaSpringX = useSpring(ctaX, { stiffness: 200, damping: 20 });
  const ctaSpringY = useSpring(ctaY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements = [];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetLink = NAV_LINKS.find((link) => link.href === `#${entry.target.id}`);
          if (targetLink) setActive(targetLink.label);
        }
      });
    }, observerOptions);

    NAV_LINKS.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        sectionElements.push(element);
      }
    });

    return () => sectionElements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleLinkClick = (e, label, href) => {
    e.preventDefault();
    setActive(label);
    setMobileOpen(false);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = headerRef.current ? headerRef.current.offsetHeight : 120;
      const elementPos = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPos - offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleGlobalMouseMove = (e) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 35;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleGlobalMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    ctaX.set(0);
    ctaY.set(0);
  };

  const handleNavMouseMove = (e) => {
    if (!navGlowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    navGlowRef.current.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
  };

  const handleCtaMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const centerPointX = rect.left + rect.width / 2;
    const centerPointY = rect.top + rect.height / 2;
    ctaX.set((e.clientX - centerPointX) * 0.35);
    ctaY.set((e.clientY - centerPointY) * 0.35);
  };

  return (
    <header
      ref={headerRef}
      onMouseMove={handleGlobalMouseMove}
      onMouseLeave={handleGlobalMouseLeave}
      className={`sticky top-0 z-50 w-full max-w-full overflow-x-clip text-white transition-all duration-500 will-change-transform ${
        scrolled ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl bg-black/10" : "shadow-xl"
      }`}
    >
      {/* Background Gradient Shroud */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#420a12] via-[#2c060d] to-[#160306] -z-30 transition-opacity duration-500 ease-out ${
          scrolled ? "opacity-95" : "opacity-100"
        }`}
      />

      {/* Repeating Mesh Grid Overlay Matching the Banner Image */}
      <div
        className="absolute inset-0 opacity-[0.12] -z-28 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0),
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px, 16px 16px, 16px 16px",
        }}
      />

      {/* Film grain noise texture */}
      <div
        className="absolute inset-0 -z-25 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layered Interactive Glow Field */}
      <motion.div
        className="absolute -inset-16 opacity-[0.22] blur-[90px] pointer-events-none -z-20 mix-blend-color-dodge transform-gpu overflow-hidden"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute top-1/6 left-1/4 w-[450px] h-[180px] rounded-full bg-gradient-to-r from-amber-500 to-rose-600 opacity-40 animate-pulse duration-[6s]" />
        <div className="absolute bottom-1/6 right-1/4 w-[400px] h-[200px] rounded-full bg-gradient-to-r from-red-600 to-amber-400 opacity-30 animate-pulse duration-[8s]" />
      </motion.div>

      {/* Micro-border Filament */}
      <div className="relative h-[1px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-80" />
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-300/90 to-transparent blur-[1px]"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Primary Header Row */}
      <div
        className={`max-w-[1440px] mx-auto flex items-center justify-between gap-8 px-6 transition-all duration-500 ${
          scrolled ? "py-2 md:py-2.5" : "py-4 md:py-5"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "Home", "#home")}
          className="flex items-center gap-4 shrink-0 group rounded-md outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2c060d]"
          aria-label="Muthu Rathinam Arangam School Home"
        >
          {/* ===== Logo Image, clipped into a shield silhouette ===== */}
          <div
            className={`relative flex-shrink-0 transition-all duration-500 ease-out ${
              scrolled ? "w-14 h-16 md:w-16 md:h-[74px]" : "w-20 h-[92px] md:w-24 md:h-[108px]"
            }`}
            style={{
              filter:
                "drop-shadow(0 10px 22px rgba(0,0,0,0.6)) drop-shadow(0 0 16px rgba(245,158,11,0.3))",
            }}
          >
            {logoFailed ? (
              <div
                className="w-full h-full flex items-center justify-center bg-black/40 transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ clipPath: SHIELD_CLIP }}
              >
                <FallbackCrest />
              </div>
            ) : (
              <img
                src={logoImg}
                alt="Muthu Rathinam Arangam Crest"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                style={{ clipPath: SHIELD_CLIP }}
                onError={() => setLogoFailed(true)}
              />
            )}
          </div>

          <div className="leading-tight hidden sm:block">
            <h1 className="font-serif font-bold tracking-wide text-lg md:text-xl lg:text-2xl group-hover:text-amber-400 transition-colors duration-300 uppercase">
              MUTHU RATHINAM ARANGAM
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="h-[1px] w-6 bg-amber-400/40 transition-all duration-500 group-hover:w-8 group-hover:bg-amber-400" />
              <span className="text-amber-400/90 text-[10px] md:text-[11px] font-sans font-bold tracking-[0.28em] uppercase transition-colors group-hover:text-amber-300">
                Higher Secondary School
              </span>
              <span className="h-[1px] w-6 bg-amber-400/40 transition-all duration-500 group-hover:w-8 group-hover:bg-amber-400" />
            </div>
          </div>
        </a>

        {/* Global Utilities Strip */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider text-white/80 shrink-0">
          <a
            href="tel:+914132653311"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors duration-300 group whitespace-nowrap"
          >
            <Phone size={13} className="text-amber-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            <span>+91 0413 265 3311</span>
          </a>
          <a
            href="mailto:info@mrahss.edu.in"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors duration-300 group whitespace-nowrap"
          >
            <Mail size={13} className="text-amber-400 transition-transform duration-500 group-hover:translate-y-[-1px]" />
            <span>info@mrahss.edu.in</span>
          </a>
          <div className="flex items-center gap-4 pl-5 border-l border-white/10" role="separator">
            {["facebook", "instagram", "youtube"].map((platform) => (
              <a
                key={platform}
                href="#"
                aria-label={`Visit our ${platform} page`}
                className="text-white/60 hover:text-amber-400 transition-all duration-300 hover:scale-115 hover:-translate-y-[1px]"
              >
                <SocialIcon path={ICONS[platform]} />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Trigger */}
        <button
          className="lg:hidden p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-400 transition-colors hover:bg-white/5 active:bg-white/10 relative z-50"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Collapse site map menu" : "Expand site map navigation menu"}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileOpen ? "close-icon" : "menu-icon"}
              initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {mobileOpen ? <X size={24} className="text-amber-400" /> : <Menu size={24} className="text-white" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Desktop View Nav Bar Links Surface */}
      <div className="hidden lg:block border-t border-white/5 bg-black/10">
        <nav
          onMouseMove={handleNavMouseMove}
          className="relative max-w-[1440px] mx-auto flex items-center justify-between px-6"
          aria-label="Primary Desktop Navigation"
        >
          {/* Interactive Proximity Radial Light Field */}
          <div
            ref={navGlowRef}
            className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10"
            style={{
              background: "radial-gradient(280px circle at var(--glow-x, 50%) center, rgba(245,158,11,0.06), transparent 75%)",
            }}
          />

          <ul className="flex items-center gap-1 font-sans font-semibold text-[11px] xl:text-[12px] tracking-widest uppercase py-2">
            {NAV_LINKS.map((link) => {
              const isCurrent = active === link.label;
              const LinkIcon = link.icon;
              return (
                <li key={link.label} className="shrink-0 relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.label, link.href)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 relative z-10 group/link outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50 ${
                      isCurrent ? "text-amber-400" : "text-white/75 hover:text-amber-400"
                    }`}
                  >
                    <LinkIcon
                      size={13}
                      className={`transition-colors duration-300 ${
                        isCurrent ? "text-amber-400" : "text-white/30 group-hover/link:text-amber-400/80"
                      }`}
                    />
                    <span>{link.label}</span>

                    {/* Active Tab Backdrop Pill */}
                    {isCurrent && (
                      <motion.span
                        layoutId="desktopActiveTabBackdrop"
                        className="absolute inset-0 bg-gradient-to-b from-amber-400/[0.08] to-rose-500/[0.02] border border-amber-400/20 shadow-[inset_0_1px_12px_rgba(245,158,11,0.05)] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Ribbon Admission Cut CTA Button */}
          <motion.a
            ref={ctaRef}
            onMouseMove={handleCtaMouseMove}
            href="#admissions"
            onClick={(e) => handleLinkClick(e, "Admissions", "#admissions")}
            style={{
              transform: "none",
              x: ctaSpringX,
              y: ctaSpringY,
              clipPath: "polygon(7px 0%, 100% 0%, calc(100% - 7px) 50%, 100% 100%, 7px 100%, 0% 50%)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-[#140204] font-sans font-extrabold text-[11px] tracking-[0.18em] uppercase px-8 py-3 shrink-0 z-10 shadow-[0_4px_25px_rgba(220,38,38,0.25)] transition-shadow duration-300 hover:shadow-[0_6px_30px_rgba(245,158,11,0.35)]"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Admissions Open
              <ArrowRight size={13} className="stroke-[3]" />
            </span>

            {/* Foil Foil Shimmer Foil */}
            <motion.span
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm transform -skew-x-12"
              initial={{ x: "-160%" }}
              animate={{ x: "360%" }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
            />
          </motion.a>
        </nav>

        {/* Dynamic Flow Border */}
        <motion.div
          className="h-[2px] w-full"
          style={{
            background: "linear-gradient(90deg, transparent, #fbbf24 25%, #dc2626 50%, #fbbf24 75%, transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPositionX: ["0%", "-200%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Reading progress Line bar */}
        <div className="h-[2px] w-full bg-black/20">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-300 via-amber-400 to-rose-500"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Full screen mobile drawer viewport overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-40 top-[calc(100%)] h-[calc(100vh-100%)] w-screen pointer-events-none">
            {/* Blurry Backdrop Shroud */}
            <motion.div
              key="mobile-backdrop-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/75 pointer-events-auto backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Sliding Panel Surface container */}
            <motion.div
              key="mobile-drawer-surface"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 max-h-[82vh] overflow-y-auto bg-gradient-to-b from-[#25050a] to-[#120204] border-t border-white/10 px-6 py-8 flex flex-col pointer-events-auto shadow-[0_30px_65px_rgba(0,0,0,0.9)]"
            >
              <motion.nav aria-label="Primary Mobile Navigation" variants={drawerVariants} initial="hidden" animate="visible">
                <ul className="flex flex-col gap-1.5 font-sans font-semibold text-sm tracking-widest uppercase">
                  {NAV_LINKS.map((link) => {
                    const isCurrent = active === link.label;
                    const LinkIcon = link.icon;
                    return (
                      <motion.li key={link.label} variants={drawerItemVariants}>
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.label, link.href)}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`flex items-center gap-4 py-3.5 px-5 rounded-xl transition-all duration-300 outline-none ${
                            isCurrent
                              ? "text-amber-400 bg-gradient-to-r from-white/[0.04] to-transparent border border-amber-400/20 shadow-[0_4px_20px_rgba(245,158,11,0.05)]"
                              : "text-white/70 hover:text-amber-400 hover:bg-white/[0.02]"
                          }`}
                        >
                          <LinkIcon size={16} className={isCurrent ? "text-amber-400" : "text-white/30"} />
                          <span>{link.label}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>

              {/* Mobile CTA Footer Block details */}
              <motion.div
                variants={drawerItemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 pt-6 border-t border-white/5 mt-8"
              >
                <a
                  href="#admissions"
                  onClick={(e) => handleLinkClick(e, "Admissions", "#admissions")}
                  className="block text-center bg-gradient-to-r from-red-600 to-amber-500 text-[#140204] font-sans font-extrabold text-xs tracking-widest uppercase py-4 rounded-xl shadow-lg transform active:scale-[0.98] transition-transform duration-150"
                >
                  Admissions Open
                </a>
                <div className="flex flex-col gap-3 text-xs tracking-wider text-white/50 items-center font-sans pb-4">
                  <a href="tel:+914132653311" className="flex items-center gap-2.5 py-1.5 hover:text-amber-400 transition-colors">
                    <Phone size={14} className="text-amber-400" />
                    <span>+91 0413 265 3311</span>
                  </a>
                  <a href="mailto:info@mrahss.edu.in" className="flex items-center gap-2.5 py-1.5 hover:text-amber-400 transition-colors">
                    <Mail size={14} className="text-amber-400" />
                    <span>info@mrahss.edu.in</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}