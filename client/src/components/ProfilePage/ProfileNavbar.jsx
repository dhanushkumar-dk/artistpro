import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Remove the "Band Hub" title and use the container to center-align items */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {" "}
            {/* 'mx-auto' to center align the items */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className="nav-link"
                activeClassName="active"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/MyInstruments"
                className="nav-link"
                activeClassName="active"
              >
                Instruments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/my-tickets"
                className="nav-link"
                activeClassName="active"
              >
                My Tickets
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/MyEvents"
                className="nav-link"
                activeClassName="active"
              >
                MyEvents
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/activity"
                className="nav-link"
                activeClassName="active"
              >
                Activity
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
