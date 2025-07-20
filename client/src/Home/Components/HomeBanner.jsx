import { useNavigate } from "react-router-dom";

import { MusicPlatformData } from "../Assets/MusicPlatformData";
import MusicPlatformCard from "./MusicPlatformCard";

import center2_img from "../../assets/center2.jpg";

const HomeBanner = ({ userName }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleGetStartedClick = () => {
    navigate("/login"); // Navigate to home page
  };

  return (
    <>
      {/*  Header Banner Start  */}
      <div
        style={{
          background: "linear-gradient(180deg, #0053cc 26.69%, #00cec8 66.18%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "42px 27px 37px",
        }}
      >
        <div class="container my-5">
          {/*  Header Banner  */}
          <div class="row align-items-center">
            {/*  Left Column */}
            <div class="col-12 col-md-8 mb-4 mb-md-0 text-white p-0">
              <div className="container">
                <div className="row">
                  <div className="col-12 p-0">
                    <h1
                      className="fw-semibold"
                      style={{
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: "1.5rem", // default mobile size
                      }}
                    >
                      <span className="d-block d-md-none">
                        Welcome, {userName ? `${userName}` : "Guest"}
                        <br />
                        Never miss a show
                      </span>
                      <span
                        className="d-none d-md-block"
                        style={{
                          fontSize: "2.5rem", // desktop size
                        }}
                      >
                        Welcome, {userName ? `${userName}` : "Guest"}
                        <br />
                        Never miss a show
                      </span>
                    </h1>
                  </div>
                </div>
              </div>

              <p class="lead" style={{ fontWeight: 400 }}>
                Discover amazing content, connect with creators, and explore new
                ideas.
              </p>

              <div className="mb-3">
                {userName === "Guest" ? (
                  <button
                    className="btn btn-dark"
                    onClick={handleGetStartedClick}
                  >
                    Get Started
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Right Column  */}
            <div class="col-12 col-md-4">
              <img
                src={center2_img}
                className="img-fluid w-100 h-100 object-fit-cover rounded"
                alt="center_img"
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
          </div>
        </div>
        {/*  Platform Cards Section Start */}
        <div className="container my-5">
          <div className="row g-4 justify-content-center">
            {MusicPlatformData.map((platform, index) => (
              <MusicPlatformCard
                key={index}
                imgSrc={platform.imgSrc}
                alt={platform.alt}
                name={platform.name}
              />
            ))}
          </div>
        </div>

        {/* card section end  */}
      </div>
      {/*  Header Banner section end  */}
    </>
  );
};

export default HomeBanner;
