// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import HeaderBanner from "../components/HeaderBanner";
// import Navbar from "../components/Navbar"; // Import the Navbar component

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
        <div className="container  mt-5">
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
  );
};

export default Home;
