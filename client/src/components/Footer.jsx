import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; // React Icons for social media

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 mb-3">
            <h3 className="text-center text-uppercase">Band Hub</h3>
            <p className="text-center">Where Music Meets Collaboration</p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-center">Quick Links</h5>
            <ul className="list-unstyled text-center">
              <li>
                <Link to="/home" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white text-decoration-none">
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/instruments"
                  className="text-white text-decoration-none"
                >
                  Instruments
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-white text-decoration-none"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-center">Follow Us</h5>
            <div className="text-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-3"
              >
                <FaFacebookF size={30} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-3"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-3"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-3"
              >
                <FaYoutube size={30} />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="row mt-4">
          <div className="col-12 text-center mb-3">
            <h5 className="text-uppercase">Subscribe to Our Newsletter</h5>
            <form action="#" className="d-flex justify-content-center">
              <input
                type="email"
                className="form-control w-50"
                placeholder="Enter your email"
                aria-label="Enter your email"
              />
              <button className="btn btn-primary ms-2">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; 2025 Band Hub. All rights reserved.</p>
            <p>Designed with ❤️ for music lovers and artists.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
