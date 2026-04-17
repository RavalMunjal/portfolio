import React from "react";

const skills = [
  { name: "React", level: 92 },
  { name: "JavaScript", level: 90 },
  { name: "HTML + CSS", level: 95 },
  { name: "UI Animations", level: 88 },
  { name: "SEO Basics", level: 86 },
  { name: "API Integration", level: 84 },
];

export default function Skills() {
  return (
    <section className="pf-section" id="skills">
      <div className="container">
        <div className="pf-title-row">
          <div>
            <div className="pf-kicker"><span className="pf-kicker-dot" /> Skills</div>
            <h2 className="pf-h2">Tech I use daily</h2>
            <p className="pf-sub">Clean UI, smooth UX, and code that doesn’t cry in production.</p>
          </div>
          <span className="pf-pill">Hover the cards</span>
        </div>

        <div className="pf-grid pf-skill-grid">
          {skills.map((s) => (
            <div key={s.name} className="pf-card pf-skill-card">
              <div className="pf-skill-top">
                <p className="pf-skill-name">{s.name}</p>
                <p className="pf-skill-level">{s.level}%</p>
              </div>
              <div className="pf-skill-bar" role="progressbar" aria-valuenow={s.level} aria-valuemin="0" aria-valuemax="100">
                <span style={{ width: `${s.level}%` }} />
              </div>
              <p className="pf-skill-note">Good for building fast, responsive UI.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}