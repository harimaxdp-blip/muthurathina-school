import React, { useEffect, useRef, useState } from "react";
import BuildingSketch from "./BuildingSketch";
import { IconYears, IconStudents, IconTeachers, IconPassRate } from "./StatIcons";
import { IconQuality, IconHolistic, IconValue, IconSafe } from "./FeatureIcons";
import "./Home.css";

const STATS = [
  { value: 25, suffix: "+", label: "Years of Excellence", Icon: IconYears },
  { value: 1200, suffix: "+", label: "Happy Students", Icon: IconStudents },
  { value: 80, suffix: "+", label: "Expert Teachers", Icon: IconTeachers },
  { value: 98, suffix: "%", label: "Pass Percentage", Icon: IconPassRate },
];

const FEATURES = [
  {
    title: "Quality Education",
    text: "Strong academic foundation with modern teaching methods.",
    Icon: IconQuality,
  },
  {
    title: "Holistic Development",
    text: "Encouraging sports, arts, and life skills for overall growth.",
    Icon: IconHolistic,
  },
  {
    title: "Value Based Learning",
    text: "Instilling discipline, respect and integrity in every student.",
    Icon: IconValue,
  },
  {
    title: "Safe & Supportive",
    text: "A secure and caring environment for every child to thrive.",
    Icon: IconSafe,
  },
];

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Counter({ value, suffix, animate }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let raf;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, value]);

  return (
    <span className="stat__value">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [statsRef, statsInView] = useInView(0.4);
  const [featuresRef, featuresInView] = useInView(0.15);

  return (
    <main id="home" className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero__bg-blob" aria-hidden="true" />
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow reveal-up">WELCOME TO MUTHU RATHINA</p>
            <h1 className="hero__heading">
              <span className="reveal-up" style={{ animationDelay: "0.05s" }}>
                Nurturing Minds.
              </span>
              <span className="reveal-up" style={{ animationDelay: "0.15s" }}>
                Building Values.
              </span>
              <span className="reveal-up hero__heading--accent" style={{ animationDelay: "0.25s" }}>
                Inspiring Excellence.
              </span>
            </h1>
            <p className="hero__text reveal-up" style={{ animationDelay: "0.35s" }}>
              Empowering students with quality education, strong values and holistic
              development for a brighter tomorrow.
            </p>
            <div className="hero__actions reveal-up" style={{ animationDelay: "0.45s" }}>
              <a href="#about" className="btn btn--primary">
                Explore Our School <span aria-hidden="true">&rarr;</span>
              </a>
              <a href="#about" className="btn btn--ghost">
                About Us
              </a>
            </div>
          </div>

          <div className="hero__art reveal-up" style={{ animationDelay: "0.2s" }}>
            <BuildingSketch className="hero__sketch" />
          </div>
        </div>

        <div className="hero__scroll-cue" aria-hidden="true">
          <span className="hero__scroll-dot" />
        </div>
      </section>

      {/* STATS SUMMARY ROW */}
      <section className="stats" ref={statsRef}>
        <div className="stats__inner">
          {STATS.map((s, i) => (
            <div
              className={`stat ${statsInView ? "stat--in" : ""}`}
              key={s.label}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="stat__icon">
                <s.Icon />
              </span>
              <span className="stat__text">
                <Counter value={s.value} suffix={s.suffix} animate={statsInView} />
                <span className="stat__label">{s.label}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES BANNER SECTION */}
      <section className="features" ref={featuresRef}>
        <div className="features__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
            {/* Exactly replicates the smooth asymmetric continuous swoop curve */}
            <path d="M0,90 C380,115 750,70 1080,42 C1240,28 1360,34 1440,38 L1440,140 L0,140 Z"></path>
          </svg>
        </div>
        <div className="features__inner">
          {FEATURES.map((f, i) => (
            <div
              className={`feature-card ${featuresInView ? "feature-card--in" : ""}`}
              key={f.title}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="feature-card__icon">
                <f.Icon />
              </div>
              <div className="feature-card__content">
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__text">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}