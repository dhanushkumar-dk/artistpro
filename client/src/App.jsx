import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import LandingPage from "./Home/Home";

import Profile from "./Profile/Profile";
import MyTickets from "./Profile/Components/MyTickets";
import MyInstruments from "./Profile/Components/MyInstrument";

import Login from "./LoginReg/Login";
import Register from "./LoginReg/Register";

import Events from "./Event/Events";
import AddEventForm from "./Event/Form/AddEventForm";
import EventDetails from "./Event/Components/EventDetails";

import InstrumentDetail from "./Instrument/displayInstrument";
import InstrumentsComponent from "./Instrument/Instruments";

import Community from "./Community/Community";
import Chatbot from "./Chatbot/Chatbot";
import Learning from "./Others/Learning";

import PageNotFound from "./Others/components/PageNotFound";
import Layout from "./Layout";

import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "./config";

const App = () => {
  const [userName, setUserName] = useState("Guest");
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        if (res.data) {
          setUserData(res.data);
          setUserName(`${res.data.firstName} ${res.data.lastName}`);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setIsLoggedIn(false);
      });
  }, [userName, setUserName, isLoggedIn, setIsLoggedIn]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="flex-grow-1 bg-white">
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  userName={userName}
                  setUserName={setUserName}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            >
              <Route index element={<LandingPage userName={userName} />} />

              {/* Auth Routes */}
              <Route
                path="login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="register" element={<Register />} />

              {/* Profile Routes as nested */}
              <Route path="profile">
                <Route
                  index
                  element={
                    <Profile
                      user={userData}
                      setUser={setUserData}
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
                <Route path="my-tickets" element={<MyTickets />} />
                <Route
                  path="my-instruments"
                  element={<MyInstruments user={userData} />}
                />
              </Route>

              {/* Event Routes as nested */}
              <Route path="events">
                <Route index element={<Events userData={userData} />} />
                <Route path="add" element={<AddEventForm />} />
                <Route path=":id" element={<EventDetails />} />
              </Route>

              {/* Instrument Routes */}
              <Route
                path="instruments"
                element={<InstrumentsComponent user={userData} />}
              />
              <Route
                path="instrument/:id"
                element={<InstrumentDetail user={userData} />}
              />

              {/* Community, Learning, Chatbot */}
              {/* loggedInUser = userData */}
              <Route
                path="community"
                element={<Community loggedInUser={userData} />}
              />
              <Route path="learning" element={<Learning />} />
              <Route path="chatbot" element={<Chatbot />} />

              {/* Catch All - Page Not Found */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
