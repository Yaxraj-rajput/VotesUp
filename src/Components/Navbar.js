import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const user = useAuth();

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo_text">VotesUp</span>
        </Link>
      </div>
      <div className="profile">
        <button className="profile_btn">
          {user ? (
            <img src={user.photoURL} />
          ) : (
            <img src="https://yt3.googleusercontent.com/_DiGCcjGwJQAZ3zmlyB8TCYuA8O9tDJ9zGNysq5sR0rxwYb6SP5fW8cb3LbfcRwfui0m27oIhA=s900-c-k-c0x00ffffff-no-rj" />
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

            <Link to="/logout" style={{ textDecoration: "none" }}>
              <li style={{ color: "#C83F49" }}>Logout</li>{" "}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
