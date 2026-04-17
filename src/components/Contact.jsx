import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#fff",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667H9.356V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0A66C2",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
    color: "#FFA116",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#fff",
  },
];

const INFO_ITEMS = [
  {
    icon: "📧",
    label: "Email",
    value: "munjal.raval.cg@gmail.com",
    link: "mailto:munjal.raval.cg@gmail.com",
  },
  { icon: "📍", label: "Location", value: "India · Remote-Friendly", link: null },
  { icon: "⚡", label: "Response", value: "Within 24 hours, always", link: null },
  { icon: "🟢", label: "Status", value: "Open to Opportunities", link: null },
];

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,243,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Mouse parallax ── */
  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: form.name,
      to_name: "Munjal",
      from_email: form.email,
      reply_to: form.email,
      message: form.message,
      name: form.name,
      email: form.email,
    };

    emailjs
      .send(
        "contact_service",
        "template_hu5vmst",
        templateParams,
        "wUsrpwghf1tZvsR-2"
      )
      .then(
        (result) => {
          setLoading(false);
          setSent(true);
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => {
            setSent(false);
          }, 4000);
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);
          alert("Something went wrong! Please try again later.");
        }
      );
  };

  return (
    <section
      className="ct-section"
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Particle canvas */}
      <canvas className="ct-canvas" ref={canvasRef} />

      {/* Ambient orbs */}
      <div className="ct-orb ct-orb-1" />
      <div className="ct-orb ct-orb-2" />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div className="ct-header">
          <div className="ct-kicker">
            <span className="ct-kicker-dot" />
            <span>Contact</span>
          </div>
          <h2 className="ct-title">
            Let's <span className="ct-title-accent">build</span>
            <br />
            something<span className="ct-title-dot">.</span>
          </h2>
          <p className="ct-subtitle">
            Got an idea? I'd love to hear it — let's make something awesome together.
          </p>
        </div>

        {/* Main grid */}
        <div className="ct-grid">
          {/* ── LEFT panel ── */}
          <div
            className="ct-left"
            style={{
              transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
            }}
          >
            {/* Orbit decoration */}
            <div className="ct-orbit-wrap">
              <div className="ct-orbit ct-orbit-1" />
              <div className="ct-orbit ct-orbit-2" />
              <div className="ct-orbit ct-orbit-3" />
              <div className="ct-avatar-ring">
                <span className="ct-avatar-emoji">👋</span>
              </div>
            </div>

            {/* Info items */}
            <div className="ct-info-list">
              {INFO_ITEMS.map((item) => (
                <div className="ct-info-item" key={item.label}>
                  <div className="ct-info-icon">{item.icon}</div>
                  <div>
                    <p className="ct-info-label">{item.label}</p>
                    {item.link ? (
                      <a className="ct-info-value ct-info-link" href={item.link}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="ct-info-value">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="ct-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className="ct-social-btn"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ "--social-color": s.color }}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT panel — form ── */}
          <div
            className="ct-form-card"
            style={{
              transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
            }}
          >
            {/* Glowing border top */}
            <div className="ct-card-glow-bar" />

            <form ref={formRef} onSubmit={onSubmit} noValidate>
              <h3 className="ct-form-title">Send a Message</h3>

              <div className="ct-form-row-2">
                <div className={`ct-field ${focused === "name" ? "ct-field-active" : ""}`}>
                  <label className="ct-label" htmlFor="ct-name">
                    Name
                  </label>
                  <input
                    className="ct-input"
                    id="ct-name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    placeholder="Your name"
                    required
                    autoComplete="off"
                  />
                  <div className="ct-field-line" />
                </div>

                <div className={`ct-field ${focused === "email" ? "ct-field-active" : ""}`}>
                  <label className="ct-label" htmlFor="ct-email">
                    Email
                  </label>
                  <input
                    className="ct-input"
                    id="ct-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    placeholder="you@example.com"
                    required
                    autoComplete="off"
                  />
                  <div className="ct-field-line" />
                </div>
              </div>

              <div className={`ct-field ct-field-full ${focused === "message" ? "ct-field-active" : ""}`}>
                <label className="ct-label" htmlFor="ct-message">
                  Message
                </label>
                <textarea
                  className="ct-textarea"
                  id="ct-message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  placeholder="Tell me about your project or idea…"
                  rows="5"
                  required
                />
                <div className="ct-field-line" />
              </div>

              <button className="ct-submit-btn" type="submit" disabled={loading}>
                <span className="ct-submit-text">{loading ? "Sending..." : "Send Message"}</span>
                <span className="ct-submit-arrow">→</span>
                <div className="ct-submit-glow" />
              </button>

              {sent && (
                <p style={{ color: '#00f3ff', marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                  🚀 Message Sent! I'll get back to you soon.
                </p>
              )}

              <p className="ct-form-note">
                🔒 Your data stays private. No spam — ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}