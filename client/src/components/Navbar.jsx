import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import cartlogo from "./Assets/cart_icon.png";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/home" className="navbar-title">
          🎸 Artists Collaboration Hub
        </Link>
        {/* <h1 className="navbar-title">🎸 Artists Collaboration Hub</h1> */}

        <div
          className={`profile-section ${isDropdownOpen ? "active" : ""}`}
          onClick={toggleDropdown}
        >
          <div className="profile-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0 3c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5zm-8 5c0-1.99 5.33-3 8-3s8 1.01 8 3v1H4v-1z" />
            </svg>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {!isLoggedIn ? (
                <Link to="/login">Sign In</Link>
              ) : (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/profile">Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={logout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
      <nav className="navbar">
        <Link className="nav-elements" to="/events">
          Events
        </Link>
        <Link className="nav-elements" to="/events">
          Artists
        </Link>
        <Link className="nav-elements" to="/events">
          Instruments
        </Link>
        <Link className="nav-elements" to="/events">
          Community
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
