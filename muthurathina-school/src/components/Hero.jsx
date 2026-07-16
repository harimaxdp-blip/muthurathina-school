import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "Welcome to MRA HSS",
    title: ["LEARN. GROW.", "SUCCEED."],
    body: "Empowering young minds with knowledge, values and vision for a better tomorrow.",
  },
  {
    eyebrow: "Admissions 2026-27",
    title: ["SEATS ARE", "FILLING FAST"],
    body: "Join a community of 2500+ students learning, playing and growing together in Puducherry.",
  },
  {
    eyebrow: "35+ Years of Excellence",
    title: ["A LEGACY OF", "BRIGHT MINDS"],
    body: "From classrooms to championships, our students carry the MRA spirit wherever they go.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const go = (dir) => {
    setIndex((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
  };

  return (
    <section id="home" className="relative">
      <div className="relative h-[520px] sm:h-[600px] overflow-hidden bg-navy-dark">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2000&auto=format&fit=crop"
          alt="School campus building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/50 to-navy-dark/20" />

        <div className="relative max-w-[1440px] mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white">
            <p className="text-gold font-semibold tracking-[0.2em] text-sm mb-4">
              {slide.eyebrow.toUpperCase()}
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] mb-5">
              {slide.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <span className="block w-16 h-1 bg-gold mb-5" />
            <p className="text-white/85 text-base sm:text-lg mb-8 max-w-md">{slide.body}</p>
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-3.5 rounded-md transition-colors"
            >
              Discover More
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/40 text-white items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/40 text-white items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-gold" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <FeatureStrip />
    </section>
  );
}

const FEATURES = [
  {
    icon: "🎓",
    title: "Academics",
    body: "Excellence in education for a brighter future",
  },
  {
    icon: "⚽",
    title: "Sports",
    body: "Building strength, teamwork and spirit",
  },
  {
    icon: "📅",
    title: "Events",
    body: "Celebrating talents and creating memories",
  },
  {
    icon: "🏆",
    title: "Achievements",
    body: "Proud of our students' accomplishments",
  },
];

function FeatureStrip() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 -mt-8 relative z-10">
      <div className="bg-navy rounded-2xl shadow-card px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={`flex items-start gap-4 text-white ${i > 0 ? "sm:pl-8 pt-6 sm:pt-0" : ""}`}
          >
            <span className="w-11 h-11 shrink-0 rounded-lg bg-gold/15 flex items-center justify-center text-xl">
              {f.icon}
            </span>
            <div>
              <h3 className="font-display font-semibold text-base mb-1">{f.title}</h3>
              <p className="text-white/70 text-sm leading-snug">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
