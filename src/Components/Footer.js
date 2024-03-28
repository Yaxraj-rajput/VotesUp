import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="social_links">
          <a href="https://www.instagram.com/">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"></img>
          </a>

          <a href="https://www.linkedin.com/">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img>
          </a>
          <a href="https://www.github.com/">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png"></img>
          </a>
          <a href="https://www.youtube.com/">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"></img>
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
