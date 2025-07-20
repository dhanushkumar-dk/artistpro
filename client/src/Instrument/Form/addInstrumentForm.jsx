import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddInstrumentForm = ({ user, onClose, refreshInstruments }) => {
  const [formData, setFormData] = useState({
    instrumentName: "",
    description: "",
    category: "",
    amount: "",
    imageUrl: "",
    userId: user?.userId || "",
    userName: user ? `${user.firstName} ${user.lastName}` : "",
    address: "",
    contactNumber: "",
    status: "available",
    rentedDate: "",
    expectedReturnDate: "",
    renterId: "",
  });

  const [imageFile, setImageFile] = useState(null);

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
        imageUrl: URL.createObjectURL(file),
      }));
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

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
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
      onClose(); // close form
      refreshInstruments(); // refresh list if needed
      setFormData({
        instrumentName: "",
        description: "",
        category: "",
        amount: "",
        imageUrl: "",
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
    } catch (error) {
      toast.error("Something went wrong while saving.");
      console.error("Error saving instrument:", error);
    }
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      instrumentName: "",
      description: "",
      category: "",
      amount: "",
      imageUrl: "",
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

        <div className="col-md-6">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Instrument Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

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
  );
};

export default AddInstrumentForm;
