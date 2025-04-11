import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/Home";
import Events from "./pages/Events";
import HeaderBanner from "./components/HeaderBanner"; // Import HeaderBanner
import Navbar from "./components/Navbar"; // Import Navbar
import Chatbot from "./pages/Chatbot";
import MyTickets from "./pages/MyTickets";
import Learning from "./pages/Learning";
import Community from "./pages/Community";
import Instruments from "./pages/Instruments";
import Footer from "./components/Footer";

const App = () => {
  const [userName, setUserName] = useState("Guest"); // Default to 'Guest'
  const [loading, setLoading] = useState(true); // Loading state to show loading until data is available

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Check if the username is already stored in localStorage
      const storedUserName = localStorage.getItem("userName");

      if (storedUserName) {
        // If userName is found in localStorage, set it immediately
        setUserName(storedUserName);
        setLoading(false); // Set loading to false after loading user data
      } else {
        // If userName is not in localStorage, fetch it from the API
        axios
          .get("http://localhost:5000/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data) {
              const fullName = `${res.data.firstName} ${res.data.lastName}`;
              setUserName(fullName);
              localStorage.setItem("userName", fullName); // Save the userName in localStorage
            }
            setLoading(false); // Set loading to false once the API call is complete
          })
          .catch((err) => {
            console.error("Error fetching user data:", err);
            setLoading(false); // Ensure loading is turned off in case of error
          });
      }
    } else {
      setLoading(false); // If no token, no need to make an API call, just set loading to false
    }
  }, []);

  if (loading) {
    // Show a loading state while the user info is being fetched or initialized
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <HeaderBanner userName={userName} setUserName={setUserName} />
        <Navbar />

        <div className="flex-grow-1 container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/community" element={<Community />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
