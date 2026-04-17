import React, { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`pf-nav ${scrolled ? "pf-nav-scrolled" : ""}`}>
      <div className="container pf-nav-inner">
        <a className="pf-brand" href="#home" onClick={() => setOpen(false)}>
          <span className="pf-brand-mark" aria-hidden="true" />
          <span className="pf-brand-text">YourName</span>
          <span className="pf-brand-badge">Portfolio</span>
        </a>

        <nav className="pf-nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} className="pf-nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="pf-nav-cta">
          <a className="pf-btn pf-btn-ghost" href="#projects">See Work</a>
          <a className="pf-btn pf-btn-primary" href="#contact">Hire Me</a>

          <button
            className="pf-burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div className={`pf-drawer ${open ? "open" : ""}`}>
        <div className="pf-drawer-panel pf-card">
          <div className="pf-drawer-top">
            <span className="pf-pill">Menu</span>
            <button className="pf-btn pf-btn-ghost" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="pf-drawer-links">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="pf-drawer-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="pf-drawer-actions">
            <a className="pf-btn pf-btn-ghost" href="#projects" onClick={() => setOpen(false)}>
              See Work
            </a>
            <a className="pf-btn pf-btn-primary" href="#contact" onClick={() => setOpen(false)}>
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}