import React from "react";

const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Happy Clients", value: "40+" },
  { label: "Avg PageSpeed Goal", value: "90+" },
  { label: "Support", value: "Fast reply" },
];

export default function Stats() {
  return (
    <section className="pf-section pf-stats">
      <div className="container pf-grid pf-stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} className={`pf-card pf-stat pf-fade-in pf-delay-${(i%3)+1}`}>
            <p className="pf-stat-value">{s.value}</p>
            <p className="pf-stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}