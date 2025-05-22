import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/loginreg/Login";
import Register from "./pages/loginreg/Register";

import LandingPage from "./pages/Home";

import Events from "./pages/Events";
import EventList from "./components/listEvents";
import AddEventForm from "./pages/AddEventForm";

import MyInstruments from "./components/ProfilePage/MyInstrument";
import InstrumentDetail from "./pages/displayInstrument"; // Import the new InstrumentDetail page
import InstrumentsComponent from "./pages/Instruments";

import Community from "./pages/Community";
import Chatbot from "./pages/Chatbot";
import Learning from "./pages/Learning";

import Profile from "./components/ProfilePage/Profile";
import MyTickets from "./components/ProfilePage/MyTickets";

import Footer from "./components/Footers/Footer";
import PageNotFound from "./components/PageNotFound";

import EventDetails from "./pages/EventDetails"; // import

// Add inside JSX
<ToastContainer position="top-center" autoClose={3000} />;
const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/events" element={<Events />} />
            <Route path="/events/addnewevent" element={<AddEventForm />} />
            <Route path="/listEvents" element={<EventList />} />

            <Route path="/events/:id" element={<EventDetails />} />

            <Route path="/instruments" element={<InstrumentsComponent />} />
            <Route path="/MyInstruments" element={<MyInstruments />} />
            <Route path="/instrument/:id" element={<InstrumentDetail />} />

            <Route path="/community" element={<Community />} />
            <Route path="/learning" element={<Learning />} />

            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/chatbot" element={<Chatbot />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
