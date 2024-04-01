import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import logo from "../logo_small.png";
import default_avatar from "../Static/Elements/avatar.avif";

const Navbar = () => {
  const user = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="logo" className="logo_image"></img>
          <span className="logo_text">VotesUp</span>
        </Link>
      </div>
      <div className="profile">
        <button
          className="profile_btn"
          name="profile"
          aria-label="Profile Button"
          role="button"
        >
          {user ? (
            <img src={user.photoURL} alt="profile photo" />
          ) : (
            <img src={default_avatar} alt="profile photo" />
          )}
        </button>

        <div className="dropdown">
          <ul>
            <Link
              to={user ? "/profile" : "/login"}
              style={{ textDecoration: "none" }}
            >
              <li>Profile ({user ? user.displayName : "Login"})</li>{" "}
            </Link>
            <Link to="/new" style={{ textDecoration: "none" }}>
              <li>Add Poll</li>{" "}
            </Link>

            <Link to="/my_polls" style={{ textDecoration: "none" }}>
              <li>My Polls</li>{" "}
            </Link>

            <Link to="/settings" style={{ textDecoration: "none" }}>
              <li>Settings</li>{" "}
            </Link>

            {user ? (
              <Link to="/logout" style={{ textDecoration: "none" }}>
                <li style={{ color: "#C83F49" }}>Logout</li>{" "}
              </Link>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
