import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../config";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [bookedUsers, setBookedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/eventsdata/${id}`);
        setEvent(res.data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Event not found.");
      }
    };

    const fetchBookedUsers = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_BASE_URL}/event/${id}/booked-users`
        );
        setBookedUsers(res.data.bookedUsers);
      } catch (err) {
        console.error("Error fetching booked users:", err);
      }
    };

    fetchEvent();
    fetchBookedUsers();
  }, [id]);

  const renderMessageWithLinks = (text) => {
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) =>
      part.match(/^https?:\/\/[^\s]+$/) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-decoration-underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  if (error)
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  if (!event)
    return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/events#event_container")}
          >
            &larr; Back to Events
          </button>
        </div>
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-5 d-flex justify-content-center">
            <img
              src={`${BACKEND_BASE_URL}/uploads/${event.image}`}
              alt={event.name}
              className="img-fluid rounded shadow"
              style={{ maxWidth: "85%", height: "auto" }} // slightly reduced width
            />
          </div>

          <div className="col-12 col-md-7">
            <h1 className="text-center mb-4">{event.name}</h1>

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>
                    <strong>🎤 Host:</strong>
                  </td>
                  <td>{event.host}</td>
                </tr>
                <tr>
                  <td>
                    <strong>🎵 Genre:</strong>
                  </td>
                  <td>{event.genre}</td>
                </tr>
                <tr>
                  <td>
                    <strong>📍 Location:</strong>
                  </td>
                  <td>{event.location}</td>
                </tr>
                <tr>
                  <td>
                    <strong>📅 Date:</strong>
                  </td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>👥 Total Slots:</strong>
                  </td>
                  <td>{event.slots}</td>
                </tr>
                <tr>
                  <td>
                    <strong>✅ Booked Users:</strong>
                  </td>
                  <td>{event.bookeduser.length}</td>
                </tr>
                <tr>
                  <td>
                    <strong>🕒 Remaining Slots:</strong>
                  </td>
                  <td>{event.slots - event.bookeduser.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr />

        <div className="mt-4">
          <h4>Description</h4>
          <p>
            {event.description ? (
              renderMessageWithLinks(event.description)
            ) : (
              <em>No description provided.</em>
            )}
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

        <hr />

        <h4 className="mt-4">Registered Users</h4>
        {bookedUsers.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {bookedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2">No users have registered for this event yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
