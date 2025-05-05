import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderBanner from "../components/Banners/HeaderBanner";
import Navbar from "../components/Navbar";
import EventsBanner from "../components/Banners/EventsBanner";
import FooterEvent from "../components/Footers/FooterEvent";

const Events = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const filters = [
    { name: "All Genres" },
    { name: "Today" },
    { name: "This Week" },
    { name: "This Month" },
    { name: "Choose Dates" },
    { name: "Live Streams" },
    { name: "Alternative" },
    { name: "Blues" },
    { name: "Christian/Gospel" },
    { name: "Classical" },
    { name: "Country" },
    { name: "Comedy" },
    { name: "Electronic" },
    { name: "Folk" },
    { name: "Hip Hop" },
    { name: "Jazz" },
    { name: "Latin" },
    { name: "Metal" },
    { name: "Pop" },
    { name: "Punk" },
    { name: "R&B/Soul" },
    { name: "Reggae" },
    { name: "Rock" },
  ];

  const isAllGenresSelected = selectedFilters.length === 0;

  const handleFilterChange = (filterName) => {
    if (filterName === "All Genres") {
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prev) =>
        prev.includes(filterName)
          ? prev.filter((f) => f !== filterName)
          : [...prev, filterName]
      );
    }
  };

  const removeFilter = (filterName) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filterName));
  };

  const handleAddEventClick = () => {
    navigate("/events/addnewevent");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/eventsdata");
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          setError("No events found");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-white">
      <HeaderBanner />
      <Navbar />
      <EventsBanner />

      {/* Section heading */}
      <div className="text-center mt-4">
        <h2 className="fw-bold">Discover Events</h2>
        <p className="text-muted">Filter by genre, time, or experience</p>
      </div>

      {/* Filter Scroll Navbar */}
      <div className="container-fluid mt-3">
        <div
          className="d-flex overflow-auto py-2 px-3 bg-white shadow-sm sticky-top z-2"
          style={{ whiteSpace: "nowrap", gap: "10px" }}
        >
          {filters.map((filterItem) => (
            <button
              key={filterItem.name}
              type="button"
              className={`btn ${
                selectedFilters.includes(filterItem.name) ||
                (filterItem.name === "All Genres" && isAllGenresSelected)
                  ? "btn-primary text-white"
                  : "btn-outline-secondary"
              }`}
              onClick={() => handleFilterChange(filterItem.name)}
              style={{
                fontSize: "14px",
                borderRadius: "50px",
                padding: "8px 18px",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {filterItem.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {!isAllGenresSelected && (
        <div className="container mt-3 mb-2">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="text-muted">Active Filters:</span>
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="badge rounded-pill bg-primary d-flex align-items-center"
                style={{ padding: "6px 12px" }}
              >
                {filter}
                <button
                  type="button"
                  onClick={() => removeFilter(filter)}
                  className="btn-close btn-close-white btn-sm ms-2"
                  aria-label="Remove"
                  style={{ fontSize: "10px" }}
                ></button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add Event Button */}
      <div className="text-center mb-4">
        <button className="btn btn-success" onClick={handleAddEventClick}>
          Add New Event
        </button>
      </div>

      {/* Event List Section */}
      <div className="container my-4 bg-white">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {events.map((event) => {
              const remainingSlots = event.slots - event.bookeduser.length;

              return (
                <div className="col" key={event._id}>
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
                              <button className="btn btn-sm btn-success w-100">
                                RSVP
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="4">
                              <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-primary w-100 mt-1"
                              >
                                View Details
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <FooterEvent />
    </div>
  );
};

export default Events;
