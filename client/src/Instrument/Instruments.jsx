import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import InstrumentCard from "./InstrumentCard";
import AddInstrumentForm from "./Form/addInstrumentForm";
import RentModal from "./Component/RentalModel";
import { BACKEND_BASE_URL } from "../config";

const InstrumentsComponent = ({ user }) => {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [showRentModal, setShowRentModal] = useState(false);
  const [rentInstrumentId, setRentInstrumentId] = useState(null);
  const [rentForm, setRentForm] = useState({
    rentedDate: "",
    expectedReturnDate: "",
  });

  const fetchInstruments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_BASE_URL}/instruments`);
      const available = response.data.filter(
        (instrument) => instrument.status === "available"
      );
      setInstruments(available);
    } catch (err) {
      console.error("Error fetching instruments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstruments();
  }, [showForm]);

  const handleRentChange = (e) => {
    const { name, value } = e.target;
    setRentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenRentModal = (instrumentId, ownerId) => {
    if (user?.userId === ownerId) {
      alert("You cannot rent your own instrument.");
      return;
    }
    setRentInstrumentId(instrumentId);
    setShowRentModal(true);
  };

  const handleRentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${BACKEND_BASE_URL}/instruments/rent/${rentInstrumentId}`,
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
      fetchInstruments();
    } catch (error) {
      console.error("Error renting instrument:", error);
    }
  };

  return (
    <div className="bg-light">
      <div className="container py-1 bg-light">
        <ToastContainer position="top-center" autoClose={3000} />
        <h1 className=" text-center">
          {instruments.length === 0
            ? "Instruments Currently Not Available"
            : "Available Instruments"}
        </h1>

        <div className="text-center ">
          {user && (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add Instrument
            </button>
          )}
        </div>

        {/* Rent Modal */}
        <RentModal
          show={showRentModal}
          onClose={() => setShowRentModal(false)}
          onSubmit={handleRentSubmit}
          rentForm={rentForm}
          handleRentChange={handleRentChange}
        />

        {/* Add Instrument Form */}
        {showForm && (
          <AddInstrumentForm
            user={user}
            onClose={() => setShowForm(false)}
            refreshInstruments={fetchInstruments}
          />
        )}

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {instruments.map((instrument) => (
              <InstrumentCard
                key={instrument._id}
                instrument={instrument}
                userId={user?.userId}
                handleOpenRentModal={handleOpenRentModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentsComponent;
