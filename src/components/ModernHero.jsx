import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


const ModernHero = ({ data, scrollToId }) => {
    const [textIndex, setTextIndex] = useState(0);
    const roles = [
        "Web Developer",
        "Frontend Engineer",
        "UI/UX Designer",
        "Tech Enthusiast"
    ];

    // Typing effect logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="modern-hero" id="home">
            <div className="modern-hero-overlay" />

            <div className="container modern-hero-content">
                <motion.div
                    className="modern-hero-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >


                    <h1 className="modern-title">
                        Hi, I'm <br />
                        <span className="gradient-text-hero">{data.name}</span>
                    </h1>

                    <div className="changing-text-wrapper">
                        I am a <span key={textIndex} className="changing-text">{roles[textIndex]}</span>
                    </div>

                    <p className="modern-subtitle">
                        {data.tagline}
                    </p>

                    <p className="modern-description">
                        Crafting pixel-perfect, engaging, and accessible digital experiences.
                        I transform ideas into robust web solutions.
                    </p>

                    <div className="modern-cta-group">
                        <button className="btn-modern-primary" onClick={() => scrollToId("projects")}>
                            View My Work
                        </button>
                        <button className="btn-modern-secondary" onClick={() => scrollToId("contact")}>
                            Contact Me
                        </button>
                    </div>

                    <div className="hero-socials">
                        {data.socials && data.socials.slice(0, 5).map((s, i) => (
                            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="hero-social-link">
                                {s.label}
                            </a>
                        ))}
                    </div>


                </motion.div>

                <motion.div
                    className="modern-hero-right"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="hero-image-container">
                        <div className="hero-img-wrapper">
                            <img
                                src="https://res.cloudinary.com/dpoa5mehq/image/upload/v1772796801/Gemini_Generated_Image_1qm9hc1qm9hc1qm9_1_pmjugx.png"
                                alt={data.name}
                                className="hero-img"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="scroll-indicator" onClick={() => scrollToId("about")}>
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span className="scroll-text">Scroll Down</span>
            </div>
        </section>
    );
};

export default ModernHero;
