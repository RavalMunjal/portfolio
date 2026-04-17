import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Certifications.css";

const Certifications = ({ certificates }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);

  const filters = ["All", "Hackathon", "Course", "Competition"];

  const filteredCerts = certificates.filter((cert) => {
    if (activeFilter === "All") return true;
    return cert.category.toLowerCase() === activeFilter.toLowerCase();
  });

  // Handle escape key for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    if (lightboxImg) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImg]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxImg]);

  return (
    <section className="cert-section" aria-labelledby="cert-heading">
      <h2 id="cert-heading" className="sr-only">Certifications Section</h2>
      
      <motion.header 
        className="cert-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="cert-kicker">ACHIEVEMENTS</span>
        <div className="cert-title-main" aria-hidden="true">Certifications</div>
        <p className="cert-subtitle">
          Professional accomplishments and verified skills from global platforms.
        </p>
      </motion.header>

      <motion.div 
        className="cert-filters" role="group" aria-label="Filter certificates by category"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            className={`cert-filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <div className="cert-grid">
        {filteredCerts.map((cert, idx) => (
          <motion.article 
            key={cert.id} 
            className="cert-card-flat" 
            data-cat={cert.category.toLowerCase()}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: Math.min(idx * 0.1, 0.5), ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="cert-img-wrap">
              <img src={cert.image} alt={`Certificate: ${cert.title}`} className="cert-img" />
            </div>
            <div className="cert-body">
              <h3 className="cert-name">{cert.title}</h3>
              <div className="cert-issuer-row">
                <span className="cert-dot"></span>
                <span>{cert.issuer}</span>
              </div>
              <p className="cert-desc">{cert.description}</p>
              <footer className="cert-card-footer">
                <span className="cert-category-pill">{cert.category.toLowerCase()}</span>
                <button 
                  className="cert-link-btn" 
                  data-img={cert.image}
                  onClick={(e) => setLightboxImg(e.currentTarget.getAttribute('data-img'))}
                  aria-label={`View ${cert.title} certificate full size`}
                >
                  View ↗
                </button>
              </footer>
            </div>
          </motion.article>
        ))}
      </div>

      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close fullscreen image">
            &times;
          </button>
          <img src={lightboxImg} alt="Certificate full view" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default Certifications;
