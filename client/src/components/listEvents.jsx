import React, { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/eventsdata");
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          setError("No events found");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-4 bg-none">
      {" "}
      {/* Changed bg-white to bg-none */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {events.map((event) => {
          const remainingSlots = event.slots - event.bookeduser.length;

          return (
            <div className="col" key={event._id}>
              <div className="card shadow-lg rounded-1 border-dark">
                {/* Image */}
                <div
                  style={{
                    width: "100%", // Set the container width to 100% for full screen usage
                    paddingTop: "56.25%", // Aspect ratio (16:9) for better scaling
                    position: "relative",
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/${event.image}`}
                    alt={event.name}
                    className="card-img-top"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)", // Center the image horizontally
                      width: "100%", // Stretch the image to the full width of the container
                      height: "100%", // Stretch the image to the full height of the container
                      objectFit: "cover",
                    }}
                  />
                </div>

                <hr className="my-2 border border-dark border-2 opacity-50" />

                {/* Body with table layout */}
                <div className="card-body p-2">
                  <h6 className="text-center fw-bold">{event.name}</h6>

                  <table className="table table-borderless table-sm mb-2">
                    <tbody className="small">
                      <tr>
                        <td className="text-muted fw-bold">Host</td>
                        <td>{event.host}</td>
                        <td className="text-muted fw-bold">Genre</td>
                        <td>{event.genre}</td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-bold">Location</td>
                        <td>{event.location}</td>
                        <td className="text-muted fw-bold">Date</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-bold">Remaining</td>
                        <td>{remainingSlots}</td>
                        <td colSpan="2">
                          <button className="btn btn-sm btn-success w-100">
                            RSVP
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4">
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary w-100 mt-1"
                          >
                            View Details
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
