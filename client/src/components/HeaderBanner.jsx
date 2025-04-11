import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderBanner = ({ userName, setUserName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    localStorage.removeItem("userName"); // Remove the userName from localStorage
    setUserName("Guest"); // Reset the userName to "Guest"
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div
      className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-primary text-white p-3"
      style={{ position: "relative" }}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0">
        <div className="profile-icon me-3">
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
        <span className="fs-4">{userName}</span>
      </div>

      <div className="text-center w-100 mb-3 mb-md-0">
        <h1 className="m-0">Artist Collaboration Hub</h1>
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderBanner;
