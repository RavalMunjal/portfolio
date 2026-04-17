import React from "react";

export default function Hero() {
  return (
    <section className="pf-hero pf-section" id="home">
      <div className="pf-glow one" />
      <div className="pf-glow two" />

      <div className="container pf-hero-grid">
        <div className="pf-hero-left pf-fade-in">
          <div className="pf-kicker">
            <span className="pf-kicker-dot" />
            Available for freelance + full-time
          </div>

          <h1 className="pf-h1">
            I build <span className="pf-grad-text">fast</span> websites
            <br /> that look premium.
          </h1>

          <p className="pf-hero-sub">
            Frontend Developer • React • UI/UX • SEO-friendly builds.
            I make clean interfaces, smooth animations, and pages that load like lightning.
          </p>

          <div className="pf-hero-actions">
            <a className="pf-btn pf-btn-primary" href="#contact">Let’s Talk</a>
            <a className="pf-btn pf-btn-ghost" href="#projects">View Projects</a>
          </div>

          <div className="pf-hero-mini">
            <span className="pf-pill">React</span>
            <span className="pf-pill">Next.js</span>
            <span className="pf-pill">Tailwind/CSS</span>
            <span className="pf-pill">SEO</span>
          </div>
        </div>

        <div className="pf-hero-right pf-fade-in pf-delay-2">
          <div className="pf-hero-card pf-card">
            <div className="pf-hero-card-top">
              <div className="pf-avatar" aria-hidden="true">
                <span className="pf-avatar-ring" />
                <span className="pf-avatar-core">YN</span>
              </div>

              <div>
                <p className="pf-hero-name">Your Name</p>
                <p className="pf-hero-role">Frontend Developer</p>
              </div>

              <div className="pf-hero-status">
                <span className="pf-status-dot" />
                Online
              </div>
            </div>

            <div className="pf-divider" />

            <div className="pf-hero-card-body">
              <div className="pf-hero-metric">
                <p className="pf-hero-metric-num">25+</p>
                <p className="pf-hero-metric-text">Projects shipped</p>
              </div>
              <div className="pf-hero-metric">
                <p className="pf-hero-metric-num">4.9</p>
                <p className="pf-hero-metric-text">Client rating</p>
              </div>
              <div className="pf-hero-metric">
                <p className="pf-hero-metric-num">2s</p>
                <p className="pf-hero-metric-text">Avg load target</p>
              </div>
            </div>

            <div className="pf-divider" />

            <div className="pf-hero-links">
              <a className="pf-link-chip" href="#" onClick={(e)=>e.preventDefault()}>
                GitHub
              </a>
              <a className="pf-link-chip" href="#" onClick={(e)=>e.preventDefault()}>
                LinkedIn
              </a>
              <a className="pf-link-chip" href="#" onClick={(e)=>e.preventDefault()}>
                Resume
              </a>
            </div>
          </div>

          <div className="pf-float-card pf-card" aria-hidden="true">
            <p className="pf-float-title">Latest</p>
            <p className="pf-float-text">Landing page + animated hero</p>
            <div className="pf-float-bar">
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}