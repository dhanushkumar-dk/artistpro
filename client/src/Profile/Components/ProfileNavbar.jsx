import { NavLink } from "react-router-dom";

const ProfileNavbar = () => {
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
          {/* 'mx-auto' to center align the items */}
          {/* <ul className="navbar-nav mx-auto"> */}
          <ul className="navbar-nav ">
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
            {/* to="/MyInstruments" */}
            <li className="nav-item">
              <NavLink
                to="/profile/my-instruments"
                className="nav-link"
                activeClassName="active"
              >
                Instruments
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
