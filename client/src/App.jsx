import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  return (
    <Router>
      {/* Wrap everything inside a flex column container */}
      <div className="d-flex flex-column min-vh-100">
        {/* Global HeaderBanner and Navbar */}
        <HeaderBanner />
        <Navbar />

        {/* Main content area */}
        <div className="flex-grow-1">
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

        {/* Footer will always be at the bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
