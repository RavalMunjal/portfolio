import React from "react";
import { motion } from "framer-motion";
import "./Hackathons.css";

const Hackathons = ({ hackathons }) => {
    return (
        <div className="hackathon-grid">
            {hackathons.map((h, i) => (
                <motion.div
                    key={h.id}
                    className="hackathon-card"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="h-card-image-wrap">
                        <img src={h.image} alt={h.title} className="h-card-image" />
                        <div className="h-card-overlay"></div>
                    </div>

                    <div className="h-card-content">
                        <h3 className="h-card-title">{h.title}</h3>

                        <div className="h-section-title">Problem Statement</div>
                        <p className="h-text">{h.problemStatement}</p>

                        <div className="h-section-title">Solution & Outcome</div>
                        <p className="h-text h-text-highlight">{h.solution} <br/><br/><strong>Outcome:</strong> {h.outcome}</p>

                        <div className="h-tags">
                            {h.tags.map((tag) => (
                                <span key={tag} className="h-tag">{tag}</span>
                            ))}
                        </div>

                        <div className="h-actions">
                            <a href={h.githubUrl} target="_blank" rel="noreferrer" className="h-btn h-btn-primary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                GitHub
                            </a>
                            <a href={h.demoUrl} target="_blank" rel="noreferrer" className="h-btn h-btn-secondary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                View Demo
                            </a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Hackathons;
