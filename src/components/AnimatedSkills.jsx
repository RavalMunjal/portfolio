import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedSkills.css';

const AnimatedSkills = ({ skills }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="animated-skills-container"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            {skills.map((skill, index) => (
                <motion.div
                    key={index}
                    className="skill-pill"
                    variants={item}
                    whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                    }}
                    style={{
                        animationDelay: `${index * 0.1}s`
                    }}
                >
                    <span className="skill-text">{skill}</span>
                    <div className="skill-glow"></div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default AnimatedSkills;
