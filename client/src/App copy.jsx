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
import Footer from "./Others/Footers/Footer";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="flex-grow-1">
          <Routes path="/">
            {/* Home Routes */}
            <Route index element={<LandingPage />} />
            <Route path="home" element={<LandingPage />} />

            {/* Auth Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Profile Routes as nested */}
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="my-tickets" element={<MyTickets />} />
              <Route path="my-instruments" element={<MyInstruments />} />
            </Route>

            {/* Event Routes as nested */}
            <Route path="events">
              <Route index element={<Events />} />
              <Route path="add" element={<AddEventForm />} />
              <Route path=":id" element={<EventDetails />} />
            </Route>

            {/* Instrument Routes */}
            <Route path="instruments" element={<InstrumentsComponent />} />
            <Route path="instrument/:id" element={<InstrumentDetail />} />

            {/* Community, Learning, Chatbot */}
            <Route path="community" element={<Community />} />
            <Route path="learning" element={<Learning />} />
            <Route path="chatbot" element={<Chatbot />} />

            {/* Catch All - Page Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
