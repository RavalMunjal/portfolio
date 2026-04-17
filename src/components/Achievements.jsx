import React, { useEffect, useRef, useState } from "react";
import "./Achievements.css";

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1000, delay = 300) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    let started = false;

    const delayTimer = setTimeout(() => {
      started = true;
      const step = (ts) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        setValue(Math.round(progress * target));
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}

/* ── Single Stat Card ── */
function StatCard({ target, label }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const val = useCountUp(inView ? target : 0, 1000, 300);

  return (
    <div
      ref={ref}
      className="ach-stat-card"
      aria-label={`${target} ${label}`}
    >
      <span className="ach-stat-num">{val}</span>
      <span className="ach-stat-label">{label}</span>
    </div>
  );
}

/* ── Hackathon card icons ── */
const StarIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#534AB7" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#085041" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-5" />
  </svg>
);

/* ── Hackathon Card ── */
function HackathonCard({ card }) {
  return (
    <div className="ach-hack-card">
      {/* Top area with rich image */}
      <div className="ach-hack-top">
        <img src={card.bgImage} alt="" className="ach-hack-bg" />
        <div className="ach-hack-overlay" />
        
        <span
          className="ach-hack-badge"
          style={{ background: card.badgeBg, color: card.badgeText }}
        >
          {card.badgeLabel}
        </span>
        
        <div className="ach-hack-title-area">
          <p className="ach-hack-title">{card.title}</p>
          <p className="ach-hack-org">{card.org}</p>
        </div>
      </div>

      {/* Body */}
      <div className="ach-hack-body">
        <p className="ach-hack-desc">{card.description}</p>

        <div className="ach-hack-tags">
          {card.tags.map((t) => (
            <span key={t} className="ach-hack-tag">{t}</span>
          ))}
        </div>

        {/* Certificate thumbnails */}
        <div className="ach-cert-strip">
          {card.certImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${card.title} certificate ${i + 1}`}
              className="ach-cert-thumb"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Timeline item ── */
function TimelineItem({ item, isLast }) {
  return (
    <div className="ach-tl-item">
      {/* Left: dot + line */}
      <div className="ach-tl-left">
        <span className="ach-tl-dot" style={{ background: item.dotColor }} />
        {!isLast && <span className="ach-tl-line" />}
      </div>
      {/* Right: card */}
      <div className="ach-tl-card">
        <span className="ach-tl-date">{item.date}</span>
        <p className="ach-tl-title">{item.title}</p>
        <p className="ach-tl-org">{item.org}</p>
      </div>
    </div>
  );
}

/* ── DATA ── */
const STATS = [
  { target: 3, label: "Hackathons" },
  { target: 8, label: "Certificates" },
  { target: 8, label: "Projects Built" },
  { target: 4, label: "Figma Designs" },
];

const HACKATHON_CARDS = [
  {
    id: "h1",
    bgImage: "/achievements/hackathon_ui_design.png",
    badgeBg: "#EEEDFE",
    badgeText: "#3C3489",
    badgeLabel: "Top Performer",
    title: "MOCKUP 5.0 — UI Designathon",
    org: "IEEE CS MLJ · Manipal University",
    description:
      "Represented as Team Hack Titans in MOCKUP 5.0, the ultimate UI Designathon. Received Certificate of Appreciation for commendable performance on 4–5 April 2025 at Manipal University, hosted by IEEE Computer Society.",
    tags: ["UI/UX Design", "Figma", "Hackathon", "Team: Hack Titans"],
    certImages: [
      "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776338981/Screenshot_2026-04-07_105505_steeao.png",
    ],
  },
  {
    id: "h2",
    bgImage: "/achievements/hackathon_coding_dev.png",
    badgeBg: "#9FE1CB",
    badgeText: "#085041",
    badgeLabel: "Participated",
    title: "ArtPark Codeforge Hackathon",
    org: "IISc Bangalore",
    description:
      "Competed as Team Hack Titans in the Build & Submit — Prototype Development round at ArtPark Codeforge Hackathon, organized by the Indian Institute of Science (IISc), Bangalore — one of India's premier research institutions.",
    tags: ["Prototyping", "Full Stack", "IISc Bangalore", "Team: Hack Titans"],
    certImages: [
      "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776338959/Screenshot_2026-04-06_155557_m2vq96.png",
      "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776340341/Screenshot_2026-04-06_155529_qpaah7.png",
    ],
  },
];

const TIMELINE = [
  {
    dotColor: "#7F77DD",
    date: "Apr 2025",
    title: "MOCKUP 5.0 — Certificate of Appreciation",
    org: "IEEE CS MLJ · Manipal University",
  },
  {
    dotColor: "#1D9E75",
    date: "Mar 2025",
    title: "ArtPark Codeforge — Certificate of Participation",
    org: "IISc Bangalore",
  },
  {
    dotColor: "#378ADD",
    date: "2025",
    title: "HackerRank — Introduction to C",
    org: "HackerRank · Verified",
  },
  {
    dotColor: "#378ADD",
    date: "2025",
    title: "HackerRank — Introduction to JavaScript",
    org: "HackerRank · Verified",
  },
  {
    dotColor: "#378ADD",
    date: "2025",
    title: "HackerRank — Problem Solving",
    org: "HackerRank · Verified",
  },
  {
    dotColor: "#BA7517",
    date: "2025",
    title: "SafeVault — Password Manager App",
    org: "Personal Project · GitHub",
  },
];

/* ── Main Component ── */
export default function Achievements() {
  return (
    <section id="achievements" className="ach-section" aria-labelledby="ach-heading-sr">
      <h2 id="ach-heading-sr" className="sr-only">
        Achievements — Hackathons competed, certificates earned, and projects shipped.
      </h2>

      <div className="container">
        {/* ── Section Header ── */}
        <div className="secHead">
          <p className="secKicker">MILESTONES</p>
          <h2 className="secTitle">Achievements</h2>
          <p className="secDesc">
            Hackathons competed, certificates earned, and projects shipped.
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div className="ach-stats-row">
          {STATS.map((s) => (
            <StatCard key={s.label} target={s.target} label={s.label} />
          ))}
        </div>

        {/* ── Main Two-Column Layout ── */}
        <div className="ach-main-grid">
          {/* LEFT — Hackathon cards */}
          <div className="ach-left-col">
            {HACKATHON_CARDS.map((card) => (
              <HackathonCard key={card.id} card={card} />
            ))}
          </div>

          {/* RIGHT — Certificate Timeline */}
          <div className="ach-right-col">
            <p className="ach-tl-heading">Certificate Timeline</p>
            <div className="ach-timeline">
              {TIMELINE.map((item, i) => (
                <TimelineItem
                  key={i}
                  item={item}
                  isLast={i === TIMELINE.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
