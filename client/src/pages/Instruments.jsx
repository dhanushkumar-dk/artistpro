import React, { useEffect, useState } from "react";
import HeaderBanner from "../components/Banners/HeaderBanner";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InstrumentsComponent = () => {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    instrumentName: "",
    description: "",
    amount: "",
    imageUrl: "",
    userId: "",
    userName: "",
    address: "",
    contactNumber: "",
    status: "available",
    rentedDate: "",
    expectedReturnDate: "",
    renterId: "",
  });
  // New states for Rent functionality
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentInstrumentId, setRentInstrumentId] = useState(null);
  const [rentForm, setRentForm] = useState({
    rentedDate: "",
    expectedReturnDate: "",
  });

  const [imageFile, setImageFile] = useState(null); // New state to store the image file

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          const fullName = `${res.data.firstName} ${res.data.lastName}`;
          setUser(res.data);
          setFormData((prev) => ({
            ...prev,
            userId: res.data.userId,
            userName: fullName,
          }));
        }
      })
      .catch((err) => console.error("Error fetching user: ", err));
  }, []);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/instruments");
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
    fetchInstruments();
  }, [showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(file), // Display the image preview
      }));
    }
  };

  // Rent modal handling
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
        `http://localhost:5000/instruments/rent/${rentInstrumentId}`,
        {
          rentedDate: rentForm.rentedDate,
          expectedReturnDate: rentForm.expectedReturnDate,
          renterId: user.userId,
          status: "not available",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowRentModal(false);
      setRentForm({ rentedDate: "", expectedReturnDate: "" });
      // alert("Instrument rented successfully!");
    } catch (error) {
      console.error("Error renting instrument:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.instrumentName ||
      !formData.amount ||
      !formData.description ||
      !formData.contactNumber ||
      !formData.address
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (
      formData.status === "not available" &&
      (!formData.rentedDate ||
        !formData.expectedReturnDate ||
        !formData.renterId)
    ) {
      toast.warning("Please complete the rent details!");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("instrumentName", formData.instrumentName);
    formDataToSubmit.append("instrumentDescription", formData.description);
    formDataToSubmit.append("amount", formData.amount);
    formDataToSubmit.append("userId", formData.userId);
    formDataToSubmit.append("userName", formData.userName);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("contactNumber", formData.contactNumber);
    formDataToSubmit.append("status", formData.status);
    formDataToSubmit.append("rentedDate", formData.rentedDate);
    formDataToSubmit.append("expectedReturnDate", formData.expectedReturnDate);
    formDataToSubmit.append("renterId", formData.renterId);
    if (imageFile) formDataToSubmit.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/addnewinstrument",
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Instrument added successfully!");
      setShowForm(false);
      setFormData({
        instrumentName: "",
        description: "",
        amount: "",
        userId: user?.userId || "",
        userName: user ? `${user.firstName} ${user.lastName}` : "",
        address: "",
        contactNumber: "",
        status: "available",
        rentedDate: "",
        expectedReturnDate: "",
        renterId: "",
      });
      setImageFile(null); // Reset image file
    } catch (error) {
      toast.error("Something went wrong while saving.");
      console.error("Error saving instrument:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      instrumentName: "",
      description: "",
      amount: "",
      userId: user?.userId || "",
      userName: user ? `${user.firstName} ${user.lastName}` : "",
      address: "",
      contactNumber: "",
      status: "available",
      rentedDate: "",
      expectedReturnDate: "",
      renterId: "",
    });
    setImageFile(null);
  };

  return (
    <div>
      <HeaderBanner />
      <Navbar />

      <div className="container py-5">
        <ToastContainer position="top-center" autoClose={3000} />
        <h1 className="mb-4 text-center">Available Instruments</h1>

        <div className="text-center mb-4">
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
        {showRentModal && (
          <div className="modal d-block bg-dark bg-opacity-75">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Rent Instrument</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowRentModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleRentSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Rent Date</label>
                      <input
                        type="date"
                        name="rentedDate"
                        className="form-control"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={rentForm.rentedDate}
                        onChange={handleRentChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Expected Return Date</label>
                      <input
                        type="date"
                        name="expectedReturnDate"
                        className="form-control"
                        required
                        value={rentForm.expectedReturnDate}
                        onChange={handleRentChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">
                      Confirm Rent
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowRentModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <form className="text-start mb-5" onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="instrumentName"
                  className="form-control"
                  placeholder="Instrument Name"
                  value={formData.instrumentName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {imageFile && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="img-fluid mb-3 rounded"
                    style={{ maxHeight: "180px", objectFit: "cover" }}
                  />
                </div>
              )}

              <div className="col-12">
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="available">Available</option>
                  <option value="not available">Not Available</option>
                </select>
              </div>

              {formData.status === "not available" && (
                <>
                  <div className="col-md-6">
                    <input
                      type="date"
                      name="rentedDate"
                      className="form-control"
                      value={formData.rentedDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      name="expectedReturnDate"
                      className="form-control"
                      value={formData.expectedReturnDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="renterId"
                      className="form-control"
                      placeholder="Renter ID"
                      value={formData.renterId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="col-md-6">
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  value={formData.userId}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  value={formData.userName}
                  readOnly
                />
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-success px-4">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {instruments.map((instrument) =>
              user && user.userId !== instrument.userId ? (
                <div key={instrument._id} className="col">
                  <div className="card h-100 shadow-sm">
                    {instrument.image && (
                      <img
                        src={`http://localhost:5000/uploads/${instrument.image}`}
                        className="card-img-top"
                        alt={instrument.instrumentName}
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">
                        {instrument.instrumentName}
                      </h5>
                      <p className="card-text">
                        {instrument.instrumentDescription}
                      </p>
                      <p className="card-text">
                        <strong>Amount:</strong> ${instrument.amount}
                      </p>
                      <div className="d-flex justify-content-between">
                        <a
                          href={`/instrument/${instrument._id}`}
                          className="btn btn-primary"
                        >
                          View Details
                        </a>

                        {/* {instrument.status === "available" && (
                        )} */}
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              handleOpenRentModal(
                                instrument._id,
                                instrument.userId
                              )
                            }
                          >
                            Rent
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentsComponent;
