import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "./FigmaDesigns.css";

const FIGMA_CARDS = [
  {
    id: "fd1",
    image: "/figma/figma_mockup_portfolio.png",
    badge: "Hackathon",
    badgeBg: "#EEEDFE",
    badgeText: "#3C3489",
    title: "MockUp 5.0 — Gamified Portfolio",
    tools: ["Figma", "UI/UX", "Gamification"],
    description:
      "A gamified portfolio design built for MOCKUP 5.0 Hackathon hosted by IEEE CS MLJ at Manipal University.",
    figma:
      "https://www.figma.com/design/mlHeak89Jp2ptRJHoef6zw/MockUp-Hackethon?node-id=0-1&p=f",
  },
  {
    id: "fd2",
    image: "/figma/figma_micro_lms.png",
    badge: "Prototype",
    badgeBg: "#9FE1CB",
    badgeText: "#085041",
    title: "Website Prototype — Full Site",
    tools: ["Figma", "Prototyping", "Web Design"],
    description:
      "A complete website design with interactive prototyping — multi-page navigation, linked flows, and polished UI.",
    figma:
      "https://www.figma.com/design/Bgfg7UDswy8sOxihnAc8vf/Untitled?node-id=0-1&t=MMeXmvVFGm7ALnlH-1",
  },
  {
    id: "fd3",
    image: "/figma/figma_brand_store.png",
    badge: "Brand Store",
    badgeBg: "#F4C0D1",
    badgeText: "#72243E",
    title: "Brand Store UI — Zudio Style",
    tools: ["Figma", "E-commerce", "Brand UI"],
    description:
      "A retail brand store UI inspired by Zudio's design language — product listings, categories, and shopping flow.",
    figma:
      "https://www.figma.com/design/Bgfg7UDswy8sOxihnAc8vf/Untitled?node-id=175-84&t=MMeXmvVFGm7ALnlH-1",
  },
  {
    id: "fd4",
    image: "/figma/figma_hotel_booking.png",
    badge: "Mini Site",
    badgeBg: "#FAC775",
    badgeText: "#633806",
    title: "Prototyping — Mini Site Build",
    tools: ["Figma", "Prototyping", "Mini Site"],
    description:
      "An interactive mini site built with Figma prototyping — clickable components, smooth transitions, and full page flow.",
    figma:
      "https://www.figma.com/design/Bgfg7UDswy8sOxihnAc8vf/Untitled?node-id=0-1&t=MMeXmvVFGm7ALnlH-1",
  },
];

export default function FigmaDesigns() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  /* ── progress bar update ── */
  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = track.scrollLeft / maxScroll;
    thumb.style.marginLeft = ratio * 60 + "%";
  }, []);

  /* ── attach scroll listener ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateProgress, { passive: true });
    return () => track.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  /* ── drag to scroll ── */
  const onMouseDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    startX.current = e.pageX - track.offsetLeft;
    startScrollLeft.current = track.scrollLeft;
    track.classList.add("fd-dragging");
  };

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    track.scrollLeft = startScrollLeft.current - walk;
    updateProgress();
  }, [updateProgress]);

  const stopDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current?.classList.remove("fd-dragging");
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [onMouseMove, stopDrag]);

  /* ── arrow scroll ── */
  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * 320, behavior: "smooth" });
    setTimeout(updateProgress, 350);
  };

  return (
    <section id="figma" className="section fd-section">
      <h2 className="sr-only">
        Figma Designs — UI/UX designs crafted in Figma from hackathon entries to
        full prototypes.
      </h2>
      <div className="container">
        {/* ── Section Header ── */}
        <motion.div
          className="secHead"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="fd-kicker">DESIGN</p>
          <h2 className="fd-heading">Figma Designs</h2>
          <p className="fd-subtitle">
            UI/UX designs crafted in Figma — from hackathon entries to full
            prototypes.
          </p>
        </motion.div>

        {/* ── Scroll Wrapper ── */}
        <div className="fd-wrapper">
          {/* Track */}
          <div
            className="fd-track"
            ref={trackRef}
            onMouseDown={onMouseDown}
          >
            {FIGMA_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                className="fd-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Preview */}
                <div className="fd-preview">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="fd-preview-img"
                    draggable="false"
                  />
                  <div className="fd-preview-overlay" />
                  <span
                    className="fd-badge"
                    style={{
                      backgroundColor: card.badgeBg,
                      color: card.badgeText,
                    }}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Body */}
                <div className="fd-body">
                  <h3 className="fd-title">{card.title}</h3>

                  <div className="fd-tool-row">
                    <span className="fd-tool-dot" />
                    <span className="fd-tools">
                      {card.tools.join(" · ")}
                    </span>
                  </div>

                  <p className="fd-desc">{card.description}</p>

                  <div className="fd-footer">
                    <button
                      className="fd-open-btn"
                      data-figma={card.figma}
                      aria-label={`Open ${card.title} in Figma`}
                      onClick={(e) =>
                        window.open(e.currentTarget.dataset.figma, "_blank")
                      }
                    >
                      Open in Figma ↗
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="fd-progress-track">
            <div className="fd-progress-thumb" ref={thumbRef} />
          </div>

          {/* Arrow Buttons */}
          <div className="fd-arrows">
            <button
              className="fd-arrow"
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
            >
              ←
            </button>
            <button
              className="fd-arrow"
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
