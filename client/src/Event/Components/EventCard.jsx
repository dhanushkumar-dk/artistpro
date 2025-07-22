import { Modal, Button } from "react-bootstrap"; // import Bootstrap Modal
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BACKEND_BASE_URL } from "../../config";
import axios from "axios";

const EventCard = ({ event, userData }) => {
  const [showModal, setShowModal] = useState(false); // modal state
  const [rsvpLoading, setRsvpLoading] = useState(false); // to handle loading state
  const cardDataFntStyle = { fontSize: "14px" };

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

        // send confirmation email to user
        axios
          .post(`${BACKEND_BASE_URL}/send-email`, {
            to: userData.email,
            subject: `RSVP Confirmation for ${event.name}`,
            text: `Hi ${userData.firstName} ${userData.lastName},

Thank you for RSVPing to "${event.name}".

Event Details:
- 📍 Location: ${event.location}
- 📅 Date: ${new Date(event.date).toLocaleDateString()}
- 📝 Description: ${event.description}

We look forward to seeing you there!

Best regards,
The Events Team
`,
          })
          .then((res) => {
            console.log("Email sent successfully");
          })
          .catch((err) => {
            console.error(
              "Failed to send email: " +
                (err.response?.data?.message || err.message)
            );
          });

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
      <style>
        {`
          th, td {
            padding: 0px !important;
          }
        `}
      </style>

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
              onClick={() => navigate(`/events/${event._id}`)}
              alt={event.name}
              className="card-img-top"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </div>
          <hr className="m-0 p-0 border border-dark border-2 opacity-50" />

          <div className="card-body p-2 col-12" style={{ fontSize: "0.6rem" }}>
            <h6 className="fw-bold m-0 p-0">{event.name}</h6>

            <div className="table-responsive">
              <table className="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="fw-bold" style={cardDataFntStyle}>
                      Host:
                    </th>
                    <td style={cardDataFntStyle}>{event.host}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold" style={cardDataFntStyle}>
                      Location:
                    </th>
                    <td style={cardDataFntStyle}>{event.location}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold" style={cardDataFntStyle}>
                      Remaining:
                    </th>
                    <td style={cardDataFntStyle}>{remainingSlots}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold" style={cardDataFntStyle}>
                      Genre:
                    </th>
                    <td style={cardDataFntStyle}>{event.genre}</td>
                  </tr>
                  <tr>
                    <th className="fw-bold" style={cardDataFntStyle}>
                      Date:
                    </th>
                    <td style={cardDataFntStyle}>
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button
                        className="btn btn-sm btn-success fw-bold w-100"
                        style={{ fontSize: "0.6rem" }}
                        onClick={() => setShowModal(true)}
                      >
                        RSVP
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
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
