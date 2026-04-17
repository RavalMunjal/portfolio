import React, { useRef } from "react";
import "./Resume.css";

export default function ResumeModal({ open, onClose, data }) {
    if (!open) return null;
    const pageRef = useRef(null);

    const handlePrint = () => {
        const content = pageRef.current;
        if (!content) return;

        const printWindow = window.open("", "_blank", "width=900,height=700");
        printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Munjal Raval — Resume</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0; padding: 0;
      width: 210mm; height: 297mm;
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #fff;
    }
    /* ── Page layout ── */
    .rPage {
      width: 210mm; height: 297mm;
      display: flex; flex-direction: row;
      overflow: hidden;
      background: #fff;
    }
    /* ── SIDEBAR ── */
    .rSide {
      width: 62mm; flex-shrink: 0;
      background: #1a2744;
      padding: 10mm 5mm 8mm 5mm;
      display: flex; flex-direction: column;
      gap: 0;
    }
    .rAvatarWrap {
      width: 20mm; height: 20mm; border-radius: 50%;
      overflow: hidden; border: 2px solid #2563eb;
      margin: 0 auto 8mm; flex-shrink: 0;
    }
    .rAvatar { width: 100%; height: 100%; object-fit: cover; display: block; }
    .rSideBlock { margin-bottom: 5mm; }
    .rSideHead {
      font-size: 7pt; font-weight: 800;
      letter-spacing: 1.5px; text-transform: uppercase;
      color: #60a5fa;
      border-bottom: 0.5px solid rgba(59,130,246,0.35);
      padding-bottom: 1.5mm; margin-bottom: 2.5mm;
    }
    .rSideList { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1.8mm; }
    .rSideList li { display: flex; align-items: flex-start; gap: 1.5mm; font-size: 7.5pt; line-height: 1.4; color: #a8c0dc; word-break: break-all; }
    .rSideList li a { color: #a8c0dc; text-decoration: none; }
    .rIcon { font-size: 6.5pt; font-style: normal; font-weight: 700; background: rgba(37,99,235,0.3); color: #60a5fa; border-radius: 2px; padding: 0.3mm 1.2mm; flex-shrink: 0; margin-top: 0.5mm; }
    .rBulletList { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1.5mm; }
    .rBulletList li { font-size: 7.5pt; color: #a8c0dc; line-height: 1.4; padding-left: 3.5mm; position: relative; }
    .rBulletList li::before { content: "▸"; position: absolute; left: 0; top: 0; color: #3b82f6; font-size: 7pt; }
    .rEdu { font-size: 7.5pt; color: #a8c0dc; }
    .rEduTitle { font-weight: 700; font-size: 8pt; color: #e2e8f0; }
    .rEduSub { margin-top: 0.5mm; }
    .rEduYear { margin-top: 1mm; color: #3b82f6; font-weight: 600; font-size: 7.5pt; }
    .rCerts { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2mm; }
    .rCerts li { font-size: 7.5pt; color: #a8c0dc; }
    .rCertName { font-weight: 600; color: #cde0f8; font-size: 7.5pt; }
    .rCertMeta { font-size: 7pt; color: #6e8ab0; margin-top: 0.5mm; }
    .rLangs { font-size: 7.5pt; color: #a8c0dc; }
    /* ── MAIN COLUMN ── */
    .rMainCol {
      flex: 1; background: #fff;
      padding: 9mm 8mm 8mm 7mm;
      display: flex; flex-direction: column; gap: 0;
      overflow: hidden;
    }
    .rHeader { border-bottom: 1.5px solid #dbeafe; padding-bottom: 3mm; margin-bottom: 3.5mm; }
    .rName { font-size: 22pt; font-weight: 900; color: #2563eb; margin: 0 0 1mm; letter-spacing: -0.4px; line-height: 1.1; }
    .rRole { font-size: 8pt; font-weight: 700; color: #374151; margin: 0 0 2mm; line-height: 1.35; }
    .rContactRow { display: flex; flex-wrap: wrap; gap: 1mm 5mm; font-size: 7pt; color: #6b7280; }
    .rSec { margin-bottom: 3.5mm; }
    .rSecTitle { font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #2563eb; border-bottom: 1px solid #dbeafe; padding-bottom: 1.5mm; margin-bottom: 2.5mm; }
    .rText { font-size: 8pt; line-height: 1.5; color: #374151; margin: 0; text-align: justify; }
    .rExpBlock { margin-bottom: 2mm; }
    .rExpRow { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
    .rExpCo { font-size: 9.5pt; font-weight: 800; color: #111827; }
    .rExpDate { font-size: 7pt; color: #6b7280; white-space: nowrap; }
    .rExpRole { font-size: 8pt; font-weight: 600; color: #2563eb; margin: 0.5mm 0 2mm; }
    .rBullets { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1.5mm; }
    .rBullets li { font-size: 7.5pt; line-height: 1.5; color: #374151; padding-left: 4mm; position: relative; }
    .rBullets li::before { content: "●"; position: absolute; left: 0.5mm; top: 0.5mm; color: #2563eb; font-size: 5pt; line-height: 2; }
    .rProjGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; }
    .rProj { border: 0.5px solid #dbeafe; border-radius: 3px; padding: 2.5mm 3mm; background: #f5f9ff; }
    .rProjRow { display: flex; justify-content: space-between; align-items: flex-start; gap: 2mm; margin-bottom: 1.5mm; }
    .rProjName { font-size: 8.5pt; font-weight: 700; color: #1e3a5f; }
    .rProjTag { font-size: 6.5pt; background: #2563eb; color: #fff; border-radius: 2px; padding: 0.5mm 2mm; white-space: nowrap; font-weight: 600; flex-shrink: 0; }
    .rProj p { font-size: 7pt; color: #4b5563; margin: 0; line-height: 1.4; }
  </style>
</head>
<body>
  ${content.outerHTML}
</body>
</html>`);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 600);
    };

    return (
        <div className="rOverlay" onClick={onClose}>
            {/* ── Toolbar ── */}
            <div className="rToolbar" onClick={(e) => e.stopPropagation()}>
                <span className="rToolbarTitle">📄 {data.name} — Resume</span>
                <div className="rToolbarBtns">
                    <button className="rBtn rBtnPrimary" onClick={handlePrint}>🖨 Print / Save PDF</button>
                    <button className="rBtn" onClick={onClose}>✕ Close</button>
                </div>
            </div>

            {/* ── A4 Page ── */}
            <div className="rPageWrap" onClick={(e) => e.stopPropagation()} ref={pageRef}>
                <div className="rPage" id="resumePage">

                    {/* ════ LEFT SIDEBAR ════ */}
                    <aside className="rSide">

                        <div className="rAvatarWrap">
                            <img
                                src="https://res.cloudinary.com/dpoa5mehq/image/upload/v1770271314/photo_xj0sms.jpg"
                                alt="Munjal Raval"
                                className="rAvatar"
                                crossOrigin="anonymous"
                            />
                        </div>

                        {/* CONTACT */}
                        <div className="rSideBlock">
                            <div className="rSideHead">Contact</div>
                            <ul className="rSideList">
                                <li><span className="rIcon">✉</span>munjal.raval.cg@gmail.com</li>
                                <li><span className="rIcon">📍</span>Gujarat, India</li>
                                <li><span className="rIcon">in</span><a href="https://www.linkedin.com/in/munjal-raval-aa66013a2" target="_blank" rel="noreferrer">LinkedIn/MunjalRaval</a></li>
                                <li><span className="rIcon">gh</span><a href="https://github.com/RavalMunjal" target="_blank" rel="noreferrer">GitHub/RavalMunjal</a></li>
                                <li><span className="rIcon">🌐</span>LeetCode/MunjalRaval_555</li>
                            </ul>
                        </div>

                        {/* SKILLS */}
                        <div className="rSideBlock">
                            <div className="rSideHead">Technical Skills</div>
                            <ul className="rBulletList">
                                <li>HTML5 &amp; CSS3</li>
                                <li>JavaScript (ES6+)</li>
                                <li>React.js</li>
                                <li>Node.js &amp; Express.js</li>
                                <li>MongoDB &amp; REST APIs</li>
                                <li>Git &amp; GitHub</li>
                                <li>Figma / UI-UX Design</li>
                                <li>Three.js &amp; Framer Motion</li>
                                <li>C &amp; C++</li>
                                <li>Data Structures &amp; Algo</li>
                                <li>Responsive Design</li>
                                <li>Redux</li>
                            </ul>
                        </div>

                        {/* EDUCATION */}
                        <div className="rSideBlock">
                            <div className="rSideHead">Education</div>
                            <div className="rEdu">
                                <div className="rEduTitle">Bachelor of Engineering</div>
                                <div className="rEduSub">Computer Engineering</div>
                                <div className="rEduYear">2025 – 2029</div>
                            </div>
                        </div>

                        {/* CERTIFICATIONS */}
                        <div className="rSideBlock">
                            <div className="rSideHead">Certifications</div>
                            <ul className="rCerts">
                                <li>
                                    <div className="rCertName">JavaScript (Intermediate)</div>
                                    <div className="rCertMeta">HackerRank · 2026</div>
                                </li>
                                <li>
                                    <div className="rCertName">GitHub Copilot Intro</div>
                                    <div className="rCertMeta">Simplilearn · 2026</div>
                                </li>
                                <li>
                                    <div className="rCertName">React (Basic)</div>
                                    <div className="rCertMeta">HackerRank · 2025</div>
                                </li>
                                <li>
                                    <div className="rCertName">REST API (Intermediate)</div>
                                    <div className="rCertMeta">HackerRank · 2025</div>
                                </li>
                            </ul>
                        </div>

                        {/* LANGUAGES */}
                        <div className="rSideBlock">
                            <div className="rSideHead">Languages</div>
                            <div className="rLangs">English &nbsp;|&nbsp; Hindi &nbsp;|&nbsp; Gujarati</div>
                        </div>

                    </aside>

                    {/* ════ MAIN COLUMN ════ */}
                    <main className="rMainCol">

                        {/* NAME + ROLE */}
                        <header className="rHeader">
                            <h1 className="rName">Munjal Raval</h1>
                            <div className="rRole">Web Developer &amp; Frontend Engineer &nbsp;|&nbsp; React.js · Node.js · MERN Stack · UI/UX</div>
                            <div className="rContactRow">
                                <span>✉ munjal.raval.cg@gmail.com</span>
                                <span>📍 Gujarat, India</span>
                                <span>gh github.com/RavalMunjal</span>
                                <span>in LinkedIn/MunjalRaval</span>
                            </div>
                        </header>

                        {/* PROFILE SUMMARY */}
                        <section className="rSec">
                            <div className="rSecTitle">Profile Summary</div>
                            <p className="rText">
                                Passionate <strong>Full Stack Web Developer</strong> with strong expertise in
                                HTML5, CSS3, JavaScript, React.js, Node.js, and MongoDB. Skilled at building
                                pixel-perfect, responsive UIs from Figma designs and developing robust REST APIs.
                                Solid programming base in <strong>C &amp; C++</strong> and Data Structures. Built
                                12+ significant real-world projects, published 4 YouTube tutorial walkthroughs, and
                                deployed 7 interactive mini-games. Currently <strong>Open To Work</strong> — eager
                                to contribute to innovative teams and deliver outstanding user experiences.
                            </p>
                        </section>

                        {/* WORK EXPERIENCE */}
                        <section className="rSec">
                            <div className="rSecTitle">Work Experience</div>
                            <div className="rExpBlock">
                                <div className="rExpRow">
                                    <span className="rExpCo">Self-Employed / Freelance Web Developer</span>
                                    <span className="rExpDate">2025 – Present</span>
                                </div>
                                <div className="rExpRole">Frontend &amp; Full Stack Developer &nbsp;·&nbsp; Remote</div>
                                <ul className="rBullets">
                                    <li>Designed and developed <strong>12+ full-stack web projects</strong> using React.js, Node.js, Express, and MongoDB — including FinCtrl (Finance Tracker), YouTube Clone, WazirX Clone, Aven Clone, Ashby Clone, and Savaari Clone.</li>
                                    <li>Delivered <strong>pixel-perfect UI/UX</strong> implementations from Figma designs with fully responsive layouts across all screen sizes.</li>
                                    <li>Built and integrated <strong>REST APIs</strong>, optimized performance, SEO, and load times for every project.</li>
                                    <li>Published <strong>4 YouTube walkthrough videos</strong> demonstrating real-world full-stack clone projects — attracting a developer audience.</li>
                                    <li>Developed <strong>7 interactive mini-games</strong> in JavaScript (Click Counter, Color Guessing, Whack-a-Mole, Typing Speed, Memory Flip, To-Do Game, Snake Slider) — deployed live on Netlify.</li>
                                    <li>Built a dynamic personal portfolio with <strong>Three.js 3D animations</strong> and Framer Motion, featuring a printable resume modal.</li>
                                </ul>
                            </div>
                        </section>

                        {/* KEY PROJECTS */}
                        <section className="rSec">
                            <div className="rSecTitle">Key Projects</div>
                            <div className="rProjGrid">
                                <div className="rProj">
                                    <div className="rProjRow">
                                        <span className="rProjName">FinCtrl — Finance Tracker</span>
                                        <span className="rProjTag">MERN Stack</span>
                                    </div>
                                    <p>Full-stack Finance Tracker with auth, charts, budget management &amp; MongoDB. Built with MongoDB, Express, React, Node.js.</p>
                                </div>
                                <div className="rProj">
                                    <div className="rProjRow">
                                        <span className="rProjName">WazirX / Aven / Ashby Clone</span>
                                        <span className="rProjTag">React · CSS3</span>
                                    </div>
                                    <p>Pixel-perfect production site clones with responsive design. Each has a full YouTube demo walkthrough video.</p>
                                </div>
                                <div className="rProj">
                                    <div className="rProjRow">
                                        <span className="rProjName">YouTube Mini Clone</span>
                                        <span className="rProjTag">React · YouTube API</span>
                                    </div>
                                    <p>Functional YouTube clone with video playback, search, and a modern responsive UI matching the original platform.</p>
                                </div>
                                <div className="rProj">
                                    <div className="rProjRow">
                                        <span className="rProjName">Personal Portfolio</span>
                                        <span className="rProjTag">React · Three.js · Framer</span>
                                    </div>
                                    <p>Dark-mode portfolio with Three.js 3D hero, Framer Motion animations, skills cloud, games section &amp; printable CV.</p>
                                </div>
                            </div>
                        </section>

                        {/* ACHIEVEMENTS */}
                        <section className="rSec">
                            <div className="rSecTitle">Achievements &amp; Highlights</div>
                            <ul className="rBullets">
                                <li>Earned <strong>HackerRank certifications</strong> in JavaScript (Intermediate), REST API (Intermediate), and React (Basic) — validating core frontend &amp; backend skills.</li>
                                <li>Completed <strong>Introduction to GitHub Copilot</strong> (Simplilearn, 2026) — adopting AI-assisted development workflows.</li>
                                <li>Deployed 7 browser-based games live on <strong>Netlify</strong> — showcasing JavaScript DOM skills and creative game-loop logic.</li>
                                <li>Maintained <strong>100% on-time delivery</strong> across all freelance and personal projects, consistently exceeding quality targets.</li>
                            </ul>
                        </section>

                    </main>
                </div>
            </div>
        </div>
    );
}
