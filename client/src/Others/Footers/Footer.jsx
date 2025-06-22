import React from "react";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; // React Icons for social media

// Assets

import Bandsintown_logo from "../../assets/bndsntwon_logo.png";
import facebook_logo from "../../assets/facebook.png";
import twitter_logo from "../../assets/x_logo_new.webp";
import instagram_logo from "../../assets/instagram_logo_new.png";

const Footer = () => {
  return (
    <>
      {/* <!-- Footer Starting --> */}

      <div className="d-flex flex-column align-items-center justify-content-center m-0 bg-white py-3">
        {/* <!-- Quick Links Start --> */}
        <div className="bg-white p-3 rounded shadow-sm">
          <ul className="nav justify-content-center align-items-center flex-wrap">
            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold" href="./home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold" href="./Events">
                Events
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-dark fw-semibold"
                href="./instruments"
              >
                Instrument Rental
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold" href="./community">
                Community
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold" href="./chatbot">
                Chatbot
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold" href="./profile">
                Profile
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- Quick Links End --> */}
        <div className="container">
          <div className="row py-5 text-center text-lg-start">
            {/* <!-- Logo and Title --> */}
            <div className="col-12 col-lg-3 d-flex flex-row align-items-center justify-content-center justify-content-lg-start gap-2 mb-3 mb-lg-0">
              <img
                src={Bandsintown_logo}
                alt="Logo"
                style={{ height: "50px" }}
              />
              <p className="m-0 fs-3 fw-bold">Artist's Hub</p>
            </div>

            {/* <!-- Copyright and Policies --> */}
            <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center gap-1">
              <p className="m-0">© 2011-2025 Bandsintown, LLC</p>
              <p className="m-0">
                Terms of Use | Privacy Policy | Cookie Policy
              </p>
              <p className="m-0">GDPR/CCPA Privacy Request | Cookie Settings</p>
            </div>

            {/* <!-- Socials and Language Selector --> */}
            <div className="col-12 col-lg-3 d-flex flex-column align-items-center align-items-lg-end gap-2 mt-3 mt-lg-0">
              <div className="d-flex gap-2">
                <img
                  src={facebook_logo}
                  alt="Facebook"
                  style={{ height: "30px" }}
                />
                <img
                  src={twitter_logo}
                  alt="Twitter"
                  style={{ height: "30px" }}
                />
                <img
                  src={instagram_logo}
                  alt="Instagram"
                  style={{ height: "30px" }}
                />
              </div>
              <select
                name="language"
                id="lang_selector"
                className="p-1 rounded-pill mt-2"
              >
                <option value="English">English</option>
                <option value="Espanol">Español</option>
                <option value="Francais">Français</option>
                <option value="Portugues">Português</option>
                <option value="Deutsch">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
        {/* <!-- Quick Links End --> */}
      </div>
      {/* <!-- Footer Ending --> */}
    </>

    // <footer className="bg-dark text-white py-5">
    //   <div className="container">
    //     <div className="row">
    //       {/* Logo Section */}
    //       <div className="col-md-4 mb-3">
    //         <h3 className="text-center text-uppercase">Band Hub</h3>
    //         <p className="text-center">Where Music Meets Collaboration</p>
    //       </div>

    //       {/* Navigation Links */}
    //       <div className="col-md-4 mb-3">
    //         <h5 className="text-center">Quick Links</h5>
    //         <ul className="list-unstyled text-center">
    //           <li>
    //             <Link to="/" className="text-white text-decoration-none">
    //               Home
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to="/events" className="text-white text-decoration-none">
    //               Events
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/instruments"
    //               className="text-white text-decoration-none"
    //             >
    //               Instruments
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/community"
    //               className="text-white text-decoration-none"
    //             >
    //               Community
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Social Media Links */}
    //       <div className="col-md-4 mb-3">
    //         <h5 className="text-center">Follow Us</h5>
    //         <div className="text-center">
    //           <a
    //             href="https://facebook.com"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="text-white mx-3"
    //           >
    //             <FaFacebookF size={30} />
    //           </a>
    //           <a
    //             href="https://instagram.com"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="text-white mx-3"
    //           >
    //             <FaInstagram size={30} />
    //           </a>
    //           <a
    //             href="https://twitter.com"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="text-white mx-3"
    //           >
    //             <FaTwitter size={30} />
    //           </a>
    //           <a
    //             href="https://youtube.com"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             className="text-white mx-3"
    //           >
    //             <FaYoutube size={30} />
    //           </a>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Newsletter Signup */}
    //     <div className="row mt-4">
    //       <div className="col-12 text-center mb-3">
    //         <h5 className="text-uppercase">Subscribe to Our Newsletter</h5>
    //         <form action="#" className="d-flex justify-content-center">
    //           <input
    //             type="email"
    //             className="form-control w-50"
    //             placeholder="Enter your email"
    //             aria-label="Enter your email"
    //           />
    //           <button className="btn btn-primary ms-2">Subscribe</button>
    //         </form>
    //       </div>
    //     </div>

    //     {/* Footer Bottom Section */}
    //     <div className="row mt-4">
    //       <div className="col-12 text-center">
    //         <p className="mb-0">&copy; 2025 Band Hub. All rights reserved.</p>
    //         <p>Designed with ❤️ for music lovers and artists.</p>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;
