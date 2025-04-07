// src/Instruments.jsx

import React, { useState, useEffect, useCallback } from "react";
import InstrumentDisplay from "../components/InstrumentDisplay";
import instrumentsData from "../data/instrumentsData";

const Instruments = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredInstruments, setFilteredInstruments] =
    useState(instrumentsData);

  // Memoize filterInstruments using useCallback
  const filterInstruments = useCallback(() => {
    const filtered = instrumentsData.filter((instrument) => {
      const matchesSearchQuery =
        instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instrument.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter.length === 0 ||
        categoryFilter.includes(instrument.category);
      const matchesPrice =
        instrument.price >= priceRange[0] && instrument.price <= priceRange[1];

      return matchesSearchQuery && matchesCategory && matchesPrice;
    });
    setFilteredInstruments(filtered);
  }, [searchQuery, categoryFilter, priceRange]);

  // Call filter function when any filter changes
  useEffect(() => {
    filterInstruments();
  }, [filterInstruments]);

  // Handle category selection (toggle on/off)
  const handleCategoryChange = (category) => {
    setCategoryFilter((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category); // Remove category
      } else {
        return [...prevCategories, category]; // Add category
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter([]);
    setPriceRange([0, 1000]);
    setFilteredInstruments(instrumentsData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 font-weight-bold text-primary">
        Browse Our Instruments
      </h2>

      {/* Filters Section */}
      <div className="card p-4 mb-5 shadow-lg" style={{ borderRadius: "15px" }}>
        <h4 className="mb-3 text-info">Filter Instruments</h4>

        {/* Row for Search Box and Category Dropdown */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            {/* Search box */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control shadow-sm"
              placeholder="Search for instruments..."
              style={{
                borderRadius: "10px",
                fontSize: "1.1rem",
                borderColor: "#6c757d",
              }}
            />
          </div>

          <div className="col-md-6">
            {/* Category filter */}
            <div className="d-flex flex-wrap">
              {["Guitar", "Piano", "Drums", "String", "Wind"].map(
                (category) => (
                  <div key={category} className="form-check mr-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={category}
                      checked={categoryFilter.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label className="form-check-label" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Row for Price Range and Clear Filters */}
        <div className="row">
          <div className="col-md-6 mb-3">
            {/* Price range filter */}
            <label className="text-muted">Price Range</label>
            <div className="d-flex">
              <input
                type="number"
                name="min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
                className="form-control shadow-sm mr-2"
                placeholder="Min Price"
                style={{
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  borderColor: "#6c757d",
                }}
              />
              <input
                type="number"
                name="max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                className="form-control shadow-sm"
                placeholder="Max Price"
                style={{
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  borderColor: "#6c757d",
                }}
              />
            </div>
          </div>

          <div className="col-md-6">
            {/* Clear filters button */}
            <button
              onClick={clearFilters}
              className="btn btn-outline-danger mt-3"
              style={{
                borderRadius: "50px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "10px 20px",
                width: "100%",
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Display filtered instruments */}
      <div className="row">
        {filteredInstruments.length > 0 ? (
          filteredInstruments.map((instrument) => (
            <div key={instrument.id} className="col-md-4 mb-4">
              {/* Instrument Cards */}
              <div
                className="card shadow-lg"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  border: "none",
                  transition: "transform 0.3s",
                }}
              >
                <InstrumentDisplay instrument={instrument} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            No instruments found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Instruments;
