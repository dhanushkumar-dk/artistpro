import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/loginreg/Login";
import Register from "./pages/loginreg/Register";
import LandingPage from "./pages/Home";
import Events from "./pages/Events";
import Chatbot from "./pages/Chatbot";
import MyTickets from "./components/ProfilePage/MyTickets";
import Learning from "./pages/Learning";
import Community from "./pages/Community";
import InstrumentsComponent from "./pages/Instruments";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footers/Footer";
import Profile from "./components/ProfilePage/Profile";
import InstrumentDetail from "./pages/displayInstrument"; // Import the new InstrumentDetail page
import MyInstruments from "./components/ProfilePage/MyInstrument";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEventForm from "./pages/AddEventForm";

// Add inside JSX
<ToastContainer position="top-center" autoClose={3000} />;
const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/instruments" element={<InstrumentsComponent />} />
            <Route path="/community" element={<Community />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/chatbot" element={<Chatbot />} />
            {/* Add a route for the instrument detail page with dynamic ID */}
            <Route path="/instrument/:id" element={<InstrumentDetail />} />
            <Route path="/MyInstruments" element={<MyInstruments />} />
            <Route path="/addnewevent" element={<AddEventForm />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
