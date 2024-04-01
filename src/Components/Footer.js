import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="social_links">
          <a
            target="_blank"
            href="https://www.instagram.com/yaxraj_dabhi/"
            aria-label="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/yaxraj-dabhi/"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            target="_blank"
            href="https://github.com/Yaxraj-rajput/"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/@looppencil6612"
            aria-label="YouTube"
          >
            <i className="bi bi-youtube"></i>
          </a>
        </div>
      </div>
      <div className="bottom">
        <div className="footer_text">
          <span>© 2024 VotesUp by Yaxraj</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
