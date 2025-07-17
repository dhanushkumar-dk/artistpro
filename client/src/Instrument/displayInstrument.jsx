import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const InstrumentDetail = () => {
  const [instrument, setInstrument] = useState(null);
  const { id } = useParams(); // Fetch the instrument ID from the URL

  useEffect(() => {
    // Fetch the detailed instrument data from the backend
    axios
      .get(`http://localhost:5000/instruments/${id}`)
      .then((response) => {
        setInstrument(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instrument details:", error);
      });
  }, [id]);

  if (!instrument) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="bg-light">
      <div className="container py-5 ">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              {instrument.image && (
                <img
                  src={`http://localhost:5000/uploads/${instrument.image}`}
                  className="card-img-top p-5"
                  alt={instrument.instrumentName}
                  style={{
                    objectFit: "cover",
                    height: "350px",
                  }}
                />
              )}
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  {instrument.instrumentName}
                </h2>
                <p className="card-text">
                  <strong>Owner:</strong> {instrument.userName}
                </p>
                <p className="card-text">
                  <strong>Owner ID:</strong> {instrument.userId}
                </p>
                <p className="card-text">
                  <strong>Description:</strong>{" "}
                  {instrument.instrumentDescription}
                </p>
                <p className="card-text">
                  <strong>Amount:</strong> ${instrument.amount}
                </p>
                <p className="card-text">
                  <strong>Contact Number:</strong> {instrument.contactNumber}
                </p>
                <p className="card-text">
                  <strong>Address:</strong> {instrument.address}
                </p>

                <div className="rental-status mt-4">
                  <h4>
                    Status:
                    <span
                      className={`badge ${
                        instrument.status === "available"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {instrument.status === "available"
                        ? "Available"
                        : "Rented"}
                    </span>
                  </h4>
                  {instrument.status === "not available" && (
                    <>
                      <p>
                        <strong>Rented Date:</strong>{" "}
                        {new Date(instrument.rentedDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Expected Return Date:</strong>{" "}
                        {new Date(
                          instrument.expectedReturnDate
                        ).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>

                <div className="action-buttons mt-4 text-center">
                  {instrument.status === "available" ? (
                    <button className="btn btn-primary w-100">
                      Rent This Instrument
                    </button>
                  ) : (
                    <button className="btn btn-warning w-100">
                      Return This Instrument
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;
