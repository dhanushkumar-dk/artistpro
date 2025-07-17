// Landing Page Code url -> https://chatgpt.com/share/68539462-b324-8011-a739-378170872611

// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { BACKEND_BASE_URL } from "../config";

// Assets
import {
  popularEventsData,
  sellingFastEventsData,
} from "./Assets/homeRecommendationEventsData";
import { MusicPlatformData } from "./Assets/MusicPlatformData";
import MusicPlatformCard from "./Components/MusicPlatformCard";

import center2_img from "../assets/center2.jpg";
import calander_img_logo from "../assets/calander_logo.jpg";
import greyPin from "../assets/greyPin.svg";
import { RecommendationEventCard } from "./Components/RecommendationEventCard";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${BACKEND_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  return (
    <div className="bg-white">
      {/*  Header Banner Start  */}
      <div
        class="header-banner"
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
            <div class="col-12 col-md-8 mb-4 mb-md-0 text-white">
              <h1 class="display-4">
                <span
                  style={{
                    fontWeight: 600,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: "3rem",
                  }}
                >
                  Never miss a show
                </span>
              </h1>
              <p class="lead" style={{ fontWeight: 400 }}>
                Discover amazing content, connect with creators, and explore new
                ideas.
              </p>
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

      {/* Popular cards section you start  */}
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="row w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center custom-card p-4 border rounded shadow">
              {/* Row 1: Heading and View All */}
              <div className="row w-100 d-flex justify-content-between align-items-center mb-4">
                <div className="col">
                  <h4>Popular in Chennai, India.</h4>
                  <p>What's happening around you</p>
                </div>
                <div className="col text-end">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a
                        href="./events#event_container"
                        className="text-decoration-none"
                      >
                        <span className="text-decoration-none">
                          View All &rarr;
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Conditional Rendering */}
              {popularEventsData.length === 0 ? (
                <>
                  <img src={greyPin} alt="No events" />
                  <p className="mt-3 mb-1 fw-bold">No upcoming events</p>
                  <p className="text-muted mb-3">Try something else</p>

                  <div className="d-flex align-items-center justify-content-center gap-3 w-100">
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Follow More Artists
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Adjust My Location
                    </Link>
                  </div>
                </>
              ) : (
                <div className="row g-4">
                  {popularEventsData.map((event, index) => (
                    <RecommendationEventCard
                      key={index}
                      image={event.image}
                      date={event.date}
                      title={event.title}
                      description={event.description}
                      calendarIcon={calander_img_logo}
                    />
                  ))}

                  {/* View All Card */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="h-100 shadow-sm d-flex flex-column align-items-center justify-content-center">
                      <div className="d-flex flex-column align-items-center justify-content-center py-3">
                        <a
                          href="./events#event_container"
                          className="text-decoration-none text-dark"
                        >
                          <div
                            className="rounded-circle shadow d-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f8f9fa",
                            }}
                          >
                            &rarr;
                          </div>
                          <p className="mb-0 fw-semibold">View All</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* View All Card End */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Popular cards section you end  */}

      {/* Selling Fast cards section you start */}
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="row w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center custom-card p-4 border rounded shadow">
              {/* Row 1: Heading and View All */}
              <div className="row w-100 d-flex justify-content-between align-items-center mb-4">
                <div className="col">
                  <h4>Selling Fast</h4>
                  <p>Get these tickets while you still can</p>
                </div>
                <div className="col text-end">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a
                        href="./events#event_container"
                        className="text-decoration-none"
                      >
                        <span className="text-decoration-none">
                          View All &rarr;
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Conditional Rendering */}
              {sellingFastEventsData.length === 0 ? (
                <>
                  <img src={greyPin} alt="No events" />
                  <p className="mt-3 mb-1 fw-bold">No upcoming events</p>
                  <p className="text-muted mb-3">Try something else</p>

                  <div className="d-flex align-items-center justify-content-center gap-3 w-100">
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Follow More Artists
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Adjust My Location
                    </Link>
                  </div>
                </>
              ) : (
                <div className="row g-4">
                  {sellingFastEventsData.map((event, index) => (
                    <RecommendationEventCard
                      key={index}
                      image={event.image}
                      date={event.date}
                      title={event.title}
                      description={event.description}
                      calendarIcon={calander_img_logo}
                    />
                  ))}

                  {/* View All Card */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="h-100 shadow-sm d-flex flex-column align-items-center justify-content-center">
                      <div className="d-flex flex-column align-items-center justify-content-center py-3">
                        <a
                          href="./events#event_container"
                          className="text-decoration-none text-dark"
                        >
                          <div
                            className="rounded-circle shadow d-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f8f9fa",
                            }}
                          >
                            &rarr;
                          </div>
                          <p className="mb-0 fw-semibold">View All</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* View All Card End */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Selling Fast cards section you end */}

      {/* Login Recommendation or User data display start */}

      <div className="container-fluid p-0">
        {userData ? (
          <>
            {/* Display user content in a table */}
            <div className="container mt-5">
              <div className="row">
                <div className="col-12 mb-4">
                  <h3 className="display-4">User Information</h3>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    {/* Full Name */}
                    <tr>
                      <th scope="row">Full Name</th>
                      <td>
                        {userData.firstName} {userData.lastName}
                      </td>
                    </tr>

                    {/* Email */}
                    <tr>
                      <th scope="row">Email</th>
                      <td>{userData.email}</td>
                    </tr>

                    {/* Role */}
                    <tr>
                      <th scope="row">Role</th>
                      <td>{userData.role}</td>
                    </tr>

                    {/* Instruments (only for Musicians) */}
                    {userData.role === "Musician" && (
                      <tr>
                        <th scope="row">Instruments</th>
                        <td>{userData.instruments.join(", ")}</td>
                      </tr>
                    )}

                    {/* Description (only for Artists) */}
                    {userData.role === "Artist" && (
                      <tr>
                        <th scope="row">Description</th>
                        <td>{userData.description}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="container mt-5 d-flex flex-column align-items-center">
            <h2>Welcome, Guest!</h2>
            <div className="nav-log-reg p-2">
              <Link to="/login">
                <button className="btn btn-primary m-1">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary m-1">Register</button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Login Recommendation or User data display end */}
    </div>
  );
};

export default Home;
