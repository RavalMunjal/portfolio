import React from "react";

const timeline = [
  {
    role: "Frontend Developer",
    company: "Freelance",
    time: "2024 — Present",
    points: [
      "Built responsive websites with React + clean CSS.",
      "Improved page speed and basic SEO structure.",
      "Created reusable UI components and layouts.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Startup Team",
    time: "2023 — 2024",
    points: [
      "Worked on landing pages and UI fixes.",
      "Handled responsiveness and pixel-level UI polish.",
      "Helped integrate forms and simple dashboards.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="pf-section" id="experience">
      <div className="container">
        <div className="pf-title-row">
          <div>
            <div className="pf-kicker"><span className="pf-kicker-dot" /> Experience</div>
            <h2 className="pf-h2">Where I’ve worked</h2>
            <p className="pf-sub">Small team, big impact. Also: less meetings, more shipping.</p>
          </div>
          <span className="pf-pill">Timeline</span>
        </div>

        <div className="pf-grid pf-exp-grid">
          {timeline.map((t) => (
            <div key={t.role} className="pf-card pf-exp-card">
              <div className="pf-exp-head">
                <div>
                  <p className="pf-exp-role">{t.role}</p>
                  <p className="pf-exp-company">{t.company}</p>
                </div>
                <span className="pf-pill">{t.time}</span>
              </div>

              <ul className="pf-exp-list">
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
