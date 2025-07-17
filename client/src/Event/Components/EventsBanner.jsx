import React from "react";
import { useNavigate } from "react-router-dom";
import heroBannerImage from "../assets_event/heroBannerTablet.png"; // Import the image

const EventsBanner = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleGetStartedClick = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="container-fluid p-0">
      <div
        className="d-flex flex-column align-items-start justify-content-start text-left"
        style={{
          backgroundImage: `url(${heroBannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 1)",
          padding: "30px",
        }}
      >
        <div className="mb-3">
          <h1>Find concerts near you</h1>
        </div>

        <svg
          className="col-6 col-sm-6 col-md-6 m-0 p-0 "
          height="2"
          viewBox="0 0 600 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M300.046 0H200.064V2H300.046V0Z" fill="#00CEC8"></path>
          <path d="M200.054 0H100.072V2H200.054V0Z" fill="#C567D7"></path>
          <path d="M400.027 0H300.045V2H400.027V0Z" fill="#FFAD00"></path>
          <path d="M99.9816 0H0V2H99.9816V0Z" fill="#CCA35C"></path>
          <path d="M500.019 0H400.037V2H500.019V0Z" fill="#0053CC"></path>
          <path d="M600 0H500.019V2H600V0Z" fill="#EB0049"></path>
        </svg>

        <div className="mb-3">
          <p>
            Get personalized concert recommendations and stay connected with
            your favorite artists
          </p>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsBanner;
