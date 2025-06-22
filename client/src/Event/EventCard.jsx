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
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 m-0 p-1 p-sm-2 p-md-3 p-lg-4">
      <div className="card shadow-lg rounded-3 border-dark">
        {/* Image */}
        <div
          style={{
            width: "100%",
            paddingTop: "100%",
            position: "relative",
            boxSizing: "border-box",
            overflow: "hidden",
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
              objectFit: "cover",
            }}
          />
        </div>
        <hr className="m-0 p-0 border border-dark border-2 opacity-50" />

        {/* Event Info */}
        <div className="card-body p-2 col-12" style={{ fontSize: "0.6rem" }}>
          <h6 className="fw-bold m-0 p-0">{event.name}</h6>

          {/* Details */}
          <div className="row">
            <div className="col-6 col-md-6">
              <p className="fw-bold p-0 m-0">Host:</p>
              <p className="fw-bold p-0 m-0">Location:</p>
              <p className="fw-bold p-0 m-0">Remaining:</p>
              <p className="fw-bold p-0 m-0">Genre:</p>
              <p className="fw-bold p-0 m-0">Date:</p>

              <button
                className="btn btn-sm btn-success col-6 col-sm-8 p-0 fw-bold"
                style={{ fontSize: "0.6rem" }}
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
            </div>
            <div className="col-6 col-md-6">
              <p className="p-0 m-0">{event.host}</p>
              <p className="p-0 m-0">{event.location}</p>
              <p className="p-0 m-0">{remainingSlots}</p>
              <p className="p-0 m-0">{event.genre}</p>
              <p className="p-0 m-0">
                {new Date(event.date).toLocaleDateString()}
              </p>{" "}
              <button
                onClick={() => navigate(`/events/${event._id}`)}
                className="btn btn-sm btn-primary col-6 col-sm-8 s p-0 fw-bold"
                style={{ fontSize: "0.6rem" }}
              >
                VIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
