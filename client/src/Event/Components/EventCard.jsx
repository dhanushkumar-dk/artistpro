import { Modal, Button } from "react-bootstrap"; // import Bootstrap Modal
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BACKEND_BASE_URL } from "../../config";
import axios from "axios";

const EventCard = ({ event, userData }) => {
  // const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false); // modal state
  const [rsvpLoading, setRsvpLoading] = useState(false); // to handle loading state

  const navigate = useNavigate();
  const remainingSlots = event.slots - event.bookeduser.length;

  const handleRSVP = () => {
    const token = localStorage.getItem("token");
    if (!token || !userData.userId) {
      alert("Please log in to RSVP.");
      setShowModal(false);
      return;
    }

    setRsvpLoading(true);
    axios
      .post(
        `${BACKEND_BASE_URL}/eventsdata/${event._id}/rsvp`,
        // { userId: userData.userId },
        { userId: userData._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("RSVP successful!");
        setShowModal(false);
        // optionally refresh events list or update parent state here
      })
      .catch((err) => {
        alert("RSVP failed: " + (err.response?.data?.message || err.message));
      })
      .finally(() => {
        setRsvpLoading(false);
      });
  };

  return (
    <>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 m-0 p-1 p-sm-2 p-md-3 p-lg-4">
        <div className="card shadow-lg rounded-3 border-dark">
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
              src={`${BACKEND_BASE_URL}/uploads/${event.image}`}
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

          <div className="card-body p-2 col-12" style={{ fontSize: "0.6rem" }}>
            <h6 className="fw-bold m-0 p-0">{event.name}</h6>

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
                  onClick={() => setShowModal(true)} // open modal
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

      {/*  Modal Component */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm RSVP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to RSVP for <strong>{event.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleRSVP} disabled={rsvpLoading}>
            {rsvpLoading ? "Processing..." : "Confirm RSVP"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventCard;
