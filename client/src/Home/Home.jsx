// Landing Page Code url -> https://chatgpt.com/share/68539462-b324-8011-a739-378170872611

// src/pages/Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderBanner from "../Others/Banners/HeaderBanner"; // Import HeaderBanner
import Navbar from "../Others/components/Navbar"; // Import Navbar

// Assets
import center2_img from "../assets/center2.webp";
import spotify_img from "../assets/spotify.png";
import amazon_music_img from "../assets/amazon_music.png";
import youtube_img from "../assets/yt_music.png";
import concert_img from "../assets/concert_img.jpg";
import concert_img1 from "../assets/concert_img1.jpg";
import concert_img2 from "../assets/concert_img2.jpg";

import artist_square_1 from "../assets/artist_square_1.jpg";
import artist_square_3 from "../assets/artist_square_3.jpg";
import artist_square_4 from "../assets/artist_square_4.jpg";

import calander_img_logo from "../assets/calander_logo.webp";

const Home = () => {
  const [userData, setUserData] = useState(null);

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
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  return (
    <div className="bg-white">
      <HeaderBanner />
      <Navbar />

      {/* <!-- Header Banner Start --> */}
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
          {/* <!-- Header Banner --> */}
          <div class="row align-items-center">
            {/* <!-- Left Column --> */}
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

            {/* <!-- Right Column --> */}
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
        {/* <!-- Platform Cards Section Start --> */}
        <div class="container my-5">
          <div class="row g-4 justify-content-center">
            {/* <!-- Spotify Card --> */}
            <div class="col-12 col-sm-6 col-md-4">
              <div class="card flex-row p-2 d-flex align-items-center justify-content-between">
                <img
                  src={spotify_img}
                  alt="Spotify"
                  width="40"
                  height="40"
                  class="me-3"
                />
                <p class="text-success fw-bold m-0 p-0">Spotify</p>
                <button class="btn btn-sm mx-2 text-white bg-dark rounded-pill">
                  Connect
                </button>
              </div>
            </div>
            {/* <!-- Amazon  Card --> */}
            <div class="col-12 col-sm-6 col-md-4">
              <div class="card flex-row p-2 d-flex align-items-center justify-content-between">
                <img
                  src={amazon_music_img}
                  alt="Amazon "
                  width="40"
                  height="40"
                  class="me-3"
                />
                <p class="text-success fw-bold m-0 p-0 nowrap">Amazon music</p>
                <button class="btn btn-sm mx-2 text-white bg-dark rounded-pill">
                  Connect
                </button>
              </div>
            </div>
            {/* <!-- Youtube Card --> */}
            <div class="col-12 col-sm-6 col-md-4">
              <div class="card flex-row p-2 d-flex align-items-center justify-content-between">
                <img
                  src={youtube_img}
                  alt="Youtube"
                  width="40"
                  height="40"
                  class="me-3"
                />
                <p class="text-success fw-bold m-0 p-0">Youtube</p>
                <button class="btn btn-sm mx-2 text-white bg-dark rounded-pill">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- card section end --> */}
      </div>
      {/* <!-- Header Banner section end --> */}

      {/* <!-- Popular cards section you start --> */}
      <div class="container py-5">
        <div class="d-flex justify-content-center align-items-center flex-column">
          <div class="row w-100 d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column justify-content-center align-items-center custom-card p-4 border rounded shadow">
              <div class="row w-100 d-flex justify-content-between align-items-center mb-4">
                <div class="col">
                  <h4>Popular in Chennai, India.</h4>
                  <p>What's happening around you...</p>
                </div>
                <div class="col text-end">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a
                        href="./events#event_container"
                        class="text-decoration-none"
                      >
                        <span class="text-decoration-none">
                          View All &rarr;
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- View All Link Sample --> */}
                {/* <!-- <div class="col text-end">
                <ul class="list-unstyled mb-0">
                  <li>
                    <a
                      href="./events.html#events_card_display"
                      class="text-decoration-none"
                    >
                      <span class="text-decoration-none">View All &rarr;</span>
                    </a>
                  </li>
                </ul>
              </div> --> */}
              </div>
              <div class="row g-4">
                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card h-100 shadow-sm">
                    <img
                      src={concert_img}
                      className="card-img-top"
                      alt="Event Image_1"
                    />
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img
                          src={calander_img_logo}
                          alt="Calendar"
                          width="20"
                          height="20"
                          class="me-2"
                        />
                        <p class="mb-0 text-muted small">August 15, 2025</p>
                      </div>
                      <h4 class="card-title">Event Title 1</h4>
                      <p class="card-text">
                        Short description or subtitle of the event goes here.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card h-100 shadow-sm">
                    <img
                      src={concert_img1}
                      class="card-img-top"
                      alt="Event Image_2"
                    />
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img
                          src={calander_img_logo}
                          alt="Calendar"
                          width="20"
                          height="20"
                          class="me-2"
                        />
                        <p class="mb-0 text-muted small">September 2, 2025</p>
                      </div>
                      <h4 class="card-title">Event Title 2</h4>
                      <p class="card-text">
                        Another brief description for this event.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card h-100 shadow-sm">
                    <img
                      src={concert_img2}
                      class="card-img-top"
                      alt="Event Image_3"
                    />
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img
                          src={calander_img_logo}
                          alt="Calendar"
                          width="20"
                          height="20"
                          class="me-2"
                        />
                        <p class="mb-0 text-muted small">October 10, 2025</p>
                      </div>
                      <h4 class="card-title">Event Title 3</h4>
                      <p class="card-text">
                        Details for a third event or content card.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Right section or view all card --> */}
                {/* <!-- Right Column: View All --> */}
                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="h-100 shadow-sm d-flex flex-column align-items-center justify-content-center">
                    <div class="d-flex flex-column align-items-center justify-content-center py-3">
                      <a
                        href="./events#event_container"
                        class="text-decoration-none text-dark"
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
                        <p class="mb-0 fw-semibold">View All</p>
                      </a>
                    </div>
                  </div>
                </div>

                {/* <!-- Right section or view all card End --> */}
                {/* <!-- Right Column: View All End  --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Popular cards section you end --> */}

      {/* <!-- Selling Fast cards section you start --> */}
      <div class="container py-5">
        <div class="d-flex justify-content-center align-items-center flex-column">
          <div class="row w-100 d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column justify-content-center align-items-center custom-card p-4 border rounded shadow">
              <div class="row w-100 d-flex justify-content-between align-items-center mb-4">
                <div class="col">
                  <h4>Selling Fast</h4>
                  <p>Get these tickets while you still can</p>
                </div>
                <div class="col text-end">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a
                        href="./events#event_container"
                        class="text-decoration-none"
                      >
                        <span class="text-decoration-none">
                          View All &rarr;
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row g-4">
                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card h-100 shadow-sm">
                    <img
                      src={artist_square_1}
                      className="card-img-top"
                      alt="Event Image_1"
                    />
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img
                          src={calander_img_logo}
                          alt="Calendar"
                          width="20"
                          height="20"
                          class="me-2"
                        />
                        <p class="mb-0 text-muted small">August 15, 2025</p>
                      </div>
                      <h4 class="card-title">Event Title 1</h4>
                      <p class="card-text">
                        Short description or subtitle of the event goes here.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card h-100 shadow-sm">
                    <img
                      src={artist_square_3}
                      className="card-img-top"
                      alt="Event Image_2"
                    />
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img
                          src={calander_img_logo}
                          alt="Calendar"
                          width="20"
                          height="20"
                          class="me-2"
                        />
                        <p class="mb-0 text-muted small">September 2, 2025</p>
                      </div>
                      <h4 class="card-title">Event Title 2</h4>
                      <p class="card-text">
                        Another brief description for this event.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="card h-100 shadow-sm">
                    <img
                      src={artist_square_4}
                      className="card-img-top"
                      alt="Event Image_3"
                    />
                    <div class="card-body">
                      <div class="d-flex align-items-center mb-2">
                        <img
                          src={calander_img_logo}
                          alt="Calendar"
                          width="20"
                          height="20"
                          class="me-2"
                        />
                        <p class="mb-0 text-muted small">October 10, 2025</p>
                      </div>
                      <h4 class="card-title">Event Title 3</h4>
                      <p class="card-text">
                        Details for a third event or content card.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Right section or view all card --> */}
                {/* <!-- Right Column: View All --> */}
                <div class="col-12 col-sm-6 col-lg-3">
                  <div class="h-100 shadow-sm d-flex flex-column align-items-center justify-content-center">
                    <div class="d-flex flex-column align-items-center justify-content-center py-3">
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

                {/* <!-- Right section or view all card End --> */}
                {/* <!-- Right Column: View All End  --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Selling Fast cards section you end --> */}

      <div className="container-fluid p-0">
        {/* Display the Header Banner first */}
        {/* <HeaderBanner /> */}

        {/* Display the Navbar after the Header Banner */}
        {/* <Navbar /> */}

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
    </div>
  );
};

export default Home;
