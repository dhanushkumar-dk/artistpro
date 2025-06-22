// src/pages/EventDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderBanner from "../Others/Banners/HeaderBanner";
import Navbar from "../Others/components/Navbar";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  // const [bookedUsernames, setBookedUsernames] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/eventsdata/${id}`);
        setEvent(res.data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Event not found.");
      }
    };

    fetchEvent();
    // fetchUsernames();
  }, [id]);

  if (error)
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  if (!event)
    return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div className="bg-light">
      <HeaderBanner />
      <Navbar />
      <div className="container my-5">
        <div className="card shadow-lg border-0">
          <img
            src={`http://localhost:5000/uploads/${event.image}`}
            alt={event.name}
            className="card-img-top"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h2 className="card-title fw-bold mb-3 text-center">
              {event.name}
            </h2>

            <div className="row g-3">
              <div className="col-md-6">
                <p>
                  <strong>🎤 Host:</strong> {event.host}
                </p>
                <p>
                  <strong>🎵 Genre:</strong> {event.genre}
                </p>
                <p>
                  <strong>📍 Location:</strong> {event.location}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>📅 Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>👥 Total Slots:</strong> {event.slots}
                </p>
                <p>
                  <strong>✅ Booked Users:</strong> {event.bookeduser.length}
                </p>
                <p>
                  <strong>🕒 Remaining Slots:</strong>{" "}
                  {event.slots - event.bookeduser.length}
                </p>
              </div>
            </div>

            <hr />
            <p className="mt-3">
              <strong>📝 Description:</strong>
              <br />
              {event.description || <em>No description provided.</em>}
            </p>

            {event.link && (
              <a
                href={event.link}
                className="btn btn-primary mt-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit External Link
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
