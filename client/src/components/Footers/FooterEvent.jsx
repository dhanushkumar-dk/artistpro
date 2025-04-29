import React from "react";

const FooterEvent = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; 2025 Eventopia. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="#privacy" className="text-white text-decoration-none">
            Privacy Policy
          </a>
          <a href="#terms" className="text-white text-decoration-none">
            Terms of Use
          </a>
          <a href="#support" className="text-white text-decoration-none">
            Support
          </a>
        </div>
        <div className="mt-3">
          <i className="bi bi-facebook me-3"></i>
          <i className="bi bi-twitter me-3"></i>
          <i className="bi bi-instagram"></i>
        </div>
      </div>
    </footer>
  );
};

export default FooterEvent;
