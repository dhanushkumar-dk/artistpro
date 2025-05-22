import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EventCard = ({ event }) => {
  const [userData, setUserData] = useState({});
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
          //   setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        // setIsLoggedIn(false);
      });
  }, []);

  const navigate = useNavigate();
  const remainingSlots = event.slots - event.bookeduser.length;

  return (
    <div className="col">
      <div className="card shadow-lg rounded-3 border-dark">
        {/* Image */}
        <div
          style={{
            width: "100%",
            paddingTop: "100%",
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
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <hr className="my-2 border border-dark border-2 opacity-50" />

        {/* Event Info */}
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
                  {/* <button
                    className="btn btn-sm btn-success w-100"
                    onClick={() => {
                      alert(`${userData.userId} \n ${userData.firstName}`);
                    }}
                  >
                    RSVP
                  </button> */}
                  <button
                    className="btn btn-sm btn-success w-100"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token || !userData.userId) {
                        alert("Please log in to RSVP.");
                        return;
                      }

                      axios
                        .post(
                          `http://localhost:5000/eventsdata/${event._id}/rsvp`,
                          { userId: userData.userId },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((res) => {
                          alert("RSVP successful!");
                          // optionally refresh or update event state
                        })
                        .catch((err) => {
                          alert(
                            "RSVP failed: " + err.response?.data?.message ||
                              err.message
                          );
                        });
                    }}
                  >
                    RSVP
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="btn btn-sm btn-primary w-100 mt-1"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
