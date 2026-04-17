import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Projects.css';

const projectsData = [
  {
    title: "WazirX — Crypto Exchange Clone",
    category: "clone",
    badge: "Clone",
    tech: "HTML · CSS · JavaScript",
    description: "Pixel-perfect clone of India's largest crypto trading platform WazirX, with responsive layout and interactive UI elements.",
    github: "https://github.com/RavalMunjal/All-Websites",
    live: "https://all-websites-git-main-ravalmunjals-projects.vercel.app/wazirX.com/B.html",
    youtube: "https://youtu.be/TZx1ncGgGbo",
    image: "/projects/wazirx.png"
  },
  {
    title: "Magicbricks — Property Site Clone",
    category: "clone",
    badge: "Clone",
    tech: "HTML · CSS · JavaScript",
    description: "Clone of India's No.1 property portal Magicbricks with Buy, Rent, and Post Property sections fully structured.",
    github: "https://github.com/RavalMunjal/All-Websites",
    live: "https://all-websites-git-main-ravalmunjals-projects.vercel.app/magicbricks.com/index.html",
    image: "/projects/magicbricks.png"
  },
  {
    title: "Aven — Home Equity Card Clone",
    category: "clone",
    badge: "Clone",
    tech: "HTML · CSS · JavaScript",
    description: "Clone of Aven's fintech landing page featuring home equity credit card with APR details, cashback info, and apply flow.",
    github: "https://github.com/RavalMunjal/All-Websites",
    live: "https://all-websites-git-main-ravalmunjals-projects.vercel.app/aven.com/new_clone/index.html",
    youtube: "https://youtu.be/v_hG8gKpYVE",
    image: "/projects/aven.png"
  },
  {
    title: "Ashby — ATS Platform Clone",
    category: "clone",
    badge: "Clone",
    tech: "HTML · CSS · JavaScript",
    description: "Clone of Ashby's all-in-one recruiting platform landing page with AI notetaker feature section and enterprise customer logos.",
    github: "https://github.com/RavalMunjal/All-Websites",
    live: "https://all-websites-git-main-ravalmunjals-projects.vercel.app/Ashby.com/a.html",
    youtube: "https://youtu.be/l6znhUWDL1w",
    image: "/projects/ashby.png"
  },
  {
    title: "Savaari — Intercity Cab Service Clone",
    category: "clone",
    badge: "Clone",
    tech: "HTML · CSS · JavaScript",
    description: "Clone of Savaari's intercity cab booking site with city search, cab selection, and one-way/round-trip booking UI.",
    github: "https://github.com/RavalMunjal/All-Websites",
    live: "https://all-websites-git-main-ravalmunjals-projects.vercel.app/savari.com/savari.html",
    youtube: "https://youtu.be/p3epjZ7Y5Eo",
    image: "/projects/savaari.png"
  },
  {
    title: "SafeVault — Password Manager App",
    category: "original",
    badge: "Original",
    tech: "HTML · CSS · JavaScript",
    description: "Original password manager web app built from scratch with secure vault UI, add/delete/copy credentials functionality.",
    github: "https://github.com/RavalMunjal/safevault",
    live: "https://github.com/RavalMunjal/safevault",
    image: "/projects/safevault.png"
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const filters = ['All', 'Clone', 'Original'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  const handleLinkClick = (e) => {
    const btn = e.currentTarget;
    const liveUrl = btn.getAttribute('data-live');
    const sourceUrl = btn.getAttribute('data-github');
    if (liveUrl) window.open(liveUrl, '_blank');
    else if (sourceUrl) window.open(sourceUrl, '_blank');
  };

  /* progress bar */
  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) { thumb.style.marginLeft = '0%'; return; }
    const ratio = track.scrollLeft / maxScroll;
    thumb.style.marginLeft = ratio * 60 + '%';
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => track.removeEventListener('scroll', updateProgress);
  }, [updateProgress, filteredProjects]);

  /* drag to scroll */
  const onMouseDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    startX.current = e.pageX - track.offsetLeft;
    startScrollLeft.current = track.scrollLeft;
    track.classList.add('prj-dragging');
  };

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.2;
    updateProgress();
  }, [updateProgress]);

  const stopDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current?.classList.remove('prj-dragging');
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, [onMouseMove, stopDrag]);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * 340, behavior: 'smooth' });
    setTimeout(updateProgress, 350);
  };

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        
        {/* Header Section */}
        <div className="secHead">
          <p className="secKicker">WORK</p>
          <h2 id="projects-heading" className="secTitle">Projects</h2>
          <p className="secDesc">
            Real-world website clones and original apps built from scratch.
          </p>
        </div>

        {/* Filter Section */}
        <div className="projects-filter-bar">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-label={`Filter projects by ${f}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Scrollable Track Wrapper */}
        <div className="prj-wrapper">
          <div
            className="prj-track"
            ref={trackRef}
            onMouseDown={onMouseDown}
          >
            {filteredProjects.map((p, index) => (
              <div className="project-card" key={index} data-cat={p.category}>

                {/* Image Area */}
                <div className="project-image-area">
                  <img src={p.image} alt={p.title} className="project-mockup-img" />
                  <div className="project-live-pill">Live</div>
                </div>

                {/* Card Body */}
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <span className="project-tech">{p.tech}</span>
                  <p className="project-desc" title={p.description}>{p.description}</p>

                  {/* Footer buttons row */}
                  <div className="project-footer" style={{ flexWrap: 'wrap', gap: '8px' }}>
                    <button
                      className="btn-github"
                      data-github={p.github}
                      onClick={handleLinkClick}
                      aria-label="View source code on GitHub"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Code
                    </button>

                    <button
                      className="btn-live"
                      data-live={p.live}
                      onClick={handleLinkClick}
                      aria-label="View live project instance"
                    >
                      View Live ↗
                    </button>

                    {p.youtube && (
                      <button
                        className="btn-youtube"
                        onClick={() => window.open(p.youtube, '_blank')}
                        aria-label="View demo on YouTube"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        YouTube Demo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="prj-progress-track">
            <div className="prj-progress-thumb" ref={thumbRef} />
          </div>

          {/* Arrows */}
          <div className="prj-arrows">
            <button className="prj-arrow" aria-label="Scroll left" onClick={() => scrollBy(-1)}>←</button>
            <button className="prj-arrow" aria-label="Scroll right" onClick={() => scrollBy(1)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}