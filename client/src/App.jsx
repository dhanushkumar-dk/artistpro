import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreEvents from "./pages/ExploreEvents";
import Artist from "./pages/Artist";
import InstrumentRental from "./pages/InstrumentRental";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="findartist" element={<Artist />} />
            <Route path="/exploreevents" element={<ExploreEvents />} />
            <Route path="/rental" element={<InstrumentRental />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
