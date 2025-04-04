import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderBanner = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setUserName(`${res.data.firstName} ${res.data.lastName}`);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setUserName("Guest"); // Reset the userName to "Guest"
    navigate("/login"); // Navigate to the home page or login page
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center bg-primary text-white p-3"
      style={{ position: "relative" }}
    >
      {/* Profile icon and username on the left */}
      <div className="d-flex align-items-center">
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

      {/* Title in the center */}
      <div className="text-center w-100">
        <h1 className="m-0">Artist Collaboration Hub</h1>
      </div>

      {/* Logout button on the right */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderBanner;
