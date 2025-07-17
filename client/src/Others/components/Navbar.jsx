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
                to="/events"
                className="nav-link"
                activeClassName="active"
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/instruments"
                className="nav-link"
                activeClassName="active"
              >
                Instrument Rental
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/community"
                className="nav-link"
                activeClassName="active"
              >
                Community
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/learning"
                className="nav-link"
                activeClassName="active"
              >
                Learning
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/chatbot"
                className="nav-link"
                activeClassName="active"
              >
                Chatbot
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
