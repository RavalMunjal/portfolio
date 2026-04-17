import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    // Hide scrollbar while loading
    document.body.style.overflow = 'hidden';
    
    // Total animation time before revealing site (3.8s)
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto'; // Restore scrollbar
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  // Framer Motion Variants
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const letterAnim = {
    hidden: { opacity: 0, y: 40, rotateX: -90, filter: 'blur(8px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } 
    }
  };

  const name = "MUNJAL RAVAL".split("");

  return (
    <motion.div 
      className="loader-container"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="loader-content">
        <h1 className="loader-name">
          {name.map((char, index) => (
            <motion.span key={index} variants={letterAnim} className="loader-char">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.div 
          className="loader-bar-track"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        >
          <motion.div 
            className="loader-bar-fill"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 2.0, duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.p
           className="loader-tagline"
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 2.3, duration: 0.8, ease: "easeOut" }}
        >
          Frontend Developer · UI/UX Enthusiast
        </motion.p>
      </div>
    </motion.div>
  );
}
