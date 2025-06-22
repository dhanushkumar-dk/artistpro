import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./Home/Home";

import Profile from "./Profile/Profile";
import MyTickets from "./Profile/Components/MyTickets";

import Login from "./LoginReg/Login";
import Register from "./LoginReg/Register";

import Events from "./Event/Events";
import EventList from "./Event/listEvents";
import AddEventForm from "./Event//Form/AddEventForm";
import EventDetails from "./Event/EventDetails"; // import

import MyInstruments from "./Profile/Components/MyInstrument";
import InstrumentDetail from "./Instrument/displayInstrument"; // Import the new InstrumentDetail page
import InstrumentsComponent from "./Instrument/Instruments";

import Community from "./Community/Community";
import Chatbot from "./Chatbot/Chatbot";
import Learning from "./Others/Learning";

import PageNotFound from "./Others/components/PageNotFound";
import Footer from "./Others/Footers/Footer";

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
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/MyInstruments" element={<MyInstruments />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/events" element={<Events />} />
            <Route path="/events/addnewevent" element={<AddEventForm />} />
            <Route path="/listEvents" element={<EventList />} />

            <Route path="/events/:id" element={<EventDetails />} />

            <Route path="/instruments" element={<InstrumentsComponent />} />
            <Route path="/instrument/:id" element={<InstrumentDetail />} />

            <Route path="/community" element={<Community />} />
            <Route path="/learning" element={<Learning />} />

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
