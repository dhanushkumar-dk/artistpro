import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderBanner from "../components/Banners/HeaderBanner";
import Navbar from "../components/Navbar";
import EventsBanner from "../components/Banners/EventsBanner";
import FooterEvent from "../components/Footers/FooterEvent";
import EventCard from "./EventCard"; // import here

const Events = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const staticFilters = [
    "All Genres",
    "Today",
    "This Week",
    "This Month",
    "Choose Dates",
    "Live Streams",
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
          const eventData = response.data.events;
          setEvents(eventData);

          const dynamicGenres = Array.from(
            new Set(eventData.map((e) => e.genre).filter(Boolean))
          );

          const combined = [...staticFilters];
          dynamicGenres.forEach((genre) => {
            if (!combined.includes(genre)) {
              combined.push(genre);
            }
          });

          setFilters(combined.map((name) => ({ name })));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white">
      <HeaderBanner />
      <Navbar />
      <EventsBanner />

      <div className="text-center mt-4">
        <h2 className="fw-bold">Discover Events</h2>
        <p className="text-muted">Filter by genre, time, or experience</p>
      </div>

      {/* Filters */}
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

      {/* Event List */}
      <div className="container my-4 bg-white">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {events
              .filter((event) =>
                isAllGenresSelected
                  ? true
                  : selectedFilters.includes(event.genre)
              )
              .map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
          </div>
        )}
      </div>

      <FooterEvent />
    </div>
  );
};

export default Events;
