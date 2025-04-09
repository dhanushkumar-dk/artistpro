import React, { useState } from "react";
import EventsBanner from "../components/EventsBanner";
import SellingFast from "../components/SellingFast";
import VenuesNearYou from "../components/VenuesNearYou";
import FeaturedFestivals from "../components/FeaturedFestivals";
import FooterEvent from "../components/FooterEvent";

const Events = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = [
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
    { name: "All Genres" },
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

  return (
    <div>
      <EventsBanner />

      {/* Section heading */}
      <div className="text-center mt-4">
        <h2 className="fw-bold">Discover Events</h2>
        <p className="text-muted">Filter by genre, time, or experience</p>
      </div>

      {/* Scrollable Filter Navbar */}
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

      {/* Active Filters Display */}
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

      {/* Event Sections */}
      <div className="container py-4">
        <SellingFast filters={selectedFilters} />
        <VenuesNearYou filters={selectedFilters} />
        <FeaturedFestivals filters={selectedFilters} />
      </div>

      <FooterEvent />
    </div>
  );
};

export default Events;
