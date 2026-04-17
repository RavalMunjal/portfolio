import React, { useEffect, useMemo, useRef, useState } from "react";

const reviews = [
  {
    name: "Amit",
    role: "Startup Founder",
    text: "UI looks premium and the site feels super fast. The animations are clean, not annoying.",
  },
  {
    name: "Riya",
    role: "Marketing Lead",
    text: "Good structure + SEO-ready pages. Simple layout and very smooth on mobile.",
  },
  {
    name: "John",
    role: "Product Manager",
    text: "Communication was easy. Delivered exactly what we needed with solid polish.",
  },
  {
    name: "Sneha",
    role: "Business Owner",
    text: "The final design looks like a Dribbble shot, but works properly in real life.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const max = reviews.length;

  const go = (dir) => {
    setIndex((prev) => {
      const next = dir === "next" ? prev + 1 : prev - 1;
      if (next < 0) return max - 1;
      if (next >= max) return 0;
      return next;
    });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  const dots = useMemo(() => Array.from({ length: max }, (_, i) => i), [max]);

  return (
    <section className="pf-section">
      <div className="container">
        <div className="pf-title-row">
          <div>
            <div className="pf-kicker"><span className="pf-kicker-dot" /> Testimonials</div>
            <h2 className="pf-h2">Clients said this</h2>
            <p className="pf-sub">I didn’t pay them to say it. (Okay maybe just tea.)</p>
          </div>
          <div className="pf-testi-controls">
            <button className="pf-btn pf-btn-ghost" onClick={() => go("prev")} aria-label="Previous testimonial">
              ←
            </button>
            <button className="pf-btn pf-btn-primary" onClick={() => go("next")} aria-label="Next testimonial">
              →
            </button>
          </div>
        </div>

        <div className="pf-card pf-testi-wrap">
          <div className="pf-testi-viewport">
            <div className="pf-testi-track" ref={trackRef}>
              {reviews.map((r) => (
                <div key={r.name} className="pf-testi-slide">
                  <p className="pf-testi-text">“{r.text}”</p>
                  <div className="pf-testi-person">
                    <div className="pf-mini-avatar" aria-hidden="true">{r.name[0]}</div>
                    <div>
                      <p className="pf-testi-name">{r.name}</p>
                      <p className="pf-testi-role">{r.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pf-testi-dots" role="tablist" aria-label="Testimonial dots">
            {dots.map((d) => (
              <button
                key={d}
                className={`pf-dot ${d === index ? "active" : ""}`}
                onClick={() => setIndex(d)}
                aria-label={`Go to testimonial ${d + 1}`}
                aria-pressed={d === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}