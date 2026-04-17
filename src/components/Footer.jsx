import React from "react";

export default function Footer() {
  return (
    <footer className="pf-footer">
      <div className="container pf-footer-inner">
        <p className="pf-footer-text">
          © {new Date().getFullYear()} YourName. Built with React.
        </p>
        <div className="pf-footer-links">
          <a href="#home">Top</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}