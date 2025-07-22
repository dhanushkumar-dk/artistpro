import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const HeaderBanner = ({ userName, setUserName, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("Guest");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  return (
    <>
      <style>
        {`  .responsive-username {
              font-size: 0.7rem; /* much smaller on mobile */
            }
          
            

            @media (min-width: 768px) {
              .responsive-username {
                font-size: 1rem; /* Bootstrap fs-6 equivalent */
              }
            }
            @media (min-width: 768px) {
              .responsive-username {
                font-size: 1rem; /* Bootstrap fs-6 equivalent */
              }

              .responsive-header {
                font-size: 1rem;
              }
            }
            `}
      </style>
      <div
        className="d-flex justify-content-between align-items-center bg-dark text-white p-1   "
        style={{ position: "relative" }}
      >
        {/* Title in the center */}
        <div className="text-center flex-grow-1">
          <Link to="/" className="text-decoration-none text-white">
            <h1 className="m-0 p-0 fs-6 fs-md-2 fw-bold ">
              Artist Collaboration Hub
            </h1>
          </Link>
        </div>

        {/* Profile or Login section on the right */}
        <div
          className="d-flex align-items-center position-relative ms-auto"
          ref={dropdownRef}
        >
          {isLoggedIn ? (
            <>
              <div
                className="d-flex flex-column align-items-center p-0"
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              >
                <div className="profile-icon">
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
                <span className="responsive-username">{userName}</span>
              </div>

              {showDropdown && (
                <div
                  className="position-absolute bg-white text-dark shadow rounded p-2"
                  style={{ top: "60px", right: 0, zIndex: 1000 }}
                >
                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/");
                      setShowDropdown(false);
                    }}
                  >
                    Home
                  </div>
                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={handleProfileClick}
                  >
                    Profile
                  </div>
                  <div
                    className="dropdown-item text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-between gap-3 mx-1">
              <button
                className="btn btn-light btn-sm col-5 fw-bold"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="btn btn-light btn-sm col-7 fw-bold"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderBanner;
