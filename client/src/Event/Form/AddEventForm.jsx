import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBanner from "../../Others/Banners/HeaderBanner";
import Navbar from "../../Others/components/Navbar";
import { BACKEND_BASE_URL } from "../../config";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    host: "",
    description: "",
    location: "",
    date: "",
    userId: "",
    slots: "",
    link: "",
  });

  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userId = response.data.userId;
        setFormData((prev) => ({ ...prev, userId }));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) data.append("image", image);

    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/addevent`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSuccessMessage("Event added successfully!");
        setFormData({
          name: "",
          genre: "",
          host: "",
          description: "",
          location: "",
          date: "",
          userId: formData.userId,
          slots: "",
          link: "",
        });
        setImage(null);
      } else {
        setErrorMessage("Failed to add event.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while adding the event.");
    }
  };

  return (
    <div className="bg-white">
      <HeaderBanner />
      <Navbar />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h2 className="mb-4 text-center text-primary">Add New Event</h2>

                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label className="form-label">Event Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Genre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Host</label>
                    <input
                      type="text"
                      className="form-control"
                      name="host"
                      value={formData.host}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Slots</label>
                    <input
                      type="number"
                      className="form-control"
                      name="slots"
                      value={formData.slots}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Event Link</label>
                    <input
                      type="url"
                      className="form-control"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image (optional)</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Submit Event
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
