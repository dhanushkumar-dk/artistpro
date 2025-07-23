import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import RentModal from "./Component/RentalModel";
import { BACKEND_BASE_URL } from "../config";

const InstrumentDetail = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [instrument, setInstrument] = useState(null);
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentForm, setRentForm] = useState({
    rentedDate: "",
    expectedReturnDate: "",
  });

  /**
   * Fetch instrument details on mount and when id changes
   */
  useEffect(() => {
    fetchInstrumentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /**
   * Fetches instrument details from backend
   */
  const fetchInstrumentDetails = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/instruments/${id}`);
      setInstrument(response.data);
    } catch (error) {
      console.error("Error fetching instrument details:", error);
    }
  };

  /**
   * Handles input changes for the rent form
   */
  const handleRentChange = (e) => {
    const { name, value } = e.target;
    setRentForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Submits rent request to backend
   */
  const handleRentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${BACKEND_BASE_URL}/instruments/rent/${instrument._id}`,
        {
          rentedDate: rentForm.rentedDate,
          expectedReturnDate: rentForm.expectedReturnDate,
          renterId: user.userId,
          renterMobile: user.phone,
          renterEmail: user.email,
          renterAddress: user.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Instrument rented successfully!");
      setShowRentModal(false);
      setRentForm({ rentedDate: "", expectedReturnDate: "" });
      fetchInstrumentDetails(); // refresh after renting
    } catch (error) {
      console.error("Error renting instrument:", error);
      alert("Failed to rent the instrument.");
    }
  };

  /**
   * Handles returning the instrument
   */
  const handleReturnInstrument = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `${BACKEND_BASE_URL}/instruments/return/${instrument._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Successfully Instrument Returned !");
      fetchInstrumentDetails();
    } catch (error) {
      console.error("Error returning instrument: ", error);
      alert("Failed to return the instrument.");
    }
  };

  /**
   * Render loading state
   */
  if (!instrument) {
    return <div className="text-center my-5">Loading...</div>;
  }

  /**
   * Render component
   */
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/instruments")}
        >
          &larr; Back to Instruments
        </button>
      </div>

      <div className="row">
        {/* Instrument Image */}
        <div className="col-12 col-md-6">
          <img
            src={`${BACKEND_BASE_URL}/uploads/${instrument.image}`}
            alt={instrument.instrumentName}
            className="img-fluid rounded mb-3"
            style={{
              maxHeight: "300px", // adjust as per desired size
              objectFit: "cover",
            }}
          />
        </div>

        {/* Instrument Details */}
        <div className="col-12 col-md-6">
          <h2>{instrument.instrumentName}</h2>
          <p>
            <strong>Description:</strong> {instrument.instrumentDescription}
          </p>
          <p>
            <strong>Address:</strong> {instrument.address}
          </p>
          <p>
            <strong>Amount:</strong> ${instrument.amount}
          </p>
          <p>
            <strong>Owner Name:</strong> {instrument.userName}
          </p>
          <p>
            <strong>Contact Number:</strong> {instrument.contactNumber}
          </p>

          {/* Action Button */}
          {instrument.userId !== user.userId ? (
            instrument.status === "available" ? (
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => setShowRentModal(true)}
              >
                Rent This Instrument
              </button>
            ) : (
              <button
                className="btn btn-warning w-100 mt-3"
                onClick={handleReturnInstrument}
              >
                Return This Instrument
              </button>
            )
          ) : (
            <></>
          )}
        </div>
      </div>

      {instrument.status !== "available" && (
        <div className="mt-5 p-4 border-top">
          <h4 className="mb-3">Renter Details</h4>

          <div className="col-md-8">
            <p>
              <strong>Renter ID:</strong> {instrument.renterId}
            </p>
            <p>
              <strong>Email:</strong> {instrument.renterEmail}
            </p>
            <p>
              <strong>Mobile:</strong> {instrument.renterMobile}
            </p>
            <p>
              <strong>Address:</strong> {instrument.renterAddress}
            </p>
            <p>
              <strong>Rented Date:</strong>{" "}
              {new Date(instrument.rentedDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Expected Return:</strong>{" "}
              {new Date(instrument.expectedReturnDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Rent Modal */}
      <RentModal
        show={showRentModal}
        onClose={() => setShowRentModal(false)}
        onSubmit={handleRentSubmit}
        rentForm={rentForm}
        handleRentChange={handleRentChange}
      />
    </div>
  );
};

export default InstrumentDetail;
