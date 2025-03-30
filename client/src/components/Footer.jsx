import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Your ultimate platform for music bands and artists to collaborate,
            perform, and rent instruments with ease.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/login">Explore</Link>
            </li>
            <li>
              <Link to="/register">Rentals</Link>
            </li>
            <li>
              <Link to="/home">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact</h2>
          <p>Email: support@musiccollab.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2025 Music Band & Artist Collaboration Hub. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
