
import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import emailjs from '@emailjs/browser';

import HeroParticles from "./components/HeroParticles";
import ModernHero from "./components/ModernHero";
import Skills3DCloud from "./components/Skills3DCloud";
import Hackathons from "./components/Hackathons";
import "./ModernHero.css";
import "./BrandLogo.css";
import { motion } from "framer-motion";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import FigmaDesigns from "./components/FigmaDesigns";
import Achievements from "./components/Achievements";

const DATA = {
  name: "Munjal Raval",
  role: "Web Developer & Frontend Engineer",
  tagline: "Building Beautiful, Functional Web Experiences",
  statusPill: "Open To Work",
  email: "munjal.raval.cg@gmail.com",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/RavalMunjal" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/munjal-raval-aa66013a2" },
    { label: "LeetCode", href: "https://leetcode.com/u/MunjalRaval_555/" },
    { label: "X", href: "https://x.com/MunjalRaval_555" },
    { label: "YouTube", href: "https://www.youtube.com/@MunjalRaval-cg" },
  ],
  heroStats: [
    { k: "Major Projects", v: "12+" },
    { k: "Commitment", v: "100%" },
    { k: "Experience", v: "2+ Yrs" },
  ],
  marquee: ["REACT.JS", "JAVASCRIPT", "HTML5", "CSS3", "NODE.JS", "UI/UX", "FIGMA", "C++"],
  aboutText: "I'm a passionate Web Developer with strong expertise in HTML, CSS, JavaScript, Node.js, and React JS. I love crafting pixel-perfect user interfaces and building seamless web experiences. My skills extend to programming languages like C and C++, and I have a keen eye for UI/UX design using Figma. I believe in writing clean, maintainable code and creating applications that users love to interact with.",
  techStackCards: [
    { title: "React.js", sub: "Frontend", icon: "⚛️" },
    { title: "Node.js", sub: "Backend", icon: "🟢" },
    { title: "JavaScript", sub: "Language", icon: "⚡" },
    { title: "Figma", sub: "UI/UX", icon: "🎨" },
  ],
  skillGroups: [
    {
      title: "Frontend Development",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React JS", "Responsive Design", "CSS Animations"],
    },
    {
      title: "Backend & Tools",
      items: ["Node.js", "Express.js", "REST APIs", "Git & GitHub", "NPM", "Postman"],
    },
    {
      title: "Design & Programming",
      items: ["UI/UX Design", "Figma", "C Programming", "C++", "Data Structures", "Algorithms"],
    },
  ],
  allSkills: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },

  ],
  projects: [
    {
      id: "p1",
      title: "FinCtrl",
      type: "Web",
      desc: "A comprehensive Finance Tracker & Management System. Built with MongoDB, Express.js, React.js, and Node.js for a robust full-stack solution.",
      tech: ["MERN Stack", "Auth", "Charts"],
      cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      codeUrl: "#",
      liveUrl: "#",
    },
    {
      id: "p2",
      title: "Product Landing Clone",
      type: "Web",
      desc: "A responsive product landing page clone ensuring pixel-perfect design and smooth user experience across all devices.",
      tech: ["React.js", "CSS3", "Responsive"],
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      codeUrl: "#",
      liveUrl: "#",
    },
    {
      id: "p3",
      title: "YouTube Mini Clone",
      type: "Web",
      desc: "A functional YouTube clone featuring video playback, search functionality, and a modern UI similar to the original platform.",
      tech: ["React.js", "YouTube API", "UI/UX"],
      cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
      codeUrl: "#",
      liveUrl: "#",
    },
  ],

  youtubeVideos: [
    {
      id: "vid1",
      title: "Introduction of WazirX Clone",
      videoId: "TZx1ncGgGbo",
      description: "Overview of the waziX.com clone project.",
    },
    {
      id: "vid2",
      title: "Introduction of Aven Clone",
      videoId: "v_hG8gKpYVE",
      description: "Walkthrough of the aven.com clone website.",
    },
    {
      id: "vid3",
      title: "Introduction of Ashby Clone",
      videoId: "l6znhUWDL1w",
      description: "Demo of the ashby.com clone project.",
    },
    {
      id: "vid4",
      title: "Introduction of Savaari Clone",
      videoId: "p3epjZ7Y5Eo",
      description: "Presentation of the Savaari.com clone.",
    },
  ],
  certificates: [
    {
      id: "c1",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776340341/Screenshot_2026-04-06_155529_qpaah7.png",
      title: "Sololearn Certificate — Introduction to C",
      issuer: "Sololearn",
      badge: "Verified",
      category: "Course",
      description: "Verified course completion certificate for Introduction to C from Sololearn's learning platform."
    },
    {
      id: "c2",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776340292/Screenshot_2026-04-06_115616_lzlnur.png",
      title: "Certificate of Accomplishment",
      issuer: "HackerRank",
      badge: "Participation",
      category: "Course",
      description: "Certificate of accomplishment awarded for completing a HackerRank skill track assessment."
    },
    {
      id: "c3",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776340281/Screenshot_2026-03-25_105510_txy38b.png",
      title: "Sololearn Certificate — Introduction to JavaScript",
      issuer: "Sololearn",
      badge: "Verified",
      category: "Course",
      description: "Verified course completion certificate for Introduction to JavaScript by Sololearn."
    },
    {
      id: "c4",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776338991/Screenshot_2026-04-06_155540_s03s6o.png",
      title: "Build & Submit — ArtPark Codeforge",
      issuer: "IISc Bangalore",
      badge: "Participation",
      category: "Hackathon",
      description: "Participated as Team Hack Titans in the Prototype Development round at ArtPark Codeforge Hackathon."
    },
    {
      id: "c5",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776338981/Screenshot_2026-04-07_105505_steeao.png",
      title: "MOCKUP 5.0 — UI Designathon",
      issuer: "IEEE CS MLJ · Manipal University",
      badge: "Verified",
      category: "Competition",
      description: "Certificate of Appreciation for commendable performance in MOCKUP 5.0, the ultimate UI Designathon hosted by IEEE CS MLJ, 4–5 April 2025."
    },
    {
      id: "c6",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776338959/Screenshot_2026-04-06_155557_m2vq96.png",
      title: "OpenPools Participation",
      issuer: "OpenPools",
      badge: "Participation",
      category: "Hackathon",
      description: "Certificate of participation for competing and contributing in the OpenPools event."
    },
    {
      id: "c7",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776341626/Screenshot_2026-04-16_174322_jrmr1q.png",
      title: "Technical Certification",
      issuer: "Learning Platform",
      badge: "Verified",
      category: "Course",
      description: "Certificate of achievement demonstrating fundamental coding proficiency and milestone completion."
    },
    {
      id: "c8",
      image: "https://res.cloudinary.com/dpoa5mehq/image/upload/v1776341729/Screenshot_2026-04-16_174514_h9jqlp.png",
      title: "Professional Achievement",
      issuer: "Learning Platform",
      badge: "Participation",
      category: "Course",
      description: "Certificate acknowledging dedication to continuous learning and technical skill improvement."
    }
  ],
  games: [
    {
      id: "g1",
      title: "Click Counter",
      description: "Simple click counting game with score tracking and reset.",
      tags: ["Mini Game"],
      link: "https://js-games-7655.netlify.app/game-01-click%20counter/",
      color: "#10b981",
      iconKey: "click",
      image: "/games/game_click_counter.png"
    },
    {
      id: "g2",
      title: "Color Guessing",
      description: "Guess the correct RGB color from multiple choices.",
      tags: ["Mini Game"],
      link: "https://js-games-7655.netlify.app/game-02-colorguesinggame/",
      color: "#ec4899",
      iconKey: "color",
      image: "/games/game_color_guessing.png"
    },
    {
      id: "g3",
      title: "Whack a Mole",
      description: "Fast-paced arcade reflex game — hit moles before time runs out.",
      tags: ["Game Dev"],
      link: "https://js-games-7655.netlify.app/game-03-wack%20a%20mole/",
      color: "#8b5cf6",
      iconKey: "whack",
      image: "/games/game_whack_a_mole.png"
    },
    {
      id: "g4",
      title: "Typing Speed",
      description: "Test your typing WPM with real-time accuracy tracking.",
      tags: ["Mini Game"],
      link: "https://js-games-7655.netlify.app/game-04-typing%20speed%20test/",
      color: "#f59e0b",
      iconKey: "typing",
      image: "/games/game_typing_speed.png"
    },
    {
      id: "g5",
      title: "Memory Flip",
      description: "Classic card matching memory game — flip and find all pairs.",
      tags: ["Mini Game"],
      link: "https://js-games-7655.netlify.app/game-05-memory%20flip%20card/",
      color: "#3b82f6",
      iconKey: "memory",
      image: "/games/game_memory_flip.png"
    },
    {
      id: "g6",
      title: "To-Do Game",
      description: "Gamified task management — earn points by completing tasks.",
      tags: ["Productivity"],
      link: "https://js-games-7655.netlify.app/game-06-to-do%20game/",
      color: "#ef4444",
      iconKey: "todo",
      image: "/games/game_todo.png"
    },
    {
      id: "g7",
      title: "Snake Slider Game",
      description: "Multiplayer Snakes & Ladders board game with dice rolling.",
      tags: ["Game Dev"],
      link: "https://js-games-7655.netlify.app/sapsidi%20game/index.html",
      color: "#f59e0b",
      iconKey: "snake",
      image: "/games/game_snake_slider.png"
    },
  ],
  hackathons: [
    {
      id: "h1",
      title: "Odoo x Gujarat Vidhyapith Hackathon 2026",
      problemStatement: "Developing an institutional management solution using Odoo.",
      solution: "Built a customized module improving workflow efficiency and data synchronization.",
      outcome: "Successfully presented the prototype to the panel.",
      githubUrl: "https://github.com/AnshPatel191207/Odoo_x_Gujarat_Vidhyapith_Hackathon_2026",
      demoUrl: "https://github.com/AnshPatel191207/Odoo_x_Gujarat_Vidhyapith_Hackathon_2026",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      tags: ["Odoo", "ERP", "Python"]
    },
    {
      id: "h2",
      title: "Craftathon",
      problemStatement: "Creating an efficient rescue management & dispatch system.",
      solution: "Developed RapidResQ, a platform to manage emergency dispatches with live tracking.",
      outcome: "Delivered a fully functional prototype.",
      githubUrl: "https://github.com/PalDPathak404/RapidResQ",
      demoUrl: "https://github.com/PalDPathak404/RapidResQ",
      image: "/minecraft_hackathon.png",
      tags: ["React", "Node.js", "Sockets"]
    },
    {
      id: "h3",
      title: "Openpools",
      problemStatement: "Building a smart plant care application (PlantPal).",
      solution: "Designed PlantPal to help users monitor plant health and schedule watering.",
      outcome: "Created an intuitive UI and AI-driven plant identifier.",
      githubUrl: "https://github.com/Dev1822/PlantPal",
      demoUrl: "https://github.com/Dev1822/PlantPal",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
      tags: ["React Native", "AI"]
    }
  ]
};


function SectionLabel({ kicker, title, desc }) {
  return (
    <div className="secHead">
      {kicker ? <p className="secKicker">{kicker}</p> : null}
      <h2 className="secTitle">{title}</h2>
      {desc ? <p className="secDesc">{desc}</p> : null}
    </div>
  );
}

function GameIcon({ iconKey, color, size = 52 }) {
  const s = { width: size, height: size };
  const icons = {
    click: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={s}>
        {/* Mouse body */}
        <rect x="18" y="10" width="28" height="40" rx="14" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2.5" />
        {/* Scroll wheel */}
        <rect x="29" y="16" width="6" height="12" rx="3" fill={color} />
        {/* Click lines */}
        <line x1="32" y1="50" x2="32" y2="58" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="44" y1="45" x2="50" y2="51" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="45" x2="14" y2="51" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {/* Divider line */}
        <line x1="32" y1="10" x2="32" y2="35" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    ),
    color: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={s}>
        {/* RGB circles */}
        <circle cx="22" cy="28" r="14" fill="#ef4444" fillOpacity="0.75" />
        <circle cx="42" cy="28" r="14" fill="#3b82f6" fillOpacity="0.75" />
        <circle cx="32" cy="42" r="14" fill="#10b981" fillOpacity="0.75" />
        {/* Center glow */}
        <circle cx="32" cy="33" r="5" fill="white" fillOpacity="0.5" />
        {/* Question mark */}
        <text x="28" y="37" fontSize="10" fill="white" fontWeight="bold">?</text>
      </svg>
    ),
    whack: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={s}>
        {/* Hammer handle */}
        <rect x="36" y="34" width="8" height="22" rx="4" transform="rotate(-35 36 34)" fill={color} fillOpacity="0.6" />
        {/* Hammer head */}
        <rect x="10" y="10" width="28" height="18" rx="6" fill={color} />
        {/* Mole head */}
        <ellipse cx="44" cy="48" rx="10" ry="8" fill="#a16207" />
        {/* Mole eyes */}
        <circle cx="41" cy="46" r="2" fill="white" />
        <circle cx="47" cy="46" r="2" fill="white" />
        <circle cx="41.5" cy="46.5" r="1" fill="#1e293b" />
        <circle cx="47.5" cy="46.5" r="1" fill="#1e293b" />
        {/* Stars */}
        <circle cx="12" cy="40" r="2" fill={color} fillOpacity="0.6" />
        <circle cx="20" cy="48" r="1.5" fill={color} fillOpacity="0.5" />
      </svg>
    ),
    typing: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={s}>
        {/* Keyboard base */}
        <rect x="6" y="22" width="52" height="28" rx="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
        {/* Keys row 1 */}
        <rect x="12" y="28" width="8" height="6" rx="2" fill={color} fillOpacity="0.4" />
        <rect x="23" y="28" width="8" height="6" rx="2" fill={color} fillOpacity="0.4" />
        <rect x="34" y="28" width="8" height="6" rx="2" fill={color} fillOpacity="0.4" />
        <rect x="45" y="28" width="8" height="6" rx="2" fill={color} fillOpacity="0.6" />
        {/* Keys row 2 */}
        <rect x="12" y="37" width="8" height="6" rx="2" fill={color} fillOpacity="0.4" />
        <rect x="23" y="37" width="18" height="6" rx="2" fill={color} fillOpacity="0.7" />
        <rect x="44" y="37" width="9" height="6" rx="2" fill={color} fillOpacity="0.4" />
        {/* Cursor blink */}
        <rect x="14" y="14" width="3" height="6" rx="1" fill={color} />
        {/* WPM text area */}
        <rect x="8" y="10" width="35" height="10" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" />
      </svg>
    ),
    memory: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={s}>
        {/* Back card */}
        <rect x="18" y="14" width="32" height="42" rx="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" transform="rotate(-8 18 14)" />
        {/* Front card */}
        <rect x="14" y="10" width="32" height="42" rx="5" fill="#1e293b" stroke={color} strokeWidth="2" />
        {/* Card face pattern - star */}
        <path d="M30 20 L32 26 L38 26 L33 30 L35 36 L30 32 L25 36 L27 30 L22 26 L28 26 Z" fill={color} />
        {/* Suit symbol */}
        <text x="16" y="24" fontSize="9" fill={color} fontWeight="bold">♠</text>
        <text x="34" y="48" fontSize="9" fill={color} fontWeight="bold" transform="rotate(180 38 44)">♠</text>
      </svg>
    ),
    todo: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={s}>
        {/* Clipboard */}
        <rect x="10" y="14" width="44" height="46" rx="5" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
        {/* Clip */}
        <rect x="24" y="8" width="16" height="10" rx="3" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.5" />
        {/* Check rows */}
        <circle cx="20" cy="30" r="4" fill={color} />
        <path d="M18 30 L20 32 L23 28" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="28" y1="30" x2="46" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="42" r="4" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5" />
        <line x1="28" y1="42" x2="46" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
        {/* Star reward */}
        <path d="M50 8 L51.5 12 L56 12 L52.5 14.5 L54 18.5 L50 16 L46 18.5 L47.5 14.5 L44 12 L48.5 12 Z" fill="#f59e0b" />
      </svg>
    ),
    snake: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={s}>
        {/* Board grid */}
        <rect x="6" y="6" width="52" height="52" rx="5" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.5" />
        <line x1="6" y1="23" x2="58" y2="23" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="6" y1="40" x2="58" y2="40" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="23" y1="6" x2="23" y2="58" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="40" y1="6" x2="40" y2="58" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Snake path */}
        <path d="M14 50 C14 50 14 32 32 32 C50 32 50 14 50 14" stroke="#10b981" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Snake head */}
        <circle cx="50" cy="14" r="5" fill="#10b981" />
        <circle cx="48" cy="12" r="1.5" fill="white" />
        <circle cx="52" cy="12" r="1.5" fill="white" />
        {/* Ladder */}
        <line x1="23" y1="23" x2="40" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="19" x2="35" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Dice */}
        <rect x="44" y="44" width="14" height="14" rx="3" fill={color} />
        <circle cx="48" cy="48" r="1.5" fill="white" />
        <circle cx="54" cy="54" r="1.5" fill="white" />
        <circle cx="54" cy="48" r="1.5" fill="white" />
      </svg>
    ),
  };
  return icons[iconKey] || null;
}

function TypingEffect({ text, speed = 150, eraseSpeed = 100, pause = 2000 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === text[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), pause);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % text.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? eraseSpeed : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, speed, eraseSpeed, pause, text]);

  return (
    <span>
      {text[index].substring(0, subIndex)}
      <span style={{ opacity: blink ? 1 : 0, fontWeight: 100 }}>|</span>
    </span>
  );
}

function YouTubeCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="videoCard">
      <div className="videoEmbed">
        {!isPlaying ? (
          <div className="videoFacade" onClick={() => setIsPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
              alt={video.title}
              className="videoThumbnail"
            />
            <div className="playBtnOverlay">
              <div className="playBtnIcon">▶</div>
            </div>
          </div >
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div >
      <div className="videoInfo">
        <h4 className="videoTitle">{video.title}</h4>
        <p className="videoDesc">{video.description}</p>
      </div>
    </div >
  );
}

function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHead">
          <h3 className="modalTitle">{title}</h3>
          <button className="iconBtn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
      duration: 0.8,
      type: "spring",
      bounce: 0.3
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

import ResumeModal from "./components/ResumeModal";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const heroRef = useRef(null);

  const navItems = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "games", label: "Games" },
      { id: "figma", label: "Figma" },
      { id: "hackathons", label: "Hackathons" },
      { id: "certifications", label: "Certifications" },
      { id: "achievements", label: "Achievements" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY || 0;
      heroRef.current.style.setProperty("--par", String(Math.min(1, y / 550)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSend = (e) => {
    e.preventDefault();
    setSendLoading(true);
    setSendSuccess(false);

    emailjs.sendForm(
      "contact_service",
      "template_hu5vmst",
      e.target,
      "wUsrpwghf1tZvsR-2"
    )
      .then(() => {
        setSendLoading(false);
        setSendSuccess(true);
        e.target.reset();
        setTimeout(() => setSendSuccess(false), 5000);
      })
      .catch((error) => {
        setSendLoading(false);
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Please try again later.");
      });
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`app ${menuOpen ? "navOpen" : ""}`}>
      {/* NAV */}
      <nav className="navWrap">
        <div className="navInner">
          <button className="brand" onClick={() => scrollToId("top")}>
            <div className="brandLogo">MR</div>

          </button>

          <div className="navLinks">
            {navItems.map((item) => (
              <button key={item.id} className="navBtn" onClick={() => scrollToId(item.id)}>
                {item.label}
              </button>
            ))}
            <button className="navBtn navResume" onClick={() => setShowResume(true)}>
              Resume
            </button>
          </div>

          <button className="menuBtn" onClick={toggleMenu} aria-label="Menu">
            <span className="menuLines" />
          </button>
        </div>

        <div className="mobileNav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="mNavBtn"
              onClick={() => {
                scrollToId(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <button className="mNavBtn mNavResume" onClick={() => { setShowResume(true); setMenuOpen(false); }}>
            Resume
          </button>
        </div>
      </nav>

      <main id="top" className="main">
        {/* HERO */}
        <ModernHero data={DATA} scrollToId={scrollToId} />

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionLabel kicker="About" title="Web Developer & Frontend Engineer" desc="" />

              <div className="aboutContent">
                <div className="aboutText" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                  <p>
                    I am a passionate <strong>Full Stack Developer</strong> and <strong>Frontend Engineer</strong> with a deep love for creating intuitive, dynamic, and beautiful digital experiences. My journey in tech is driven by a curiosity to understand how things work and a desire to build solutions that make a difference.
                  </p>
                  <p>
                    With expertise in the <strong>MERN Stack (MongoDB, Express, React, Node.js)</strong>, I specialize in building robust web applications from the ground up. My technical foundation in <strong>C, C++</strong>, and <strong>Data Structures & Algorithms</strong> empowers me to write efficient, optimized code that balances performance with exceptional UI/UX design.
                  </p>
                  <p>
                    I am constantly learning and evolving, staying up-to-date with the latest industry trends like <strong>Three.js</strong> and advanced system design. I embrace every challenge as an opportunity to grow and am currently <strong>open to new opportunities</strong> where I can contribute my skills and collaborate with innovative teams.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section sectionAlt" style={{ position: "relative", overflow: "hidden", minHeight: "750px" }}>
          <div className="container" style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
            <SectionLabel
              kicker="Tech Stack"
              title="Modern tools I use"
            />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4rem" }}>
              <Skills3DCloud skills={DATA.allSkills} />
            </div>

            <div className="skillCategoriesGrid">
              {DATA.skillGroups.map((group, index) => (
                <motion.div
                  key={group.title}
                  className="skillCategoryCard"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, rotateY: index % 2 === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.7, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 243, 255, 0.15)" }}
                >
                  <h3 className="skillCategoryTitle">{group.title}</h3>
                  <ul className="skillList">
                    {group.items.map((item) => (
                      <li key={item} className="skillListItem">
                        <span className="skillBullet">▹</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <Projects />

        {/* GAMES */}
        <section id="games" className="section">
          <div className="container" style={{ perspective: "1000px" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionLabel
                kicker="Interactive Fun"
                title="Mini Games I Built"
              />
            </motion.div>

            <div className="gameGrid">
              {DATA.games.map((g, i) => (
                <motion.div
                  key={g.id}
                  className="gameCard"
                  initial={{ opacity: 0, rotateX: 45, y: 50 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                >
                  <div className="gameCover" style={{
                    overflow: 'hidden'
                  }}>
                    <img src={g.image} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="gameImage" />
                  </div>
                  <div className="gameBody">
                    <div className="gameTop">
                      <h3 className="gameTitle">{g.title}</h3>
                      <a
                        href={g.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btnPrimary"
                        style={{ padding: "5px 14px", fontSize: "12px", whiteSpace: "nowrap" }}
                      >
                        Play ▶
                      </a>
                    </div>
                    <p className="gameDesc">{g.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* FIGMA DESIGNS */}
        <FigmaDesigns />

        {/* HACKATHONS */}
        <section id="hackathons" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, x: 80, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionLabel
                kicker="Competitive Coding"
                title="Hackathons & Events"
                desc="A showcase of hackathons I've participated in, the problems solved, and solutions delivered."
              />
            </motion.div>
            <Hackathons hackathons={DATA.hackathons} />
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="section">
          <div className="container">
            <Certifications certificates={DATA.certificates} />
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <Achievements />

        {/* CONTACT */}
        <section id="contact" className="section sectionAlt">
          <div className="container">
            <SectionLabel kicker="Let's talk" title="Get in touch" desc="Open for work, freelance, and collaborations." />

            <motion.div
              className="contactGrid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="contactInfo" variants={itemVariants}>
                <div className="infoCard">
                  <p className="infoK">Email</p>
                  <a className="infoV" href={`mailto:${DATA.email}`}>
                    {DATA.email}
                  </a>
                </div>

                <div className="infoCard">
                  <p className="infoK">Socials</p>
                  <div className="infoLinks">
                    {DATA.socials.map((s) => (
                      <a key={s.label} className="link linkBig" href={s.href} target="_blank" rel="noreferrer">
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.form className="contactForm" onSubmit={onSend} variants={itemVariants}>
                <div className="fieldRow">
                  <div className="field">
                    <input type="text" id="name" name="name" required placeholder=" " />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="field">
                    <input type="email" id="email" name="email" required placeholder=" " />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="field">
                  <textarea id="msg" name="message" rows={5} required placeholder=" "></textarea>
                  <label htmlFor="msg">Message</label>
                </div>
                <button type="submit" className="btn btnPrimary btnWide" disabled={sendLoading}>
                  {sendLoading ? "Sending..." : "Send Message"}
                </button>
                {sendSuccess && (
                  <p style={{ color: '#00f3ff', marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                    Message sent successfully ✅
                  </p>
                )}
                <p className="tinyNote">
                  I usually respond within 24 hours. No spam, promised.
                </p>
              </motion.form>
            </motion.div>
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {DATA.name}. Built with React.</p>
        </footer>
      </main>

      <ResumeModal
        open={showResume}
        onClose={() => setShowResume(false)}
        data={DATA}
      />
    </div>
  );
}